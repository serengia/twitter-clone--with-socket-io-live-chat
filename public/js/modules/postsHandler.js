import axios from "axios";

import { generatePostMarkup } from "./generatePostMarkup";

export const loadPosts = async (postsContainer) => {
  try {
    const res = await axios.get("/api/v1/posts");

    const postMarkup = res.data
      .map((postData) => {
        return generatePostMarkup(postData);
      })
      .join("");

    // eslint-disable-next-line no-param-reassign
    postsContainer.innerHTML = postMarkup;
  } catch (error) {
    console.log(error);
  }
};
