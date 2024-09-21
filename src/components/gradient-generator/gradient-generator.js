var gradientObj = {};
function changeGradientObj() {
  gradientObj = {
    count: $(".color-card").length,
    gg_radio_type: $("input[name='gg_radio_type']:checked").val(),
    gg_radio_position: $("input[name='gg_radio_position']:checked").val(),
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
  switch (gradientObj.gg_radio_position) {
    case "True":
      for (let i = 1; i <= gradientObj.count; i++) {
        gradient =
          gradient +
          (color === "HEX"
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
      break;
    case "False":
      for (let i = 1; i <= gradientObj.count; i++) {
        gradient =
          gradient +
          (color === "HEX"
            ? getColorhex(
                gradientObj["gg_colorpick" + i],
                gradientObj["gg_range-opacity" + i]
              )
            : getColorrgb(
                gradientObj["gg_colorpick" + i],
                gradientObj["gg_range-opacity" + i]
              )) +
          ", ";
      }
      break;
  }
  switch (gradientObj.gg_radio_type) {
    case "linear-gradient":
      gradient =
        gradientObj.gg_radio_type +
        "(" +
        gradientObj["gg_range-angle"] +
        "deg, " +
        gradient.slice(0, -2) +
        ")";
      break;
    case "radial-gradient":
      gradient = gradientObj.gg_radio_type + "(" + gradient.slice(0, -2) + ")";
      break;
  }

  return gradient;
}

function changeGradient() {
  var gradienthex = getGradient("HEX");
  var gradientrgb = getGradient("RGB");

  $(".gg_title").css("background", gradienthex);
  $(".gg_title").css("background", gradientrgb);

  var resulthex = `{\n  background: ${gradienthex};\n}`;
  var resultrgb = `{\n  background: ${gradientrgb};\n}`;

  $("#gg_resulthex").val(resulthex);
  $("#gg_resultrgb").val(resultrgb);
}

changeGradientObj();
changeGradient();

$(document).on("input", ".range, .colorpick", function () {
  gradientObj[$(this).attr("id")] = $(this).val();
  $(this).next().children(":first").text($(this).val());
  changeGradient();
});

$(document).on("input", "input[name='gg_radio_type']", function () {
  switch ($(this).val()) {
    case "linear-gradient":
      $("#gg_range-angle").parent().parent().css("display", "block");
      break;
    case "radial-gradient":
      $("#gg_range-angle").parent().parent().css("display", "none");
      break;
  }
  gradientObj.gg_radio_type = $("input[name='gg_radio_type']:checked").val();
  changeGradient();
});
$(document).on("input", "input[name='gg_radio_position']", function () {
  switch ($(this).val()) {
    case "True":
      $(".range-position").parent().parent().css("display", "block");
      $(".range-position").each(function (index) {
        // index++;
        $(this).val(100 / ($(".range-position").length - 1) * index);
        gradientObj["gg_range-position" + index] = $(
          `#gg_range-position${index}`
        ).val();
        $(this).next().children(":first").text($(this).val());
      });
      break;
    case "False":
      $(".range-position").parent().parent().css("display", "none");
      break;
  }
  gradientObj.gg_radio_position = $(
    "input[name='gg_radio_position']:checked"
  ).val();
  changeGradient();
});

$(document).on("click", ".add-btn", function () {
  $(".result-card").before($(this).parent().parent().parent().parent().clone());
  reassignID();
  changeGradientObj();
  changeGradient();
});
$(document).on("click", ".delete-btn", function () {
  if ($(".color-card").length > 2){
    $(this).parent().parent().parent().parent().remove();
    reassignID();
    changeShadowObj();
    changeBoxShadow();
  }
  else{
    alert("To create a gradient you need at least two colors")
  }
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
