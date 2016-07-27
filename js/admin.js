var myDataRef = new Firebase('https://e-picks-purdue.firebaseio.com/'); // Firebase object used for everything else
var authData = myDataRef.getAuth();
if (authData) {
  $('#searchResult').addClass('hidden');
  $('#addTeam').addClass('hidden');
  $('#team-objects').addClass('hidden');
  $('#admin').removeClass('hidden');
  $('#splashscreen').addClass('hidden');
}

function authHandler(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
    $('#loginFeedback').append('Unsuccessful login, please try again')
  } else if (authData) {
    console.log("Authenticated successfully with payload:", authData);
    $('#searchResult').addClass('hidden');
    $('#addTeam').addClass('hidden');
    $('#team-objects').addClass('hidden');
    $('#admin').removeClass('hidden');
    $('#splashscreen').addClass('hidden');
  } else {
    console.log("Authenticated successfully, authData incorrect", authData);
  }
}

function login(e) {
    e.preventDefault();
    myDataRef.authWithPassword({
           "email": document.getElementById("initialUser").value,
           "password": document.getElementById("initialPass").value 
         }, authHandler/*, {remember: "sessionOnly"}*/);
     return false;
}

function edit(thing) { //add new group function
  event.preventDefault();
  var form = thing.parentElement.children[2];

  if(!form.children[1].value) {
    return;
  }

  //get all the values from the form, i stands for input so we don't confuse the variable with the firebase key
  var team_namei = form.children[1].value;
  var team_abbrevi = form.children[3].value;
  var websitei = form.children[5].value;
  var dayi = form.children[7].value;
  var time_numi = form.children[9].value;
  var timei;
  switch(time_numi){
    case "1":
      timei = "8:30 AM - 10:20 AM";
      break;
    case "2":
      timei = "10:30 AM - 12:20 PM";
      break;
    case "3":
      timei = "1:30 PM - 3:20 PM";
      break;
    case "4":
      timei = "3:30 PM - 5:20 PM";
      break;
    default:
      timei = "Other";
  }
  var aoii = form.children[11].value;
  var desci = form.children[13].value;
  var activei = form.children[15].value;

  //myDataRef is the Firebase object and this adds a new child titled with the description field.
  var tempRef = myDataRef.child(team_abbrevi); 

  //update function makes changes to JSON fields
  tempRef.update({ 
     team_name: team_namei,
     team_abbrev: team_abbrevi,
     website: websitei,
     day: dayi,
     time_num: time_numi,
     time: timei,
     aoi: aoii,
     desc: desci,
     active: activei
  });

  var span = thing.parentElement.children[3];
  if (span.innerHTML == " ") {
    span.innerHTML = "Changes successfully commited";
  } else {
    span.innerHTML = span.innerHTML + " | "
  }
}

//creates a new team from teamSubmit
function createNewTeam(thing) {
  event.preventDefault();
  var form = thing.parentElement.children[2];
  if(!form.children[1].value) {
    return;
  }

  //get all the values from the form, i stands for input so we don't confuse the variable with the firebase key
  var team_namei = form.children[1].value;
  var team_abbrevi = form.children[3].value;
  var websitei = form.children[5].value;
  var dayi = form.children[7].value;
  var time_numi = form.children[9].value;
  var timei;
  switch(time_numi){
    case "1":
      timei = "8:30 AM - 10:20 AM";
      break;
    case "2":
      timei = "10:30 AM - 12:20 PM";
      break;
    case "3":
      timei = "1:30 PM - 3:20 PM";
      break;
    case "4":
      timei = "3:30 PM - 5:20 PM";
      break;
    default:
      timei = "Other";
  }
  var aoii = form.children[11].value;
  var desci = form.children[13].value;
  var activei = form.children[15].value;

  var tempRef = myDataRef.child(team_abbrevi);
  //myDataRef is the Firebase object and push adds a new team

  tempRef.update({
      team_name: team_namei,
      team_abbrev: team_abbrevi,
      website: websitei,
      day: dayi,
      time_num: time_numi,
      time: timei,
      aoi: aoii,
      desc: desci,
      active: activei
  }); 

  $('#addTeam').addClass('hidden');

}

function logout() {
myDataRef.unauth();
document.location.reload(true);
}


function displayTeamInfo(abbrev, desc, aoi, day, name, time_num, time, website, active) {
  //remember to get rid of the onclick here
  //$("#searchResult").append('<div class ="resultinfo" id='+abbrev+'><label>Team Name: <a>'+name+'</a> </label><label>Acronym: <a>'+abbrev+'</a></label><label>Website: <a>'+website+'  </a></label><label>Day: <a>'+day+'  </a></label><label>Time: <a>'+time+' </a></label><label>Area of Impact: <a>'+aoi+'  </a></label><label>Description: <a> '+desc+' </a></label><label>Active: <a> '+active+' </a></label><input id="editbutton" type="submit" value="Edit" /><input id="deletebutton" type="submit" value="Delete" onclick="goodbye()" /></div>'); 
  $("#searchResult").append('<div class ="resultinfo" id='+abbrev+'><button class="activeButton" type="button" value="'+abbrev+'" activeModifier="'+active+'"> </button><!--form to collect changes--><h3 class="changeditem">'+name+'</h3><form class="hidden"><label>Team Name:</label> <input type="text" class="edit_team_name" value="'+name+'"> <label>Team Acronym: </label><input type="text" class="edit_abbrev" value="'+abbrev+'" > <label>Website: </label><input type="text" class="edit_web" value="'+website+'"> <label>Day: </label><select class="editDay">'
    +'<option value="'+day+'">'+day+'</option> <option value="Monday">Monday</option> <option value="Tuesday">Tuesday</option> <option value="Wednesday">Wednesday</option> <option value="Thursday">Thursday</option> <option value="Friday">Friday</option> </select><label>Time: </label><select class = "editTime"> <option value="'+time_num+'">'+time+'</option> <option value="1">8:30 AM - 10:20 AM</option> <option value="2">10:30 AM - 12:20 PM</option> <option value="3">1:30 PM - 3:20 PM</option> <option value="4">3:30 PM - 5:20 PM</option> <option value="5">Other</option> </select> <label>Area of Impact: '
    +'</label> <select class = "editAOI"> <option value="'+aoi+'">'+aoi+'</option>'
    +' <option value="Access & Abilities">Access & Abilities</option> <option value="Education & Outreach">Education & Outreach</option> <option value="Environment">Environment</option> <option value="Human Services">Human Services</option> </select>'
    +' <!--<label>Preferred Majors: <input type="text" name="editMajor" class="editMajor" size="30" placeholder=""> --> <label>Description: </label> <TEXTAREA class="desc" ROWS=6 >'+desc+'</TEXTAREA> <label>Active: </label><select class= "editAct"> <option value=1>Yes</option> <option value=0>No</option> </select>  </form> <!--done collecting changes--> <!--submit changes button --><span class="hidden feedback"> </span> <button class="submitchange hidden" type="button" onclick="edit(this)" value="Submit"> Submit </button></div>');
        /* Pretty version of the unholy mess above
        '<div class ="resultinfo" id='+abbrev+'>
          <!--form to collect changes-->
          <h3 class="changeditem">'+name+'</h3><br>
            <form>
              <label>Team Name: 
              <input type="text" class="edit_team_name" placeholder="'+name+'">
              </label><br>
              <label>Team Acronym: 
              <input type="text" class="edit_abbrev" placeholder="'+abbrev+'" >
              </label><br>
              <label>Website: 
              <input type="text" class="edit_web" size="50" placeholder="'+website+'">
              </label><br>
              <label>Day: 
              <select class="editDay">
                <option>Choose a Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
              </select>
              </label><br>
              <label>Time: 
              <select class = "editTime">
                <option>Choose a Time</option>
                <option value="1">8:30 AM - 10:20 AM</option>
                <option value="2">10:30 AM - 12:20 PM</option>
                <option value="3">1:30 PM - 3:20 PM</option>
                <option value="4">3:30 PM - 5:20 PM</option>
                <option value="5">Other</option>
              </select>
              </label><br>
              <label>Area of Impact: 
              <select class = "editAOI" onchange="addNewAOI();">
                <option>Choose an Area</option>
                <option value="Access & Abilities">Access & Abilities</option>
                <option value="Education & Outreach">Education & Outreach</option>
                <option value="Environment">Environment</option>
                <option value="Human Services">Human Services</option>
              </select><br>
                  <div class="hidden" id="editAOIinput"> 
                     <label >Input New Area of Impact:
                      <input type="text" class="editAOIoption" size="30" placeholder="Enter New Area of Impact">  <!--shows up only when "input new area of impact" is selected-->
                  </div>
              </label>
              <!--<label>Preferred Majors: 
              <input type="text" name="editMajor" class="editMajor" size="30" placeholder=""> -->
              </label><br>
              <label>Description: <br>
              <TEXTAREA class="desc" ROWS=3 COLS=30 >'+desc+'</TEXTAREA>
              </label><br>
              <label>Active: 
              <select class= "editAct">
                <option value=1>Yes</option>
                <option value=0>No</option>
              </select>
              </label><br>
            </form>
          <!--done collecting changes-->
          <!--submit changes button -->
          <input class="submitchange" type="submit" value="Submit" >
      </div>' */
  return;
}

$('document').ready(function() {
  //search button
  $('#searchButton').click(searchGroups);

  //login when people press enter
  $('#initialPass').on("keypress", function(e) {
    if (e.keyCode == 13) {
      login(e);
    }
  });

  //login when the login button is clicked
  $('#enter').click(login);


  //expand each team for editing
  $('#searchResult').on('click', '.changeditem', function() {
    $(this).siblings('form').toggleClass('hidden');
    $(this).siblings('span').toggleClass('hidden');
    $(this).siblings('button').toggleClass('hidden');
  })

  $('#searchResult').on('click', '.activeButton', function() {
    var teamName = $(this).val();
    var active = $(this).attr("activeModifier");
    active = 1 - active
    var tempRef = myDataRef.child(teamName); 

    //update the active state
    tempRef.update({ 
       active: active
    });

    $(this).attr("activeModifier", active);

    if (active) {
      $(this).css("background-color", "#4CAF50");
    } else {
      $(this).css("background-color", "#bb0000");
    }
  })

  //add team button shows add team form
  $('#add').on('click', function() {
    $('#addTeam').removeClass('hidden');
    $('searchResults').addClass('hidden');
  })

  $('#submitNew').on('click', function() {
    createNewTeam(this)
  });

  //this adds all the teams to the page on load
  try {myDataRef.on('child_added', function(snapshot) {
    /* This is a way to add new fields to the database for future use
    var newRef = myDataRef.child(snapshot.val().team_abbrev);
    newRef.update({active: 1}); */
    var team = snapshot.val();
    displayTeamInfo(team.team_abbrev, team.description, team.aoi, team.day, team.team_name, team.time_num, team.time, team.website, team.active);
    
    if (team.active) {
      $('#'+team.team_abbrev).children('.activeButton').css("background-color", "#4CAF50");
    } else {
      $('#'+team.team_abbrev).children('.activeButton').css("background-color", "#bb0000");
    }
  }); }
  catch(err) {
    alert("failed to load teams");

  myDataRef.on('child_changed', function(snapshot) {
    var team = snapshot.val();
    displayTeamInfo(team.team_abbrev, team.description, team.aoi, team.day, team.team_name, team.time_num, team.time, team.website, team.active);
  });

}

});

 function searchGroups() {
  event.preventDefault();
  $('#searchResult').contents().each(function() {
      try {$('#'+this.id).addClass('hidden'); } catch(err) {event.preventDefault();}
  });
  try {
    try { $('#searchResult').removeClass('hidden'); } catch(err) {event.preventDefault();}
    var searchRegex = new RegExp($('#wordSearch').val(), 'i');
    $('#searchResult').contents().each(function() {
      if (searchRegex.test(this.outerHTML)) {
        $("#"+this.id).removeClass('hidden');
      }
    });
  } catch(err) {
    event.preventDefault();
    $('#searchResult').contents().each(function() {
      try {$('#'+this.id).addClass('hidden'); } catch(err) {event.preventDefault();}
    });
    alert('invalid');
  }
}
