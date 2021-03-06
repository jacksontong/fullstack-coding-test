import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_ENV_LAMBDA_URL;

export type Post = { [k: string]: any };

export const createUser = (user: { name: string; uid: string; dob: string }) => {
  return axios.post(`${BASE_URL}/users`, user);
};

export const fetchPosts = () => {
  return axios.get<Post[]>(`${BASE_URL}/posts`);
};

export const deletePost = (id: string) => {
  return axios.delete(`${BASE_URL}/posts/${id}`);
};

export const createPost = (post: Post) => {
  return axios.post<Post>(`${BASE_URL}/posts`, post);
};

export const updatePost = (id: number, post: Post) => {
  return axios.patch(`${BASE_URL}/posts/${id}`, post);
};
