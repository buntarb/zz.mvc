/**
 * @fileoverview Provide zz.mvc base object.
 * @license Apache-2.0
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

goog.provide( 'zz.mvc' );

goog.require( 'zz.views.FEBase' );
goog.require( 'zz.controllers.FEBase' );
goog.require( 'zz.mvc.models.Dataset' );
goog.require( 'zz.mvc.models.Datarow' );
goog.require( 'zz.mvc.templates' );

/**
 * Base namespace for zz.mvc module.
 * @const
 */
zz.mvc = zz.mvc || { };

/**
 * Bootstrap module method.
 */
zz.mvc.bootstrap = function( ){

	var view = new zz.views.FEBase( zz.mvc.templates.dataset, zz.mvc.templates.datarow );
    var model = new zz.mvc.models.Dataset( undefined, [[1, 'test1']] );
        model.createLast( [2, 'test2'] );
    var controller = new zz.controllers.FEBase( model, view );
        controller.render( goog.dom.getElement( 'root' ) );

    window.controller = controller;
    window.model = model;
};
goog.exportSymbol( 'zz.mvc.bootstrap', zz.mvc.bootstrap );