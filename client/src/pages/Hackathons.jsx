import { useEffect, useState } from "react";

import axios from "axios";

import MainLayout from "../components/layout/MainLayout";

import {
  Trophy,
  Calendar,
  ArrowUpRight,
} from "lucide-react";


const Hackathons = () => {

  const [hackathons,
    setHackathons] =
    useState([]);


  /*
  =====================================
  FETCH HACKATHONS
  =====================================
  */

  useEffect(() => {

    const fetchHackathons =
      async () => {

        try {

          const res =
            await axios.get(
              "http://localhost:5000/api/hackathons"
            );

          setHackathons(
            res.data
          );

        } catch (error) {

          console.log(error);

        }
      };

    fetchHackathons();

  }, []);


  return (

    <MainLayout>

      {/* HEADER */}

      <div>

        <h1 className="text-4xl font-bold text-white">

          Latest Hackathons

        </h1>

        <p className="text-slate-400 mt-3">

          Discover trending hackathons and competitions

        </p>

      </div>


      {/* GRID */}

      <div className="grid grid-cols-3 gap-6 mt-10">

        {hackathons.map(
          (hackathon) => (

            <div
              key={hackathon.id}

              className="bg-white/[0.03] border border-white/10 rounded-[28px] overflow-hidden hover:border-purple-500/30 transition-all duration-300"
            >

              {/* IMAGE */}

              <img
                src={hackathon.image}

                alt={hackathon.title}

                className="w-full h-[220px] object-cover"
              />


              {/* CONTENT */}

              <div className="p-6">

                <div className="flex items-center gap-3">

                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">

                    <Trophy size={20} />

                  </div>

                  <div>

                    <h2 className="text-xl font-bold text-white">

                      {hackathon.title}

                    </h2>

                    <p className="text-slate-400 text-sm">

                      {hackathon.organizer}

                    </p>

                  </div>

                </div>


                {/* INFO */}

                <div className="mt-6 space-y-3 text-sm">

                  <div className="flex justify-between">

                    <span className="text-slate-400">

                      Prize Pool

                    </span>

                    <span className="text-yellow-400 font-semibold">

                      {hackathon.prize}

                    </span>

                  </div>


                  <div className="flex justify-between">

                    <span className="text-slate-400">

                      Mode

                    </span>

                    <span className="text-white">

                      {hackathon.mode}

                    </span>

                  </div>


                  <div className="flex justify-between items-center">

                    <span className="text-slate-400">

                      Deadline

                    </span>

                    <span className="text-white flex items-center gap-2">

                      <Calendar size={14} />

                      {hackathon.deadline}

                    </span>

                  </div>

                </div>


                {/* TAGS */}

                <div className="flex flex-wrap gap-2 mt-6">

                  {hackathon.tags.map(
                    (tag, index) => (

                      <span
                        key={index}

                        className="bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full text-xs border border-purple-500/20"
                      >

                        {tag}

                      </span>

                    )
                  )}

                </div>


                {/* BUTTON */}

                <a
                  href={hackathon.link}

                  target="_blank"

                  rel="noreferrer"

                  className="mt-8 h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center gap-2 text-white font-medium hover:opacity-90 transition"
                >

                  Register Now

                  <ArrowUpRight size={18} />

                </a>

              </div>

            </div>

          )
        )}

      </div>

    </MainLayout>

  );
};

export default Hackathons;