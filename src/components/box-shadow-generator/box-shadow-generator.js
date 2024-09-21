var shadowObj = {};
function changeShadowObj() {
  shadowObj = {
    units: "px",
    count: $(".shadow-card").length,
    "bsg_range-font-size": $("#bsg_range-font-size").val(),
    "bsg_colorpick-box": $("#bsg_colorpick-box").val(),
    "bsg_colorpick-text": $("#bsg_colorpick-text").val(),
  };
  for (let i = 1; i <= shadowObj.count; i++) {
    shadowObj["bsg_radio_type" + i] = $(`input[name='bsg_radio_type${i}']:checked`).val();
    shadowObj["bsg_range-offset-X" + i] = $(`#bsg_range-offset-X${i}`).val();
    shadowObj["bsg_range-offset-Y" + i] = $(`#bsg_range-offset-Y${i}`).val();
    shadowObj["bsg_range-blur" + i] = $(`#bsg_range-blur${i}`).val();
    shadowObj["bsg_range-spread" + i] = $(`#bsg_range-spread${i}`).val();
    shadowObj["bsg_colorpick" + i] = $(`#bsg_colorpick${i}`).val();
    shadowObj["bsg_range-opacity" + i] = $(`#bsg_range-opacity${i}`).val();
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
      shadowObj["bsg_range-offset-X" + i] +
      shadowObj.units +
      " " +
      shadowObj["bsg_range-offset-Y" + i] +
      shadowObj.units +
      " " +
      shadowObj["bsg_range-blur" + i] +
      shadowObj.units +
      " " +
      shadowObj["bsg_range-spread" + i] +
      shadowObj.units +
      " " +
      (color === "HEX"
        ? getColorhex(
            shadowObj["bsg_colorpick" + i],
            shadowObj["bsg_range-opacity" + i]
          )
        : getColorrgb(
            shadowObj["bsg_colorpick" + i],
            shadowObj["bsg_range-opacity" + i]
          )) +
      (shadowObj["bsg_radio_type" + i] === "True" ? " inset" : "") +
      ", ";
  }
  shadow = shadow.slice(0, -2);
  return shadow;
}

function changeBoxShadow() {
  var shadowhex = getBoxShadow("HEX");
  var shadowrgb = getBoxShadow("RGB");

  $(".bsg_title").css(
    "font-size",
    shadowObj["bsg_range-font-size"] + shadowObj.units
  );
  $(".bsg_title").css("background-color", shadowObj["bsg_colorpick-box"]);
  $(".bsg_title").css("color", shadowObj["bsg_colorpick-text"]);
  $(".bsg_title").css("box-shadow", shadowhex);

  var resulthex = `{\n  box-shadow: ${shadowhex};\n}`;
  var resultrgb = `{\n  box-shadow: ${shadowrgb};\n}`;

  $("#bsg_resulthex").val(resulthex);
  $("#bsg_resultrgb").val(resultrgb);
}
changeBoxShadow();

$(document).on("input", ".range, .colorpick", function () {
  shadowObj[$(this).attr("id")] = $("#" + $(this).attr("id")).val();
  $(this).next().children(":first").text($(this).val());
  changeBoxShadow();
});
$(document).on("input", ".radio", function () {
  for (let i = 1; i <= shadowObj.count; i++) {
    shadowObj["bsg_radio_type" + i] = $(`input[name='bsg_radio_type${i}']:checked`).val();
    // alert()
  }
  changeBoxShadow();
});

$(document).on("click", ".bsg_add-btn", function () {
  $(".bsg_result-card").before(
    $(this).parent().parent().parent().parent().clone()
  );
  reassignID();
  changeShadowObj();
  changeBoxShadow();
});
$(document).on("click", ".bsg_delete-btn", function () {
  if ($(".shadow-card").length > 1){
    $(this).parent().parent().parent().parent().remove();
    reassignID();
    changeShadowObj();
    changeBoxShadow();
  }
  else{
    alert("It is forbidden to delete a single card")
  }
});

function reassignID() {
  $(".shadow-card").each(function (index) {
    index++;
    $(this)
      .find(".card-header")
      .text("Shadow " + index);
    $(this)
      .find(".radio")
      .attr("name", "bsg_radio_type" + index)
      .attr("title", "bsg_radio_type" + index);
    $(this)
      .find(".radio[value='False']")
      .prop("checked", true);
    $(this)
      .find(".range-offset-X")
      .attr("id", "bsg_range-offset-X" + index)
      .attr("title", "#bsg_range-offset-X" + index);
    $(this)
      .find(".range-offset-Y")
      .attr("id", "bsg_range-offset-Y" + index)
      .attr("title", "#bsg_range-offset-Y" + index);
    $(this)
      .find(".range-blur")
      .attr("id", "bsg_range-blur" + index)
      .attr("title", "#bsg_range-blur" + index);
    $(this)
      .find(".range-spread")
      .attr("id", "bsg_range-spread" + index)
      .attr("title", "#bsg_range-spread" + index);
    $(this)
      .find(".colorpick")
      .attr("id", "bsg_colorpick" + index)
      .attr("title", "#bsg_colorpick" + index);
    $(this)
      .find(".range-opacity")
      .attr("id", "bsg_range-opacity" + index)
      .attr("title", "#bsg_range-opacity" + index);
    $(this)
      .find(".bsg_add-btn")
      .attr("id", "bsg_add-shadow" + index)
      .attr("title", "bsg_add-shadow" + index);
    $(this)
      .find(".bsg_delete-btn")
      .attr("id", "bsg_delete-shadow" + index)
      .attr("title", "bsg_delete-shadow" + index);
  });
}
