export class UserInfo {
  constructor({ userName, userInfo, userAvatar }) {
    this._name = document.querySelector(userName);
    this._info = document.querySelector(userInfo);
    this._avatar = document.querySelector(userAvatar);
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
    this._info.textContent = data.about;
    this._avatar.src = data.avatar;
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }
}
