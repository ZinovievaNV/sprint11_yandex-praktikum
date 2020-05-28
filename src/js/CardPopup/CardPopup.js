import Popup from "../Popup/Popup";
export default class CardPopup extends Popup {

    constructor(popup, api, cardList) {
        super(popup);
        this.api = api;
        this.cardList = cardList;
    }

    popupFormSubmit(event) {
        event.preventDefault();

        const {name, link} = event.target;
        this.api.popupFormSubmit({name: name.value, link: link.value}, this.addCard.bind(this));

        this.close();
        this.reset();
    }

    addCard(result) {

        this.cardList.addCard(result);

    }
}