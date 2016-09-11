/**
 * @fileoverview Provide zz.mvc.views.Widget class.
 * @license Apache-2.0
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

goog.provide( 'zz.mvc.views.Widget' );
goog.require( 'zz.views.FEBase' );
goog.require( 'zz.mvc.templates' );

/**
 * Widget controller.
 * @constructor
 */
zz.mvc.views.Widget = function( ){

    goog.base( this, zz.mvc.templates.widgetDataset, zz.mvc.templates.widgetDatarow );
};
goog.inherits( zz.mvc.views.Widget, zz.views.FEBase );
goog.addSingletonGetter( zz.mvc.views.Widget );

