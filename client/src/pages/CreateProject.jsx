import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    domain: "",
    techStack: "",
    teamSize: "",
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
        "http://localhost:5000/api/projects",
        {
          ...formData,
          techStack: formData.techStack
            .split(",")
            .map((tech) => tech.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Project Created");

      navigate("/projects");

    } catch (error) {

      console.log(error);

    }
  };


  return (
    <div className="min-h-screen bg-slate-900 text-white flex justify-center items-center p-6">

      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 w-full max-w-2xl p-8 rounded-2xl space-y-5"
      >

        <h1 className="text-3xl font-bold text-center">
          Create Project
        </h1>

        <input
          type="text"
          name="title"
          placeholder="Project Title"
          onChange={handleChange}
          className="w-full bg-slate-700 p-4 rounded"
        />

        <textarea
          name="description"
          placeholder="Project Description"
          onChange={handleChange}
          className="w-full bg-slate-700 p-4 rounded h-32"
        />

        <input
          type="text"
          name="domain"
          placeholder="Domain (AI, Web Dev, Blockchain...)"
          onChange={handleChange}
          className="w-full bg-slate-700 p-4 rounded"
        />

        <input
          type="text"
          name="techStack"
          placeholder="Tech Stack (React, Node, MongoDB)"
          onChange={handleChange}
          className="w-full bg-slate-700 p-4 rounded"
        />

        <input
          type="number"
          name="teamSize"
          placeholder="Team Size"
          onChange={handleChange}
          className="w-full bg-slate-700 p-4 rounded"
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 transition p-4 rounded-xl font-semibold"
        >
          Create Project
        </button>

      </form>

    </div>
  );
};

export default CreateProject;