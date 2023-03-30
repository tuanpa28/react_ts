import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "../api/auth";
import IUser from "../types/auth";
import Cookies from "js-cookie";

const SigninPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({
      ...(user! || {}),
      [name]: value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await signin(user!);
      Cookies.set("accessToken", data.accessToken, {
        expires: new Date(Date.now() + 30 * 60 * 1000),
      });
      alert("Đăng nhập thành công!");
      navigate("/admin");
    } catch ({ response }) {
      console.log(response);
    }
  };

  return (
    <div style={{ width: 300 }}>
      <h2>Signin</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default SigninPage;
