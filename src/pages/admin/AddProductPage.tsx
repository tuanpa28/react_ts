import IProduct from "../../interfaces/product";
import { useForm, SubmitHandler } from "react-hook-form";
interface AddProductPage {
  onHandleCreate: (product: IProduct) => void;
}

const AddProductPage = ({ onHandleCreate }: AddProductPage) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>();

  const onSubmit: SubmitHandler<IProduct> = (inputValue: IProduct) => {
    onHandleCreate(inputValue);
  };

  return (
    <div style={{ width: 300 }}>
      <h2>Create Product</h2>
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

        <button className="btn btn-secondary">More product</button>
      </form>
    </div>
  );
};

export default AddProductPage;
