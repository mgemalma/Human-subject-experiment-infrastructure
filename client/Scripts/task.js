
Template.taskDesign.helpers(
  {
    'isUser' : function()
    {
        if (Meteor.userId() == null)
        {
            window.location.href = path_new + "/";
        }
    },
    'getStyle' : function()
    {
      var usr = UserAdv.findOne({"_id" : Meteor.userId()});

      if (usr == undefined)
      {
        error_handle();
      }
      if (usr.race == FIRST_RACE)
      {
        return "display:inline-block; width:50px; color: " + color_first_race + ";";
      }else
      {
        return "display:inline-block; width:50px; color: " + color_second_race + ";";
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
    }
    ,
    'getCredibility' : function()
    {
      var usr = UserAdv.findOne({"_id" : Meteor.userId()});
      if (usr == undefined)
      {
        error_handle();
      }
      return getScoreProp(usr.credibility);
    }
    ,
    'getRedSize' : function()
    {
      var usr_fair = Fairness.findOne({"_id" : Meteor.userId()});
      if (usr_fair == undefined)
      {
        error_handle();
      }
      return usr_fair.pos_red_blw + usr_fair.neg_red_blw + usr_fair.pos_red_curr + usr_fair.neg_red_curr + usr_fair.pos_red_abv + usr_fair.neg_red_abv;
    },
    'getBlueSize' : function()
    {
      var usr_fair = Fairness.findOne({"_id" : Meteor.userId()});
      if (usr_fair == undefined)
      {
        error_handle();
      }
      return usr_fair.pos_blue_blw + usr_fair.neg_blue_blw + usr_fair.pos_blue_curr + usr_fair.neg_blue_curr + usr_fair.pos_blue_abv + usr_fair.neg_blue_abv;
    }
    ,
    'getSize' : function()
    {
      var user_fair = Fairness.findOne({"_id" : Meteor.userId()});
      if (user_fair == undefined)
      {
        error_handle();
      }
      return (user_fair.pos_red_660_abv + user_fair.neg_red_660_abv + user_fair.pos_red_660_blw + user_fair.neg_red_660_blw + user_fair.pos_blue_660_abv + user_fair.neg_blue_660_abv + user_fair.pos_blue_660_blw  + user_fair.neg_blue_660_blw);
    },'getText' : function(which)
    {
      var user_fair = Fairness.findOne({"_id" : Meteor.userId()});
      if (user_fair == undefined)
      {
        error_handle();
      }

      var pos_red_blw = user_fair.pos_red_blw
      var neg_red_blw = user_fair.neg_red_blw
      var pos_red_curr = user_fair.pos_red_curr
      var neg_red_curr = user_fair.neg_red_curr
      var pos_red_abv = user_fair.pos_red_abv
      var neg_red_abv = user_fair.neg_red_abv
      var pos_blue_blw = user_fair.pos_blue_blw
      var neg_blue_blw = user_fair.neg_blue_blw
      var pos_blue_curr = user_fair.pos_blue_curr
      var neg_blue_curr = user_fair.neg_blue_curr
      var pos_blue_abv = user_fair.pos_blue_abv
      var neg_blue_abv = user_fair.neg_blue_abv


      if (which == 0)
      {
        return FIRST_RACE;
      }
      if (which == 1)
      {
        return pos_red_blw + neg_red_blw + pos_red_curr + neg_red_curr + pos_red_abv + neg_red_abv;
      }
      if (which == 2)
      {
        return pos_red_blw + pos_red_curr + pos_red_abv;
      }
      if (which == 3)
      {
          var num = ((pos_red_blw + pos_red_curr + pos_red_abv) * 100)/ ((1.0) *(pos_red_blw + neg_red_blw + pos_red_curr + neg_red_curr + pos_red_abv + neg_red_abv));

          return num.toFixed(0);
      }
      if (which == 4)
      {
        return pos_red_abv + neg_red_abv;
      }
      if (which == 5)
      {
        var num = ((pos_red_abv + neg_red_abv)) * 100 / ((1.0) *(pos_red_blw + neg_red_blw + pos_red_curr + neg_red_curr + pos_red_abv + neg_red_abv));

        return num.toFixed(0);
      }
      if (which == 6)
      {
        return pos_red_abv;
      }
      if (which == 7)
      {
        var num = ((pos_red_abv) * 100)/ ((1.0) *(pos_red_abv + neg_red_abv));

        return num.toFixed(1);
      }
      if (which == 8)
      {
        return neg_red_abv;
      }
      if (which == 9)
      {
        var num = ((neg_red_abv) * 100)/ ((1.0) *(pos_red_abv + neg_red_abv));

        return num.toFixed(1);
      }
      if (which == 10)
      {
        return pos_red_curr + neg_red_curr;
      }
      if (which == 11)
      {
        var num = ((pos_red_curr + neg_red_curr)) * 100 / ((1.0) *(pos_red_blw + neg_red_blw + pos_red_curr + neg_red_curr + pos_red_abv + neg_red_abv));

        return num.toFixed(0);
      }
      if (which == 12)
      {
        return pos_red_curr;
      }
      if (which == 13)
      {
        var num = ((pos_red_curr) * 100)/ ((1.0) *(pos_red_curr + neg_red_curr));

        return num.toFixed(1);
      }
      if (which == 14)
      {
        return neg_red_curr;
      }
      if (which == 15)
      {
        var num = ((neg_red_curr) * 100)/ ((1.0) *(pos_red_curr + neg_red_curr));

        return num.toFixed(1);
      }


      if (which == 16)
      {
        return pos_red_blw + neg_red_blw;
      }
      if (which == 17)
      {
        var num = ((pos_red_blw + neg_red_blw)) * 100 / ((1.0) *(pos_red_blw + neg_red_blw + pos_red_curr + neg_red_curr + pos_red_abv + neg_red_abv));

        return num.toFixed(0);
      }
      if (which == 18)
      {
        return pos_red_blw;
      }
      if (which == 19)
      {
        var num = ((pos_red_blw) * 100)/ ((1.0) *(pos_red_blw + neg_red_blw));

        return num.toFixed(1);
      }
      if (which == 20)
      {
        return neg_red_blw;
      }
      if (which == 21)
      {
        var num = ((neg_red_blw) * 100)/ ((1.0) *(pos_red_blw + neg_red_blw));

        return num.toFixed(1);
      }

      //Second part
      if (which == 22)
      {
        return pos_blue_blw + neg_blue_blw + pos_blue_curr + neg_blue_curr + pos_blue_abv + neg_blue_abv;
      }
      if (which == 23)
      {
        return pos_blue_blw + pos_blue_curr + pos_blue_abv;
      }
      if (which == 24)
      {
          var num = ((pos_blue_blw + pos_blue_curr + pos_blue_abv) * 100)/ ((1.0) *(pos_blue_blw + neg_blue_blw + pos_blue_curr + neg_blue_curr + pos_blue_abv + neg_blue_abv));

          return num.toFixed(0);
      }
      if (which == 25)
      {
        return pos_blue_abv + neg_blue_abv;
      }
      if (which == 26)
      {
        var num = ((pos_blue_abv + neg_blue_abv)) * 100 / ((1.0) *(pos_blue_blw + neg_blue_blw + pos_blue_curr + neg_blue_curr + pos_blue_abv + neg_blue_abv));

        return num.toFixed(0);
      }
      if (which == 27)
      {
        return pos_blue_abv;
      }
      if (which == 28)
      {
        var num = ((pos_blue_abv) * 100)/ ((1.0) *(pos_blue_abv + neg_blue_abv));

        return num.toFixed(1);
      }
      if (which == 29)
      {
        return neg_blue_abv;
      }
      if (which == 30)
      {
        var num = ((neg_blue_abv) * 100)/ ((1.0) *(pos_blue_abv + neg_blue_abv));

        return num.toFixed(1);
      }
      if (which == 31)
      {
        return pos_blue_curr + neg_blue_curr;
      }
      if (which == 32)
      {
        var num = ((pos_blue_curr + neg_blue_curr)) * 100 / ((1.0) *(pos_blue_blw + neg_blue_blw + pos_blue_curr + neg_blue_curr + pos_blue_abv + neg_blue_abv));

        return num.toFixed(0);
      }
      if (which == 33)
      {
        return pos_blue_curr;
      }
      if (which == 34)
      {
        var num = ((pos_blue_curr) * 100)/ ((1.0) *(pos_blue_curr + neg_blue_curr));

        return num.toFixed(1);
      }
      if (which == 35)
      {
        return neg_blue_curr;
      }
      if (which == 36)
      {
        var num = ((neg_blue_curr) * 100)/ ((1.0) *(pos_blue_curr + neg_blue_curr));

        return num.toFixed(1);
      }
      if (which == 37)
      {
        return pos_blue_blw + neg_blue_blw;
      }
      if (which == 38)
      {
        var num = ((pos_blue_blw + neg_blue_blw)) * 100 / ((1.0) *(pos_blue_blw + neg_blue_blw + pos_blue_curr + neg_blue_curr + pos_blue_abv + neg_blue_abv));

        return num.toFixed(0);
      }
      if (which == 39)
      {
        return pos_blue_blw;
      }
      if (which == 40)
      {
        var num = ((pos_blue_blw) * 100)/ ((1.0) *(pos_blue_blw + neg_blue_blw));

        return num.toFixed(1);
      }
      if (which == 41)
      {
        return neg_blue_blw;
      }
      if (which == 42)
      {
        var num = ((neg_blue_blw) * 100)/ ((1.0) *(pos_blue_blw + neg_blue_blw));

        return num.toFixed(1);
      }
      return which;

      // else if (which == 8)
      // {
      //   return user_fair.na - user_fair.tna;
      // }
      // else if (which == 9)
      // {
      //   var num = ((user_fair.na - user_fair.tna) * 100)/ ((1.0) *(user_fair.tpa + (user_fair.na - user_fair.tna)));
      //
      //   return num.toFixed(0);
      // }
      // else if (which == 10)
      // {
      //
      //   return user_fair.tna + (user_fair.pa - user_fair.tpa);
      // }
      // else if (which == 11)
      // {
      //   var num = ((user_fair.tna + (user_fair.pa - user_fair.tpa)) * 100)/ ((1.0) *(group_a_all));
      //
      //   return num.toFixed(0);
      // }
      // else if (which == 12)
      // {
      //
      //   return user_fair.pa - user_fair.tpa;
      // }
      // else if (which == 13)
      // {
      //   var num = ((user_fair.pa - user_fair.tpa) * 100)/ ((1.0) *(user_fair.tna + (user_fair.pa - user_fair.tpa)));
      //
      //   return num.toFixed(0);
      // }
      // else if (which == 14)
      // {
      //
      //   return user_fair.tna;
      // }
      // else if (which == 15)
      // {
      //   var num = ((user_fair.tna) * 100)/ ((1.0) *(user_fair.tna + (user_fair.pa - user_fair.tpa)));
      //
      //   return num.toFixed(0);
      // }
      // else if (which == 16)
      // {
      //   return group_b_all;
      // }else if (which == 17)
      // {
      //   return user_fair.pb;
      // }else if (which == 18)
      // {
      //     var num = ((user_fair.pb) * 100)/ ((1.0) *(group_b_all));
      //
      //     return num.toFixed(0);
      // }
      // else if (which == 19)
      // {
      //   return user_fair.tpb + (user_fair.nb - user_fair.tnb);
      // }
      // else if (which == 20)
      // {
      //   var num = ((user_fair.tpb + (user_fair.nb - user_fair.tnb)) * 100)/ ((1.0) *(group_b_all));
      //
      //   return num.toFixed(0);
      // }
      // else if (which == 21)
      // {
      //   return user_fair.tpb;
      // }
      // else if (which == 22)
      // {
      //   var num = ((user_fair.tpb) * 100)/ ((1.0) *(user_fair.tpb + (user_fair.nb - user_fair.tnb)));
      //
      //   return num.toFixed(0);
      // }
      // else if (which == 23)
      // {
      //   return user_fair.nb - user_fair.tnb;
      // }
      // else if (which == 24)
      // {
      //   var num = ((user_fair.nb - user_fair.tnb) * 100)/ ((1.0) *(user_fair.tpb + (user_fair.nb - user_fair.tnb)));
      //
      //   return num.toFixed(0);
      // }
      // else if (which == 25)
      // {
      //
      //   return user_fair.tnb + (user_fair.pb - user_fair.tpb);
      // }
      // else if (which == 26)
      // {
      //   var num = ((user_fair.tnb + (user_fair.pb - user_fair.tpb)) * 100)/ ((1.0) *(group_b_all));
      //
      //   return num.toFixed(0);
      // }
      // else if (which == 27)
      // {
      //
      //   return user_fair.pb - user_fair.tpb;
      // }
      // else if (which == 28)
      // {
      //   var num = ((user_fair.pb - user_fair.tpb) * 100)/ ((1.0) *(user_fair.tnb + (user_fair.pb - user_fair.tpb)));
      //
      //   return num.toFixed(0);
      // }
      // else if (which == 29)
      // {
      //
      //   return user_fair.tnb;
      // }
      // else if (which == 30)
      // {
      //   var num = ((user_fair.tnb) * 100)/ ((1.0) *(user_fair.tnb + (user_fair.pb - user_fair.tpb)));
      //
      //   return num.toFixed(0);
      // }
      //
      // else
      // {
      //   return which;
      // }
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
        return str?.toLowerCase();
      }else
      {
        return str;
      }
    }
    ,
    'getNickname' :function()
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
        return str?.toLowerCase();
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
    },
   
  'SECOND_RACE' : function() {
    return SECOND_RACE?.toLowerCase();
  },
  'color_second_race' : function() {
    return color_second_race;
  }
  ,
  'FIRST_RACE' : function() {
    return FIRST_RACE?.toLowerCase();
  },
  'color_first_race' : function() {
    return color_first_race;
  }
  });
  Template.end.helpers(
    {
      'getBudget' : function()
      {
        var usr = UserAdv.findOne({"_id" : Meteor.userId()});
        if (usr == undefined)
        {
          error_handle();
        }
        return usr.user_budget;
      },
      'getAmount' : function()
      {
        var usr = UserAdv.findOne({"_id" : Meteor.userId()});
        if (usr == undefined)
        {
          error_handle();
        }
        var bonus = ((usr.user_budget * conversion_rate) / conversion_coin).toFixed(2);
        UserAdv.update(Meteor.userId(), { $set: { bonus : bonus }});
        return bonus;
      }
    });

  cred_high = function(cred){

      var regexS = "[\\-]"+ " ([^\\]&#]*)";
      var regex = new RegExp( regexS );
      var results = regex.exec(cred);
      if( results == null )
        return "";
      else
        return results[1];
   }

   // decisionTut = function(index) {
   //
   //     return index % 2;
   // }

decision = function(race, credibility, isDeception, isFairTreatment, isFlowchart) {

    // var c_h = cred_high(credibility);
    // var is_positive = (c_h > threshold);

    var user_fair = Fairness.findOne({"_id" : Meteor.userId()});
    if (user_fair == undefined)
    {
      error_handle();
    }
    // var A_T_P = user_fair.a_t_p;
    // var A_T_N = user_fair.a_t_n;
    //
    //  //BLACK CONFUSION MATRIX
    // var B_T_P = user_fair.b_t_p;
    // var B_T_N = user_fair.b_t_n;
    // if (credibility >= credit_ranges.length - 1)
    // {
    //   credibility = credit_ranges.length - 2
    // }
    var approveProb = 0.0
    if ((isFairTreatment && isDeception && isFlowchart) || (!isFairTreatment && isDeception && !isFlowchart) || (!isFairTreatment && !isDeception))
    {
      if (isFlowchart)
      {
        if (race === FIRST_RACE)
      {
          approveProb = unfair_red_cred_scr_probs_flw[credibility]
      }else
      {
          approveProb = unfair_blue_cred_scr_probs_flw[credibility]
      }
      }else
      {
        if (race === FIRST_RACE)
      {
          approveProb = unfair_red_cred_scr_probs[credibility]
      }else
      {
          approveProb = unfair_blue_cred_scr_probs[credibility]
      }
      }
    }
    if ((isFairTreatment && isDeception && !isFlowchart) || (!isFairTreatment && isDeception && isFlowchart) || (isFairTreatment && !isDeception))
    {
      if (isFlowchart)
      {
          approveProb = fair_cred_scr_probs_flw[credibility]
      } else
      {
          approveProb = fair_cred_scr_probs[credibility]
      }
    }
    var variable1 = Math.random();
    if (DEBUG === 1)
    {
      if (isFlowchart === false)
      {
          alert(approveProb);
          alert(variable1);
      }
    }
    
    if ( variable1 < approveProb)
    {
      return 1;
    }else
    {
      return 0;
    }
}

 getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

// makePersonTut = function(index)
// {
//     var user_race = ((index % 2 == 0) ? FIRST_RACE : SECOND_RACE);
//     var rd_val = 0;
//     return [user_race, credit_ranges[(index % credit_ranges.length)]];
// }

getRandomArbitrary = function (min, max) {
    return Math.random() * (max - min) + min;
}

// probCalculator = function(isDeception, isFairTreatment, race, start, end)
// {
//   var approveProb = 0.0;
//   var counter = 0;
//   for (i = start; i < end; i++)
//   {
//     if ((isFairTreatment && isDeception) || (!isFairTreatment && !isDeception))
//     {
//       if (race === FIRST_RACE)
//       {
//           approveProb += unfair_red_cred_scr_probs[i];
//       }else
//       {
//           approveProb += unfair_blue_cred_scr_probs[i];
//       }
//     }
//     if ( (!isFairTreatment && isDeception) || (isFairTreatment && !isDeception))
//     {
//           approveProb += fair_cred_scr_probs[i];
//     }
//     counter += 1;
//   }
//   if (counter != 0)
//   {
//     return (approveProb / counter);
//   }else
//   {
//     return 0;
//   }

// }

to_flwchart_index = function(index)
{
  // var item_to_compare = credit_ranges[index];
  // for (i = 0; i < credit_ranges_flw.length; i++) {
  //   if (credit_ranges_flw[i] === item_to_compare)
  //   {
  //     console.log("here");
  //     return i;
  //   }
    
  // }
  // return -1;
  return index + assignable_credit_start_index_in_flw;
}


simulate_person = function()
{
  var user_fair = Fairness.findOne({"_id" : Meteor.userId()});

  var usr = UserAdv.findOne({"_id" : Meteor.userId()});
  // console.log('here2');

  if (user_fair == undefined || usr == undefined)
  {
    error_handle();
  }

  // console.log(user_fair.a_t_p);
  // console.log(user_fair.a_t_n);
  // console.log(user_fair.b_t_p);
  // console.log(user_fair.b_t_n);

  var pos_red_blw = 0;
  var neg_red_blw = 0;
  var pos_red_curr = 0;
  var neg_red_curr = 0;
  var pos_red_abv = 0;
  var neg_red_abv = 0;
  var pos_blue_blw = 0;
  var neg_blue_blw = 0;
  var pos_blue_curr = 0;
  var neg_blue_curr = 0;
  var pos_blue_abv = 0;
  var neg_blue_abv = 0;
  var pos_red_660_abv = 0;
  var neg_red_660_abv = 0; 
  var pos_red_660_blw = 0; 
  var neg_red_660_blw = 0; 
  var pos_blue_660_abv = 0; 
  var neg_blue_660_abv = 0;
  var pos_blue_660_blw = 0; 
  var neg_blue_660_blw = 0;

  var counter = 0;
  var real_dec = 0;
  var credit = usr.index_credit;
  var credibility_check = usr.credibility;
  if (IMPROVEMENT_CREDIBILITY != -1)
  {
    credit = IMPROVEMENT_CREDIBILITY
    credibility_check = credit_ranges[credit];
  }

  var flag = false;
  if (credit >= credit_ranges.length - 1)
  {
    //credit = credit_ranges.length - 2
    flag = true;
  }

  if (!usr.tutorial){
  sim_n = getRandomInt(sim_n_low, sim_n_high);
  //alert(sim_n)
  // Fairness.update(Meteor.userId(), { $set: { sim_n : sim_n}});
  for (i = 0; i < sim_n + 1; i++)
  {
    var values;
    var dec;
    if (sim_n == i)
    {
      dec = decision(usr.race, credit, (usr.deception == 1), (usr.fairness == 1), false);
      if (DEBUG === 1)
      {
        alert(dec);
      }  
      real_dec = dec;
      values = [usr.race, credibility_check, credit];
    }else
    {
      values = makePerson(1);
      dec = decision(values[0], values[2], (usr.deception == 1), (usr.fairness == 1), true);
    }
    var flw_chrt_index = to_flwchart_index(credit);//credit_ranges_flw.length - credit_ranges.length + credit;

    if (values[0] === FIRST_RACE){
      var High = ((flw_chrt_index === credit_ranges_flw.length - 1) ? flw_chrt_index : flw_chrt_index + 1);
      var IfHigh = ((flw_chrt_index === credit_ranges_flw.length - 1) ? true : false);
      if (!IfHigh && cred_high(values[1]) === cred_high(credit_ranges_flw[High]))
      {
        if (dec === 1)
        {
          pos_red_abv += 1
        }else
        {
          neg_red_abv += 1
        }
      }

      if (cred_high(values[1]) === cred_high(credibility_check))
      {
        if (dec === 1)
        {
          pos_red_curr += 1
        }else
        {
          neg_red_curr += 1
        }
      }
      var Low = ((flw_chrt_index === 0) ? flw_chrt_index : flw_chrt_index - 1);
      var IfLow = ((flw_chrt_index === 0) ? true : false);
      if (!IfLow && cred_high(values[1]) === cred_high(credit_ranges_flw[Low]))
      {
        if (dec === 1)
        {
          pos_red_blw += 1
        }else
        {
          neg_red_blw += 1
        }
      }

      var g_t = truDec(values[1]);
      if (dec === 1)
      {
        if (g_t === dec)
        {
          pos_red_660_abv += 1;
        }else
        {
        pos_red_660_blw += 1;
        }
      
      }else
      {
        if (g_t === dec)
        {
          neg_red_660_blw += 1;
        }else
        {
          neg_red_660_abv += 1;
        }
      
      }
    } else
    {
      var High = ((flw_chrt_index === credit_ranges_flw.length - 1) ? flw_chrt_index : flw_chrt_index + 1);
      var IfHigh = ((flw_chrt_index === credit_ranges_flw.length - 1) ? true : false);
      if (!IfHigh && cred_high(values[1]) === cred_high(credit_ranges_flw[High]))
      {
        if (dec === 1)
        {
          pos_blue_abv += 1
        }else
        {
          neg_blue_abv += 1
        }
      }

      if (cred_high(values[1]) === cred_high(credibility_check))
      {
        if (dec === 1)
        {
          pos_blue_curr += 1
        }else
        {
          neg_blue_curr += 1
        }
      }
      var Low = ((flw_chrt_index === 0) ? flw_chrt_index : flw_chrt_index - 1);
      var IfLow = ((flw_chrt_index === 0) ? true : false);
      if (!IfLow && cred_high(values[1]) === cred_high(credit_ranges_flw[Low]))
      {
        if (dec === 1)
        {
          pos_blue_blw += 1
        }else
        {
          neg_blue_blw += 1
        }
      }

      var g_t = truDec(values[1]);
      if (dec === 1)
      {
        if (g_t === dec)
        {
          pos_blue_660_abv += 1;
        }else
        {
          pos_blue_660_blw += 1;
        }
      
      }else
      {
        if (g_t === dec)
        {
          neg_blue_660_blw += 1;
        }else
        {
        neg_blue_660_abv += 1;
        }
      
      }

    }
  }

  IMPROVEMENT_CREDIBILITY = -1;

  //take into account the below credit score for the low extreme.
//   if (flag === true)
//   {
//     pos_red_curr = pos_red_curr * 2;
//     neg_red_curr = neg_red_curr * 2;
//     pos_blue_curr = pos_blue_curr * 2;
//     neg_blue_curr = neg_blue_curr * 2;
//     Fairness.update(Meteor.userId(), { $set: { pos_red_blw : pos_red_blw, neg_red_blw : neg_red_blw, pos_red_curr : pos_red_curr, neg_red_curr : neg_red_curr, pos_red_abv : pos_red_abv, neg_red_abv : neg_red_abv, pos_blue_blw : pos_blue_blw, neg_blue_blw : neg_blue_blw, pos_blue_curr : pos_blue_curr, neg_blue_curr : neg_blue_curr, pos_blue_abv : pos_blue_abv, neg_blue_abv : neg_blue_abv}});
//     return real_dec;
//   }
//   else if (pos_red_blw == 0 && neg_red_blw == 0 && pos_blue_blw == 0 && neg_blue_blw == 0)
//   {
//   //var coeff = getRandomArbitrary(1,3);
//   pos_red_blw = pos_red_curr * 2;
//   neg_red_blw = neg_red_curr * 2;
//   pos_blue_blw = pos_blue_curr * 2;
//   neg_blue_blw = neg_blue_curr * 2;
//   Fairness.update(Meteor.userId(), { $set: { pos_red_blw : pos_red_blw, neg_red_blw : neg_red_blw, pos_red_curr : pos_red_curr, neg_red_curr : neg_red_curr, pos_red_abv : pos_red_abv, neg_red_abv : neg_red_abv, pos_blue_blw : pos_blue_blw, neg_blue_blw : neg_blue_blw, pos_blue_curr : pos_blue_curr, neg_blue_curr : neg_blue_curr, pos_blue_abv : pos_blue_abv, neg_blue_abv : neg_blue_abv}});
//   return real_dec;

// }
// else if (pos_red_abv == 0 && neg_red_abv == 0 && pos_blue_abv == 0 && neg_blue_abv == 0 && usr.index_credit < (credit_ranges.length - 1))
// {
//   pos_red_abv = pos_red_curr * 2;
//   neg_red_abv = neg_red_curr * 2;
//   pos_blue_abv = pos_blue_curr * 2;
//   neg_blue_abv = neg_blue_curr * 2;
//   Fairness.update(Meteor.userId(), { $set: { pos_red_blw : pos_red_blw, neg_red_blw : neg_red_blw, pos_red_curr : pos_red_curr, neg_red_curr : neg_red_curr, pos_red_abv : pos_red_abv, neg_red_abv : neg_red_abv, pos_blue_blw : pos_blue_blw, neg_blue_blw : neg_blue_blw, pos_blue_curr : pos_blue_curr, neg_blue_curr : neg_blue_curr, pos_blue_abv : pos_blue_abv, neg_blue_abv : neg_blue_abv}});
//   return real_dec;

// }
// else
// {

  Fairness.update(Meteor.userId(), { $set: { pos_red_blw : pos_red_blw, neg_red_blw : neg_red_blw, pos_red_curr : pos_red_curr, neg_red_curr : neg_red_curr, pos_red_abv : pos_red_abv, neg_red_abv : neg_red_abv, pos_blue_blw : pos_blue_blw, neg_blue_blw : neg_blue_blw, pos_blue_curr : pos_blue_curr, neg_blue_curr : neg_blue_curr, pos_blue_abv : pos_blue_abv, neg_blue_abv : neg_blue_abv, pos_red_660_abv : pos_red_660_abv, neg_red_660_abv : neg_red_660_abv, pos_red_660_blw : pos_red_660_blw , neg_red_660_blw : neg_red_660_blw, pos_blue_660_abv : pos_blue_660_abv, neg_blue_660_abv : neg_blue_660_abv, pos_blue_660_blw : pos_blue_660_blw, neg_blue_660_blw : neg_blue_660_blw}});
  return real_dec;
// }
// console.log(tpa);
  //return real_dec;
}else
{



//   var isDeception = (usr.deception == 1);
//   var isFairTreatment = (usr.fairness == 1);
//   var approveProb = 0;
//   var parameter = 100;
//   approveProb = probCalculator(isDeception, isFairTreatment, FIRST_RACE, usr.index_credit + 1, credit_ranges.length - 1);
//   pos_red_abv = Math.floor(approveProb * 100);
//   neg_red_abv = parameter - pos_red_abv;
//   approveProb = probCalculator(isDeception, isFairTreatment, FIRST_RACE, usr.index_credit, usr.index_credit + 1);
//   pos_red_curr = Math.floor(approveProb * 100);
//   neg_red_curr = parameter - pos_red_curr;
//   approveProb = probCalculator(isDeception, isFairTreatment, FIRST_RACE, 0, usr.index_credit);
//   pos_red_blw = Math.floor(approveProb * 100);
//   neg_red_blw = parameter - pos_red_blw;

//   approveProb = probCalculator(isDeception, isFairTreatment, SECOND_RACE, usr.index_credit + 1, credit_ranges.length - 1);
//   pos_blue_abv = Math.floor(approveProb * 100);
//   neg_blue_abv = parameter - pos_blue_abv;
//   approveProb = probCalculator(isDeception, isFairTreatment, SECOND_RACE, usr.index_credit, usr.index_credit + 1);
//   pos_blue_curr = Math.floor(approveProb * 100);
//   neg_blue_curr = parameter - pos_blue_curr;
//   approveProb = probCalculator(isDeception, isFairTreatment, SECOND_RACE, 0, usr.index_credit);
//   pos_blue_blw = Math.floor(approveProb * 100);
//   neg_blue_blw = parameter - pos_blue_blw;



//   if (pos_red_blw == 0  && pos_blue_blw == 0)
//   {
//   pos_red_blw = pos_red_curr * 2;
//   neg_red_blw = neg_red_curr * 2;
//   pos_blue_blw = pos_blue_curr * 2;
//   neg_blue_blw = neg_blue_curr * 2;
//   //Fairness.update(Meteor.userId(), { $set: { pos_red_blw : pos_red_blw, neg_red_blw : neg_red_blw, pos_red_curr : pos_red_curr, neg_red_curr : neg_red_curr, pos_red_abv : pos_red_abv, neg_red_abv : neg_red_abv, pos_blue_blw : pos_blue_blw, neg_blue_blw : neg_blue_blw, pos_blue_curr : pos_blue_curr, neg_blue_curr : neg_blue_curr, pos_blue_abv : pos_blue_abv, neg_blue_abv : neg_blue_abv}});


// }
// else if (pos_red_abv == 0  && pos_blue_abv == 0 )
// {
//   pos_red_abv = pos_red_curr * 2;
//   neg_red_abv = neg_red_curr * 2;
//   pos_blue_abv = pos_blue_curr * 2;
//   neg_blue_abv = neg_blue_curr * 2;
//   //Fairness.update(Meteor.userId(), { $set: { pos_red_blw : pos_red_blw, neg_red_blw : neg_red_blw, pos_red_curr : pos_red_curr, neg_red_curr : neg_red_curr, pos_red_abv : pos_red_abv, neg_red_abv : neg_red_abv, pos_blue_blw : pos_blue_blw, neg_blue_blw : neg_blue_blw, pos_blue_curr : pos_blue_curr, neg_blue_curr : neg_blue_curr, pos_blue_abv : pos_blue_abv, neg_blue_abv : neg_blue_abv}});

// }else{

//   console.log("processing done!");
//   //var res = Fairness.update(Meteor.userId(), { $set: { pos_red_blw : pos_red_blw, neg_red_blw : neg_red_blw, pos_red_curr : pos_red_curr, neg_red_curr : neg_red_curr, pos_red_abv : pos_red_abv, neg_red_abv : neg_red_abv, pos_blue_blw : pos_blue_blw, neg_blue_blw : neg_blue_blw, pos_blue_curr : pos_blue_curr, neg_blue_curr : neg_blue_curr, pos_blue_abv : pos_blue_abv, neg_blue_abv : neg_blue_abv}});
// }

// // if ( (!isFairTreatment && isDeception) || (isFairTreatment && !isDeception))
// // {
// pos_blue_abv += 9;
// pos_blue_curr += 3;
// pos_blue_blw  += 3;
// neg_blue_abv += 2;
// neg_blue_curr += 1;
// neg_blue_blw  += 2;

// pos_red_abv -= 3;
// pos_red_curr -= 2;
// pos_red_blw  -= 5;
// neg_red_abv -= 1;
// neg_red_curr -= 3;
// neg_red_blw  -= 3;
// }

var res = Fairness.update(Meteor.userId(), { $set: { pos_red_blw : 110, neg_red_blw : 50, pos_red_curr : 130, neg_red_curr : 40, pos_red_abv : 150, neg_red_abv : 30, pos_blue_blw : 107, neg_blue_blw : 52, pos_blue_curr : 127, neg_blue_curr : 43, pos_blue_abv : 147, neg_blue_abv : 33, pos_red_660_abv : 805, neg_red_660_abv : 205, pos_red_660_blw : 302 , neg_red_660_blw : 804, pos_blue_660_abv : 810, neg_blue_660_abv : 210, pos_blue_660_blw : 308, neg_blue_660_blw : 820}});


  // console.log('here1');
}
}

drawDiagram = function()
{
  var user_fair = Fairness.findOne({"_id" : Meteor.userId()});
  var usr = UserAdv.findOne({"_id" : Meteor.userId()});

  if (user_fair == undefined || usr == undefined)
  {
    error_handle();
  }
  var bool_val = ((usr.index_credit < credit_ranges.length - 1) && (usr.index_credit != 0));
  var pos_red_blw = user_fair.pos_red_blw
  var neg_red_blw = user_fair.neg_red_blw
  var pos_red_curr = user_fair.pos_red_curr
  var neg_red_curr = user_fair.neg_red_curr
  var pos_red_abv = user_fair.pos_red_abv
  var neg_red_abv = user_fair.neg_red_abv
  var pos_blue_blw = user_fair.pos_blue_blw
  var neg_blue_blw = user_fair.neg_blue_blw
  var pos_blue_curr = user_fair.pos_blue_curr
  var neg_blue_curr = user_fair.neg_blue_curr
  var pos_blue_abv = user_fair.pos_blue_abv
  var neg_blue_abv = user_fair.neg_blue_abv

  var flw_chrt_index = to_flwchart_index(usr.index_credit);//credit_ranges_flw.length - credit_ranges.length + usr.index_credit;
  var Low = ((flw_chrt_index === 0) ? flw_chrt_index : flw_chrt_index - 1);
  var High = ((flw_chrt_index === credit_ranges_flw.length - 1) ? flw_chrt_index : flw_chrt_index + 1);

  $("svg").remove();
  d3.sankey = function () {
      var sankey = {},
      nodeWidth = 24,
          nodePadding = 8,
          size = [1, 1],
          nodes = [],
          links = [];

      sankey.nodeWidth = function (_) {
          if (!arguments.length) return nodeWidth;
          nodeWidth = +_;
          return sankey;
      };

      sankey.nodePadding = function (_) {
          if (!arguments.length) return nodePadding;
          nodePadding = +_;
          return sankey;
      };

      sankey.nodes = function (_) {
          if (!arguments.length) return nodes;
          nodes = _;
          return sankey;
      };

      sankey.links = function (_) {
          if (!arguments.length) return links;
          links = _;
          return sankey;
      };

      sankey.size = function (_) {
          if (!arguments.length) return size;
          size = _;
          return sankey;
      };

      sankey.layout = function (iterations) {
          computeNodeLinks();
          computeNodeValues();
          computeNodeBreadths();
          computeNodeDepths(iterations);
          computeLinkDepths();
          return sankey;
      };

      sankey.relayout = function () {
          computeLinkDepths();
          return sankey;
      };

      sankey.link = function () {
          var curvature = 0.4; // was 0.3 originally in the previous experiment was 0.2
          if (bool_val)
          {
            curvature = 0.4;
          }else
          {
            curvature = 0.4;
          }

          function link(d) {
              var x0 = d.source.x + d.source.dx,
                  x1 = d.target.x,
                  xi = d3.interpolateNumber(x0, x1),
                  x2 = xi(curvature) ,
                  x3 = xi(1 - curvature) ,
                  y0 = d.source.y + d.sy   + d.dy / 2 ,
                  y1 = d.target.y + d.ty  + d.dy / 2;
              return "M" + x0  + "," + y0 + "C" + x2 + "," + y0 + " " + x3 + "," + y1 + " " + x1 + "," + y1;
          }

          link.curvature = function (_) {
              if (!arguments.length) return curvature;
              curvature = +_;
              return link;
          };

          return link;
      };

      // Populate the sourceLinks and targetLinks for each node.
      // Also, if the source and target are not objects, assume they are indices.
      function computeNodeLinks() {
          nodes.forEach(function (node) {
              node.sourceLinks = [];
              node.targetLinks = [];
          });
          links.forEach(function (link) {
              var source = link.source,
                  target = link.target;
              if (typeof source === "number") source = link.source = nodes[link.source];
              if (typeof target === "number") target = link.target = nodes[link.target];
              source.sourceLinks.push(link);
              target.targetLinks.push(link);
          });
      }

      // Compute the value (size) of each node by summing the associated links.
      function computeNodeValues() {
          nodes.forEach(function (node) {
              node.value = Math.max(
              d3.sum(node.sourceLinks, value),
              d3.sum(node.targetLinks, value));
          });
      }

      // Iteratively assign the breadth (x-position) for each node.
      // Nodes are assigned the maximum breadth of incoming neighbors plus one;
      // nodes with no incoming links are assigned breadth zero, while
      // nodes with no outgoing links are assigned the maximum breadth.
      function computeNodeBreadths() {
          var remainingNodes = nodes,
              nextNodes,
              x = 0;

          while (remainingNodes.length) {
              nextNodes = [];
              remainingNodes.forEach(function (node) {
                  node.x = x;
                  node.dx = nodeWidth;
                  node.sourceLinks.forEach(function (link) {
                      nextNodes.push(link.target);
                  });
              });
              remainingNodes = nextNodes;
              ++x;
          }

          //
          moveSinksRight(x);
          scaleNodeBreadths((width - nodeWidth) / (x - 1));
      }

      function moveSourcesRight() {
          nodes.forEach(function (node) {
              if (!node.targetLinks.length) {
                  node.x = d3.min(node.sourceLinks, function (d) {
                      return d.target.x;
                  }) - 1;
              }
          });
      }

      function moveSinksRight(x) {
          nodes.forEach(function (node) {
              if (!node.sourceLinks.length) {
                  node.x = x - 1;
              }
          });
      }

      function scaleNodeBreadths(kx) {
          nodes.forEach(function (node) {
              node.x *= kx;
          });
      }

      function computeNodeDepths(iterations) {
          var nodesByBreadth = d3.nest()
              .key(function (d) {
              return d.x;
          })
              .sortKeys(d3.ascending)
              .entries(nodes)
              .map(function (d) {
              return d.values;
          });

          //
          initializeNodeDepth();
          resolveCollisions();
          for (var alpha = 1; iterations > 0; --iterations) {
              relaxRightToLeft(alpha *= .99);
              resolveCollisions();
              relaxLeftToRight(alpha);
              resolveCollisions();
          }

          function initializeNodeDepth() {
              var ky = d3.min(nodesByBreadth, function (nodes) {
                  return (size[1] - (nodes.length - 1) * nodePadding) / d3.sum(nodes, value);
              });

              nodesByBreadth.forEach(function (nodes) {
                  nodes.forEach(function (node, i) {
                      node.y = i;
                      node.dy = node.value * ky;
                  });
              });

              links.forEach(function (link) {
                  link.dy = link.value * ky;
              });
          }

          function relaxLeftToRight(alpha) {
              nodesByBreadth.forEach(function (nodes, breadth) {
                  nodes.forEach(function (node) {
                      if (node.targetLinks.length) {
                          var y = d3.sum(node.targetLinks, weightedSource) / d3.sum(node.targetLinks, value);
                          node.y += (y - center(node)) * alpha;
                      }
                  });
              });

              function weightedSource(link) {
                  return center(link.source) * link.value;
              }
          }

          function relaxRightToLeft(alpha) {
              nodesByBreadth.slice().reverse().forEach(function (nodes) {
                  nodes.forEach(function (node) {
                      if (node.sourceLinks.length) {
                          var y = d3.sum(node.sourceLinks, weightedTarget) / d3.sum(node.sourceLinks, value);
                          node.y += (y - center(node)) * alpha;
                      }
                  });
              });

              function weightedTarget(link) {
                  return center(link.target) * link.value;
              }
          }

          function resolveCollisions() {
              nodesByBreadth.forEach(function (nodes) {
                  var node,
                  dy,
                  y0 = 0,
                      n = nodes.length,
                      i;

                  // Push any overlapping nodes down.
                  nodes.sort(ascendingDepth);
                  for (i = 0; i < n; ++i) {
                      node = nodes[i];
                      dy = y0 - node.y;
                      if (dy > 0) node.y += dy;
                      y0 = node.y + node.dy + nodePadding;
                  }

                  // If the bottommost node goes outside the bounds, push it back up.
                  dy = y0 - nodePadding - size[1];
                  if (dy > 0) {
                      y0 = node.y -= dy;

                      // Push any overlapping nodes back up.
                      for (i = n - 2; i >= 0; --i) {
                          node = nodes[i];
                          dy = node.y + node.dy + nodePadding - y0;
                          if (dy > 0) node.y -= dy;
                          y0 = node.y;
                      }
                  }
              });
          }

          function ascendingDepth(a, b) {
              return a.y - b.y;
          }
      }

      function computeLinkDepths() {
          nodes.forEach(function (node) {
              node.sourceLinks.sort(ascendingTargetDepth);
              node.targetLinks.sort(ascendingSourceDepth);
          });
          //Link coordinates

          if (bool_val)
          {
            //this is weird we don't know which one is which
            //dist = [[0.1,0],[0,-12],[0,-12],[-20,0],[-15,0]];
                    //LU     //RU     RB     LB     CCS
          dist = [[0,0],[0,-75],[0,10],[8,0],[10,-65]];
        }else
        {
          dist = [[0.1,0],[0,0.1],[0,25],[0.1,0]];
        }
          inds = 0;
          nodes.forEach(function (node) {
              var sy = 0,
                  ty = 0;
              node.sourceLinks.forEach(function (link) {
                  link.sy = sy + dist[inds][0];
                  sy += 5;
              });
              node.targetLinks.forEach(function (link) {
                  link.ty = ty + dist[inds][1];
                  ty += 25;
                  // console.log(link);
              });
              inds++;
          });

          inds = 0;

          function ascendingSourceDepth(a, b) {
              return a.source.y - b.source.y;
          }

          function ascendingTargetDepth(a, b) {
              return a.target.y - b.target.y;
          }
      }

      function center(node) {
          return node.y + node.dy / 2;
      }

      function value(link) {
          return link.value;
      }

      return sankey;
  };


  // console.log(user_fair.index_credit < credit_ranges.length - 1);
  // console.log(user_fair.index_credit);
  // console.log(credit_ranges.length - 1);
  //bool_val
  if (bool_val){
  // A Flow Chart
  var units = "Widgets";
  var currentWidth = document.getElementById("box1").offsetWidth;

  var margin = {
      top: 10,
      right: 10,
      bottom: 0,
      left: 10
  },


  // width = 0.9*currentWidth - margin.left - margin.right,
  //     height = 280 - margin.top - margin.bottom;

  width = 500,
       height = 270;

  var formatNumber = d3.format(",.0f"), // zero decimal places
      format = function (d) {
          return formatNumber(d) + " " + units;
      },
      color = d3.scale.category20();

  // append the svg canvas to the page
  var svg = d3.select("#chart_section").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
      "translate(" + margin.left + "," + margin.top  + ")");

  // Set the sankey diagram properties
  var sankey = d3.sankey()
      .nodeWidth(115)
      .nodePadding(70)
      .size([width, height]);

  var path = sankey.link();

  // console.log(path);

  left_up = credit_ranges_flw[High] + " ";
  left_below = "Yours -> " + credit_ranges_flw[flw_chrt_index] + " ";
  left_middle = credit_ranges_flw[Low] + " ";
  right_up = "Approved    ";
  right_down = "Denied    ";



  // var data = [{
  //     "source": left_up,
  //         "target": right_up,
  //         "value": 5
  // }, {
  //     "source": left_up,
  //         "target": right_down,
  //         "value": 7
  // }, {
  //     "source": left_below,
  //         "target": right_up,
  //         "value": 2
  // }, {
  //     "source": left_below,
  //         "target": right_down,
  //         "value": 9
  // }];

  var data = [{
      "source": left_up,
          "target": right_up,
          "value": 5
  }, {
      "source": left_up,
          "target": right_down,
          "value": 7
  },

  {
      "source": left_below,
          "target": right_up,
          "value": 2
  }, {
      "source": left_below,
          "target": right_down,
          "value": 9
  }, {
      "source": left_middle,
          "target": right_up,
          "value": 1
  }, {
      "source": left_middle,
          "target": right_down,
          "value": 10
  }];

  //set up graph in same style as original example but empty
  graph = {
      "nodes": [],
          "links": []
  };

  data.forEach(function (d) {
      graph.nodes.push({
          "name": d.source
      });
      graph.nodes.push({
          "name": d.target
      });
      graph.links.push({
          "source": d.source,
              "target": d.target,
              "value": +d.value
      });
  });

  // return only the distinct / unique nodes
  graph.nodes = d3.keys(d3.nest()
      .key(function (d) {
      return d.name;
  })
      .map(graph.nodes));

  // loop through each link replacing the text with its index from node
  graph.links.forEach(function (d, i) {
      graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
      graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
  });

  //now loop through each nodes to make nodes an array of objects
  // rather than an array of strings
  graph.nodes.forEach(function (d, i) {
      graph.nodes[i] = {
          "name": d
      };
  });

  sankey.nodes(graph.nodes)
      .links(graph.links)
      .layout(32);

  // add in the links
  var link = svg.append("g").selectAll(".link")
      .data(graph.links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("id",function(d,i) { return "linkLabel" + i ; })
      .attr("d", path)
      .style("stroke-width", function (d) {
         return 28;
      })
      .sort(function (a, b) {
         return b.dy - a.dy;
      })



  // add in the nodes
  //LU - RU - RB - Below scores - LB
  //dist = [[0,-10],[310,45],[310,160],[0,90],[0,190]];
  dist = [[0,-9],[320,-9.5],[320,170],[0,110],[0,214]];
  inds = 0;
  var node = svg.append("g").selectAll(".node")
      .data(graph.nodes)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
        var str = "translate(" + dist[inds][0]  + "," + dist[inds][1] + ")"
        inds++;
      return str;
  });
  inds = 0;

  // add the rectangles for the nodes
  node.append("rect")
      .attr("height", function (d) {
        // if (d.value == 12)
        // {
        //   return d.name;
        // }
        //
        // if (d.value == 11)
        // {
        //   return d.name;
        // }
        //

        if (d.name == right_up)
        {
          return 70;
        }

        if (d.name == right_down)
        {
          return 90;
        }

        return 55;
  })
      .attr("width", 140)
      .style("fill", function (d) {
        if (d.name === left_below)
        {
          return "#f9c600";
        }
      return d.color = "silver";
  })
      .style("stroke", function (d) {
      return d3.rgb(d.color).darker(2);
  })
      .append("title")
      .text(function (d) {
      return d.name + "\n" + format(d.value);
  });

  // add in the title for the nodes
  //LU - RU - RB - Below scores - LB
  dist = [40,40,50,10,40];
  inds = 0;
  node.append("text")
      .attr("x", 150)
      .attr("y", function (d) {
        if (d.name === right_down)
        {
          return 35;
        }
      return 20;
  })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function (d) {
        if (d.value == 12)
        {
          return d.name;
        }

        if (d.value == 11)
        {
          return d.name;
        }

        if (d.name == right_up)
        {
          return d.name;
        }

        if (d.name == right_down)
        {
          return d.name;
        }

        return d.name;
  })
  .attr("x", function (d) {
  return dist[inds++];
      })
      .attr("text-anchor", "start");
    inds = 0;


    //////
    //LU - RU - RB - Below scores - LB
    dist = [55,55,55,55,55];
    inds = 0;
    node.append("text")
        .attr("x", 150)
        .attr("y", function (d) {
          if (d.name === right_down)
          {
            return 50;
          }
        return 40;
    })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("transform", null)
        .text(function (d) {
          // if (d.value == 12)
          // {
          //   return "(" + 205 + ")";
          // }
          if (d.name == left_middle)
          {
            var num = pos_red_blw + neg_red_blw
            return "(" + num + ")";
          }

          if (d.name == left_up)
          {
            var num = pos_red_abv + neg_red_abv
            return "(" + num + ")";
          }

          if (d.name == left_below)
          {
            var num = pos_red_curr + neg_red_curr
            return "(" + num + ")";
          }

          if (d.name === right_up)
          {
            var num = pos_red_blw + pos_red_abv + pos_red_curr
            return "(" + num + ")";
          }

          if (d.name === right_down)
          {
            var num = neg_red_blw + neg_red_abv + neg_red_curr
            return "(" + num + ")";
          }

          return d.name;
    })
    .attr("x", function (d) {
    return dist[inds++];
        })
        .attr("text-anchor", "start");
      inds = 0;

    /////
  /* add labels to graphs */
  var cords = [-10,-12,5,5,7];
  var labelText = svg.selectAll(".labelText")
      .data(graph.links)
      .enter()
    .append("text")
      .attr("class","labelText")
      .attr("dx",function (d) {
        if (d.source.name === left_up && d.target.name === right_up)
        {
          return 30;
        }
        if (d.source.name === left_up && d.target.name === right_down)
        {
          return 30;
        }
        if (d.source.name === left_middle && d.target.name === right_down)
        {
          return 40;
        }
        if (d.source.name === left_middle && d.target.name === right_up)
        {
          return 30;
        }

        if (d.source.name === left_below && d.target.name === right_down)
        {
          return 30;
        }

        if (d.source.name === left_below && d.target.name === right_up)
        {
          return 65;
        }

        // var source =  d.source.name;
        // var target = d.target.name;
        // if (source == "Above scores" && target == "Approved")
        // {
        //   return cords[0];
        // }
        //
        // if (source == "Above scores" && target == "Denied")
        // {
        //   return cords[1];
        // }
        //
        // if (source == "Credit score <660" && target == "Approved")
        // {
        //   return cords[2];
        // }
        //
        // if (source == "Above scores" && target == "Approved")
        // {
        //   return cords[1];
        // }
        //
        // if (source == "Credit score <660" && target == "Denied")
        // {
        //   return cords[3];
        // }

        return 50;
  })
      .attr("dy" , function (d) {
        var source =  d.source.name;
        var target = d.target.name;
        if (source == left_up && target == right_up)
        {
          return cords[0];
        }

        if (source == left_up && target == right_down)
        {
          return cords[1];
        }

        if (source == left_below && target == right_up)
        {
          return -30;
        }

        if (source == left_below && target == right_down)
        {
          return -60;
        }

        if (source == left_middle && target == right_up)
        {
          return 5;
        }

        if (source == left_middle && target == right_down)
        {
          return 5;
        }

        return 5;
  })
    .append("textPath")
      .attr("xlink:href",function(d,i) { return "#linkLabel" + i;})
      .text(function(d,i) {
          //return d.source.name + " → " + d.target.name + " : " + d.value;});
          //true positive
          if (d.source.name === left_up && d.target.name === right_up)
          {
            //return "" + (tpa) + " → ";
            return "" + (((pos_red_abv) / (pos_red_abv + neg_red_abv)) * 100).toFixed(0) + "% " + "("+ (pos_red_abv)+ ") → "
          }

          if (d.source.name === left_up && d.target.name === right_down)
          {
            //return "" + (tpa) + " → ";
            return "" + (((neg_red_abv) / (pos_red_abv + neg_red_abv)) * 100).toFixed(0) + "% " + "("+ (neg_red_abv)+ ") → "
          }
          if (d.source.name === left_below && d.target.name === right_up)
          {
            //return "" + (tpa) + " → ";
            return "" + (((pos_red_curr) / (pos_red_curr + neg_red_curr)) * 100).toFixed(0) + "% " + "("+ (pos_red_curr)+ ") → "
          }

          if (d.source.name === left_below && d.target.name === right_down)
          {
            //return "" + (tpa) + " → ";
            return "" + (((neg_red_curr) / (pos_red_curr + neg_red_curr)) * 100).toFixed(0) + "% " + "("+ (neg_red_curr)+ ") → "
          }

          if (d.source.name === left_middle && d.target.name === right_up)
          {
            //return "" + (tpa) + " → ";
            return "" + (((pos_red_blw) / (pos_red_blw + neg_red_blw)) * 100).toFixed(0) + "% " + "("+ (pos_red_blw)+ ") → "
          }

          if (d.source.name === left_middle && d.target.name === right_down)
          {
            //return "" + (tpa) + " → ";
            return "" + (((neg_red_blw) / (pos_red_blw + neg_red_blw)) * 100).toFixed(0) + "% " + "("+ (neg_red_blw)+ ") → "
          }
          // //false negative
          // else if (d.value == 7)
          // {
          //   //return "" + (na - tna) + " → ";
          //   return "" + (10).toFixed(0) + "% " + "("+ (500)+ ") → ";
          // }
          // //false positive
          // else if (d.value == 2)
          // {
          //   //return "" + (pa - tpa) + " → ";
          //   return "" + (30).toFixed(0) + "% " + "("+ (400)+ ") → ";
          // }
          // //true negative
          // else
          // {
          //   //return "" + (tna) + " → ";
          //   return "" + 20 + "% " + "("+ (800)+ ") → ";
          // }
          //return "" +  d.value + " → ";
        });

  // the function for moving the nodes
  function dragmove(d) {
      d3.select(this).attr("transform",
          "translate(" + d.x + "," + (
      d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
      sankey.relayout();
      link.attr("d", path);
  }

  // svg.append("text")
  //       .attr("x", (width / 2))
  //       .attr("y", 265)
  //       .attr("text-anchor", "middle")
  //       .style("font-size", "16px")
  //       .style("font-weight", "bold")
  //       .style('fill', 'red')
  //       .text("Group " + FIRST_RACE);

    svg.selectAll(".link")
        .style('stroke', function(d){
          // if (d.value == 5)
          // {
          //   return "SteelBlue";
          // }
          // //true negative
          // else if (d.value == 7)
          // {
          //   return "SteelBlue";
          // }
          // //true positive
          // else if (d.value == 2)
          // {
          //   return "orange";
          // }else
          // {
          //   return "orange";
          // }

          if (d.source.name === left_up  && d.target.name === right_up)
          {
              return "#f0872d";

          }
          if (d.source.name === left_up  && d.target.name === right_down)
          {
              return "#ffb089";

          }

          if (d.source.name === left_below && d.target.name === right_up)
          {
              return "#f9c600";
          }
          if (d.source.name === left_below && d.target.name === right_down)
          {
              return "#ffd842";

          }

          if (d.source.name === left_middle && d.target.name === right_up)
          {
              return "#f24e95";

          }
          if (d.source.name === left_middle&& d.target.name === right_down)
          {
              return "#faa8a1";
          }
        }).style("stroke-opacity", function(d){
          // if (d.value == 5)
          // {
          //   return 1.4;
          // }
          // //true negative
          // else if (d.value == 7)
          // {
          //   return 0.5;
          // }
          // //true positive
          // else if (d.value == 2)
          // {
          //   return 0.5;
          // }else
          // {
          //   return 1;
          // }
          if (d.source.name === left_up && d.target.name === right_up)
          {
              return 5;
          }
          if (d.source.name === left_up && d.target.name === right_down)
          {
              return 0.5;

          }

          if (d.source.name === left_below && d.target.name === right_up)
          {
              return 5;
          }
          if (d.source.name === left_below && d.target.name === right_down)
          {
              return 0.5;
          }

          if (d.source.name === left_middle && d.target.name === right_up)
          {
              return 5;
          }
          if (d.source.name === left_middle && d.target.name === right_down)
          {
              return 0.5;
          }

        });

  // B Flow Chart
  var units = "Widgets";
  var currentWidth = document.getElementById("box1").offsetWidth;

  var margin = {
      top: 10,
      right: 10,
      bottom: 0,
      left: 10
  },


  // width = 0.9*currentWidth - margin.left - margin.right,
  //     height = 280 - margin.top - margin.bottom;

  width = 500,
       height = 270;

  var formatNumber = d3.format(",.0f"), // zero decimal places
      format = function (d) {
          return formatNumber(d) + " " + units;
      },
      color = d3.scale.category20();

  // append the svg canvas to the page
  var svg = d3.select("#chart_section1").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
      "translate(" + margin.left + "," + margin.top  + ")");

  // Set the sankey diagram properties
  var sankey = d3.sankey()
      .nodeWidth(115)
      .nodePadding(70)
      .size([width, height]);

  var path = sankey.link();

  // console.log(path);
  left_up = credit_ranges_flw[High];
  left_below = "Yours -> " + credit_ranges_flw[flw_chrt_index];
  left_middle = credit_ranges_flw[Low];
  right_up = "Approved   ";
  right_down = "Denied   ";



  // var data = [{
  //     "source": left_up,
  //         "target": right_up,
  //         "value": 5
  // }, {
  //     "source": left_up,
  //         "target": right_down,
  //         "value": 7
  // }, {
  //     "source": left_below,
  //         "target": right_up,
  //         "value": 2
  // }, {
  //     "source": left_below,
  //         "target": right_down,
  //         "value": 9
  // }];

  var data = [{
      "source": left_up,
          "target": right_up,
          "value": 5
  }, {
      "source": left_up,
          "target": right_down,
          "value": 7
  },

  {
      "source": left_below,
          "target": right_up,
          "value": 2
  }, {
      "source": left_below,
          "target": right_down,
          "value": 9
  }, {
      "source": left_middle,
          "target": right_up,
          "value": 1
  }, {
      "source": left_middle,
          "target": right_down,
          "value": 10
  }];

  //set up graph in same style as original example but empty
  graph = {
      "nodes": [],
          "links": []
  };

  data.forEach(function (d) {
      graph.nodes.push({
          "name": d.source
      });
      graph.nodes.push({
          "name": d.target
      });
      graph.links.push({
          "source": d.source,
              "target": d.target,
              "value": +d.value
      });
  });

  // return only the distinct / unique nodes
  graph.nodes = d3.keys(d3.nest()
      .key(function (d) {
      return d.name;
  })
      .map(graph.nodes));

  // loop through each link replacing the text with its index from node
  graph.links.forEach(function (d, i) {
      graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
      graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
  });

  //now loop through each nodes to make nodes an array of objects
  // rather than an array of strings
  graph.nodes.forEach(function (d, i) {
      graph.nodes[i] = {
          "name": d
      };
  });

  sankey.nodes(graph.nodes)
      .links(graph.links)
      .layout(32);

  // add in the links
  var link = svg.append("g").selectAll(".link")
      .data(graph.links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("id",function(d,i) { return "linkLabel" + i ; })
      .attr("d", path)
      .style("stroke-width", function (d) {
         return 28;
      })
      .sort(function (a, b) {
         return b.dy - a.dy;
      })



  // add in the nodes
  //LU - RU - RB - Below scores - LB
  //dist = [[0,-10],[310,45],[310,160],[0,90],[0,190]];
  dist = [[0,-9],[320,-9.5],[320,170],[0,110],[0,214]];
  inds = 0;
  var node = svg.append("g").selectAll(".node")
      .data(graph.nodes)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
        var str = "translate(" + dist[inds][0]  + "," + dist[inds][1] + ")"
        inds++;
      return str;
  });
  inds = 0;

  // add the rectangles for the nodes
  node.append("rect")
      .attr("height", function (d) {
        // if (d.value == 12)
        // {
        //   return d.name;
        // }
        //
        // if (d.value == 11)
        // {
        //   return d.name;
        // }
        //

        if (d.name == right_up)
        {
          return 70;
        }

        if (d.name == right_down)
        {
          return 90;
        }

        return 55;
  })
      .attr("width", 140)
      .style("fill", function (d) {
        if (d.name === left_below)
        {
          return "#f9c600";
        }
      return d.color = "silver";
  })
      .style("stroke", function (d) {
      return d3.rgb(d.color).darker(2);
  })
      .append("title")
      .text(function (d) {
      return d.name + "\n" + format(d.value);
  });

  // add in the title for the nodes
  //LU - RU - RB - Below scores - LB
  dist = [40,40,50,10,40];
  inds = 0;
  node.append("text")
      .attr("x", 150)
      .attr("y", function (d) {
        if (d.name === right_down)
        {
          return 35;
        }
      return 20;
  })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function (d) {
        if (d.value == 12)
        {
          return d.name;
        }

        if (d.value == 11)
        {
          return d.name;
        }

        if (d.name == right_up)
        {
          return d.name;
        }

        if (d.name == right_down)
        {
          return d.name;
        }

        return d.name;
  })
  .attr("x", function (d) {
  return dist[inds++];
      })
      .attr("text-anchor", "start");
    inds = 0;


    //////
    //LU - RU - RB - Below scores - LB
    dist = [55,55,55,55,55];
    inds = 0;
    node.append("text")
        .attr("x", 150)
        .attr("y", function (d) {
          if (d.name === right_down)
          {
            return 50;
          }
        return 40;
    })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("transform", null)
        .text(function (d) {
          // if (d.value == 12)
          // {
          //   return "(" + 205 + ")";
          // }
          if (d.name == left_middle)
          {
            var num = pos_blue_blw + neg_blue_blw
            return "(" + num + ")";
          }

          if (d.name == left_up)
          {
            var num = pos_blue_abv + neg_blue_abv
            return "(" + num + ")";
          }

          if (d.name == left_below)
          {
            var num = pos_blue_curr + neg_blue_curr
            return "(" + num + ")";
          }

          if (d.name === right_up)
          {
            var num = pos_blue_blw + pos_blue_abv + pos_blue_curr
            return "(" + num + ")";
          }

          if (d.name === right_down)
          {
            var num = neg_blue_blw + neg_blue_abv + neg_blue_curr
            return "(" + num + ")";
          }

          return d.name;
    })
    .attr("x", function (d) {
    return dist[inds++];
        })
        .attr("text-anchor", "start");
      inds = 0;

    /////
  /* add labels to graphs */
  var cords = [-10,-12,5,5,7];
  var labelText = svg.selectAll(".labelText")
      .data(graph.links)
      .enter()
    .append("text")
      .attr("class","labelText")
      .attr("dx",function (d) {
        if (d.source.name === left_up && d.target.name === right_up)
        {
          return 30;
        }
        if (d.source.name === left_up && d.target.name === right_down)
        {
          return 30;
        }
        if (d.source.name === left_middle && d.target.name === right_down)
        {
          return 40;
        }
        if (d.source.name === left_middle && d.target.name === right_up)
        {
          return 30;
        }

        if (d.source.name === left_below && d.target.name === right_down)
        {
          return 30;
        }

        if (d.source.name === left_below && d.target.name === right_up)
        {
          return 65;
        }

        // var source =  d.source.name;
        // var target = d.target.name;
        // if (source == "Above scores" && target == "Approved")
        // {
        //   return cords[0];
        // }
        //
        // if (source == "Above scores" && target == "Denied")
        // {
        //   return cords[1];
        // }
        //
        // if (source == "Credit score <660" && target == "Approved")
        // {
        //   return cords[2];
        // }
        //
        // if (source == "Above scores" && target == "Approved")
        // {
        //   return cords[1];
        // }
        //
        // if (source == "Credit score <660" && target == "Denied")
        // {
        //   return cords[3];
        // }

        return 50;
  })
      .attr("dy" , function (d) {
        var source =  d.source.name;
        var target = d.target.name;
        if (source == left_up && target == right_up)
        {
          return cords[0];
        }

        if (source == left_up && target == right_down)
        {
          return cords[1];
        }

        if (source == left_below && target == right_up)
        {
          return -30;
        }

        if (source == left_below && target == right_down)
        {
          return -60;
        }

        if (source == left_middle && target == right_up)
        {
          return 5;
        }

        if (source == left_middle && target == right_down)
        {
          return 5;
        }

        return 5;
  })
    .append("textPath")
      .attr("xlink:href",function(d,i) { return "#linkLabel" + i;})
      .text(function(d,i) {
          //return d.source.name + " → " + d.target.name + " : " + d.value;});
          //true positive
          if (d.source.name === left_up && d.target.name === right_up)
          {
            //return "" + (tpa) + " → ";
            return "" + (((pos_blue_abv) / (pos_blue_abv + neg_blue_abv)) * 100).toFixed(0) + "% " + "("+ (pos_blue_abv)+ ") → "
          }

          if (d.source.name === left_up && d.target.name === right_down)
          {
            //return "" + (tpa) + " → ";
            return "" + (((neg_blue_abv) / (pos_blue_abv + neg_blue_abv)) * 100).toFixed(0) + "% " + "("+ (neg_blue_abv)+ ") → "
          }
          if (d.source.name === left_below && d.target.name === right_up)
          {
            //return "" + (tpa) + " → ";
            return "" + (((pos_blue_curr) / (pos_blue_curr + neg_blue_curr)) * 100).toFixed(0) + "% " + "("+ (pos_blue_curr)+ ") → "
          }

          if (d.source.name === left_below && d.target.name === right_down)
          {
            //return "" + (tpa) + " → ";
            return "" + (((neg_blue_curr) / (pos_blue_curr + neg_blue_curr)) * 100).toFixed(0) + "% " + "("+ (neg_blue_curr)+ ") → "
          }

          if (d.source.name === left_middle && d.target.name === right_up)
          {
            //return "" + (tpa) + " → ";
            return "" + (((pos_blue_blw) / (pos_blue_blw + neg_blue_blw)) * 100).toFixed(0) + "% " + "("+ (pos_blue_blw)+ ") → "
          }

          if (d.source.name === left_middle && d.target.name === right_down)
          {
            //return "" + (tpa) + " → ";
            return "" + (((neg_blue_blw) / (pos_blue_blw + neg_blue_blw)) * 100).toFixed(0) + "% " + "("+ (neg_blue_blw)+ ") → "
          }
          // //false negative
          // else if (d.value == 7)
          // {
          //   //return "" + (na - tna) + " → ";
          //   return "" + (10).toFixed(0) + "% " + "("+ (500)+ ") → ";
          // }
          // //false positive
          // else if (d.value == 2)
          // {
          //   //return "" + (pa - tpa) + " → ";
          //   return "" + (30).toFixed(0) + "% " + "("+ (400)+ ") → ";
          // }
          // //true negative
          // else
          // {
          //   //return "" + (tna) + " → ";
          //   return "" + 20 + "% " + "("+ (800)+ ") → ";
          // }
          //return "" +  d.value + " → ";
        });

  // the function for moving the nodes
  function dragmove(d) {
      d3.select(this).attr("transform",
          "translate(" + d.x + "," + (
      d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
      sankey.relayout();
      link.attr("d", path);
  }

  // svg.append("text")
  //       .attr("x", (width / 2))
  //       .attr("y", 265)
  //       .attr("text-anchor", "middle")
  //       .style("font-size", "16px")
  //       .style("font-weight", "bold")
  //       .style('fill', 'red')
  //       .text("Group " + FIRST_RACE);

    svg.selectAll(".link")
        .style('stroke', function(d){
          // if (d.value == 5)
          // {
          //   return "SteelBlue";
          // }
          // //true negative
          // else if (d.value == 7)
          // {
          //   return "SteelBlue";
          // }
          // //true positive
          // else if (d.value == 2)
          // {
          //   return "orange";
          // }else
          // {
          //   return "orange";
          // }

          if (d.source.name === left_up  && d.target.name === right_up)
          {
              return "#f0872d";

          }
          if (d.source.name === left_up  && d.target.name === right_down)
          {
              return "#ffb089";

          }

          if (d.source.name === left_below && d.target.name === right_up)
          {
              return "#f9c600";
          }
          if (d.source.name === left_below && d.target.name === right_down)
          {
              return "#ffd842";

          }

          if (d.source.name === left_middle && d.target.name === right_up)
          {
              return "#f24e95";

          }
          if (d.source.name === left_middle&& d.target.name === right_down)
          {
              return "#faa8a1";
          }
        }).style("stroke-opacity", function(d){
          // if (d.value == 5)
          // {
          //   return 1.4;
          // }
          // //true negative
          // else if (d.value == 7)
          // {
          //   return 0.5;
          // }
          // //true positive
          // else if (d.value == 2)
          // {
          //   return 0.5;
          // }else
          // {
          //   return 1;
          // }
          if (d.source.name === left_up && d.target.name === right_up)
          {
              return 5;
          }
          if (d.source.name === left_up && d.target.name === right_down)
          {
              return 0.5;

          }

          if (d.source.name === left_below && d.target.name === right_up)
          {
              return 5;
          }
          if (d.source.name === left_below && d.target.name === right_down)
          {
              return 0.5;
          }

          if (d.source.name === left_middle && d.target.name === right_up)
          {
              return 5;
          }
          if (d.source.name === left_middle && d.target.name === right_down)
          {
              return 0.5;
          }

        });

      }
      else
      {
        // document.getElementById("RED_ABOVE_1").style.display = "none";
        // document.getElementById("RED_ABOVE_2").style.display = "none";
        // document.getElementById("RED_ABOVE_3").style.display = "none";
        // document.getElementById("BLUE_ABOVE_1").style.display = "none";
        // document.getElementById("BLUE_ABOVE_2").style.display = "none";
        // document.getElementById("BLUE_ABOVE_3").style.display = "none";

        //ALTUG
        var units = "Widgets";
 var currentWidth = document.getElementById("box1").offsetWidth;

 var margin = {
     top: 10,
     right: 10,
     bottom: 0,
     left: 10
 },


 // width = 0.9*currentWidth - margin.left - margin.right,
 //     height = 280 - margin.top - margin.bottom;

 width = 500,
      height = 270;

 var formatNumber = d3.format(",.0f"), // zero decimal places
     format = function (d) {
         return formatNumber(d) + " " + units;
     },
     color = d3.scale.category20();

 // append the svg canvas to the page
 var svg = d3.select("#chart_section").append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
     .append("g")
     .attr("transform",
     "translate(" + margin.left + "," + margin.top  + ")");

 // Set the sankey diagram properties
 var sankey = d3.sankey()
     .nodeWidth(115)
     .nodePadding(70)
     .size([width, height]);

 var path = sankey.link();

 // console.log(path);
 if (usr.index_credit != 0)
 {
  left_up = "Yours -> " + credit_ranges_flw[flw_chrt_index];
  left_below = credit_ranges_flw[Low];
  } else
  {
    left_up = credit_ranges_flw[High];
    left_below = "Yours -> " + credit_ranges_flw[flw_chrt_index];
  }
 right_up = "Approved";
 right_down = "Denied";



 var data = [{
     "source": left_up,
         "target": right_up,
         "value": 5
 }, {
     "source": left_up,
         "target": right_down,
         "value": 7
 }, {
     "source": left_below,
         "target": right_up,
         "value": 2
 }, {
     "source": left_below,
         "target": right_down,
         "value": 9
 }];


 //set up graph in same style as original example but empty
 graph = {
     "nodes": [],
         "links": []
 };

 data.forEach(function (d) {
     graph.nodes.push({
         "name": d.source
     });
     graph.nodes.push({
         "name": d.target
     });
     graph.links.push({
         "source": d.source,
             "target": d.target,
             "value": +d.value
     });
 });

 // return only the distinct / unique nodes
 graph.nodes = d3.keys(d3.nest()
     .key(function (d) {
     return d.name;
 })
     .map(graph.nodes));

 // loop through each link replacing the text with its index from node
 graph.links.forEach(function (d, i) {
     graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
     graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
 });

 //now loop through each nodes to make nodes an array of objects
 // rather than an array of strings
 graph.nodes.forEach(function (d, i) {
     graph.nodes[i] = {
         "name": d
     };
 });

 sankey.nodes(graph.nodes)
     .links(graph.links)
     .layout(32);

 // add in the links
 var link = svg.append("g").selectAll(".link")
     .data(graph.links)
     .enter()
     .append("path")
     .attr("class", "link")
     .attr("id",function(d,i) { return "linkLabel" + i ; })
     .attr("d", path)
     .style("stroke-width", function (d) {
        return 22;
     })
     .sort(function (a, b) {
        return b.dy - a.dy;
     })



 // add in the nodes
 dist = [[0,0],[310,0],[310,160],[0,160]];
 inds = 0;
 var node = svg.append("g").selectAll(".node")
     .data(graph.nodes)
     .enter().append("g")
     .attr("class", "node")
     .attr("transform", function (d) {
       var str = "translate(" + dist[inds][0]  + "," + dist[inds][1] + ")"
       inds++;
     return str;
 });
 inds = 0;

 // add the rectangles for the nodes
 node.append("rect")
     .attr("height", function (d) {
     return 80;
 })
     .attr("width", 150)
     .style("fill", function (d) {
      if (usr.index_credit != 0)
      {
        if (d.name === left_up)
       {
         return d.color = "#f9c600";
       }
       } else
       {
        if (d.name === left_below)
        {
          return d.color = "#f9c600";
        }
       }
       
     return d.color = "silver";
 })
     .style("stroke", function (d) {
     return d3.rgb(d.color).darker(2);
 })
     .append("title")
     .text(function (d) {
     return d.name + "\n" + format(d.value);
 });

 // add in the title for the nodes
 
 if (usr.index_credit != 0)
  {
    dist = [16,47,55,42];
  }
  else
  {
    dist = [47,47,55,16];
  }
 inds = 0;
 node.append("text")
     .attr("x", 150)
     .attr("y", function (d) {
     return 35;
 })
     .attr("dy", ".35em")
     .attr("text-anchor", "end")
     .attr("transform", null)
     .text(function (d) {
       if (d.value == 12)
       {
         return d.name;
       }

       if (d.value == 11)
       {
         return d.name;
       }

       if (d.name == right_up)
       {
         return d.name;
       }

       if (d.name == right_down)
       {
         return d.name;
       }

       return d.name;
 })
 .attr("x", function (d) {
 return dist[inds++];
     })
     .attr("text-anchor", "start");
   inds = 0;


   //////

   
  
  dist = [60,60,58,60];
   inds = 0;
   node.append("text")
       .attr("x", 150)
       .attr("y", function (d) {
       return 55;
   })
       .attr("dy", ".35em")
       .attr("text-anchor", "end")
       .attr("transform", null)
       .text(function (d) {

        if (usr.index_credit != 0)
      {
        if (d.value == 12)
        {
          return "(" + (pos_red_curr + neg_red_curr) + ")";
        }

        if (d.value == 11)
        {
          return "(" + (pos_red_blw + neg_red_blw) + ")";
        }

        if (d.name == right_up)
        {
          return "(" + (pos_red_curr + pos_red_blw) + ")";
        }

        if (d.name == right_down)
        {
          return "(" + (neg_red_blw + neg_red_curr) + ")";
        } 
       } else
       {
        if (d.value == 12)
         {
           
           return "(" + (pos_red_abv + neg_red_abv) + ")";
         }

         if (d.value == 11)
         {
           
           return "(" + (pos_red_curr + neg_red_curr) + ")";
         }

         if (d.name == right_up)
         {
           return "(" + (pos_red_curr + pos_red_abv) + ")";
         }

         if (d.name == right_down)
         {
           return "(" + (neg_red_abv + neg_red_curr) + ")";
         }
       }
         
         

         return d.name;
   })
   .attr("x", function (d) {
   return dist[inds++];
       })
       .attr("text-anchor", "start");
     inds = 0;

   /////
 /* add labels to graphs */
 var cords = [3,-1,12,7];
 var labelText = svg.selectAll(".labelText")
     .data(graph.links)
     .enter()
   .append("text")
     .attr("class","labelText")
     .attr("dx",50)
     .attr("dy" , function (d) {
       var source =  d.source.name;
       var target = d.target.name;
       if (source == left_up && target == right_up)
       {
         return cords[0];
       }

       if (source == left_up && target == right_down)
       {
         return cords[1];
       }

       if (source == left_below && target == right_up)
       {
         return cords[2];
       }

       if (source == left_below && target == right_down)
       {
         return cords[3];
       }

       return 5;
 })
   .append("textPath")
     .attr("xlink:href",function(d,i) { return "#linkLabel" + i;})
     .text(function(d,i) {
         //return d.source.name + " → " + d.target.name + " : " + d.value;});
         //true positive
         if (usr.index_credit != 0)
          {
            if (d.value == 5)
         {
           //return "" + (tpa) + " → ";
           return "" + ((pos_red_curr / (pos_red_curr + neg_red_curr)) * 100.0).toFixed(0) + "% " + "("+ (pos_red_curr)+ ") → "
         }
         //false negative
         else if (d.value == 7)
         {
           //return "" + (na - tna) + " → ";
           return "" + (((neg_red_curr) / ((1.0) * (pos_red_curr + neg_red_curr))) * 100).toFixed(0) + "% " + "("+ (neg_red_curr)+ ") → ";
         }
         //false positive
         else if (d.value == 2)
         {
           //return "" + (pa - tpa) + " → ";
           return "" + (((pos_red_blw) / ((1.0) * (pos_red_blw + neg_red_blw)))* 100).toFixed(0) + "% " + "("+ (pos_red_blw)+ ") → ";
         }
         //true negative
         else
         {
           //return "" + (tna) + " → ";
           return "" + (((neg_red_blw) / ((1.0) * (pos_red_blw + neg_red_blw)))*100).toFixed(0) + "% " + "("+ (neg_red_blw)+ ") → ";
         }
          }
          else
          {
            if (d.value == 5)
            {
              //return "" + (tpa) + " → ";
              return "" + ((pos_red_abv / (pos_red_abv + neg_red_abv)) * 100.0).toFixed(0) + "% " + "("+ (pos_red_abv)+ ") → "
            }
            //false negative
            else if (d.value == 7)
            {
              //return "" + (na - tna) + " → ";
              return "" + (((neg_red_abv) / ((1.0) * (pos_red_abv + neg_red_abv))) * 100).toFixed(0) + "% " + "("+ (neg_red_abv)+ ") → ";
            }
            //false positive
            else if (d.value == 2)
            {
              //return "" + (pa - tpa) + " → ";
              return "" + (((pos_red_curr) / ((1.0) * (pos_red_curr + neg_red_curr)))* 100).toFixed(0) + "% " + "("+ (pos_red_curr)+ ") → ";
            }
            //true negative
            else
            {
              //return "" + (tna) + " → ";
              return "" + (((neg_red_curr) / ((1.0) * (pos_red_curr + neg_red_curr)))*100).toFixed(0) + "% " + "("+ (neg_red_curr)+ ") → ";
            }
          }
         
         //return "" +  d.value + " → ";
       });

 // the function for moving the nodes
 function dragmove(d) {
     d3.select(this).attr("transform",
         "translate(" + d.x + "," + (
     d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
     sankey.relayout();
     link.attr("d", path);
 }

 // svg.append("text")
 //       .attr("x", (width / 2))
 //       .attr("y", 265)
 //       .attr("text-anchor", "middle")
 //       .style("font-size", "16px")
 //       .style("font-weight", "bold")
 //       .style('fill', 'red')
 //       .text("Group " + FIRST_RACE);

   svg.selectAll(".link")
       .style('stroke', function(d){
        if (usr.index_credit != 0)
        {
          if (d.value == 5)
         {
           return "#f9c600";
         }
         //true negative
         else if (d.value == 7)
         {
           return "#ffd842";
         }
         //true positive
         else if (d.value == 2)
         {
           return "#f24e95";
         }else
         {
           return "#faa8a1";
         }
        }
        else
        {
          if (d.value == 5)
         {
           return "#f0872d";
           //bura
         }
         //true negative
         else if (d.value == 7)
         {
           return "#ffb089";
         }
         //true positive
         else if (d.value == 2)
         {
          return "#f9c600";
           //return "#f24e95";
         }else
         {
          return "#ffd842";
         }
        }
         
       }).style("stroke-opacity", function(d){
         if (d.value == 5)
         {
           return 5;
         }
         //true negative
         else if (d.value == 7)
         {
           return 0.5;
         }
         //true positive
         else if (d.value == 2)
         {
           return 5;
         }else
         {
           return 0.5;
         }
       });

 // B Flow Chart
 var units = "Widgets";
 var currentWidth = document.getElementById("box1").offsetWidth;

 var margin = {
     top: 10,
     right: 10,
     bottom: 0,
     left: 10
 },


 // width = 0.9*currentWidth - margin.left - margin.right,
 //     height = 280 - margin.top - margin.bottom;

 width = 500,
      height = 270;

 var formatNumber = d3.format(",.0f"), // zero decimal places
     format = function (d) {
         return formatNumber(d) + " " + units;
     },
     color = d3.scale.category20();

 // append the svg canvas to the page
 var svg = d3.select("#chart_section1").append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
     .append("g")
     .attr("transform",
     "translate(" + margin.left + "," + margin.top  + ")");

 // Set the sankey diagram properties
 var sankey = d3.sankey()
     .nodeWidth(115)
     .nodePadding(70)
     .size([width, height]);

 var path = sankey.link();



 var data = [{
     "source": left_up,
         "target": right_up,
         "value": 5
 }, {
     "source": left_up,
         "target": right_down,
         "value": 7
 }, {
     "source": left_below,
         "target": right_up,
         "value": 2
 }, {
     "source": left_below,
         "target": right_down,
         "value": 9
 }];


 //set up graph in same style as original example but empty
 graph = {
     "nodes": [],
         "links": []
 };

 data.forEach(function (d) {
     graph.nodes.push({
         "name": d.source
     });
     graph.nodes.push({
         "name": d.target
     });
     graph.links.push({
         "source": d.source,
             "target": d.target,
             "value": +d.value
     });
 });

 // return only the distinct / unique nodes
 graph.nodes = d3.keys(d3.nest()
     .key(function (d) {
     return d.name;
 })
     .map(graph.nodes));

 // loop through each link replacing the text with its index from node
 graph.links.forEach(function (d, i) {
     graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
     graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
 });

 //now loop through each nodes to make nodes an array of objects
 // rather than an array of strings
 graph.nodes.forEach(function (d, i) {
     graph.nodes[i] = {
         "name": d
     };
 });

 sankey.nodes(graph.nodes)
     .links(graph.links)
     .layout(32);

 // add in the links
 var link = svg.append("g").selectAll(".link")
     .data(graph.links)
     .enter()
     .append("path")
     .attr("class", "link")
     .attr("id",function(d,i) { return "linkLabel" + i ; })
     .attr("d", path)
     .style("stroke-width", function (d) {
        return 22;
     })
     .sort(function (a, b) {
        return b.dy - a.dy;
     })



 // add in the nodes
 dist = [[0,0],[310,0],[310,160],[0,160]];
 inds = 0;
 var node = svg.append("g").selectAll(".node")
     .data(graph.nodes)
     .enter().append("g")
     .attr("class", "node")
     .attr("transform", function (d) {
       var str = "translate(" + dist[inds][0]  + "," + dist[inds][1] + ")"
       inds++;
     return str;
 });
 inds = 0;

 // add the rectangles for the nodes
 node.append("rect")
     .attr("height", function (d) {
     return 80;
 })
     .attr("width", 150)
     .style("fill", function (d) {
      if (usr.index_credit != 0)
      {
        if (d.name === left_up)
       {
         return d.color = "#f9c600";
       }
       } else
       {
        if (d.name === left_below)
        {
          return d.color = "#f9c600";
        }
       }
     return d.color = "silver";
 })
     .style("stroke", function (d) {
     return d3.rgb(d.color).darker(2);
 })
     .append("title")
     .text(function (d) {
     return d.name + "\n" + format(d.value);
 });

 // add in the title for the nodes
 if (usr.index_credit != 0)
  {
    dist = [16,47,55,42];
  }
  else
  {
    dist = [47,47,55,16];
  }
 inds = 0;
 node.append("text")
     .attr("x", 150)
     .attr("y", function (d) {
     return 35;
 })
     .attr("dy", ".35em")
     .attr("text-anchor", "end")
     .attr("transform", null)
     .text(function (d) {
       if (d.value == 12)
       {
         return d.name;
       }

       if (d.value == 11)
       {
         return d.name;
       }

       if (d.name == right_up)
       {
         return d.name;
       }

       if (d.name == right_down)
       {
         return d.name;
       }

       return d.name;
 })
 .attr("x", function (d) {
 return dist[inds++];
     })
     .attr("text-anchor", "start");
   inds = 0;


   dist = [60,60,58,60];
   inds = 0;
   node.append("text")
       .attr("x", 150)
       .attr("y", function (d) {
       return 55;
   })
       .attr("dy", ".35em")
       .attr("text-anchor", "end")
       .attr("transform", null)
       .text(function (d) {
        if (usr.index_credit != 0)
        {
          if (d.value == 12)
          {
            return "(" + (pos_blue_curr + neg_blue_curr) + ")";
          }
  
          if (d.value == 11)
          {
            return "(" + (pos_blue_blw + neg_blue_blw) + ")";
          }
  
          if (d.name == right_up)
          {
            return "(" + (pos_blue_curr + pos_blue_blw) + ")";
          }
  
          if (d.name == right_down)
          {
            return "(" + (neg_blue_blw + neg_blue_curr) + ")";
          } 
         } else
         {
          if (d.value == 12)
           {
             
             return "(" + (pos_blue_abv + neg_blue_abv) + ")";
           }
  
           if (d.value == 11)
           {
             
             return "(" + (pos_blue_curr + neg_blue_curr) + ")";
           }
  
           if (d.name == right_up)
           {
             return "(" + (pos_blue_curr + pos_blue_abv) + ")";
           }
  
           if (d.name == right_down)
           {
             return "(" + (neg_blue_abv + neg_blue_curr) + ")";
           }
         }

         return d.name;
   })
   .attr("x", function (d) {
   return dist[inds++];
       })
       .attr("text-anchor", "start");
     inds = 0;



 /* add labels to graphs */
 var cords = [3,-1,12,7];
 var labelText = svg.selectAll(".labelText")
     .data(graph.links)
     .enter()
   .append("text")
     .attr("class","labelText")
     .attr("dx",50) // was 65
     .attr("dy" , function (d) {
       var source =  d.source.name;
       var target = d.target.name;
       if (source == left_up && target == right_up)
       {
         return cords[0];
       }

       if (source == left_up && target == right_down )
       {
         return cords[1];
       }

       if (source == left_below && target == right_up)
       {
         return cords[2];
       }

       if (source == left_below && target == right_down )
       {
         return cords[3];
       }

       return 5;
 })
   .append("textPath")
     .attr("xlink:href",function(d,i) { return "#linkLabel" + i;})
     .text(function(d,i) {
         //return d.source.name + " → " + d.target.name + " : " + d.value;});
         //true positive
         if (usr.index_credit != 0)
          {
            if (d.value == 5)
         {
           //return "" + (tpa) + " → ";
           return "" + ((pos_blue_curr / (pos_blue_curr + neg_blue_curr)) * 100.0).toFixed(0) + "% " + "("+ (pos_blue_curr)+ ") → "
         }
         //false negative
         else if (d.value == 7)
         {
           //return "" + (na - tna) + " → ";
           return "" + (((neg_blue_curr) / ((1.0) * (pos_blue_curr + neg_blue_curr))) * 100).toFixed(0) + "% " + "("+ (neg_blue_curr)+ ") → ";
         }
         //false positive
         else if (d.value == 2)
         {
           //return "" + (pa - tpa) + " → ";
           return "" + (((pos_blue_blw) / ((1.0) * (pos_blue_blw + neg_blue_blw)))* 100).toFixed(0) + "% " + "("+ (pos_blue_blw)+ ") → ";
         }
         //true negative
         else
         {
           //return "" + (tna) + " → ";
           return "" + (((neg_blue_blw) / ((1.0) * (pos_blue_blw + neg_blue_blw)))*100).toFixed(0) + "% " + "("+ (neg_blue_blw)+ ") → ";
         }
          }
          else
          {
            if (d.value == 5)
            {
              //return "" + (tpa) + " → ";
              return "" + ((pos_blue_abv / (pos_blue_abv + neg_blue_abv)) * 100.0).toFixed(0) + "% " + "("+ (pos_blue_abv)+ ") → "
            }
            //false negative
            else if (d.value == 7)
            {
              //return "" + (na - tna) + " → ";
              return "" + (((neg_blue_abv) / ((1.0) * (pos_blue_abv + neg_blue_abv))) * 100).toFixed(0) + "% " + "("+ (neg_blue_abv)+ ") → ";
            }
            //false positive
            else if (d.value == 2)
            {
              //return "" + (pa - tpa) + " → ";
              return "" + (((pos_blue_curr) / ((1.0) * (pos_blue_curr + neg_blue_curr)))* 100).toFixed(0) + "% " + "("+ (pos_blue_curr)+ ") → ";
            }
            //true negative
            else
            {
              //return "" + (tna) + " → ";
              return "" + (((neg_blue_curr) / ((1.0) * (pos_blue_curr + neg_blue_curr)))*100).toFixed(0) + "% " + "("+ (neg_blue_curr)+ ") → ";
            }
          }
         //return "" +  d.value + " → ";
       });

 // the function for moving the nodes
 function dragmove(d) {
     d3.select(this).attr("transform",
         "translate(" + d.x + "," + (
     d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
     sankey.relayout();
     link.attr("d", path);
 }

 // svg.append("text")
 //       .attr("x", (width / 2))
 //       .attr("y", 265)
 //       .attr("text-anchor", "middle")
 //       .style("font-size", "16px")
 //       .style("font-weight", "bold")
 //       .style('fill', 'blue')
 //       .text("Group " + SECOND_RACE);

   svg.selectAll(".link")
       .style('stroke', function(d){
        if (usr.index_credit != 0)
        {
          if (d.value == 5)
         {
           return "#f9c600";
         }
         //true negative
         else if (d.value == 7)
         {
           return "#ffd842";
         }
         //true positive
         else if (d.value == 2)
         {
           return "#f24e95";
         }else
         {
           return "#faa8a1";
         }
        }
        else
        {
          if (d.value == 5)
         {
           return "#f0872d";
           //bura
         }
         //true negative
         else if (d.value == 7)
         {
           return "#ffb089";
         }
         //true positive
         else if (d.value == 2)
         {
          return "#f9c600";
           //return "#f24e95";
         }else
         {
          return "#ffd842";
         }
        }
       }).style("stroke-opacity", function(d){
         if (d.value == 5)
         {
           return 5;
         }
         //true negative
         else if (d.value == 7)
         {
           return 0.5;
         }
         //true positive
         else if (d.value == 2)
         {
           return 5;
         }else
         {
           return 0.5;
         }
       });

      }

  /////////////////////////////////////////////////////// TWO WAY FLOWCHART ////////////////////////////////
  d3.sankey = function () {
        var sankey = {},
        nodeWidth = 24,
            nodePadding = 8,
            size = [1, 1],
            nodes = [],
            links = [];

        sankey.nodeWidth = function (_) {
            if (!arguments.length) return nodeWidth;
            nodeWidth = +_;
            return sankey;
        };

        sankey.nodePadding = function (_) {
            if (!arguments.length) return nodePadding;
            nodePadding = +_;
            return sankey;
        };

        sankey.nodes = function (_) {
            if (!arguments.length) return nodes;
            nodes = _;
            return sankey;
        };

        sankey.links = function (_) {
            if (!arguments.length) return links;
            links = _;
            return sankey;
        };

        sankey.size = function (_) {
            if (!arguments.length) return size;
            size = _;
            return sankey;
        };

        sankey.layout = function (iterations) {
            computeNodeLinks();
            computeNodeValues();
            computeNodeBreadths();
            computeNodeDepths(iterations);
            computeLinkDepths();
            return sankey;
        };

        sankey.relayout = function () {
            computeLinkDepths();
            return sankey;
        };

        sankey.link = function () {
            var curvature = 0.2; // was 0.3

            function link(d) {
                var x0 = d.source.x + d.source.dx,
                    x1 = d.target.x,
                    xi = d3.interpolateNumber(x0, x1),
                    x2 = xi(curvature) ,
                    x3 = xi(1 - curvature) ,
                    y0 = d.source.y + d.sy   + d.dy / 2 ,
                    y1 = d.target.y + d.ty  + d.dy / 2;
                return "M" + x0  + "," + y0 + "C" + x2 + "," + y0 + " " + x3 + "," + y1 + " " + x1 + "," + y1;
            }

            link.curvature = function (_) {
                if (!arguments.length) return curvature;
                curvature = +_;
                return link;
            };

            return link;
        };

        // Populate the sourceLinks and targetLinks for each node.
        // Also, if the source and target are not objects, assume they are indices.
        function computeNodeLinks() {
            nodes.forEach(function (node) {
                node.sourceLinks = [];
                node.targetLinks = [];
            });
            links.forEach(function (link) {
                var source = link.source,
                    target = link.target;
                if (typeof source === "number") source = link.source = nodes[link.source];
                if (typeof target === "number") target = link.target = nodes[link.target];
                source.sourceLinks.push(link);
                target.targetLinks.push(link);
            });
        }

        // Compute the value (size) of each node by summing the associated links.
        function computeNodeValues() {
            nodes.forEach(function (node) {
                node.value = Math.max(
                d3.sum(node.sourceLinks, value),
                d3.sum(node.targetLinks, value));
            });
        }

        // Iteratively assign the breadth (x-position) for each node.
        // Nodes are assigned the maximum breadth of incoming neighbors plus one;
        // nodes with no incoming links are assigned breadth zero, while
        // nodes with no outgoing links are assigned the maximum breadth.
        function computeNodeBreadths() {
            var remainingNodes = nodes,
                nextNodes,
                x = 0;

            while (remainingNodes.length) {
                nextNodes = [];
                remainingNodes.forEach(function (node) {
                    node.x = x;
                    node.dx = nodeWidth;
                    node.sourceLinks.forEach(function (link) {
                        nextNodes.push(link.target);
                    });
                });
                remainingNodes = nextNodes;
                ++x;
            }

            //
            moveSinksRight(x);
            scaleNodeBreadths((width - nodeWidth) / (x - 1));
        }

        function moveSourcesRight() {
            nodes.forEach(function (node) {
                if (!node.targetLinks.length) {
                    node.x = d3.min(node.sourceLinks, function (d) {
                        return d.target.x;
                    }) - 1;
                }
            });
        }

        function moveSinksRight(x) {
            nodes.forEach(function (node) {
                if (!node.sourceLinks.length) {
                    node.x = x - 1;
                }
            });
        }

        function scaleNodeBreadths(kx) {
            nodes.forEach(function (node) {
                node.x *= kx;
            });
        }

        function computeNodeDepths(iterations) {
            var nodesByBreadth = d3.nest()
                .key(function (d) {
                return d.x;
            })
                .sortKeys(d3.ascending)
                .entries(nodes)
                .map(function (d) {
                return d.values;
            });

            //
            initializeNodeDepth();
            resolveCollisions();
            for (var alpha = 1; iterations > 0; --iterations) {
                relaxRightToLeft(alpha *= .99);
                resolveCollisions();
                relaxLeftToRight(alpha);
                resolveCollisions();
            }

            function initializeNodeDepth() {
                var ky = d3.min(nodesByBreadth, function (nodes) {
                    return (size[1] - (nodes.length - 1) * nodePadding) / d3.sum(nodes, value);
                });

                nodesByBreadth.forEach(function (nodes) {
                    nodes.forEach(function (node, i) {
                        node.y = i;
                        node.dy = node.value * ky;
                    });
                });

                links.forEach(function (link) {
                    link.dy = link.value * ky;
                });
            }

            function relaxLeftToRight(alpha) {
                nodesByBreadth.forEach(function (nodes, breadth) {
                    nodes.forEach(function (node) {
                        if (node.targetLinks.length) {
                            var y = d3.sum(node.targetLinks, weightedSource) / d3.sum(node.targetLinks, value);
                            node.y += (y - center(node)) * alpha;
                        }
                    });
                });

                function weightedSource(link) {
                    return center(link.source) * link.value;
                }
            }

            function relaxRightToLeft(alpha) {
                nodesByBreadth.slice().reverse().forEach(function (nodes) {
                    nodes.forEach(function (node) {
                        if (node.sourceLinks.length) {
                            var y = d3.sum(node.sourceLinks, weightedTarget) / d3.sum(node.sourceLinks, value);
                            node.y += (y - center(node)) * alpha;
                        }
                    });
                });

                function weightedTarget(link) {
                    return center(link.target) * link.value;
                }
            }

            function resolveCollisions() {
                nodesByBreadth.forEach(function (nodes) {
                    var node,
                    dy,
                    y0 = 0,
                        n = nodes.length,
                        i;

                    // Push any overlapping nodes down.
                    nodes.sort(ascendingDepth);
                    for (i = 0; i < n; ++i) {
                        node = nodes[i];
                        dy = y0 - node.y;
                        if (dy > 0) node.y += dy;
                        y0 = node.y + node.dy + nodePadding;
                    }

                    // If the bottommost node goes outside the bounds, push it back up.
                    dy = y0 - nodePadding - size[1];
                    if (dy > 0) {
                        y0 = node.y -= dy;

                        // Push any overlapping nodes back up.
                        for (i = n - 2; i >= 0; --i) {
                            node = nodes[i];
                            dy = node.y + node.dy + nodePadding - y0;
                            if (dy > 0) node.y -= dy;
                            y0 = node.y;
                        }
                    }
                });
            }

            function ascendingDepth(a, b) {
                return a.y - b.y;
            }
        }

        function computeLinkDepths() {
            nodes.forEach(function (node) {
                node.sourceLinks.sort(ascendingTargetDepth);
                node.targetLinks.sort(ascendingSourceDepth);
            });

            dist = [[0.1,0],[0,0.1],[0,25],[0.1,0]];
            inds = 0;
            nodes.forEach(function (node) {
                var sy = 0,
                    ty = 0;
                node.sourceLinks.forEach(function (link) {
                    link.sy = sy + dist[inds][0];
                    sy += 5;
                });
                node.targetLinks.forEach(function (link) {
                    link.ty = ty + dist[inds][1];
                    ty += 25;
                    // console.log(link);
                });
                inds++;
            });

            inds = 0;

            function ascendingSourceDepth(a, b) {
                return a.source.y - b.source.y;
            }

            function ascendingTargetDepth(a, b) {
                return a.target.y - b.target.y;
            }
        }

        function center(node) {
            return node.y + node.dy / 2;
        }

        function value(link) {
            return link.value;
        }

        return sankey;
    };




    // A Flow Chart
    var units = "Widgets";
    var currentWidth = document.getElementById("box1").offsetWidth;

    var margin = {
        top: 10,
        right: 10,
        bottom: 0,
        left: 10
    },


    // width = 0.9*currentWidth - margin.left - margin.right,
    //     height = 280 - margin.top - margin.bottom;

    width = 500,
         height = 270;

    var formatNumber = d3.format(",.0f"), // zero decimal places
        format = function (d) {
            return formatNumber(d) + " " + units;
        },
        color = d3.scale.category20();

    // append the svg canvas to the page
    var svg = d3.select("#chart_section_660").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
        "translate(" + margin.left + "," + margin.top  + ")");

    // Set the sankey diagram properties
    var sankey = d3.sankey()
        .nodeWidth(115)
        .nodePadding(70)
        .size([width, height]);

    var path = sankey.link();

    // console.log(path);
    left_up = "Credit score " + threshold + "+ ";
    left_below = "Credit score <" + threshold + " ";
    right_up = "Approved ";
    right_down = "Denied ";



    var data = [{
        "source": left_up,
            "target": right_up,
            "value": 5
    }, {
        "source": left_up,
            "target": right_down,
            "value": 7
    }, {
        "source": left_below,
            "target": right_up,
            "value": 2
    }, {
        "source": left_below,
            "target": right_down,
            "value": 9
    }];


    //set up graph in same style as original example but empty
    graph = {
        "nodes": [],
            "links": []
    };

    data.forEach(function (d) {
        graph.nodes.push({
            "name": d.source
        });
        graph.nodes.push({
            "name": d.target
        });
        graph.links.push({
            "source": d.source,
                "target": d.target,
                "value": +d.value
        });
    });

    // return only the distinct / unique nodes
    graph.nodes = d3.keys(d3.nest()
        .key(function (d) {
        return d.name;
    })
        .map(graph.nodes));

    // loop through each link replacing the text with its index from node
    graph.links.forEach(function (d, i) {
        graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
        graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
    });

    //now loop through each nodes to make nodes an array of objects
    // rather than an array of strings
    graph.nodes.forEach(function (d, i) {
        graph.nodes[i] = {
            "name": d
        };
    });

    sankey.nodes(graph.nodes)
        .links(graph.links)
        .layout(32);

    // add in the links
    var link = svg.append("g").selectAll(".link")
        .data(graph.links)
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("id",function(d,i) { return "linkLabel" + i ; })
        .attr("d", path)
        .style("stroke-width", function (d) {
           return 30;
        })
        .sort(function (a, b) {
           return b.dy - a.dy;
        })



    // add in the nodes
    dist = [[0,0],[310,0],[310,160],[0,160]];
    inds = 0;
    var node = svg.append("g").selectAll(".node")
        .data(graph.nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
          var str = "translate(" + dist[inds][0]  + "," + dist[inds][1] + ")"
          inds++;
        return str;
    });
    inds = 0;

    // add the rectangles for the nodes
    node.append("rect")
        .attr("height", function (d) {
        return 80;
    })
        .attr("width", 150)
        .style("fill", function (d) {
        return d.color = "silver";
    })
        .style("stroke", function (d) {
        return d3.rgb(d.color).darker(2);
    })
        .append("title")
        .text(function (d) {
        return d.name + "\n" + format(d.value);
    });

    // add in the title for the nodes
    dist = [20,45,52,20];
    inds = 0;
    node.append("text")
        .attr("x", 150)
        .attr("y", function (d) {
        return 35;
    })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("transform", null)
        .text(function (d) {
          if (d.value == 12)
          {
            return d.name;
          }

          if (d.value == 11)
          {
            return d.name;
          }

          if (d.name == right_up)
          {
            return d.name;
          }

          if (d.name == right_down)
          {
            return d.name;
          }

          return d.name;
    })
    .attr("x", function (d) {
    return dist[inds++];
        })
        .attr("text-anchor", "start");
      inds = 0;


      //////

      dist = [60,60,58,60];
      inds = 0;
      node.append("text")
          .attr("x", 150)
          .attr("y", function (d) {
          return 55;
      })
          .attr("dy", ".35em")
          .attr("text-anchor", "end")
          .attr("transform", null)
          .text(function (d) {
            if (d.value == 12)
            {
              return "(" + (user_fair.pos_red_660_abv + user_fair.neg_red_660_abv) + ")";
            }

            if (d.value == 11)
            {
              return "(" + (user_fair.pos_red_660_blw + user_fair.neg_red_660_blw) + ")";
            }

            if (d.name == right_up)
            {
              return "(" + (user_fair.pos_red_660_abv + user_fair.pos_red_660_blw) + ")";
            }

            if (d.name == right_down)
            {
              return "(" + (user_fair.neg_red_660_abv + user_fair.neg_red_660_blw) + ")";
            }

            return d.name;
      })
      .attr("x", function (d) {
      return dist[inds++];
          })
          .attr("text-anchor", "start");
        inds = 0;

      /////
    /* add labels to graphs */
    var cords = [3,5,5,7];
    var labelText = svg.selectAll(".labelText")
        .data(graph.links)
        .enter()
      .append("text")
        .attr("class","labelText")
        .attr("dx",50)
        .attr("dy" , function (d) {
          var source =  d.source.name;
          var target = d.target.name;
          if (source == left_up && target == right_up)
          {
            return cords[0];
          }

          if (source == left_up && target == right_down)
          {
            return cords[1];
          }

          if (source == left_below && target == right_up)
          {
            return cords[2];
          }

          if (source == left_below && target == right_down)
          {
            return cords[3];
          }

          return 5;
    })
      .append("textPath")
        .attr("xlink:href",function(d,i) { return "#linkLabel" + i;})
        .text(function(d,i) {
            //return d.source.name + " → " + d.target.name + " : " + d.value;});
            //true positive
            if (d.value == 5)
            {
              //return "" + (tpa) + " → ";
              return "" + ((user_fair.pos_red_660_abv / (user_fair.pos_red_660_abv + user_fair.neg_red_660_abv)) * 100.0).toFixed(0) + "% " + "("+ (user_fair.pos_red_660_abv)+ ") → "
            }
            //false negative
            else if (d.value == 7)
            {
              //return "" + (na - tna) + " → ";
              return "" + (((user_fair.neg_red_660_abv / (user_fair.pos_red_660_abv + user_fair.neg_red_660_abv))) * 100).toFixed(0) + "% " + "("+ (user_fair.neg_red_660_abv)+ ") → ";
            }
            //false positive
            else if (d.value == 2)
            {
              //return "" + (pa - tpa) + " → ";
              return "" + (((user_fair.pos_red_660_blw / (user_fair.pos_red_660_blw + user_fair.neg_red_660_blw)))* 100).toFixed(0) + "% " + "("+ (user_fair.pos_red_660_blw)+ ") → ";
            }
            //true negative
            else
            {
              //return "" + (tna) + " → ";
              return "" + (((user_fair.neg_red_660_blw / (user_fair.pos_red_660_blw + user_fair.neg_red_660_blw)))*100).toFixed(0) + "% " + "("+ (user_fair.neg_red_660_blw)+ ") → ";
            }
            //return "" +  d.value + " → ";
          });

    // the function for moving the nodes
    function dragmove(d) {
        d3.select(this).attr("transform",
            "translate(" + d.x + "," + (
        d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
        sankey.relayout();
        link.attr("d", path);
    }

    // svg.append("text")
    //       .attr("x", (width / 2))
    //       .attr("y", 265)
    //       .attr("text-anchor", "middle")
    //       .style("font-size", "16px")
    //       .style("font-weight", "bold")
    //       .style('fill', 'red')
    //       .text("Group " + FIRST_RACE);

      svg.selectAll(".link")
          .style('stroke', function(d){
            if (d.value == 5)
            {
              return "SteelBlue";
            }
            //true negative
            else if (d.value == 7)
            {
              return "SteelBlue";
            }
            //true positive
            else if (d.value == 2)
            {
              return "orange";
            }else
            {
              return "orange";
            }
          }).style("stroke-opacity", function(d){
            if (d.value == 5)
            {
              return 1.4;
            }
            //true negative
            else if (d.value == 7)
            {
              return 0.5;
            }
            //true positive
            else if (d.value == 2)
            {
              return 0.5;
            }else
            {
              return 1;
            }
          });

    // B Flow Chart
    var units = "Widgets";
    var currentWidth = document.getElementById("box1").offsetWidth;

    var margin = {
        top: 10,
        right: 10,
        bottom: 0,
        left: 10
    },


    // width = 0.9*currentWidth - margin.left - margin.right,
    //     height = 280 - margin.top - margin.bottom;

    width = 500,
         height = 270;

    var formatNumber = d3.format(",.0f"), // zero decimal places
        format = function (d) {
            return formatNumber(d) + " " + units;
        },
        color = d3.scale.category20();

    // append the svg canvas to the page
    var svg = d3.select("#chart_section_660_1").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
        "translate(" + margin.left + "," + margin.top  + ")");

    // Set the sankey diagram properties
    var sankey = d3.sankey()
        .nodeWidth(115)
        .nodePadding(70)
        .size([width, height]);

    var path = sankey.link();

    left_up = "Credit score " + threshold + "+";
    left_below = "Credit score <" + threshold;
    right_up = "Approved";
    right_down = "Denied";

    var data = [{
        "source": left_up,
            "target": right_up,
            "value": 5
    }, {
        "source": left_up,
            "target": right_down,
            "value": 7
    }, {
        "source": left_below,
            "target": right_up,
            "value": 2
    }, {
        "source": left_below,
            "target": right_down,
            "value": 9
    }];


    //set up graph in same style as original example but empty
    graph = {
        "nodes": [],
            "links": []
    };

    data.forEach(function (d) {
        graph.nodes.push({
            "name": d.source
        });
        graph.nodes.push({
            "name": d.target
        });
        graph.links.push({
            "source": d.source,
                "target": d.target,
                "value": +d.value
        });
    });

    // return only the distinct / unique nodes
    graph.nodes = d3.keys(d3.nest()
        .key(function (d) {
        return d.name;
    })
        .map(graph.nodes));

    // loop through each link replacing the text with its index from node
    graph.links.forEach(function (d, i) {
        graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
        graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
    });

    //now loop through each nodes to make nodes an array of objects
    // rather than an array of strings
    graph.nodes.forEach(function (d, i) {
        graph.nodes[i] = {
            "name": d
        };
    });

    sankey.nodes(graph.nodes)
        .links(graph.links)
        .layout(32);

    // add in the links
    var link = svg.append("g").selectAll(".link")
        .data(graph.links)
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("id",function(d,i) { return "linkLabel" + i ; })
        .attr("d", path)
        .style("stroke-width", function (d) {
           return 30;
        })
        .sort(function (a, b) {
           return b.dy - a.dy;
        })



    // add in the nodes
    dist = [[0,0],[310,0],[310,160],[0,160]];
    inds = 0;
    var node = svg.append("g").selectAll(".node")
        .data(graph.nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
          var str = "translate(" + dist[inds][0]  + "," + dist[inds][1] + ")"
          inds++;
        return str;
    });
    inds = 0;

    // add the rectangles for the nodes
    node.append("rect")
        .attr("height", function (d) {
        return 80;
    })
        .attr("width", 150)
        .style("fill", function (d) {
        return d.color = "silver";
    })
        .style("stroke", function (d) {
        return d3.rgb(d.color).darker(2);
    })
        .append("title")
        .text(function (d) {
        return d.name + "\n" + format(d.value);
    });

    // add in the title for the nodes
    dist = [20,45,52,20];
    inds = 0;
    node.append("text")
        .attr("x", 150)
        .attr("y", function (d) {
        return 35;
    })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("transform", null)
        .text(function (d) {
          if (d.value == 12)
          {
            return d.name;
          }

          if (d.value == 11)
          {
            return d.name;
          }

          if (d.name == right_up)
          {
            return d.name;
          }

          if (d.name == right_down)
          {
            return d.name;
          }

          return d.name;
    })
    .attr("x", function (d) {
    return dist[inds++];
        })
        .attr("text-anchor", "start");
      inds = 0;


      dist = [60,60,58,60];
      inds = 0;
      node.append("text")
          .attr("x", 150)
          .attr("y", function (d) {
          return 55;
      })
          .attr("dy", ".35em")
          .attr("text-anchor", "end")
          .attr("transform", null)
          .text(function (d) {
            if (d.value == 12)
            {
              return "(" + (user_fair.pos_blue_660_abv + user_fair.neg_blue_660_abv) + ")";
            }

            if (d.value == 11)
            {
              return "(" + (user_fair.pos_blue_660_blw + user_fair.neg_blue_660_blw) + ")";
            }

            if (d.name == right_up)
            {
              return "(" + (user_fair.pos_blue_660_abv + user_fair.pos_blue_660_blw) + ")";
            }

            if (d.name == right_down)
            {
              return "(" + (user_fair.neg_blue_660_abv + user_fair.neg_blue_660_blw) + ")";
            }

            return d.name;
      })
      .attr("x", function (d) {
      return dist[inds++];
          })
          .attr("text-anchor", "start");
        inds = 0;



    /* add labels to graphs */
    var cords = [3,5,5,7];
    var labelText = svg.selectAll(".labelText")
        .data(graph.links)
        .enter()
      .append("text")
        .attr("class","labelText")
        .attr("dx",50) // was 65
        .attr("dy" , function (d) {
          var source =  d.source.name;
          var target = d.target.name;
          if (source == left_up && target == right_up)
          {
            return cords[0];
          }

          if (source == left_up && target == right_down)
          {
            return cords[1];
          }

          if (source == left_below && target == right_up)
          {
            return cords[2];
          }

          if (source == left_below && target == right_down)
          {
            return cords[3];
          }

          return 5;
    })
      .append("textPath")
        .attr("xlink:href",function(d,i) { return "#linkLabel" + i;})
        .text(function(d,i) {
            //return d.source.name + " → " + d.target.name + " : " + d.value;});
            //true positive
            if (d.value == 5)
            {
              //return "" + (tpa) + " → ";
              return "" + ((user_fair.pos_blue_660_abv / (user_fair.pos_blue_660_abv + user_fair.neg_blue_660_abv)) * 100.0).toFixed(0) + "% " + "("+ (user_fair.pos_blue_660_abv)+ ") → "
            }
            //false negative
            else if (d.value == 7)
            {
              //return "" + (na - tna) + " → ";
              return "" + (((user_fair.neg_blue_660_abv / (user_fair.pos_blue_660_abv + user_fair.neg_blue_660_abv))) * 100).toFixed(0) + "% " + "("+ (user_fair.neg_blue_660_abv)+ ") → ";
            }
            //false positive
            else if (d.value == 2)
            {
              //return "" + (pa - tpa) + " → ";
              return "" + (((user_fair.pos_blue_660_blw / (user_fair.pos_blue_660_blw + user_fair.neg_blue_660_blw)))* 100).toFixed(0) + "% " + "("+ (user_fair.pos_blue_660_blw)+ ") → ";
            }
            //true negative
            else
            {
              //return "" + (tna) + " → ";
              return "" + (((user_fair.neg_blue_660_blw / (user_fair.pos_blue_660_blw + user_fair.neg_blue_660_blw)))*100).toFixed(0) + "% " + "("+ (user_fair.neg_blue_660_blw)+ ") → ";
            }
            //return "" +  d.value + " → ";
          });

    // the function for moving the nodes
    function dragmove(d) {
        d3.select(this).attr("transform",
            "translate(" + d.x + "," + (
        d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
        sankey.relayout();
        link.attr("d", path);
    }

    // svg.append("text")
    //       .attr("x", (width / 2))
    //       .attr("y", 265)
    //       .attr("text-anchor", "middle")
    //       .style("font-size", "16px")
    //       .style("font-weight", "bold")
    //       .style('fill', 'blue')
    //       .text("Group " + SECOND_RACE);

      svg.selectAll(".link")
          .style('stroke', function(d){
            if (d.value == 5)
            {
              return "SteelBlue";
            }
            //true negative
            else if (d.value == 7)
            {
              return "SteelBlue";
            }
            //true positive
            else if (d.value == 2)
            {
              return "orange";
            }else
            {
              return "orange";
            }
          }).style("stroke-opacity", function(d){
            if (d.value == 5)
            {
              return 1.4;
            }
            //true negative
            else if (d.value == 7)
            {
              return 0.5;
            }
            //true positive
            else if (d.value == 2)
            {
              return 0.5;
            }else
            {
              return 1;
            }
          });

///////////////////////////////////////////////////////////////////////////////////////////////////////////
        $("title").remove();

        var button = document.getElementById("other_button");
        button.onclick = function()
        {
          othBtnHandleInsd(2);
        }


        var button = document.getElementById("me_button");

        button.onclick = function()
        {
          var order = UserAdv.findOne({"_id" : Meteor.userId()});

          if (order == undefined)
          {
            error_handle();
          }

          if (!order.tutorial && order.currTask != 1 && !order.hasSeen && order.index_credit < credit_ranges.length - 1)
          {
            //TaskIndex = ++order.taskInd;
            if (butonRef('me_button'))
            {
              return;
            }
            UserAdv.update(Meteor.userId(),{
             $set:{
               improvementScreen : true
                 }

              }, function( error, result) {
                if ( error ) {error_handle();} //info about what went wrong
                if ( result ) { window.location.href = path_new + "/task1";} //the _id of new object if successful
              });
              return;


          }

          if (order.tutorial && !order.hasSeen)
          {
            //TaskIndex = ++order.taskInd;
            if (butonRef('me_button'))
            {
              return;
            }
            UserAdv.update(Meteor.userId(),{
             $set:{
               improvementScreen : true
                 }

              }, function( error, result) {
                if ( error ) {error_handle();} //info about what went wrong
                if ( result ) {window.location.href = path_new + "/task1";} //the _id of new object if successful
              });
              // document.getElementById("MLLOAD").style.display = 'none';
              // meBtnHandleInsd(2);
              return;


          }

          document.getElementById("me_button").style.display = 'none';
          document.getElementById("ML_DECISION").style.display = 'inline';
          document.getElementById("other_button").style.display = 'none';
          if (!order.tutorial)
          {
            document.getElementById("MLLOAD").style.display = 'inline';
            document.getElementById("first_AI").style.display = 'none';
            document.getElementById("ml_pic").style.display = 'none';
            document.getElementById("big_decision").style.display = 'none';
            document.getElementById("small_decision").style.display = 'none';
            TaskIndex = ++order.taskInd;
            just_here_cpy = false;
            UserAdv.update(Meteor.userId(),{
             $set:{
              taskInd : TaskIndex, just_here : just_here_cpy
                 }

              });
            var locFunc = function() {location.reload();}
            Meteor.setInterval(locFunc, 2000);
          }else
          {
            document.getElementById("MLLOAD").style.display = 'none';
            meBtnHandleInsd(2);
          }



        }

      }

     startbtnTut = function()
     {
       var button = document.getElementById("start-btn");
       button.onclick = function()
       {
         startTut();
       }
}

startTut = function()
{
      var intro = introJs();


      intro.setOptions({
        steps: [{
          intro: "This is the interface that you will interact with in this game. Let’s go through each part of it together and see what they are."
        },
        {
          element: document.querySelector('#Avatar_Box'),
          intro: "On the left side of the interface, you can find your profile. Other than credit score range, throughout this game, you will apply for loans using this profile. Your credit score will start with the range that is shown on this profile, and you may later make attempts to improve it in the game."
        }
        ,
        {
          element: document.querySelector('#budget_up'),
          intro: "Here you can find the current balance in your account. You will start the game with 600 coins. It costs you 50 coins to apply for a loan. If your loan is approved by the bank, you receive a reward of 100 coins, otherwise you receive nothing."
        }
        ,
        {
          element: document.querySelector('#myForm'),
          intro: "<p>In each round, you will first decide whether you want to apply for a loan or not.</p><p>To ensure that you get some experience about how the local bank’s AI-powered system makes loan decisions, <b>you are required to apply for a loan in the first round of the game.</b> Now let’s suppose you want to apply for a loan. Select the “Apply for a loan!” option, and then click on the “Next” button. Let’s see what will happen!</p>"
        }
      ]
    });

    intro.oncomplete(function(){
      document.getElementById("apply_button").style.display = "inline";
      document.getElementById("start-btn").remove();
      document.getElementById("Apply").disabled = false;
      if (detectBrowser() == "Safari"){
      var itm = document.getElementsByClassName('introjs-tooltipReferenceLayer');
      if (itm == undefined)
      {
        return;
      }
      for(i = 0; i < itm.length; i++)
      {
          itm[i].remove();
      }}
    });

    try {
      intro.setOptions({
        exitOnOverlayClick: false,
        exitOnEsc: false
      }).start();
    }
    catch(err) {
      error_handle();
    }

}

// Global variable to save original styles
let originalStyles = {};

function saveOriginalStyles(buttonId) {
    const button = document.getElementById(buttonId);
    originalStyles = {
        backgroundColor: button.style.backgroundColor,
        color: button.style.color,
        border: button.style.border
    };
}

function disableButton(buttonId) {
    const button = document.getElementById(buttonId);
    if (button.style.backgroundColor === "rgb(204, 204, 204)") {
        return;
    }
    saveOriginalStyles(buttonId); // save the original styles
    button.disabled = true;
    button.style.backgroundColor = "#cccccc";
    button.style.color = "#666666";
    button.style.border = "1px solid #999999";
}

function enableButton(buttonId) {
    const button = document.getElementById(buttonId);
    button.disabled = false;
    button.style.backgroundColor = originalStyles.backgroundColor;
    button.style.color = originalStyles.color;
    button.style.border = originalStyles.border;
}

  Template.taskDesign.events(
    {
      'submit form': function(event, template) {

      disableButton("apply_button");
       event.preventDefault();
       var order = UserAdv.findOne({"_id" : Meteor.userId()});

       if (order == undefined)
       {
         error_handle();
       }

       if (order.amtId == "ASSIGNMENT_ID_NOT_AVAILABLE")
       {
          window.location.href = path_new + "/task1";
          return;
       }
       var questionAnswer = event.target.question.value;
       


       if (order.tutorial && order.total >= num_of_tutorials)
       { 
          CurrentIndex = ++order.currentIndex;
           if (comparatorForIndices(CurrentIndex, true) == true)
           {
             UserAdv.update(Meteor.userId(), { $set: { currentIndex : CurrentIndex ,user_budget : initial_budget , total : 0, tutorial : false}});
             window.location.href = path_new + "/task1";
          }
          enableButton("apply_button");
         return;
       }
		     if (questionAnswer == "" )
	      {
             swal({
                   title: 'Warning!',
                   text: "Please select one of the options from above!",
                   type: 'warning',
                   allowOutsideClick: false,
                   confirmButtonColor: '#3085d6',
                   confirmButtonText: 'OK'
                   }).then(function(isConfirm) {
                    enableButton("apply_button");
                     if (isConfirm.value===true) {
                       console.log("isConfirm");
                     }
                   });
             return;
	      }
        if (questionAnswer == "Apply")
        {

          var dec_i = simulate_person();
          var user_fair = Fairness.findOne({"_id" : Meteor.userId()});
          if (order.box == 1)
          {
            if (order.currTask == 1)
            {
              UserAdv.update(Meteor.userId(),{
               $set:{
                 show_box : 1
                   }

                });
            } else
            {
              UserAdv.update(Meteor.userId(),{
               $set:{
                 show_box : ((Math.random() < box_threshold) ? 1 : 0)
                   }

                });
            }

          }

          if (user_fair == undefined)
          {
            error_handle();
          }

          


          var usr_budget = order.user_budget;
          var ml_decision = false;

            var obj = document.getElementById('budget_up');
            usr_budget = (usr_budget - cost);
            obj.innerHTML = "<b>Available Balance: </b>" + (usr_budget) + " coins";



            if (dec_i == 1 || order.tutorial)
            {

              ml_decision = true;
                usr_budget = (usr_budget + gain);
                  UserAdv.update(Meteor.userId(),{
                   $set:{
                     user_budget : (usr_budget)
                       }

                  });


            }
            else
            {
              ml_decision = false;
              UserAdv.update(Meteor.userId(),{
               $set:{
                 user_budget : (usr_budget)
                   }

                });

            }


              UserAdv.update(Meteor.userId(),{
               $set:{
                 ml_decision : ml_decision, total : ++order.total
                   }

                });


                  var c_m = document.getElementById("me_button");
                  c_m.style.display = "inline";
                  var b_l_t = document.getElementById("budget_low_text");
                  b_l_t.style.display = "inline";
                  if (order.index_credit > credit_ranges.length - 2 && order.tutorial == false)
                  {
                      document.getElementById("no_more_imp").style.display = "inline";
                  }
                  if (order.tutorial)
                  {
                    TaskIndex = ++order.tutInd;
                    UserAdv.update(Meteor.userId(),{
                     $set:{
                      tutInd : TaskIndex
                         }

                      });
                  }else
                  {
                    TaskIndex = ++order.taskInd;
                    UserAdv.update(Meteor.userId(),{
                     $set:{
                      taskInd : TaskIndex
                         }

                      });
                      //improvement button text
                      manipulate_imp_button();

                  }
                  document.getElementById("Apply").disabled = true;
                  document.getElementById("End").disabled = true;
                  document.getElementById("apply_button").style.display = "none";
                  var ml_image =  document.getElementById("ml_pic");
                  if (ml_decision)
                  {
                    var b_d = document.getElementById("big_decision");
                    b_d.innerText = "Congratulations!"
                    var s_d = document.getElementById("small_decision");
                    s_d.innerText = "Your application is approved!"
                    ml_image.src = "https://icon-library.com/images/green-check-icon-png/green-check-icon-png-7.jpg";
                  }else
                  {
                    var b_d = document.getElementById("big_decision");
                    b_d.innerText = "Sorry!"
                    var s_d = document.getElementById("small_decision");
                    s_d.innerText = "Your application is denied!"
                    ml_image.src = "https://st2.depositphotos.com/2899123/5948/v/950/depositphotos_59480935-stock-illustration-x-red-handwritten-letter.jpg";
                  }
                  drawDiagram();

                  if (order.tutorial)
                  {
                    document.getElementById("me_button").disabled = true;
                    deductTut();
                  }

                  // enableButton("apply_button");

        }

        if (questionAnswer === "End")
        {
          if (order.total == 0)
          {
            swal({
                  title: 'Warning!',
                  text: "You must apply for a loan at least once!",
                  type: 'warning',
                  allowOutsideClick: false,
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'OK'
                  }).then(function(isConfirm) {
                    enableButton("apply_button");
                    if (isConfirm.value===true) {
                      document.getElementById("myForm").reset();
                      return;
                    }
                  });
                  return;
          }
          swal({
                title: 'Are you sure?',
                text: "By selecting this option you will be going to the end of the game and you will not be able to apply for any more loans.",
                type: 'warning',
                allowOutsideClick: false,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Cancel',
                cancelButtonText: 'Yes, leave the game!'
                }).then(function(isConfirm) {
                  enableButton("apply_button");
                  if (isConfirm.value===true) {
                    console.log("isConfirm in if: " + isConfirm);
                    document.getElementById("myForm").reset();

                  } else {
                    console.log("isConfirm in else: ");
                    var timeoutId = setTimeout(() => {
                      amtLinkRefresh();
                    }, 10000);
                    CurrentIndex = 7;//++order.currentIndex;
                    if (comparatorForIndices(CurrentIndex, true) == true)
                  {
                    UserAdv.update(Meteor.userId(), { $set: { currentIndex : CurrentIndex }}, function( error, result) {
                      if ( error ) {error_handle();} //info about what went wrong
                      if ( result ) {location.reload();} //the _id of new object if successful
                    });
                  }
                    //location.reload();
                  }
                });
        }
     }
    }
  );



  truDec =  function(cred)
  {
    var c_h = cred_high(cred);
    return ((c_h > threshold) ? 1 : 0);

  }

  // truDec_num =  function(cred)
  // {
  //   //var c_h = cred_high(cred);
  //   return ((cred >= INDEX_OF_660_to_690) ? 1 : 0);

  // }

  getScoreProp = function(str)
  {
    if (str === "~850")
    {
      return str;
    }
    var substr = "";
    var index = str.indexOf("-");
    var first = str.substring(1, index - 1);
    var second = str.substring(index + 2, str.length - 1);
    substr += first;
    substr += "-";
    substr += second;

    return substr;
  }

  deductTut = function()
  {
    var intro = introJs();

    var user = UserAdv.findOne({"_id" : Meteor.userId()});

    if (user == undefined)
    {
      error_handle();
    }

    document.getElementById("me_button").value = "Review the opportunity to improve credit score!";

    intro.setOptions({
      steps: [
        {
          element: document.querySelector('#budget_low_text'),
          intro: "Since you have decided to apply for a loan, this costs you and 50 coins have been deducted from your account."
        }
        ,
        {
          element: document.querySelector('#budget_up'),
          intro: "Here, you can see that your account balance has been updated."
        }
        ,
      {
        element: document.querySelector('#me_button'),
        intro: "<p>Before you submit your loan application, you will get a chance to improve your credit score. Let's click on this button to review your opportunity to improve credit score.</p>",
        position: 'bottom'
      }
    ]
  });


  intro.oncomplete(function(){
    document.getElementById("me_button").disabled = false;
    
    if (detectBrowser() == "Safari"){
    var itm = document.getElementsByClassName('introjs-tooltipReferenceLayer');
    if (itm == undefined)
    {
      return;
    }
    for(i = 0; i < itm.length; i++)
    {
        itm[i].remove();
    }}
    
  });
  try {
      intro.setOptions({
        exitOnOverlayClick: false,
        exitOnEsc: false
      }).start();
  }
  catch(err) {
    error_handle();
  }
  }

meBtnHandleInsd = function(num)
{
  var user = UserAdv.findOne({"_id" : Meteor.userId()});

  if (user == undefined)
  {
    error_handle();
  }

  //Old code used for immidate reveal of the AI's decision after improvement view.
  // if (!user.tutorial && user.currTask != 1 && user.just_here)
  // {
  //   //alert("here")
  //   just_here_cpy = false;
  //   UserAdv.update(Meteor.userId(),{
  //    $set:{
  //      just_here : just_here_cpy
  //        }

  //     }, function( error, result) {
  //       if ( error ) {error_handle();} //info about what went wrong
  //       if ( result )
  //       {
  //             //Altug
  //             if (user.ml_decision == true)
  //             {
  //               var obj = document.getElementById('budget_up');
  //               obj.innerHTML = "<b>Available Balance:</b> " + (user.user_budget - gain) + " coins";
  //             }
  //             document.getElementById("me_button").style.display = 'none';
  //             document.getElementById("ML_DECISION").style.display = 'inline';
  //             document.getElementById("other_button").style.display = 'none';
  //             document.getElementById("MLLOAD").style.display = 'inline';
  //             document.getElementById("first_AI").style.display = 'none';
  //             document.getElementById("ml_pic").style.display = 'none';
  //             document.getElementById("big_decision").style.display = 'none';
  //             document.getElementById("small_decision").style.display = 'none';
  //             return;
  //        } //the _id of new object if successful
  //     });

  //     var locFunc = function() {location.reload();}
  //     Meteor.setInterval(locFunc, 2000);
  //     return;


  // }
  // alert("here");
  // if (user.hasSeen)
  //    {
       
  //     var b_l_t_s = document.getElementById("budget_low_text");
  // b_l_t_s.style.display = "none";
  //    }
  

  if (user.tutorial && user.just_here && user.tutInd == 2)
  {
    // if (user.index_credit != credit_ranges.length - 1)
    // {
      document.getElementById("me_button").disabled = true;
      just_here_cpy = user.just_here;
      var obj = document.getElementById('budget_up');
      obj.innerHTML = "<b>Available Balance: </b>" + (user.user_budget - gain) + " coins";
      //alert(just_here_cpy);
      var intro = introJs();
  
      intro.setOptions({
        steps: [
        {
          element: document.querySelector('#me_button'),
          intro: "<p>To find out the AI system’s decision on your application in this round, click on this button.</p><p>Let’s click on it now and see whether your loan application gets approved in this round.</p>"
        }
      ]
    });
  
    intro.oncomplete(function(){
      document.getElementById("me_button").disabled = false;
      if (detectBrowser() == "Safari"){
      var itm = document.getElementsByClassName('introjs-tooltipReferenceLayer');
      if (itm == undefined)
      {
        return;
      }
      for(i = 0; i < itm.length; i++)
      {
          itm[i].remove();
      }}
      TaskIndex = user.tutInd;
      just_here_cpy =  false;
      UserAdv.update(Meteor.userId(),{
       $set:{
         just_here : just_here_cpy
           }
  
        }, function( error, result) {
          if ( error ) {error_handle();} //info about what went wrong
          if ( result )
          {
                 
           } //the _id of new object if successful
        });
    });
  
  
    try {
      intro.setOptions({
        exitOnOverlayClick: false,
        exitOnEsc: false
      }).start();
    }
    catch(err) {
      error_handle();
    }
    return;
    // }else 
    // {
      // UserAdv.update(Meteor.userId(),{
      //   $set:{
      //     just_here : false.tutorial, hasSeen : false, credibility : credit_ranges[credit_ranges.length - 2], index_credit : credit_ranges.length - 2
      //       }
   
      //    });
    // }
  }




  document.getElementById("MLLOAD").style.display = 'none';

  if (num == undefined){
  document.getElementById("first_AI").style.display = 'block';
  document.getElementById("ml_pic").style.display = 'block';
  document.getElementById("big_decision").style.display = 'block';
  document.getElementById("small_decision").style.display = 'block';
}
  var c_m = document.getElementById("me_button");
  c_m.style.display = "none";
  //c_m.remove();
  var ml_m = document.getElementById("ML_DECISION");
  ml_m.style.display = "inline";
  var budget_button = document.getElementById("budget_up");
  var b_l_t = document.getElementById("budget_low_text");
  document.getElementById("no_more_imp").style.display = "none";

  b_l_t.style.display = "none";

  

  console.log(user.user_budget);
  budget_button.innerHTML = "<b>Available Balance:</b> " + user.user_budget + " coins";
  var ml_m = document.getElementById("other_button");
  ml_m.style.display = "inline";
  if (num == 0){ return;}
  //Tutorial code
  if (user.tutorial)
  {
    document.getElementById("other_button").disabled = true;
    var intro = introJs();

    intro.setOptions({
      steps: [
      {
        element: document.querySelector('#ML_DECISION'),
        intro: "Here you go! The bank’s AI system has approved your loan application in this round after analyzing your profile. "
      },
      {
        element: document.querySelector('#budget_up'),
        intro: "Since your application is approved in this round, you get a reward of 100 coins. As you can see, your account balance is updated here."
      },
      {
        element: document.querySelector('#other_button'),
        intro: "<p>In each round you decide to apply for a loan, the bank may have received applications from many other people in the same time period. You can get a sense of what the bank’s AI system has decided on all applicants’ applications in the current round by clicking on this button.</p><p>Let’s click on it now and see what the AI system’s decisions are on all applicants in this round.</p>"
      }
    ]
  });

  intro.oncomplete(function(){
    document.getElementById("other_button").disabled = false;
    if (detectBrowser() == "Safari"){
    var itm = document.getElementsByClassName('introjs-tooltipReferenceLayer');
    if (itm == undefined)
    {
      return;
    }
    for(i = 0; i < itm.length; i++)
    {
        itm[i].remove();
    }}
    TaskIndex = ++user.tutInd;
    UserAdv.update(Meteor.userId(),{
     $set:{
      tutInd : TaskIndex
         }

      });
  });


  try {
    intro.setOptions({
      exitOnOverlayClick: false,
      exitOnEsc: false
    }).start();
  }
  catch(err) {
    error_handle();
  }
}

}

othBtnHandleInsd = function(num)
{
  var m_b = document.getElementById("me_button");
  var user = UserAdv.findOne({"_id" : Meteor.userId()});

  if (user == undefined)
  {
    error_handle();
  }

  if (user.currTask >= total_num_rounds)
  {
    var obj = document.getElementById('nround-btn');
    obj.value = "Go to the end of the game!";
  }

  m_b.style.display = "none";
  //c_m.remove();
  var budget_button = document.getElementById("budget_up");

  //console.log(user.user_budget);
  budget_button.innerHTML = "<b>Available Balance:</b> " + user.user_budget + " coins";

  var c_m = document.getElementById("other_button");
  c_m.style.display = "none";
  var ml_m = document.getElementById("wrapper2");
  ml_m.style.display = "inline";
  var b_l_t = document.getElementById("budget_low_text");
  document.getElementById("no_more_imp").style.display = "none";
  b_l_t.style.display = "none";
  // b_l_t.style.visibility = "hidden";
  // var M_decision = document.getElementById("ML_DECISION");
  // M_decision.style.display = "inline";

  if (!user.tutorial && user.box == 1 && num == 0 && user.show_box == 1)
  {
    document.getElementById("review_of_charts_text").style.display = "inline";
    document.getElementById("review_of_charts").style.display = "inline";
    document.getElementById("review_break").style.display = "inline";
    document.getElementById("review_break1").style.display = "inline";
    document.getElementById("review_break2").style.display = "inline";

  }
  //Make sure that there is enough space for the button_next
  //document.getElementById('center_chart').setAttribute("style","width:500px");
  var clientHeight_box1 = document.getElementById('box1').offsetHeight;
  var clientHeight_box2 = document.getElementById('box2').offsetHeight;
  var str_for = "";
  if (clientHeight_box1 > clientHeight_box2)
  {
    str_for += "height:" + clientHeight_box1 + "px";
    document.getElementById('center_chart').setAttribute("style", str_for);
  } else
  {
    str_for += "height:" + clientHeight_box2 + "px";
    document.getElementById('center_chart').setAttribute("style", str_for);
  }

  if (num == 0)
  {
    return;
  }


  var user_fair = Fairness.findOne({"_id" : Meteor.userId()});



  if ( user_fair == undefined)
  {
    error_handle();
  }



  //Tutorial code
  if (user.tutorial)
  {

    var intro = introJs();
    document.getElementById("flwchart_btn").style.display = "inline";
    document.getElementById("flwchart_btn").disabled = true;

    var tpa = user_fair.pos_red_660_abv;
    var pa = user_fair.pos_red_660_abv + user_fair.pos_red_660_blw;
    var tna = user_fair.neg_red_660_blw;
    var na = user_fair.neg_red_660_abv + user_fair.neg_red_660_blw;
    var tpb = user_fair.pos_blue_660_abv;
    var pb = user_fair.pos_blue_660_abv + user_fair.pos_blue_660_blw;
    var tnb = user_fair.neg_blue_660_blw;
    var nb = user_fair.neg_blue_660_abv + user_fair.neg_blue_660_blw;
    var num_us = pa + pb + na + nb;
    var other_text = "As you can see, in this round, there are "+ num_us +" applicants who have applied for a loan from the bank including yourself. Below, you will get an overview of the AI system’s decisions on all these applicants, broken down by the applicant’s group identity (i.e., <text style=\"font-size: 16px; color: " + color_first_race + ";\">\"Group " + FIRST_RACE +"\"</text> or <text style=\"font-size: 16px; color: " + color_second_race + ";\">\"Group " + SECOND_RACE +"\"</text>).";
    var GA_TOP_TEXT = "This box shows in this round, the number of <span class='RedTexts'>" + (FIRST_RACE)?.toLowerCase() + " group</span> applicants whose credit score is considered to be good (" + threshold + " or above). <br><br> In this example, there are " + (tpa + na - tna) + " such applicants.";
    var GA_BOTTOM_TEXT = "Similarly, this box shows in this round, the number of <span class='RedTexts'>" + (FIRST_RACE)?.toLowerCase() + " group</span> applicants whose credit score is below " + threshold + ". <br><br>In this example, there are " + (tna + pa - tpa) + " such applicants.";
    var GA_APPROVED_TEXT = "<p>This box tells you the number of <span class='RedTexts'>" + (FIRST_RACE)?.toLowerCase() + " group</span> applicants whose application is approved by the AI system in this round. </p>";
    var APP_text2 = "<p>In this example, " + (pa) + " <span class='RedTexts'>" + (FIRST_RACE)?.toLowerCase() + " group</span> applicants’ loan application is approved. Among them, " + (tpa) + " applicants have a credit score of " + threshold + " or higher (see the number in the parenthesis in the dark blue arrow); this accounts for " + ((tpa * 100) / (tpa + na - tna)).toFixed(0) + "% of all <span class='RedTexts'>" + (FIRST_RACE)?.toLowerCase() + " group</span> applicants whose credit score is " + threshold + " or higher. </p>";
    var APP_text3 = "<p>In addition, there are also " + (pa - tpa) + " applicants with a credit score that is lower than " + threshold + " getting their loan applications approved (see the number in the parenthesis in the light orange arrow); this accounts for " + (((pa - tpa) * 100) / (pa - tpa  + tna)).toFixed(0) + "% of all <span class='RedTexts'>" + (FIRST_RACE)?.toLowerCase() + " group</span> applicants whose credit score is lower than " + threshold + ".</p>";
    var GA_DISAPPROVED_TEXT = "<p>This box tells you the number of <span class='RedTexts'>" + (FIRST_RACE)?.toLowerCase() + " group applicants</span> whose application is denied by the AI system in this round.</p> ";
    var APP_text4 = "<p>In this example, " + (na) + " <span class='RedTexts'>" + (FIRST_RACE)?.toLowerCase() + " group</span> applicants’ loan application is denied. Among them, " + (na - tna) + " applicants have a credit score of " + threshold + " or higher (see the number in the parenthesis in the light blue arrow); this accounts for " + (((na - tna) * 100) / (tpa + na - tna)).toFixed(0) +  "% of all <span class='RedTexts'>" + (FIRST_RACE)?.toLowerCase() + " group</span> applicants whose credit score is " + threshold + " or higher. </p>";
    var APP_text5 = "<p>In addition, there are also " + (tna) + " applicants with a credit score that is lower than " + threshold + " getting their loan applications denied (see the number in the parenthesis in the dark orange arrow); this accounts for " + (((tna) * 100) / (pa - tpa  + tna)).toFixed(0) + "% of all <span class='RedTexts'>" + (FIRST_RACE)?.toLowerCase() + " group</span> applicants whose credit score is lower than " + threshold + ".</p>";

    var name = "Credit score 650+ ";
    //console.log(d3.selectAll(".node")[0])
    var GA_NODE =  d3.selectAll(".node")[0][find_node(name , d3.selectAll(".node")[0])];//9
    name = "Approved ";
    var GA_APPROVED_NODE = d3.selectAll(".node")[0][find_node(name , d3.selectAll(".node")[0])]; //10
    name = "Denied ";
    var GA_DISAPPROVED_NODE = d3.selectAll(".node")[0][find_node(name , d3.selectAll(".node")[0])]; //11
    name = "Credit score <650 ";
    var GA_BOTTOM = d3.selectAll(".node")[0][find_node(name , d3.selectAll(".node")[0])]; //12
    //console.log(d3.selectAll(".node")[0]);
    //console.log(GA_BOTTOM);
    //console.log(GB_NODE);
    //console.log(GB_BOTTOM);

    //var first_chart = d3.selectAll("svg")[0][2];
    // console.log(first_chart);
    //var second_chart = d3.selectAll("svg")[0][0];
    var str = "";
    if (user.race == SECOND_RACE)
    {
      str += "#box1";
    }else
    {
      str += "#box2";
    }
    //console.log(second_chart);

    intro.setOptions({
      steps: [
      {
        element: document.querySelector('#others_text'),
        intro: other_text
      },
      {
        element: document.querySelector('#box2'),
        intro: "Here is an overview of the AI system’s decisions on all <span class=\"RedTexts\">" + (FIRST_RACE)?.toLowerCase() + " group</span> applicants in this round."
      },
      {
        element: GA_NODE,
        intro: GA_TOP_TEXT
      }
      ,
      {
        element: GA_BOTTOM,
        intro: GA_BOTTOM_TEXT
      }
      ,
      {
        element: GA_APPROVED_NODE,
        intro: GA_APPROVED_TEXT
      }
      ,
      {
        element: GA_APPROVED_NODE,
        intro: APP_text2
      }
      ,
      {
        element: GA_APPROVED_NODE,
        intro: APP_text3
      }
      ,
      {
        element: GA_DISAPPROVED_NODE,
        intro: GA_DISAPPROVED_TEXT
      }
      ,
      {
        element: GA_DISAPPROVED_NODE,
        intro: APP_text4
      }
      ,
      {
        element: GA_DISAPPROVED_NODE,
        intro: APP_text5
      }
      ,
      {
        element: document.querySelector('#box1'),
        intro: "Moving on to the right side now, here is an overview of the AI system’s decisions on all <span class=\"BlueTexts\">" + (SECOND_RACE)?.toLowerCase() + " group</span> applicants in this round. Meanings of the chart are similar to those for the <span class=\"RedTexts\">" + (FIRST_RACE)?.toLowerCase() + " group</span>."
      }
      ,
      {
        element: document.querySelector(str),
        intro: "Note that the AI system's decisions on applicants <i>of your group</i> will be highlighted in light yellow."
      },
      {
        element: document.getElementById("flwchart_btn"),
        intro: "Let’s now click on this button to learn more details about the AI system's decisions for applicants who have similar credit scores as you."
      }
    ]
  });

  //Multiple tutorial stages, make the tutIndex to be zero here.
  intro.oncomplete(function(){
    if (detectBrowser() == "Safari"){
    var itm = document.getElementsByClassName('introjs-tooltipReferenceLayer');
    if (itm == undefined)
    {
      return;
    }
    for(i = 0; i < itm.length; i++)
    {
        itm[i].remove();
    }}
    document.getElementById("flwchart_btn").disabled = false;
  });



  try {
      intro.setOptions({
        exitOnOverlayClick: false,
        exitOnEsc: false
      }).start();
  }
  catch(err) {
    error_handle();
  }


  }else
  {
    TaskIndex = ++user.taskInd;
    UserAdv.update(Meteor.userId(),{
     $set:{
      taskInd : TaskIndex
         }

      });
      //document.getElementById("other_button").style.display = "inline";
      document.getElementById("flwchart_btn").style.display = "inline";

      // var is_blue = 0;
      // if (document.getElementById("box1").style.backgroundColor == "lightyellow")
      // {
      //   document.getElementById("box1").style.backgroundColor = "white";
      //   is_blue = 1;
      // }else
      // {
      //   document.getElementById("box2").style.backgroundColor = "white";
      // }
      //ANIMATION STUFF

    //   document.getElementById('others_text').style.visibility = "hidden";
    //
    //   document.getElementById('Red_Group').style.visibility = "hidden";
    //   document.getElementById('chart_section').style.visibility = "hidden";
    //
    //   document.getElementById('box2').style.visibility = "hidden";
    //
    //   document.getElementById('Blue_Group').style.visibility = "hidden";
    //   document.getElementById('chart_section1').style.visibility = "hidden";
    //
    //   document.getElementById('box1').style.visibility = "hidden";
    //
    //   document.getElementById('nround-btn').style.visibility = "hidden";
    //
    //   setTimeout(() => {   document.getElementById("others_text").style.visibility = "visible"; }, 0);
    //   setTimeout(() => {   document.getElementById('Red_Group').style.visibility = "visible";
    //   document.getElementById('chart_section').style.visibility = "visible"; }, 500);
    //   setTimeout(() => {  document.getElementById('box2').style.visibility = "visible";
    //   if (is_blue == 0){document.getElementById("box2").style.backgroundColor = "lightyellow";}
    // }, 1000);
    //   setTimeout(() => {  document.getElementById('Blue_Group').style.visibility = "visible";
    //   document.getElementById('chart_section1').style.visibility = "visible";  }, 1500);
    //   setTimeout(() => {   document.getElementById('box1').style.visibility = "visible";
    //   if (is_blue != 0){document.getElementById("box1").style.backgroundColor = "lightyellow";}
    // }, 2000);
    //   setTimeout(() => {   document.getElementById('nround-btn').style.visibility = "visible";
    //   if ( user.box == 1 && user.show_box == 1)
    //   {
    //     document.getElementById("review_of_charts_text").style.display = "inline";
    //     document.getElementById("review_of_charts").style.display = "inline";
    //     document.getElementById("review_break").style.display = "inline";
    //     document.getElementById("review_break1").style.display = "inline";
    //     document.getElementById("review_break2").style.display = "inline";
    //
    //   }
    // }, 2500);





      ////
      //OLD ANIMATION STUFF

   //    var GA_NODE = d3.selectAll(".node")[0][4];
   //    var GA_APPROVED_NODE = d3.selectAll(".node")[0][5];
   //    var GA_DISAPPROVED_NODE = d3.selectAll(".node")[0][6];
   //    var GA_BOTTOM = d3.selectAll(".node")[0][7];
   //    //GA_NODE.style.visibility = "hidden";
   //    GA_APPROVED_NODE.style.visibility = "hidden";
   //    GA_DISAPPROVED_NODE.style.visibility = "hidden";
   //    GA_BOTTOM.style.visibility = "hidden";
   //    GA_NODE.style.visibility = "hidden";
   //    document.getElementById("nround-btn").style.visibility = "hidden";
   //    document.getElementById("Red_Group").style.visibility = "hidden";
   //    document.getElementById("Blue_Group").style.visibility = "hidden";
   //    d3.selectAll(".link")[0][0].style.visibility = "hidden";
   //    d3.selectAll(".labelText")[0][3].style.visibility = "hidden";
   //    d3.selectAll(".link")[0][1].style.visibility = "hidden";
   //    d3.selectAll(".labelText")[0][1].style.visibility = "hidden";
   //    d3.selectAll(".link")[0][2].style.visibility = "hidden";
   //    d3.selectAll(".labelText")[0][0].style.visibility = "hidden";
   //    d3.selectAll(".link")[0][3].style.visibility = "hidden";
   //    d3.selectAll(".labelText")[0][2].style.visibility = "hidden";
   //    d3.selectAll(".link")[0][4].style.visibility = "hidden";
   //    d3.selectAll(".labelText")[0][7].style.visibility = "hidden";
   //    d3.selectAll(".link")[0][5].style.visibility = "hidden";
   //    d3.selectAll(".labelText")[0][5].style.visibility = "hidden";
   //    d3.selectAll(".link")[0][6].style.visibility = "hidden";
   //    d3.selectAll(".labelText")[0][4].style.visibility = "hidden";
   //    d3.selectAll(".link")[0][7].style.visibility = "hidden";
   //    d3.selectAll(".labelText")[0][6].style.visibility = "hidden";
   //    document.getElementById("text_confusion_A").style.visibility = "hidden";
   //    document.getElementById("text_confusion").style.visibility = "hidden";
   //    var GB_NODE = d3.selectAll(".node")[0][0];
   //    var GB_APPROVED_NODE = d3.selectAll(".node")[0][1];
   //    var GB_DISAPPROVED_NODE = d3.selectAll(".node")[0][2];
   //    var GB_BOTTOM = d3.selectAll(".node")[0][3];
   //    GB_NODE.style.visibility = "hidden";
   //    GB_APPROVED_NODE.style.visibility = "hidden";
   //    GB_DISAPPROVED_NODE.style.visibility = "hidden";
   //    GB_BOTTOM.style.visibility = "hidden";
   //    document.getElementById("Red_Group").style.visibility = "hidden";
   //    document.getElementById("Blue_Group").style.visibility = "hidden";
   //    setTimeout(() => {   document.getElementById("Red_Group").style.visibility = "visible"; }, 4000);
   //    setTimeout(() => {  GA_NODE.style.visibility = "visible";
   //              if (is_blue == 0){document.getElementById("box2").style.backgroundColor = "lightyellow";}
   //  }, 6000);
   //    setTimeout(() => {
   //      GA_APPROVED_NODE.style.visibility = "visible";
   //      GA_DISAPPROVED_NODE.style.visibility = "visible";
   //      d3.selectAll("text")[0][15].innerHTML = "(0)";
   //      d3.selectAll("text")[0][17].innerHTML = "(0)";
   //  }, 11000);
   //    // console.log($(".link"));
   //    setTimeout(() => {  d3.selectAll(".link")[0][6].style.visibility = "visible";
   //    d3.selectAll(".labelText")[0][4].style.visibility = "visible";
   //    d3.selectAll("text")[0][15].innerHTML = "(" + parseInt(gup_get_pr(d3.selectAll("textPath")[0][4].innerHTML)) + ")";
   //  }, 16000);
   //    setTimeout(() => {
   //      d3.selectAll(".link")[0][5].style.visibility = "visible";
   //    d3.selectAll(".labelText")[0][5].style.visibility = "visible";
   //    d3.selectAll("text")[0][17].innerHTML = "(" + parseInt(gup_get_pr(d3.selectAll("textPath")[0][5].innerHTML)) + ")";
   //  }, 21000);
   //    setTimeout(() => { GA_BOTTOM.style.visibility = "visible"; }, 26000);
   //    setTimeout(() => {
   //      d3.selectAll(".link")[0][7].style.visibility = "visible";
   //    d3.selectAll(".labelText")[0][6].style.visibility = "visible";
   //    d3.selectAll("text")[0][15].innerHTML = "(" + (parseInt(gup_get_pr(d3.selectAll("textPath")[0][4].innerHTML)) + parseInt(gup_get_pr(d3.selectAll("textPath")[0][6].innerHTML))  ) + ")";
   //  }, 31000);
   //    setTimeout(() => {
   //      d3.selectAll(".link")[0][4].style.visibility = "visible";
   //    d3.selectAll(".labelText")[0][7].style.visibility = "visible";
   //    d3.selectAll("text")[0][17].innerHTML = "(" + (parseInt(gup_get_pr(d3.selectAll("textPath")[0][5].innerHTML)) + parseInt(gup_get_pr(d3.selectAll("textPath")[0][7].innerHTML))) + ")";
   //  }, 36000);
   //     //$(".reveal").toggleClass("show");
   //
   //   setTimeout(() => {   document.getElementById("Blue_Group").style.visibility = "visible"; }, 41000);
   //   setTimeout(() => { GB_NODE.style.visibility = "visible";
   //   if (is_blue == 1){document.getElementById("box1").style.backgroundColor = "lightyellow";}
   //
   // }, 46000);
   //   setTimeout(() => {
   //     GB_APPROVED_NODE.style.visibility = "visible";
   //   GB_DISAPPROVED_NODE.style.visibility = "visible";
   //   d3.selectAll("text")[0][3].innerHTML = "(0)";
   //   d3.selectAll("text")[0][5].innerHTML = "(0)";
   // }, 51000);
   //
   //   setTimeout(() => {
   //     d3.selectAll(".link")[0][2].style.visibility = "visible";
   //   d3.selectAll(".labelText")[0][0].style.visibility = "visible";
   //   d3.selectAll("text")[0][3].innerHTML = "(" + parseInt(gup_get_pr(d3.selectAll("textPath")[0][0].innerHTML)) + ")";
   // }, 56000);
   //   setTimeout(() => {
   //     d3.selectAll(".link")[0][1].style.visibility = "visible";
   //   d3.selectAll(".labelText")[0][1].style.visibility = "visible";
   //   d3.selectAll("text")[0][5].innerHTML = "(" + parseInt(gup_get_pr(d3.selectAll("textPath")[0][1].innerHTML)) + ")";
   // }, 61000);
   //   setTimeout(() => { GB_BOTTOM.style.visibility = "visible"; }, 66000);
   //   setTimeout(() => {
   //     d3.selectAll(".link")[0][3].style.visibility = "visible";
   //   d3.selectAll(".labelText")[0][2].style.visibility = "visible";
   //   d3.selectAll("text")[0][3].innerHTML = "(" + (parseInt(gup_get_pr(d3.selectAll("textPath")[0][0].innerHTML)) + parseInt(gup_get_pr(d3.selectAll("textPath")[0][2].innerHTML))) + ")";
   // }, 71000);
   //   setTimeout(() => {
   //     d3.selectAll(".link")[0][0].style.visibility = "visible";
   //   d3.selectAll(".labelText")[0][3].style.visibility = "visible";
   //   d3.selectAll("text")[0][5].innerHTML = "(" + (parseInt(gup_get_pr(d3.selectAll("textPath")[0][1].innerHTML)) + parseInt(gup_get_pr(d3.selectAll("textPath")[0][3].innerHTML))) + ")";
   // }, 76000);
   //
   //        setTimeout(() => {
   //          d3.selectAll(".link")[0][2].style.stroke = "green";
   //          d3.selectAll(".link")[0][6].style.stroke = "green";
   //          //GB_NODE.style.fill = "white";
   //          //d3.selectAll("rect")[0][0].style.fill = "red";
   //          d3.selectAll(".labelText")[0][0].style.fill = "white";
   //          //GA_NODE.style.fill = "white";
   //          //d3.selectAll("rect")[0][4].style.fill = "red";
   //          d3.selectAll(".labelText")[0][4].style.fill = "white";
   //        }, 81000);
   //        setTimeout(() => {
   //          d3.selectAll(".link")[0][2].style.stroke = "steelblue";
   //          d3.selectAll(".link")[0][6].style.stroke = "steelblue";
   //          d3.selectAll(".link")[0][5].style.stroke = "red";
   //          d3.selectAll(".link")[0][1].style.stroke = "red";
   //          d3.selectAll(".labelText")[0][4].style.fill = "black";
   //          d3.selectAll(".labelText")[0][0].style.fill = "black";
   //          d3.selectAll(".labelText")[0][1].style.fill = "white";
   //          d3.selectAll(".labelText")[0][5].style.fill = "white";
   //          d3.selectAll(".link")[0][5].style.strokeOpacity = "1.4";
   //          d3.selectAll(".link")[0][1].style.strokeOpacity = "1.4";
   //        }, 86000);
   //
   //        setTimeout(() => {
   //          d3.selectAll(".link")[0][5].style.stroke = "steelblue";
   //          d3.selectAll(".link")[0][1].style.stroke = "steelblue";
   //          d3.selectAll(".link")[0][5].style.strokeOpacity = "0.5";
   //          d3.selectAll(".link")[0][1].style.strokeOpacity = "0.5";
   //          d3.selectAll(".labelText")[0][1].style.fill = "black";
   //          d3.selectAll(".labelText")[0][5].style.fill = "black";
   //          //GB_NODE.style.fill = "black";
   //          //d3.selectAll("rect")[0][0].style.fill = "silver";
   //
   //          //GA_NODE.style.fill = "black";
   //          //d3.selectAll("rect")[0][4].style.fill = "silver";
   //
   //          // GA_NODE.style.stroke = "rgb(94, 94, 94)";
   //          //GA_BOTTOM.style.fill = "white";
   //          // GB_NODE.style.stroke = "rgb(94, 94, 94)";
   //          //GB_BOTTOM.style.fill = "white";
   //          //d3.selectAll("rect")[0][3].style.fill = "red";
   //          //d3.selectAll("rect")[0][7].style.fill = "red";
   //          d3.selectAll(".labelText")[0][2].style.fill = "white";
   //          d3.selectAll(".labelText")[0][6].style.fill = "white";
   //
   //          d3.selectAll(".link")[0][7].style.stroke = "green";
   //          d3.selectAll(".link")[0][3].style.stroke = "green";
   //          d3.selectAll(".link")[0][7].style.strokeOpacity = "1.4";
   //          d3.selectAll(".link")[0][3].style.strokeOpacity = "1.4";
   //        }, 91000);
   //
   //        setTimeout(() => {
   //          d3.selectAll(".link")[0][7].style.stroke = "orange";
   //          d3.selectAll(".link")[0][3].style.stroke = "orange";
   //          d3.selectAll(".link")[0][7].style.strokeOpacity = "0.5";
   //          d3.selectAll(".link")[0][3].style.strokeOpacity = "0.5";
   //          d3.selectAll(".labelText")[0][2].style.fill = "black";
   //          d3.selectAll(".labelText")[0][6].style.fill = "black";
   //          d3.selectAll(".link")[0][4].style.stroke = "red";
   //          d3.selectAll(".link")[0][0].style.stroke = "red";
   //          d3.selectAll(".link")[0][4].style.strokeOpacity = "1.4";
   //          d3.selectAll(".link")[0][0].style.strokeOpacity = "1.4";
   //          d3.selectAll(".labelText")[0][3].style.fill = "white";
   //          d3.selectAll(".labelText")[0][7].style.fill = "white";
   //        }, 96000);
   //
   //
   //        setTimeout(() => {
   //          d3.selectAll(".link")[0][4].style.stroke = "orange";
   //          d3.selectAll(".link")[0][0].style.stroke = "orange";
   //          // GA_BOTTOM.style.stroke = "rgb(94, 94, 94)";
   //          // GB_BOTTOM.style.stroke = "rgb(94, 94, 94)";
   //          //GA_BOTTOM.style.fill = "black";
   //          // GB_NODE.style.stroke = "rgb(94, 94, 94)";
   //          //GB_BOTTOM.style.fill = "black";
   //          d3.selectAll(".labelText")[0][3].style.fill = "black";
   //          d3.selectAll(".labelText")[0][7].style.fill = "black";
   //
   //          d3.selectAll("rect")[0][3].style.fill = "silver";
   //          d3.selectAll("rect")[0][7].style.fill = "silver";
   //          d3.selectAll(".link")[0][4].style.strokeOpacity = "1";
   //          d3.selectAll(".link")[0][0].style.strokeOpacity = "1";
   //        }, 101000);
   //   setTimeout(() => { document.getElementById("text_confusion_A").style.visibility = "visible"; }, 102000);
   //   setTimeout(() => { document.getElementById("text_confusion").style.visibility = "visible"; }, 105000);
   //   setTimeout(() => { document.getElementById("nround-btn").style.visibility = "visible"; }, 106000);

      ////
  }
  window.scrollBy(0, 400);
}

nrBtn = function()
{
  var user = UserAdv.findOne({"_id" : Meteor.userId()});


  var fairness = Fairness.findOne({"_id" : Meteor.userId()});
  if (user == undefined || fairness == undefined)
  {
    error_handle();
  }
  var textBox = "";
  if (user.show_box == 1 && user.box == 1 && !user.tutorial)
  {
    textBox = document.getElementById('review_of_charts').value;
    if (textBox == "")
    {
      swal({
            title: 'Warning!',
            text: "Please fill out the textbox!",
            type: 'warning',
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
            }).then(function(isConfirm) {
              if (isConfirm.value===true) {
                console.log("back");
              }
            });
        return;
    }
  }
  document.getElementById("nround-btn").disabled = true;
  if (butonRef('nround-btn'))
  {
      return;
  }
  var isImprovement = (user.currTask < total_num_rounds);
  //IMPROVEMENT = isImprovement;
  TaskIndex = 0;
  var pos_red_abv_cpy = fairness.pos_red_abv;
  var neg_red_abv_cpy = fairness.neg_red_abv;
  var pos_blue_abv_cpy = fairness.pos_blue_abv;
  var neg_blue_abv_cpy = fairness.neg_blue_abv;
  if (user.index_credit == (credit_ranges.length - 1))
  {
    pos_red_abv_cpy = "doesn't exist";
    neg_red_abv_cpy = "doesn't exist";
    pos_blue_abv_cpy = "doesn't exist";
    neg_blue_abv_cpy = "doesn't exist";
  }

  var pos_red_blw_cpy = fairness.pos_red_blw;
  var neg_red_blw_cpy = fairness.neg_red_blw;
  var pos_blue_blw_cpy = fairness.pos_blue_blw;
  var neg_blue_blw_cpy = fairness.neg_blue_blw;
  if (user.index_credit == 0)
  {
    pos_red_blw_cpy = "doesn't exist";
    neg_red_blw_cpy = "doesn't exist";
    pos_blue_blw_cpy = "doesn't exist";
    neg_blue_blw_cpy = "doesn't exist";
  }
  TaskState.insert({_saveId : Meteor.userId(),amtId : user.amtId, currTask : user.currTask, ml_decision : user.ml_decision, user_budget : user.user_budget, pos_red_blw :  pos_red_blw_cpy, neg_red_blw : neg_red_blw_cpy, pos_red_curr : fairness.pos_red_curr, neg_red_curr : fairness.neg_red_curr, pos_red_abv : pos_red_abv_cpy, neg_red_abv : neg_red_abv_cpy, pos_blue_blw : pos_blue_blw_cpy, neg_blue_blw : neg_blue_blw_cpy, pos_blue_curr : fairness.pos_blue_curr, neg_blue_curr : fairness.neg_blue_curr, pos_blue_abv : pos_blue_abv_cpy, neg_blue_abv : neg_blue_abv_cpy, pos_red_660_abv : fairness.pos_red_660_abv, neg_red_660_abv : fairness.neg_red_660_abv, pos_red_660_blw : fairness.pos_red_660_blw, neg_red_660_blw : fairness.neg_red_660_blw, pos_blue_660_abv : fairness.pos_blue_660_abv, neg_blue_660_abv : fairness.neg_blue_660_abv, pos_blue_660_blw : fairness.pos_blue_660_blw, neg_blue_660_blw : fairness.neg_blue_660_blw ,text : textBox
   }, function( error, result) {
     if ( error ) {error_handle();} //info about what went wrong
     if ( result ) {
       UserAdv.update(Meteor.userId(),{
      $set:{
        taskInd : TaskIndex, currTask : ++user.currTask, hasSeen : false
          }

       }, function( error, result) {
         if ( error ) {error_handle();} //info about what went wrong
         if ( result ) {

           if (user.currTask > total_num_rounds)
           {
             CurrentIndex = 7;//user.currentIndex + 1;
             if (comparatorForIndices(CurrentIndex, true) == true)
           {
             UserAdv.update(Meteor.userId(), { $set: { currentIndex : CurrentIndex }}, function( error, result) {
               if ( error ) {error_handle();} //info about what went wrong
               if ( result ) {location.reload();} //the _id of new object if successful
             });
            }
               // swal({
               //   title: 'Sorry!',
               //   text: 'Exceeded total number of rounds!',
               //   type: 'warning',
               //   allowOutsideClick: false
               // }).then(function(isConfirm) {
               //   if (isConfirm) {
               //     console.log("isConfirm in if: " + isConfirm);
                 ///////  // location.reload();
               //   } else {
               //     console.log("isConfirm in else: ");
               //     return;
               //   }
               // });
           }else
           {
             document.getElementById('EntireThing').style.display = "none";
             document.getElementById('LoaderDive').style.display = "inline";
             var locFunc = function(){location.reload();}
             Meteor.setInterval(locFunc, 2000)
           }

         } //the _id of new object if successful
       }

     );


     } //the _id of new object if successful
   });

}
detectBrowser = function() {
    if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {
        return 'Opera';
    } else if(navigator.userAgent.indexOf("Chrome") != -1 ) {
        return 'Chrome';
    } else if(navigator.userAgent.indexOf("Safari") != -1) {
        return 'Safari';
    } else if(navigator.userAgent.indexOf("Firefox") != -1 ){
        return 'Firefox';
    } else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) {
        return 'IE';//crap
    } else {
        return 'Unknown';
    }
}



Template.taskDesign.onRendered(function bodyOnCreated()
{
  doit = 0;
  itmsv = undefined;
  flag2 = 0;
  // if (detectBrowser() == "Safari" || detectBrowser() == "Opera" || detectBrowser() == "Chrome")
  // {
  //   var scale = 'scale(1)';
  //   //document.body.style.webkitTransform =  scale;
  //   document.body.style.transform = scale;
  // } else if (detectBrowser() == "IE")
  // {
  //   var scale = 'scale(1)';
  //   document.body.style.msTransform =   scale;       // IE 9
  // }else 
  // {
  //   var scale = 'scale(1)';
  //   document.body.style.transform = scale;
  // }

  // document.body.style.zoom = (screen.logicalXDPI / screen.deviceXDPI);
  // var browserZoomLevel = Math.round(window.devicePixelRatio * 100);
  // alert(browserZoomLevel);

  //Intro JS Doesn't work well with Safari, we need to take account for it.
  if (detectBrowser() == "Safari"){
  var auto_refresh = setInterval(
    function()
    {
      // $(".introjs-tooltipReferenceLayer").load(" .introjs-tooltipReferenceLayer > *");
      // if (doit < 0)
      // {
      //   doit++;
      //   return;
      // }
      // if (document.getElementsByClassName('introjs-button introjs-nextbutton')[0] == undefined)
      // {
      //   return;
      // }
      // var orig_onclick = document.getElementsByClassName('introjs-button introjs-nextbutton')[0].onclick;
      // document.getElementsByClassName('introjs-button introjs-nextbutton')[0].onclick = function () {
      //   var ele_save = document.getElementsByClassName('introjs-button introjs-nextbutton')[0];
      //   ele_save.onclick = orig_onclick;
      //   doit = 1;
      //   ele_save.click();
      // }
      // if (doit == 1){
      var itm = document.getElementsByClassName('introjs-tooltipReferenceLayer')[0];
      if (itm == undefined)
      {
        return;
      }
      itmsv = itm;
      // Copy the <li> element and its child nodes
      var cln = itm.cloneNode(true);
      cln.onclick = document.getElementsByClassName('introjs-button introjs-nextbutton')[0].onclick;
      // doit--;
      // flag2 = 1;

      // var orig_onclick = document.getElementsByClassName('introjs-button introjs-nextbutton')[0].onclick;
      // document.getElementsByClassName('introjs-button introjs-nextbutton')[0].onclick = function () {
      //   var ele_save = document.getElementsByClassName('introjs-button introjs-nextbutton')[0];
      //   ele_save.onclick = orig_onclick;
      //   ele_save.click();
      // }
// Append the cloned <li> element to <ul> with id="myList1"
      //console.log(document.getElementsByClassName('introjs-button introjs-nextbutton'));
      document.body.appendChild(cln);
      // document.getElementsByClassName('introjs-tooltipReferenceLayer')[1].style.visibility = "hidden";
      //var itm = document.getElementsByClassName('introjs-tooltipReferenceLayer')[1].remove();
      // var itm = document.getElementsByClassName('introjs-tooltipReferenceLayer')[1].remove();

      // document.getElementsByClassName('introjs-tooltipReferenceLayer').style.display = "inline";

      // console.log("did it");}
  // appending it back
// }

// }

}, 1000);
  var auto_refresh2 = setInterval(
    function()
    {
      // $(".introjs-tooltipReferenceLayer").load(" .introjs-tooltipReferenceLayer > *");
//       var itm = document.getElementsByClassName('introjs-tooltipReferenceLayer')[0];
//
//       // Copy the <li> element and its child nodes
//       var cln = itm.cloneNode(true);
//
// // Append the cloned <li> element to <ul> with id="myList1"
//       document.body.appendChild(cln);
      var itm = document.getElementsByClassName('introjs-tooltipReferenceLayer');
      if (itm == undefined || itmsv == undefined)
      {
        return;
      }
      if (itm.length < 2)
      {
        return;
      }
      for(i = 0; i < itm.length; i++)
      {
        if (itm[i] != itmsv)
        {
          itm[i].remove();
        }
      }
      // flag2 = 0;

      // document.getElementsByClassName('introjs-tooltipReferenceLayer').style.display = "inline";

      // console.log("did it5");
  // appending it back



}, 1001);
}
//
// var auto_refresh2 = setInterval(
//   function()
//   {
//     // $(".introjs-tooltipReferenceLayer").load(" .introjs-tooltipReferenceLayer > *");
// //       var itm = document.getElementsByClassName('introjs-tooltipReferenceLayer')[0];
// //
// //       // Copy the <li> element and its child nodes
// //       var cln = itm.cloneNode(true);
// //
// // // Append the cloned <li> element to <ul> with id="myList1"
// //       document.body.appendChild(cln);
//     console.log(document.getElementsByClassName('introjs-button introjs-nextbutton')[0].onclick);
//     // document.getElementsByClassName('introjs-tooltipReferenceLayer').style.display = "inline";
//
//     // console.log("did it5");
// // appending it back
//
//
//
// }, 10000);

var button_flw = document.getElementById("flwchart_btn");

find_node = function(text_info, nodes)
{
  //console.log(d3.selectAll(".node")[0].length);
  //var nodes = d3.selectAll(".node")[0];
  var length_node = nodes.length;
  for (let i = 0; i < length_node; i++) {
      if (nodes[i].__data__.name == text_info)
      {
        return i;
      }
    
    
  }
  return -1;
}

button_flw.onclick = function()
{
  var user = UserAdv.findOne({"_id" : Meteor.userId()});
  var user_fair = Fairness.findOne({"_id" : Meteor.userId()});

  if (user_fair == undefined || user == undefined)
  {
    error_handle();
  }
  document.getElementById("chart_section").style.display = "inline";
  document.getElementById("chart_section1").style.display = "inline";
  document.getElementById("blue_line").style.display = "block";
  document.getElementById("red_line").style.display = "block";
  var clientHeight_box1 = document.getElementById('box1').offsetHeight;
  var clientHeight_box2 = document.getElementById('box2').offsetHeight;
  var str_for = "";
  if (clientHeight_box1 > clientHeight_box2)
  {
    str_for += "height:" + clientHeight_box1 + "px";
    document.getElementById('center_chart').setAttribute("style", str_for);
  } else
  {
    str_for += "height:" + clientHeight_box2 + "px";
    document.getElementById('center_chart').setAttribute("style", str_for);
  }

  document.getElementById("flwchart_btn").style.display = "none";
  //window.scrollBy(0, 400);
  if (user.tutorial)
  {
    var intro = introJs();

    var pos_red_blw = user_fair.pos_red_blw;
    var neg_red_blw = user_fair.neg_red_blw;
    var pos_red_curr = user_fair.pos_red_curr;
    var neg_red_curr = user_fair.neg_red_curr;
    var pos_red_abv = user_fair.pos_red_abv;
    var neg_red_abv = user_fair.neg_red_abv;
    var pos_blue_blw = user_fair.pos_blue_blw;
    var neg_blue_blw = user_fair.neg_blue_blw;
    var pos_blue_curr = user_fair.pos_blue_curr;
    var neg_blue_curr = user_fair.neg_blue_curr;
    var pos_blue_abv = user_fair.pos_blue_abv;
    var neg_blue_abv = user_fair.neg_blue_abv;
    //var num_us = pos_red_blw + neg_red_blw + pos_red_curr + neg_red_curr + pos_red_abv + neg_red_abv + pos_blue_blw + neg_blue_blw + pos_blue_curr + neg_blue_curr + pos_blue_abv + neg_blue_abv;
    //var other_text = "As you can see, in this round, there are "+ num_us +" applicants who have applied for a loan from the bank including yourself. Below, you will get an overview of the AI system’s decisions on all these applicants, broken down by the applicant’s group identity (i.e., <text style=\"font-size: 16px; color: red;\">\"Group " + FIRST_RACE +"\"</text> or <text style=\"font-size: 16px; color: blue;\">\"Group " + SECOND_RACE +"\"</text>).";
    var RED_ABOVE_NODE_TEXT = "This box shows in this round, the number of <span class='RedTexts'>" + (FIRST_RACE)?.toLowerCase() + " group</span> applicants whose credit score is one level above your current credit score. <br><br> In this example, there are " + (pos_red_abv + neg_red_abv) + " such applicants.";
    var RED_CURRENT_NODE_TEXT = "Similarly, this box shows in this round the number of <span class='RedTexts'>" + (FIRST_RACE)?.toLowerCase() + " group</span> applicants whose credit score is the same as yours. <br><br> In this example, there are " + (pos_red_curr + neg_red_curr) + " such applicants.";
    var RED_BELOW_NODE_TEXT = "Finally, this box shows in this round, the number of <span class='RedTexts'>" + (FIRST_RACE)?.toLowerCase() + " group</span> applicants whose credit score is one level below yours. <br><br> In this example, there are " + (pos_red_blw + neg_red_blw) + " such applicants.";
    var RED_APPROVED_TEXT = "<p>This box tells you among the <span class='RedTexts'>" + (FIRST_RACE)?.toLowerCase() + " group</span> applicants whose credit score is similar to yours in this round (i.e., have the same credit level as you or one level above/below your level), the number of applicants who get their loan application approved by the AI system. </p>";
    var APP_text2 = "<p>In this example, " + (pos_red_abv + pos_red_curr + pos_red_blw) + " <span class='RedTexts'>" + (FIRST_RACE)?.toLowerCase() + " group</span> applicants’ loan application is approved. Among them, " + (pos_red_abv) + " applicants have a credit score one level higher than you (see the number in the parenthesis in the dark orange arrow); this accounts for " + (100*(pos_red_abv)/(pos_red_abv + neg_red_abv)).toFixed(0) + "% of all <span class='RedTexts'>" + (FIRST_RACE)?.toLowerCase() + " group</span> applicants whose credit score is one credit score level higher than you. </p>";
    var APP_text_current_for_red_approved = "<p>In addition, there are also " + (pos_red_curr) + " applicants with a credit score that is same as yours getting their loan applications approved (see the number in the parenthesis in the dark yellow arrow); this accounts for " + (100*(pos_red_curr)/(pos_red_curr + neg_red_curr)).toFixed(0) + "% of all <span class='RedTexts'>" + (FIRST_RACE)?.toLowerCase() + " group</span> applicants whose credit score is same as yours.</p>";
    var APP_text3 = "<p>Finally, there are also " + (pos_red_blw) + " applicants with a credit score that is one credit score level lower than you getting their loan applications approved (see the number in the parenthesis in the dark pink arrow); this accounts for " + (100*(pos_red_blw)/(pos_red_blw + neg_red_blw)).toFixed(0) + "% of all <span class='RedTexts'>" + (FIRST_RACE)?.toLowerCase() + " group</span> applicants whose credit score is one level lower than yours.</p>";
    var RED_DISAPPROVED_NODE_TEXT = "<p>This box tells you among the <span class='RedTexts'>" + (FIRST_RACE)?.toLowerCase() + " group</span> applicants whose credit score is similar to yours in this round (i.e., have the same credit level as you or one level above/below your level), the number of applications who get their loan application denied by the AI system.</p> ";
    var APP_text4 = "<p>In this example, " + (neg_red_abv + neg_red_curr + neg_red_blw) + " <span class='RedTexts'>" + (FIRST_RACE)?.toLowerCase() + " group</span> applicants’ loan application is denied. Among them, " + (neg_red_abv) + " applicants have a credit score that is one level higher than yours (see the number in the parenthesis in the light orange arrow); this accounts for " + (100*(neg_red_abv)/(pos_red_abv + neg_red_abv)).toFixed(0) +  "% of all <span class='RedTexts'>" + (FIRST_RACE)?.toLowerCase() + " group</span> applicants whose credit score is one level higher than you. </p>";
    var APP_text5 = "<p>Simultaneously, there are also " + (neg_red_curr) + " applicants with a credit score that is same as yours getting their loan applications denied (see the number in the parenthesis in the light yellow arrow); this accounts for " + (100*(neg_red_curr)/(pos_red_curr + neg_red_curr)).toFixed(0) + "% of all <span class='RedTexts'>" + (FIRST_RACE)?.toLowerCase() + " group</span> applicants whose credit score is same as yours.</p>";
    var APP_text6 = "<p>Finally, there are also " + (neg_red_blw) + " applicants with a credit score that is one level lower than yours getting their loan applications denied (see the number in the parenthesis in the light pink arrow); this accounts for " + (100*(neg_red_blw)/(pos_red_blw + neg_red_blw)).toFixed(0) + "% of all <span class='RedTexts'>" + (FIRST_RACE)?.toLowerCase() + " group</span> applicants whose credit score is one level lower than yours.</p>";

    //console.log(d3.selectAll(".node")[0]);
    // var nodes = d3.selectAll(".node")[0]
    // var test = find_node("Approved", nodes);
    // console.log(test)
    var name = credit_ranges[user.index_credit + 1] + " ";
    var RED_ABOVE_NODE = d3.selectAll(".node")[0][find_node(name , d3.selectAll(".node")[0])]; //13
    name = "Yours -> " + credit_ranges[user.index_credit] + " ";
    var RED_CURRENT_NODE = d3.selectAll(".node")[0][find_node(name , d3.selectAll(".node")[0])]; //16
    name = credit_ranges[user.index_credit - 1] + " ";
    var RED_BELOW_NODE = d3.selectAll(".node")[0][find_node(name , d3.selectAll(".node")[0])]; //17
    name = "Approved    ";
    var RED_APPROVED_NODE = d3.selectAll(".node")[0][find_node(name , d3.selectAll(".node")[0])]; //14
    name = "Denied    ";
    var RED_DISAPPROVED_NODE = d3.selectAll(".node")[0][find_node(name , d3.selectAll(".node")[0])]; //15
    //var GA_BOTTOM = d3.selectAll(".node")[0][7];
    //console.log(GA_NODE);
    //console.log(GA_BOTTOM);
    //console.log(GB_NODE);
    //console.log(GB_BOTTOM);

    //var first_chart = d3.selectAll("svg")[0][3];
    //console.log(d3.selectAll("svg")[0]);
    //var second_chart = d3.selectAll("svg")[0][1];
    var str = "";
    if (user.race == SECOND_RACE)
    {
      str += "#box1";
    }else
    {
      str += "#box2";
    }
    //console.log(second_chart);
    var red_area = document.getElementById("red_area");
    var blue_area = document.getElementById("blue_area");

    intro.setOptions({
      steps: [
        {
          element: red_area,
          intro: "Here is an overview of the AI system’s decisions on all <span class=\"RedTexts\">" + (FIRST_RACE)?.toLowerCase() + " group</span> applicants whose credit score is either one credit score level higher than you, same credit score level as you, or one credit score level lower than you in this round."
        },
      {
        element: RED_ABOVE_NODE,
        intro: RED_ABOVE_NODE_TEXT
      }
      ,
      {
        element: RED_CURRENT_NODE,
        intro: RED_CURRENT_NODE_TEXT
      }
      ,
      {
        element: RED_BELOW_NODE,
        intro: RED_BELOW_NODE_TEXT
      }
      ,
      {
        element: RED_APPROVED_NODE,
        intro: RED_APPROVED_TEXT
      }
      ,
      {
        element: RED_APPROVED_NODE,
        intro: APP_text2
      }
      ,
      {
        element: RED_APPROVED_NODE,
        intro: APP_text_current_for_red_approved
      },
      {
        element: RED_APPROVED_NODE,
        intro: APP_text3
      }
      ,
      {
        element: RED_DISAPPROVED_NODE,
        intro: RED_DISAPPROVED_NODE_TEXT
      }
      ,
      {
        element: RED_DISAPPROVED_NODE,
        intro: APP_text4
      }
      ,
      {
        element: RED_DISAPPROVED_NODE,
        intro: APP_text5
      }
      ,
      {
        element: RED_DISAPPROVED_NODE,
        intro: APP_text6
      }
      ,
      {
        element: blue_area,
        intro: "The right chart shows the detailed view of AI system’s decisions on <span class='BlueTexts'>" + (SECOND_RACE)?.toLowerCase() + " group</span> applicants whose credit score is similar to yours. Meanings of the chart are similar to those of the left chart."
      }
      ,
      {
        element: document.querySelector('#EndText'),
        intro: "One last thing: If in any round of the game, except the first round, you are not interested in applying for loans from the bank any more, you can choose this option. You will then immediately arrive at the end of the game, complete a brief survey and be able to collect your bonus payment (using a rate of " + conversion_coin + " coins to $" + conversion_rate +")!"
      },
      {
        intro: "Fantastic!  You’ve completed the tutorial! <p>Let's now take a quick test to see whether you have understood how to play this game.</p>"
      }
    ]
    });

    //Multiple tutorial stages, make the tutIndex to be zero here.
    intro.oncomplete(function(){
    if (detectBrowser() == "Safari"){
    var itm = document.getElementsByClassName('introjs-tooltipReferenceLayer');
    if (itm == undefined)
    {
      return;
    }
    for(i = 0; i < itm.length; i++)
    {
        itm[i].remove();
    }}
    var init_cred_scr = user.initial_credit_score;
    var idx_crdt = -1;
    for(i = 0; i < credit_ranges.length; i++)
    {
        if (credit_ranges[i] === init_cred_scr)
        {
          idx_crdt = i;
        }
    }
     //= user.index_credit - 1;
    var timeoutId = setTimeout(() => {amtLinkRefresh();}, 10000);
    CurrentIndex = 5;//++user.currentIndex;
    if (comparatorForIndices(CurrentIndex, true) == true)
           {
    UserAdv.update(Meteor.userId(), { $set: { hasSeen : false , currentIndex: CurrentIndex,user_budget : initial_budget , total : 0, tutorial : false, credibility : init_cred_scr, index_credit : idx_crdt}}, function( error, result) {
      if ( error ) {error_handle();} //info about what went wrong
      if ( result ) {window.location.href = path_new + "/task1";} //the _id of new object if successful
    });
  }
    });



    try {
      intro.setOptions({
        exitOnOverlayClick: false,
        exitOnEsc: false
      }).start();
    }
    catch(err) {
    error_handle();
    }
  }
  else
  {
    document.getElementById("nround-btn").style.display = "inline";
  }

  window.scrollTo(0, document.body.scrollHeight);

}


     var user_fair = Fairness.findOne({"_id" : Meteor.userId()});
     var user = UserAdv.findOne({"_id" : Meteor.userId()});

     if (user_fair == undefined || user == undefined)
     {
       error_handle();
     }

     
     if (user.currTask >= total_num_rounds)
     {
       var obj = document.getElementById('nround-btn');
       obj.value = "Go to the end of the game!";
     }

     var obj = document.getElementById('budget_up');
     obj.innerHTML = "<b>Available Balance: </b>" + (user.user_budget) + " coins";

     if (user.race == SECOND_RACE)
     {
       document.getElementById('box1').style.backgroundColor = "lightyellow";
     }else
     {
       document.getElementById('box2').style.backgroundColor = "lightyellow";
     }

     if (!user.tutorial)
     {
       document.getElementById('indCount').style.display = "inline";
       document.getElementById('indCount').innerText = "Round " + (user.currTask) + " out of " + total_num_rounds;
     }

     document.getElementById("nround-btn").onclick = nrBtn;

       startbtnTut();


       var ml_image =  document.getElementById("ml_pic");
       if (user.ml_decision)
       {
         var b_d = document.getElementById("big_decision");
         b_d.innerText = "Congratulations!"
         var s_d = document.getElementById("small_decision");
         s_d.innerText = "Your application is approved!"
         ml_image.src = "https://icon-library.com/images/green-check-icon-png/green-check-icon-png-7.jpg";
       }else
       {
         var b_d = document.getElementById("big_decision");
         b_d.innerText = "Sorry!"
         var s_d = document.getElementById("small_decision");
         s_d.innerText = "Your application is denied!"
         ml_image.src = "https://st2.depositphotos.com/2899123/5948/v/950/depositphotos_59480935-stock-illustration-x-red-handwritten-letter.jpg";
       }

       if (user.tutorial && user.index_credit === credit_ranges.length - 1 && allow_last_to_be_down === true)
       {
        UserAdv.update(Meteor.userId(),{
          $set:{
            credibility : credit_ranges[credit_ranges.length - 2], index_credit : credit_ranges.length - 2
              }
     
           }, function( error, result) {
            if ( error ) {error_handle();} //info about what went wrong
            if ( result ) {drawDiagram();} //the _id of new object if successful
          });

       }else
       {

        drawDiagram();
      }


     if (user.tutorial == true && user.total > num_of_tutorials)
     {
       UserAdv.update(Meteor.userId(), { $set: { user_budget : initial_budget , total : 0, tutorial : false}});
     }


     if (user.tutorial)
     {
       document.getElementById("apply_button").style.display = "none";
       document.getElementById("End").disabled = true;
       document.getElementById("Apply").disabled = true;
       if (user.tutInd == 0)
       {
         var s_b = document.getElementById("start-btn");
         s_b.style.display = "inline";
        var c_m = document.getElementById("me_button");
        c_m.style.display = "none";
        var ml_m = document.getElementById("other_button");
        ml_m.style.display = "none";
         document.getElementById("me_button").disabled = true;
         document.getElementById("other_button").disabled = true;
       }
       if (user.tutInd == 1)
       {
         var s_b = document.getElementById("start-btn");
         if (s_b != null)
         {
           s_b.remove();
         }
         document.getElementById("me_button").disabled = true;
         document.getElementById("other_button").disabled = true;
         document.getElementById("Apply").checked = true;
         document.getElementById("Apply").disabled = true;
         document.getElementById("End").disabled = true;
         var ml_m = document.getElementById("other_button");
         ml_m.style.display = "none";
         document.getElementById("budget_low_text").style.display = "inline";
         var obj = document.getElementById('budget_up');
         obj.innerHTML = "<b>Available Balance: </b>" + (user.user_budget - gain) + " coins";
         //document.getElementById("me_button").value = "Review the opportunity to improve credit score!";
         deductTut();

       }
       if (user.tutInd == 2)
       {
         document.getElementById("other_button").disabled = true;
         document.getElementById("other_button").style.display = "none";
         document.getElementById("Apply").checked = true;
         document.getElementById("Apply").disabled = true;
         document.getElementById("End").disabled = true;
         meBtnHandleInsd(1);
         

       }

       if (user.tutInd >= 3)
       {

         document.getElementById("other_button").style.display = "none";
         document.getElementById("Apply").checked = true;
         document.getElementById("Apply").disabled = true;
         document.getElementById("End").disabled = true;
         meBtnHandleInsd(0);
         othBtnHandleInsd(1);





       }
     }else
     {
       if (user.taskInd == 0)
       {
         
         var c_m = document.getElementById("me_button");
         c_m.style.display = "none";
         var ml_m = document.getElementById("other_button");
         ml_m.style.display = "none";
         if (user.currTask == 1)
         {
          swal({
            title: "A Quick Note:",
            html: '<p style="font-size: 18px; font-family: Verdana; text-align: left;">To ensure that you get a sense of how the bank\'s AI system works, especially for people with similar credit score as yours, in the first round, you are <b>required</b> to apply for the loan and you will not be given the chance to improve your credit score.</p><p style="font-size: 18px; font-family: Verdana; text-align: left;">However, starting from the second round of the game, you can freely decide whether you\'d like to continue applying for loans from the bank, and if so, whether you\'d like to improve your credit score.</p>',
            allowOutsideClick: false,
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'I understand!'
          })
         }
       }
       if (user.taskInd == 1)
       {
         //Altug
         if (user.ml_decision == true)
         {
           var obj = document.getElementById('budget_up');
           obj.innerHTML = "<b>Available Balance: </b>" + (user.user_budget - gain) + " coins";
         }
         document.getElementById("Apply").checked = true;
         document.getElementById("Apply").disabled = true;
         document.getElementById("End").disabled = true;
         document.getElementById("apply_button").style.display = "none";
         disableButton("apply_button");
         if (user.hasSeen)
        {
       
          var b_l_t_s = document.getElementById("budget_low_text");
          document.getElementById("no_more_imp").style.display = "none";
          b_l_t_s.style.display = "none";
        }else
        {
         document.getElementById("budget_low_text").style.display = "inline";
         if (user.index_credit > credit_ranges.length - 2 && user.tutorial == false)
        {
          document.getElementById("no_more_imp").style.display = "inline";
        }
        }
         document.getElementById("other_button").style.display = "none";
         manipulate_imp_button();
         
       }
       if (user.taskInd == 2)
       {
         document.getElementById("Apply").checked = true;
         document.getElementById("Apply").disabled = true;
         document.getElementById("End").disabled = true;
         document.getElementById("apply_button").style.display = "none";
         disableButton("apply_button");
         document.getElementById("budget_low_text").style.display = "none";
         document.getElementById("other_button").style.display = "inline";
         meBtnHandleInsd(0);
       }
       if (user.taskInd >= 3)
       {
         document.getElementById("Apply").checked = true;
         document.getElementById("Apply").disabled = true;
         document.getElementById("End").disabled = true;
         document.getElementById("apply_button").style.display = "none";
         disableButton("apply_button");
         document.getElementById("budget_low_text").style.display = "none";
         
        document.getElementById("no_more_imp").style.display = "none";
  
         document.getElementById("other_button").style.display = "none";
         meBtnHandleInsd(0);
         othBtnHandleInsd(0);
         document.getElementById("flwchart_btn").style.display = "inline";
       }
       // if (user.taskInd >= 4)
       // {
       //   document.getElementById("Apply").checked = true;
       //   document.getElementById("Apply").disabled = true;
       //   document.getElementById("End").disabled = true;
       //   document.getElementById("apply_button").style.display = "none";
       //   document.getElementById("budget_low_text").style.display = "none";
       //   document.getElementById("other_button").style.display = "none";
       //   document.getElementById("flwchart_btn").style.display = "none";
       //   meBtnHandleInsd(0);
       //   othBtnHandleInsd(0);
       //   document.getElementById("nround-btn").style.display = "inline";
       // }
     }

     //console.log(d3.selectAll("text"));
    // d3.selectAll("text")[0][15].innerHTML = "(0)";
    //console.log(d3.selectAll("textPath")[0]);
    // var gup_get = function(path){
    //     var regexS ="[(]"+"([^)]*)";
    //     var regex = new RegExp( regexS );
    //     var results = regex.exec(path);
    //     if( results == null )
    //       return "";
    //     else
    //       return results[1];
    //  }
     //console.log(d3.selectAll("textPath")[0][4].innerHTML);
    //console.log(gup_get(d3.selectAll("textPath")[0][4].innerHTML));
    // alert("here");

});

error_handle =  function()
{
  // alert("There has been an error! Click OK to refresh the page!");
  // location.reload();

  swal({
        title: 'Warning!',
        text: "There has been an error! Click OK to refresh the page!",
        type: 'warning',
        allowOutsideClick: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
        }).then(function(isConfirm) {
          if (isConfirm.value===true) {
            amtLinkRefresh();
          }
        });
}


manipulate_imp_button = function()
{

  var user = UserAdv.findOne({"_id" : Meteor.userId()});

  if (user == undefined)
  {
    error_handle();
  }

  if (!user.hasSeen && user.credibility != credit_ranges[credit_ranges.length - 1] && user.currTask != 1)
  {
    document.getElementById("me_button").value = "Review the opportunity to improve credit score!";
  }

}
