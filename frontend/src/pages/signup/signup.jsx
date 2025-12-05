import React from "react";
import { Link } from "react-router-dom";
import GenderCheckBox from "./genderCheckBox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const signup = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, Signup } = useSignup();

  const handleCheckChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Signup(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto px-4">
      <div className="w-full p-4 sm:p-6 rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.45),0_0_15px_rgba(255,255,255,0.1)] bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 border border-gray-700">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center text-white">
          Sign Up <span className="text-blue-400">ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-200 font-medium">
                Full Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full input input-bordered h-10 bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>
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
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
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
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-200 font-medium">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10 bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>
          <GenderCheckBox
            onCheckboxChange={handleCheckChange}
            selectedGender={inputs.gender}
          />

          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-400 mt-2 inline-block text-gray-300"
          >
            Already have an account?
          </Link>
          <div>
            <button
              className="btn btn-block btn-sm mt-2 bg-blue-600 hover:bg-blue-700 text-white border-none"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default signup;
