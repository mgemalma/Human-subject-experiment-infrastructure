import Swal2 from 'sweetalert2';
Template.profile_inst.onRendered(function bodyOnCreated()
{
  Swal2.fire({
    title: '<strong>Enter an Alert Here!</strong>',
    html:
    '<div style="text-align: justify; padding: 10px;">' +
    '<p>Enter detail of the alert here!</p>' +
    '</div>',
    icon: 'info',
    confirmButtonText: '<span style="font-size: 16px;">I understand</span>',
    width: '1000px',
    allowOutsideClick: false
});

  var user = UserAdv.findOne({"_id" : Meteor.userId()});
  if (user == null)
  {
    error_handle();
  }


  var length_avatars = document.getElementsByClassName("rounded-circle").length;
  var RandomMembers = getRandomPics(pictures, length_avatars);

  for (i = 0; i < length_avatars; i++)
  {

      var avatar_element= document.getElementById('Avatar' + (i + 1));
      avatar_element.src = RandomMembers[i];

  }

  function getFun(val, num) {
    return function() {
    var image = document.getElementById(num);
    image.style.border = "thick solid red";
    var length_avatars = document.getElementsByClassName("rounded-circle").length;
    for (i = 0; i < length_avatars ; i++)
    {

        var avatar_element= document.getElementById('Avatar' + (i + 1));
        if (num == 'Avatar' + (i + 1))
        {
          continue;
        }

        avatar_element.style.border = "none";

    }
    document.getElementById("btn_section").style.display="block";
  };
  }
  for (i = 0; i < length_avatars ; i++)
  {

      var avatar_element= document.getElementById('Avatar' + (i + 1));

      avatar_element.onclick = getFun(avatar_element.src,'Avatar' + (i + 1));

  }

  var submit_button=document.getElementById("submit_nickname");
  submit_button.onclick = function(){
    var nickname = document.getElementById("nickname");

    if (nickname.value == "")
    {
      swal({
            title: 'Warning!',
            text: "Please give yourself a nickname!",
            type: 'warning',
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
            }).then(function(isConfirm) {
              if (isConfirm.value===true) {
                console.log("isConfirm");
              }
            });
      return;
    }
    UserAdv.update(Meteor.userId(), { $set: { nickname :  nickname.value}});
    document.getElementById("gender_block").style.display = "block";
  }


  var submit_gender=document.getElementById("gender_btn");
  submit_gender.onclick = function(){
    var gender = displayRadioValue("gender");
    // alert(gender);

    if (gender == "" || gender == undefined || gender == null)
    {
      swal({
            title: 'Warning!',
            text: "Please select your gender!",
            type: 'warning',
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
            }).then(function(isConfirm) {
              if (isConfirm.value===true) {
                console.log("isConfirm");
              }
            });
      return;
    }
    UserAdv.update(Meteor.userId(), { $set: { race :  gender}});
    document.getElementById("avatars_section").style.display = "block";
  }

  var next_button = document.getElementById("next_page");
  next_button.onclick = function() {
    var nickname = document.getElementById("nickname");

    if (nickname.value == "")
    {
      swal({
            title: 'Warning!',
            text: "Please give yourself a nickname!",
            type: 'warning',
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
            }).then(function(isConfirm) {
              if (isConfirm.value===true) {
                console.log("isConfirm");
              }
            });
      return;
    }

    var length_avatars = document.getElementsByClassName("rounded-circle").length;
    var pass = false;
    var element;
    for (i = 0; i < length_avatars ; i++)
    {

        var avatar_element= document.getElementById('Avatar' + (i + 1));
        if ( avatar_element.style.border == "thick solid red")
        {
          pass = true;
          element = avatar_element.src;
        }
    }

    if (!pass)
    {
      swal({
            title: 'Warning!',
            text: "Please pick an avatar for yourself!",
            type: 'warning',
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
            }).then(function(isConfirm) {
              if (isConfirm.value===true) {
                console.log("isConfirm");
              }
            });
      return;

    }
    // UserAdv.update(Meteor.userId(), { $set: { nickname :  nickname.value}});
    // UserAdv.update(Meteor.userId(), { $set: { currentIndex : ++user.currentIndex  }});
    //in case they updated their gender

    var gender = displayRadioValue("gender");
    // alert(gender);

    if (gender != "" && gender != undefined && gender != null)
    {
      if (user != undefined && user != null && user != ""){
      if (user.race != gender)
      {
        UserAdv.update(Meteor.userId(), { $set: { race :  gender}});
      }}
    }



    document.getElementById("next_page").disabled = true;
    if (butonRef('next_page'))
    {
      return;
    }
    CurrentIndex = 2;//++user.currentIndex;
    if (comparatorForIndices(CurrentIndex, true) == true)
    {
    UserAdv.update(Meteor.userId(), { $set: { image_url :  element, nickname :  nickname.value, currentIndex : CurrentIndex}}, function( error, result) {
      if ( error ) {error_handle();} //info about what went wrong
      if ( result ) {location.reload();} //the _id of new object if successful
    });
  }
  }

});

Template.profile_inst.helpers(
  {
    'isUser' : function()
    {
        //console.log(Meteor.userId());
        if (Meteor.userId() == null)
        {
            window.location.href = path_new + "/";
        }
    }
  });
