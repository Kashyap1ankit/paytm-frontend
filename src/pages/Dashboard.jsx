import { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import axios from "axios";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../auth";
import Loading from "../loading.json";
import Lottie from "lottie-react";
import Transfer from "../assets/svg/transfer.svg";
import Transaction from "../assets/svg/transaction.svg";
import UpdateProfile from "../assets/svg/update.svg";

export default function Dashboard() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [balance, setBalance] = useState(0);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  const user = useAuth();

  useEffect(() => {
    if (user.loading) {
      setLoad(true);
    }

    if (!user.loading) {
      setLoad(false);
      if (user.loggedIn) {
        navigate("/dashboard");
      }
      if (!user.loggedIn) {
        navigate("/signin");
      }
    }
  }, [navigate, user.loggedIn, user.loading]);

  //Get the user balance

  useEffect(() => {
    const call = async () => {
      const result = await axios.get(`${BASE_URL}/api/v1/account/balance`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      setBalance(result.data.balance);
    };

    call();
  }, []);

  return (
    <div>
      <div>
        <NavBar />
      </div>

      {load ? (
        <Lottie
          className="xl:size-48 xsm:size-36 mx-auto mt-52"
          animationData={Loading}
          loop={true}
        />
      ) : (
        <div>
          {/* Balance section card  */}
          <motion.div
            animate={{
              scale: [1.2, 1],
            }}
            className="xsm:px-4 xsm:py-2 xsm:mx-auto xl:mx-0 mt-36  xl:pr-24 xl:py-6 bg-white w-fit rounded-md shadow-xl font-Liber"
          >
            <Title className={"xl:text-sm mb-2 text-gray"} title={"INR"} />
            <Title
              className={"xl:text-xl text-darkGray"}
              title={`Current Balance`}
            />
            <Title
              className={"xl:text-3xl font-Mingzant mt-2"}
              title={`₹${balance} `}
            />
          </motion.div>

          {/* Features section  */}

          <Title
            className={"mt-24 mb-0 xl:text-4xl text-white font-Lexend"}
            title={"SERVICES"}
          />

          <div className="lg:flex lg:justify-start mt-0 lg:w-2/3">
            <motion.div
              onClick={() => {
                navigate("/users");
              }}
              className="cursor-pointer mr-16"
              animate={{
                x: [-500, 0],
              }}
            >
              <img
                className="xl:size-20 xl:mt-20 border-2 rounded-full p-2 bg-white"
                src={Transfer}
                alt=""
              />
              <Title
                title={"Send Money"}
                className={"text-white text-center xl:mt-4 font-Lexend"}
              />
            </motion.div>

            <motion.div
              onClick={() => {
                navigate("/transcation");
              }}
              className="cursor-pointer mr-16"
              animate={{
                x: [500, 0],
              }}
            >
              <img
                className="xl:size-20 xl:mt-20 border-2 rounded-full p-2 bg-white"
                src={Transaction}
                alt=""
              />
              <Title
                title={"Transcations"}
                className={"text-white text-center xl:mt-4 font-Lexend"}
              />
            </motion.div>

            <motion.div
              onClick={() => {
                navigate("/update");
              }}
              className="cursor-pointer mr-16"
              animate={{
                x: [500, 0],
              }}
            >
              <img
                className="xl:size-20 xl:mt-20 border-2 rounded-full p-2 bg-white"
                src={UpdateProfile}
                alt=""
              />
              <Title
                title={"Profile"}
                className={"text-white text-center xl:mt-4 font-Lexend"}
              />
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
