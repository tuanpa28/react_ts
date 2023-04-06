import IProduct from "../../interfaces/product";
import ICategory from "../../interfaces/category";
import { Button, Form, Input, InputNumber, Typography, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Space, Upload } from "antd";
interface IAddProductPage {
  onHandleCreate: (product: IProduct) => void;
  categories: ICategory[];
}

const AddProductPage = ({ onHandleCreate, categories }: IAddProductPage) => {
  const selectOptions = categories?.map((cate) => {
    return { label: `${cate.name}`, value: `${cate._id}` };
  });

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
  };

  const onFinish = (values: IProduct) => {
    console.log(values);
    onHandleCreate(values);
  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{ maxWidth: 800 }}
      validateMessages={validateMessages}
    >
      <Typography.Title level={2}>Thêm sản phẩm</Typography.Title>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          { required: true },
          { whitespace: true, message: "${label} is required!" },
        ]}
      >
        <Input size="large" placeholder="Product Name" />
      </Form.Item>

      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, type: "number", min: 0 }]}
      >
        <InputNumber
          size="large"
          placeholder="Product Price"
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        name="image"
        label="Image"
        rules={[
          { required: true },
          { whitespace: true, message: "${label} is required!" },
        ]}
      >
        <Input
          size="large"
          placeholder="Product Image"
          addonBefore="https://"
          addonAfter=".com"
        />
      </Form.Item>

      {/* <Form.Item name="image" label="Image" rules={[{ required: true }]}>
        <Upload
          // action="https://api.cloudinary.com/v1_1/dugodumc5/image/upload"
          listType="picture"
          // maxCount={3}
          // multiple
        >
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
      </Form.Item> */}

      <Form.Item
        name="description"
        label="Description"
        rules={[
          { required: true },
          { whitespace: true, message: "${label} is required!" },
        ]}
      >
        <Input.TextArea rows={4} placeholder="Description" />
      </Form.Item>

      <Form.Item
        name="categoryId"
        label="Category"
        rules={[{ required: true }]}
      >
        <Select
          size="large"
          placeholder="---- Category ----"
          options={selectOptions}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button size="large" type="primary" htmlType="submit">
          Thêm sản phẩm
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProductPage;
