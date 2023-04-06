import React, { useState } from "react";
import ICategory from "../../interfaces/category";
import { Link } from "react-router-dom";
import { Popconfirm, Space, Table, Button, message, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const { Search } = Input;

interface ICategoryManagementPage {
  categories: ICategory[];
  onHandleRemoveCategory: (id: string) => void;
}

const CategoryManagementPage = ({
  categories,
  onHandleRemoveCategory,
}: ICategoryManagementPage) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  if (!categories) return <Spin indicator={antIcon} />;

  const [searchText, setSearchText] = useState("");

  const confirm = (id: string) => {
    onHandleRemoveCategory(id);
    message.success(`Xóa danh mục thành công!`);
  };

  const cancel = () => {
    message.error("Đã hủy!");
  };

  const columns: ColumnsType<ICategory> = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Link to={`/admin/category/update/${record._id}`}>
            <Button type="primary" ghost>
              <EditOutlined />
              Edit
            </Button>
          </Link>
          <Popconfirm
            placement="topRight"
            title="Xóa danh mục?"
            description="Bạn có chắc chắn xóa danh mục này không?"
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

  const filterCate = categories?.filter((item) =>
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
      <Table columns={columns} dataSource={filterCate} />
    </>
  );
};

export default CategoryManagementPage;
