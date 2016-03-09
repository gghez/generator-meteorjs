Template.posts.onCreated ->

  @autorun =>
    @subscribe 'posts', Template.currentData().params


Template.posts.helpers

  postsItem: -> Posts.findOne {}
