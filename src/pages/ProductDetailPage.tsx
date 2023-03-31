import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IProduct from "../interfaces/product";
interface ProductDetailPage {
  products: IProduct[];
}

const ProductDetailPage = ({ products }: ProductDetailPage) => {
  if (!products)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    const currentPro = products?.find((product) => product._id === id);
    setProduct(currentPro!);
  }, [products]);

  return (
    <>
      <h2>Product Detail Page</h2>
      <div className="card mt-4">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={product?.image}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{product?.name}</h5>
              <p className="card-text">{product?.description}</p>
              <p className="card-text">
                <small className="text-muted">
                  {product?.price?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
