class Card {

    constructor(cardData, api, userInfo, placesList) {
        this.data = cardData;
        this.api = api;
        this.userInfo = userInfo;
        this.placesList = placesList;
        this.like = this.like.bind(this);
        this.openFullImage = this.openFullImage.bind(this);
        this.remove = this.remove.bind(this);
        this.closeFullImage = this.closeFullImage.bind(this);
    }

    create() {
        const placeCard = document.createElement('div');
        const placeCardbox = document.createElement('div');
        const placeImage = document.createElement('img');

        placeImage.setAttribute('src', this.data.link);


        const placeCardDescription = document.createElement('div');
        const placeCardName = document.createElement('h3');
        const likeButton = document.createElement('button');
        const counterLikes = document.createElement('span');
        this.counterLikes = counterLikes;

        placeCard.classList.add('place-card');
        placeCardbox.classList.add('place-card__box');
        placeImage.classList.add('place-card__image');

        placeCardDescription.classList.add('place-card__description');
        placeCardName.classList.add('place-card__name');
        placeCardName.textContent = this.data.name;
        likeButton.classList.add('place-card__like-icon');
        counterLikes.classList.add('place-card__counter-like');
        counterLikes.textContent = this.data.likes.length;

        placeCard.appendChild(placeCardbox);

        placeCardbox.appendChild(placeImage);
        placeCard.appendChild(placeCardDescription);
        placeCardDescription.appendChild(placeCardName);
        placeCardDescription.appendChild(likeButton);
        placeCardDescription.appendChild(counterLikes);

        if (this.data.owner.name === this.userInfo.userName && this.data.owner.about === this.userInfo.userJob) {

            const buttonDelete = document.createElement('button');
            buttonDelete.classList.add('place-card__delete-icon');
            placeCardbox.appendChild(buttonDelete);
        }

        this.cardElement = placeCard;
        return placeCard;
    }

    refresh(data) {
        this.data = data;
        this.counterLikes.textContent = this.data.likes.length;
    }

    createOverlay(event) {
        const overlay = document.createElement('div');
        const overlayLightBox = document.createElement('div');
        const overlayImage = document.createElement('img');
        const overlayClose = document.createElement('img');
        overlayImage.setAttribute('src', event);
        overlayClose.setAttribute('src', './images/close.svg');


        overlay.classList.add('overlay');
        overlayLightBox.classList.add('overlay__light-box');
        overlayImage.classList.add('overlay__image');
        overlayClose.classList.add('overlay__close');

        overlay.appendChild(overlayLightBox);
        overlayLightBox.appendChild(overlayImage);
        overlayLightBox.appendChild(overlayClose);

        this.overlayElement = overlay;

        return overlay;

    }


    setEventListeners() {
        this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);
        if (this.cardElement.querySelector('.place-card__delete-icon')) {
            this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.confirmRemove.bind(this));
        }

        this.cardElement.querySelector('.place-card__image').addEventListener('click', this.openFullImage);
    }

    setEventListenerFullImage() {
        this.overlayElement.querySelector('.overlay__close').addEventListener('click', this.closeFullImage);
    }

    openFullImage(event) {
        this.createOverlay(event.target.src);
        document.body.appendChild(this.overlayElement);
        this.overlayElement.classList.add('overlay__is-open');
        this.setEventListenerFullImage();
    }

    like(event) {
        let method = 'PUT';
        if (event.target.classList.contains('place-card__like-icon_liked')) {
            method = 'DELETE';
        }
        // this.api.query('/cards/like/' + this.data._id, method).then(result => this.refresh(result));
        this.api.likeCard(this.refresh.bind(this), this.data._id, method);
        event.target.classList.toggle('place-card__like-icon_liked');
    }

    confirmRemove() {
        if (window.confirm("Вы действительно хотите удалить эту карточку?")){
            this.api.confirmRemove(this.remove.bind(this), this.data._id);
        }
    }

    remove(result) {

        this.placesList.removeChild(this.cardElement);
        alert(result.message);
        this.cardElement.querySelector('.place-card__like-icon').removeEventListener("click", this.like);
        this.cardElement.querySelector('.place-card__delete-icon').removeEventListener("click", this.remove);
        this.cardElement.querySelector('.place-card__image').removeEventListener("click", this.openFullImage);

    }

    closeFullImage() {

        this.overlayElement.classList.toggle('overlay__is-open');
        this.overlayElement.querySelector('.overlay__close').removeEventListener("click", this.closeFullImage);
    }
}