import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import IProduct from "../../interfaces/product";

interface UpdateProductPage {
  products: IProduct[];
  onHandleUpdate: (product: IProduct) => void;
}

const UpdateProductPage = ({ products, onHandleUpdate }: UpdateProductPage) => {
  if (!products)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );

  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IProduct>();

  useEffect(() => {
    const currentPro = products?.find((product) => product._id === id);
    reset(currentPro);
  }, [products]);

  const onSubmit: SubmitHandler<IProduct> = (inputValue: IProduct) => {
    onHandleUpdate(inputValue);
  };

  return (
    <div style={{ width: 300 }}>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            {...register("name", { required: true })}
          />
          {errors.name && <p>Name không được trống!</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="text"
            className="form-control"
            {...register("image", { required: true })}
          />
          {errors.image && <p>Image không được trống!</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            {...register("price", { required: true })}
          />
          {errors.price && <p>Price không được trống!</p>}
        </div>

        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            {...register("description", { required: true })}
          />
          {errors.description && <p>Description không được trống!</p>}
          <label>Description</label>
        </div>

        <button className="btn btn-secondary">Update product</button>
      </form>
    </div>
  );
};

export default UpdateProductPage;
