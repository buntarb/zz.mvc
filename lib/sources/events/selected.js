/**
 * @fileoverview Provide zz.mvc.events.Selected.
 * @license Apache-2.0
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

goog.provide( 'zz.mvc.events.Selected' );
goog.require( 'zz.mvc.enums.EventType' );
goog.require( 'zz.events.BaseEvent' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Scatterplot matrix selected event class.
 * @param {string} data
 * @extends {zz.events.BaseEvent}
 * @constructor
 */
zz.mvc.events.Selected = function( data ){

	goog.base( this, zz.mvc.enums.EventType.SELECTED );

	/**
	 * Selected items.
	 * @type {string}
	 */
	this.data = data;
};
goog.inherits( zz.mvc.events.Selected, zz.events.BaseEvent );