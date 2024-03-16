import Title from "../components/Title";
import Profile from "../assets/svg/profile.svg";
import SendIcon from "../assets/svg/send.svg";
import Back from "../assets/svg/back.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import PayDone from "../payment.json";
import { useAuth } from "../auth";

export default function Send() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name");
  const id = searchParams.get("id");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);

  const [serverError, setServerError] = useState({
    status: false,
    message: "",
  });

  const user = useAuth();

  useEffect(() => {
    if (user.loading) {
      console.log("loading...");
    }

    if (!user.loading) {
      if (!user.loggedIn) {
        navigate("/signin");
      }
    }
  }, [navigate, user.loggedIn, user.loading]);

  const onSubmit = async (data) => {
    try {
      //Parsing for number
      if (!parseInt(data.amount)) {
        throw new Error();
      }

      const result = await axios.post(
        `${BASE_URL}/api/v1/account/transfer`,
        {
          amount: data.amount,
          to: id,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 4000);

      setTimeout(() => {
        navigate("/dashboard");
      }, 4100);
    } catch (error) {
      setServerError({
        status: true,
        message: error.response?.data.message
          ? error.response.data.message
          : "Please Enter Number",
      });

      setTimeout(() => {
        setServerError({
          status: false,
          message: "",
        });
      }, 3000);
    }
  };
  return (
    <div>
      {success ? (
        <Lottie
          className="sxm:size-48 xl:size-96 mx-auto mt-52"
          animationData={PayDone}
          loop={true}
        />
      ) : (
        <div>
          {serverError.status ? (
            <motion.div
              animate={{
                y: [500, 0],
              }}
              transition={{ duration: 0.5 }}
              className="bg-red xsm:w-screen xl:w-fit py-2 px-16 xl:absolute xl:top-4 rounded-md font-Inter bg-red text-white text-center shadow-md "
            >
              <Title title={serverError.message} />
            </motion.div>
          ) : null}

          <div className="xsm:m-4 xsm:mt-20 md:mx-auto md:w-1/2  xl:mt-36 xl:w-1/3  bg-white p-8">
            <div className="flex justify-between items-center">
              <img
                onClick={() => {
                  navigate("/dashboard");
                }}
                className="xsm:size-4 md:size-6 cursor-pointer"
                src={Back}
              />
              <Title
                className="xl:text-3xl md:text-2xl xsm:text-xl font-Inter"
                title={"Send Money"}
              />
              <img className="xsm:size-6 md:size-8" src={SendIcon} />
            </div>

            <div className="flex justify-normal mt-12">
              <img className="xsm:size-8 md:size-10" src={Profile} alt="" />
              <Title className="text-2xl font-Inter ml-8" title={name} />
            </div>
            <Title className="text-gray mt-4" title="Enter Amount (in Rs)" />

            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  placeholder="Enter Amount"
                  register={register}
                  name="amount"
                />
                <p className="text-red xsm:text-sm sm:text-md">
                  {errors.amount?.message}
                </p>
                <Button
                  className="bg-green text-center p-2 px-4 mt-4 font-Inter text-md text-white rounded-md"
                  title={"Send Money"}
                />
              </form>

              <div className="flex justify-center text-center w-full mt-4 ">
                <Title
                  onClick={() => {
                    navigate("/users");
                  }}
                  className="text-dark-gray cursor-pointer hover:text-blue font-Inter"
                  title="BACK "
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
