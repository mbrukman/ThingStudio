Template.AppsBody.onRendered(function() {
	$( '.tooltipped' ).tooltip( { delay: 50 } );
	$( 'ul.tabs' ).tabs();
	// Get last used tab, find tab container
	var sessionTabHref = Session.get( "activeAppTab" )
	var $tabContainer = this.$( ".tabs" )
	var activeTabHref = $tabContainer.find( '.active' ).attr( "href" )

	// Make last used tab active, if not gallery
	if ( activeTabHref != sessionTabHref ) {
		var $targetElement = $tabContainer.find( "a[href='" + sessionTabHref + "']" )
		var $targetTab = $( $targetElement )
		$targetTab.click()
	}
});

Template.AppList.onDestroyed( function () {
	$( '.tooltipped' ).tooltip( 'remove' );
});

Template.AppsBody.events({
	'click .select-app': function( e, tmpl ) {
		e.preventDefault();
		changeActiveApp( this._id );
	},
	'click .tab': function ( e, tmpl ) {
		var clickedTabHref = $( e.target ).attr( "href" )
		Session.set( "activeAppTab", clickedTabHref )
	}
});

Template.AppsBody.helpers({
	galleryAppsList: function(){
		return Apps.find({owner: {$ne: Meteor.userId()}})
	},
	myAppsList: function(){
		return Apps.find({owner: Meteor.userId()})
	},
	shareable: function(){
		if(this.shareable) {
			return true;
		} else {
			return false;
		}
	},
	parentTitle: function(){
		if ( this.ancestor ) {
			console.log('there is an ancestor')
			return(Apps.findOne({_id: this.ancestor})).title;
		} else {
			return;
		}
	}
});

Template.AppList.helpers({
    username: function(){
        return Meteor.users.findOne({_id: this.owner}).username;
    },
	current_app: function(){
		if(this._id == Session.get("currentAppId")) {
			return true;
		} else {
			return false;
		}
	},
	showSummary: function() {
		var mySummary = this.summary
		if ( mySummary ) {
			return mySummary
		} else {
			return 'No summary set'
		}
	},
	templateCount: function () {
		return Screens.find({appId: this._id}).count()
	},
	feedCount: function () {
		mqttFeedCount = Feeds.find({appId: this._id}).count()
		httpFeedCount = HTTPFeeds.find({appId: this._id}).count()
		return mqttFeedCount + httpFeedCount;
	},
	showConnectionTitle: function() {
		var connection = Connections.find({_id: this.connection}).fetch()
		if ( connection.length > 0 ) {
			connectionTitle = connection[0].title
			return connectionTitle
		} else {
			return 'No connection set'
		}
	},
	showHomePage: function() {
		var home = Screens.find({_id: this.home_page}).fetch()
		if ( home.length > 0 ) {
			homeTitle = home[0].title
			return homeTitle
		} else {
			return 'None set'
		}
	},
	showShareable: function() {
		return this.shareable ? "true" : "false";
	},
	showPublic: function() {
		return this.public ? "true" : "false";
	},
	showDescription: function() {
		var myDescription = this.description
		if ( myDescription ) {
			return myDescription
		} else {
			return 'No description set'
		}
	},
	appPathInfo: function(){
		return {appid: this._id}
	}
});
