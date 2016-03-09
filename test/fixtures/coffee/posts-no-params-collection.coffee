Template.posts.onCreated ->

  @subscribe 'theposts'


Template.posts.helpers

  thepostsItems: -> Theposts.find()
