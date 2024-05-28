import { Link } from "react-router-dom";


const Login = () => {
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
            <div className="w-96 rounded-xl shadow shadow-white text-white bg-black flex flex-col justify-center p-4">
                <p className="text-center text-xl font-bold">Login</p>
                <div className="mt-4 flex flex-col w-full">
                    <input className="p-3 rounded text-black" placeholder="email" type="text" />
                    <input className="mt-4 p-3 rounded text-black" placeholder="password" type="password" />
                </div>
                <button className="mt-4 p-3 bg-[#ee5522] rounded font-bold hover:bg-[#e2724d]">Login</button>
                <div className="flex w-full justify-between mt-2 text-gray-400">
                    <p>Forgot password</p>
                    <Link to="/register">Create Account</Link>
                </div>
            </div>
            </section>

  )
}

export default Login