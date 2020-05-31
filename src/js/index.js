import "../pages/index.css"
import Api from './Api/Api.js';
import Card from '../../src/js/Card/Card'
import CardList from './CardList/CardList.js'
import CardPopup from './CardPopup/CardPopup.js';
import FormValidator from './FormValidator/FormValidator.js';
import ProfilePopup from './ProfilePopup/ProfilePopup.js';
import UserInfo from './UserInfo/UserInfo.js';

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
    const baseUrl = (NODE_ENV === 'development' ? 'http://praktikum.tk/cohort10' : 'https://praktikum.tk/cohort10');

    const api = new Api({
        baseUrl: baseUrl,
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

