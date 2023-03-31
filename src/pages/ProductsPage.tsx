import { Link } from "react-router-dom";
import IProduct from "../interfaces/product";
interface ProductsPage {
  products: IProduct[];
}

const ProductsPage = ({ products }: ProductsPage) => {
  if (!products)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  return (
    <>
      <h2>Products Page</h2>
      <div className="row row-cols-2 row-cols-md-3 mt-4">
        {products?.map((product) => (
          <div key={product._id} className="card">
            <div className="row g-0">
              <div className="col-md-4">
                <Link to={`/products/${product._id}`}>
                  <img
                    src={product.image}
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </Link>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      {product.price?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductsPage;
