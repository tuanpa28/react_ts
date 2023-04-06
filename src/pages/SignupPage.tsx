import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/auth";
import IUser from "../interfaces/auth";
import { Button, Form, Input, Typography } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";

const SignupPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values: IUser) => {
    try {
      await signup(values);
      alert("Đăng ký thành công!");
      navigate("/signin");
    } catch (error) {
      console.log(error);
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
      <Typography.Title level={2}>Đăng ký</Typography.Title>
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Vui lòng nhập UserName!" }]}
      >
        <Input size="large" prefix={<UserOutlined />} placeholder="UserName" />
      </Form.Item>
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
      <Form.Item
        name="confirmPassword"
        rules={[{ required: true, message: "Vui lòng nhập Confirm Password!" }]}
      >
        <Input.Password
          size="large"
          prefix={<LockOutlined />}
          placeholder="Confirm Password"
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
          Đăng ký
        </Button>
        <Link to={"/signin"}>Signin!</Link>
      </Form.Item>
    </Form>
  );
};

export default SignupPage;
