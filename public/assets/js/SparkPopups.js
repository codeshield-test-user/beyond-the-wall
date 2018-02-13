




//$('#token-form').on('keyup keypress keydown', function(e) {
//  var keyCode = e.keyCode || e.which || 0;
//  if (keyCode === 13) { 
//    e.preventDefault();
//    return false;
//  };
//    if (keyCode === 27) { 
//    e.preventDefault();
//    return false;
//  };  
// });

//$( function() {
//    $( "#token-form" ).dialog({
//        autoOpen: false,
//        modal: true,
//        width: "500",
//        height: "200"
//    });
// } );
var ampeventObj = {};
ampevents.createEmitter(ampeventObj);

function initializeSpark(req){
  spark = ciscospark.init({
    credentials: {
      access_token: req
    }
  });
  spark.once ('ready', () => {
    console.log ("Spark SDK ready");
  });
};



function getToken(event){
    //console.log("inside getToken function");
    theToken = document.getElementById("tokenID2").value;
    //console.log(theToken);
    initializeSpark(theToken);
};

/*
function getURI(event){
    console.log("inside getURI function");
    theURI = document.getElementById("sparkURI").value;
    console.log(theURI);
};
*/

function dialURI2(){
//    theURI = document.getElementById("sparkURI").value;
//    console.log("got token - " + theToken);
   console.log("got uri - " + document.getElementById("sparkURI").value);
   createURIwidget(document.getElementById("sparkURI").value, "meet");
};


function dialURI(uri){
  createURIwidget(uri, "meet");    
};

/*
function messageSparkBOT(){
  console.log("got token - " + theToken);
  //console.log("got uri - " + uri); 
  console.log("got BOT email - " + SparkBOTEmail);   
};

function pingSparkGroup(){
  console.log("got token - " + theToken);
  //console.log("got uri - " + uri); 
  console.log("got Group ID - " + SparkGroupID);   
};

function meet1on1(){
  console.log("got token - " + theToken);
  //console.log("got uri - " + uri); 
  console.log("got 1:1 URI - " + meet1on1URI);   
};
*/

function createnewspace(){  
  console.log("Using SDK to create space");
  spark.rooms.create({title: 'Web-Session-' + Date.now()})
  .then(function(room){
    residentchatroomid = room.id;
  })
  .then(function(){
    console.log("Space creted successfully");
    return 'success';
  });
};

function askforToken(){
        console.log("Asking for token");
        //console.log(#token);
        //console.log (document.getElementById("token-form"));
        $("#token-form").dialog({
        autoOpen: true,
        //title: your_variable,
        modal: true,
        keyboard: false,
        //width: "75%" ,
        //height: "500",
        dialogClass: "no-close",
        open: function(){
            //$(this).find("p").html("Hello " + your_variable);
            //createWidget();
            
        },
        close: function(){
          //ciscospark.widget(widgetEl).remove();
          //removeWidget();
        },
        buttons: [
        {
          text: "Save",
          //icon: "fa fa-users",
          click: function() {
            theToken = document.getElementById("tokenID").value;
            console.log(theToken);  
            $(this).dialog( "close" );
          },
        //Uncommenting the following line would hide the text,resulting in the label being used as a tooltip
        //showText: true
        }
    ]
  });
}


//async function sparkevents(name, data){
function sparkevents(name, data){
    //remove title bar to hide avatar and URI display on connect
    document.querySelectorAll('.ciscospark-title-bar-wrapper')[0].style.display = "block";
    
    /*
    if (name === 'calls:connected'){
        var elements = document.querySelectorAll('.ciscospark-title-bar-wrapper');
        //console.log(JSON.parse(elements));
        elements[0].style.display = "block";
    };
*/
    // kill the widget and modal on call end / decline
    if (name === 'calls:disconnected' || name === 'memberships:declined' || name === 'memberships:disconnected') {
                ciscospark.widget(widgetEl).remove().then(function(removed){
                  if (removed) {
                    console.log('Removed widget');
                    
                  }
                }).then(function(){
                  $('#sparkwidgetmodal').modal('hide');
                  console.log("Hid modal");
                });
    };
    //await console.log ("recieved spark event: " + name);
    //(ampeventObj).trigger("loaded", {some: 'object'});
};

function getMethods(obj)
{
    var res = [];
    for(var m in obj) {
        if(typeof obj[m] == "function") {
            res.push(m)
        }
    }
    return res;
}

function isWidgetLoaded(){
  console.log ("maybe its loaded");
  //return (ciscospark.widget(widgetEl));
};

function botevents(name, data){
  //remove title bar to hide avatar and URI display on connect
  console.log(name + " :: " + JSON.stringify(data));
  //console.log(document.querySelectorAll('.ciscospark-title-bar-wrapper')[0].style);
  document.querySelectorAll('.ciscospark-title-bar-wrapper')[0].style.display = "block";
  if (name === 'rooms:read'){
      var elements = document.querySelectorAll('.ciscospark-title-bar-wrapper');
      console.log(JSON.stringify(elements));
      elements[0].style.display = "none";
  };

  // kill the widget and modal on call end / decline
  if (name === 'calls:disconnected' || name === 'memberships:declined' || name === 'memberships:disconnected') {
              ciscospark.widget(widgetEl).remove(function(removed){
                if (removed) {
                  console.log('Call ended widget removed, hiding modal');
                  $('#sparkwidgetmodal').modal('hide');
                }
              });
  };     
};

async function createURIwidget(){
  console.log("creating URI widget with - "+ arguments[0] + " for acitivity " + arguments[1]);
  await $('#sparkwidgetmodal').modal('show');
  //widgetEl = document.getElementById('embedhere');
  // Init a new widget 
  await ciscospark.widget(widgetEl).spaceWidget(
      { accessToken: theToken, 
       toPersonEmail: arguments[0],
       initialActivity: arguments[1],
       startCall: true,
       onEvent: sparkevents
      }
  );
  return ('createURIwidget function completed');
};

async function spaceIDwidget(){
  console.log("creating widget with Space ID - " + arguments[0] + " for acitivity " + arguments[1]);
  await $('#sparkwidgetmodal').modal('show');
  //widgetEl = await document.getElementById('embedhere');
  await ciscospark.widget(widgetEl).spaceWidget(
      { accessToken: theToken, 
        spaceId: arguments[0],
        initialActivity: arguments[1],
        startCall: false,
        onEvent: sparkevents
      }
  );
  return ('spaceIDwidget function completed');
};

function spaceEMailwidget(){
  console.log("creating widget with Email - " + arguments[0] + " for acitivity " + arguments[1]);
  $('#sparkwidgetmodal').modal('show');
  //widgetEl = document.getElementById('embedhere');
  //console.log(JSON.stringify(document.querySelectorAll('.ciscospark-title-bar-wrapper')));
  ciscospark.widget(widgetEl).spaceWidget(
      { accessToken: theToken, 
        toPersonEmail: arguments[0],
        initialActivity: arguments[1],
        startCall: false,
        onEvent: botevents
      }
  );
};

/*

function removeWidget() {
  //var widget = ciscospark.widget(widgetEl);
  if (widget.remove) {
    widget.remove();
  }
}

function removeWidget(modalid) {
    console.log("removing widget named " + modalid);
  //var widget = ciscospark.widget(modalid);
  if (widget.remove) {
    widget.remove();
  }
}

//Cookie handling code - 
function setCookie(cname, cvalue, exdays) {
  console.log("in setcookie function");
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  console.log("in getcookie function");
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}


function checkCookie() {
  var user = getCookie("username");
  if (user != "") {
      alert("Welcome again " + user);
  } else {
      user = prompt("Please enter your name:", "");
      if (user != "" && user != null) {
          setCookie("username", user, 365);
      }
  }
}

*/
