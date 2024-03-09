import { useForm } from "react-hook-form";
import Title from "../components/Title";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userSignupSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "../auth";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSignupSchema),
    criteriaMode: "all",
  });

  const [serverError, setServerError] = useState({
    status: false,
    message: "",
  });
  //Using this for login naviagtion

  const navigate = useNavigate();

  const user = useAuth();
  useEffect(() => {
    if (user.loading) {
      console.log("loading...");
    }

    if (!user.loading) {
      if (user.loggedIn) {
        navigate("/dashboard");
      }
    }
  }, [navigate, user.loggedIn, user.loading]);

  const handleLoginClick = () => {
    navigate("/signin");
  };

  const onSubmit = async (data) => {
    try {
      const result = await axios.post(
        "https://paytm-backend-wacd.onrender.com/api/v1/user/signup",
        data
      );

      const token = result.data.token;
      localStorage.setItem("token", `Bearer ${token}`);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setServerError({ status: true, message: error.response.data.message });
      setTimeout(
        () =>
          setServerError({
            status: false,
            message: "",
          }),
        5000
      );
    }
  };

  return (
    <div>
      {serverError.status ? (
        <motion.div
          animate={{
            y: [500, 0],
          }}
          transition={{ duration: 0.5 }}
          className="bg-red xl:w-fit  xsm:w-screen py-2 xl:px-16 xsm:px-4 xl:absolute xl:top-4 rounded-md font-Inter bg-red text-white shadow-md xsm:text-sm xl:text-xl "
        >
          <Title title={serverError.message} />
        </motion.div>
      ) : null}
      <div className="xsm:m-4 lg:mx-48 lg:mt-2 lg:w-1/2  xl:w-1/3 xl:m-0 xl:top-4 xl:left-1/3 py-2 px-8 bg-white shadow-md relative rounded-md  ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center font-bold xl:text-4xl xsm:text-2xl font-Inter">
            <Title title="Signup!" />
          </div>
          <div className=" text-center w-full mt-4 text-dark-gray font-Inter">
            <Title title="Enter your info to create account" />
          </div>
          <Input
            placeholder={"Enter username"}
            name={"username"}
            register={register}
            label={"User Name*"}
          />
          <p className="text-red  xsm:text-sm sm:text-md">
            {errors.username?.message}
          </p>
          <Input
            placeholder={"Enter firstname"}
            name={"firstName"}
            register={register}
            label={"First Name*"}
          />
          <p className="text-red xsm:text-sm sm:text-md">
            {errors.firstName?.message}
          </p>
          <Input
            placeholder={"Enter lastname"}
            name={"lastName"}
            register={register}
            label={"Last Name"}
          />
          <p className="text-red">{errors.lastName?.message}</p>
          <Input
            placeholder={"Enter Email Address"}
            name={"email"}
            register={register}
            label={"Email*"}
          />
          <p className="text-red  xsm:text-sm sm:text-md">
            {errors.email?.message}
          </p>
          <Input
            placeholder={"Enter Password"}
            name={"password"}
            register={register}
            label={"Password*"}
          />
          <p className="text-red  xsm:text-sm sm:text-md">
            {errors.password?.message}
          </p>
          {isSubmitting ? (
            <Button
              type="submit"
              title="Loading...."
              className="w-full bg-black mt-4 text-center text-white p-2 mb-2 rounded-md"
            />
          ) : (
            <Button
              type="submit"
              title="Sign-up"
              className="w-full bg-black mt-4 text-center text-white p-2 mb-2 rounded-md"
            />
          )}
          <div className="flex justify-center text-center w-full mt-4 ">
            <Title
              className="text-dark-gray font-Inter"
              title="Already a User ? "
            />
            <Title
              onClick={handleLoginClick}
              className="text-dark-gray ml-4 cursor-pointer hover:text-blue font-Inter"
              title="Login "
            />
          </div>
        </form>
      </div>
    </div>
  );
}
