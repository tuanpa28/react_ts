import { Carousel, Tabs } from "antd";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import type { TabsProps } from "antd";

const items: TabsProps["items"] = [
  {
    key: "home",
    label: (
      <Link style={{ fontSize: 18 }} to={"/"}>
        Trang chủ
      </Link>
    ),
  },
  {
    key: "products",
    label: (
      <Link style={{ fontSize: 18 }} to={"/products"}>
        Products
      </Link>
    ),
  },
  {
    key: "signin",
    label: (
      <Link style={{ fontSize: 18 }} to={"/signin"}>
        Đăng nhập
      </Link>
    ),
  },
];

const contentStyle: React.CSSProperties = {
  margin: "0",
};

const BaseLayout = () => {
  return (
    <>
      <header>
        <Carousel autoplay>
          <div>
            <h3 style={contentStyle}>
              <img
                style={{ width: "100%" }}
                src="https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/6/638163680540850490_F-H1_800x300.png"
              />
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <img
                style={{ width: "100%" }}
                src="https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/6/638163678262879597_F-H1_800x300.jpg"
              />
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <img
                style={{ width: "100%" }}
                src="https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/5/638163323024664544_F-H1_800x300.png"
              />
            </h3>
          </div>
        </Carousel>
        <Tabs defaultActiveKey="home" centered items={items} />
      </header>
      <main style={{ minHeight: 70 }}>
        <Outlet />
      </main>
      <footer style={{ textAlign: "center" }}>
        <p>Design ©2023 Created by Phạm Anh Tuấn</p>
      </footer>
    </>
  );
};

export default BaseLayout;
