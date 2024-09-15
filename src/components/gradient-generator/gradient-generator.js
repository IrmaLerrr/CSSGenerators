var gradientObj = {};
function changeGradientObj() {
  gradientObj = {
    count: $(".color-card").length,
    gg_radio: $("#gg_radio").val(),
    "gg_range-angle": $("#gg_range-angle").val(),
  };
  for (let i = 1; i <= gradientObj.count; i++) {
    gradientObj["gg_colorpick" + i] = $(`#gg_colorpick${i}`).val();
    gradientObj["gg_range-opacity" + i] = $(`#gg_range-opacity${i}`).val();
    gradientObj["gg_range-position" + i] = $(`#gg_range-position${i}`).val();
  }
}

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

function getGradient(color) {
  let gradient = "";

  for (let i = 1; i <= gradientObj.count; i++) {
    gradient =
      gradient + (color === "HEX"
        ? getColorhex(
            gradientObj["gg_colorpick" + i],
            gradientObj["gg_range-opacity" + i]
          )
        : getColorrgb(
            gradientObj["gg_colorpick" + i],
            gradientObj["gg_range-opacity" + i]
          )) +
          " " +
          gradientObj["gg_range-position" + i] +
          "%, ";
  }
  gradient =
    gradientObj.gg_radio +
    "(" +
    gradientObj["gg_range-angle"] +
    "deg, " +
    gradient.slice(0, -2) +
    ")";
  return gradient;
}

function changeGradient() {

  var gradienthex = getGradient('HEX');
  var gradientrgb = getGradient('RGB');

  $(".gg_title").css("background", gradienthex);
  $(".gg_title").css("background", gradientrgb);

  var resulthex = `{\n  background: ${gradienthex};\n}`;
  var resultrgb = `{\n  background: ${gradientrgb};\n}`;

  $("#gg_resulthex").val(resulthex);
  $("#gg_resultrgb").val(resultrgb);
}

changeGradientObj();
changeGradient();

$(document).on("input", ".range, .colorpick, .radio", function () {
  gradientObj[$(this).attr("id")] = $(this).val();
  $(this).next().children(":first").text($(this).val());
  changeGradient();
});

$(document).on("click", ".add-btn", function () {
  $(".result-card").before($(this).parent().parent().parent().parent().clone());
  reassignID();
  changeGradientObj();
  changeGradient();
});
$(document).on("click", ".delete-btn", function () {
  $(this).parent().parent().parent().parent().remove();
  reassignID();
  changeGradientObj();
  changeGradient();
});

function reassignID() {
  $(".color-card").each(function (index) {
    index++;
    $(this)
      .find(".card-header")
      .text("Color " + index);
    $(this)
      .find(".colorpick")
      .attr("id", "gg_colorpick" + index)
      .attr("title", "#gg_colorpick" + index);
    $(this)
      .find(".range-opacity")
      .attr("id", "gg_range-opacity" + index)
      .attr("title", "#gg_range-opacity" + index);
    $(this)
      .find(".range-position")
      .attr("id", "gg_range-position" + index)
      .attr("title", "#gg_range-position" + index);
    $(this)
      .find(".add-btn")
      .attr("id", "add-color" + index)
      .attr("title", "add-color" + index);
  });
}
