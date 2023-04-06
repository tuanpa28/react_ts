import { Link } from "react-router-dom";
import IProduct from "../../interfaces/product";
import { Popconfirm, Space, Table, Button, message, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import ICategory from "../../interfaces/category";
import { useState } from "react";

const { Search } = Input;

interface IProductManagementPage {
  products: IProduct[];
  onHandleRemove: (id: string) => void;
  categories: ICategory[];
}

const ProductManagementPage = ({
  onHandleRemove,
  products,
  categories,
}: IProductManagementPage) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  if (!products) return <Spin indicator={antIcon} />;

  const [searchText, setSearchText] = useState("");

  const cateFilter = categories?.map((cate) => {
    return { text: `${cate.name}`, value: `${cate._id}` };
  });

  const confirm = (idProduct: string) => {
    onHandleRemove(idProduct);
    message.success(`Xóa sản phẩm thành công!`);
  };

  const cancel = () => {
    message.error("Đã hủy!");
  };

  const columns: ColumnsType<IProduct> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <img width={50} src={image} />,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.price - b.price,
    },
    Table.EXPAND_COLUMN,
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      render: (text) => {
        return text.slice(0, 50).concat(" . . .");
      },
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "categoryId",
      render: (cate) => (
        <span>
          {categories?.map((category) =>
            category._id === cate ? category.name : ""
          )}
        </span>
      ),
      filters: [...cateFilter],
      onFilter: (value: string, record: IProduct) =>
        record?.categoryId?.startsWith(value),
      filterMode: "tree",
      filterSearch: true,
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Link to={`/admin/products/update/${record._id}`}>
            <Button type="primary" ghost>
              <EditOutlined />
              Edit
            </Button>
          </Link>
          <Popconfirm
            placement="topRight"
            title="Xóa sản phẩm?"
            description="Bạn có chắc chắn xóa sản phẩm này không?"
            onConfirm={() => confirm(record._id)}
            onCancel={cancel}
            okText="Đồng ý"
            cancelText="Không"
          >
            <Button type="primary" danger>
              <DeleteOutlined />
              Remove
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const filterPro = products?.filter((item) =>
    item?.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
  );

  return (
    <>
      <Search
        style={{ width: "22%", marginBottom: 10 }}
        placeholder="Search name . . ."
        size="large"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        loading
      />
      <Table
        columns={columns}
        dataSource={filterPro}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
        }}
      />
    </>
  );
};

export default ProductManagementPage;
