import { useEffect, useState } from "react";
import axios from "axios";
import Profile from "../assets/svg/profile.svg";
import Title from "../components/Title";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Loading from "../loading.json";
import Lottie from "lottie-react";

export default function AllUser() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [users, setUser] = useState([]);
  const [searchLoad, setSearchLoad] = useState(false);
  const navigate = useNavigate();

  //Get all the users

  useEffect(() => {
    const call = async () => {
      const result = await axios.get(`${BASE_URL}/api/v1/user/all`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      setUser(result.data.users);
    };

    call();
  }, []);

  //Search user functionality

  //Search user
  let timer;
  const debounce = (e) => {
    setSearchLoad(true);
    if (timer) clearTimeout(timer);
    if (e.target.value === "") {
      setUser((users) => users);
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

        setUser(result.data.allUsers);
      } catch (error) {
        if (error.response.status === 404) {
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
      <div>
        <form>
          <input
            placeholder="Search for user"
            type="text"
            name="value"
            id=""
            onChange={debounce}
            className="xsm:mt-20 xsm:w-full md:w-3/4 md:mx-4 lg:w-1/2 xl:mt-28 xl:mx-auto md:rounded-full p-2 outline-none"
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

      <div className="overflow-x-auto max-h-fit bg-white p-2 rounded-md xl:w-1/2 xsm:m-4 xl:m-0 xl:max-h-24">
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
    </div>
  );
}
