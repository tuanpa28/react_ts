import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/auth";
import IUser from "../interfaces/auth";

const SignupPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>();

  const onSubmit: SubmitHandler<IUser> = async (data: IUser) => {
    try {
      await signup(data!);
      alert("Đăng ký thành công!");
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ width: 300 }}>
      <h2>Signup</h2>
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
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            {...register("email", { required: true })}
          />
          {errors.email && <p>Email không được trống!</p>}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            {...register("password", { required: true })}
          />
          {errors.password && <p>Password không được trống!</p>}
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            {...register("confirmPassword", { required: true })}
          />
          {errors.confirmPassword && <p>ConfirmPassword không được trống!</p>}
        </div>

        <button className="btn btn-primary">Đăng ký</button>
      </form>
    </div>
  );
};

export default SignupPage;
