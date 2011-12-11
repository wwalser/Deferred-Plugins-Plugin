/**
 * editor_plugin_src.js
 *
 * Copyright 2011, Wesley Walser
 */

(function(tinymce) {
	var needsInit = 1;
	tinymce.create('tinymce.plugins.DeferredPluginsPlugin', {
		DeferredPluginsPlugin : function(ed, url){
			this.deferredPlugins = {};
			this.ed = ed;
		},

		/**
		 * Initializes the plugin, this will be executed after the plugin has been created.
		 * This call is done before the editor instance has finished it's initialization so use the onInit event
		 * of the editor instance to intercept that event.
		 *
		 * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
		 * @param {string} url Absolute URL to where the plugin is located.
		 */
		init : function (ed, url) {
			var deferredPlugins = ed.settings.deferred_plugins,
				t = this, each = tinymce.each, explode = tinymce.explode, PluginManager = tinymce.PluginManager;

			if (!deferredPlugins) {
				return;
			}

			each(explode( deferredPlugins ), function(id){
				var pluginConstructor = PluginManager.get(id);
				
				t.deferredPlugins[id] = (pluginConstructor || needsInit);

				if (pluginConstructor) {
					//plugin file had already been parsed so we can init now
					t.initPlugin(id, pluginConstructor);
				} 
			});

			PluginManager.onAdd.add(function(PluginManager, id, pluginConstructor){
				if (t.deferredPlugins[id] === needsInit) {
					//plugin file was parsed after deferredPlugin so immediately init
					t.deferredPlugins[id] = pluginConstructor;
					t.initPlugin(id, pluginConstructor);
				}
			});
		},

		initPlugin : function(id, pluginConstructor){
			var t = this;
			if (t.ed.plugins[id]){
				//Something wrong in setup or scripts loaded multiple times.
				return;
			}

			tinymce.each(tinymce.PluginManager.dependencies(id), function(depId){
				var depConstructor = PluginManager.get(depId);
				if (depConstructor) {
					t.initPlugin(depId, depConstructor);
				}
				//Can't find the dep? Assume the best!
			});

			pluginObject = new pluginConstructor(t.ed);

			t.ed.plugins[id] = pluginObject;

			if (pluginObject.init) {
				pluginObject.init(t.ed)
			}
		},

		/**
		* Returns information about the plugin as a name/value array.
		* The current keys are longname, author, authorurl, infourl and version.
		*
		* @return {Object} Name/value array containing information about the plugin.
		*/
		getInfo : function() {
			return {
				longname : 'DeferredPlugins',
				author : 'Wesley Walser',
				authorurl : 'http://github.com/wwalser',
				infourl : 'http://github.com/wwalser/tinymce',
				version : 0.1
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add('deferredplugins', tinymce.plugins.DeferredPluginsPlugin);
})(tinymce);
