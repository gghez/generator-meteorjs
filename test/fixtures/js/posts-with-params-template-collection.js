Template.onePost.onCreated(function() {

    this.autorun(() => {
        this.subscribe('theposts', Template.currentData().params);
    });

});

Template.onePost.helpers({

    thepostsItems: () => {
        return Theposts.findOne({});
    }

});
