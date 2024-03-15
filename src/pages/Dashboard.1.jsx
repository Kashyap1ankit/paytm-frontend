import { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import axios from "axios";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../auth";
import Loading from "../loading.json";
import Lottie from "lottie-react";

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
              scale: [2, 1],
            }}
            transition={{ duration: 0.2 }}
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

          {/* Send Money section  */}
        </div>
      )}
    </div>
  );
}
