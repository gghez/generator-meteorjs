Template.postList.onCreated ->

  @subscribe 'theposts'


Template.postList.helpers

  thepostsItems: -> Theposts.find()
