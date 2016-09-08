/**
 * @fileoverview Provide zz.mvc.views.LayoutView.
 * @license Apache-2.0
 * @author popkov.aleksander@gmail.com (Alexander Popkov)
 */

goog.provide( 'zz.mvc.views.LayoutView' );

goog.require( 'goog.dom' );
goog.require( 'goog.array' );
goog.require( 'zz.views.FEBase' );
goog.require( 'zz.environment.services.RAM' );
goog.require( 'zz.models.Message' );
goog.require( 'zz.models.enums.EventType' );

/**
 * The default implementation of base view.
 * @param {Function} dataset_template
 * @param {Function} datarow_template
 * @extends {goog.ui.ControlRenderer}
 * @constructor
 */
zz.mvc.views.LayoutView = function( dataset_template, datarow_template ){

	goog.base( this, 'constructor' );

	/**
	 * Application environment.
	 * @type {zz.environment.services.Environment}
	 * @private
	 */
	this.env_ = zz.environment.services.Environment.getInstance( );

	/**
	 * Application RAM.
	 * @type {zz.environment.services.RAM}
	 * @private
	 */
	this.ram_ = zz.environment.services.RAM.getInstance( );

	/**
	 * Dataset template function.
	 * @type {Function}
	 * @private
	 */
	this.dataset_template_ = dataset_template;

	/**
	 * Datarow template function.
	 * @type {Function}
	 * @private
	 */
	this.datarow_template_ = datarow_template;
};

/**
 * Base inheritance.
 */
goog.inherits( zz.mvc.views.LayoutView, zz.views.FEBase );
goog.addSingletonGetter( zz.mvc.views.LayoutView );

/**
 * Base subscriber for model changes.
 * @param {zz.models.Message} message
 * @final
 */
zz.mvc.views.LayoutView.prototype.modelChanged = function( message ){

	var item = this.ram_.get( message.dataset.getUid( ) );
	if( item ){

		if( message.eventtype == zz.models.enums.EventType.DATAROW_CREATE ){

			item.controller.getView( ).renderDatarow( message );
		}
		if( message.eventtype == zz.models.enums.EventType.DATAROW_UPDATE ){

			item.controller.getView( ).updateDatarow( message );
		}
		if( message.eventtype == zz.models.enums.EventType.DATAROW_DELETE ){

			item.controller.getView( ).removeDatarow( message );
		}
	}
};


/**
 * Set width for layout.
 * @param {number} width
 */
zz.mvc.views.LayoutView.prototype.setWidth = function( width ){

	var layoutElement;
	var relativeWidth;
	goog.style.setWidth( layoutElement, relativeWidth );
};

/**
 * Set height for layout.
 * @param {number} height
 */
zz.mvc.views.LayoutView.prototype.setHeight = function( height ){

	var layoutElement;
	var relativeHeight;
	goog.style.setHeight( layoutElement, relativeHeight );
};