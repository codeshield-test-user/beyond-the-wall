

function showPopup(your_variable){
    console.log("got token" + process.env.ACCESS_TOKEN);
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

function SparkEventHandler(name, detail) {
							console.log ("Events comming in - " + JSON.stringify(name));
						  if (name === 'calls:disconnected' || name === 'memberships:declined' || name === 'memberships:disconnected') {
						    // Perform an action if a new message has been created
								console.log("I did get this : " + JSON.stringify(name) + JSON.stringify(detail));
								//ciscospark.widget(widgetEl).remove();
								$('#popup').popup('hide');
						  };
						};


function createWidget() {
  var widget = ciscospark.widget(widgetEl);
  widget.spaceWidget({
    accessToken: '<%= process.env.ACCESS_TOKEN %>',
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
