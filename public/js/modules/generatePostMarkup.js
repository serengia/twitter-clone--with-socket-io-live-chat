import { timeDifference } from "./timeDifference";

export function generatePostMarkup(postData) {
  const postedBy = postData.postedBy;

  const displayName = `${postedBy.firstName} ${postedBy.lastName}`;

  const timestamp = timeDifference(new Date(), new Date(postData.createdAt));

  const loggedInUserData = JSON.parse(
    document.querySelector("body").dataset.loggedInUser
  );

  const likeButtonActiveClass = postData.likes.includes(loggedInUserData._id)
    ? "active"
    : "";

  return `<div class='post' data-id="${postData._id}">
  
                <div class='mainContentContainer'>
                    <div class='userImageContainer'>
                        <img src='${postedBy.profilePic}'>
                    </div>
                    <div class='postContentContainer'>
                        <div class='header'>
                            <a href='/profile/${
                              postedBy.username
                            }' class='displayName'>${displayName}</a>
                            <span class='username'>@${postedBy.username}</span>
                            <span class='date'>${timestamp}</span>
                        </div>
                        <div class='postBody'>
                            <span>${postData.content}</span>
                        </div>
                        <div class='postFooter'>
                            <div class='postButtonContainer'>
                                <button class="commentButton">
                                    <i class='far fa-comment'></i>
                                </button>
                            </div>
  
                            <div class='postButtonContainer green'>
                                <button class="retweetButton">
                                    <i class='fas fa-retweet'></i>
                                </button>
                            </div>
                            <div class='postButtonContainer red'>
                                <button class="likeButton ${likeButtonActiveClass}">
                                    <i class='far fa-heart'></i>
                                    <span>${postData.likes.length || ""}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}
