import axios from "axios";

const instance = axios.create({
  baseURL: "yourBaseURL",
});

export default instance;
