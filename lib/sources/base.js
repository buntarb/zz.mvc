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
 * @author buntarb@gmail.com (Artem Lytvynov)
 * @fileoverview Provide zz.mvc base object.
 */

goog.provide( 'zz.mvc' );
goog.require( 'goog.asserts' );
goog.require( 'zz.environment.services.RAM' );
goog.require( 'zz.views.FEBase' );
goog.require( 'zz.controllers.FEBase' );
goog.require( 'zz.ui.services.HighlightViewportAction' );
goog.require( 'zz.mvc.templates' );
goog.require( 'zz.mvc.services.Messages' );
goog.require( 'zz.mvc.controllers.Widget' );
goog.require( 'zz.mvc.models.Application' );
goog.require( 'zz.mvc.enums.EventType' );

/**
 * Bootstrap module method.
 */
zz.mvc.bootstrap = function( ){

    /**
     * Root application controller.
     * @type {zz.controllers.FEBase}
     */
    var appController = zz.mvc.construct( );
    appController.getHandler( ).listen(

        appController,
        goog.ui.Component.EventType.ACTION,
        zz.mvc.handleAction
    );
    appController.getHandler( ).listen(

        appController,
        goog.ui.Component.EventType.CHANGE,
        zz.mvc.handleChange
    );

    appController.getHandler( ).listen(

        appController,
        zz.mvc.enums.EventType.SELECTED,
        zz.mvc.handleSelected
    );
    zz.ui.services.HighlightViewportAction.getInstance( );
    window[ 'controller' ] = appController;
};

/**
 * Construct application and return root app controller.
 * @returns {zz.controllers.FEBase}
 */
zz.mvc.construct = function( ){

    var appModel = new zz.mvc.models.Application( );
    var appView = new zz.views.FEBase( zz.mvc.templates.appDataset, zz.mvc.templates.appDatarow );
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

    viewModel.createLast( [ 'Some dashboard name (untranslatable data).' ] );
    layoutController.addFieldController(

        layoutModel.firstDatarow( ),
        layoutModel.datafield.views,
        viewController );

    var widgetModel = viewModel.lastDatarow( ).widgets;
    var controller = new zz.mvc.controllers.Widget( widgetModel );
    var demoD3WidgetModel = widgetModel.createLast( );
    var scatterWidgetModel = widgetModel.createLast( );
    var chartWidgetModel = widgetModel.createLast( );
    controller

        .loadTestDataAsText( )
        .then( function( text ){

            scatterWidgetModel.title = zz.mvc.services.Messages.getInstance( ).getMessage( '1' );
            scatterWidgetModel.type = 'scatter';
            scatterWidgetModel.data = text;

            chartWidgetModel.title = zz.mvc.services.Messages.getInstance( ).getMessage( '2' );
            chartWidgetModel.type = 'piechart';
            chartWidgetModel.data = controller.getPieFromScatterData( text );

            demoD3WidgetModel.title = zz.mvc.services.Messages.getInstance( ).getMessage( '3' );
            demoD3WidgetModel.type = 'demoD3';
            demoD3WidgetModel.data = text;

            viewController.addFieldController(

                viewModel.firstDatarow( ),
                viewModel.datafield.widgets,
                controller );

            controller.instantiateWidget( scatterWidgetModel );
            controller.instantiateWidget( chartWidgetModel );
            controller.instantiateWidget( demoD3WidgetModel );
        } );
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
};

goog.exportSymbol( 'zz.mvc.bootstrap', zz.mvc.bootstrap );