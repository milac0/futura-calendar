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

export const filterAccessibleCalendars = arr => {
  return arr.filter(item => !item.id.includes("group.v.calendar")).reverse();
};

export const fetchApi = async url => {
  let accessToken = getLocalStorageToken();
  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  return res.data;
};

export const postEventApi = async (url, body) => {
  let accessToken = getLocalStorageToken();
  try {
    await axios.post(url, body, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteEventApi = async url => {
  let accessToken = getLocalStorageToken();
  await axios.delete(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
}
