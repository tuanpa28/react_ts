import instance from "./config";
import IProduct from "../types/product";
import Cookies from "js-cookie";

let accessToken = Cookies.get("accessToken");
if (accessToken) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
}

const getProducts = () => {
  return instance.get(`products`);
};

const getProduct = (id: string) => {
  return instance.get(`product/${id}`);
};

const createProduct = (product: IProduct) => {
  return instance.post(`product`, product);
};

const updateProduct = (product: IProduct) => {
  return instance.put(`product/${product._id}`, product);
};

const deleteProduct = (id: string) => {
  return instance.delete(`product/${id}`);
};

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
