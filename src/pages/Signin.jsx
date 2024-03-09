import { useForm } from "react-hook-form";
import Title from "../components/Title";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userSigninSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "../auth";

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSigninSchema),
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
  }, [navigate, user.loggedIn]);

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const onSubmit = async (data) => {
    try {
      const result = await axios.post(
        "https://paytm-backend-wacd.onrender.com/api/v1/user/signin",
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
          className="bg-red md:w-fit xsm:w-screen py-2 xl:px-16 xsm:px-4 xl:absolute xl:top-4 rounded-md font-Inter bg-red text-white xsm:text-sm xl:text-md shadow-md "
        >
          <Title title={serverError.message} />
        </motion.div>
      ) : null}
      <div className="py-2 px-8 bg-white xl:w-1/3 md:w-1/2 shadow-md relative md:top-20 xl:left-1/3 md:mx-auto rounded-md xsm:m-4 xl:m-0 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center font-bold xl:text-4xl xsm:text-2xl font-Inter">
            <Title title="Signin !" />
          </div>
          <div className=" text-center w-full mt-4 text-dark-gray font-Inter">
            <Title title="Enter your info to login" />
          </div>
          <Input
            placeholder={"Enter username"}
            name={"username"}
            register={register}
            label={"User Name*"}
          />
          <p className="text-red xsm:text-sm sm:text-md">
            {errors.username?.message}
          </p>

          <Input
            placeholder={"Enter Password"}
            name={"password"}
            register={register}
            label={"Password*"}
          />
          <p className="text-red xsm:text-sm sm:text-md">
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
              title="Sign-In"
              className="w-full bg-black mt-4 text-center text-white p-2 mb-2 rounded-md"
            />
          )}

          <div className="flex justify-center text-center w-full mt-4 ">
            <Title
              className="text-dark-gray font-Inter xsm:text-sm xl:text-md"
              title="Create a Free Account 🎉"
            />
            <Title
              onClick={handleSignupClick}
              className="text-dark-gray ml-4 cursor-pointer hover:text-blue font-Inter xsm:text-sm xl:text-md"
              title="Register"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
