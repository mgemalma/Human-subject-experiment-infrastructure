Template.instr_2.helpers(
  {
    'isUser' : function()
    {
        //console.log(Meteor.userId());
        if (Meteor.userId() == null)
        {
            window.location.href = path_new + "/";
        }
    }
    ,
    'getStyle' : function()
    {
        //console.log(Meteor.userId());
        var usr = UserAdv.findOne({"_id" : Meteor.userId()});

        if (usr == undefined)
        {
          error_handle();
        }
        if (usr.race == FIRST_RACE)
        {
          return "color: " + color_first_race + ";";
        }else
        {
          return "color: " + color_second_race + ";";
        }

    }
    ,
    'getRace' :function(opt)
    {
      var usr = UserAdv.findOne({"_id" : Meteor.userId()});

      if (usr == undefined)
      {
        error_handle();
      }
      var str = usr.race;
      if (opt == 1)
      {
        return str.toLowerCase();
      }else
      {
        return str;
      }
    }
    ,
    'getBudget' :function()
    {
      var usr = UserAdv.findOne({"_id" : Meteor.userId()});
      if (usr == undefined)
      {
        error_handle();
      }
      return usr.user_budget;
    },
    'getCredibility' : function()
    {
      var usr = UserAdv.findOne({"_id" : Meteor.userId()});
      if (usr == undefined)
      {
        error_handle();
      }

      return getScoreProp(usr.credibility);
    },'getNickname' :function()
    {
      var usr = UserAdv.findOne({"_id" : Meteor.userId()});

      if (usr == undefined)
      {
        error_handle();
      }
      return usr.nickname;
    },'getSrc' :function()
    {
      var usr = UserAdv.findOne({"_id" : Meteor.userId()});

      if (usr == undefined)
      {
        error_handle();
      }
      return usr.image_url;
    }
    ,'getYears' :function()
    {
      var usr = UserAdv.findOne({"_id" : Meteor.userId()});

      if (usr == undefined)
      {
        error_handle();
      }
      return usr.years;
    }, 'getOwnership' : function(opt)
    {
      var usr = UserAdv.findOne({"_id" : Meteor.userId()});

      if (usr == undefined)
      {
        error_handle();
      }
      var str = usr.rent;
      if (opt == 1)
      {
        return str.toLowerCase();
      }else
      {
        return str;
      }

    }, 'getCareer' : function()
    {
      var usr = UserAdv.findOne({"_id" : Meteor.userId()});

      if (usr == undefined)
      {
        error_handle();
      }
      return usr.career
    },
    'getThreshold' : function()
    {
      return threshold;
    }
    ,
    'getCredibility1' : function(choice)
    {
      var usr = UserAdv.findOne({"_id" : Meteor.userId()});
      if (usr == undefined)
      {
        error_handle();
      }
      var str = usr.credibility;
      var index = str.indexOf("-");
      var first = str.substring(1, index - 1);
      var second = str.substring(index + 2, str.length - 1);
      if (choice == 1)
      {
        return first;
      }else
      {
        return second;
      }

      // return getScoreProp(usr.credibility);
    }

  });

  // getScoreProp = function(str)
  // {
  //   var substr = "";
  //   var index = str.indexOf("-");
  //   var first = str.substring(1, index - 1);
  //   var second = str.substring(index + 2, str.length - 1);
  //   substr += first;
  //   substr += "-";
  //   substr += second;
  //
  //   return substr;
  // }

  Template.instr_2.onRendered(function bodyOnCreated()
  {
    var clr = document.getElementById("race_col");
    var usr = UserAdv.findOne({"_id" : Meteor.userId()});

    if (usr == undefined)
    {
      error_handle();
    }

    if (usr.race == FIRST_RACE)
    {
      clr.style.color = color_first_race;
    }else
    {
      clr.style.color = color_second_race;
    }


    var button_next = document.getElementById("next_page");


    button_next.onclick = function()
    {
      var user = UserAdv.findOne({"_id" : Meteor.userId()});
      if (user == undefined)
      {
        error_handle();
      }
      document.getElementById("next_page").disabled = true;
      if (butonRef('next_page'))
      {
        return;
      } 
      CurrentIndex = 3;//++user.currentIndex;
      if (comparatorForIndices(CurrentIndex, true) == true)
      {
      UserAdv.update(Meteor.userId(), { $set: { currentIndex : CurrentIndex  }}, function( error, result) {
        if ( error ) {error_handle();} //info about what went wrong
        if ( result ) {location.reload();} //the _id of new object if successful
      });
    }
      // location.reload();
    }


  });
