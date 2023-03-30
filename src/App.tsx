import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "./api/product";
import "./App.css";
import reactLogo from "./assets/react.svg";
import AddProductPage from "./pages/admin/AddProductPage";
import DashboardPage from "./pages/admin/DashboardPage";
import ProductManagementPage from "./pages/admin/ProductManagementPage";
import UpdateProductPage from "./pages/admin/UpdateProductPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductsPage from "./pages/ProductsPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import IProduct from "./types/product";
import viteLogo from "/vite.svg";

function App() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[]>([]);

  // Admin Wrapper
  const AdminWrapper = () => {
    return Cookies.get("accessToken") ? (
      <Outlet />
    ) : (
      (alert("Mời đăng nhập để truy cập quản trị!"),
      (<Navigate to="/signin" replace />))
    );
  };

  // Get Products
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { products },
        } = await getProducts();
        setProducts(products);
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
      alert("Thêm sản phẩm thành công!");
      navigate("/admin/products");
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
      alert("Sửa sản phẩm thành công!");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  // Remove Product
  const onHandleRemove = async (id: string) => {
    try {
      if (confirm("Bạn muốn xóa sản phẩm?")) {
        await deleteProduct(id);
        const newPro = products?.filter((product) => product._id !== id);
        setProducts(newPro);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Routes>
        {/* Client */}
        <Route path="/">
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
          {/* signin signup */}
          <Route path="signin" element={<SigninPage />} />
          <Route path="signup" element={<SignupPage />} />
          {/* end signin signup */}
        </Route>

        {/* Admin */}
        <Route path="admin" element={<AdminWrapper />}>
          <Route index element={<DashboardPage />} />
          {/* products */}
          <Route path="products">
            <Route
              index
              element={
                <ProductManagementPage
                  products={products}
                  onHandleRemove={onHandleRemove}
                />
              }
            />
            {/* Product add */}
            <Route
              path="add"
              element={<AddProductPage onHandleCreate={onHandleCreate} />}
            />
            {/* Product update */}
            <Route
              path="update/:id"
              element={
                <UpdateProductPage
                  products={products}
                  onHandleUpdate={onHandleUpdate}
                />
              }
            />
          </Route>
          {/* end products */}
        </Route>

        {/* Router Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
