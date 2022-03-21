$(document).ready(function() {
  $(".text-area").keyup(function() {
    const textToVal = $(this).val();
    const remainder = 140 - textToVal.length;
    const counter = $(this).parent().find(".counter");
    counter.val(remainder);
    if (remainder < 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", "");
    }
  });
});