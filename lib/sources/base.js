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

    //var ram = zz.environment.services.RAM.getInstance( );
    var appModel = new zz.mvc.models.AppDataset( );
	var appView = new zz.mvc.views.LayoutView( zz.mvc.templates.appDataset, zz.mvc.templates.appDatarow );
    var appController = new zz.controllers.FEBase( appModel, appView );

    // This should be run from zz.controllers.FEBase#bootstrap method.
    var layoutModel;
    var layoutView = new zz.views.FEBase( zz.mvc.templates.layoutDataset, zz.mvc.templates.layoutDatarow );

    appModel.createLast( [ 'Test application', '0.0.1', 'Good guys', 'Copyright info' ] );
    layoutModel = appModel.lastDatarow( ).layout;
    layoutModel.createLast( [ '90%', '90%' ] );
    appController.addFieldController(

        appModel.firstDatarow( ),
        appModel.datafield.layout,
        new zz.controllers.FEBase( layoutModel, layoutView ) );

    //appModel.createLast( [ 'Test application', '0.0.1', 'Good guys', 'Copyright info' ] );
    //layoutModel = appModel.lastDatarow( ).layout;
    //layoutModel.createLast( [ '95%', '95%' ] );
    //appController.addFieldController(
    //
    //    appModel.lastDatarow( ),
    //    appModel.datafield.layout,
    //    new zz.controllers.FEBase( layoutModel, layoutView ) );

    var layoutController = new zz.controllers.FEBase( layoutModel, layoutView );
    var viewModel;
    var viewView = new zz.views.FEBase( zz.mvc.templates.viewDataset, zz.mvc.templates.viewDatarow );

    viewModel = layoutModel.lastDatarow( ).views;
    viewModel.createLast( [ 'Test view title' ] );
    layoutController.addFieldController(

        layoutModel.firstDatarow( ),
        layoutModel.datafield.views,
        new zz.controllers.FEBase( viewModel, viewView ) );


    var viewController = new zz.controllers.FEBase( viewModel,viewView );
    var widgetModel;
    var widgetView = new zz.views.FEBase( zz.mvc.templates.widgetDataset, zz.mvc.templates.widgetDatarow );

    widgetModel = viewModel.lastDatarow( ).widgets;
    widgetModel.createLast( [ 'Widget title' ] );
    viewController.addFieldController(

        viewModel.firstDatarow( ),
        viewModel.datafield.widgets,
        new zz.controllers.FEBase( widgetModel, widgetView ) );

    window.controller = appController;
};
goog.exportSymbol( 'zz.mvc.bootstrap', zz.mvc.bootstrap );