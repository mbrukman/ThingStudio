Template.ViewerLayout.helpers({
	isConnected: function() {
		if ( Session.get( "ConnectionStatus" ) == true ) {
			return 'connected';
		} else {
			return 'disconnected';
		}
	},
	appHamburger: function() {
		appId = Session.get("currentAppId")
		app = Apps.findOne({_id: appId})
		if ( !app ) { return }
		showMenu = app.showHamburger
		screenCount = Screens.find({isWidget: false}).count()
		// console.log('screencount', screenCount)
		if ( !showMenu ||  screenCount < 2) {
			// Hide the nav
			return 'hide-app-nav'
		} else {
			// Show the nav
			return ''
		}
	},
	screenlist: function(){
		return Screens.find({isWidget: false})
	},
	runtimeErrors: function(){
		return Session.get("runtimeErrors");
	},
	appPathInfo: function(){
		return {appid: Session.get("currentAppId")}
	}
	// log: function () {
	// 	var hithere = Session.get("currentAppId")
	// 	console.log('Here is this in the viewer', hithere)
	// }
})
