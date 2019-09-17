export interface IUserObject {
  uid: string;
  name: string;
  email: string;
}

export class User {
  public uid: string;
  public name: string;
  public email: string;

  constructor(userObject: IUserObject) {
    this.uid = userObject && userObject.uid || null;
    this.name = userObject && userObject.name || null;
    this.email = userObject && userObject.email || null;
  }
}
