export interface IHero {
  _id: string;
  alias: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;

}

// Init with new Hero({}) and new Hero produce error. For this purpose created emptyHero ))
export class Hero implements IHero {
  _id: string;
  alias: string;
  public firstName: string;
  public lastName: string;
  public phone: string;
  public address: string;
  public city: string;
  public postalCode: string;

  constructor(init: Hero
  ) {
    Object.assign(this, init);
  }
}



