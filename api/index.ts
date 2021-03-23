import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_ENV_LAMBDA_URL;

export const createUser = (user: { name: string; uid: string; dob: string }) => {
  return axios.post(`${BASE_URL}/users`, user);
};
