var myDataRef = new Firebase('https://e-picks-purdue.firebaseio.com/'); // Firebase object used for everything else
var authData = myDataRef.getAuth();
if (authData) {
  $('#searchResult').addClass('hidden');
  $('#addTeam').addClass('hidden');
  $('#team-objects').addClass('hidden');
  $('#admin').removeClass('hidden');
  $('#splashscreen').addClass('hidden');
}

//this adds all the teams to the page on load
try {myDataRef.on('child_added', function(snapshot) {
  var team = snapshot.val();
    displayTeamInfo(team.team_abbrev, team.description, team.aoi, team.day, team.team_name, team.time, team.website, team.time_num);
}); }
catch(err) {
  alert("failed to load teams");
}

function submit(thing) { //add new group function


  var team_name = thing.parentElement.children[0].value;
  var team_abbrev = thing.parentElement.children[2].value;
  var website = thing.parentElement.children[4].value;
  var day = thing.parentElement.children[6].value;
  var time_num = thing.parentElement.children[8].value;
  switch(time_num){
    case "1":
      var time = "8:30 AM - 10:20 AM";
      break;
    case "2":
      var time = "10:30 AM - 12:20 PM";
      break;
    case "3":
      var time = "1:30 PM - 3:20 PM";
      break;
    case "4":
      var time = "3:30 PM - 5:20 PM";
      break;
    default:
      var time = "Other";
  }
  var aoi = thing.parentElement.children[10].value;
  var desc = thing.parentElement.children[13].value;
  /*  
  var day = $('#newDay').val();
  $('#newDay').val('Choose a Day');
  var desc = $('#newDesc').val();
  $('#newDesc').val(null);
  var team_abbrev = $('#newAc').val();
  $('#newAc').val(null);
  var team_name = $('#newName').val();
  $('#newName').val(null);
  var time_num = $('#newTime').val();
  $('#newTime').val('Choose a Time');
  switch(time_num){
    case "1":
      var time = "8:30 AM - 10:20 AM";
      break;
    case "2":
      var time = "10:30 AM - 12:20 PM";
      break;
    case "3":
      var time = "1:30 PM - 3:20 PM";
      break;
    case "4":
      var time = "3:30 PM - 5:20 PM";
      break;
    default:
      var time = "Something is messed up";
  }
  var website = $('#newWebsite').val();
  $('#newWebsite').val(null);
  var aoi = $('#newAOI').val();
  $('#newAOI').val('Choose an Area');
  */


  //alert(day + "  "+ desc + "  "+ team_abbrev + "  "+ team_name +  "  " + time + "  " + time_num + "  " + website);

  var tempRef = myDataRef.child(team_abbrev); //myDataRef is the Firebase object and this adds a new child titled with the description field.

  tempRef.update({ //update function makes changes to JSON fields
     aoi: aoi,
     day: day,
     description: desc,
     team_abbrev: team_abbrev,
     team_name: team_name,
     time: time,
     time_num: time_num,
     website: website
  });

  document.location.reload(true); 
}

function logout() {
myDataRef.unauth();
$('#admin').addClass("hidden");
document.location.reload(true);
}

function goodbye(abbrev) { //other function names might conflict with standard names
//alert(abbrev);

  var r = confirm("Are you sure?");
  if (r == true) {
    x = "Team Deleted";
  } else {
    return;
  }

  var delChild = myDataRef.child(abbrev);
  delChild.remove();
  document.location.reload(true);
}
//ToDo - make on edit show old data
function edit(abbrev) {
  //alert(abbrev);
  var ed = myDataRef.child(abbrev);

  var name, acc, web, day, time, aoi, desc;

  ed.once("value", function(snapshot) {
    name = snapshot.val().team_name;
    acc = snapshot.val().team_abbrev;
    web = snapshot.val().website; 
    day = snapshot.val().day;
    aoi = snapshot.val().aoi;
    desc = snapshot.val().description;
    time = snapshot.val().time;
  });

  $("#" + abbrev).remove();
  //The below should be replaced with the new edit form
  $("#" + abbrev + "outer").append($('<div>Team Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="TeamName" id="newName'+acc+'" value="'+name+'"><br>Team Acronym:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="TeamAcronym" id="newAc'+acc+'" value="'+acc+'"><br>Website:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="Website" value="'+web+'" id="newWebsite'+acc+'"><br>Day:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select id="newDay'+acc+'"><option>'+day+'</option><option value="Monday">Monday</option><option value="Tuesday">Tuesday</option><option value="Wednesday">Wednesday</option><option value="Thursday">Thursday</option><option value="Friday">Friday</option></select><br> Time:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select value="'+time+'" id = "newTime'+acc+'">  <option value="1">8:30 AM - 10:20 AM</option><option value="2">10:30 AM - 12:20 PM</option><option value="3">1:30 PM - 3:20 PM</option><option value="4">3:30 PM - 5:20 PM</option><option value="5">Other</option></select><br>Area of Impact:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select id = "newAOI'+acc+'"><option>'+aoi+'</option><option value="Access & Abilities">Access & Abilities</option><option value="Education & Outreach">Education & Outreach</option><option value="Environment">Environment</option><option value="Human Services">Human Services</option></select><br>Description:<br> <TEXTAREA NAME="Description" id="newDesc'+acc+'" ROWS=5 COLS=50 >'+desc+'</textarea><br><input type="submit" onclick="submit(this)" value="Submit">'));
}

function displayTeamInfo(abbrev, desc, aoi, day, name, time, website, time_num) {
  $("#searchResult").append('<div id="'+abbrev+'outer" class="hidden" style="background-color:#f0f0f0; outline-style: solid; padding-top: 5px; padding-right: 3px; padding-bottom: 5px; padding-left: 8px;"><div id="'+abbrev+'">  Team Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+ name + "<br>Team Acronym:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +  abbrev + "<br>Website:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + website +"<br>Day:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + day +"<br>Time:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + time +"<br>Area of Impact:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + aoi + '<br>Description:<br>' + desc + '<br><input type="submit" value="Edit" onclick="edit(\''+abbrev+'\')"><input type="submit" value="Delete" onclick="goodbye(\''+abbrev+'\')"></div></div>'); 
  return;
}; 

//will add all teams on page load since calls can't be made after load

$('document').ready(function() {
  $('.searchButton').click(searchGroups);
});

 function searchGroups() {
  event.preventDefault();
  $('#searchResult').contents().each(function() {
      try {$('#'+this.id).addClass('hidden'); } catch(err) {event.preventDefault()}
  });
  try {
    try { $('#searchResult').removeClass('hidden'); } catch(err) {event.preventDefault();};
    var searchRegex = new RegExp($('#wordSearch').val(), 'i');
    $('#searchResult').contents().each(function() {
      if (searchRegex.test(this.outerHTML)) {
        $("#"+this.id).removeClass('hidden');
      }
    });
  } catch(err) {
    event.preventDefault();
    $('#searchResult').contents().each(function() {
      try {$('#'+this.id).addClass('hidden'); } catch(err) {event.preventDefault()}
    });
    alert('invalid');
  }
}

function revealAdd() {
  $('#addTeam').removeClass('hidden');
}

function ShowAddNewTeam(){
  //input form appears and search box hidden after "add Team" button clicked
  $("#addTeam").removeClass('hidden');
  $("#search-box").addClass('hidden');
}

function submitNew(){
  //back to search/add step and input form hidden after "submit" button clicked
  $("#search-box").removeClass('hidden');
  $("#addTeam").addClass('hidden');
}

function edit1(){
  //existing team edit form appears and search results hidden after "edit" button clicked
  $("#team-objects").removeClass('hidden');
  $("#searchResult").addClass('hidden');
}

function submitChanges(){
  //back to search/add step and edit form hidden after "submit" button clicked
  $("#search-box").removeClass('hidden');
  $("#team-objects").addClass('hidden');
}

