import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../config/axios";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  function submitHandler(e) {
    e.preventDefault();
    axiosInstance
      .post("/users/login", { email, password })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <div className="min-h-screen bg-gray-900 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="text-white text-3xl font-bold text-center mb-8">
            Login
          </div>
          <form
            onSubmit={submitHandler}
            className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="email"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="***********"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
              <Link
                className="inline-block align-baseline font-bold text-sm text-white hover:text-blue-500"
                to="/register"
              >
                Don't have an account? Create one
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
