FlowRouter.route('/',{
  name: 'home' ,
  action ()
  {
    Tracker.autorun(function() {
         var order = UserAdv.findOne({"_id" : Meteor.userId()});
         if (order != undefined)
         {
            if (order.ended)
            {
                window.location.href = path_new + "/error";
            }else
            {
                BlazeLayout.render('HOME');
            }
         }
     });
     BlazeLayout.render('HOME');
}
});

FlowRouter.route('/error',{

  name :  'error',
  action()
  {
    BlazeLayout.render('error');
  }
});

FlowRouter.route('/error1',{

    name :  'error1',
    action()
    {
      BlazeLayout.render('error1');
    }
  });

  FlowRouter.route('/error2',{

    name :  'error2',
    action()
    {
      BlazeLayout.render('error2');
    }
  });

  FlowRouter.route('/error3',{

    name :  'error3',
    action()
    {
      BlazeLayout.render('error3');
    }
  });


FlowRouter.route('/error4',{

  name :  'error4',
  action()
  {
    BlazeLayout.render('error4');
  }
});

FlowRouter.route('/error5',{

  name :  'error5',
  action()
  {
    BlazeLayout.render('error5');
  }
});

FlowRouter.route('/error6',{

  name :  'error6',
  action()
  {
    BlazeLayout.render('error6');
  }
});

FlowRouter.route('/instructions',{
    name: 'instructions',
    subscriptions: function(params, queryParams) {
        this.register('getFair', Meteor.subscribe('allowedFairness', Meteor.userId()));
        this.register('getUserData', Meteor.subscribe('allowedData', Meteor.userId()));
    },
    action(params, queryParams) {

        Tracker.autorun(function() {

            var ready = FlowRouter.subsReady("getFair");
            var ready2 = FlowRouter.subsReady("getUserData");

            Tracker.nonreactive(function(){

                if(ready && ready2 && Meteor.user()){
                    BlazeLayout.render('selector');
                }


            });
        });
    }
});


FlowRouter.route('/home',{
  name: 'home' ,
  action ()
  {
    BlazeLayout.render('home');
  }
});

FlowRouter.route('/task1', {
    name: 'task1',
    subscriptions: function(params, queryParams) {
        this.register('getFair', Meteor.subscribe('allowedFairness', Meteor.userId()));
        this.register('getUserData', Meteor.subscribe('allowedData', Meteor.userId()));
    },
    action(params, queryParams) {

        Tracker.autorun(function() {

            var ready = FlowRouter.subsReady("getFair");
            var ready2 = FlowRouter.subsReady("getUserData");
            // var ready3 = FlowRouter.subsReady("allowedTaskInf");


            Tracker.nonreactive(function(){

                if(ready && ready2 && Meteor.user()){
                    BlazeLayout.render('selector');
                }


            });
        });
    }
});
