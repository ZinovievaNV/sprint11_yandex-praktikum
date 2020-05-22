class Popup {
    constructor(popup) {

        this.popup = popup;
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.reset = this.reset.bind(this);
        this.openButton = document.getElementById(this.popup.dataset.popup);
        this.form = popup.querySelector('form');
        this.setEventListeners();
    }

    setEventListeners() {
        this.popup.querySelector('.popup__close').addEventListener('click', this.close);
        this.openButton.addEventListener('click', this.open);
        this.form.addEventListener('submit', this.popupFormSubmit.bind(this));
    }

    open() {
        this.popup.classList.add('popup_is-opened');
    }

    close() {
        this.popup.classList.remove('popup_is-opened');
    }

    reset() {
        this.form.reset();
        const afterResetEvent = new Event('refreshButton');
        this.form.dispatchEvent(afterResetEvent);
    }

    popupFormSubmit() {

    }
}