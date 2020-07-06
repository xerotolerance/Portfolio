let sectors = $(".sector"),
  flexBox = $(".flex-box"),
  centerSector = $("#email-sector");

function positionCenterSector() {
  centerSector.css({
    "left": (flexBox.width() - centerSector.width()) / 2,
    "bottom": (flexBox.height() + centerSector.height()) / 2,
    "border-radius": "100%"
  });
}
function animateMenu() {
  sectors.each(function () {
    $(this).hover(function () {
      $(this).parent().css({"backgroundColor": "white"});
      if ($(this).attr("id")===centerSector.attr("id"))
        $(this).css({"border-radius": "100%"/*, "z-index": "9999"*/});
      else
        $(this).css({"border-radius": "10%", /*"z-index": "9999"*/});
      sectors.each((idx, curr) => {
        let currItem = $("#" + curr.id);
        if (currItem.attr("id") !== $(this).attr("id"))
          currItem.css({"filter": "blur(10px)"});
      });
      console.log()
    }, function () {
      if ($(this).attr("id")===centerSector.attr("id"))
        $(this).css({"border-radius": "100%", "z-index": "0"});
      else
        $(this).css({"border-radius": "inherit", "z-index": "0"});
      $(this).parent().css({"backgroundColor": "inherit"});
      sectors.each((idx, curr) => {
        let currItem = $("#" + curr.id);
        currItem.css({"filter": "blur(0)"});
      });
    });
  });
  $(window).resize(positionCenterSector);
}

positionCenterSector();
animateMenu();
