import instance from "./config";
import IUser from "../types/auth";

const signup = (user: IUser) => {
  return instance.post(`/signup`, user);
};

const signin = (user: IUser) => {
  return instance.post(`/signin`, user);
};

export { signup, signin };
