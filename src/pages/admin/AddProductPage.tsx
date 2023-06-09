import IProduct from "../../interfaces/product";
import ICategory from "../../interfaces/category";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Typography,
  Select,
  Upload,
  UploadProps,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

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
    const newImages = values?.image?.fileList?.map(({ response }: any) => {
      return { url: response.urls[0].url, publicId: response.urls[0].publicId };
    });
    const newValues = { ...values, image: newImages };
    onHandleCreate(newValues);
  };

  const props: UploadProps = {
    listType: "picture",
    name: "image",
    multiple: true,
    action: "http://localhost:8080/api/images/upload",
    onChange(info) {
      const { status, response } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
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

      <Form.Item name="image" label="Image" rules={[{ required: true }]}>
        <Dragger {...props}>
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Dragger>
      </Form.Item>

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
