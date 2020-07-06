const embed_srcs = {
  "About" : "doc/faq.md",
  "Resume" : "doc/Christopher_Maxwell_Resume_Spring_2020_-_Revised.pdf",
  "Projects" : "https://github.com/xerotolerance",
  "Contact" : "doc/TOC.md"
};
const nav_colors = {
  "About" : "#386641",
  "Resume" : "#6A994E",
  "Projects" : "#8AA29E",
  "Contact" : "#BC4749"
};

let lastNavTab = null;

const leftPanel = $('#left-panel');
const middlePanel = $("#middle-panel");
const rightPanel = $('#right-panel');
const displayArea = $('#embedded-display-area');

const navItemDefaultColor = $('.nav-item:first-child').css("background-color");
const leftPanelDefaultMargin = leftPanel.css("margin");
const middlePanelDefaultMargin = middlePanel.css("margin");

function displayInCenterPanel(entry) {
  // console.log(displayArea.width());
  let src = embed_srcs[entry];
  if (lastNavTab === entry)
    return;

  if (displayArea.width() > 0) {
    displayArea.empty();

    displayArea.addClass("displayArea_slide-out")
      .removeClass("displayArea_slide-in");


    setTimeout(()=>{
      displayArea.html(
        "<embed src='" + src + "' height='100%' width='100%'>"
      );
      displayArea.addClass("displayArea_slide-in").removeClass("displayArea_slide-out");
      }, 1000
    );
  } else{
    displayArea.removeClass("displayArea_slide-out");
    displayArea.addClass("displayArea_slide-in");
  }

  if (entry === 'About') {
    leftPanel.css("flex", "0 16.5%");
    rightPanel.removeClass("right-panel_slide-out").addClass("right-panel_slide-in");
  }
  else{
    if (rightPanel.width() > 0)
      rightPanel.addClass("right-panel_slide-out");
    rightPanel.removeClass("right-panel_slide-in");
  }
  // console.log(leftPanel.css("flex"));
/*  if (lastNavTab === entry)
    return;*/



  if (lastNavTab) {
    setTimeout(
      () => displayArea.html(
        "<embed src='" + src + "' height='100%' width='100%'>"
      ), 1000);
  }
  else {
    displayArea.html(
      "<embed src='" + src + "' height='100%' width='100%'>"
    )
  }
  colorShift(entry);
  displayArea.addClass("displayArea_slide-in");
  leftPanel.css("margin", "0 0 0 .5%");
  middlePanel.css("margin", "0 .5% 0 0");
}
function colorShift(entry) {
  let lastUsedColor = nav_colors[entry];
  $('#'+lastNavTab).css("background-color", navItemDefaultColor);
  $("#"+entry).css("background-color", lastUsedColor);
  setTimeout(()=>{displayArea.css("backgroundColor", lastUsedColor);},1000);
  displayArea.css("backgroundColor", lastUsedColor);
  lastNavTab = entry;
}
function hideMenuPopup() {
  $("#"+lastNavTab).css({"background-color":navItemDefaultColor, "border-radius":"0"});
  leftPanel.css({"margin":leftPanelDefaultMargin, "flex":"0 16.5%"});
  middlePanel.css("margin" , middlePanelDefaultMargin);


  if (rightPanel.width() > 0)
    rightPanel.addClass("right-panel_slide-out");
  rightPanel.removeClass("right-panel_slide-in");

  // displayArea.empty();
  displayArea.removeClass("displayArea_slide-in");
  displayArea.addClass("displayArea_slide-out");

  // middlePanel.empty();
  lastNavTab = null;
}

function counter () {
  $('#left-panel_bottom-buffer').text(displayArea.queue("fx").length);
  setTimeout(counter, 300);
}

function main() {
  for (let entry in embed_srcs){
    let nav_item = $("#"+entry);
    nav_item.mouseover( ()=>{
      displayInCenterPanel(entry);
      nav_item.css("border-radius", "7.5% 0 0 7.5%");
    });
    nav_item.mouseleave( () => {
      nav_item.css("border-radius", "0");
    });
  }

  displayArea.mouseover( () => {
    if (lastNavTab === "About"){
      // leftPanel.css("flex", ".75 0 .25");
      rightPanel.css({"flex": "1 1 0", "width": "inherit"});
    }
    colorShift(lastNavTab);
    $('#'+lastNavTab).css("border-radius", "7.5% 0 0 7.5%");
  });


  $('.buffer').each((idx, buffer) => {
    buffer.onmouseover = hideMenuPopup;
    console.log();
  });
  counter();
}

main();
