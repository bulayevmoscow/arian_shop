import axios from "axios";
import { IPost } from "./types";

export const getPosts = (page: number, itemsOnPage: number) => {
  return axios.get<IPost[]>(
    `https://jsonplaceholder.typicode.com/posts?_start=${
      page * itemsOnPage
    }&_limit=${itemsOnPage}`
  );
};
