import { useState } from "react";

import axios from "axios";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaArrowRight,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

      await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      navigate("/login");

    } catch (error) {

      alert(error.response.data.message);

    }
  };


  return (
    <AuthLayout
      title="Create your account"
      subtitle="Fill in the details to get started"
      sideTitle="Create Account 🚀"
      sideText="Join Campus Hub and start collaborating on amazing projects and hackathons."
      image="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      bottomText="Already have an account?"
      bottomLink="/login"
      bottomLinkText="Login"
    >

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* NAME */}
        <div>

          <label className="text-sm text-slate-300 mb-2 block">
            Full Name
          </label>

          <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-5">

            <FaUser className="text-slate-400" />

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              onChange={handleChange}
              className="w-full bg-transparent p-4 outline-none text-white"
            />

          </div>

        </div>

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
              placeholder="Create password"
              onChange={handleChange}
              className="w-full bg-transparent p-4 outline-none text-white"
            />

          </div>

        </div>

        {/* TERMS */}
        <div className="flex items-center gap-3 text-sm text-slate-400">

          <input type="checkbox" />

          I agree to the Terms & Privacy Policy

        </div>

        {/* BUTTON */}
        <button
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition p-4 rounded-2xl font-semibold flex items-center justify-center gap-3 text-lg"
        >

          Register

          <FaArrowRight />

        </button>

      </form>

    </AuthLayout>
  );
};

export default Register;