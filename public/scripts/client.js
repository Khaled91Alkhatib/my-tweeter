const createTweetElement = function (tweetData) {
  const escape = function (str) { // This function prevents Cross-Site Scripting by re-encoding text
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const postedTweet = `<article id="tweets-container">
  <header>
    <div class = "header-content">
      <div class="image-name">
        <img src=${escape(tweetData.user.avatars)}>
        <span style="margin-left: 0.5em;">${escape(tweetData.user.name)}</span>
      </div>
      <span style="color: rgb(165, 103, 223); display: flex; align-items: center">${escape(
        tweetData.user.handle
      )}</span>
    </div>
    <br>
    <span style="margin-left: 0.5em; word-wrap:break-word"><strong>${escape(
      tweetData.content.text
    )}</strong></span>
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

const loadTweet = function () {
  $.ajax("/tweets", {
    method: "GET",
    dataType: "json",
  }).then((response) => {
    renderTweets(response);
  });
};

$(document).ready(function () {
  // Upon button click, the area to write a new tweet will slide down and cursor will be already set to type
  $(".compose").click(function () {  
    $(".new-tweet").slideDown();
    $(".text-area").focus();
  });
});

$(document).ready(function () {  // helpful so that the code is excuted after all the code runs
  $("form").submit(function (event) {
    event.preventDefault();
    if ($("textarea").val().length <= 0) {
      const errorMsg = $(this).parent().find(".empty-error-msg");
      errorMsg.css("visibility", "visible").slideDown(200).fadeOut(4000); // edge case
    } else if ($("textarea").val().length > 140) {
      const errorMsg = $(this).parent().find(".long-text-area");
      errorMsg.css("visibility", "visible").slideDown(200).fadeOut(4000); // edge case
    } else {
      $.ajax("/tweets", {
        method: "POST",
        data: $(this).serialize(),
      }).then(() => {
        // the code below will allow new tweets to be added and textarea cleaned without refreshing the page
        $("textarea").val("");
        $("output").text(140); // reset counter
        $.get("/tweets", (serverResponse) => {
          const newTweet = [serverResponse.slice(-1).pop()];
          renderTweets(newTweet);
        });
      });
    }
  });
  loadTweet();
});
