import React from "react";
import ICategory from "../../interfaces/category";
import { Button, Form, Input, Typography } from "antd";

interface IAddCategoryPage {
  onHandleCreateCategory: (category: ICategory) => void;
}

const AddCategoryPage = ({ onHandleCreateCategory }: IAddCategoryPage) => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
  };

  const onFinish = (values: ICategory) => {
    onHandleCreateCategory(values);
  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{ maxWidth: 800 }}
      validateMessages={validateMessages}
    >
      <Typography.Title level={2}>Thêm danh mục</Typography.Title>
      <Form.Item
        name="name"
        label="Category Name"
        rules={[
          { required: true },
          { whitespace: true, message: "${label} is required!" },
        ]}
      >
        <Input size="large" placeholder="Category Name" />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button size="large" type="primary" htmlType="submit">
          Thêm danh mục
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddCategoryPage;
