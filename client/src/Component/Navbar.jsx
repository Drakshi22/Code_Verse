import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUserCircle, FaCode, FaSignOutAlt, FaSignInAlt,
  FaUserPlus, FaQuestion
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar({ title, setFlag, flag }) {
  const location = useLocation();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    setFlag(!flag);
    localStorage.removeItem("user");
  };

  const toggleNavbar = () => setIsNavCollapsed(!isNavCollapsed);
  const isActive = (path) => location.pathname === path ? "nav-link active text-warning" : "nav-link text-light";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4 text-warning" to="/">
          {"</"} {title} {">"}
        </Link>

        <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
          <GiHamburgerMenu color="white" />
        </button>

        <div className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-2">
            <li className="nav-item">
              <Link className={isActive("/ide")} to="/ide">
                <FaCode className="me-1" /> IDE
              </Link>
            </li>
            <li className="nav-item">
              <Link className={isActive("/contest")} to="/contest">
                📅 Upcoming Contest
              </Link>
            </li>
            <li className="nav-item">
              <Link className={isActive("/questionList")} to="/questionList">
                <FaQuestion className="me-1" /> Questions
              </Link>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <Link className={isActive("/myCode")} to="/myCode">
                    💾 My Code
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={isActive("/messages")} to="/messages">
                    💬 Chat
                  </Link>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav mb-2 mb-lg-0 align-items-center gap-2">
            {user ? (
              <>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle text-light"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaUserCircle className="me-1" />
                    Hello, {user.fName}
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li>
                      <Link className="dropdown-item" to="/modifyProfile">✏️ Modify Profile</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/QuestionWriter">➕ Add Question</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/myQuestionList">📜 My Questions</Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-warning" onClick={handleLogout}>
                    <FaSignOutAlt className="me-1" /> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-light" to="/login">
                    <FaSignInAlt className="me-1" /> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-warning" to="/register">
                    <FaUserPlus className="me-1" /> Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
