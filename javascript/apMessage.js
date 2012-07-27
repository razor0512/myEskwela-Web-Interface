var apMessageBox = apMessageBox || {};

(function($) {

	/**
	 * Basic messagebox functionality. Note that this code relies
	 * on jQuery 1.4 and jQuery UI 1.8. A config object tells this object
	 * how to behave. The config object takes the following arguments:
	 * 	* dialogEl - The name of the dialog <div>. Defaults to "messageDialog"
	 * 	* messageEl - The name of the message <p>. Defaults to "message"
	 * 	* errorImage - Path to an error image icon
	 *  	* informationImage - Path to an information image icon
	 * 	* messageType - Type of message being displayed. Valid values are
	 * 						 "error" and "information"
	 * 	* title - Dialog box title. Defaults to "Notice!"
	 * 	* width - Width of the dialog
	 * 	* height - Height of the dialog
	 * 	* message - The message to display
	 * 	* callback - A method to be executed once the dialog is closed
	 * 	* scope - The scope in which to call the callback method
	 * 
	 * @author Adam Presley
	 * @class
	 */
	apMessageBox = function(config)
	{
		/**
		 * Initializes the message box. This uses jQuery UI to do the 
		 * dialog box. When the box is closed the added DOM elements
		 * are detached from the DOM.
		 * @author Adam Presley
		 */
		this.initialize = function()
		{
			/*
			 * Call our DOM building method and pass a method to be executed
			 * once the DOM is built. This method will setup the jQuery UI
			 * dialog.
			 */
			__buildDOM(function() {
			
				$("#" + __config.messageEl).text(__config.message);
				
				$("#" + __config.dialogEl).dialog({
					modal: true,
					width: __config.width,
					height: __config.height,
					resizable: false,
					close: function(e, ui) {
						$("#" + __config.dialogEl).detach();

						/*
						 * Execute any defined callback.
						 */
						if (__config.callback !== null && __config.callback !== undefined)
						{
							if (__config.scope !== null && __config.scope !== undefined)
							{
								__config.callback.call(__config.scope);
							}
							else
							{
								__config.callback();
							}
						}
					},
					buttons: {
						Ok: function() {
							$(this).dialog("close");
						}
					}
				});
				
			});
		};
		
		var __buildDOM = function(callback)
		{
			/*
			 * Outer message containing div and message <p>
			 */
			var outer = $("<div />");
			var pEl = $("<p />").attr({ 
				id: __config.messageEl
			}).css({ "text-align": "left" });
			var img = null;
			
			/*
			 * If this is an error message attach an error icon.
			 * Otherwise attach an information icon.
			 */
			if (__config.messageType == "error")
			{
				img = $("<img />").attr({
					src: __config.errorImage
				}).css({ float: "left", "margin-right": "10px" });
				
				$(outer).append(img);
			}
			else
			{
				img = $("<img />").attr({
					src: __config.informationImage
				}).css({ float: "left", "margin-right": "10px" });
				
				$(outer).append(img);
			}
			
			/*
			 * Append the <p> to the <div>
			 */
			$(outer).append(pEl);
			
			/*
			 * Build the dialog <div>. Attach the message and icon <div>
			 * to it, then attach the dialog <div> to the body.
			 */
			var dialogEl = $("<div />").attr({
				id: __config.dialogEl,
				title: __config.title
			}).css({
				display: "none"
			});

			$(dialogEl).append(outer);
			$("body").append(dialogEl);
			
			/*
			 * When all is ready execute our callback which
			 * uses jQuery UI to do the dialog box.
			 */
			$(document).ready(callback);
		};
		
		var __config = $.extend({
			dialogEl: "messageDialog",
			messageEl: "message",
			errorImage: apMessageBox.errorImage || "error.png",
			informationImage: apMessageBox.informationImage || "information.png",
			messageType: "information",
			title: "Notice!",
			width: 350,
			height: 200,
			message: "",
			callback: null,
			scope: null
		}, config);
		var __this = this;
		
		this.initialize();
	};

	apMessageBox.show = function(config)
	{
		var msg = new apMessageBox(config || {});
	};
	
	apMessageBox.error = function(config)
	{
		var newConfig = $.extend({
			messageType: "error",
			title: "Error!"
		}, config);
		
		apMessageBox.show(newConfig);
	};
	
	apMessageBox.information = function(config)
	{
		var newConfig = $.extend({
			messageType: "information",
			title: "Notice!"
		}, config);
		
		apMessageBox.show(newConfig);
	};
	
})(jQuery);