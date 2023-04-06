import ICategory from "./category";
interface IProduct {
  _id?: string;
  name: string;
  price: number;
  image: string;
  description: string;
  categoryId?: ICategory;
}

export default IProduct;
