Java.perform(function () {
    // var LuaLoader = Java.use('plugin.tpnmopub.LuaLoader');
    // LuaLoader.init.overload('android.os.Bundle').implementation = function (bundle) {
        // send("Hook Start...LuaLoader");
        // return this.init(bundle)
    // }
	// var tpnsupersonic = Java.use('plugin.tpnsupersonic.LuaLoader');
	// tpnsupersonic.showIncentivizedInterstitial.overload().implementation = function () {
        // send("Hook Start...showIncentivizedInterstitial");
		// var LuaLoader1 = Java.use('plugin.tpnsupersonic.LuaLoader');
        // send("Hook Start...LuaLoader"+this.hasReward.value);
		//this.hasReward.value = true
		//this.incentivizedInterstitialWrapper.notifyAvailabilityChanged(true);
		//LuaLoader1.hasReward=true
		// send("Hook Start...LuaLoader"+this.hasReward.value);
        // return this.showIncentivizedInterstitial()
    // }
	// tpnsupersonic.init.overload('android.os.Bundle').implementation = function (bundle) {
        // send("Hook Start...init");
        // return this.init(bundle)
    // }
	// var tpnsupersonic2 = Java.use('plugin.tpnsupersonic.LuaLoader$1');
	// tpnsupersonic2.onRewardedVideoAdClosed.overload().implementation = function () {
        // send("Hook Start...onRewardedVideoAdClosed");
        // return this.onRewardedVideoAdClosed()
		//return
    // }
	// tpnsupersonic2.onRewardedVideoAdClicked.overload('com.ironsource.mediationsdk.model.Placement').implementation = function (placement) {
        // send("Hook Start...onRewardedVideoAdClicked");
        // return this.onRewardedVideoAdClicked(placement)
    // }
	// tpnsupersonic2.onRewardedVideoAvailabilityChanged.overload('boolean').implementation = function (placement) {
        // send("Hook Start...onRewardedVideoAvailabilityChanged");
        // return this.onRewardedVideoAvailabilityChanged(placement)
		//return 
    // }
	// tpnsupersonic2.onRewardedVideoAdShowFailed.overload('com.ironsource.mediationsdk.logger.IronSourceError').implementation = function (ironSourceError) {
        // send("Hook Start...onRewardedVideoAdShowFailed");
        // return this.onRewardedVideoAdShowFailed(ironSourceError)
    // }
	// tpnsupersonic2.onRewardedVideoAdRewarded.overload('com.ironsource.mediationsdk.model.Placement').implementation = function (placement) {
        // send("Hook Start...onRewardedVideoAdRewarded");
        //return this.onRewardedVideoAdRewarded(placement)
    // }
	// var IronSource =  Java.use('com.ironsource.mediationsdk.IronSource')
	// IronSource.setUserId.overload('java.lang.String').implementation = function (libname) {
        // send("Hook Start...");
        // send("libname:"+libname);
        //return this.setUserId(libname)
    // }
	
	
	
	
	var LuaLoader = Java.use('br.com.tapps.love');
    LuaLoader.onCreate.overload('android.os.Bundle').implementation = function (bundle) {
        send("Hook Start...onCreate");
        return this.onCreate(bundle)
    }
	
	
    // var MainActivity = Java.use('filemanager.fileexplorer.manager.proad.j');
    // MainActivity.onAdClicked.overload().implementation = function () {
        // send("Hook Start...onAdClicked");
        // return this.onAdClicked()
    // }
	
	// MainActivity.onAdClosed.overload().implementation = function () {
        // send("Hook Start...onAdClosed");
        // return this.onAdClosed()
    // }
	
	// MainActivity.onAdLoaded.overload().implementation = function () {
        // send("Hook Start...onAdLoaded");
        // return this.onAdLoaded()
    // }
	
	// MainActivity.onAdOpened.overload().implementation = function () {
        // send("Hook Start...onAdOpened");
        // return this.onAdOpened()
    // }
	
	// var MainActivity1 = Java.use('filemanager.fileexplorer.manager.activities.MainActivity');
	// MainActivity1.onCreate.overload('android.os.Bundle').implementation = function (Bundle) {
        // send("Hook Start...onCreate");
        // return this.onCreate(Bundle)
    // }
	
	// MainActivity1.s.overload().implementation = function () {
        // send("Hook s()...onCreate");
        // return this.s()
    // }
	
	// var InterstitialAd = Java.use('com.google.android.gms.ads.InterstitialAd');
	// InterstitialAd.setAdUnitId.overload('java.lang.String').implementation = function (str) {
        // send("Hook Start...onCreate"+ str);
        // return this.setAdUnitId(str)
    // }
	
	
	
});


		// var Thread = Java.use('java.lang.Thread');
		// Thread.dumpStack()