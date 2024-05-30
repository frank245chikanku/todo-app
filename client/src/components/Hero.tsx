import { Player } from "@lottiefiles/react-lottie-player";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="p-4 min-h-screen w-full flex justify-center items-center bg-[#00ddb3]">
      <div className="w-full grid grid-cols-2 gap-4">
        <div className="w-full flex flex-col justify-center p-4">
          <p style={{ lineHeight: "1.5" }} className="text-4xl font-bold">
            Start your day with TodoMaster, your personal task manager, and
            experience the satisfaction of organized and productive days. Get
            started now and make every day a success!
          </p>
          <div className="w-full mt-4">
            <Link
              to="/tasks"
              className="p-3 rounded-xl text-white shadow shadow-purple-600 bg-blue-500"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="w-full">
          <Player
            autoplay
            loop
            src="https://lottie.host/c0854e7f-ee28-4f58-9e59-e7c0f9ed0166/ZJfVThL7ep.json"
            style={{ maxWidth: "600px", width: "100%", height: "auto" }}
            className="z-10 hover:-translate-y-4 transition-all ease-in-out duration-300 cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
