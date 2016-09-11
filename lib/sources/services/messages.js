/**
 * @fileoverview Provide typper.layout.services.Messages class.
 * @license Apache-2.0
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

goog.provide( 'zz.mvc.services.Messages' );

goog.require( 'zz.i18n.services.SoyMessages' );
goog.require( 'zz.mvc.templates.messages' );

/**
 * @extends {zz.i18n.services.SoyMessages}
 * @constructor
 */
zz.mvc.services.Messages = function( ){

    goog.base( this, zz.mvc.templates.messages.widgetsTypes );
};

/**
 * Base inheritance.
 */
goog.inherits( zz.mvc.services.Messages, zz.i18n.services.SoyMessages );
goog.addSingletonGetter( zz.mvc.services.Messages );