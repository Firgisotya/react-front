import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate();

  //   megambil data yang ada di local storage
  const token = localStorage.getItem("authToken");
  const decodeToken = jwt_decode(token);

  const user = decodeToken.user;

  const logout = () => {
    localStorage.removeItem("authToken");
    axios.defaults.headers.common["Authorization"] = "";
    navigate("/");
    };

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center"
        onClick={toggleDropdown}
      >
        <img
          className="w-8 h-8 rounded-full"
          src="/assets/img/profile.png"
          alt="user photo"
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 z-50 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 dark:text-white">
              {user.name}
            </span>
            <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
              {user.email}
            </span>
          </div>
          <ul className="py-2" aria-label="User Menu">
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <button
                onClick={logout}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
