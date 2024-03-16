import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "../components/Title";
import { zodResolver } from "@hookform/resolvers/zod";
import { userUpdateSchema } from "../schema";
import axios from "axios";
import { motion } from "framer-motion";
import { useAuth } from "../auth";
import { useEffect, useState } from "react";

export default function UpdateTab() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    defaultValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userUpdateSchema),
  });

  const user = useAuth();

  useEffect(() => {
    if (user.loading) {
      console.log("laoding..");
    }

    if (!user.loading) {
      if (!user.loggedIn) {
        navigate("/signin");
      }
    }
  }, [navigate, user.loading, user.loggedIn]);

  const [searchParams, setSearchParams] = useSearchParams();
  const [serverError, setServerError] = useState({
    status: false,
    message: "",
  });
  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName");

  const onSubmit = async (data) => {
    try {
      const result = await axios.put(`${BASE_URL}/api/v1/user`, data, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      navigate("/dashboard");
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
          className="bg-red xms:w-screen xl:w-fit py-2 px-16 xl:absolute xl:top-4 rounded-md font-Inter bg-red text-white text-center shadow-md "
        >
          <Title title={serverError.message} />
        </motion.div>
      ) : null}

      <div className="xsm:m-4 md:w-1/2 md:mx-auto xl:w-1/3 xl:mx-auto mt-12 bg-white p-8 rounded-md shadow-md">
        <Title
          className="text-center font-bold xl:text-4xl xsm:text-2xl font-Inter mb-12"
          title={"Update !"}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Change FirstName"
            register={register}
            name="firstName"
            defaultValue={firstName}
          />
          <p className="text-red">{errors.firstName?.message}</p>
          <Input
            label="Change Lastname"
            register={register}
            name="lastName"
            defaultValue={lastName}
          />
          <p className="text-red">{errors.lastName?.message}</p>
          <Input label="Change Password" register={register} name="password" />
          <p className="text-red">{errors.password?.message}</p>
          <Button
            className="bg-green mt-4 p-4 text-center font-2xl text-white font-Inter rounded-md "
            title="Update"
          />
        </form>
        <div className="flex justify-center text-center w-full mt-4 ">
          <Title
            onClick={() => {
              navigate("/dashboard");
            }}
            className="text-dark-gray cursor-pointer hover:text-blue font-Inter"
            title="Goto Dashboard "
          />
        </div>
      </div>
    </div>
  );
}
