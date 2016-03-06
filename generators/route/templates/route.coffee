
FlowRouter.route '<%= path %>',
  action: (params) ->
    BlazeLayout.render 'mainLayout',
      content: '<%= template %>'
      params: params
