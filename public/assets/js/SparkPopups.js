




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


function getToken(event){
    console.log("inside getToken function");
    theToken = document.getElementById("tokenID2").value;
    console.log(theToken);
};

function getURI(event){
    console.log("inside getURI function");
    theURI = document.getElementById("sparkURI").value;
    console.log(theURI);
};

function dialURI2(){
    theURI = document.getElementById("sparkURI").value;
//    console.log("got token - " + theToken);
//    console.log("got uri - " + theURI);
    createURIwidget(theURI);
};

function dialURI(token, uri){
    console.log("got token - " + token);
    console.log("got uri - " + uri);    
};

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

function createnewspace(){
  console.log("got token - " + theToken);
  //console.log("got uri - " + uri); 
  //console.log("got Group ID - " + SparkGroupID);   
  console.log("find a way to create new room");
  $.ajax({
    url: 'localhost',    //Your api url
    type: 'POST',   //type is any HTTP method
    data: {
        data: "sendData"
    },      //Data as js object
    success: function () {
    }
  });
  $.ajax({
    url: "test.html",
    type: 'POST',
    data: {
      data: "sendData"
    },
    context: document.body
  }).done(function() {
    alert( "success" );
  }).fail(function() {
    alert( "error" );
  }).always(function() {
    alert( "complete" );
  });
};

/*
.done(function() {
    alert( "success" );
  })
  .fail(function() {
    alert( "error" );
  })
  .always(function() {
    alert( "complete" );
  });
*/

//not using 
function dialURI(event){
    console.log("inside getURI function");
    SparkURI = document.getElementById("sparkURI").value;
    console.log(SparkURI);
    
    $('#sparkwidgetmodal').modal().open;
    //var widgetEl = document.getElementById('embedSpark');
      // Init a new widget
      ciscospark.widget(widgetEl).spaceWidget({
        accessToken: theToken,
        toPersonEmail: SparkURI,
        initialActivity: 'meet',
        startCall: true
      });
    $('#sparkwidgetmodal').on('hidden.bs.modal', function (e) {
        console.log("going to kill session");
        //removeWidget('widgetEl');
        ciscospark.widget(widgetEl).remove();
        
    })
    
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

function showPopup(your_variable){
    //console.log("got token" + process.env.ACCESS_TOKEN);
    SparkURI = document.getElementById("sparkURI").value;
    console.log("got URI: " + SparkURI);
    console.log("got your_variable: " + your_variable);
    console.log("got token: " + theToken);
    $("#popup").dialog({
        title: your_variable,
        modal: true,
        width: "500" ,
        height: "500",
        dialogClass: "no-close",
        open: function(){
            $(this).find("p").html("Hello " + your_variable);
            //createWidget();
        },
        close: function(){
          //ciscospark.widget(widgetEl).remove();
          //removeWidget();
        },
        buttons: [
        {
          text: "End Interaction",
          //icon: "fa fa-users",
          click: function() {
            $( this ).dialog( "close" );
          },
        //Uncommenting the following line would hide the text,resulting in the label being used as a tooltip
        //showText: true
        }
    ]
  });
}

function sparkevents(name, data){
    //remove title bar to hide avatar and URI display on connect
    if (name === 'calls:connected'){
        var elements = document.querySelectorAll('.ciscospark-title-bar-wrapper');
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


function createURIwidget(theURI){
    console.log("creating URI widget");
    $('#sparkwidgetmodal').modal('show');
    widgetEl = document.getElementById('embedhere');
    // Init a new widget 
    ciscospark.widget(widgetEl).spaceWidget(
        { accessToken: theToken, 
         toPersonEmail: theURI,
         initialActivity: 'meet',
         startCall: true,
         onEvent: sparkevents
        }
    );
};
/*
function createWidget() {
  var widgetEl = ciscospark.widget(widgetEl);
  widgetObject.spaceWidget({
    //accessToken: '<%= process.env.ACCESS_TOKEN %>',
    accessToken: theToken,
    //spaceId: '<%= process.env.SPACE_ID %>',
    toPersonEmail: 'roomkit@sparkdemos.com',
    initialActivity: 'meet',
    startCall: true,
    onEvent: function(name, data) {
      widgetEventsEl.innerText = name+'\n'+ JSON.stringify(data);
      console.log(data);
      if (name === 'calls:disconnected' || name === 'memberships:declined' || name === 'memberships:disconnected') {
        // Perform an action if a new message has been created
        //console.log("I did get this : " + JSON.stringify(name) + JSON.stringify(detail));
        //ciscospark.widget(widgetEl).remove();
        //removeWidget();
        ciscospark.widget(widgetEl).remove(function(removed) {
          if (removed) {
            console.log('widget is removed!');
          }
        });  
        $('#popup').dialog("close");

      };
    }
  });
}
*/

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