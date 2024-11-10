stringContainsSubstring = function(string, substring) {
  return (string.toString()).toLowerCase().indexOf((substring.toString()).toLowerCase()) != -1;
}



options_2 = ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"];
index_of_t1 = 0;

Template.survey_1.onRendered(function bodyOnCreated()
{
  index_of_t1 = Math.floor(Math.random() * (options_2.length))
  var str2 = "This is an attention check, please select \"" + options_2[index_of_t1] + "\".";
  document.getElementById('att2').innerHTML = str2;
  var auto_refresh = setInterval(
    function()
  {
    var answers_1 = [ displayRadioValue("fp_1"), displayRadioValue("fp_2"), displayRadioValue("fp_3"),
    displayRadioValue("fp_4"), displayRadioValue("fp_5"), displayRadioValue("fp_6")];
    var perceived_fairness_1 = - 6;
    for(i = 0; i < answers_1.length; i++)
    {
      if (answers_1[i] == undefined)
      {
        return;
      }
      if (i == answers_1.length - 1)
      {
        perceived_fairness_1 += 6 - parseInt(answers_1[i]);
      }else
      {
        perceived_fairness_1 += parseInt(answers_1[i]);
      }
    }
    var element = document.getElementById('fairness_question_text');
    var textArea = document.getElementById('inside');
    var textAll = document.getElementById('fairness_text');
    var fairText = "Based on your responses to the survey questions above, it seems like that you feel that in this game, the bank's AI-powered system is fair to loan applicants in general. If this is correct, please briefly explain why you believe so; if this is incorrect, please briefly describe what do you think of the bank's AI system in terms of its level of fairness.";
    var unfairText = "Based on your responses to the survey questions above, it seems like that you feel that in this game, the bank's AI-powered system is unfair to loan applicants in general. If this is correct, please briefly explain why you believe so; if this is incorrect, please briefly describe what do you think of the bank's AI system in terms of its level of fairness.";
    if (perceived_fairness_1 < 12 && ( unfairText != textArea.innerText) )
    {
        element.style.display = "inline";
        textAll.style.display = "inline";
        textArea.innerText = unfairText;
    }else if (perceived_fairness_1 >= 12 && ( fairText != textArea.innerText) )
    {
      element.style.display = "inline";
      textAll.style.display = "inline";
      textArea.innerText = fairText;
    }else
    {
      return;
    }
  
  }, 1000);
  
var button_next = document.getElementById("next_page");
button_next.onclick = function()
{
  var answers = [displayRadioValue("ra_4"), displayRadioValue("ra_5"), displayRadioValue("emp_1"), displayRadioValue("emp_2"), displayRadioValue("emp_3"), displayRadioValue("emp_4"), displayRadioValue("emp_5"), displayRadioValue("fp_1"), displayRadioValue("fp_2"), displayRadioValue("fp_3"), displayRadioValue("fp_4"), displayRadioValue("fp_5"), displayRadioValue("fp_6"), document.getElementById('fairness_text').value ,("" + (index_of_t1 + 1)) ,displayRadioValue("attention_2")];
  
  var usr = UserAdv.findOne({"_id" : Meteor.userId()});
  if (usr == undefined)
  {
    error_handle();
  }

  

  for(i = 0; i < answers.length; i++)
  {
    if (answers[i] == undefined || answers[i] == "" || answers[i] == "NOT_SELECTED")
    {
      swal({
            title: 'Warning!',
            text: "Please answer all of the questions!",
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
  }
  document.getElementById("next_page").disabled = true;
  if (butonRef('next_page'))
  {
      return;
  }
  //CurrentIndex = 9;//++usr.currentIndex;
          UserAdv.update(Meteor.userId(), { $set: {answer_array_2 : answers}}, function( error, result) {
            if ( error ) {error_handle();} //info about what went wrong
            if ( result ) 
            {
              Meteor.call('save_result', document.getElementById('fairness_text').value, function (error, result) {

                if (error)
                {
                  console.log(error);
                }
                  else {
                    if (result == true)
                    {
                      location.reload();
                    }
            
                  }
                }
              );
            } //the _id of new object if successful
          });
          setTimeout(() => {
            if (comparatorForIndices(CurrentIndex, true) == true)
           {
            UserAdv.update(Meteor.userId(), { $set: {currentIndex : 9}}, function( error, result) {
              if ( error ) {error_handle();} //info about what went wrong
              if ( result ) {
                location.reload();
            } //the _id of new object if successful
            });
          }
          }, "3000")
          
  

}

});
