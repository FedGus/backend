// Модель класса Пользователь
export class User {
  public id_user: number;
  public name: string;
  public surname: string;
  public role: string;
  public login: string;
  public password: string;
  constructor(
    id_user:number,
    name: string,
    surname: string,
    role: string,
    login: string,
    password: string
  ) {
    this.id_user = id_user;
    this.name = name;
    this.surname = surname;
    this.role = role;
    this.login = login;
    this.password = password;
  }
}


