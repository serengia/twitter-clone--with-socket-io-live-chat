import axios from "axios";
import { generatePostMarkup } from "./modules/generatePostMarkup";
import { loadPosts } from "./modules/postsHandler";

const postTextArea = document.getElementById("postTextarea");
const replyTextArea = document.getElementById("replyTextarea");
const submitPostButton = document.getElementById("submitPostButton");
const submitReplyButton = document.getElementById("submitReplyButton");
const postsContainer = document.querySelector(".postsContainer");

const home = () => {
  // home page entry file
  [postTextArea, replyTextArea].forEach((ele) => {
    ele.addEventListener("keyup", (e) => {
      const textbox = e.target;
      const value = textbox.value.trim();

      const isModel = textbox.closest(".modal");

      const submitButton = isModel ? submitReplyButton : submitPostButton;

      if (value.length === 0) {
        submitButton.setAttribute("disabled", true);
      } else {
        submitButton.removeAttribute("disabled");
      }
    });
  });

  [submitPostButton, submitReplyButton].forEach((ele) => {
    ele?.addEventListener("click", async (e) => {
      const isModal = e.target.closest(".modal");
      let data;
      if (isModal) {
        const id = submitReplyButton.dataset.id;
        console.log("Id>>", id);

        data = { content: replyTextArea.value, replyTo: id };
      } else {
        data = { content: postTextArea.value };
      }

      try {
        const res = await axios.post("/api/v1/posts", data);
        console.log("DATAA>", res.data);
        // eslint-disable-next-line no-restricted-globals
        if (res.data.replyTo) return location.reload();

        const postMarkup = generatePostMarkup(res.data);
        postsContainer.insertAdjacentHTML("afterbegin", postMarkup);

        submitPostButton.setAttribute("disabled", true);
        postTextArea.value = "";
      } catch (error) {
        console.log("SEE ERROR>>", error);
      }
    });
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
    // console.log("FROM KK", loggedInUserData);

    // console.log("What I get back...", res.data);
  });

  // Retweet handler
  postsContainer.addEventListener("click", async (e) => {
    const retweetButton = e.target.closest(".retweetButton");

    if (!retweetButton) return;
    const id = retweetButton.closest(".post").dataset.id;

    const res = await axios.post(`/api/v1/posts/${id}/retweet`);
    const postData = res.data;

    const retweetsCountWrapper = retweetButton.querySelector("span");
    if (!retweetsCountWrapper) return;
    retweetsCountWrapper.textContent = `${postData.retweetUsers.length || ""}`;

    const loggedInUserData = JSON.parse(
      document.querySelector("body").dataset.loggedInUser
    );

    if (postData.retweetUsers.includes(loggedInUserData._id)) {
      retweetButton.classList.add("active");
    } else {
      retweetButton.classList.remove("active");
    }
  });

  // populate modal on modal load
  document
    .getElementById("replyModal")
    .addEventListener("shown.bs.modal", async (e) => {
      const id = e.relatedTarget.closest(".post").dataset.id;
      if (!id) return;
      const res = await axios.get(`/api/v1/posts/${id}`);
      const markup = generatePostMarkup(res.data);
      document.getElementById("originalPostContainer").innerHTML = markup;

      const submitReplyBtn = document.getElementById("submitReplyButton");

      submitReplyBtn.setAttribute("data-id", id);
    });

  // clear post when modal close
  document
    .getElementById("replyModal")
    .addEventListener("hidden.bs.modal", async () => {
      document.getElementById("originalPostContainer").innerHTML = "";
    });

  // Click tweet handler
  postsContainer.addEventListener("click", (e) => {
    const post = e.target.closest(".post");
    const id = post.dataset.id;
    if (e.target.closest(".postFooter")) return;
    if (id) {
      window.location.href = `/posts/${id}`;
    }
  });
};

export default home;
