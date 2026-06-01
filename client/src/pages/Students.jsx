import { useEffect, useState } from "react";

import axios from "axios";

import MainLayout from "../components/layout/MainLayout";

import {
  Search,
  MessageCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";


const Students = () => {

  const navigate = useNavigate();

  const token =
    localStorage.getItem("token");

  const [users, setUsers] =
    useState([]);

  const [search, setSearch] =
    useState("");


  /*
  =====================================
  FETCH USERS
  =====================================
  */

  useEffect(() => {

    const fetchUsers =
      async () => {

        try {

          const res = await axios.get(
            "http://localhost:5000/api/users/all",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

          setUsers(res.data);

        } catch (error) {

          console.log(error);

        }
      };

    fetchUsers();

  }, []);


  /*
  =====================================
  CREATE CONVERSATION
  =====================================
  */

  const startConversation =
    async (userId) => {

      try {

        const res = await axios.post(
          "http://localhost:5000/api/chat/conversation",
          {
            userId,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        navigate("/chat");

      } catch (error) {

        console.log(error);

      }
    };


  /*
  =====================================
  FILTER USERS
  =====================================
  */

  const filteredUsers =
    users.filter((user) =>
      user.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );


  return (
    <MainLayout>

      {/* HEADER */}
      <div>

        <h1 className="text-4xl font-bold text-white">
          Students Network
        </h1>

        <p className="text-slate-400 mt-3">
          Connect with talented students
        </p>

      </div>


      {/* SEARCH */}
      <div className="mt-8 flex items-center gap-3 bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-3">

        <Search
          size={18}
          className="text-slate-400"
        />

        <input
          type="text"
          placeholder="Search students..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="bg-transparent outline-none text-white w-full"
        />

      </div>


      {/* USERS GRID */}
      <div className="grid grid-cols-3 gap-6 mt-10">

        {filteredUsers.map((user) => (

          <div
            key={user._id}
            className="bg-white/[0.03] border border-white/10 rounded-3xl p-6"
          >

            {/* AVATAR */}
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold text-white">

              {user.name.charAt(0)}

            </div>


            {/* INFO */}
            <h2 className="text-2xl font-bold text-white mt-6">

              {user.name}

            </h2>

            <p className="text-slate-400 mt-2">

              {user.email}

            </p>


            {/* SKILLS */}
            <div className="flex flex-wrap gap-2 mt-6">

              {[
                "React",
                "Node",
                "MongoDB",
              ].map((skill) => (

                <span
                  key={skill}
                  className="bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full text-xs border border-purple-500/20"
                >

                  {skill}

                </span>

              ))}

            </div>


            {/* BUTTON */}
            <button
              onClick={() =>
                startConversation(
                  user._id
                )
              }
              className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-2xl flex items-center justify-center gap-3 hover:opacity-90 transition"
            >

              <MessageCircle
                size={18}
              />

              Message

            </button>

          </div>

        ))}

      </div>

    </MainLayout>
  );
};

export default Students;