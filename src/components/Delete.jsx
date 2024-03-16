import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Title from "./Title";
import axios from "axios";

export default function Delete() {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  function handleCancel() {
    navigate("/dashboard");
  }

  const handleDelete = async () => {
    try {
      const result = await axios.delete(`${BASE_URL}/api/v1/user/destroy`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (result.status != 200) throw new Error();
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Title
        className={
          "xsm:text-2xl md:text-3xl xl:text-4xl text-white  font-Lexend"
        }
        title={"DELETE ACCOUNT"}
      />
      <Title
        className={"text-foggyWhite font-Inter mt-4 xl:w-1/2"}
        title={
          "Are you sure to delte your account? Once you delete your account, there is no going back. Please be certain."
        }
      />
      <div className="xsm:grid xsm:grid-cols-2 xsm:w-screen md:flex md:justify-start xl:w-1/2 mt-20">
        <Button
          className="bg-button p-2 mr-24 rounded-md text-white font-Lexend md:min-w-24 text-center cursor-pointer "
          title="Cancel"
          onClick={handleCancel}
        />
        <Button
          className="outline outline-2 outline-dotted outline-offset-1 bg-danger outline-danger p-2 mr-24 rounded-md text-white font-Lexend md:min-w-24 text-center cursor-pointer"
          title="Delete"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}
