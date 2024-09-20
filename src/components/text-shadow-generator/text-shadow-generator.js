var shadowObj = {};
function changeShadowObj() {
  shadowObj = {
    units: "px",
    count: $(".tsg_shadow-card").length,
    "tsg_range-font-size": $("#tsg_range-font-size").val(),
    "tsg_colorpick-text": $("#tsg_colorpick-text").val(),
  };
  for (let i = 1; i <= shadowObj.count; i++) {
    shadowObj["tsg_range-offset-X" + i] = $(`#tsg_range-offset-X${i}`).val();
    shadowObj["tsg_range-offset-Y" + i] = $(`#tsg_range-offset-Y${i}`).val();
    shadowObj["tsg_range-blur" + i] = $(`#tsg_range-blur${i}`).val();
    shadowObj["tsg_colorpick" + i] = $(`#tsg_colorpick${i}`).val();
    shadowObj["tsg_range-opacity" + i] = $(`#tsg_range-opacity${i}`).val();
  }
}
changeShadowObj();

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
    "rgb(" +
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
function getBoxShadow(color) {
  let shadow = "";
  for (let i = 1; i <= shadowObj.count; i++) {
    shadow =
      shadow +
      shadowObj["tsg_range-offset-X" + i] +
      shadowObj.units +
      " " +
      shadowObj["tsg_range-offset-Y" + i] +
      shadowObj.units +
      " " +
      shadowObj["tsg_range-blur" + i] +
      shadowObj.units +
      " " +
      (color === "HEX"
        ? getColorhex(
            shadowObj["tsg_colorpick" + i],
            shadowObj["tsg_range-opacity" + i]
          )
        : getColorrgb(
            shadowObj["tsg_colorpick" + i],
            shadowObj["tsg_range-opacity" + i]
          )) +
      ", ";
  }
  shadow = shadow.slice(0, -2);
  return shadow;
}

function changeBoxShadow() {
  var shadowhex = getBoxShadow("HEX");
  var shadowrgb = getBoxShadow("RGB");

  $(".tsg_title").css("font-size", shadowObj["tsg_range-font-size"] + shadowObj.units);
  $(".tsg_title").css("color", shadowObj["tsg_colorpick-text"]);
  $(".tsg_title").css("text-shadow", shadowhex);

  var resulthex = `{\n  text-shadow: ${shadowhex};\n}`;
  var resultrgb = `{\n  text-shadow: ${shadowrgb};\n}`;

  $("#tsg_resulthex").val(resulthex);
  $("#tsg_resultrgb").val(resultrgb);
}
changeBoxShadow();

$(document).on("input", ".range, .colorpick", function () {
  shadowObj[$(this).attr("id")] = $("#" + $(this).attr("id")).val();
  $(this).next().children(":first").text($(this).val());
  changeBoxShadow();
});

$(document).on("click", ".tsg_add-btn", function () {
  $(".tsg_result-card").before(
    $(this).parent().parent().parent().parent().clone()
  );
  reassignID();
  changeShadowObj();
  changeBoxShadow();
});
$(document).on("click", ".tsg_delete-btn", function () {
  $(this).parent().parent().parent().parent().remove();
  reassignID();
  changeShadowObj();
  changeBoxShadow();
});

function reassignID() {
  $(".tsg_shadow-card").each(function (index) {
    index++;
    $(this)
      .find(".card-header")
      .text("Shadow " + index);
    $(this)
      .find(".range-offset-X")
      .attr("id", "tsg_range-offset-X" + index)
      .attr("title", "#tsg_range-offset-X" + index);
    $(this)
      .find(".range-offset-Y")
      .attr("id", "tsg_range-offset-Y" + index)
      .attr("title", "#tsg_range-offset-Y" + index);
    $(this)
      .find(".range-blur")
      .attr("id", "tsg_range-blur" + index)
      .attr("title", "#tsg_range-blur" + index);
    $(this)
      .find(".colorpick")
      .attr("id", "tsg_colorpick" + index)
      .attr("title", "#tsg_colorpick" + index);
    $(this)
      .find(".range-opacity")
      .attr("id", "tsg_range-opacity" + index)
      .attr("title", "#tsg_range-opacity" + index);
    $(this)
      .find(".add-btn")
      .attr("id", "tsg_add-shadow" + index)
      .attr("title", "tsg_add-shadow" + index);
    $(this)
      .find(".delete-btn")
      .attr("id", "tsg_delete-shadow" + index)
      .attr("title", "tsg_delete-shadow" + index);
  });
}

// var shadowObj = {
//   units: "px",
//   "tsg_range-font-size": $("#tsg_range-font-size").val(),
//   "tsg_range-offset-X": $("#tsg_range-offset-X").val(),
//   "tsg_range-offset-Y": $("#tsg_range-offset-Y").val(),
//   "tsg_range-blur": $("#tsg_range-blur").val(),
//   tsg_colorpick: $("#tsg_colorpick").val(),
//   "tsg_range-opacity": $("#tsg_range-opacity").val(),
// };
// function getColorhex(color, opacity) {
//   let colorhex =
//     color.toUpperCase() +
//     Math.floor(opacity * 255)
//       .toString(16)
//       .toUpperCase();
//   return colorhex;
// }

// function getColorrgb(color, opacity) {
//   let colorrgb =
//     " rgb(" +
//     parseInt(color.slice(1, 3), 16) +
//     ", " +
//     parseInt(color.slice(3, 5), 16) +
//     ", " +
//     parseInt(color.slice(5, 7), 16) +
//     ", " +
//     opacity +
//     ")";
//   return colorrgb;
// }

// function getShadow(units, offsetX, offsetY, blur, color) {
//   let shadow =
//     offsetX + units + " " + offsetY + units + " " + blur + units + " " + color;
//   return shadow;
// }

// function changeTextShadow() {
//   var shadowhex = getShadow(
//     shadowObj.units,
//     shadowObj["tsg_range-offset-X"],
//     shadowObj["tsg_range-offset-Y"],
//     shadowObj["tsg_range-blur"],
//     getColorhex(shadowObj["tsg_colorpick"], shadowObj["tsg_range-opacity"])
//   );
//   var shadowrgb = getShadow(
//     shadowObj.units,
//     shadowObj["tsg_range-offset-X"],
//     shadowObj["tsg_range-offset-Y"],
//     shadowObj["tsg_range-blur"],
//     getColorrgb(shadowObj["tsg_colorpick"], shadowObj["tsg_range-opacity"])
//   );

//   $(".tsg_title").css("font-size", shadowObj["tsg_range-font-size"] + shadowObj.units);
//   $(".tsg_title").css("text-shadow", shadowhex);

//   var resulthex = `{\n  font-size: ${
//     shadowObj["tsg_range-font-size"] + shadowObj.units
//   };\n  text-shadow: ${shadowhex};\n}`;
//   var resultrgb = `{\n  font-size: ${
//     shadowObj["tsg_range-font-size"] + shadowObj.units
//   };\n  text-shadow: ${shadowrgb};\n}`;

//   $("#tsg_resulthex").val(resulthex);
//   $("#tsg_resultrgb").val(resultrgb);
// }

// changeTextShadow();

// $(".range, #tsg_colorpick").on("input", function () {
//   shadowObj[$(this).attr("id")] = $("#" + $(this).attr("id")).val();
//   $(this).next().children(":first").text($(this).val());
//   changeTextShadow();
// });
