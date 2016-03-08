Template.<%= template %>.onCreated ->
<% if (collection) { %><% if (single) { %>
    @autorun =>
        @subscribe '<%= collection %>', Template.currentData().params
<% } else { %>
    @subscribe '<%= collection %>'
<% } %><% } %>

Template.<%= template %>.helpers
<% if (single) { %>
    <%= collection %>Item: -> <%= collectionVar %>.findOne {}
<% } else { %>
    <%= collection %>Items: -> <%= collectionVar %>.find()
<% } %>
