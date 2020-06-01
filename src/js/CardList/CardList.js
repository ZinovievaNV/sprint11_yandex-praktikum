

 export default class CardList {
    constructor(container, api, userInfo, cardFabric) {
        this.container = container;
        this.api = api;
        this.userInfo = userInfo;
        this.cardFabric = cardFabric;
        this.card = [];
    }

    render(arrayCards) {

        for (const card of arrayCards) {
            this.addCard(card);
        }
    }

    addCard(cardObj) {
        const card = this.cardFabric(cardObj, this.api, this.userInfo, this.container);
        this.card.push(card.create());
        this.container.appendChild(card.create());
        card.setEventListeners();

    }


}
