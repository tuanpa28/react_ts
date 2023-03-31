import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <aside>
        <h2>SideBar</h2>
      </aside>
      <main>
        {Cookies.get("accessToken") ? (
          <Outlet />
        ) : (
          (alert("Mời đăng nhập để truy cập quản trị!"),
          (<Navigate to="/signin" replace />))
        )}
      </main>
    </>
  );
};

export default AdminLayout;
