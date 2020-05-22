class FormValidator {
    constructor(form, error) {
        this.form = form;
        this.error = error;
        this.setEventListeners();
        this.setSubmitButtonState();
    }

    checkAllValidity(form) {
        let isAllValid = true;
        Array.from(form.querySelectorAll('input')).forEach(function (item) {
            if (!item.validity.valid) {
                isAllValid = false;
            }
        });
        return isAllValid;
    }

    checkValidity(event) {
        const inputsElem = event.target;
        const errorElement = inputsElem.nextElementSibling;
        this.checkInputValidity(inputsElem, errorElement, this.error);
        this.setSubmitButtonState();
    }

    setEventListeners() {
        this.form.addEventListener('input', this.checkValidity.bind(this));
        this.form.addEventListener('refreshButton', this.setSubmitButtonState.bind(this));
    }

    setSubmitButtonState() {
        const buttonPopup = this.form.querySelector('.popup__button');

        if (this.checkAllValidity(this.form)) {
            buttonPopup.classList.add('button-black');
            buttonPopup.disabled = false;
        } else {
            buttonPopup.classList.remove('button-black');
            buttonPopup.disabled = true;
        }
    }

    activateError(elem) {
        elem.classList.add('popup__error-show');
    }

    resetError(elem) {
        elem.classList.remove('popup__error-show');
        elem.textContent = '';

    }

    checkInputValidity(input, errElem, text) {

        if (input.validity.valid) {
            this.resetError(errElem);
            return true;
        }
        if (input.validity.valueMissing) {
            errElem.textContent = text.valueMissing;
            this.activateError(errElem);
            return false;
        }
        if (input.validity.tooShort) {
            errElem.textContent = text.tooShort;
            this.activateError(errElem);
            return false;
        }
        if (input.validity.typeMismatch) {
            errElem.textContent = text.typeMismatch;
            this.activateError(errElem);
            return false;
        }
    }
}