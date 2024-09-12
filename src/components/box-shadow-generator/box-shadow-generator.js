var shadowObj = {
  units: "px",
  "bsg_range-offset-X": $("#bsg_range-offset-X").val(),
  "bsg_range-offset-Y": $("#bsg_range-offset-Y").val(),
  "bsg_range-blur": $("#bsg_range-blur").val(),
  "bsg_range-spread": $("#bsg_range-spread").val(),
  bsg_colorpick: $("#bsg_colorpick").val(),
  "bsg_range-opacity": $("#bsg_range-opacity").val(),
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

function getBoxShadow(units, array, color) {
  let shadow = "";
  for (let i = 0; i < array.length; i++) {
    shadow = shadow + array[i] + units + " ";
  }
  shadow = shadow + color;
  return shadow;
}

function changeTextShadow() {

  var shadowhex = getBoxShadow(
    shadowObj.units,
    [
      shadowObj["bsg_range-offset-X"],
      shadowObj["bsg_range-offset-Y"],
      shadowObj["bsg_range-blur"],
      shadowObj["bsg_range-spread"],
    ],
    getColorhex(shadowObj["bsg_colorpick"], shadowObj["bsg_range-opacity"])
  );
  var shadowrgb = getBoxShadow(
    shadowObj.units,
    [
      shadowObj["bsg_range-offset-X"],
      shadowObj["bsg_range-offset-Y"],
      shadowObj["bsg_range-blur"],
      shadowObj["bsg_range-spread"],
    ],
    getColorrgb(shadowObj["bsg_colorpick"], shadowObj["bsg_range-opacity"])
  );


  $(".bsg_title").css("box-shadow", shadowhex);

  var resulthex = `{\n  box-shadow: ${shadowhex};\n}`;
  var resultrgb = `{\n  box-shadow: ${shadowrgb};\n}`;

  $("#bsg_resulthex").val(resulthex);
  $("#bsg_resultrgb").val(resultrgb);
}

changeTextShadow();

$(".range, .colorpick").on("input", function () {
  shadowObj[$(this).attr("id")] = $("#" + $(this).attr("id")).val();
  $(this).next().children(":first").text($(this).val());
  changeTextShadow();
});
