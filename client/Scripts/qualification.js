displayRadioValue = function(name) {
  var ele = document.getElementsByName(name);

  for(i = 0; i < ele.length; i++) {
    if(ele[i].checked)
    return ele[i].value;
  }
}

Template.qualification.helpers(
  {
    'threshold' : function()
    {
      return threshold;
    },
    'cost' : function()
    {
      return improvement_cost;
    },
    'SECOND_RACE' : function() {
      return SECOND_RACE;
    },
    'color_second_race' : function() {
      return color_second_race;
    }
    ,
    'FIRST_RACE' : function() {
      return FIRST_RACE;
    },
    'color_first_race' : function() {
      return color_first_race;
    }
  }
);

function containsUndefined(arr) {
  return arr.includes(undefined);
}

captcha = 0;
generate = function() {
 
    // Clear old input
    document.getElementById("submit").value = "";
 
    // Access the element to store
    // the generated captcha
    captcha = document.getElementById("image");
    var uniquechar = "";
 
    const randomchar =
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
    // Generate captcha for length of
    // 5 with random character
    for (let i = 1; i < 5; i++) {
        uniquechar += randomchar.charAt(
            Math.random() * randomchar.length)
    }
 
    // Store generated input
    captcha.innerHTML = uniquechar;
}
 
printmsg = function() {
    const usr_input = document
        .getElementById("submit").value;
     
    // Check whether the input is equal
    // to generated captcha or not
    if (usr_input == captcha.innerHTML) {
      UserAdv.update(Meteor.userId(), { $set: {captcha : true, sp : 0, atmp : 0}}, function( error, result) {
        if ( error ) {error_handle();} //info about what went wrong
        if ( result ) {
          document.getElementById("CAPTCHA").style.display = "none";
        document.getElementById("next_page").style.display = "inline";
      } //the _id of new object if successful
      });
        
    }
    else {
      atte += 1;
      UserAdv.update(Meteor.userId(), { $set: {atmp : atte}}, function( error, result) {
        if ( error ) {error_handle();} //info about what went wrong
        if ( result ) {
          var s = document.getElementById("key")
            .innerHTML = "Not Matched";
        generate();
          
      } //the _id of new object if successful
      });
        
    }
}

results_submit = function(token)
{
  Meteor.call('check_cpt',token, function (error, result) {
    if (error)
    {
      console.log(error);}
    else {}
    }
  );
  
}

Template.qualification.onRendered(function bodyOnCreated()
{
  generate();

  var usr2 = UserAdv.findOne({"_id" : Meteor.userId()});
  attempts2 = usr2.quiz_times;
  if (attempts2 == undefined || attempts2 == null || attempts2 == "")
  {
    attempts2 = 0;
  }
  if (attempts2 >= 3)
  {
    document.getElementById("help_text").style.display = "block";
  }

  if (attempts2 >= 1)
  {
    // Get all hint buttons and set their display to block or inline-block
    var hintButtons = document.querySelectorAll('#Instructions_Division div[id^="hintSection"] button');
    
    for(var i = 0; i < hintButtons.length; i++) {
        hintButtons[i].style.display = 'block';  // or 'inline-block'
    }
  }

  isPopup = false;
  Tracker.autorun(function() {
    let user = UserAdv.findOne(Meteor.userId());

    if (user && user.quiz_pop_up === true && CurrentIndex === 5) {
        popup_code();
    }

    if (user && isPopup === true && user.quiz_pop_up === false)
    {
        location.reload();
    }
});


var button_next = document.getElementById("next_page");
button_next.onclick = function()
{
  if (document.getElementById("next_page").style.backgroundColor == "rgb(204, 204, 204)")
  {
    return;
  }
  var first_ans = displayRadioValue("first");
  var second_ans = displayRadioValue("second");
  var third_ans = displayRadioValue("third");
  var fourth_ans = displayRadioValue("fourth");
  // var fifth_ans = displayRadioValue("fifth");
  var imp_answer = displayRadioValue("imp");
  var answers = [first_ans, second_ans, third_ans, fourth_ans, imp_answer];
  if (containsUndefined(answers))
  {
    alert("Please answer all of the questions!");
    return;
  }
  var usr = UserAdv.findOne({"_id" : Meteor.userId()});
  if (usr == undefined)
  {
    error_handle();
  }
  attempts = usr.quiz_times;
  if (attempts == undefined || attempts == null || attempts == "")
  {
    attempts = 0;
  }
  attempts++;
  UserAdv.update(Meteor.userId(), { $set: { quiz_times : attempts}}, function( error, result) {
      if ( error ) {} //info about what went wrong
      if ( result ) {} //the _id of new object if successful
  });
  document.getElementById("next_page").disabled = true;
  document.getElementById("next_page").style.border = "1px solid #999999";
  document.getElementById("next_page").style.backgroundColor = "#cccccc";
  document.getElementById("next_page").style.color = "#666666";
  var timeoutId = setTimeout(() => {
    amtLinkRefresh();
  }, 10000);
  setTimeout(() => {
    Meteor.call('check_answers', answers, function (error, result) {

      if (error)
      {
        console.log(error);
      }
        else {
          if (result == answers.length)
          {
            // swal({
            //   title: 'Congrats!',
            //   text: "You have passed the qualification test! Let's move on to start playing the game!",
            //   type: 'success',
            //   allowOutsideClick: false
            // }).then(function(isConfirm) {
            //   if (isConfirm) {
            //     CurrentIndex = ++usr.currentIndex;
            //     UserAdv.update(Meteor.userId(), { $set: { currentIndex : CurrentIndex }}, function( error, result) {
            //       if ( error ) {error_handle();} //info about what went wrong
            //       if ( result ) {window.location.href = path_new + "/task1";} //the _id of new object if successful
            //     });
            //     
            //   } else {
            //     console.log("isConfirm in else: ");
            //     return;
            //   }
            // });
            clearTimeout(timeoutId);
            BlazeLayout.render('trns_qual');
          }else
          {
            // swal({
            //   title: 'Sorry!',
            //   text: 'You made some mistakes in answering these questions. Please go through them again and check your answers!',
            //   type: 'warning',
            //   allowOutsideClick: false
            // }).then(function(isConfirm) {
            //   if (isConfirm) {
            //     
            //   } else {
            //     return;
            //   }
            // });
  
            clearTimeout(timeoutId);
            UserAdv.update(Meteor.userId(), { $set: {quiz_pop_up : true}}, function( error, result) {
              if ( error ) {error_handle();} //info about what went wrong
              if ( result ) {} //the _id of new object if successful
            });
            popup_code();

          }
  
        }
      }
    );
  }, "2000")
  

  /*var user = UserAdv.findOne({"_id" : Meteor.userId()});
  if (user == null)
  {
  return;
}
UserAdv.update(Meteor.userId(), { $set: { currentIndex : ++user.currentIndex  }});
location.reload();*/
}

});

popup_code = function()
{
  isPopup = true;
  swal({
    title: 'Sorry!',
    text: "You made some mistakes in answering these questions!",
    type: 'warning',
    allowOutsideClick: false,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: 'GoldenRod',
    confirmButtonText: 'Go back to tutorial!',
    cancelButtonText: 'Try again the questions!'
    }).then(function(isConfirm) {
      isPopup = false;
      if (isConfirm.value===true) {
        setTimeout(() => {
          amtLinkRefresh();
        }, 10000);
        console.log("isConfirm in if: " + isConfirm);
        CurrentIndex = 4;//--usr.currentIndex
        if (comparatorForIndices(CurrentIndex, false) == true)
      {
        UserAdv.update(Meteor.userId(), { $set: {quiz_pop_up : false, currentIndex : CurrentIndex, tutInd : 0, tutorial : true}}, function( error, result) {
          if ( error ) {error_handle();} //info about what went wrong
          if ( result ) {location.reload();} //the _id of new object if successful
        });
      }

      } else {
        console.log("isConfirm in else: ");
        UserAdv.update(Meteor.userId(), { $set: {quiz_pop_up : false}}, function( error, result) {
          if ( error ) {error_handle();} //info about what went wrong
          if ( result ) {location.reload();} //the _id of new object if successful
        });
      }
    });
}