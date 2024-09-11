$(document).ready(function () {
  //
  var shadowObj = {
    units: "px",
    "range-font-size": $("#range-font-size").val(),
    "range-offset-X": $("#range-offset-X").val(),
    "range-offset-Y": $("#range-offset-Y").val(),
    "range-blur": $("#range-blur").val(),
    colorpick: $("#colorpick").val(),
    "range-opacity": $("#range-opacity").val(),
  };

  $(".range, #colorpick").on("input", function () {
    shadowObj[$(this).attr("id")] = $("#" + $(this).attr("id")).val();

    $(this).next().children(":first").text($(this).val());

    var shadow =
      shadowObj.colorpick.toUpperCase() +
      Math.floor(shadowObj["range-opacity"] * 255)
        .toString(16)
        .toUpperCase() +
      " " +
      shadowObj["range-offset-X"] +
      shadowObj.units +
      " " +
      shadowObj["range-offset-Y"] +
      shadowObj.units +
      " " +
      shadowObj["range-blur"] +
      shadowObj.units;

    $("h1").css("font-size", shadowObj["range-font-size"] + shadowObj.units);
    $("h1").css("text-shadow", shadow);

    var resulthex = `{
  font-size: ${shadowObj["range-font-size"] + shadowObj.units};
  text-shadow: ${shadow};
}`;
    $("#resulthex").val(resulthex);
    $("#resultrgb").val($("h1").css("text-shadow"));
  });

  $("#mode-btn").on("click", function () {
    if ($(this).attr("mode") == "day") {
      $(this).attr("mode", "night");
      $(this).text("night mode");
      $("body").css({
        "background-color": "#333333",
      });
      $("h1").css({
        color: "#ffffff",
      });
    } else {
      $(this).attr("mode", "day");
      $(this).text("day mode");
      $("body").css({
        "background-color": "#dddddd",
      });
      $("h1").css({
        color: "#000000",
      });
      // alert("day");
    }
  });
});
