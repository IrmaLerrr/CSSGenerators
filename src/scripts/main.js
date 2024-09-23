$(document).ready(function () {
  //
  // $("select").on("change", function () {
  //   changeSelect();
  // });

  // function changeSelect() {
  //   switch ($('select').val()) {
  //     case "bsg":
  //       $(".bsg").css("display", "block");
  //       $(".tsg").css("display", "none");
  //       $(".gg").css("display", "none");
  //       break;
  //     case "tsg":
  //       $(".tsg").css("display", "block");
  //       $(".bsg").css("display", "none");
  //       $(".gg").css("display", "none");
  //       break;
  //     case "gg":
  //       $(".tsg").css("display", "none");
  //       $(".bsg").css("display", "none");
  //       $(".gg").css("display", "block");
  //       break;
  //   }
  // }
  // changeSelect();

  $("#btn_mode").on("click", function () {
    if ($(this).attr("mode") == "day") {
      $(this).attr("mode", "night");
      $(this).text("night mode");
      $("body").css("background-color", "#333333");
      // $(".tsg_title").css("color", "#ffffff");
    } else {
      $(this).attr("mode", "day");
      $(this).text("day mode");
      $("body").css("background-color", "#dddddd");
      // $(".tsg_title").css("color", "#000000");
    }
  });

  // $("#btn_burger").on("click", function () {
  //   if ($("ul").css("transform") == "translateY(-100%)")
  //     $("ul").css("transform", "translateY(-50%)");
  //   else $("ul").css("transform", "translateY(-100%)");
  // });
  $("#btn_burger").on("click", function () {
    $("nav").toggleClass("active")
    $("#btn_burger").toggleClass("active")
  });
  
  $("#btn_generator-tsg, #btn_generator-bsg, #btn_generator-gg").on("click", function () {
    if (!$(this).hasClass("active")){
      $("#btn_generator-tsg, #btn_generator-bsg, #btn_generator-gg").removeClass("active")
      $(this).addClass("active")
      $(".tsg, .bsg, .gg").css("display", "none")
      switch ($(this).attr("id")){
        case "btn_generator-tsg":
          $(".tsg").css("display", "block")
          break;
        case "btn_generator-bsg":
          $(".bsg").css("display", "block")
          break;
        case "btn_generator-gg":
          $(".gg").css("display", "block")
          break;
      }
    }
  });

  //
});
