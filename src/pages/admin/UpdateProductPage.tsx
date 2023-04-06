import { LoadingOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Spin,
  Typography,
} from "antd";
import { useParams } from "react-router-dom";
import ICategory from "../../interfaces/category";
import IProduct from "../../interfaces/product";
interface IUpdateProductPage {
  products: IProduct[];
  categories: ICategory[];
  onHandleUpdate: (product: IProduct) => void;
}

const UpdateProductPage = ({
  products,
  categories,
  onHandleUpdate,
}: IUpdateProductPage) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  if (!products) return <Spin indicator={antIcon} />;

  const { id } = useParams();
  const product = products?.find((product) => product._id === id);
  const [form] = Form.useForm();
  // const cateId = product?.categoryId?._id
  //   ? product?.categoryId?._id
  //   : product?.categoryId;

  form.setFieldsValue({
    _id: product?._id,
    name: product?.name,
    price: product?.price,
    image: product?.image,
    description: product?.description,
    categoryId: product?.categoryId,
  });

  const selectOptions = categories?.map((cate) => {
    return { label: `${cate.name}`, value: `${cate._id}` };
  });

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: "${label} is required!",
  };

  const onFinish = (values: IProduct) => {
    onHandleUpdate(values);
  };

  return (
    <Form
      form={form}
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{ maxWidth: 800 }}
      validateMessages={validateMessages}
    >
      <Typography.Title level={2}>Sửa sản phẩm</Typography.Title>
      <Form.Item name="_id" style={{ display: "none" }}>
        <Input size="large" />
      </Form.Item>

      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
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
        <Input
          size="large"
          placeholder="Product Image"
          addonBefore="https://"
          addonAfter=".com"
        />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true }]}
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
          Sửa sản phẩm
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateProductPage;
