// Модель класса Петиции
export class Petition {
  public id_petition: number;
  public title: string;
  public image: string;
  public content: string;
  public latitude: string;
  public longitude: string;
  public address: string;
  public timestamp: Date;
  public id_category: number;
  public id_object: number;
  public id_status: number;
  public id_user: number;
  constructor(
    id_petition: number,
    title: string,
    image: string,
    content: string,
    latitude: string,
    longitude: string,
    address: string,
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
    this.latitude = latitude,
    this.longitude = longitude,
    this.address = address,
    this.timestamp = timestamp;
    this.id_category = id_category;
    this.id_object = id_object;
    this.id_status = id_status;
    this.id_user = id_user;
  }
}
