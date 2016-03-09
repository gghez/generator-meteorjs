Template.postList.onCreated ->

  @subscribe 'posts'


Template.postList.helpers

  postsItems: -> Posts.find()
