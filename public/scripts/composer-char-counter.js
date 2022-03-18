$(document).ready(function() {
  $(".text-area").keyup(function() {
    const textToVal = $(this).val();
    const remainder = 140 - textToVal.length;
    $(".counter").html(remainder);
    if (remainder < 0) {
      $(".counter").addClass("red");
    } else {
      $(".counter").removeClass("red"); // change color back to normal if count is > 0
    }
  });
});