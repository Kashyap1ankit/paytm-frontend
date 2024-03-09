import Lottie from "lottie-react";
import ErrorImg from "../error.json";
import Button from "../components/Button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();
  return (
    <div className="w-1/3 mx-auto">
      <Lottie animationData={ErrorImg} />
      <motion.div
        animate={{
          x: [-500, 0],
        }}
        transition={{
          duration: 0.2,
        }}
        className="cursor-pointer"
      >
        <Button
          className="bg-emerald mx-auto text-center font-Inter text-md text-white p-4 px-2 rounded-md w-fit"
          title={"Goto Main Page"}
          onClick={() => {
            navigate("/");
          }}
        />
      </motion.div>
    </div>
  );
}
