/**
 * @fileoverview Provide zz.mvc.enums.EventType.
 * @license Apache-2.0
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

goog.provide( 'zz.mvc.enums.EventType' );
goog.require( 'goog.events' );

/**
 * Constants for application events.
 * @enum {string}
 */
zz.mvc.enums.EventType = {

	SELECTED: goog.events.getUniqueId( 'selected' )
};