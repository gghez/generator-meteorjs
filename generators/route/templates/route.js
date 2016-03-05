
FlowRouter.route('<%= path %>', {
    action: () => {
	BlazeLayout.render('mainLayout', {content: '<%= template %>'});
    }
});
