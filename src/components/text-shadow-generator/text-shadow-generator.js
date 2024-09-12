var shadowObj = {
  units: "px",
  "tsg_range-font-size": $("#tsg_range-font-size").val(),
  "tsg_range-offset-X": $("#tsg_range-offset-X").val(),
  "tsg_range-offset-Y": $("#tsg_range-offset-Y").val(),
  "tsg_range-blur": $("#tsg_range-blur").val(),
  tsg_colorpick: $("#tsg_colorpick").val(),
  "tsg_range-opacity": $("#tsg_range-opacity").val(),
};
function getColorhex(color, opacity) {
  let colorhex =
    color.toUpperCase() +
    Math.floor(opacity * 255)
      .toString(16)
      .toUpperCase();
  return colorhex;
}

function getColorrgb(color, opacity) {
  let colorrgb =
    " rgb(" +
    parseInt(color.slice(1, 3), 16) +
    ", " +
    parseInt(color.slice(3, 5), 16) +
    ", " +
    parseInt(color.slice(5, 7), 16) +
    ", " +
    opacity +
    ")";
  return colorrgb;
}

function getShadow(units, offsetX, offsetY, blur, color) {
  let shadow =
    offsetX + units + " " + offsetY + units + " " + blur + units + " " + color;
  return shadow;
}

function changeTextShadow() {
  var shadowhex = getShadow(
    shadowObj.units,
    shadowObj["tsg_range-offset-X"],
    shadowObj["tsg_range-offset-Y"],
    shadowObj["tsg_range-blur"],
    getColorhex(shadowObj["tsg_colorpick"], shadowObj["tsg_range-opacity"])
  );
  var shadowrgb = getShadow(
    shadowObj.units,
    shadowObj["tsg_range-offset-X"],
    shadowObj["tsg_range-offset-Y"],
    shadowObj["tsg_range-blur"],
    getColorrgb(shadowObj["tsg_colorpick"], shadowObj["tsg_range-opacity"])
  );

  $(".tsg_title").css("font-size", shadowObj["tsg_range-font-size"] + shadowObj.units);
  $(".tsg_title").css("text-shadow", shadowhex);

  var resulthex = `{\n  font-size: ${
    shadowObj["tsg_range-font-size"] + shadowObj.units
  };\n  text-shadow: ${shadowhex};\n}`;
  var resultrgb = `{\n  font-size: ${
    shadowObj["tsg_range-font-size"] + shadowObj.units
  };\n  text-shadow: ${shadowrgb};\n}`;

  $("#tsg_resulthex").val(resulthex);
  $("#tsg_resultrgb").val(resultrgb);
}

changeTextShadow();

$(".range, #tsg_colorpick").on("input", function () {
  shadowObj[$(this).attr("id")] = $("#" + $(this).attr("id")).val();
  $(this).next().children(":first").text($(this).val());
  changeTextShadow();
});
