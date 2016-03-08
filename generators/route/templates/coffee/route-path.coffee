FlowRouter.route '<%= path %>',
  action: <% if (hasParams) { %>(params) <%}%>->
    BlazeLayout.render 'mainLayout',
      content: '<%= template %>'
<% if (hasParams) { %>      params: params<%}%>
