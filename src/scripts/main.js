$(document).ready(function () {
  //
  $("#mode-btn").on("click", function () {
    if ($(this).attr("mode") == "day") {
      $(this).attr("mode", "night");
      $(this).text("night mode");
      $("body").css("background-color", "#333333");
      $("h1").css("color", "#ffffff");
    } else {
      $(this).attr("mode", "day");
      $(this).text("day mode");
      $("body").css("background-color", "#dddddd");
      $("h1").css("color", "#000000");
    }
  });
  //
});
