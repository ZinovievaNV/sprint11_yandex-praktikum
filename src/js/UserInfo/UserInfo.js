
export default class UserInfo {
    constructor(userNameContainer, userJobContainer, apiClass) {

        this.apiClass = apiClass;
        this.userNameContainer = userNameContainer;
        this.userJobContainer = userJobContainer;
        this.userName = '';
        this.userJob = '';
        this.getUserInfo();

    }

    //обновлять данные внутри экземпляра класса
    setUserInfo(userName, userJob) {
        this.userName = userName;
        this.userJob = userJob;

    }

    getUserInfo() {
        this.apiClass.getUserInfo(this.updateUserInfo.bind(this));
    }

    saveUserInfo(userName, userJob) {
        this.apiClass.saveUserInfo({name: userName, about:userJob}, this.updateUserInfo.bind(this));
    }
    //отображать данные
    updateUserInfo(result) {
        this.setUserInfo(result.name, result.about);

        this.userNameContainer.textContent = result.name;
        this.userJobContainer.textContent = result.about;
    }


}


