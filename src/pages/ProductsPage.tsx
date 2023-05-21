import { Link } from "react-router-dom";
import IProduct from "../interfaces/product";
import { Card, Col, Row, Spin, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const { Search } = Input;

const { Meta } = Card;

interface ProductsPage {
  products: IProduct[];
  searchParams: any;
}

const ProductsPage = ({ products, searchParams }: ProductsPage) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  if (!products) return <Spin indicator={antIcon} />;

  const [searchText, setSearchText] = useState("");
  const onHandleSubmit = (value: string) => {
    searchParams.set("_searchText", value)
    window.location.href = `http://localhost:5173/products?${searchParams.toString()}`;
  };

  return (
    <div style={{ maxWidth: "90%", margin: "0 auto" }}>
      <Search
        style={{ width: "22%", margin: 20, marginBottom: 40, marginLeft: 40 }}
        placeholder="Search name . . ."
        size="large"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        onSearch={onHandleSubmit}
        enterButton="Search"
        allowClear
      />
      <Row gutter={[16, 16]}>
        {products?.map((product) => (
          <Col span={6}>
            <Link to={`/products/${product._id}`}>
              <Card
                hoverable
                style={{ width: 280 }}
                cover={<img src={product.image[0].url} />}
              >
                <Meta
                  title={product.name}
                  description={product.price?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductsPage;
