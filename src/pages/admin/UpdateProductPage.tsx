import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IProduct from "../../types/product";

interface IProps {
  products: IProduct[];
  onHandleUpdate: (product: IProduct) => void;
}

const UpdateProductPage = (props: IProps) => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    const currentPro = props.products?.find((product) => product._id === id);
    setProduct(currentPro!);
  }, [props]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setProduct({
      ...(product! || {}),
      [name]: value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props?.onHandleUpdate(product!);
  };

  return (
    <div style={{ width: 300 }}>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            defaultValue={product?.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="text"
            name="image"
            className="form-control"
            defaultValue={product?.image}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            defaultValue={product?.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            name="description"
            defaultValue={product?.description}
            onChange={handleChange}
          />
          <label>Description</label>
        </div>

        <button type="submit" className="btn btn-secondary">
          Update product
        </button>
      </form>
    </div>
  );
};

export default UpdateProductPage;
