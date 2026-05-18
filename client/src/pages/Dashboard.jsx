import MainLayout from "../components/layout/MainLayout";

const Dashboard = () => {

  const stats = [
    {
      title: "Active Projects",
      value: "24",
      color: "from-violet-500 to-purple-500",
    },

    {
      title: "Team Members",
      value: "156",
      color: "from-pink-500 to-fuchsia-500",
    },

    {
      title: "Hackathons Won",
      value: "8",
      color: "from-cyan-500 to-blue-500",
    },

    {
      title: "Skill Score",
      value: "94",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <MainLayout>

      {/* HEADER */}
      <div>

        <h1 className="text-4xl font-bold text-white">
          Welcome back, Dhara
        </h1>

        <p className="text-slate-400 text-base mt-3">
          Here's what's happening with your projects today
        </p>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-5 mt-8">

        {stats.map((stat) => (

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

        ))}

      </div>

      {/* LOWER SECTION */}
      <div className="grid grid-cols-3 gap-5 mt-8">

        {/* PROJECTS */}
        <div className="col-span-2 bg-white/[0.03] border border-white/10 rounded-3xl p-6">

          <div className="flex justify-between items-center">

            <h2 className="text-2xl font-bold text-white">
              Active Projects
            </h2>

            <button className="text-sm text-purple-400 hover:text-purple-300 transition">
              View All
            </button>

          </div>

          <div className="space-y-4 mt-6">

            {[1, 2, 3].map((item) => (

              <div
                key={item}
                className="bg-white/[0.04] rounded-3xl p-5"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h3 className="text-xl font-semibold text-white">
                      AI Study Companion
                    </h3>

                    <p className="text-slate-400 text-sm mt-1">
                      Machine Learning
                    </p>

                  </div>

                  <span className="bg-green-500/20 text-green-400 px-3 py-1 text-xs rounded-full">
                    Active
                  </span>

                </div>

                <div className="mt-4">

                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">

                    <div className="w-[75%] h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* HACKATHONS */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6">

          <h2 className="text-2xl font-bold text-white">
            Upcoming Hackathons
          </h2>

          <div className="space-y-4 mt-6">

            {[1, 2, 3].map((item) => (

              <div
                key={item}
                className="bg-white/[0.04] rounded-3xl p-4"
              >

                <h3 className="text-lg font-semibold text-white">
                  TechCrunch Disrupt
                </h3>

                <p className="text-slate-400 text-sm mt-2">
                  Prize Pool
                </p>

                <h4 className="text-yellow-400 text-xl font-bold mt-1">
                  $50,000
                </h4>

              </div>

            ))}

          </div>

        </div>

      </div>

    </MainLayout>
  );
};

export default Dashboard;