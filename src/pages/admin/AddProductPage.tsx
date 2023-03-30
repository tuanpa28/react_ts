import { ChangeEvent, FormEvent, useState } from "react";
import IProduct from "../../types/product";

interface IProps {
  onHandleCreate: (product: IProduct) => void;
}

const AddProductPage = (props: IProps) => {
  const [product, setProduct] = useState<IProduct>();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setProduct({
      ...(product! || {}),
      [name]: value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props?.onHandleCreate(product!);
  };

  return (
    <div style={{ width: 300 }}>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="text"
            name="image"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            name="description"
            onChange={handleChange}
          />
          <label>Description</label>
        </div>

        <button type="submit" className="btn btn-secondary">
          More product
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
