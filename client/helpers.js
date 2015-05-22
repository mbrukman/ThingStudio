Template.registerHelper( 
	"gravatar", function(){
		return Gravatar.imageUrl(Meteor.user().emails[0].address);
	}
);
Template.registerHelper(
	"curr_app_name", function() {
		return Session.get("currentApp").title;
	}
);