import Cookies from "js-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signin } from "../api/auth";
import IUser from "../interfaces/auth";

const SigninPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>();

  const onSubmit: SubmitHandler<IUser> = async (inputValue: IUser) => {
    try {
      const { data } = await signin(inputValue);
      Cookies.set("accessToken", data.accessToken, {
        expires: new Date(Date.now() + 30 * 60 * 1000),
      });
      alert("Đăng nhập thành công!");
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ width: 300 }}>
      <h2>Signin</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <button className="btn btn-primary">Đăng nhập</button>
      </form>
    </div>
  );
};

export default SigninPage;
