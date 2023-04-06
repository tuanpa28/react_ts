import { MenuProps } from "antd";
import { Layout, Dropdown, Avatar, notification } from "antd";
const { Header } = Layout;
import { UserOutlined, MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const logout = () => {
    Cookies.remove("accessToken");
    notification.success({
      message: "Đăng xuất thành công!",
    });
    navigate("/");
  };
  const items: MenuProps["items"] = [
    {
      label: <a>Tài khoản</a>,
      key: "0",
    },
    {
      label: <Link to={"/"}>Trang chủ</Link>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: <a onClick={logout}>Đăng xuất</a>,
      key: "3",
    },
  ];
  return (
    <Header style={{ padding: 0, background: "#FFF" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            fontSize: 18,
            marginLeft: 20,
            fontWeight: 700,
          }}
        >
          Chào mừng đến với trang quản trị!
        </div>
        <div style={{ marginRight: 35 }}>
          <Avatar
            style={{ marginRight: 5, marginBottom: 4 }}
            size={43}
            icon={<UserOutlined />}
          />
          <Dropdown menu={{ items }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <MoreOutlined style={{ fontSize: 21, color: "#000" }} />
            </a>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
