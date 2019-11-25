export class Product {
  id: number;
  name: string;
  description: string;
  imageURL: string;
  price: number;

  initialize() {
    this.id = 0;
    this.name = '';
    this.description = '';
    this.price;
    this.imageURL = '';
  }
}
