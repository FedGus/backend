// Модель класса Петиции
export class Petition {
  public id_petition: number;
  public title: string;
  public image: string;
  public content: string;
  public location: string;
  public timestamp: Date;
  public id_category: number;
  public id_object: number;
  public id_status: number;
  public id_user: number;
  constructor(
  id_petition:number,
  title: string,
  image: string,
  content: string,
  location: string,
  timestamp: Date,
  id_category: number,
  id_object: number,
  id_status: number,
  id_user: number
  ) {
    this.id_petition = id_petition;
    this.title = title;
    this.image = image;
    this.content = content;
    this.location = location;
    this.timestamp = timestamp;
    this.id_category = id_category;
    this.id_object = id_object;
    this.id_status = id_status;
    this.id_user = id_user
  }
}