FlowRouter.route '/', action: ->
  BlazeLayout.render 'mainLayout', content: 'home'

FlowRouter.route '/posts',
  action: ->
    BlazeLayout.render 'mainLayout',
      content: 'postList'
