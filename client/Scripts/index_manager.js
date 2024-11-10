// Template.manager.helpers(
//   {
//     'showEnd' :  function()
//     {
//       var order = UserAdv.findOne({"_id" : Meteor.userId()});
//         if (order == undefined)
//         {
//           //DON'T FORGET MAKE THIS RETURN TRUE
//           //BlazeLayout.render('refresh');
//           return;
//         }
//         if (order.currentIndex < get("num_of_demographics"))
//         {
//               
//               BlazeLayout.render('selector');
//               return;
//         }
//         if ( order.show_end)
//         {
//            BlazeLayout.render('end');
//             return true;
//         }
//         else
//         {
//           BlazeLayout.render('taskDesign');
//           return false;
//         }
//
//     }
//   }
// );
//Test
hypPush = function(txt)
{
  window.history.pushState('', '', txt);
}

Template.selector.helpers(
  {
    'whichPage' : function()
    {
      var index = UserAdv.findOne({"_id" : Meteor.userId()});

      // console.log('selector');
      // console.log(index);

      if (index != undefined)
      {
        Meteor.call('check_worker', function (error, result) {

          if (error)
          {
            error_handle();
            return false;
          }
            else {
              if (result == true)
              {
                   window.location.href = path_new + "/error";
              }else
              {

                if (index.amtId == "ASSIGNMENT_ID_NOT_AVAILABLE")
                {
                    BlazeLayout.render('accept');
                    return;
                }
                CurrentIndex = index.currentIndex;
                IMPROVEMENT = index.improvementSelection;
                atte = index.atmp;
                // console.log('here');
                //COLLECT DEMOGRAPHIC INFORMATION HERE
                if (index.currentIndex > 5 && index.isQualified == false)
                {
                  alert("Qualification error!");
                  return;
                }

                if (index.currentIndex == 0)
                {
                  hypPush('instructions');
                  BlazeLayout.render('consent');
                }
                if (index.currentIndex == 1)
                {
                  if (index.index1time ==  undefined)
                  {
                    var date = new Date();
                    var time = date.getTime();
                    UserAdv.update(Meteor.userId(),{
                     $set:{
                       index1time : time
                         }

                      });
                  }
                  hypPush('instructions');
                  BlazeLayout.render('profile_inst');
                }
                if (index.currentIndex == 2)
                {
                  if (index.index2time ==  undefined)
                  {
                    var date = new Date();
                    var time = date.getTime();
                    UserAdv.update(Meteor.userId(),{
                     $set:{
                       index2time : time, index1mins : Math.round((time - index.index1time) / 1000)
                         }

                      });
                  }
                  hypPush('instructions');
                  BlazeLayout.render('instr_2');
                }
                if (index.currentIndex == 3)
                {
                  if (index.index3time ==  undefined)
                  {
                    var date = new Date();
                    var time = date.getTime();
                    UserAdv.update(Meteor.userId(),{
                     $set:{
                       index3time : time, index2mins : Math.round((time - index.index2time) / 1000)
                         }

                      });
                  }
                  hypPush('instructions');
                  BlazeLayout.render('instr_3');
                }
                if (index.currentIndex == 4)
                {
                  if (index.improvementScreen == true)
                  {
                  BlazeLayout.render('Improvement');
                  //console.log("here imp");
                  }else
                  {
                    is_in_the_imp = false;
                  if (index.index4time ==  undefined)
                  {
                    var date = new Date();
                    var time = date.getTime();
                    UserAdv.update(Meteor.userId(),{
                     $set:{
                       index4time : time, index3mins : Math.round((time - index.index3time) / 1000)
                         }

                      });
                  }
                  TaskIndex = index.tutInd;
                  hypPush('task1');
                  BlazeLayout.render('taskDesign');
                }
                }
                if (index.currentIndex == 5)
                {
                  if (index.index5time ==  undefined)
                  {
                    var date = new Date();
                    var time = date.getTime();
                    UserAdv.update(Meteor.userId(),{
                     $set:{
                       index5time : time, index4mins : Math.round((time - index.index4time) / 1000)
                         }

                      });
                  }
                  hypPush('task1');
                  BlazeLayout.render('qualification');
                }

                if (index.currentIndex == 6)
                {
                  if (index.improvementScreen == true)
                  {
                  BlazeLayout.render('Improvement');
                  //console.log("here imp");
                  }
                  else
                  {
                    is_in_the_imp = false;
                  if (index.index6time ==  undefined)
                  {
                    var date = new Date();
                    var time = date.getTime();
                    UserAdv.update(Meteor.userId(),{
                     $set:{
                       index6time : time, index5mins : Math.round((time - index.index5time) / 1000)
                         }

                      });
                  }
                    TaskIndex = index.taskInd;
                    hypPush('task1');
                    BlazeLayout.render('taskDesign');
                  }

                }
                if (index.currentIndex == 7)
                {
                  if (index.index7time ==  undefined)
                  {
                    var date = new Date();
                    var time = date.getTime();
                    UserAdv.update(Meteor.userId(),{
                     $set:{
                       index7time : time, index6mins : Math.round((time - index.index6time) / 1000)
                         }

                      });
                  }
                    hypPush('task1');
                    BlazeLayout.render('survey');

                }
                if (index.currentIndex == 8)
                {
                  if (index.index8time ==  undefined)
                  {
                    var date = new Date();
                    var time = date.getTime();
                    UserAdv.update(Meteor.userId(),{
                     $set:{
                       index8time : time, index7mins : Math.round((time - index.index7time) / 1000)
                         }

                      });
                  }
                    hypPush('task1');
                    BlazeLayout.render('survey_1');

                }
                if (index.currentIndex == 9)
                {
                  if (index.index9time ==  undefined)
                  {
                    var date = new Date();
                    var time = date.getTime();
                    UserAdv.update(Meteor.userId(),{
                     $set:{
                       index9time : time, index8mins : Math.round((time - index.index8time) / 1000)
                         }

                      });
                  }
                    hypPush('task1');
                    BlazeLayout.render('end');
                }
                if (index.currentIndex  >= 10)
                {
                    window.location.href = path_new + "/error";
                }
                return false;

              }

            }
          }
        );


      }else
      {
        window.location.href = path_new + "/error4";
        return false;
      }
    }
  });

  CurrentIndex = -1;
  TaskIndex = -1;

  Tracker.autorun(function checkMultipleLogins() {
    const user = UserAdv.findOne({"_id" : Meteor.userId()});//Meteor.user();
    const captcha = Captcha.findOne({"_id" : Meteor.userId()});
    
    var cpt = document.getElementById("captcha");
    var cpt1 = document.getElementById("captcha_field");
    if (cpt != undefined)
    {
      if (captcha != undefined)
    {
      cpt.src = captcha.test   
    }
    }

    if (cpt1 != undefined)
    {
      if (captcha != undefined)
    {
      if (captcha.didSucceed)
      {
        cpt1.style.display = "none";
        document.getElementById("submit_field").style.display = "inline";
      }else
      {
        cpt1.style.display = "inline";
        document.getElementById("submit_field").style.display = "none";
      }   
    }
    }



    if (user == undefined)
    {
      return;
    }
    if (user.username == "ASSIGNMENT_ID_NOT_AVAILABLE")
    {
      return;
    }
    if (CurrentIndex == -1)
    {
      return;
    }

    if (!window.location.href.includes("/error")  && assignment_Id != "" && assignment_Id != undefined && assignment_Id != null && user.assignment_Id != "" && user.assignment_Id != undefined && user.assignment_Id != null)
    {
      if (assignment_Id !== user.assignment_Id)
      {
        alert("You will be paid with the HIT that has the assignment ID " + user.assignment_Id + " this HIT assignment ID doesn't match that assignment Id!");
      }
    }
    // alert("here");

    // if (CurrentIndex == 8 && CurrentIndex != user.currentIndex)
    // {
    //   //setTimeout(() => {  location.reload(); }, 3000);
    //   return;
    // }
    if (user.improvementScreen == true && has_seen_cpy == false && user.hasSeen == true)
    {
      //alert(Template.instance())
      location.reload();
       
      return;
    }
    if (user.improvementScreen != is_in_the_imp)
    {
      location.reload()
    }
    // if (user.improvementScreen == true && is_in_the_imp == false)
    // {
    //   //alert(Template.instance())
      
    //       location.reload();
       
    //   return;
    // }

    if (just_here_cpy != user.just_here)
    {
      location.reload();
      return;
    }

    if (user.improvementSelection != IMPROVEMENT)
    {
      location.reload();
      return;
    }

    if (CurrentIndex != user.currentIndex)
    {
      //setTimeout(() => {  location.reload(); }, 1000);
      location.reload();
      return;
    }

    if (TaskIndex == -1)
    {
      return;
    }

   
    if (CurrentIndex == 4){
      

    if (TaskIndex != user.tutInd)
    {
      location.reload();
    }
  }


  if (CurrentIndex == 6){

  if (TaskIndex != user.taskInd)
  {
    //setTimeout(() => {  location.reload(); }, 1000);
    location.reload();
    return;

  }
  }

  
    
    // console.log(BlazeLayout);
    // return;
    //
    // var str = path_new + "/error1";
    // var res = reg_m(window.location.href);
    // if (user.profile.isBlocked && !res)
    // {
    //   //alert(res);
    //   //alert("You cannot have multiple sessions from the same account, please close the other sessions to the server! We Logged You Out From All The Sessions!");
    //   window.location.href = str;
    // }
  });
