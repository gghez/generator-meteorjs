Template.posts.onCreated ->

  @subscribe 'posts'


Template.posts.helpers

  postsItems: -> Posts.find()
