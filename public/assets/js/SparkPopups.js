$( function() {
    $( "#token-form" ).dialog({
        autoOpen: false,
        modal: true,
        width: "500",
        height: "200"
    });
 } );


$( function() {
    var dialog, form,
 
      // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
      emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      name = $( "#name" ),
      email = $( "#email" ),
      password = $( "#password" ),
      allFields = $( [] ).add( name ).add( email ).add( password ),
      tips = $( ".validateTips" );
 
    function updateTips( t ) {
      tips
        .text( t )
        .addClass( "ui-state-highlight" );
      setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
      }, 500 );
    }
 
    function checkLength( o, n, min, max ) {
      if ( o.val().length > max || o.val().length < min ) {
        o.addClass( "ui-state-error" );
        updateTips( "Length of " + n + " must be between " +
          min + " and " + max + "." );
        return false;
      } else {
        return true;
      }
    }
 
    function checkRegexp( o, regexp, n ) {
      if ( !( regexp.test( o.val() ) ) ) {
        o.addClass( "ui-state-error" );
        updateTips( n );
        return false;
      } else {
        return true;
      }
    }
 
    function addUser() {
      var valid = true;
      allFields.removeClass( "ui-state-error" );
 
      valid = valid && checkLength( name, "username", 3, 16 );
      valid = valid && checkLength( email, "email", 6, 80 );
      valid = valid && checkLength( password, "password", 5, 16 );
 
      valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      valid = valid && checkRegexp( email, emailRegex, "eg. ui@jquery.com" );
      valid = valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );
 
      if ( valid ) {
        $( "#users tbody" ).append( "<tr>" +
          "<td>" + name.val() + "</td>" +
          "<td>" + email.val() + "</td>" +
          "<td>" + password.val() + "</td>" +
        "</tr>" );
        dialog.dialog( "close" );
      }
      return valid;
    }
 
    dialog = $( "#dialog-form" ).dialog({
      autoOpen: false,
      height: 400,
      width: 350,
      modal: true,
      buttons: {
        "Create an account": addUser,
        Cancel: function() {
          dialog.dialog( "close" );
        }
      },
      close: function() {
        form[ 0 ].reset();
        allFields.removeClass( "ui-state-error" );
      }
    });
 
    form = dialog.find( "form" ).on( "submit", function( event ) {
      event.preventDefault();
      addUser();
    });
 
    $( "#create-user" ).button().on( "click", function() {
      dialog.dialog( "open" );
    });
  } );

function getToken(event){
    console.log(event);
};

function askforToken(){
        //console.log(#token);
        //console.log (document.getElementById("token-form"));
        $("#token-form").dialog({
        //autoOpen: false,
        //title: your_variable,
        modal: true,
        width: "500" ,
        height: "500",
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
    console.log(theToken);
    $("#popup").dialog({
        title: your_variable,
        modal: true,
        width: "500" ,
        height: "500",
        dialogClass: "no-close",
        open: function(){
            $(this).find("p").html("Hello " + your_variable);
            createWidget();
        },
        close: function(){
          //ciscospark.widget(widgetEl).remove();
          removeWidget();
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


function createWidget() {
  var widget = ciscospark.widget(widgetEl);
  widget.spaceWidget({
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
        $('#popup').dialog("close");

      };
    }
  });
}

function removeWidget() {
  var widget = ciscospark.widget(widgetEl);
  if (widget.remove) {
    widget.remove();
  }
}
