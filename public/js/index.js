import axios from "axios";
import { generatePostMarkup } from "./modules/generatePostMarkup";
import { loadPosts } from "./modules/postsHandler";

const postTextArea = document.getElementById("postTextarea");
const submitButton = document.getElementById("submitPostButton");
const postsContainer = document.querySelector(".postsContainer");

postTextArea.addEventListener("keyup", (e) => {
  const value = e.target.value.trim();

  if (value.length === 0) {
    submitButton.setAttribute("disabled", true);
  } else {
    submitButton.removeAttribute("disabled");
  }
});

submitButton.addEventListener("click", async () => {
  const data = { content: postTextArea.value };
  try {
    const res = await axios.post("/api/v1/posts", data);
    const postMarkup = generatePostMarkup(res.data);
    postsContainer.insertAdjacentHTML("afterbegin", postMarkup);
    submitButton.setAttribute("disabled", true);
    postTextArea.value = "";
    console.log(res);
  } catch (error) {
    console.log("SEE ERROR>>", error);
  }
});

// Load posts
loadPosts(postsContainer);

postsContainer.addEventListener("click", (e) => {
  const likeButton = e.target.closest(".likeButton");

  if (!likeButton) return;
  console.log("CHECK EV->", likeButton);
});
