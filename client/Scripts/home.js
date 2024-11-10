Template.home.onCreated(function bodyOnCreated() {
  if (Meteor.userId() == null)
  {
    window.location.href = path_new + "/";


  }
  else
  {
     window.history.pushState("", "", path_new + "/home");

  }
});


Template.HOME.onCreated(function bodyOnCreated() {
 if (Meteor.user() != null)
 {
   window.location.href = path_new + "/home";
 }
});


Template.home.helpers({

'example': function()
{

  var order = UserAdv.findOne({"_id" : Meteor.userId()});

  if (order == undefined)
  {
    error_handle();
  }

  return true;
},
'getText' : function()
{
  var order = UserAdv.findOne({"_id" : Meteor.userId()});
  if (order == undefined || order.currentIndex == 0)
  {
    return "Travel into the future!";
  }else
  {
    window.location.href = path_new + "/instructions";
    return "Play the game!";
  }
}
});
