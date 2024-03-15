import { useEffect, useState } from "react";
import axios from "axios";
import Profile from "../assets/svg/profile.svg";
import Title from "../components/Title";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Loading from "../loading.json";
import Lottie from "lottie-react";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function AllUser() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [totalUsers, setTotalUsers] = useState([]);
  const [users, setUser] = useState([]);
  const [searchLoad, setSearchLoad] = useState(false);
  const navigate = useNavigate();

  //Pagination

  const [curr, setCurrPage] = useState(1);
  const recordPerPage = 5;
  const lastIndex = curr * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const [numberOfPages, setNumberPages] = useState(
    Math.ceil(totalUsers.length / recordPerPage)
  );

  //nothing in the

  const [nothig, setNothing] = useState(false);

  useEffect(() => {
    setNumberPages(Math.ceil(totalUsers.length / recordPerPage));
  }, [totalUsers, users]);

  useEffect(() => {
    const call = async () => {
      const result = await axios.get(`${BASE_URL}/api/v1/user/all`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      //All users from database
      setTotalUsers(result.data.users);

      //Filtered users for pagintation

      const data = result.data.users.slice(firstIndex, lastIndex);
      setUser(data);
    };

    call();
  }, [curr, nothig]);

  //Search user functionality

  //Search user
  let timer;
  const debounce = (e) => {
    setSearchLoad(true);
    if (timer) clearTimeout(timer);
    if (e.target.value === "") {
      setNothing(true);
      setTimeout(() => {
        setNothing(false);
      }, 2000);
    }
    timer = setTimeout(async () => {
      try {
        const result = await axios.get(
          `${BASE_URL}/api/v1/user/bulk?filter=${e.target.value}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setTotalUsers([]);
        setUser(result.data.allUsers);
      } catch (error) {
        if (error.response.status === 404) {
          setTotalUsers([]);
          setUser(null);
        }
      } finally {
        setSearchLoad(false);
      }
    }, 1500);
  };

  return (
    <div>
      {/* Search Input form  */}
      <div className="xsm:mt-4 xsm:w-full  xl:mt-12 text-center  ">
        <form>
          <input
            placeholder="Search for user"
            type="text"
            name="value"
            id=""
            onChange={debounce}
            className="xsm:w-full md:rounded-full md:w-1/2 xl:mx-auto outline-none p-2"
          />
        </form>
      </div>

      {/* Laoding  */}

      <div className="mt-12">
        {searchLoad ? (
          <Lottie className="size-24 " animationData={Loading} loop={true} />
        ) : null}
      </div>

      {/* All user display */}

      <div className="xsm:overflow-y-scroll md:overflow-y-auto xsm:max-h-96 md:max-h-fit bg-white p-2 rounded-md xl:w-1/3 xsm:m-4 xl:m-auto ">
        {users &&
          users.map((e) => {
            return (
              <div className="mb-4 md:flex md:justify-bewteen xsm:justify-around border-b-2 p-2 border-gray">
                <div className="flex justify-start items-center xl:w-2/3 xsm:w-full">
                  <img src={Profile} className="size-8 mr-0 ml-0 " />
                  <Title
                    className="bg-white mr-2 p-2"
                    title={`${e.firstName} ${e.lastName} (@${e.username})`}
                  />
                </div>
                <div className="  md:w-1/3 xsm:mt-4 xl:mt-0">
                  <Button
                    onClick={() => {
                      navigate(`/send?id=${e._id}&name=${e.firstName}`);
                    }}
                    className="bg-black xsm:p-2 xsm:text-sm md:w-fit md:w-fit p-3 text-center text-white rounded-md  "
                    title={"Send Money"}
                  />
                </div>
              </div>
            );
          })}
      </div>

      {/* Pagination  */}

      <div className="w-fit  xl:mt-20">
        <Stack spacing={2}>
          <Pagination
            count={numberOfPages}
            variant="outlined"
            onChange={(e, value) => {
              setCurrPage(value);
            }}
          />
        </Stack>
      </div>
    </div>
  );
}
