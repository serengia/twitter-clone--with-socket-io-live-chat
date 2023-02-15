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

postsContainer.addEventListener("click", async (e) => {
  const likeButton = e.target.closest(".likeButton");

  if (!likeButton) return;
  const id = likeButton.closest(".post").dataset.id;

  const res = await axios.patch(`/api/v1/posts/${id}/like`);
  const postData = res.data;
  const likesCountWrapper = likeButton.querySelector("span");
  if (!likesCountWrapper) return;
  likesCountWrapper.textContent = `${postData.likes.length || ""}`;

  const loggedInUserData = JSON.parse(
    document.querySelector("body").dataset.loggedInUser
  );

  if (postData.likes.includes(loggedInUserData._id)) {
    likeButton.classList.add("active");
  } else {
    likeButton.classList.remove("active");
  }
  console.log("FROM KK", loggedInUserData);

  console.log("What I get back...", res.data);
});

postsContainer.addEventListener("click", async (e) => {
  const retweetButton = e.target.closest(".retweetButton");

  if (!retweetButton) return;
  const id = retweetButton.closest(".post").dataset.id;

  const res = await axios.post(`/api/v1/posts/${id}/retweet`);
  const retweetData = res.data;
  console.log(retweetData);

  // const retweetsCountWrapper = retweetButton.querySelector("span");
  // if (!retweetsCountWrapper) return;
  // retweetsCountWrapper.textContent = `${postData.retweets.length || ""}`;

  // const loggedInUserData = JSON.parse(
  //   document.querySelector("body").dataset.loggedInUser
  // );

  // if (postData.retweets.includes(loggedInUserData._id)) {
  //   retweetButton.classList.add("active");
  // } else {
  //   retweetButton.classList.remove("active");
  // }
  // console.log("FROM KK", loggedInUserData);

  // console.log("What I get back...", res.data);
});
