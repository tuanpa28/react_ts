import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IProduct from "../interfaces/product";
import { Card, Col, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Image } from "antd";

const { Meta } = Card;
interface ProductDetailPage {
  products: IProduct[];
}

const ProductDetailPage = ({ products }: ProductDetailPage) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  if (!products) return <Spin indicator={antIcon} />;

  const { id } = useParams();
  const [product, setProduct] = useState<IProduct>();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const currentPro = products?.find((product) => product._id === id);
    setProduct(currentPro!);
  }, [products]);

  return (
    <Col style={{ width: 400, margin: "0 auto", marginTop: 50 }}>
      <Card
        hoverable
        cover={
          <>
            <Image
              preview={{ visible: false }}
              // width={200}
              src={product?.image[0].url}
              onClick={() => setVisible(true)}
            />
            <div style={{ display: "none" }}>
              <Image.PreviewGroup
                preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
              >
                {product?.image?.map((item: any) => (
                  <Image src={`${item.url}`} />
                ))}
              </Image.PreviewGroup>
            </div>
          </>
        }
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
