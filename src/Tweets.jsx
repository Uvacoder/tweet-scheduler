import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "./auth.service";
import {getRecords, updateRecord, deleteRecord, addRecord} from "./crud.service";


const projectTag = "bJeQgMqJZi9kJRgf";
const tableName = "tweets";

function Tweets() {


  const [tweets, setTweets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    const res = await getRecords(projectTag, tableName);
    setTweets(res);
  };

  const deleteTweet = async (id) => {
    await deleteRecord(projectTag, tableName, id);
    await fetchTweets();
  }


  return (
    <div>
      <div>
        <h1 className="text-3xl mb-8">Tweets</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6"
          onClick={() => {
            authService().logout();
            navigate("/login");
          }}
        >
          Logout
        </button>

      </div>

      <Modal fetch={fetchTweets} />

      <table className="table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Tweet</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {(tweets || []).map((tweet) => (
            <tr key={tweet.id}>
              <td className="border px-4 py-2">{tweet.content}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6"
                  
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6"
                  onClick={() => deleteTweet(tweet.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Modal({ fetch }) {
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    content: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addRecord(projectTag, tableName, form);
      fetch();
      alert("Successfully added todo");
      setShowModal(false);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <button
        className="bg-red-600 text-white active:bg-red-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add Tweet
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add a new tweet</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form onSubmit={handleSubmit}>
                    <div class="mb-6">
                      <label
                        for="content"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Tweet
                      </label>
                      <input
                        onChange={handleChange}
                        name="content"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Tweet"
                        required
                      ></input>
                    </div>
                    <div class="flex items-center justify-between">
                      <button
                        className="bg-red-600 text-white active:bg-red-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Add
                      </button>
                      <button
                        className="bg-gray-200 text-gray-900 active:bg-gray-400 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default Tweets;
