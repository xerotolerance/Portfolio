const projectTableBody = $("#Project-Table>tbody");
const sorts = [
  {
    "sortName": "Last updated",
    "sortFunction": function sortProjectDataByLastUpdated(a, b){
      if (a.updated_at < b.updated_at)
        return -1;
      else if (a.updated_at === b.updated_at)
        return 0;
      else
        return 1;
    }
  },
  {
    "sortName": "Name",
    "sortFunction": function sortProjectDataByName(a,b) {
      if (a.name.toUpperCase() < b.name.toUpperCase())
        return -1;
      else if (a.name === b.name)
        return 0;
      else
        return 1;
    }
  },
];
let sortDescending, userSelectedOrder, projectDataArray;

function displayInTable(data) {
  projectTableBody.empty();
  console.log();
  for (let repo of data){
    if (repo.description === null)
      continue;
    projectTableBody.append(
      "<tr>" +
        "<td class='project-name'>" +
          "<a lang='en' target='_blank' href='"+repo.html_url+"'>" +
            "<div class='tooltip'><p>" + repo.name + "</p>" +
              "<span class='name tooltiptext'> Last updated: " + repo.updated_at + "</span>" +
            "</div>" +
          "</a>" +
        "</td>" +

        "<td class='project-description'>" +
          "<a lang='en' target='_blank' href='"+repo.html_url+"'>" +
            "<div class='tooltip'><p>" + (repo.description ? repo.description : "") + "</p>" +
              "<span class='name tooltiptext'> Last updated: " + repo.updated_at + "</span>" +
            "</div>" +
          "</a>" +
        "</td>" +
      "</tr>"
    );
  }
  projectTableBody.css("background", 'url("../svg/CJM Logo.svg") center no-repeat fixed');
}
function toggleSortCriteria(){
  let sortBy = sorts.pop();

  projectDataArray.sort(sortBy.sortFunction); //Always sorts into Ascending Order, must be adjusted accordingly
  if (userSelectedOrder){
    //DO NOT SWITCH ORDER; USER HAS CHOSEN TO KEEP CURRENT STATE
    if (sortDescending)
      projectDataArray.reverse(); //Adjust to maintain User-selected Desc Order

  }else{
    //If it's the First time the User is changing **any** sort settings
    // then select sort by Name, Asc (Alphabetical)
    $("a#sortOrder").text("Asc");
    userSelectedOrder = true;
  }
  displayInTable(projectDataArray);
  $("a#sortBy").text(sortBy.sortName);
  sorts.unshift(sortBy);
}
function toggleSortOrder(){
  sortDescending = !sortDescending;
  let order = sortDescending? "Desc" : "Asc";
  $("a#sortOrder").text(order);
  projectDataArray.reverse();
  displayInTable(projectDataArray);
}

function main() {
  projectDataArray = null;
  sortDescending = true;
  userSelectedOrder=false;
  let request = $.ajax({
    url: "https://api.github.com/users/xerotolerance/repos",
    accepts: "application/json",
    dataType: "json",
    data: {
      type: "owner",
      sort: "updated",
      direction: "desc"
    }
  }).done(data => {
    projectDataArray = data;
    displayInTable(projectDataArray);
  });

}

main();
