//
(function(){
	var dom = tinymce.DOM, 
		scriptLoader = new tinymce.dom.ScriptLoader(),
		loadLink = dom.get('delayedLoad');
	
	//tell the user that the plugin has finished loading, unbind handler and remove link
	function scriptLoaded(){
		loadLink.parentNode.innerHTML = "Loaded, try typing a url into the TinyMCE instance below.";
		dom.unbind(loadLink, 'click', loadScript);
	}

	//Load the script and let the user know that it's loading.
	function loadScript(e){
		scriptLoader.add('plugins/autolink/editor_plugin.js', scriptLoaded);
		loadLink.innerHTML = "Loading...";
		scriptLoader.loadQueue();
		e.preventDefault();
	}
	
	dom.bind(loadLink, 'click', loadScript);
})();