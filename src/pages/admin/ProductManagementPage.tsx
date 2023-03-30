import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import IProduct from "../../types/product";

interface IProps {
  products: IProduct[];
  onHandleRemove: (id: string) => void;
}

const ProductManagementPage = (props: IProps) => {
  const navigate = useNavigate();

  const handleRemoveCookies = () => {
    if (confirm("Bạn muốn đăng xuất?")) {
      Cookies.remove("accessToken");
      navigate("/");
    }
  };

  return (
    <div style={{ width: 1000 }}>
      <h2>Product List</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            <th scope="col">Price</th>
            <th scope="col">Description</th>
            <th scope="col">
              <Link to={`/admin/products/add`}>
                <button className="btn btn-secondary">Create</button>
              </Link>
              <button
                onClick={handleRemoveCookies}
                className="btn btn-secondary mx-2"
              >
                Logout
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {props?.products?.map((pro, i) => (
            <tr key={pro._id}>
              <th scope="row">{i + 1}</th>
              <td>{pro.name}</td>
              <td>
                <img width="50" height="50" src={pro.image} />
              </td>
              <td>
                {pro.price?.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
              <td>{pro.description}</td>
              <td>
                <button
                  onClick={() => props?.onHandleRemove(pro._id!)}
                  className="btn btn-secondary"
                >
                  Remove
                </button>
                <Link to={`/admin/products/update/${pro._id}`}>
                  <button className="btn btn-secondary mx-2">Update</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagementPage;
