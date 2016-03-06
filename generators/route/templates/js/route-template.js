
Template.<%= template %>.onCreated(function(){

<% if (collection) { %>
  <% if (single) { %>
  this.autorun(() => {
    this.subscribe('<%= collection %>', Template.currentData().params);
  });
  <% } else { %>
  this.subscribe('<%= collection %>');
  <% } %>
<% } %>

});

Template.<%= template %>.helpers({

<% if (single) { %>
  <%= collection %>Item: () => {
    return <%= collectionVar %>.findOne({});
  }
<% } else { %>
  <%= collection %>Items: () => {
    return <%= collectionVar %>.find();
  }
<% } %>

});
