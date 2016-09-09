/**
 * @fileoverview Provide zz.mvc base object.
 * @license Apache-2.0
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

goog.provide( 'zz.mvc' );

goog.require( 'zz.environment.services.RAM' );
goog.require( 'zz.views.FEBase' );
goog.require( 'zz.mvc.views.LayoutView' );
goog.require( 'zz.controllers.FEBase' );
goog.require( 'zz.mvc.models.Dataset' );
goog.require( 'zz.mvc.models.AppDataset' );
goog.require( 'zz.mvc.models.LayoutDataset' );
goog.require( 'zz.mvc.models.ViewDataset' );
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

    var appModel = new zz.mvc.models.AppDataset( );
	var appView = new zz.mvc.views.LayoutView( zz.mvc.templates.appDataset, zz.mvc.templates.appDatarow );
    var appController = new zz.controllers.FEBase( appModel, appView );

    appModel.createLast( [ 'Test application', '0.0.1', 'Good guys', 'Copyright info' ] );

    // This should be run from zz.controllers.FEBase#bootstrap method.

    var layoutModel = appModel.lastDatarow( ).layout;
    var layoutView = new zz.views.FEBase( zz.mvc.templates.layoutDataset, zz.mvc.templates.layoutDatarow );
    var layoutController = new zz.controllers.FEBase( layoutModel, layoutView );

    layoutModel.createLast( [ '90%', '90%' ] );
    appController.addFieldController(

        appModel.firstDatarow( ),
        appModel.datafield.layout,
        layoutController );

    var viewModel = layoutModel.lastDatarow( ).views;
    var viewView = new zz.views.FEBase( zz.mvc.templates.viewDataset, zz.mvc.templates.viewDatarow );
    var viewController = new zz.controllers.FEBase( viewModel, viewView );

    viewModel.createLast( [ 'Test view title' ] );
    layoutController.addFieldController(

        layoutModel.firstDatarow( ),
        layoutModel.datafield.views,
        viewController );

    var widgetModel = viewModel.lastDatarow( ).widgets;
    var widgetView = new zz.views.FEBase( zz.mvc.templates.widgetDataset, zz.mvc.templates.widgetDatarow );
    var widgetController = new zz.controllers.FEBase( widgetModel, widgetView );

    widgetModel.createLast( [ 'Widget title' ] );
    viewController.addFieldController(

        viewModel.firstDatarow( ),
        viewModel.datafield.widgets,
        widgetController );

    window.controller = appController;
};
goog.exportSymbol( 'zz.mvc.bootstrap', zz.mvc.bootstrap );