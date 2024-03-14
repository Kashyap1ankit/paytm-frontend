import { useNavigate } from "react-router-dom";
import Logo from "../assets/svg/logo.svg";
import Title from "../components/Title";
import Profile from "../assets/svg/profile.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import Three from "../assets/svg/three.svg";
import Cross from "../assets/svg/cross.svg";
import { useAuth } from "../auth";

export default function NavBar() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const user = useAuth();
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  const toggleNav = () => {
    setClicked((clicked) => !clicked);
  };

  const handleClick = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/api/v1/user/auth`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      const firstName = await result.data.firstName;
      const lastName = await result.data.lastName;
      navigate(`/update?firstName=${firstName}&lastName=${lastName}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="xl:items-center fixed top-0 left-0 bg-primaryBackground xl:flex xl:justify-between xl:w-full xl:p-2 xl:px-0 xsm:flex xsm:justify-between xsm:w-screen shadow-md md:items-center ">
        {/* Logo part  */}

        <div
          onClick={() => {
            navigate("/");
          }}
          className="md:w-1/2  xsm:w-1/2 sm:w-1/3"
        >
          <img
            className="xl:w-1/6 md:w-1/3 xsm:w-1/8 xsm:p-0"
            src={Logo}
            alt="No image"
          />
        </div>

        {/* right side code  */}

        <div
          className={` md:flex md:justify-end md:w-1/2 xsm:text-right md:p-2  ${
            clicked
              ? "xsm:grid xsm:grid-cols-1 xsm:w-screen xsm:gap-12 xsm:py-8"
              : "hidden"
          }`}
        >
          {/* Logout part  */}

          {user.loggedIn ? (
            <Title
              onClick={() => {
                localStorage.removeItem("token");
                user.setLoggedIn(false);
                navigate("/signin");
              }}
              title={"Logout"}
              className="hover:rounded-full xl:py-1 xl:px-2 cursor-pointer font-Inter hover:shadow-md xsm:mt-12 md:mt-0  text-button xsm:border-none md:border-2"
            />
          ) : (
            <Title
              onClick={() => {
                navigate("/signup");
              }}
              title={"Signup"}
              className=" hover:rounded-full xl:py-1 xl:px-2 cursor-pointer font-Inter hover:shadow-md xsm:mt-12 md:mt-0  text-white md:bg-button border-none md:rounded-sm md:w-fit md:h-fit md:p-2"
            />
          )}

          {/* Login part  */}

          {user.loggedIn ? (
            <img
              onClick={handleClick}
              className="size-8 md:mr-0 md:ml-16 xsm:mx-auto xsm:mr-0 invert"
              src={Profile}
            ></img>
          ) : (
            <Title
              Title
              onClick={() => {
                navigate("/signin");
              }}
              className="md:mr-0 md:ml-16 xsm:mr-0 xsm:ml-0 xsm:mt-0 hover:rounded-full xl:py-1 xl:px-2 cursor-pointer font-Inter hover:shadow-md text-button md:border-2 md:rounded-sm md:w-fit md:h-fit md:p-2"
              title={"Login"}
            />
          )}
        </div>

        {/* Click the toggler  */}

        {clicked ? (
          <div onClick={toggleNav}>
            <img
              className={`invert xsm:size-10 md:hidden`}
              src={Cross}
              alt=""
            />
          </div>
        ) : (
          <div onClick={toggleNav}>
            <img className="invert xsm:size-8 md:hidden" src={Three} alt="" />
          </div>
        )}
      </div>
    </>
  );
}
