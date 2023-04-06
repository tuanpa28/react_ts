import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IProduct from "../interfaces/product";
import { Card, Col, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Meta } = Card;
interface ProductDetailPage {
  products: IProduct[];
}

const ProductDetailPage = ({ products }: ProductDetailPage) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  if (!products) return <Spin indicator={antIcon} />;

  const { id } = useParams();
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    const currentPro = products?.find((product) => product._id === id);
    setProduct(currentPro!);
  }, [products]);

  return (
    <Col style={{ width: 400, margin: "0 auto", marginTop: 50 }}>
      <Card
        hoverable
        cover={<img style={{ width: 300 }} src={product?.image} />}
      >
        <Meta
          title={product?.name}
          description={product?.price?.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        />
        <Meta description={product?.description} />
      </Card>
    </Col>
  );
};

export default ProductDetailPage;
