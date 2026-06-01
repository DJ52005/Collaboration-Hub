import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import MainLayout from "../components/layout/MainLayout";


const Dashboard = () => {

  const token =
    localStorage.getItem("token");

  const [user,
    setUser] =
    useState(null);

  const [projects,
    setProjects] =
    useState([]);

  const [hackathons,
    setHackathons] =
    useState([]);


  /*
  =====================================
  FETCH DASHBOARD DATA
  =====================================
  */

  useEffect(() => {

    const fetchData =
      async () => {

        try {

          /*
          ==========================
          USER
          ==========================
          */

          const userRes =
            await axios.get(
              "http://localhost:5000/api/users/profile",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          setUser(
            userRes.data
          );


          /*
          ==========================
          PROJECTS
          ==========================
          */

          const projectRes =
            await axios.get(
              "http://localhost:5000/api/projects",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          setProjects(
            projectRes.data
          );


          /*
          ==========================
          HACKATHONS
          ==========================
          */

          const hackathonRes =
            await axios.get(
              "http://localhost:5000/api/hackathons"
            );

          setHackathons(
            hackathonRes.data
          );

        } catch (error) {

          console.log(error);

        }
      };

    fetchData();

  }, []);



  /*
  =====================================
  DYNAMIC STATS
  =====================================
  */

  const stats = [

    {
      title:
        "Active Projects",

      value:
        projects.length,

      color:
        "from-violet-500 to-purple-500",
    },

    {
      title:
        "My Skills",

      value:
        user?.skills?.length || 0,

      color:
        "from-pink-500 to-fuchsia-500",
    },

    {
      title:
        "Hackathons",

      value:
        hackathons.length,

      color:
        "from-cyan-500 to-blue-500",
    },

    {
      title:
        "Interests",

      value:
        user?.interests?.length || 0,

      color:
        "from-green-500 to-emerald-500",
    },

  ];


  return (

    <MainLayout>

      {/* HEADER */}

      <div>

        <h1 className="text-4xl font-bold text-white">

          Welcome back,
          {" "}
          {user?.name || "Student"}

        </h1>

        <p className="text-slate-400 text-base mt-3">

          Here's what's happening with your projects today

        </p>

      </div>


      {/* STATS */}

      <div className="grid grid-cols-4 gap-5 mt-8">

        {stats.map(
          (stat) => (

            <div
              key={stat.title}

              className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 backdrop-blur-xl"
            >

              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${stat.color}`}
              />

              <h2 className="text-3xl font-bold text-white mt-6">

                {stat.value}

              </h2>

              <p className="text-slate-400 text-sm mt-2">

                {stat.title}

              </p>

            </div>

          )
        )}

      </div>


      {/* LOWER SECTION */}

      <div className="grid grid-cols-3 gap-5 mt-8">

        {/* PROJECTS */}

        <div className="col-span-2 bg-white/[0.03] border border-white/10 rounded-3xl p-6">

          <div className="flex justify-between items-center">

            <h2 className="text-2xl font-bold text-white">

              Latest Projects

            </h2>

          </div>


          <div className="space-y-4 mt-6">

            {projects.slice(0,3).map(
              (project) => (

                <div
                  key={project._id}

                  className="bg-white/[0.04] rounded-3xl p-5"
                >

                  <div className="flex justify-between items-start">

                    <div>

                      <h3 className="text-xl font-semibold text-white">

                        {project.title}

                      </h3>

                      <p className="text-slate-400 text-sm mt-1">

                        {project.domain}

                      </p>

                    </div>

                    <span className="bg-green-500/20 text-green-400 px-3 py-1 text-xs rounded-full">

                      Active

                    </span>

                  </div>


                  <div className="mt-4">

                    <div className="flex flex-wrap gap-2">

                      {project.techStack?.map(
                        (tech,index)=>(

                          <span
                            key={index}

                            className="bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full text-xs"
                          >

                            {tech}

                          </span>

                        )
                      )}

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        </div>


        {/* HACKATHONS */}

        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6">

          <h2 className="text-2xl font-bold text-white">

            Latest Hackathons

          </h2>


          <div className="space-y-4 mt-6">

            {hackathons.slice(0,3).map(
              (hackathon) => (

                <div
                  key={hackathon.id}

                  className="bg-white/[0.04] rounded-3xl p-4"
                >

                  <h3 className="text-lg font-semibold text-white">

                    {hackathon.title}

                  </h3>

                  <p className="text-slate-400 text-sm mt-2">

                    Prize Pool

                  </p>

                  <h4 className="text-yellow-400 text-xl font-bold mt-1">

                    {hackathon.prize}

                  </h4>

                </div>

              )
            )}

          </div>

        </div>

      </div>

    </MainLayout>

  );
};

export default Dashboard;