import useErrorStore from "@/zustandStore/errorStore";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_URL}`,
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    useErrorStore.setState({
      hasError: true,
      errorMessage: error.response.message,
    });

    return Promise.reject(error);
  }
);

export default axiosClient;
