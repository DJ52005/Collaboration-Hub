import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";


const CreateProject = () => {

  const navigate =
    useNavigate();

  const token =
    localStorage.getItem("token");

  const [formData,
    setFormData] =
    useState({

      title: "",
      domain: "",
      description: "",

      teamSize: "",

      techStack: "",

      githubLink: "",

      memberNames: "",

      isRecruiting: true,

      openPositions: "",

    });


  /*
  =====================================
  HANDLE CHANGE
  =====================================
  */

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,

      });

    };


  /*
  =====================================
  SUBMIT
  =====================================
  */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await axios.post(

          "http://localhost:5000/api/projects",

          {

            ...formData,

            techStack:
              formData.techStack
                .split(",")
                .map((tech) =>
                  tech.trim()
                ),

            memberNames:
              formData.memberNames
                .split(",")
                .map((member) =>
                  member.trim()
                ),

            openPositions:
              Number(
                formData.openPositions
              ),

          },

          {
            headers: {

              Authorization:
                `Bearer ${token}`,

            },
          }

        );

        navigate(
          "/my-projects"
        );

      } catch (error) {

        console.log(error);

      }
    };


  return (

    <MainLayout>

      <div className="max-w-3xl mx-auto">

        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">

          <h1 className="text-4xl font-bold text-white">

            Create Project

          </h1>

          <p className="text-slate-400 mt-3">

            Build your next collaboration

          </p>


          <form
            onSubmit={handleSubmit}
            className="space-y-6 mt-10"
          >

            {/* TITLE */}

            <div>

              <label className="text-sm text-slate-400">

                Project Title

              </label>

              <input
                type="text"
                name="title"

                value={formData.title}

                onChange={handleChange}

                className="w-full mt-2 bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none"
              />

            </div>


            {/* DOMAIN */}

            <div>

              <label className="text-sm text-slate-400">

                Domain

              </label>

              <input
                type="text"
                name="domain"

                value={formData.domain}

                onChange={handleChange}

                className="w-full mt-2 bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none"
              />

            </div>


            {/* DESCRIPTION */}

            <div>

              <label className="text-sm text-slate-400">

                Description

              </label>

              <textarea
                rows="5"
                name="description"

                value={formData.description}

                onChange={handleChange}

                className="w-full mt-2 bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none resize-none"
              />

            </div>


            {/* TEAM SIZE */}

            <div>

              <label className="text-sm text-slate-400">

                Team Size

              </label>

              <input
                type="number"
                name="teamSize"

                value={formData.teamSize}

                onChange={handleChange}

                className="w-full mt-2 bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none"
              />

            </div>


            {/* TECH STACK */}

            <div>

              <label className="text-sm text-slate-400">

                Tech Stack

              </label>

              <input
                type="text"
                name="techStack"

                placeholder="React, Node.js, MongoDB"

                value={formData.techStack}

                onChange={handleChange}

                className="w-full mt-2 bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none"
              />

            </div>


            {/* GITHUB LINK */}

            <div>

              <label className="text-sm text-slate-400">

                GitHub Link

              </label>

              <input
                type="text"
                name="githubLink"

                value={formData.githubLink}

                onChange={handleChange}

                className="w-full mt-2 bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none"
              />

            </div>


            {/* TEAM MEMBERS */}

            <div>

              <label className="text-sm text-slate-400">

                Existing Team Members

              </label>

              <input
                type="text"

                name="memberNames"

                placeholder="Dhara, Aman, Priya"

                value={formData.memberNames}

                onChange={handleChange}

                className="w-full mt-2 bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none"
              />

            </div>


            {/* RECRUITMENT */}

            <div>

              <label className="flex items-center gap-3 text-white">

                <input
                  type="checkbox"

                  checked={
                    formData.isRecruiting
                  }

                  onChange={(e) =>

                    setFormData({

                      ...formData,

                      isRecruiting:
                        e.target.checked,

                    })

                  }
                />

                Looking For Team Members

              </label>

            </div>


            {/* OPEN POSITIONS */}

            {
              formData.isRecruiting && (

                <div>

                  <label className="text-sm text-slate-400">

                    Open Positions

                  </label>

                  <input
                    type="number"

                    name="openPositions"

                    value={
                      formData.openPositions
                    }

                    onChange={
                      handleChange
                    }

                    className="w-full mt-2 bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none"
                  />

                </div>

              )
            }


            {/* BUTTON */}

            <button
              type="submit"

              className="w-full h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:opacity-90 transition"
            >

              Create Project

            </button>

          </form>

        </div>

      </div>

    </MainLayout>

  );
};

export default CreateProject;