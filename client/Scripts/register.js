import jst from 'jStat';

gup_get_pr = function(path){
    var regexS ="[(]"+"([^)]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec(path);
    if( results == null )
      return "";
    else
      return results[1];
 }


gup = function(path, name){
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec(path);
    if( results == null )
      return "";
    else
      return results[1];
 }

makePerson = function(num)
{
  var user_race = ((Math.random() > 0.5) ? FIRST_RACE : SECOND_RACE);
  var rd_val = 0;
  if (num == 0)
  { 
    var index_credit = Math.floor(Math.random() * (assignable_credit_last_index))
    return [user_race, credit_ranges[index_credit], index_credit];
  }else
  {
    var index_credit = Math.floor(Math.random() * (credit_ranges_flw.length))
    return [user_race, credit_ranges_flw[index_credit], index_credit];
  }
}

onlyUnique = function(value, index, self) {
  return self.indexOf(value) === index;
}




getRandomPics = function(arr, size) {
  var bucket = d3.shuffle(d3.range(arr.length));
  var bucket_ret = [];
  var size_save = size;
  while(size) {
    size--;
    bucket_ret.push(pictures[bucket.pop()]);
  }
  if ( (bucket_ret.filter(onlyUnique)).length != size_save)
  {
    return getRandomPics(arr,size_save);
  }

  return bucket_ret;
}
// Accounts.onLogin(function(user){
//   UserStatus.events.on("connectionLogin", function(fields) {
//     $count = UserStatus.connections.find({userId : fields.userId}).count();
//     console.log('Total log ins : ' + $count);
//   });
// });
makeWork = function(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
regAccount = function()
{
  if (Meteor.user()) {

    

    const channel = new BroadcastChannel('app-data');
    channel.postMessage(Meteor.userId());
      var consent = "false";
      var fairness =  ((Math.random() > 0.5) ? 1 : 0);
      var deception = 0; //((Math.random() > 0.5) ? 1 : 0);
      var improvementScheme = 0; //getRandomInt(0,3);
      var box =  0; //((Math.random() > 0.5) ? 1 : 0);
      var ifrm = "probablyFireFox";
    if (document.location != undefined)
    {
      if (document.location.ancestorOrigins != undefined)
      {
        ifrm = ((document.location.ancestorOrigins[0] == undefined) ? "undefined" : document.location.ancestorOrigins[0]);
      }
      else
      {
        ifrm = ((document.referrer == undefined) ? "undefined" : document.referrer); 
      }
    }
    //console.log(document.location.ancestorOrigins[0]);
      
      var values = makePerson(0);
      var years = getRandomInt(10,21);
      var rent =  ((Math.random() > 0.5) ? "Rent" : "Own");
      var cr_opt = career[Math.floor(Math.random() * career.length)];
      var date_start = new Date();
      var milli_start = date_start.getTime();
      CurrentIndex = 0;
      

      if (worker_Id === "ASSIGNMENT_ID_NOT_AVAILABLE")
      {
        UserAdv.insert({_id : Meteor.userId(),blocked : 0,quiz_pop_up : false,quiz_times : 0,atmp : 0,sp : 2,dataPermission : 'null',captcha : false,ip_address : 0,box : box,start_time : milli_start,amtId: worker_Id ,currTask : 1,tutInd : 0,taskInd: 0, improvementScreen : false, career : cr_opt, rent : rent,years : years ,nickname : 'None' ,image_url : 'None',ml_decision : false,tutorial : true, fairness : fairness,ended : false, credibility : values[1],user_budget : initial_budget, deception : deception, improvementSelection : 0, improvementScheme : improvementScheme ,initial_credit_score : values[1] ,index_credit : values[2] , improvementOrder : "", just_here : false , hasSeen : false, race : 'null' , isQualified : false, isSucces : false, show_end : false,assignment_Id : assignment_Id, hit_id : hit_Id, currentIndex : CurrentIndex, total : 0 , consent : consent, turkSubmitTo : turkSubmitTo}, function( error, result) {
          if ( error ) {return false;} //info about what went wrong
          if ( result ) {BlazeLayout.render('home'); return true;} //the _id of new object if successful
        });
      }else
      {
        if ((worker_Id == "" || worker_Id == undefined) || (assignment_Id == "" || assignment_Id == undefined) || (hit_Id == "" || hit_Id == undefined))
        {
          window.location.href = path_new + "/error3";
          return false;
        }
        UserAdv.insert({_id : Meteor.userId(),blocked : 0,quiz_pop_up : false,quiz_times : 0,asi_fin : -1,t_z : -1,fing_old : -1,dataPermission : 'null', attention_for_bonus: -1,authenticationId : -1,tecna : false,strt_frm : ifrm,atmp : 0,sp : 2,captcha : false,ip_address : 0,box : box,start_time : milli_start,amtId: worker_Id ,currTask : 1,tutInd : 0,taskInd: 0, improvementScreen : false, career : cr_opt, rent : rent,years : years ,nickname : 'None' ,image_url : 'None',ml_decision : false,tutorial : true, fairness : fairness,ended : false, credibility : values[1],user_budget : initial_budget, deception : deception, improvementSelection : 0, improvementScheme : improvementScheme ,initial_credit_score : values[1] ,index_credit : values[2] , improvementOrder : "", just_here : false , hasSeen : false, race : 'null' , isQualified : false, isSucces : false, show_end : false,assignment_Id : assignment_Id, hit_id : hit_Id, currentIndex : CurrentIndex, total : 0 , consent : consent, turkSubmitTo : turkSubmitTo}, function( error, result) {
          if ( error ) {return false;} //info about what went wrong
          if ( result ) {BlazeLayout.render('home'); return true;} //the _id of new object if successful
        });
      }
      



   }
}

var accCreat = function (registerData)
{
  Accounts.createUser(registerData, function(error) {

     if (Meteor.user()) {

      return regAccount();

     } else {
        console.log("ERROR: " + error.reason);
        return false;
        //alert("ERROR: " + error.reason);
     }
  });
}

// Accounts.onLogin(function () {
//     Meteor.logoutOtherClients();
// });
var reg_m = function(path){
    var regexS = "error1";
    var regex = new RegExp( regexS );
    var results = regex.exec(path);
    if( results == null )
      return false;
    else
      return true;
 }




Template.HOME.helpers(
     {
       'starter' : function()
       {

         var path = window.location.href;
         worker_Id = gup(path, 'workerId');
         assignment_Id = gup(path, 'assignmentId');
         turkSubmitTo = gup(path, 'turkSubmitTo');
         hit_Id = gup(path, 'hitId');

         //tabID = sessionStorage.tabID ? sessionStorage.tabID : sessionStorage.tabID = Math.random();
         // Meteor.call('is_online', worker_Id, function (error, result) {
         //
         //   if (error)
         //   {
         //     console.log(error);
         //   }
         //     else {
         //       alert(result);
         //       if (result == true)
         //       {
         //         alert("You cannot have multiple sessions from the same account, please close the other sessions to the server! We Logged You Out From All The Sessions!");
         //         window.location.href = path_new + "/error1";
         //       }
         //     }
         //   }
         // );

        

         if (assignment_Id == "ASSIGNMENT_ID_NOT_AVAILABLE")
         {
             worker_Id = "ASSIGNMENT_ID_NOT_AVAILABLE";
         }

         Meteor.call('check_ID', worker_Id, function (error, result) {

          if (error)
          {
            console.log(error);
          }
            else {
              if (result == true)
              {
                   window.location.href = path_new + "/error";
              }

            }
          }
        );
         
         

        var order = UserAdv.findOne({"_id" : Meteor.userId()});

        if (order == undefined || (worker_Id != "" && order.amtId != worker_Id))
        {

          Meteor.logout(function(error) {

          if(error) {
            console.log("ERROR: " + error.reason);
          }
          });
        }


         if (worker_Id == "" && !Meteor.userId())
         {
           //window.location.href = "/";
          //  swal({
          //        title: 'Warning!',
          //        text: "Access here through AMT! If through AMT, please refresh the page!",
          //        type: 'warning',
          //        allowOutsideClick: false,
          //        confirmButtonColor: '#3085d6',
          //        confirmButtonText: 'OK'
          //        }).then(function(isConfirm) {
          //          if (isConfirm.value===true) {
          //            console.log("isConfirm");
          //          }
          //        });
          window.location.href = path_new + "/error3";
           return;
         }


         if (!Meteor.userId()){

          //console.log("Here");
           Meteor.loginWithPassword(worker_Id, worker_Id, function(error) {

              if (Meteor.user()) {
              //Meteor.call('update_hash', [Meteor.user(),tabID]);
              const channel = new BroadcastChannel('app-data');
              channel.postMessage(Meteor.userId());
              BlazeLayout.render('home');
              return true;

              } else {
                 console.log("ERROR: " + error.reason);
                 var registerData =
                 {
                    username: worker_Id,
                    password: worker_Id
                 }
                 return accCreat(registerData);
              }

         });


         }

      return false;

  },
       'example': function()
       {

           var order = UserAdv.findOne({"_id" : Meteor.userId()});

           if (order == undefined)
           {
             error_handle();
           }
           //console.log("Here!");
           if (order.currentIndex != 0)
           {
             window.location.href = path_new + "instructions";
           }
           return true;
       }
     });
