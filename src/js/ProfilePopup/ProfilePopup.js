import Popup from "../Popup/Popup";
export default class ProfilePopup extends Popup {
    constructor(popup, userInfo) {
        super(popup);
        this.userInfo = userInfo;
    }

    open() {

        this.form.querySelector('#username').value = this.userInfo.userName;
        this.form.querySelector('#userjob').value = this.userInfo.userJob;
        const afterResetEvent = new Event('refreshButton');
        this.form.dispatchEvent(afterResetEvent);
        super.open();
    }

    popupFormSubmit(event) {

        event.preventDefault();
        const {name, job} = event.target;

        this.userInfo.saveUserInfo(name.value, job.value);
        this.close();
    }
}
// export {ProfilePopup}