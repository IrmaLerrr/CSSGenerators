var gradientObj = {
  count: 2,
  gg_radio: $("#gg_radio").val(),
  "gg_range-angle": $("#gg_range-angle").val(),
};
for (let i = 1; i <= gradientObj.count; i++) {
  gradientObj["gg_colorpick" + i] = $(`#gg_colorpick${i}`).val();
  gradientObj["gg_range-opacity" + i] = $(`#gg_range-opacity${i}`).val();
  gradientObj["gg_range-position" + i] = $(`#gg_range-position${i}`).val();
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

function getGradient(type, angle, array) {
  let gradient = "";
  for (let i = 0; i < array.length; i += 2) {
    gradient = gradient + array[i] + " " + array[i + 1] + "%, ";
  }
  gradient = type + "(" + angle + "deg, " + gradient.slice(0,-2) + ")";
  return gradient;
}

function changeGradient() {

  var gradienthex = getGradient(
    gradientObj.gg_radio, 
    gradientObj["gg_range-angle"],
    [
      getColorhex(gradientObj["gg_colorpick1"],gradientObj["gg_range-opacity1"]), 
      gradientObj["gg_range-position1"],
      getColorhex(gradientObj["gg_colorpick2"],gradientObj["gg_range-opacity2"]), 
      gradientObj["gg_range-position2"]
    ]
  );

  var gradientrgb = getGradient(
    gradientObj.gg_radio, 
    gradientObj["gg_range-angle"],
    [
      getColorrgb(gradientObj["gg_colorpick1"],gradientObj["gg_range-opacity1"]), 
      gradientObj["gg_range-position1"],
      getColorrgb(gradientObj["gg_colorpick2"],gradientObj["gg_range-opacity2"]), 
      gradientObj["gg_range-position2"]
    ]
  );

  $(".gg_title").css("background", gradienthex);

  var resulthex = `{\n  background: ${gradienthex};\n}`;
  var resultrgb = `{\n  background: ${gradientrgb};\n}`;

  $("#gg_resulthex").val(resulthex);
  $("#gg_resultrgb").val(resultrgb);
}

changeGradient();

$(".range, .colorpick, .radio").on("input", function () {
  gradientObj[$(this).attr("id")] = $("#" + $(this).attr("id")).val();
  $(this).next().children(":first").text($(this).val());
  changeGradient();
  alert($(this).attr("id").val())
});

$(".add-btn").on("click", function () {
  // alert('hey')
  // var copy = $('.gg_section').html();
  // alert(copy)
  // $(this).parent().parent().parent().parent().clone().after('.result_card');
  $('.result_card').before($(this).parent().parent().parent().parent().clone())
// alert(copy) 
});

