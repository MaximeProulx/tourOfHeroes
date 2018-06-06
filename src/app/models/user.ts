export interface IUser {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: number;
}

// Init with new User({}) and new User produce error. For this purpose created emptyUser ))
export class User implements IUser {
  _id: string;
  public email: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public role: number;

  constructor(init: User
  ) {
    Object.assign(this, init);
  }
}



