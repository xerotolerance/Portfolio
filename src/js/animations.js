const embed_srcs = {
  "About" : "html/about.html",
  "Resume" : "doc/Christopher_Maxwell_Resume_Spring_2020_-_Revised.pdf",
  "Projects" : "html/projects.html",
  "Contact" : "html/contact.html"
};
const nav_colors = {
  "About" : "#022F40", /*"#386641",*/
  "Resume" : "#38AECC", /*"#6A994E",*/
  "Projects" : "#0090C1", /*"#8AA29E",*/
  "Contact" : "#046E8F", /*"#152614"*/
};
const portrait_dir = "../img/Portraits";
const portrait_srcs = [
  "IMG_4451.jpg",
  "IMG_2224.jpg"
];
const navIemDefaultColor = $('.nav-item:first-child').css("backgroundColor");
const displayArea = $("#embedded-display-area");
let hiddenMiddlePanelItem = null;
let previousNavItem = null;

const defaultLeftPanelMargin = $("#left-panel").css("margin");
const defaultMiddlePanelMargin = $("#middle-panel").css("margin");

function changeNavColor(navItem, newColor= nav_colors[navItem.attr("id")]) {
  navItem.css("backgroundColor", newColor);
  displayArea.css("backgroundColor", newColor);
}
let slideshow = null;
let slideArea = $("#slide-area");
let prev_slide = null;

function advanceSlide() {
  let slide = $(".slideshow_slide:first");
  slide.animate({bottom: "100%"}, {duration: "slow"})
    /*.queue((next) => {
      prev_slide = slide.detach();
      console.log();
      next();
  })*/;
   //let prev_slide = slide.detach();
  console.log();
  // slideArea.append(prev_slide);
  console.log();
}
function stopSlideshow() {
  clearInterval(slideshow);
  slideArea.empty();
}

function unhidePanelMargins() {
  $("#left-panel").stop(true,true).animate({"margin": defaultLeftPanelMargin});
  $("#middle-panel").stop(true,true).animate({"margin": defaultMiddlePanelMargin});
}
function hidePanelMargins() {
  $("#left-panel").stop(true,true).animate({"margin-right": 0});
  $("#middle-panel").stop(true,true).animate({"margin-left": 0});
}
function embedDocument(src) {
  // let mimeType = src.endsWith(".pdf") ? "application/pdf" : "text/plain";
  if (src.endsWith(".pdf"))
    displayArea.html(
      "<embed src='"+src+"' height='100%' width='100%' style='object-fit: contain'>"
    );
  else
    displayArea.html(
      "<iframe sandbox='allow-scripts allow-popups' src='"+src+"' height='100%' width='100%' style='object-fit: contain'>"
    );
}
function openRightPanel() {
  let portrait_path, slideHTML, image_url;
  $("#right-panel").stop(true, true).animate({flexGrow: 1});
  for (let portrait_filename of portrait_srcs){
    portrait_path = portrait_dir+"/"+portrait_filename;
    image_url = 'url("' + portrait_path + '")';
    slideHTML = "<div class='slideshow_slide' style='background-image:"+ image_url +"'></div>";
    console.log(slideHTML);
    slideArea.append(slideHTML);
  }
  slideshow = setInterval(advanceSlide, 6000);
  //advanceSlide();
}

function toggleDisplayArea() {
  if (hiddenMiddlePanelItem){
    $("#middle-panel").append(hiddenMiddlePanelItem)
  }
  hiddenMiddlePanelItem = $("#middle-panel").children().first().detach();
  console.log(hiddenMiddlePanelItem.attr("id"));
  console.log()
}

function enableNavbar(){
  hiddenMiddlePanelItem = displayArea.detach();
  displayArea.hover(()=>{
    hidePanelMargins();
    if ( previousNavItem && previousNavItem.attr("id") === "About")
      $("#right-panel").stop(true, true).css({flexGrow: 1});
  }, null);
  $(".nav-item").each(function () {
    $(this).hover(function () {
      // toggleDisplayArea();
      if (previousNavItem){
        if (previousNavItem.attr("id") === $(this).attr("id")){
          /*console.log("Revisited: " + previousNavItem.attr("id"));*/
          return;
        }else if (previousNavItem.attr("id") === "About") {
          $("#right-panel").stop(true, true).animate(
            {flexGrow: .00001},
            {done: function () {$(this).css("flex-grow", 0); stopSlideshow();}}
          );
        }
        /*console.log("Visiting: \"" + $(this).attr("id") + "\"\tPrevious Tab was: \"" + (previousNavItem ? previousNavItem.attr("id") : "null") + "\"");*/
      } else toggleDisplayArea();

      let newColor = nav_colors[$(this).attr("id")];
      if (previousNavItem)
        previousNavItem.css("backgroundColor", navIemDefaultColor);
      $(this).css("backgroundColor", newColor).queue((next)=>{hidePanelMargins(); next();});


      if (!previousNavItem){
        displayArea
          .stop(true, true)
          .animate({width: "100%"},{
            duration: "medium",
            start: ()=> {
              displayArea.css("backgroundColor", newColor);
              if ($(this).attr("id")==="About")
                openRightPanel();
            },
            done: () => embedDocument(embed_srcs[$(this).attr("id")])
          });
      } else{
        displayArea
          .stop(true, true)
          .animate({width: "0"},{start:function(){$(this).empty()}})
          .animate({width: "100%"},{
            duration: "fast",
            start: () => {
              displayArea.css("backgroundColor", newColor);
              if ($(this).attr("id")==="About")
                openRightPanel();
            },
            done: () => embedDocument(embed_srcs[$(this).attr("id")])
          });
      }
    }, () => previousNavItem = $(this));
  });
  $(".buffer").each( function () {
    $(this).stop(true,true).hover(function () {
      if (!previousNavItem)
        return;
      $("#right-panel").stop(true, true).animate(
        {flexGrow: .00001},
        {done: function () {$(this).css("flex-grow", 0); stopSlideshow();}}
      );
      previousNavItem.css("backgroundColor", navIemDefaultColor);
      displayArea.stop(true, true).animate({width: "0"}, {
        duration: "slow",
        start: ()=>{unhidePanelMargins(); toggleDisplayArea();},
        done: () => {
          $(this).css("backgroundColor", navIemDefaultColor);
        }
      });
    }, function () {
      displayArea.empty();
      previousNavItem = null;});
  });
}


enableNavbar();

