options = ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"];
index_of_t = 0;
Template.survey.onRendered(function bodyOnCreated()
{
index_of_t = Math.floor(Math.random() * (options.length))
var str1 = "This is an attention check, please select \"" + options[index_of_t] + "\".";
document.getElementById('att1').innerHTML = str1;
var button_next = document.getElementById("next_page");
button_next.onclick = function()
{
  //console.log(answers);
  var bonus_attention =  ((displayRadioValue("attention_for_bonus") == "") ? -1 : displayRadioValue("attention_for_bonus"));
  var usr = UserAdv.findOne({"_id" : Meteor.userId()});
  if (usr == undefined)
  {
    error_handle();
  }
  var answers = [usr.race ,displayRadioValue("age"), displayRadioValue("race"), document.getElementById("state").value, displayRadioValue("p_aff"), displayRadioValue("p_view"), displayRadioValue("school"), displayRadioValue("fs_1"), displayRadioValue("fs_2"), displayRadioValue("fs_3"), displayRadioValue("fs_4"), displayRadioValue("ra_1"), displayRadioValue("ra_2"), displayRadioValue("ra_3"), ("" + (index_of_t + 1)), displayRadioValue("attention_1")];

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
  CurrentIndex = 8;//++usr.currentIndex;
  if (comparatorForIndices(CurrentIndex, true) == true)
  {
  UserAdv.update(Meteor.userId(), { $set: {attention_for_bonus: bonus_attention, answer_array_1 : answers, currentIndex : CurrentIndex}}, function( error, result) {
    if ( error ) {error_handle();} //info about what went wrong
    if ( result ) {location.reload();} //the _id of new object if successful
  });
}


}

});
