import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import axios from "axios";

import MainLayout from "../components/layout/MainLayout";

import {
  Search,
  SendHorizonal,
} from "lucide-react";

const socket = io("http://localhost:5000");

const Chat = () => {

  const token =
    localStorage.getItem("token");

  const [conversations,
    setConversations] =
    useState([]);

  const [selectedConversation,
    setSelectedConversation] =
    useState(null);

  const [messages,
    setMessages] =
    useState([]);

  const [message,
    setMessage] =
    useState("");

  const [user,
    setUser] =
    useState(null);

  const [onlineUsers,
    setOnlineUsers] =
    useState([]);

  const [typing,
    setTyping] =
    useState(false);


  /*
  =====================================
  FETCH USER
  =====================================
  */

  useEffect(() => {

    const fetchUser =
      async () => {

        try {

          const res =
            await axios.get(
              "http://localhost:5000/api/users/profile",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          setUser(res.data);

        } catch (error) {

          console.log(error);

        }
      };

    fetchUser();

  }, []);


  /*
  =====================================
  USER ONLINE
  =====================================
  */

  useEffect(() => {

    if (user?._id) {

      socket.emit(
        "user_online",
        user._id
      );

    }

  }, [user]);


  /*
  =====================================
  FETCH CONVERSATIONS
  =====================================
  */

  const fetchConversations =
    async () => {

      try {

        const res =
          await axios.get(
            "http://localhost:5000/api/chat/conversations",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const filtered =
          res.data.filter(
            (conversation) => {

              if (
                !conversation.participants ||
                conversation.participants.length < 2
              ) {
                return false;
              }

              const otherUser =
                conversation.participants.find(
                  (participant) =>
                    participant._id !== user?._id
                );

              return !!otherUser;
            }
          );

        setConversations(filtered);

      } catch (error) {

        console.log(error);

      }
    };


  useEffect(() => {

    if (user) {

      fetchConversations();

    }

  }, [user]);


  /*
  =====================================
  FETCH MESSAGES
  =====================================
  */

  const fetchMessages =
    async (conversationId) => {

      try {

        const res =
          await axios.get(
            `http://localhost:5000/api/chat/messages/${conversationId}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setMessages(res.data);

      } catch (error) {

        console.log(error);

      }
    };


  /*
  =====================================
  OPEN CHAT
  =====================================
  */

  const openConversation =
    async (conversation) => {

      setSelectedConversation(
        conversation
      );

      fetchMessages(
        conversation._id
      );

      socket.emit(
        "join_conversation",
        conversation._id
      );
    };


  /*
  =====================================
  RECEIVE LIVE MESSAGE
  =====================================
  */

  useEffect(() => {

    socket.on(
      "receive_message",
      (data) => {

        if (
          data.conversationId ===
          selectedConversation?._id
        ) {

          setMessages(
            (prev) => [
              ...prev,
              data,
            ]
          );

        }
      }
    );

    return () => {

      socket.off(
        "receive_message"
      );

    };

  }, [selectedConversation]);


  /*
  =====================================
  ONLINE USERS
  =====================================
  */

  useEffect(() => {

    socket.on(
      "online_users",
      (users) => {

        setOnlineUsers(users);

      }
    );

    return () => {

      socket.off(
        "online_users"
      );

    };

  }, []);


  /*
  =====================================
  TYPING
  =====================================
  */

  useEffect(() => {

    socket.on(
      "typing",
      () => {

        setTyping(true);

      }
    );

    socket.on(
      "stop_typing",
      () => {

        setTyping(false);

      }
    );

    return () => {

      socket.off("typing");
      socket.off("stop_typing");

    };

  }, []);


  /*
  =====================================
  SEND MESSAGE
  =====================================
  */

  const handleSend =
    async () => {

      if (
        !message.trim() ||
        !selectedConversation
      ) return;

      try {

        const res =
          await axios.post(
            "http://localhost:5000/api/chat/message",
            {
              conversationId:
                selectedConversation._id,

              content:
                message,
            },
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setMessages(
          (prev) => [
            ...prev,
            res.data,
          ]
        );

        socket.emit(
          "send_message",
          {
            ...res.data,
            conversationId:
              selectedConversation._id,
          }
        );

        setMessage("");

        fetchConversations();

      } catch (error) {

        console.log(error);

      }
    };


  return (

    <MainLayout>

      <div className="h-[88vh] flex gap-6">

        {/* LEFT SIDEBAR */}

        <div className="w-[340px] bg-white/[0.03] border border-white/10 rounded-3xl p-5 flex flex-col">

          <h1 className="text-3xl font-bold text-white">

            Chats

          </h1>


          {/* SEARCH */}

          <div className="mt-6 flex items-center gap-3 bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-3">

            <Search
              size={18}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search chats..."
              className="bg-transparent outline-none text-white w-full"
            />

          </div>


          {/* CONVERSATIONS */}

          <div className="mt-6 space-y-3 overflow-y-auto">

            {conversations.map(
              (conversation) => {

                const otherUser =
                  conversation.participants.find(
                    (participant) =>
                      participant._id !== user?._id
                  );

                if (!otherUser)
                  return null;

                return (

                  <div
                    key={conversation._id}

                    onClick={() =>
                      openConversation(
                        conversation
                      )
                    }

                    className={`p-4 rounded-2xl cursor-pointer transition border ${
                      selectedConversation?._id ===
                      conversation._id
                        ? "bg-purple-600/20 border-purple-500/30"
                        : "bg-white/[0.03] border-white/5 hover:bg-white/[0.05]"
                    }`}
                  >

                    <div className="flex items-center gap-4">

                      <div className="relative">

                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-lg font-bold text-white">

                          {otherUser?.name?.charAt(0)}

                        </div>

                      </div>

                      <div className="flex-1">

                        <h3 className="text-white font-semibold">

                          {otherUser?.name}

                        </h3>

                        <p className="text-slate-400 text-sm mt-1 truncate">

                          {conversation.lastMessage ||
                            "Start chatting..."}

                        </p>

                      </div>

                    </div>

                  </div>

                );
              }
            )}

          </div>

        </div>


        {/* RIGHT CHAT PANEL */}

        <div className="flex-1 bg-white/[0.03] border border-white/10 rounded-3xl flex flex-col overflow-hidden">

          {selectedConversation ? (

            (() => {

              const otherUser =
                selectedConversation.participants.find(
                  (participant) =>
                    participant._id !== user?._id
                );

              if (!otherUser) {

                return (

                  <div className="flex-1 flex items-center justify-center text-slate-400 text-xl">

                    Invalid conversation

                  </div>

                );
              }

              return (

                <>

                  {/* HEADER */}

                  <div className="px-6 py-5 border-b border-white/10 flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-lg font-bold text-white">

                      {otherUser?.name?.charAt(0)}

                    </div>

                    <div>

                      <h2 className="text-xl font-bold text-white">

                        {otherUser?.name}

                      </h2>

                    </div>

                  </div>


                  {/* MESSAGES */}

                  <div className="flex-1 overflow-y-auto p-6 space-y-5">

                    {messages.map(
                      (msg) => {

                        const isCurrentUser =
                          msg.sender?._id ===
                          user?._id;

                        return (

                          <div
                            key={msg._id}

                            className={`flex ${
                              isCurrentUser
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >

                            <div
                              className={`max-w-[60%] px-5 py-4 rounded-3xl ${
                                isCurrentUser
                                  ? "bg-gradient-to-r from-purple-600 to-pink-600"
                                  : "bg-white/[0.05] border border-white/10"
                              }`}
                            >

                              <p className="text-white">

                                {msg.content}

                              </p>

                            </div>

                          </div>

                        );
                      }
                    )}

                  </div>


                  {/* INPUT */}

                  <div className="p-5 border-t border-white/10">

                    <div className="flex items-center gap-4 bg-white/[0.04] border border-white/10 rounded-3xl px-5 py-3">

                      <input
                        type="text"

                        placeholder="Type your message..."

                        value={message}

                        onChange={(e) =>
                          setMessage(
                            e.target.value
                          )
                        }

                        className="flex-1 bg-transparent outline-none text-white"
                      />

                      <button
                        onClick={handleSend}

                        className="w-11 h-11 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center"
                      >

                        <SendHorizonal
                          size={18}
                        />

                      </button>

                    </div>

                  </div>

                </>

              );

            })()

          ) : (

            <div className="flex-1 flex items-center justify-center text-slate-400 text-xl">

              Select a conversation

            </div>

          )}

        </div>

      </div>

    </MainLayout>
  );
};

export default Chat;