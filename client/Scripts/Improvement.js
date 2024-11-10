budget_handler = function(isSucces, state)
{
  document.getElementById("start_btn").style.display = 'none';
  var user = UserAdv.findOne({"_id" : Meteor.userId()});

  if (user == null)
  {
    error_handle();
  }
  var currentBudget = (user.user_budget - improvement_cost);
  if (state == 1)
  {
    currentBudget += improvement_cost;
  }
  var credit =  user.index_credit;
  //var variable = Math.random();
  
  if (DEBUG === 1)
  {
    alert(isSucces);
    //alert(variable);
  }
  
  //update budget, credit index, their credit score text, and their improvement selection variable, and make it false if this page variable
  var imp_selection = user.improvementSelection;
  
  if (imp_selection >= user.currTask)
  {
    location.reload();
    return;
  }
  
  // currentBudget += cost
  var _show_currentBudget = currentBudget
  if (user.ml_decision == true)
  {
    _show_currentBudget -= gain
  }


document.getElementById("Next").style.display = 'none';
document.getElementById("Improvement").style.display = 'none';

if (state == 1)
{
  var ml_image =  document.getElementById("ml_pic");
  ml_image.style.display = "inline";
  document.getElementById("coin").innerText =  _show_currentBudget + " coins";
  has_seen_cpy = true;

  document.getElementById("result").style.display = 'inline';
  
  success_visibility(isSucces, credit);
  
    if (user.tutorial)
    {
      document.getElementById("continue_tutorial").style.display = 'inline';
      document.getElementById("continue_btn").style.display = 'none';
      
    }
}

if (state == 2)
{
  var str_succ = ((isSucces) ? ("S" + user.currTask) : ("F" + user.currTask));
  var string_of_improvement = ""
  if (!user.tutorial)
  {
    string_of_improvement = "" + user.improvementOrder + " " + str_succ;
  }

  if (credit < credit_ranges.length)
  {
    if (isSucces)
    {
      credit += 1;
    }

  }

  if (!user.tutorial)
  {
    imp_selection += 1;
  }

  IMPROVEMENT = imp_selection;

  var decision = false;
  if (!user.tutorial)
  {
    decision = user.ml_decision;
  } else
  {
    decision = isSucces;
  }

  if (!user.tutorial)
  {

  if (isSucces)
  {
    IMPROVEMENT_CREDIBILITY = credit;
    decision = simulate_person();
    if (decision == 1 )
    {
      if (user.ml_decision != true)
      {
        currentBudget += gain;
      }
      decision = true;
    }

    if (decision == 0)
    {
      if (user.ml_decision == true)
      {
        currentBudget -= gain;
      }
      decision = false;
    }
  }
}
has_seen_cpy = true;
just_here_cpy = true;
//alert(credit)
  UserAdv.update(Meteor.userId(),{
    $set:{
      ml_decision : decision, user_budget : currentBudget, improvementOrder : string_of_improvement , just_here : just_here_cpy , index_credit : credit, hasSeen : true, credibility : credit_ranges[credit], improvementSelection : imp_selection, isSucces : isSucces
    }

  }, function( error, result) {
    if ( error ) {error_handle();} //info about what went wrong
    if ( result ) {
  document.getElementById("coin").innerText =  _show_currentBudget + " coins";
                      document.getElementById("coin").style.color = "#8B0000";
                      var str1 = '<p id="message">-$'+ improvement_cost +'.00 coins!</p>';
                      $(str1).appendTo('#coin');
                      $("#message").animate({
                        top: -100,
                        opacity: 0
                      }, 2000,"linear",
                      function() {
                        $(this).remove();
                      });


                      setTimeout(() =>
                      {
                        document.getElementById("coin").style.color = "#000000";
                        // document.getElementById("budget_p").style.display = "none"
                        //timeout blocks database synchronization make sure the subject didn't open another tab and skipped this view if so skip this view as well.
                        // synchronization_func()
                        if (!user.tutorial){
                        document.getElementById("MLLOAD").style.display = "inline";}
                      }, 2000);
                      if (!user.tutorial)
                      {
                        //alert("here");
                        setTimeout(() =>
                      {
                        
                        //alert(user.improvementScreen);
                        //timeout blocks database synchronization make sure the subject didn't open another tab and skipped this view if so skip this view as well.
                        // synchronization_func()
                        document.getElementById("MLLOAD").style.display = "none";
                        document.getElementById("result").style.display = 'inline';
                        
                        success_visibility(isSucces, credit);
                        
                        
                        


                        //swal("Cancelled", "Your imaginary file is safe :)", "error");
                      }, 5000); //the _id of new object if successful
                      } else
                      {
                        document.getElementById("result").style.display = 'inline';
                        success_visibility(isSucces, credit);
                        document.getElementById("continue_tutorial").style.display = 'inline';
                        document.getElementById("continue_btn").style.display = 'none';
                        //ongoing_introduction();
                      }
                      
                    }});

}

}

// synchronization_func = function()
// {
//   return;
//   var user = UserAdv.findOne({"_id" : Meteor.userId()});

//                         if (user == null)
//                         {
//                           error_handle();
//                         }
//                         if (!user.improvementScreen)
//                         {
//                           location.reload;
//                         }
// }

success_visibility = function(isSucces, credit)
{
  var ml_image =  document.getElementById("ml_pic");
  if (isSucces)
                        {

                          
                          var s_d = document.getElementById("small_decision");
                          
                          s_d.innerText = "Congratulations! With the help of the credit management expert, your credit score range has been improved from " + credit_ranges[credit - 1] + " to " + credit_ranges[credit] +"!";//"Your improvement is enough to move on to the next credit range " + credit_ranges[credit] +"!";
                          ml_image.src = "https://icon-library.com/images/green-check-icon-png/green-check-icon-png-7.jpg";
                          
                         }else{
                        

                        
                       
                        var s_d = document.getElementById("small_decision");
                        s_d.innerText = "Sorry! The actions that the credit management expert takes this time does not lead to an improvement of your credit score!"
                        
                        ml_image.src = "https://st2.depositphotos.com/2899123/5948/v/950/depositphotos_59480935-stock-illustration-x-red-handwritten-letter.jpg";

                        }
}

// ongoing_introduction = function()
// {
//   return;
// }

Template.Improvement.onRendered(function bodyOnCreated()
{
  // console.log(Template.instance().view.name);
  document.getElementById("result").style.display = 'none';
  is_in_the_imp = true;
  itmsc_cln = undefined;
  if (detectBrowser() == "Safari"){
    var auto_refresh = setInterval(
      function()
      {
        var itm = document.getElementsByClassName('introjs-tooltipReferenceLayer')[0];
        if (itm == undefined)
        {
          return;
        }
        itmsc_cln = itm;
       
        var cln = itm.cloneNode(true);
        cln.onclick = document.getElementsByClassName('introjs-button introjs-nextbutton')[0].onclick;
        document.body.appendChild(cln);
  }, 1000);
    var auto_refresh2 = setInterval(
      function()
      {
        var itm = document.getElementsByClassName('introjs-tooltipReferenceLayer');
        if (itm == undefined || itmsc_cln == undefined)
        {
          return;
        }
        if (itm.length < 2)
        {
          return;
        }
        for(i = 0; i < itm.length; i++)
        {
          if (itm[i] != itmsc_cln)
          {
            itm[i].remove();
          }
        }
  }, 1001);
  }


  // var str1 = "Would you like to try to improve your credit score range now?";
  // var str2 = "Would you like to again try to improve your credit score range now?";
  var usr = UserAdv.findOne({"_id" : Meteor.userId()});
  if (usr == undefined)
  {
    error_handle();
  }
  
  document.getElementById("Avatar1").src = usr.image_url;
  if (!usr.tutorial){
    TaskIndex = usr.taskInd;
    if (usr.hasSeen == true)
    {
      budget_handler(usr.isSucces, 1);
    }
  //console.log(usr.currTask);
  // if (usr.currTask > 2)
  // {

  //   // document.getElementById("text2").innerText = "Before the Result!";
  //   if (usr.improvementSelection >= 1){
  //   document.getElementById("text3").innerText = "again";
  //   document.getElementById("text1").innerText = str2;
  // }
  //   document.getElementById("text4").innerText = "Remember!";
  //   document.getElementById("textofa").innerText = "another";
  //   //document.getElementById("text2").style.fontSize = "30px";
  // }else
  // {
  //   document.getElementById("text1").innerText = str1;
  //   // document.getElementById("text2").innerText = "Before the Result!";
  //   //document.getElementById("text2").style.fontSize = "30px";
  // }
}else
{
  document.getElementById("start_btn").style.display = 'inline';
  TaskIndex = usr.tutInd;
  if (usr.hasSeen == true)
  {   
      budget_handler(true,1);
      document.getElementById("continue_tutorial").style.display = 'inline';
      document.getElementById("continue_btn").style.display = 'none';
      //alert("here");
      
  }else{
  
  document.getElementById("Next").style.display = 'none';
  document.getElementById("Improvement").style.display = 'none';

  
}


  



}
});



Template.Improvement.helpers(
  {
    'getBudget' : function()
    {
      var usr = UserAdv.findOne({"_id" : Meteor.userId()});
      if (usr == undefined)
      {
        error_handle();
      }
      var currentBudget = usr.user_budget
      if (usr.ml_decision == true)
      {
        currentBudget -= gain
      }
      return currentBudget;
    },
    'cost' : function()
    {
      return improvement_cost;
    }
  }
);
