import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../api/auth";
import IUser from "../interfaces/auth";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography, message, notification } from "antd";

const SigninPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values: IUser) => {
    try {
      const { data } = await signin(values);
      Cookies.set("accessToken", data.accessToken, {
        expires: new Date(Date.now() + 30 * 60 * 1000),
      });
      message.success("Đăng nhập thành công!");
      navigate("/admin");
    } catch ({ response }: any) {
      notification.error({
        message: response.data.message,
      });
    }
  };

  return (
    <Form
      name="basic"
      style={{ maxWidth: 350, margin: "0 auto", marginTop: 100 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Typography.Title level={2}>Đăng nhập</Typography.Title>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Vui lòng nhập Email!" }]}
      >
        <Input
          type="email"
          size="large"
          prefix={<MailOutlined />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Vui lòng nhập Password!" }]}
      >
        <Input.Password
          size="large"
          prefix={<LockOutlined />}
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          className="login-form-button"
          style={{ width: "100%" }}
        >
          Đăng nhập
        </Button>
        Or <Link to={"/signup"}>register now!</Link>
      </Form.Item>
    </Form>
  );
};

export default SigninPage;
