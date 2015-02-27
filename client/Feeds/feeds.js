Template.Feeds.helpers({
	feedlist: function(){
		console.log("feeds")
		return Feeds.find({})
	}
});



Template.Feeds.events({
	'click #subscribe-button': function(ev){
		console.log("Boo");		
		feeds = Feeds.find({}).fetch();
		i = 0;
		for(i=0; i<feeds.length; i++){
			console.log("Subscribing to " + feeds[i].subscription);
			mqttClient.subscribe(feeds[i].subscription);
		}
	}
});

Meteor.startup(function(){
	Feeds.before.insert(function(userId, doc) {
		console.log("New Feed: ", userId, doc);
	});
});


