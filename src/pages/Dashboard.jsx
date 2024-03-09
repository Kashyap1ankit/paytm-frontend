import { useCallback, useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import axios from "axios";
import Title from "../components/Title";
import Button from "../components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../auth";
import Loading from "../loading.json";
import Lottie from "lottie-react";
import Profile from "../assets/svg/profile.svg";

export default function Dashboard() {
  const [users, setUser] = useState([]);
  const [balance, setBalance] = useState(0);
  const [load, setLoad] = useState(false);
  const [searchLoad, setSearchLoad] = useState(false);
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

  //Get all the users

  useEffect(() => {
    const call = async () => {
      const result = await axios.get(
        "https://paytm-backend-wacd.onrender.com/api/v1/user/all",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setUser(result.data.users);
    };

    call();
  }, []);

  //Get the user balance

  useEffect(() => {
    const call = async () => {
      const result = await axios.get(
        "https://paytm-backend-wacd.onrender.com/api/v1/account/balance",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setBalance(result.data.balance);
    };

    call();
  }, []);

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
          `https://paytm-backend-wacd.onrender.com/api/v1/user/bulk?filter=${e.target.value}`,
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
          <div className="xsm:px-4 xsm:py-2 xsm:mx-auto xl:mx-0 mt-28  xl:px-8 xl:py-4 bg-white w-fit rounded-md font-Inter">
            <Title title={`Current Balance: ₹${balance} `} />
          </div>
          <div>
            <form>
              <input
                placeholder="Search for user"
                type="text"
                name="value"
                id=""
                onChange={debounce}
                className="xsm:mt-20 xsm:w-full md:w-3/4 md:mx-4 lg:w-1/2 xl:mt-28 xl:mx-0 md:rounded-md  p-2 outline-none"
              />
            </form>
          </div>

          <div className="mt-12">
            {searchLoad ? (
              <Lottie
                className="size-24 "
                animationData={Loading}
                loop={true}
              />
            ) : null}

            <div className="bg-white p-2 rounded-md xl:w-1/2 xsm:m-4 xl:m-0">
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
        </div>
      )}
    </div>
  );
}
