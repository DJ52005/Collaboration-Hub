import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

const EditProject = () => {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const token =
    localStorage.getItem("token");

  const [loading,
    setLoading] =
    useState(true);

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
  FETCH PROJECT
  =====================================
  */

  useEffect(() => {

    const fetchProject =
      async () => {

        try {

          const res =
            await axios.get(

              `http://localhost:5000/api/projects/${id}`,

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }

            );

          const project =
            res.data;

          setFormData({

            title:
              project.title || "",

            domain:
              project.domain || "",

            description:
              project.description || "",

            teamSize:
              project.teamSize || "",

            techStack:
              project.techStack?.join(", ") || "",

            githubLink:
              project.githubLink || "",

            memberNames:
              project.memberNames?.join(", ") || "",

            isRecruiting:
              project.isRecruiting,

            openPositions:
              project.openPositions || "",

          });

          setLoading(false);

        } catch (error) {

          console.log(error);

        }
      };

    fetchProject();

  }, [id]);

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
  UPDATE PROJECT
  =====================================
  */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await axios.put(

          `http://localhost:5000/api/projects/${id}`,

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
          `/projects/${id}`
        );

      } catch (error) {

        console.log(error);

      }
    };

  if (loading) {

    return (
      <MainLayout>
        <div className="text-white">
          Loading...
        </div>
      </MainLayout>
    );
  }

  return (

    <MainLayout>

      <div className="max-w-3xl mx-auto">

        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">

          <h1 className="text-4xl font-bold text-white">

            Edit Project

          </h1>

          <p className="text-slate-400 mt-3">

            Update project details

          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 mt-10"
          >

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Project Title"
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 text-white"
            />

            <input
              type="text"
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              placeholder="Domain"
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 text-white"
            />

            <textarea
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 text-white"
            />

            <input
              type="number"
              name="teamSize"
              value={formData.teamSize}
              onChange={handleChange}
              placeholder="Team Size"
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 text-white"
            />

            <input
              type="text"
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              placeholder="React, Node, MongoDB"
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 text-white"
            />

            <input
              type="text"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
              placeholder="GitHub Link"
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 text-white"
            />

            <input
              type="text"
              name="memberNames"
              value={formData.memberNames}
              onChange={handleChange}
              placeholder="Team Members"
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 text-white"
            />

            <label className="flex items-center gap-3 text-white">

              <input
                type="checkbox"
                checked={formData.isRecruiting}
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

            {formData.isRecruiting && (

              <input
                type="number"
                name="openPositions"
                value={formData.openPositions}
                onChange={handleChange}
                placeholder="Open Positions"
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 text-white"
              />

            )}

            <button
              type="submit"
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold"
            >

              Save Changes

            </button>

          </form>

        </div>

      </div>

    </MainLayout>

  );
};

export default EditProject;