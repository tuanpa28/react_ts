import Cookies from "js-cookie";
import { Link, Navigate, Outlet } from "react-router-dom";
import React, { useState } from "react";
import { MenuProps, MenuTheme } from "antd";
import { Breadcrumb, Layout, Menu, theme, Switch, message } from "antd";
const { Content, Footer, Sider } = Layout;
import {
  AppstoreOutlined,
  SolutionOutlined,
  PieChartOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import reactLogo from "../../assets/react.svg";
import HeaderComponent from "../admin/Header";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link to={"/admin"}>Thống kê</Link>, "sub1", <PieChartOutlined />),

  getItem("Danh mục", "sub2", <AppstoreOutlined />, [
    getItem(<Link to={"/admin/category/add"}>Thêm danh mục</Link>, "2"),
    getItem(<Link to={"/admin/category"}>Danh mục</Link>, "3"),
  ]),

  getItem("Sản phẩm", "sub3", <SolutionOutlined />, [
    getItem(<Link to={"products/add"}>Thêm sản phẩm</Link>, "4"),
    getItem(<Link to={"products"}>Sản phẩm</Link>, "5"),
  ]),
];

const AdminLayout = () => {
  const [themeM, setThemeM] = useState<MenuTheme>("dark");
  const [current, setCurrent] = useState("1");
  const [collapsed, setCollapsed] = useState(false);

  const changeTheme = (value: boolean) => {
    setThemeM(value ? "dark" : "light");
  };

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            margin: 20,
            height: 40,
            textAlign: "center",
          }}
        >
          <Link to={"/admin"}>
            <img
              src={reactLogo}
              alt="React logo"
              style={{ width: "100%", maxWidth: 70 }}
            />
          </Link>
        </div>

        <Switch
          style={{ marginLeft: 10 }}
          checked={themeM === "dark"}
          onChange={changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
        <Menu
          theme={themeM}
          onClick={onClick}
          defaultOpenKeys={["sub1"]}
          selectedKeys={[current]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <HeaderComponent />

        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            style={{ margin: "12px 0" }}
            items={[
              {
                href: "/",
                title: <HomeOutlined />,
              },
              {
                href: "/admin",
                title: (
                  <>
                    <UserOutlined />
                    <span>Quản trị</span>
                  </>
                ),
              },
              {
                title: "Thống kê",
              },
            ]}
          />
          <main style={{ marginTop: 25 }}>
            {Cookies.get("accessToken") ? (
              <Outlet />
            ) : (
              (message.success("Mời bạn đăng nhập để truy cập trang quản trị!"),
              (<Navigate to="/signin" replace />))
            )}
          </main>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Design ©2023 Created by Phạm Anh Tuấn
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
