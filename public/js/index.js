import axios from "axios";
import { generatePostMarkup } from "./modules/generatePostMarkup";

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

submitPostButton.addEventListener("click", async (e) => {
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

const loadPosts = async () => {
  try {
    const res = await axios.get("/api/v1/posts");

    const postMarkup = res.data
      .map((postData) => {
        return generatePostMarkup(postData);
      })
      .join("");

    postsContainer.innerHTML = postMarkup;
  } catch (error) {
    console.log(error);
  }
};

loadPosts();
