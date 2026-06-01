import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

import MainLayout from "../components/layout/MainLayout";

import {
  Users,
  Calendar,
  ArrowRight,
} from "lucide-react";

const ProjectDetails = () => {

  const { id } = useParams();
  const navigate =
  useNavigate();

  const [project, setProject] =
    useState(null);

  const [currentUser, setCurrentUser] =
    useState(null);

  const token =
    localStorage.getItem("token");

  useEffect(() => {

    const fetchData =
      async () => {

        try {

          // FETCH PROJECT

          const projectRes =
            await axios.get(
              `http://localhost:5000/api/projects/${id}`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          setProject(
            projectRes.data
          );

          // FETCH CURRENT USER

          const profileRes =
            await axios.get(
              "http://localhost:5000/api/users/profile",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          setCurrentUser(
            profileRes.data
          );

        } catch (error) {

          console.log(error);

        }
      };

    fetchData();

  }, [id]);

  if (!project || !currentUser) {

    return (
      <MainLayout>
        <div className="text-white">
          Loading...
        </div>
      </MainLayout>
    );
  }

  const isOwner =
    currentUser?._id?.toString() ===
    project?.createdBy?._id?.toString();

  return (

    <MainLayout>

      <div className="space-y-6">

        {/* BANNER */}

        <div className="relative h-[260px] rounded-[32px] overflow-hidden border border-white/10">

          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070"
            alt="banner"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute bottom-8 left-8">

            <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm">

              Active

            </span>

            <h1 className="text-5xl font-bold text-white mt-4">

              {project.title}

            </h1>

            <p className="text-slate-300 text-lg mt-2">

              {project.domain}

            </p>

          </div>

        </div>

        {/* CONTENT */}

        <div className="grid grid-cols-3 gap-6">

          {/* LEFT SIDE */}

          <div className="col-span-2 space-y-6">

            {/* ABOUT */}

            <div className="bg-white/[0.03] border border-white/10 rounded-[28px] p-6">

              <h2 className="text-2xl font-bold text-white">

                About Project

              </h2>

              <p className="text-slate-300 mt-4 leading-relaxed">

                {project.description}

              </p>

            </div>

            {/* TECH STACK */}

            <div className="bg-white/[0.03] border border-white/10 rounded-[28px] p-6">

              <h2 className="text-2xl font-bold text-white">

                Tech Stack

              </h2>

              <div className="flex flex-wrap gap-3 mt-5">

                {project.techStack?.map(
                  (tech, index) => (

                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm"
                    >

                      {tech}

                    </span>

                  )
                )}

              </div>

            </div>

            {/* TEAM MEMBERS */}

            <div className="bg-white/[0.03] border border-white/10 rounded-[28px] p-6">

              <div className="flex items-center gap-3">

                <Users className="text-pink-400" />

                <h2 className="text-2xl font-bold text-white">

                  Team Members

                </h2>

              </div>

              <div className="mt-5 space-y-4">

                {project.teamMembers?.map(
                  (member) => (

                    <div
                      key={member._id}
                      className="flex items-center gap-4 bg-white/[0.03] border border-white/5 rounded-2xl p-4"
                    >

                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">

                        {member.name?.charAt(0)}

                      </div>

                      <div>

                        <h3 className="text-white font-semibold">

                          {member.name}

                        </h3>

                        <p className="text-slate-400 text-sm">

                          Team Member

                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>

              {project.memberNames?.length > 0 && (

                <div className="mt-6">

                  <h3 className="text-white font-semibold mb-4">

                    Additional Members

                  </h3>

                  <div className="space-y-2">

                    {project.memberNames.map(
                      (member, index) => (

                        <div
                          key={index}
                          className="bg-white/[0.03] rounded-xl px-4 py-3 text-white"
                        >

                          {member}

                        </div>

                      )
                    )}

                  </div>

                </div>

              )}

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="space-y-6">

            {/* ACTION CARD */}

            <div className="bg-white/[0.03] border border-white/10 rounded-[28px] p-6">

              {isOwner ? (

                <>
                  <button
  onClick={() =>
  navigate(
    `/edit-project/${project._id}`
  )
}
  className="w-full h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold"
>

  Edit Project

</button>

                  <button
                    className="w-full h-14 rounded-2xl bg-red-500/20 border border-red-500/20 text-red-400 mt-4"
                  >

                    Delete Project

                  </button>
                </>

              ) : project.isRecruiting ? (

                <button
                  className="w-full h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold flex items-center justify-center gap-2"
                >

                  Request To Join

                  <ArrowRight size={18} />

                </button>

              ) : (

                <button
                  disabled
                  className="w-full h-14 rounded-2xl bg-white/5 text-slate-500 cursor-not-allowed"
                >

                  Recruitment Closed

                </button>

              )}

              {project.githubLink && (

                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full h-14 rounded-2xl border border-white/10 mt-4 text-white flex items-center justify-center"
                >

                  🌐 View GitHub

                </a>

              )}

            </div>

            {/* PROJECT INFO */}

            <div className="bg-white/[0.03] border border-white/10 rounded-[28px] p-6 space-y-5">

              <div className="flex justify-between">

                <span className="text-slate-400">

                  Team Size

                </span>

                <span className="text-white">

                  {project.teamSize}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-400">

                  Recruitment

                </span>

                <span
                  className={
                    project.isRecruiting
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >

                  {project.isRecruiting
                    ? "Open"
                    : "Closed"}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-400">

                  Open Positions

                </span>

                <span className="text-white">

                  {project.openPositions || 0}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-400">

                  Created

                </span>

                <span className="text-white flex items-center gap-2">

                  <Calendar size={16} />

                  {new Date(
                    project.createdAt
                  ).toLocaleDateString()}

                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>

  );
};

export default ProjectDetails;