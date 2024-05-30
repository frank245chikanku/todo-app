import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ENDPOINT } from "../constants/constants";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const response = await fetch(`${ENDPOINT}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/login");
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

  const sectionStyle = {
    backgroundColor: "#ee5522",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='26' height='26' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='100' y1='33' x2='100' y2='-3'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='100' y1='135' x2='100' y2='97'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23d23d09' fill-opacity='0.6'%3E%3Crect x='100' width='100' height='100'/%3E%3Crect y='100' width='100' height='100'/%3E%3C/g%3E%3Cg fill-opacity='0.5'%3E%3Cpolygon fill='url(%23a)' points='100 30 0 0 200 0'/%3E%3Cpolygon fill='url(%23b)' points='100 100 0 130 0 100 200 100 200 130'/%3E%3C/g%3E%3C/svg%3E")`,
    backgroundAttachment: "fixed",
    backgroundSize: "100px 100px",
  };

  return (
    <section
      style={sectionStyle}
      className="bg-cover bg-center flex w-full h-screen justify-center items-center"
    >
      <form
        onClick={handleSubmit}
        className="w-96 rounded-xl shadow shadow-white text-white bg-black flex flex-col justify-center p-4"
      >
        <p className="text-center text-xl font-bold">Login</p>
        <div className="mt-4 flex flex-col w-full">
          <input
            className="p-3 rounded text-black"
            placeholder="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="mt-4 p-3 rounded text-black"
            placeholder="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="mt-4 p-3 rounded text-black"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {loading ? (
          <div
            aria-disabled
            className="mt-4 p-3 cursor-not-allowed active:scale-[98%] flex items-center justify-center duration-200 font-bold text-center bg-[#ee5522] rounded text-white"
          >
            <div className="w-6 h-6 rounded-full animate-spin border-4 border-white border-t-[#ee5522]"></div>
          </div>
        ) : (
          <button
            type="submit"
            className="mt-4 p-3 bg-[#ee5522] rounded font-bold hover:bg-[#e2724d]"
          >
            Register
          </button>
        )}
        <div className="flex w-full justify-between mt-2 text-gray-400">
          <p>Already have account?</p>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </section>
  );
};

export default Register;
