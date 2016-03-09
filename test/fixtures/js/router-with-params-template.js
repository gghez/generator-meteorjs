FlowRouter.route('/', {
    action: () => {
        BlazeLayout.render('mainLayout', {
            content: 'home'
        });
    }
});

FlowRouter.route('/posts/:postId', {
    action: (params) => {
        BlazeLayout.render('mainLayout', {
            content: 'onePost',
            params: params
        });
    }
});
