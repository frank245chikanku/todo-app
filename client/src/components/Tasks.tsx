import { useEffect, useState } from "react";
import axios from "axios";
import { ENDPOINT } from "../constants/constants";
import moment from "moment";

interface Task {
  id: number;
  title: string;
  description: string;
  duedate: string;
  completed: boolean;
  userId: number;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [_error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">(
    "pending"
  );
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  const fetchTasksForUser = async () => {
    try {
      const userDataString = localStorage.getItem("user");
      if (!userDataString) {
        throw new Error("User data not found in localStorage");
      }
      const userData = JSON.parse(userDataString);
      const userId = userData.user.id;

      const response = await axios.get(`${ENDPOINT}/tasks/${userId}`);
      console.log(response.data);
      if (!response.data) {
        throw new Error("Failed to fetch tasks");
      }

      setTasks(response.data);
      filterTasks(response.data, "pending");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const filterTasks = (
    tasks: Task[],
    filter: "all" | "completed" | "pending"
  ) => {
    let filteredTasks = tasks;
    if (filter === "completed") {
      filteredTasks = tasks.filter((task) => task.completed);
    } else if (filter === "pending") {
      filteredTasks = tasks.filter((task) => !task.completed);
    }
    setFilteredTasks(filteredTasks);
  };

  const handleFilterChange = (newFilter: "all" | "pending" | "completed") => {
    setFilter(newFilter);
    filterTasks(tasks, newFilter);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const userDataString = localStorage.getItem("user");
      if (!userDataString) {
        throw new Error("User data not found in localStorage");
      }
      const userData = JSON.parse(userDataString);
      console.log("this is user data", userData);
      const userId = userData.user.id;
      console.log("this is id", userId);
      const response = await axios.post(`${ENDPOINT}/tasks/create`, {
        title,
        description,
        userId,
      });

      console.log(response);
      fetchTasksForUser();
      setTitle("");
      setDescription("");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (updatedTask: Task) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${ENDPOINT}/tasks/update/${updatedTask.id}`,
        updatedTask
      );
      console.log("updated task", response.data);
      fetchTasksForUser();
      handleModalClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (taskId: number) => {
    try {
      setLoading(true);
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this task?"
      );
      if (!confirmDelete) return;
      await axios.delete(`${ENDPOINT}/tasks/delete/${taskId}`);
      fetchTasksForUser();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasksForUser();
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  const handleModalSave = () => {
    if (taskToEdit) {
      const formattedDate = moment(taskToEdit.duedate).format("YYYY-MM-DD");
      setTaskToEdit({ ...taskToEdit, duedate: formattedDate });
      handleUpdate(taskToEdit);
    }
  };

  return (
    <section className="p-4 w-full min-h-screen justify-center items-center flex bg-[#a18aff]">
      <div className="w-full flex flex-col justify-center items-center">
        <p className="text-[55px] font-bold">Todays Main Focus</p>
        <form
          onClick={handleSubmit}
          className="w-1/2 mt-4  justify-between shadow shadow-gray-500 rounded-xl p-4 flex md:flex-row flex-col gap-4"
        >
          <input
            placeholder="title"
            className="outline-none p-3 rounded"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            placeholder="description"
            className="outline-none p-3 rounded"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {loading ? (
            <div
              aria-disabled
              className=" p-3 cursor-not-allowed active:scale-[98%] flex items-center justify-center duration-200 font-bold text-center bg-slate-900 rounded text-white"
            >
              <div className=" w-6 h-6 rounded-full animate-spin border-4 border-white border-t-[#48156a]"></div>
            </div>
          ) : (
            <button
              type="submit"
              className="rounded p-3 bg-slate-900 text-white"
            >
              Add{" "}
            </button>
          )}
        </form>

        <div className="w-1/2 flex gap-4 mt-4">
          <button
            className={`p-3 rounded-lg text-white ${
              filter === "pending" ? "bg-red-700" : "bg-red-600"
            }`}
            onClick={() => handleFilterChange("pending")}
          >
            Pending
          </button>
          <button
            className={`p-3 rounded-lg text-white ${
              filter === "completed" ? "bg-green-700" : "bg-green-600"
            }`}
            onClick={() => handleFilterChange("completed")}
          >
            Completed
          </button>
        </div>
        <div className="w-1/2 flex flex-col mt-4">
          {Array.isArray(filteredTasks) && filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="w-full shadow shadow-gray-200 rounded-xl p-4 mt-4 flex justify-between"
              >
                <div>
                  <p>Title: {task.title}</p>
                  <p>Description: {task.description}</p>
                  <p>
                    {task.duedate
                      ? `Date: ${moment(task.duedate).format("MMMM Do YYYY")}`
                      : "Date not specified"}
                  </p>
                  <p>
                    {task.completed ? (
                      <span className="text-green-700">Completed</span>
                    ) : (
                      <span className="text-red-500">Not Completed</span>
                    )}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="p-3 rounded-lg bg-red-600"
                  >
                    <svg
                      viewBox="0 0 1024 1024"
                      fill="white"
                      height="2em"
                      width="2em"
                    >
                      <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      setTaskToEdit(task);
                    }}
                    className="p-3 rounded-lg bg-green-600"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="white"
                      height="2em"
                      width="2em"
                    >
                      <path d="M19 19H5V5h10V3H5c-1.11 0-2 .89-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-8h-2m-11.09-.92L6.5 11.5 11 16 21 6l-1.41-1.42L11 13.17l-3.09-3.09z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No tasks found.</p>
          )}
        </div>
        {isModalOpen && taskToEdit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg w-1/2">
              <h2 className="text-xl mb-4">Edit Task</h2>
              <input
                className="block w-full mb-2 p-2 border rounded"
                type="text"
                value={taskToEdit.title}
                onChange={(e) =>
                  setTaskToEdit({ ...taskToEdit, title: e.target.value })
                }
              />
              <input
                className="block w-full mb-2 p-2 border rounded"
                type="text"
                value={taskToEdit.description}
                onChange={(e) =>
                  setTaskToEdit({ ...taskToEdit, description: e.target.value })
                }
              />
              <input
                className="block w-full mb-2 p-2 border rounded"
                type="date"
                value={taskToEdit.duedate}
                onChange={(e) =>
                  setTaskToEdit({ ...taskToEdit, duedate: e.target.value })
                }
              />
              <label className="block mb-2">
                <input
                  type="checkbox"
                  checked={taskToEdit.completed}
                  onChange={(e) =>
                    setTaskToEdit({
                      ...taskToEdit,
                      completed: e.target.checked,
                    })
                  }
                />
                Completed
              </label>
              <div className="flex justify-end">
                <button
                  className="bg-gray-300 p-2 rounded mr-2"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
                {loading ? (
                  <div
                    aria-disabled
                    className=" p-3 cursor-not-allowed active:scale-[98%] flex items-center justify-center duration-200 font-bold text-center bg-slate-900 rounded text-white"
                  >
                    <div className=" w-6 h-6 rounded-full animate-spin border-4 border-white border-t-[#48156a]"></div>
                  </div>
                ) : (
                  <button
                    className="bg-blue-500 p-2 text-white rounded"
                    onClick={handleModalSave}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Tasks;
