import axios from "axios";

export const getLocalStorageToken = () => {
  const token = localStorage.getItem("calendarToken");
  if (token) {
    return JSON.parse(token);
  } else {
    return false;
  }
};

export const checkAccessTokenExp = async token => {
  let valid = false;
  try {
    const res = await axios.get(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`
    );
    valid = res.data.expires_in > 0 ? true : false;
  } catch (err) {
    console.log(err);
  }
  return valid;
};


// filter group.v.calendar calendarList