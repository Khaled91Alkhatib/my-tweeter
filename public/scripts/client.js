/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweets = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

const createTweetElement = function (tweetData) {
  console.log(tweetData, "tweetdata");
  const postedTweet = `<article id="tweets-container">
  <header>
    <div class = "header-content">
      <div class="image-name">
        <img src="https://i.imgur.com/73hZDYK.png">
        <span style="margin-left: 0.5em;">${tweetData.user.name}</span>
      </div>
      <span style="color: rgb(165, 103, 223);">${tweetData.user.handle}</span>
    </div>
    <br>
    <span><strong>${tweetData.content.text}</strong></span>
  </header>
  <footer>
    <span>${tweetData.created_at}</span>
    <div>
      <i class="fa-solid fa-flag tweet-icons"></i>
      <i class="fa-solid fa-retweet icon tweet-icons"></i>
      <i class="fa-solid fa-heart tweet-icons"></i>
    </div>
  </footer>
</article>`;
  return postedTweet;
};

const renderTweets = function (tweets) {
  tweets.forEach((tweet) => {
    $("#tweets-container").append(createTweetElement(tweet));
  });
};

renderTweets(tweets);
