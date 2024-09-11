var shadowObj = {
  units: "px",
  "range-font-size": $("#range-font-size").val(),
  "range-offset-X": $("#range-offset-X").val(),
  "range-offset-Y": $("#range-offset-Y").val(),
  "range-blur": $("#range-blur").val(),
  colorpick: $("#colorpick").val(),
  "range-opacity": $("#range-opacity").val(),
};

function changeShadow() {
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

  var resulthex = `{\n  font-size: ${
    shadowObj["range-font-size"] + shadowObj.units
  };\n  text-shadow: ${shadow};\n}`;
  var resultrgb = `{\n  font-size: ${
    shadowObj["range-font-size"] + shadowObj.units
  };\n  text-shadow: ${$("h1").css("text-shadow")};\n}`;

  $("#resulthex").val(resulthex);
  $("#resultrgb").val(resultrgb);
}

changeShadow();

$(".range, #colorpick").on("input", function () {
  shadowObj[$(this).attr("id")] = $("#" + $(this).attr("id")).val();
  $(this).next().children(":first").text($(this).val());
  changeShadow();
});
