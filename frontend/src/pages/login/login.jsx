import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

function login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.45),0_0_15px_rgba(255,255,255,0.1)] bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 border border-gray-700">
        <h1 className="text-3xl font-semibold text-center text-white">
          Login
          <span className="text-blue-400"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-200 font-medium">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full input input-bordered h-10 bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-200 font-medium">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10 bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link
            to="/signup"
            className="text-sm hover:underline hover:text-blue-400 mt-2 inline-block text-gray-300"
          >
            {"Don't"} have an account
          </Link>
          <div>
            <button
              className="btn btn-block btn-sm mt-2 bg-blue-600 hover:bg-blue-700 text-white border-none"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default login;
