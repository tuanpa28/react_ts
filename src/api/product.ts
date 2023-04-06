import instance from "./config";
import IProduct from "../interfaces/product";
import Cookies from "js-cookie";

const options = () => {
  return {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  };
};

const getProducts = () => {
  return instance.get(`products`);
};

const getProduct = (id: string) => {
  return instance.get(`product/${id}`);
};

const createProduct = (product: IProduct) => {
  return instance.post(`product`, product, options());
};

const updateProduct = (product: IProduct) => {
  return instance.put(`product/${product._id}`, product, options());
};

const deleteProduct = (id: string) => {
  return instance.delete(`product/${id}`, options());
};

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
