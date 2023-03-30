import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <h2>HomePage</h2>
      <div>
        <span className="mx-2">
          <Link to={"/signin"}>
            <button className="btn btn-secondary">Đăng nhập</button>
          </Link>
        </span>
        <span>
          <Link to={"/signup"}>
            <button className="btn btn-secondary">Đăng ký</button>
          </Link>
        </span>
      </div>
    </>
  );
};

export default HomePage;
