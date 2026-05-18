import { useEffect, useState } from "react";
import axios from "axios";

const Requests = () => {

  const token = localStorage.getItem("token");

  const [requests, setRequests] = useState([]);


  const fetchRequests = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRequests(res.data);

    } catch (error) {

      console.log(error);

    }
  };


  useEffect(() => {

    fetchRequests();

  }, []);


  const handleAccept = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/requests/accept/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchRequests();

    } catch (error) {

      console.log(error);

    }
  };


  const handleReject = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/requests/reject/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchRequests();

    } catch (error) {

      console.log(error);

    }
  };


  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        Collaboration Requests
      </h1>

      <div className="space-y-5">

        {requests.map((request) => (

          <div
            key={request._id}
            className="bg-slate-800 p-6 rounded-2xl flex justify-between items-center"
          >

            <div>

              <h2 className="text-2xl font-bold">
                {request.sender.name}
              </h2>

              <p className="text-slate-400 mt-2">
                wants to join
                {" "}
                <span className="text-white font-semibold">
                  {request.project.title}
                </span>
              </p>

            </div>

            <div className="flex gap-3">

              <button
                onClick={() =>
                  handleAccept(request._id)
                }
                className="bg-green-600 px-5 py-2 rounded-xl"
              >
                Accept
              </button>

              <button
                onClick={() =>
                  handleReject(request._id)
                }
                className="bg-red-600 px-5 py-2 rounded-xl"
              >
                Reject
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Requests;