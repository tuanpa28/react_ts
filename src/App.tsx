import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "./api/product";
import AdminLayout from "./components/layouts/adminLayout";
import BaseLayout from "./components/layouts/baseLayout";
import IProduct from "./interfaces/product";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductsPage from "./pages/ProductsPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import AddProductPage from "./pages/admin/AddProductPage";
import DashboardPage from "./pages/admin/DashboardPage";
import ProductManagementPage from "./pages/admin/ProductManagementPage";
import UpdateProductPage from "./pages/admin/UpdateProductPage";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "./api/category";
import ICategory from "./interfaces/category";
import { message } from "antd";
import CategoryManagementPage from "./pages/admin/CategoryManagementPage";
import AddCategoryPage from "./pages/admin/AddCategoryPage";
import UpdateCategoryPage from "./pages/admin/UpdateCategoryPage";

function App() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  // Get Categories
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { categories },
        } = await getCategories();
        setCategories(categories);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // Get Products
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { products },
        } = await getProducts();
        setProducts(products.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // Create Product
  const onHandleCreate = async (product: IProduct) => {
    try {
      product.price = +product.price;
      const { data } = await createProduct(product);
      setProducts([...products, data?.product]);
      message.success(`Thêm sản phẩm thành công!`);
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  // Create Category
  const onHandleCreateCategory = async (category: ICategory) => {
    try {
      const { data } = await createCategory(category);
      setCategories([...categories, data?.category]);
      message.success(`Thêm danh mục thành công!`);
      navigate("/admin/category");
    } catch (error) {
      console.log(error);
    }
  };

  // Update Product
  const onHandleUpdate = async (product: IProduct) => {
    try {
      product.price = +product.price;
      const { data } = await updateProduct(product);
      const newPro = products?.map((item) =>
        item._id === data?.product?._id ? data.product : item
      );
      setProducts(newPro);
      message.success(`Sửa sản phẩm thành công!`);
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  // Update Category
  const onHandleUpdateCategory = async (category: ICategory) => {
    try {
      const { data } = await updateCategory(category);
      const newCate = categories?.map((item) =>
        item._id === data?.category?._id ? data.category : item
      );
      setCategories(newCate);
      message.success(`Sửa danh mục thành công!`);
      navigate("/admin/category");
    } catch (error) {
      console.log(error);
    }
  };

  // Remove Product
  const onHandleRemove = async (id: string) => {
    try {
      await deleteProduct(id);
      const newPro = products?.filter((product) => product._id !== id);
      setProducts(newPro);
    } catch (error) {
      console.log(error);
    }
  };

  // Remove Category
  const onHandleRemoveCategory = async (id: string) => {
    try {
      await deleteCategory(id);
      const newCate = categories?.filter((category) => category._id !== id);
      setCategories(newCate);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Routes>
        {/* Client */}
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<HomePage />} />
          {/* Products */}
          <Route path="products">
            <Route index element={<ProductsPage products={products} />} />
            {/* Product detail */}
            <Route
              path=":id"
              element={<ProductDetailPage products={products} />}
            />
          </Route>
          {/* end products */}
        </Route>

        {/* signin signup */}
        <Route path="signin" element={<SigninPage />} />
        <Route path="signup" element={<SignupPage />} />
        {/* end signin signup */}

        {/* Admin */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          {/* products */}
          <Route path="products">
            <Route
              index
              element={
                <ProductManagementPage
                  onHandleRemove={onHandleRemove}
                  products={products}
                  categories={categories}
                />
              }
            />
            {/* Product add */}
            <Route
              path="add"
              element={
                <AddProductPage
                  onHandleCreate={onHandleCreate}
                  categories={categories}
                />
              }
            />
            {/* Product update */}
            <Route
              path="update/:id"
              element={
                <UpdateProductPage
                  categories={categories}
                  products={products}
                  onHandleUpdate={onHandleUpdate}
                />
              }
            />
          </Route>
          {/* end products */}
          {/* category */}
          <Route path="category">
            <Route
              index
              element={
                <CategoryManagementPage
                  categories={categories}
                  onHandleRemoveCategory={onHandleRemoveCategory}
                />
              }
            />
            {/* category add */}
            <Route
              path="add"
              element={
                <AddCategoryPage
                  onHandleCreateCategory={onHandleCreateCategory}
                />
              }
            />
            {/* category update */}
            <Route
              path="update/:id"
              element={
                <UpdateCategoryPage
                  categories={categories}
                  onHandleUpdateCategory={onHandleUpdateCategory}
                />
              }
            />
          </Route>
          {/* end category */}
        </Route>

        {/* Router Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
