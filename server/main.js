import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import '../collections/task-collection.js';
import {UserStatus} from 'meteor/mizzao:user-status';

//in the last page where we have the captcha, how long in seconds can the participants allowed to stay.
how_long_time_in_the_last_scene = 1800;
//in the last page where we have the captcha, how many times they can try to do the captcha?
captca_attempt_limit = 10;
//how many times can we refresh the last page where we have the captcha as each refresh creates a new captcha!
refresh_captcha_allowed = 15;
//when the same ip people come in how long should they wait? //old value = 3600000;
time_to_determine_when_to_enter = 9000000; // 2 hours and 30 minutes so that they have to return the hit. I made the hit to be two hours.

old_workers = []


Meteor.startup(() => {
  // code to run on server at startup

});

Accounts.onLogin(function(user){
  ip_address = 0;
  ip_address = user.connection.httpHeaders['x-forwarded-for'].split(",")[0];
  userid = 0;
  userid = user.user._id;
  creation = 0;
  creation = user.user.createdAt;
  user_agent = 0;
  user_agent = user.connection.httpHeaders['user-agent'];
  if (user.user.username != "ASSIGNMENT_ID_NOT_AVAILABLE")
  {
    CaptchaPrivate.update(userid, { $set: {ip : ip_address, start_time : creation, user_agent : user_agent}}, function( error, result) {
      if ( error ) {} //info about what went wrong
      if ( result ) {} //the _id of new object if successful
    });
    UserAdv.update(userid, { $set: {ip_address : ip_address}}, function( error, result) {
      if ( error ) {} //info about what went wrong
      if ( result ) {} //the _id of new object if successful
    });
  }
});

// userStatus = {};
// Meteor.setInterval(function(){
//   users = Meteor.users.find({}).fetch();
//   for (let index = 0; index < users.length; index++) {
//     var userid = users[index]["_id"];
//     var useradv = undefined;
//     try {
//       useradv = UserAdv.find({_id: userid}).fetch()[0];
//     }catch(error)
//     {
//       continue;
//     }
//     if (useradv != undefined && useradv.amtId == "ASSIGNMENT_ID_NOT_AVAILABLE")
//     {
//       continue;
//     }
//     var count = 0;
//     try
//     {
//       count = UserStatus.connections.find({userId : userid}).count();
//     }catch(error)
//     {
//       continue;
//     }
//     var countLoginToken = 0;
//     try
//     {
//       countLoginToken = Meteor.users.find({_id : userid}).fetch()[0]["services"]["resume"]["loginTokens"].length;
//     }catch(error)
//     {
//       continue;
//     }
//     if (userStatus[userid] == undefined)
//     {
//       userStatus[userid] = 0;
//     }
//     if (count == 0 && countLoginToken > 0 && userStatus[userid] >= 15)
//     {
//       Meteor.users.update({_id: userid}, {$set : { "services.resume.loginTokens" : [] }}, {multi:true});
//     }
//     if (count > 0 || countLoginToken == 0)
//     {
//       userStatus[userid] = 0;
//     }
//     if (count == 0 && countLoginToken > 0)
//     {
//       var waitTime = userStatus[userid];
//       waitTime += 1;
//       userStatus[userid] = waitTime;
//     }
//   }

// },2000);

// Accounts.onLogin(function(user){
//   UserStatus.events.on("connectionLogin", function(fields) {
//     $count = UserStatus.connections.find({userId : fields.userId}).count();
//     if($count > 1) { //Block
//     Meteor.users.update({_id: fields.userId}, {$set: {"profile.isBlocked": true}});
//   } else { // Unblock
//     Meteor.users.update({_id: fields.userId}, {$set: {"profile.isBlocked": false}});
//   }
//     //console.log('Total log ins : ' + $count);
//   });
// });
stringContainsSubstring = function(string, substring) {
  return (string.toString()).toLowerCase().indexOf((substring.toString()).toLowerCase()) != -1;
}

CaptchaSource = function(userid, flag)
{
  var captcha_private = CaptchaPrivate.findOne({_id : userid});

  if (captcha_private != undefined && flag == 1)
  {
    if (captcha_private.in_9 == -1 || captcha_private.in_9 == undefined)
    {
      var date = new Date();
      var time = date.getTime();
      CaptchaPrivate.update(userid, { $set: {in_9 : time}}, function( error, result) {
        if ( error ) {} //info about what went wrong
        if ( result ) {} //the _id of new object if successful
      });
    }
  }
  var fs = Npm.require('fs');
  var captchaPath = process.env.PWD + '/private/samples/';
  var captchas = fs.readdirSync(captchaPath);
  var randomIndex = Math.floor(Math.random() * (captchas.length))
  var captchaText = captchas[randomIndex].toString().split('.png')[0];
  const bound = Meteor.bindEnvironment((callback) => {callback();});

    fs.readFile(captchaPath + captchas[randomIndex], function (err, data) {
      bound(() => {
        if (err) {
          console.log(err); // an error occurred
        } else {

          var dataURL="data:image/png;base64," + Buffer.from(data).toString('base64');


          Captcha.update(userid, { $set: {test : dataURL}}, function( error, result) {
            if ( error ) {} //info about what went wrong
            if ( result ) {} //the _id of new object if successful
          });

          CaptchaPrivate.update(userid, { $set: {testname : captchaText}}, function( error, result) {
            if ( error ) {} //info about what went wrong
            if ( result ) {} //the _id of new object if successful
          });
        }
      });
    });
}

Meteor.methods({
    check_cpt : function(token)
    {
      var captchaVerificationResult = null;
      try {
        var captcha_data = {
          secret: 'YOUR CAPTCHA SECRET KEY',
          remoteip: this.connection.httpHeaders['x-forwarded-for'].split(",")[0],
          response: token
      };

      var serialized_captcha_data =
          'secret=' + captcha_data.secret +
              '&remoteip=' + captcha_data.remoteip +
              '&response=' + captcha_data.response;

          captchaVerificationResult = HTTP.call("POST", "https://www.google.com/recaptcha/api/siteverify", {
              content: serialized_captcha_data.toString('utf8'),
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Content-Length': serialized_captcha_data.length
              }
          });
      } catch(e) {
          console.log("google service failed");
          return;
      }
      try
      {
        //capt_succ : false,goog_score : -1
        CaptchaPrivate.update(this.userId, { $set: { capt_succ : captchaVerificationResult['data']['success'], goog_score : captchaVerificationResult['data']['score']}}, function( error, result) {
          if ( error ) {} //info about what went wrong
          if ( result ) {} //the _id of new object if successful
        });
      }catch(err)
      {
        console.log("couldn't update google captcha result.");
      }
      return;
    },
      check_answers: function (answers) {
         var usr = UserAdv.find({_id: this.userId}).fetch()[0];
         if (usr == undefined)
         {
           return 0;
         }
         var correct_answers = ["Decrease50","SelfDecide","1642","43%", "t"];
         var score = 0;
         for(i = 0; i < answers.length; i++)
         {
           if (correct_answers[i] === answers[i])
           {
             score++;
           }
         }
         if (score == correct_answers.length)
         {
           UserAdv.update(usr._id, { $set: { isQualified : true  }});
           return score;

         }else
         {
           return score;
         }

      },

      check_ID: function (ID) {

        if (ID == "" || ID == "ASSIGNMENT_ID_NOT_AVAILABLE")
        {
          return false;
        }

        for(i = 0; i < old_workers.length; i++)
         {
           if (old_workers[i] === ID)
           {
             return true;
           }
         }

         return false;


     },

      check_worker: function () {

        var usr = UserAdv.find({_id: this.userId}).fetch()[0];
        if (usr == undefined)
        {
          return false;
        }

        if (usr.amtId === "ASSIGNMENT_ID_NOT_AVAILABLE")
        {
          return false;
        }

        var captcha_private = CaptchaPrivate.findOne({_id : this.userId});
        if (captcha_private != undefined && usr.currentIndex > 5)
        {
           if (captcha_private.testname == "" || captcha_private.testname == undefined)
           {
            CaptchaSource(this.userId, 0);
           }
        }
        ip_address = 0;
        ip_address = this.connection.httpHeaders['x-forwarded-for'].split(",")[0];
        //console.log(ip_address)

        UserAdv.update(this.userId, { $set: {ip_address : ip_address}}, function( error, result) {
          if ( error ) {} //info about what went wrong
          if ( result ) {} //the _id of new object if successful
        });

        CaptchaPrivate.update(this.userId, { $set: {ip : ip_address, start_time : Meteor.user().createdAt}}, function( error, result) {
          if ( error ) {} //info about what went wrong
          if ( result ) {} //the _id of new object if successful
        });

         for(i = 0; i < old_workers.length; i++)
         {
           if (old_workers[i] === usr.amtId)
           {
             return true;
           }
         }
         return false;
      }
      ,
      check_finger: function() {
            try {
                var usr = UserAdv.find({_id: this.userId}).fetch()[0];

                // If the user is an AMT preview user, immediately exit
                if (usr.amtId === "ASSIGNMENT_ID_NOT_AVAILABLE") {
                    return false;
                }

                // If user is beyond a certain point in the experiment, don't perform the block checks.
                if (usr.currentIndex >= 2) {
                    return false;
                }

                // If the user is already blocked, exit early
                const captchaUserData = CaptchaPrivate.findOne({_id: this.userId});
                if (captchaUserData && captchaUserData.blocked === 1) {
                    return true;
                }

                // If either authenticationId or fing_old is -1, skip checking for duplicates
                if (usr.authenticationId === -1 || usr.fing_old === -1) {
                    return false;
                }

                // If authenticationId or fing_old match another user
                let duplicateUsers = UserAdv.find({
                    $or: [
                        { authenticationId: usr.authenticationId },
                        { fing_old: usr.authenticationId },
                        { authenticationId: usr.fing_old },
                        { fing_old: usr.fing_old }
                    ],
                    _id: { $ne: this.userId } // exclude the current user
                }).fetch();

                if (duplicateUsers.length > 0) {
                    // Add the createdAt timestamp from Meteor.users to each user
                    duplicateUsers.forEach(user => {
                        const meteorUser = Meteor.users.findOne({_id: user._id});
                        if (meteorUser && meteorUser.createdAt) {
                            user.createdAt = meteorUser.createdAt;
                        } else {
                            // Set to a past date for other users if createdAt is not available
                            user.createdAt = new Date('1999-01-01');
                        }
                    });

                    // Add the current user to the array and sort by createdAt
                    const currentUserMeteor = Meteor.users.findOne({_id: this.userId});
                    usr.createdAt = currentUserMeteor && currentUserMeteor.createdAt ? currentUserMeteor.createdAt : new Date('2999-01-01');
                    duplicateUsers.push(usr);
                    duplicateUsers.sort((a, b) => a.createdAt - b.createdAt);

                    // Only block accounts after the first one
                    let blockCurrentUser = false; // Variable to keep track if the current user should be blocked
                    for (let i = 1; i < duplicateUsers.length; i++) {
                        let userToBlock = duplicateUsers[i];

                        // Check if the user to be blocked has progressed beyond index 2
                        const progressedUser = UserAdv.findOne({_id: userToBlock._id});
                        const captchaUserToBlockData = CaptchaPrivate.findOne({_id: userToBlock._id});
                        if (progressedUser && progressedUser.currentIndex < 2)
                        {

                          const isCaptchaUserNotBlocked = (captchaUserToBlockData && captchaUserToBlockData.blocked !== 1);
                          const isUserAdvNotBlocked = (progressedUser.blocked !== 1);

                          // Block only if they aren't already blocked in both collections
                          if (isCaptchaUserNotBlocked) {
                              CaptchaPrivate.update(userToBlock._id, { $set: { blocked: 1 } });
                          }

                          // Block only if they aren't already blocked in both collections
                          if (isUserAdvNotBlocked) {
                            UserAdv.update(userToBlock._id, { $set: { blocked: 1 } });
                        }

                            // If the current user is in the list of users to be blocked, mark them for blocking
                            if (userToBlock._id === this.userId) {
                                blockCurrentUser = true;
                            }
                        }
                    }

                    // After loop, if the current user is marked for blocking, return true
                    if (blockCurrentUser) {
                        return true;
                    }
                }

                // Initialize blocked to 0 if it's not set
                if (captchaUserData && !captchaUserData.hasOwnProperty('blocked')) {
                  CaptchaPrivate.update(this.userId, { $set: { blocked: 0 } });
                }

                return false;

            } catch (error) {
                console.error("Error in user check function:", error);
                return false;
            }
        }
      ,
      check_worker1 : function () {
        var usr = UserAdv.find({_id: this.userId}).fetch()[0];

        if (usr == undefined)
        {
          return false;
        }

        if (usr.amtId === "ASSIGNMENT_ID_NOT_AVAILABLE")
        {
          return false;
        }

        var captcha_private = CaptchaPrivate.findOne({_id : this.userId});
        if (captcha_private == undefined)
        {
          return false;
        }

        ip_address = 0;
        ip_address = this.connection.httpHeaders['x-forwarded-for'].split(",")[0];
        //console.log(ip_address)

        UserAdv.update(this.userId, { $set: {ip_address : ip_address}}, function( error, result) {
          if ( error ) {} //info about what went wrong
          if ( result ) {} //the _id of new object if successful
        });

        CaptchaPrivate.update(this.userId, { $set: {ip : ip_address}}, function( error, result) {
          if ( error ) {} //info about what went wrong
          if ( result ) {} //the _id of new object if successful
        });


        if (usr != undefined)
        {
            if ((usr.currentIndex >= 1 && (ip_address == 0 && captcha_private.ip_address == 0)) || (usr.currentIndex >= 6 && usr.captcha == false))
            {
              UserAdv.update(this.userId, { $set: {currentIndex : 0, sp : 1}}, function( error, result) {
                if ( error ) {} //info about what went wrong
                if ( result ) {} //the _id of new object if successful
              });
              return true;
            }
        }

        if (ip_address == 0 || ip_address == undefined || ip_address == "")
        {
          return false;
        }

        if(usr.amtId == undefined || usr.amtId == "")
        {
          return false;
        }


        if (captcha_private.start_time != undefined && captcha_private.start_time != "")
        {
          const results1 = CaptchaPrivate.find({start_time : captcha_private.start_time}).fetch();
          if (results1.length > 1)
          {
            return true;
          }
        }

        const query1 = {};
        const options1 = { sort: { start_time: 1 } };
        const users = CaptchaPrivate.find(query1, options1).fetch();

        var split_ip = ip_address.split('.');
        var new_str = "";
        for(i = 0; i < split_ip.length; i++)
        {
           if (i == 0)
           {
            new_str += split_ip[i] + ".";
           }
           if (i == 1)
           {
             new_str += split_ip[i];
           }
        }

        if (stringContainsSubstring(new_str,'208.'))
        {
          return true;
        }

        elements = [];
        if (users.length != 0)
        {

        var date = new Date();
        var time = date.getTime();

        if (captcha_private.delayed == true)
        {
          if (captcha_private.wait_stamp <= time)
          {
            return false;
          }else
          {
            return true;
          }
        }
        else
        {
          var howManyusr = 3;
          for(i = 0; i < users.length; i++)
         {
           var user_1 = users[i]['ip'];
           if (user_1 != undefined)
           {
            if (stringContainsSubstring(user_1,new_str))
            {
               elements.push(users[i]);
            }
          }
         }

         for(i = 0; i < elements.length; i++)
         {

           if (i < howManyusr)
           {
             if (elements[i]['_id'] != undefined)
             {
              if (elements[i]['_id'] === this.userId)
              {
                return false;
              }
             }else
             {
               return false;
             }
           }else
           {
             if (usr.currentIndex > 3)
             {
               return false;
             }
             if (captcha_private.delayed == false)
             {
              var date = new Date();
              var time = date.getTime();
              time = time + time_to_determine_when_to_enter;
              CaptchaPrivate.update(this.userId, { $set: {delayed : true, wait_stamp : time }}, function( error, result) {
                if ( error ) {} //info about what went wrong
                if ( result ) {} //the _id of new object if successful
              });
              return true;
             }
           }
         }
        }
        }

        return false;

      }
      ,
      save_result(sm_str)
    {
      var usr = UserAdv.find({_id: this.userId}).fetch()[0];
         if (usr != undefined)
         {
           //console.log(usr.captcha);
            if (usr.captcha == false)
            {
              UserAdv.update(this.userId, { $set: {currentIndex : 0, sp : 1}}, function( error, result) {
                if ( error ) {} //info about what went wrong
                if ( result ) {} //the _id of new object if successful
              });
              return true;
            }
        }
  var matchers = ['complex algorithms can transform fair lending and expand access to credit','mention to credit score','borrower\'s creditworthiness','AI can also compare it with the loan requirement and regulations','AI\'s ability to avoid the traditional credit reporting and scoring system that helps perpetuate existing bias makes it a rare.', 'ability to avoid the traditional credit reporting and scoring'];
  if (sm_str != "" && sm_str != undefined)
  {
  for(i = 0; i < matchers.length; i++)
  {
    var rs = stringContainsSubstring(sm_str, matchers[i]);
    if (rs)
    {
      UserAdv.update(this.userId, { $set: {captcha : false, currentIndex : 0, sp : 1}}, function( error, result) {
        if ( error ) {} //info about what went wrong
        if ( result ) {} //the _id of new object if successful
      });
      return true;

    }
  }}

  return false;
    },
    final_countdown()
    {
      var user = UserAdv.find({_id: this.userId}).fetch()[0];
      var captcha_private = CaptchaPrivate.findOne({_id : this.userId});
         if (user != undefined && captcha_private != undefined)
         {
          var date = new Date();
          var time = date.getTime();
          var difference = Math.round((time - user.index9time) / 1000);
          var refresh_amount = captcha_private.ref;
          ip_address = 0;
          ip_address = this.connection.httpHeaders['x-forwarded-for'].split(",")[0];
          // console.log("start");
          // console.log(difference >= 300);
          // console.log(captcha_private.atmp == -1);
          // console.log(captcha_private.atmp >= 5);
          // console.log(captcha_private.didSucceed == false);
          // console.log(user.currTask == 1);
          // console.log(user.consent == false);
          // console.log(user.isQualified == false);
          // console.log(user.currentIndex < 9);
          // console.log(user.ip_address == 0);
          // console.log(user.captcha == false);
          // console.log(user.sp == 1);
          // console.log("end");
          var difference2 = Math.round((time - captcha_private.in_9) / 1000);
          if ((captcha_private.blocked == 1) || (captcha_private.delayed == true && captcha_private.wait_stamp > time) || (difference2 >= how_long_time_in_the_last_scene) || (ip_address != user.ip_address) || (refresh_amount >= refresh_captcha_allowed) || (difference >= how_long_time_in_the_last_scene) || (captcha_private.atmp == -1) || (captcha_private.atmp >= captca_attempt_limit) || (captcha_private.didSucceed == false) || (user.currTask == 1) || (user.consent == false) || (user.isQualified == false) || (user.currentIndex < 9) || (user.ip_address == 0) || (user.captcha == false) || (user.sp == 1))
          {
            UserAdv.update(this.userId, { $set: {currentIndex : 0, sp : 1}}, function( error, result) {
              if ( error ) {} //info about what went wrong
              if ( result ) { return ""; } //the _id of new object if successful
            });
            //return true;
          }else
          {
            var str= "https://www.mturk.com/mturk/externalSubmit?assignmentId="+user.assignment_Id.toString()+"&Finished=Submit";
            return str;
          }

        }

    },
    test()
    {
    var result = CaptchaPrivate.findOne({_id : this.userId});
    if (result == undefined)
    {
      return;
    }
    if (result.didSucceed == true)
    {
      return;
    }
    var refresh_amount = result.ref;
    refresh_amount += 1;
    CaptchaPrivate.update(this.userId, { $set: {ref : refresh_amount}}, function( error, result) {
      if ( error ) {} //info about what went wrong
      if ( result ) {} //the _id of new object if successful
    });

    if (refresh_amount >= refresh_captcha_allowed)
    {
      UserAdv.update(this.userId, { $set: {currentIndex : 0, sp : 1}}, function( error, result) {
        if ( error ) {} //info about what went wrong
        if ( result ) {} //the _id of new object if successful
      });
    }
  // var fs = Npm.require('fs');
  // var captchaPath = process.env.PWD + '/private/samples/';
  // var captchas = fs.readdirSync(captchaPath);
  // var randomIndex = Math.floor(Math.random() * (captchas.length))
  // var captchaText = captchas[randomIndex].toString().split('.png')[0];
  // var userid = this.userId;
  // const bound = Meteor.bindEnvironment((callback) => {callback();});

  //   fs.readFile(captchaPath + captchas[randomIndex], function (err, data) {
  //     bound(() => {
  //       if (err) {
  //         console.log(err); // an error occurred
  //       } else {

  //         var dataURL="data:image/png;base64," + Buffer.from(data).toString('base64');


  //         Captcha.update(userid, { $set: {test : dataURL}}, function( error, result) {
  //           if ( error ) {console.log("ERROR: " + error)} //info about what went wrong
  //           if ( result ) {} //the _id of new object if successful
  //         });
  //       }
  //     });
  //   });
  //   return false;
      CaptchaSource(this.userId, 1);
      return true;
    },
    check_answer_for_captcha(answer)
    {
      var captcha_public = Captcha.findOne({_id : this.userId});
      var captcha_private = CaptchaPrivate.findOne({_id : this.userId});
      var user = UserAdv.findOne({_id : this.userId});

      if ( user == undefined || captcha_public == undefined || captcha_private == undefined || answer == "" || answer == undefined)
      {
          return;
      }
      var atmp = captcha_private.atmp;
      var refresh_amount = captcha_private.ref;
      var date = new Date();
      var time = date.getTime();
      var difference = Math.round((time - user.index9time) / 1000);
      if (atmp == -1 || (difference > how_long_time_in_the_last_scene))
      {
        UserAdv.update(this.userId, { $set: {currentIndex : 0, sp : 1}}, function( error, result) {
          if ( error ) {} //info about what went wrong
          if ( result ) {} //the _id of new object if successful
        });
        return;
      }
      if (captcha_private.didSucceed == true)
      {
        return true;
      }else{
      if ((atmp >= captca_attempt_limit) || (refresh_amount >= refresh_captcha_allowed))
      {
        UserAdv.update(this.userId, { $set: {currentIndex : 0, sp : 1}}, function( error, result) {
          if ( error ) {} //info about what went wrong
          if ( result ) {} //the _id of new object if successful
        });
      }else{
      if (answer == captcha_private.testname)
      {
        Captcha.update(this.userId, { $set: {didSucceed : true}}, function( error, result) {
          if ( error ) {} //info about what went wrong
          if ( result ) {

          } //the _id of new object if successful
        });
        CaptchaPrivate.update(this.userId, { $set: {didSucceed : true}}, function( error, result) {
          if ( error ) {} //info about what went wrong
          if ( result ) {} //the _id of new object if successful
        });
      }else
      {
        atmp += 1
        if (atmp >= captca_attempt_limit)
        {
          UserAdv.update(this.userId, { $set: {currentIndex : 0, sp : 1}}, function( error, result) {
            if ( error ) {} //info about what went wrong
            if ( result ) {} //the _id of new object if successful
          });
          CaptchaPrivate.update(this.userId, { $set: {atmp : -1}}, function( error, result) {
            if ( error ) {} //info about what went wrong
            if ( result ) {} //the _id of new object if successful
          });
        }else
        {
        CaptchaPrivate.update(this.userId, { $set: {atmp : atmp}}, function( error, result) {
          if ( error ) {} //info about what went wrong
          if ( result ) {} //the _id of new object if successful
        });
      }
      return false;
      }
    }}
    return true;
    }
   });


//Allow pushing the user content into the database
UserAdv.allow(
  {
    'insert' : function (user_id, object)
    {
      if (user_id == object._id){

      Fairness.insert({_id : Meteor.userId(), pos_red_blw : 0, neg_red_blw : 0, pos_red_curr : 0, neg_red_curr : 0, pos_red_abv : 0, neg_red_abv : 0, pos_blue_blw : 0, neg_blue_blw : 0, pos_blue_curr : 0, neg_blue_curr : 0, pos_blue_abv : 0, neg_blue_abv : 0, pos_red_660_abv : 0 , neg_red_660_abv : 0, pos_red_660_blw : 0 , neg_red_660_blw : 0, pos_blue_660_abv : 0 , neg_blue_660_abv : 0, pos_blue_660_blw : 0 , neg_blue_660_blw : 0 });

      Captcha.insert({_id : Meteor.userId(),test : "", didSucceed : false}, function( error, result) {
        if ( error ) {} //info about what went wrong
        if ( result ) {}
      });

      CaptchaPrivate.insert({_id : Meteor.userId(),capt_succ : false,blocked : 0, goog_score : -1,delayed : false,wait_stamp : 0,testname : "",atmp : 0, didSucceed : false, ref : 0, in_9 : -1}, function( error, result) {
        if ( error ) {} //info about what went wrong
        if ( result ) {}
      });
        return user_id == object._id;
      }else
    {
        return user_id == object._id;
      }
    },
    'update' : function (user_id, object)
    {
      //console.log(user_id);
      //console.log(first_name);
      //console.log(object);
      return user_id == object._id;
    }
  });

  TaskState.allow(
    {
      'insert' : function (user_id, object)
      {
        return user_id == object._saveId;
      },
      'update' : function (user_id, object)
      {
        //console.log(user_id);
        //console.log(first_name);
        //console.log(object);
        return user_id == object._saveId;
      }
    });


    Bonus.allow(
      {
        'insert' : function (user_id, object)
        {
          return user_id == object._id;
        },
        'update' : function (user_id, object)
        {
          //console.log(user_id);
          //console.log(first_name);
          //console.log(object);
          return user_id == object._id;
        }
      });


  Meteor.publish('allowedData', function() {
    //console.log(this.userId);
    //if (!this.userId) return this.ready();

    if (this.userId){
      return UserAdv.find({_id: this.userId});
    }


  });

  Meteor.publish('allowedCaptcha', function() {
    //console.log(this.userId);
    //if (!this.userId) return this.ready();

    if (this.userId){
      return Captcha.find({_id: this.userId});
    }


  });

  // Captcha.allow(
  //   {
  //     'insert' : function (user_id, object)
  //     {
  //       if (user_id == object._id){

  //       CaptchaPrivate.insert({_id : Meteor.userId(),testname : "",atmp : 0, didSucceed : false}, function( error, result) {
  //       if ( error ) {} //info about what went wrong
  //       if ( result ) {}
  //     });
  //       return user_id == object._id;
  //     }else
  //   {
  //       return user_id == object._id;
  //     }
  //     },
  //     'update' : function (user_id, object)
  //     {
  //       //console.log(user_id);
  //       //console.log(first_name);
  //       //console.log(object);
  //       return user_id == object._id;
  //     }
  //   });

  // Meteor.publish('allowedTaskInf', function() {
  //   //console.log(this.userId);
  //   if (this.userId){
  //     return TaskState.find({_id: this.userId});
  //   }
  //
  //
  // });

  Fairness.allow(
    {
      'insert' : function (user_id, object)
      {
        return user_id == object._id;
      },
      'update' : function (user_id, object)
      {
        return user_id == object._id;
      }
    });


    Meteor.publish('allowedFairness', function() {
      //console.log(this.userId);
      //if (!this.userId) return this.ready();

      if (this.userId){
        return Fairness.find({_id: this.userId});
      }

    });
