import { useEffect, useState } from "react";
import axios from "axios";

import MainLayout from "../components/layout/MainLayout";

import {
  Search,
  Plus,
  Users,
  Layers3,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const Projects = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [projects, setProjects] = useState([]);

  const [search, setSearch] = useState("");


  useEffect(() => {

    const fetchProjects = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/projects",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProjects(res.data);

      } catch (error) {

        console.log(error);

      }
    };

    fetchProjects();

  }, []);


  const filteredProjects = projects.filter((project) =>
    project.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  return (
    <MainLayout>

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Explore Projects
          </h1>

          <p className="text-slate-400 mt-3">
            Discover innovative student collaborations
          </p>

        </div>

        <button
          onClick={() => navigate("/create-project")}
          className="bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-3 rounded-2xl flex items-center gap-3 hover:opacity-90 transition"
        >

          <Plus size={20} />

          Create Project

        </button>

      </div>


      {/* SEARCH BAR */}
      <div className="mt-8 bg-white/[0.03] border border-white/10 rounded-3xl p-4 flex items-center gap-4">

        <Search className="text-slate-400" />

        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="bg-transparent outline-none w-full text-white"
        />

      </div>


      {/* FILTER TAGS */}
      <div className="flex gap-3 mt-6 flex-wrap">

        {[
          "All",
          "AI/ML",
          "Web Dev",
          "Blockchain",
          "Cybersecurity",
          "Mobile Apps",
        ].map((tag) => (

          <button
            key={tag}
            className="px-5 py-2 rounded-full bg-white/[0.04] border border-white/10 text-sm text-slate-300 hover:bg-purple-600/20 transition"
          >
            {tag}
          </button>

        ))}

      </div>


      {/* PROJECT GRID */}
      <div className="grid grid-cols-3 gap-6 mt-10">

        {filteredProjects.map((project) => (

          <div
            key={project._id}
            className="bg-white/[0.03] border border-white/10 rounded-[28px] p-6 backdrop-blur-xl hover:border-purple-500/30 hover:translate-y-[-4px] transition-all duration-300"
          >

            {/* TOP */}
            <div className="flex justify-between items-start">

              <div>

                <h2 className="text-2xl font-bold text-white">
                  {project.title}
                </h2>

                <p className="text-slate-400 text-sm mt-2">
                  {project.domain}
                </p>

              </div>

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">

                <Layers3 size={20} />

              </div>

            </div>


            {/* DESCRIPTION */}
            <p className="text-slate-400 mt-6 leading-relaxed text-sm">
              {project.description}
            </p>


            {/* TECH STACK */}
            <div className="flex flex-wrap gap-2 mt-6">

              {project.techStack.map((tech, index) => (

                <span
                  key={index}
                  className="bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full text-xs border border-purple-500/20"
                >
                  {tech}
                </span>

              ))}

            </div>


            {/* INFO */}
            <div className="flex justify-between mt-8 text-sm text-slate-400">

              <div className="flex items-center gap-2">

                <Users size={16} />

                {project.teamSize} Members

              </div>

              <div>
                by {project.createdBy?.name}
              </div>

            </div>


            {/* BUTTONS */}
            <div className="flex gap-3 mt-8">

              <button
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-2xl hover:opacity-90 transition"
              >
                Request
              </button>

              <button
                onClick={() =>
                  navigate(`/chat/${project._id}`)
                }
                className="flex-1 bg-white/[0.04] border border-white/10 py-3 rounded-2xl hover:bg-white/[0.07] transition"
              >
                Chat
              </button>

            </div>

          </div>

        ))}

      </div>

    </MainLayout>
  );
};

export default Projects;