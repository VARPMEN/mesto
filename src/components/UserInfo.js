export class UserInfo {
  constructor({ userName, userInfo }) {
    this._name = document.querySelector(userName);
    this._info = document.querySelector(userInfo);
  }

  getUserInfo() {
    this._userProfile = {
      name: this._name.textContent,
      info: this._info.textContent,
    };

    return this._userProfile;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._info.textContent = data.info;
  }
}
