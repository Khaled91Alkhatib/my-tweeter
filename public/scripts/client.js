/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function (tweetData) {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  const postedTweet = `<article id="tweets-container">
  <header>
    <div class = "header-content">
      <div class="image-name">
        <img src="https://i.imgur.com/73hZDYK.png">
        <span style="margin-left: 0.5em;">${escape(tweetData.user.name)}</span>
      </div>
      <span style="color: rgb(165, 103, 223);">${escape(tweetData.user.handle)}</span>
    </div>
    <br>
    <span><strong>${escape(tweetData.content.text)}</strong></span>
  </header>
  <footer>
    <span>${escape(timeago.format(tweetData.created_at))}</span>
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
    $("#tweets-container").prepend(createTweetElement(tweet));
  });
};

// renderTweets(tweets);

const loadTweet = function () {
  $.ajax("/tweets", {
    method: "GET",
    dataType: "json",
  }).then((response) => {
    renderTweets(response);
  });
};

$(document).ready(function () { // helpful to be excuted after all the code runs
  $("form").submit(function (event) {
    event.preventDefault();
    if ($("textarea").val().length <= 0) {
      alert("Tweet can not be empty!");
    } else if ($("textarea").val().length > 140) {
      alert("Tweet exceeds allowed length");
    } else {
      $.ajax("/tweets", {
        method: "POST",
        data: $(this).serialize(),
      }).then(() => {
        // the code below will allow new tweets to be added and textarea cleaned without refreshing the page
        $("textarea").val("");
        $("output").text(140);
        $.get("/tweets", (serverResponse) => {
          const newTweet = [serverResponse.slice(-1).pop()];
          renderTweets(newTweet);
        });
      });
    }
  });
  loadTweet();
});
