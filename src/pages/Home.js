import React, { useEffect } from "react";
import axios from "axios";
import { getLocalStorageToken } from "../util/funcs";

const Home = () => {
  useEffect(() => {
    const fetchCalendarList = async () => {
      const token = getLocalStorageToken();
      const res = await axios.get(
        "https://www.googleapis.com/calendar/v3/users/me/calendarList",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res.data);
    };
    fetchCalendarList();
  }, []);

  return <div>home page</div>;
};

export default Home;
