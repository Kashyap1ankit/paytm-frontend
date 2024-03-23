import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Transaction() {
  const [totalTrans, setTotalTrans] = useState([]);
  const [transaction, setTransaction] = useState([]);
  //Pagination

  const [curr, setCurrPage] = useState(1);
  const recordPerPage = 5;
  const lastIndex = curr * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const [numberOfPages, setNumberPages] = useState(
    Math.ceil(totalTrans.length / recordPerPage)
  );

  useEffect(() => {
    setNumberPages(Math.ceil(totalTrans.length / recordPerPage));
  }, [totalTrans, transaction]);

  //Hitting backend for transaction bit
  useEffect(() => {
    const call = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/user/transaction`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setTotalTrans(res.data.txns);

        //Filtered trans for pagintation

        const data = res.data.txns.slice(firstIndex, lastIndex);
        setTransaction(data);
      } catch (error) {
        console.log(error);
      }
    };
    call();
  }, [curr]);

  function convertDate(t) {
    const timestamp = t;
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }

  return (
    <div>
      <div className="bg-white xsm:w-11/12 xsm:mt-12 xsm:mx-auto   xsm:rounded-sm md:w-9/12 md:mx-auto md:px-4 lg:w-1/2 lg:mt-12 px-8 lg:py-4 rounded-md lg:mx-auto">
        {transaction.map((e) => {
          return (
            <div className="xsm:flex xsm:justify-evenly md:flex md:justify-between border-b-2 border-gray py-6 cursor-pointer">
              <p className="xsm:text-sm font-Lexend xsm:w-1/2 xl:w-1/3">
                {convertDate(e.time)}
              </p>
              <p className="xsm:text-sm font-Inter text-center text-darkGray  xl:w-1/3 xsm:hidden sm:block">
                #{e._id}
              </p>
              {e.type === "credit" ? (
                <p className="text-green font-bold font-Liber xsm:w-1/2  xl:w-1/3 text-right">
                  ₹{e.amount}
                </p>
              ) : (
                <p className="text-red font-bold font-Liber xsm:w-1/2  xl:w-1/3  text-right">
                  -₹{e.amount}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination  */}

      <div className="w-fit mt-6  xl:mt-20">
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
