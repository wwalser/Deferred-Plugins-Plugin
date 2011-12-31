# Deferred Plugin for TinyMCE
The deferred plugins plugin for TinyMCE allows plugin scripts to be initialized after TinyMCE has been initialized. 

TinyMCE makes the assumption that all scripts needed for it's full initialization, including plugins, will be available at the time that tinymce.init() is called. This plugin allows plugin scripts to be loaded and initialized after that initial init call.

## Why?
There is a class of plugin where immediate availability of the feature is less important than drawing of the UI and availability of editing. This should mean that those plugins could be loaded via script files with a defer attribute or via dynamic script injection. TinyMCE's current implementation of plugin initilization does not afford for this possibility.

## Usage
Plugin scripts are written in the standard way that all TinyMCE plguins are written, no changes are necessary in plugin scripts. If you take a look in the examples directory you'll notice that every example uses a plugin that ships with TinyMCE as it's deferral example.

    settings.deferred_plugins

The deferred_plugins setting must be provided, in order to inform TinyMCE which additional plugins may be loaded after it's initialization. This list essentially acts as a white list of plugins that may come in after initilization.