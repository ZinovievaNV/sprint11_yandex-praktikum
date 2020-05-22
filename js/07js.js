
(function () {

    const placesList = document.querySelector('.places-list');

    const errorMessages = {
        valueMissing: 'Это обязательное поле',
        tooShort: 'Должно быть от 2 до 30 символов',
        typeMismatch: 'Здесь должна быть ссылка'
    };

    const cardFabric = (cardObj, api, userInfo, container) => {
        return new Card(cardObj, api, userInfo, container);
    };

    const api = new Api({
        baseUrl: 'https://praktikum.tk/cohort10',
        headers: {
            authorization: 'b51b3e77-092b-469c-b408-ade936850af2',
            'Content-Type': 'application/json'
        }
    });

    const validatorProfile = new FormValidator(document.forms.profile, errorMessages);
    const validatorNewCard = new FormValidator(document.forms.new, errorMessages);
    const userInfo = new UserInfo(document.getElementById('edit-name'), document.getElementById('edit-job'), api);
    const profilePopup = new ProfilePopup(document.querySelector('.edit-profile'), userInfo);
    const cardList = new CardList(placesList, api, userInfo, cardFabric);
    const newCardPopup = new CardPopup(document.querySelector('.add-place'), api, cardList);

    api.initializeCards(cardList);
})();
