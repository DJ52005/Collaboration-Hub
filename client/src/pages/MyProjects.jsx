import { useEffect, useState } from "react";

import axios from "axios";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import {
  Plus,
  Users,
  Layers3,
  ArrowRight,
} from "lucide-react";


const MyProjects = () => {

  const navigate =
    useNavigate();

  const [projects,
    setProjects] =
    useState([]);

  const token =
    localStorage.getItem("token");


  /*
  =====================================
  FETCH MY PROJECTS
  =====================================
  */

  useEffect(() => {

    const fetchProjects =
      async () => {

        try {

          const res =
            await axios.get(
              "http://localhost:5000/api/projects/my-projects",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
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


  return (

    <MainLayout>

      {/* HEADER */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold text-white">

            My Projects

          </h1>

          <p className="text-slate-400 mt-3">

            Manage your uploaded projects

          </p>

        </div>


        {/* CREATE BUTTON */}

        <button
          onClick={() =>
            navigate("/create-project")
          }

          className="bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-3 rounded-2xl flex items-center gap-3 hover:opacity-90 transition"
        >

          <Plus size={20} />

          Create Project

        </button>

      </div>


      {/* PROJECT GRID */}

      <div className="grid grid-cols-3 gap-6 mt-10">

        {projects.map(
          (project) => (

            <Link
              to={`/projects/${project._id}`}

              key={project._id}

              className="bg-white/[0.03] border border-white/10 rounded-[28px] p-6 backdrop-blur-xl hover:border-purple-500/30 hover:translate-y-[-4px] transition-all duration-300 block"
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

              <p className="text-slate-400 mt-6 leading-relaxed text-sm line-clamp-3">

                {project.description}

              </p>


              {/* TECH STACK */}

              <div className="flex flex-wrap gap-2 mt-6">

                {project.techStack?.map(
                  (tech, index) => (

                    <span
                      key={index}

                      className="bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full text-xs border border-purple-500/20"
                    >

                      {tech}

                    </span>

                  )
                )}

              </div>


              {/* INFO */}

              <div className="flex justify-between mt-8 text-sm text-slate-400">

                <div className="flex items-center gap-2">

                  <Users size={16} />

                  {project.teamSize} Members

                </div>

                <div>

                  Owner

                </div>

              </div>


              {/* FOOTER */}

              <div className="flex justify-between items-center mt-8">

                <button
                  onClick={(e) => {

                    e.preventDefault();

                    navigate(
                      `/chat/${project._id}`
                    );

                  }}

                  className="bg-white/[0.04] border border-white/10 px-5 py-3 rounded-2xl hover:bg-white/[0.07] transition"
                >

                  Chat

                </button>


                <div className="flex items-center gap-2 text-purple-400 font-medium">

                  Manage Project

                  <ArrowRight size={18} />

                </div>

              </div>

            </Link>

          )
        )}

      </div>

    </MainLayout>

  );
};

export default MyProjects;