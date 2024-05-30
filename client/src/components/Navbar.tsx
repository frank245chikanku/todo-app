import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString !== null) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleMenu = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
    closeMenu();
  };

  return (
    <nav className="bg-slate-900 text-white w-full p-4 justify-between items-center flex">
      <Link className="text-xl font-bold hover:underline" to="/">
        TodoApp
      </Link>
      <div className="gap-4 md:flex hidden">
        <Link
          className="p-3 hover:rounded-xl hover:shadow hover:shadow-gray-400"
          to="/tasks"
        >
          Tasks
        </Link>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="p-3 hover:rounded-xl hover:shadow hover:shadow-gray-400"
          >
            LogOut
          </button>
        ) : (
          <>
            <Link
              className="p-3 hover:rounded-xl hover:shadow hover:shadow-gray-400"
              to="/register"
            >
              SignUp
            </Link>
            <Link
              className="p-3 hover:rounded-xl hover:shadow hover:shadow-gray-400"
              to="/login"
            >
              SignIn
            </Link>
          </>
        )}
      </div>
      <button type="button" onClick={handleMenu} className="md:hidden flex">
        {open ? (
          <svg fill="none" viewBox="0 0 24 24" height="2em" width="2em">
            <path
              fill="currentColor"
              d="M16.34 9.322a1 1 0 10-1.364-1.463l-2.926 2.728L9.322 7.66A1 1 0 007.86 9.024l2.728 2.926-2.927 2.728a1 1 0 101.364 1.462l2.926-2.727 2.728 2.926a1 1 0 101.462-1.363l-2.727-2.926 2.926-2.728z"
            />
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm11 9a9 9 0 110-18 9 9 0 010 18z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" height="2em" width="2em">
            <path d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2z" />
          </svg>
        )}
      </button>
      {open ? (
        <div className="w-full p-4 flex flex-col text-slate-900 absolute right-0 bg-gray-300 mt-6 top-10 items-center justify-center">
          <Link
            onClick={closeMenu}
            className="w-full p-3 hover:rounded-xl hover:shadow hover:shadow-gray-400"
            to="/tasks"
          >
            Tasks
          </Link>
          {isLoggedIn ? (
            <Link
              className="w-full p-3 hover:rounded-xl hover:shadow hover:shadow-gray-400"
              to="/profile"
            >
              LogOut
            </Link>
          ) : (
            <>
              <Link
                className="w-full p-3 hover:rounded-xl hover:shadow hover:shadow-gray-400"
                to="/register"
              >
                SignUp
              </Link>
              <Link
                className="w-full p-3 hover:rounded-xl hover:shadow hover:shadow-gray-400"
                to="/login"
              >
                SignIn
              </Link>
            </>
          )}
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
