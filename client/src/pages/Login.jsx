import { useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaArrowRight,
} from "react-icons/fa";

import AuthLayout from "../components/AuthLayout";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/dashboard");

    } catch (error) {

      alert(error.response.data.message);

    }
  };


  return (
    <AuthLayout
      title="Login to your account"
      subtitle="Enter your credentials to access your account"
      sideTitle="Welcome Back! 👋"
      sideText="Great to see you again. Please login to continue collaborating on amazing projects."
      image="https://cdn-icons-png.flaticon.com/512/1055/1055687.png"
      bottomText="Don't have an account?"
      bottomLink="/register"
      bottomLinkText="Register"
    >

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* EMAIL */}
        <div>

          <label className="text-sm text-slate-300 mb-2 block">
            Email Address
          </label>

          <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-5">

            <FaEnvelope className="text-slate-400" />

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full bg-transparent p-4 outline-none text-white"
            />

          </div>

        </div>

        {/* PASSWORD */}
        <div>

          <label className="text-sm text-slate-300 mb-2 block">
            Password
          </label>

          <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-5">

            <FaLock className="text-slate-400" />

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              className="w-full bg-transparent p-4 outline-none text-white"
            />

          </div>

        </div>

        {/* OPTIONS */}
        <div className="flex justify-between text-sm">

          <div className="flex items-center gap-2 text-slate-400">

            <input type="checkbox" />

            Remember me

          </div>

          <Link
            className="text-purple-400 hover:text-pink-400"
          >
            Forgot Password?
          </Link>

        </div>

        {/* BUTTON */}
        <button
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition p-4 rounded-2xl font-semibold flex items-center justify-center gap-3 text-lg"
        >

          Login

          <FaArrowRight />

        </button>

      </form>

    </AuthLayout>
  );
};

export default Login;