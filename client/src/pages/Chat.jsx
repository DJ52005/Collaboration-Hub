import { useEffect, useState } from "react";

import axios from "axios";

import { io } from "socket.io-client";

import { useParams } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import {
  SendHorizonal,
  Phone,
  Video,
  MoreVertical,
} from "lucide-react";


const socket = io("http://localhost:5000");


const Chat = () => {

  const { projectId } = useParams();

  const token = localStorage.getItem("token");

  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState("");

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);


  // FETCH USER + MESSAGES
  useEffect(() => {

    const fetchData = async () => {

      try {

        // USER
        const userRes = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(userRes.data);


        // MESSAGES
        const msgRes = await axios.get(
          `http://localhost:5000/api/messages/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessages(msgRes.data);

        setLoading(false);

      } catch (error) {

        console.log(error);

        setLoading(false);

      }
    };

    fetchData();

  }, [projectId]);


  // JOIN ROOM
  useEffect(() => {

    socket.emit("join_project", projectId);

  }, [projectId]);


  // RECEIVE MESSAGES
  useEffect(() => {

    socket.on("receive_message", (data) => {

      setMessages((prev) => [...prev, data]);

    });

    return () => {
      socket.off("receive_message");
    };

  }, []);


  const handleSend = async () => {

    if (!message.trim() || !user) return;

    const messageData = {
      sender: {
        name: user.name,
      },
      projectId,
      content: message,
    };


    try {

      // SAVE TO DB
      await axios.post(
        "http://localhost:5000/api/messages/save",
        {
          project: projectId,
          content: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      // SOCKET MESSAGE
      socket.emit("send_message", messageData);

      setMessage("");

    } catch (error) {

      console.log(error);

    }
  };


  if (loading) {

    return (
      <MainLayout>

        <div className="h-[88vh] flex items-center justify-center text-white text-2xl">
          Loading Chat...
        </div>

      </MainLayout>
    );
  }


  return (
    <MainLayout>

      <div className="h-[88vh] bg-white/[0.03] border border-white/10 rounded-[32px] overflow-hidden flex flex-col">

        {/* HEADER */}
        <div className="px-8 py-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02] backdrop-blur-xl">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold text-white">
              A
            </div>

            <div>

              <h2 className="text-2xl font-bold text-white">
                Team Chat
              </h2>

              <p className="text-green-400 text-sm mt-1">
                Live Collaboration
              </p>

            </div>

          </div>


          <div className="flex items-center gap-4">

            <button className="w-11 h-11 rounded-2xl bg-white/[0.04] flex items-center justify-center hover:bg-white/[0.08] transition">

              <Phone size={18} />

            </button>

            <button className="w-11 h-11 rounded-2xl bg-white/[0.04] flex items-center justify-center hover:bg-white/[0.08] transition">

              <Video size={18} />

            </button>

            <button className="w-11 h-11 rounded-2xl bg-white/[0.04] flex items-center justify-center hover:bg-white/[0.08] transition">

              <MoreVertical size={18} />

            </button>

          </div>

        </div>


        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">

          {messages.length === 0 ? (

            <div className="text-center text-slate-400 mt-20">
              No messages yet
            </div>

          ) : (

            messages.map((msg, index) => {

              const isCurrentUser =
                msg.sender?.name === user?.name;

              return (

                <div
                  key={index}
                  className={`flex ${
                    isCurrentUser
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[65%] px-5 py-4 rounded-3xl ${
                      isCurrentUser
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "bg-white/[0.04] border border-white/10 text-white"
                    }`}
                  >

                    {!isCurrentUser && (
                      <h4 className="text-sm font-semibold text-purple-300 mb-2">
                        {msg.sender?.name}
                      </h4>
                    )}

                    <p className="leading-relaxed">
                      {msg.content}
                    </p>

                  </div>

                </div>

              );
            })

          )}

        </div>


        {/* INPUT */}
        <div className="p-6 border-t border-white/10 bg-white/[0.02]">

          <div className="flex items-center gap-4 bg-white/[0.04] border border-white/10 rounded-3xl px-5 py-3">

            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-500"
            />

            <button
              onClick={handleSend}
              className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center hover:opacity-90 transition"
            >

              <SendHorizonal size={20} />

            </button>

          </div>

        </div>

      </div>

    </MainLayout>
  );
};

export default Chat;