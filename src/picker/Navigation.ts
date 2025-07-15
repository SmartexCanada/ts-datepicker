import { classes } from "@/consts/classes";
import type { DatePicker } from "@/datepicker";
import type { ViewType } from "@/types/datepicker";
import type { SpecificEventListener, TEventHandler } from "@/types/events";
import { getDecade } from "@/utils/date";
import { parseHTML } from "@/utils/dom";

export const defaultTitles: Record<ViewType, string> = {
        days: 'MM, <i>yyyy</i>',
        months: 'yyyy',
        years: 'yyyy1 - yyyy2'
    };

export const defaultNextArrow = '<svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">'
    + '<path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"></path>'
    + '</svg>';

export const defaultPrevArrow = '<svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">'
    + '<path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"></path>'
    + '</svg>';

export class Navigation<E extends HTMLElement = HTMLInputElement> {
    public datePicker: DatePicker<E>;

    public element: HTMLElement;
    public prevButton!: HTMLButtonElement;
    public nextButton!: HTMLButtonElement;
    public titleElement!: HTMLButtonElement;

    private prevClickListener!: SpecificEventListener<'click'>;
    private nextClickListener!: SpecificEventListener<'click'>;
    private titleClickListener!: SpecificEventListener<'click'>;

    private changeViewListener: TEventHandler;
    private changeDateListener: TEventHandler;

    constructor(datePicker: DatePicker<E>) {
        this.datePicker = datePicker;

        this.element = document.createElement('nav');
        this.element.classList.add(classes.navContainer);

        this._buildHtml();

        this.changeViewListener = () => this._onChangeView();
        this.changeDateListener = () => setTimeout(() => this.render());
        this.datePicker.on('_changeCurrentView', this.changeViewListener);
        this.datePicker.on('changeViewDate', this.changeViewListener);

        if (this._hasNavTitleCallback()) {
            this.datePicker.on('_changeSelectedDate', this.changeDateListener);
        }

        this.render();
        this._updateNavStatus();
    }

    /**
     * Destroy instance
     */
    public destroy() {
        this.datePicker.off('changeViewDate', this.changeViewListener);
        this.datePicker.off('_changeCurrentView', this.changeViewListener);
        this.datePicker.off('_changeSelectedDate', this.changeDateListener);
        this.datePicker = null as any;

        this.prevButton = null as any;
        this.nextButton = null as any;
        this.titleElement = null as any;

        this.element.remove();
        this.element = null as any;
    }

    /**
     * Render title
     */
    public render() {
        this.titleElement.innerHTML = this._getTitle();
        this.titleElement.classList.toggle(classes.disabled, this.datePicker.isMaxView());
    }

    /**
     * Update navigation
     */
    public update() {
        this.render();
        this._updateNavStatus();
    }

    /**
     * Build html for navigation
     */
    private _buildHtml() {
        this.prevClickListener = () => this.datePicker.prev();
        this.nextClickListener = () => this.datePicker.next();
        this.titleClickListener = () => this.datePicker.changeView('up');

        const { nextArrow, prevArrow } = this.datePicker.config;

        this.prevButton = document.createElement('button');
        this.prevButton.classList.add(classes.navAction, 'prev');
        this.prevButton.setAttribute('data-action', 'prev');
        this.prevButton.append(parseHTML(prevArrow || defaultPrevArrow));
        this.prevButton.addEventListener('click', this.prevClickListener);

        this.nextButton = document.createElement('button');
        this.nextButton.classList.add(classes.navAction, 'next');
        this.nextButton.setAttribute('data-action', 'next');
        this.nextButton.append(parseHTML(nextArrow || defaultNextArrow));
        this.nextButton.addEventListener('click', this.nextClickListener);

        this.titleElement = document.createElement('button');
        this.titleElement.classList.add(classes.navTitle);
        this.titleElement.addEventListener('click', this.titleClickListener);

        this.element.append(this.prevButton, this.titleElement, this.nextButton);
    }

    /**
     * Check if any nav title template is a callback
     */
    private _hasNavTitleCallback() {
        const navTitles = this.datePicker.config.navTitles;

        return (Object.keys(navTitles) as ViewType[]).some(
            (view) => typeof navTitles[view] === 'function'
        );
    }

    /**
     * Get content for title
     */
    private _getTitle() {
        const view = this.datePicker.currentView;
        const template = this.datePicker.config.navTitles[view];

        if (typeof template === 'function') {
            return template(this.datePicker);
        }

        return this.datePicker.formatDate(this.datePicker.viewDate, template || defaultTitles[view]);
    }

    /**
     * Handle view level change
     */
    private _onChangeView() {
        this.render();
        this._updateNavStatus();
    }

    /**
     * Update navigation actions
     */
    private _updateNavStatus() {
        const {minDate, maxDate, viewDate} = this.datePicker;

        this.prevButton.disabled = false;
        this.prevButton.classList.remove(classes.disabled);
        this.nextButton.disabled = false;
        this.nextButton.classList.remove(classes.disabled);

        if (!minDate && !maxDate) {
            return;
        }

        switch (this.datePicker.currentView) {
            case 'days':
                if (minDate && minDate.getMonth() >= viewDate.getMonth() && minDate.getFullYear() >= viewDate.getFullYear()) {
                    this.prevButton.disabled = true;
                    this.prevButton.classList.add(classes.disabled);
                }
                if (maxDate && maxDate.getMonth() <= viewDate.getMonth() && maxDate.getFullYear() <= viewDate.getFullYear()) {
                    this.nextButton.disabled = true;
                    this.nextButton.classList.add(classes.disabled);
                }
                break;
            case 'months':
                if (minDate && minDate.getFullYear() >= viewDate.getFullYear()) {
                    this.prevButton.disabled = true;
                    this.prevButton.classList.add(classes.disabled);
                }
                if (maxDate && maxDate.getFullYear() <= viewDate.getFullYear()) {
                    this.nextButton.disabled = true;
                    this.nextButton.classList.add(classes.disabled);
                }
                break;
            case 'years':
                const decade = getDecade(viewDate);
                if (minDate && minDate.getFullYear() >= decade[0]) {
                    this.prevButton.disabled = true;
                    this.prevButton.classList.add(classes.disabled);
                }
                if (maxDate && maxDate.getFullYear() <= decade[1]) {
                    this.nextButton.disabled = true;
                    this.nextButton.classList.add(classes.disabled);
                }
                break;
        }
    }
}
