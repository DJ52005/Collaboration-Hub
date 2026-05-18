import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    bio: "",
    skills: "",
    github: "",
    profilePic: "",
  });


  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFormData({
          bio: res.data.bio || "",
          skills: res.data.skills?.join(", ") || "",
          github: res.data.github || "",
          profilePic: res.data.profilePic || "",
        });

      } catch (error) {

        console.log(error);

      }
    };

    fetchProfile();

  }, []);


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.put(
        "http://localhost:5000/api/users/profile",
        {
          ...formData,
          skills: formData.skills
            .split(",")
            .map((skill) => skill.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile Updated");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

    }
  };


  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">

      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 w-full max-w-xl p-8 rounded-2xl space-y-5"
      >

        <h1 className="text-3xl font-bold text-center">
          Edit Profile
        </h1>

        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full bg-slate-700 p-4 rounded outline-none h-28"
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
          className="w-full bg-slate-700 p-4 rounded outline-none"
        />

        <input
          type="text"
          name="github"
          placeholder="GitHub Link"
          value={formData.github}
          onChange={handleChange}
          className="w-full bg-slate-700 p-4 rounded outline-none"
        />

        <input
          type="text"
          name="profilePic"
          placeholder="Profile Image URL"
          value={formData.profilePic}
          onChange={handleChange}
          className="w-full bg-slate-700 p-4 rounded outline-none"
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 transition p-4 rounded font-semibold"
        >
          Save Profile
        </button>

      </form>

    </div>
  );
};

export default EditProfile;