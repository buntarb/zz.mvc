// Copyright 2016 Artem Lytvynov <buntarb@gmail.com>. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @license Apache-2.0
 * @copyright Artem Lytvynov <buntarb@gmail.com>
 */

goog.provide( 'zz.mvc' );
goog.require( 'goog.asserts' );
goog.require( 'zz.environment.services.RAM' );
goog.require( 'zz.environment.services.MVCTree' );
goog.require( 'zz.views.FEBase' );
goog.require( 'zz.controllers.FEBase' );
goog.require( 'zz.mvc.templates' );
goog.require( 'zz.mvc.services.Messages' );
goog.require( 'zz.mvc.controllers.Widget' );
goog.require( 'zz.mvc.models.Application' );
goog.require( 'zz.mvc.enums.EventType' );
goog.require( 'zz.mvc.controllers.Layout' );
goog.require( 'zz.mvc.views.Layout' );
goog.require( 'zz.mvc.controllers.View' );
goog.require( 'zz.mvc.views.View' );

/**
 * Bootstrap module method.
 */
zz.mvc.bootstrap = function( ){

    /**
     * Root application controller.
     * @type {zz.controllers.FEBase}
     */
    var appController = zz.mvc.construct( );
    // appController.getHandler( ).listen(
    //
    //     appController,
    //     goog.ui.Component.EventType.ACTION,
    //     zz.mvc.handleAction
    // );
    // appController.getHandler( ).listen(
    //
    //     appController,
    //     goog.ui.Component.EventType.CHANGE,
    //     zz.mvc.handleChange
    // );
    // appController.getHandler( ).listen(
    //
    //     appController,
    //     zz.mvc.enums.EventType.SELECTED,
    //     zz.mvc.handleSelected
    // );
    window[ 'controller' ] = appController;
    window[ 'MVCTree' ] = zz.environment.services.MVCTree.getInstance( );
};

/**
 * Construct application and return root app controller.
 * @returns {zz.controllers.FEBase}
 */
zz.mvc.construct = function( ){

    var appModel = new zz.mvc.models.Application( );
    var appView = new zz.views.FEBase( zz.mvc.templates.application );
    var appController = new zz.controllers.FEBase( appModel, appView );

    appModel.createLast( [ 'Test application', '0.0.1', 'Good guys', 'Copyright info', '', false, true ] );

    var layoutModel = appModel.lastDatarow( ).layout;
        layoutModel.createLast( [ '100px', '100px' ] );

    var viewModel = layoutModel.lastDatarow( ).views;
        viewModel.createLast( [ 'Title here!' ] );


    // // This should be run from zz.controllers.FEBase#bootstrap method.
    //
    // var layoutModel = appModel.lastDatarow( ).layout;
    // var layoutView = new zz.views.FEBase( zz.mvc.templates.layoutDataset, zz.mvc.templates.layoutDatarow );
    // var layoutController = new zz.controllers.FEBase( layoutModel, layoutView );
    //
    // layoutModel.createLast( [ '90%', '90%' ] );
    // appController.addFieldController(
    //
    //     appModel.firstDatarow( ),
    //     appModel.datafield.layout,
    //     layoutController );
    //
    // var viewModel = layoutModel.lastDatarow( ).views;
    // var viewView = new zz.views.FEBase( zz.mvc.templates.viewDataset, zz.mvc.templates.viewDatarow );
    // var viewController = new zz.controllers.FEBase( viewModel, viewView );
    //
    // viewModel.createLast( [ 'Some dashboard name (untranslatable data).' ] );
    // layoutController.addFieldController(
    //
    //     layoutModel.firstDatarow( ),
    //     layoutModel.datafield.views,
    //     viewController );
    //
    // var widgetModel = viewModel.lastDatarow( ).widgets;
    // var controller = new zz.mvc.controllers.Widget( widgetModel );
    // var demoD3WidgetModel = widgetModel.createLast( );
    // var scatterWidgetModel = widgetModel.createLast( );
    // var chartWidgetModel = widgetModel.createLast( );
    //
    // // Test based on examples from here:
    // // http://stackoverflow.com/questions/22057616/benchmarking-highcharts-d3-and-canvas-plotting
    // var speedTestHC = widgetModel.createLast( );
    // var speedTestD3 = widgetModel.createLast( );
    // var speedTestSVG = widgetModel.createLast( );
    // var speedTestCanvas = widgetModel.createLast( );
    // controller
    //
    //     .loadTestDataAsText( )
    //     .then( function( text ){
    //
    //         scatterWidgetModel.title = zz.mvc.services.Messages.getInstance( ).getMessage( '1' );
    //         scatterWidgetModel.type = 'scatter';
    //         scatterWidgetModel.data = text;
    //         scatterWidgetModel.numberField = 0;
    //
    //         chartWidgetModel.title = zz.mvc.services.Messages.getInstance( ).getMessage( '2' );
    //         chartWidgetModel.type = 'piechart';
    //         chartWidgetModel.data = controller.getPieFromScatterData( text );
    //         chartWidgetModel.numberField = 0;
    //
    //         demoD3WidgetModel.title = zz.mvc.services.Messages.getInstance( ).getMessage( '3' );
    //         demoD3WidgetModel.type = 'demoD3';
    //         demoD3WidgetModel.data = text;
    //         demoD3WidgetModel.numberField = 0;
    //
    //         speedTestHC.title = zz.mvc.services.Messages.getInstance( ).getMessage( '4' );
    //         speedTestHC.type = 'testHC';
    //         speedTestHC.data = controller.getPieFromScatterData( text );
    //         speedTestHC.numberField = 1000;
    //
    //         speedTestD3.title = zz.mvc.services.Messages.getInstance( ).getMessage( '5' );
    //         speedTestD3.type = 'testD3';
    //         speedTestD3.data = controller.getPieFromScatterData( text );
    //         speedTestD3.numberField = 1000;
    //
    //         speedTestSVG.title = zz.mvc.services.Messages.getInstance( ).getMessage( '6' );
    //         speedTestSVG.type = 'testSVG';
    //         speedTestSVG.data = controller.getPieFromScatterData( text );
    //         speedTestSVG.numberField = 1000;
    //
    //         speedTestCanvas.title = zz.mvc.services.Messages.getInstance( ).getMessage( '7' );
    //         speedTestCanvas.type = 'testCanvas';
    //         speedTestCanvas.data = controller.getPieFromScatterData( text );
    //         speedTestCanvas.numberField = 1000;
    //
    //         viewController.addFieldController(
    //
    //             viewModel.firstDatarow( ),
    //             viewModel.datafield.widgets,
    //             controller );
    //
    //         controller.instantiateWidget( scatterWidgetModel );
    //         controller.instantiateWidget( chartWidgetModel );
    //         controller.instantiateWidget( demoD3WidgetModel );
    //         controller.instantiateWidget( speedTestHC );
    //         controller.instantiateWidget( speedTestD3 );
    //         controller.instantiateWidget( speedTestSVG );
    //         controller.instantiateWidget( speedTestCanvas );
    //     } );
    return appController;
};

/**
 * Handle scatterplot matrix selected event.
 * @param {zz.mvc.events.Selected} e
 */
zz.mvc.handleSelected = function( e ){

    var data = e.target.getModel( ).firstDatarow( );
    while( data && data.type !== 'piechart' ){

        data = e.target.getModel( ).nextDatarow( );
    }
    data.data = e.target.getPieFromScatterData( e.data !== '[]' ?

        e.data :
        e.target.getModel( ).firstDatarow( ).data );

    e.target.renderPieChart( data );
    if( goog.DEBUG ){

        console.log( "handleSelected", e );
    }
};

/**
 * Handle users action.
 * @param {goog.events.Event} e
 */
zz.mvc.handleAction = function( e ){

    if( goog.DEBUG ){

        console.log( "handleAction", e );
    }
};

/**
 * Handle users change.
 * @param {goog.events.Event} e
 */
zz.mvc.handleChange = function( e ){

    if( goog.DEBUG ){

        console.log( "handleChange", e );
    }
    if( e.item.model.type === 'testHC' ){

        e.item.controller.testHC( e.item.model );

    }else if( e.item.model.type === 'testD3' ){

        e.item.controller.testD3( e.item.model );

    }else if( e.item.model.type === 'testSVG' ){

        e.item.controller.testGclSvg( e.item.model );

    }else if( e.item.model.type === 'testCanvas' ){

        e.item.controller.testGclCanvas( e.item.model );
    }
};

goog.exportSymbol( 'zz.mvc.bootstrap', zz.mvc.bootstrap );