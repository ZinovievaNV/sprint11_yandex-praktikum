
export default class Api {
    constructor(options) {
        this.options = options;
    }

    query(url, method = 'GET', body = null) {
        let options = {
            method: method,
            headers: this.options.headers,
        };

        if (body) {
            options.body = JSON.stringify(body)
        }

        return fetch(this.options.baseUrl + url, options)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.error());
            })

    }

    getUserInfo(callback) {
        this
            .query('/users/me').then(result => callback(result))
            .catch((error) => {
                console.log('Ошибка:', error);
            });
    }

    saveUserInfo(body, callback) {
        this
            .query('/users/me', 'PATCH', body)
            .then(result => callback(result))
            .catch((error) => {
                console.log('Ошибка:', error);
            });

    }

    likeCard(callback, id, metod) {
        this.query('/cards/like/' + id, metod)
            .then(result => callback(result))
            .catch((error) => {
                console.log('Ошибка:', error);
            });
    }

    confirmRemove(callback, id) {
        this
            .query('/cards/' + id, 'DELETE')
            .then(result => callback(result))
            .catch((error) => {
                console.log('Ошибка:', error);
            });
    }

    popupFormSubmit(body, callback) {
        this.query('/cards', 'POST', body)
            .then((result) => {
                callback(result);
                alert('Карточка добавлена');
            })
            .catch((error) => {
                console.log('Ошибка:', error);
            });
    }


    initializeCards(cardList) {
        this.query('/cards')
            .then(result => cardList.render(result))
            .catch((error) => {
            console.log('Ошибка:', error);
        });
    }
}
export {Api}
