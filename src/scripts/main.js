$(document).ready(function () {
  //
  $("select").on("change", function () {
    changeSelect();
  });

  function changeSelect() {
    switch ($('select').val()) {
      case "bsg":
        $(".bsg").css("display", "block");
        $(".tsg").css("display", "none");
        $(".gg").css("display", "none");
        break;
      case "tsg":
        $(".tsg").css("display", "block");
        $(".bsg").css("display", "none");
        $(".gg").css("display", "none");
        break;
      case "gg":
        $(".tsg").css("display", "none");
        $(".bsg").css("display", "none");
        $(".gg").css("display", "block");
        break;
    }
  }
  changeSelect();

  $("#btn_mode").on("click", function () {
    if ($(this).attr("mode") == "day") {
      $(this).attr("mode", "night");
      $(this).text("night mode");
      $("body").css("background-color", "#333333");
      $(".tsg_title").css("color", "#ffffff");
    } else {
      $(this).attr("mode", "day");
      $(this).text("day mode");
      $("body").css("background-color", "#dddddd");
      $(".tsg_title").css("color", "#000000");
    }
  });
  //
});
