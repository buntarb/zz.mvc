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

goog.provide( 'zz.mvc.controllers.Application' );
goog.require( 'zz.environment.services.MVCRegistry' );
goog.require( 'zz.controllers.FEBase' );

/**
 * Application controller.
 * @param {zz.mvc.models.Layout} model
 * @param {zz.mvc.views.Layout} view
 * @param opt_dom
 * @extends {zz.controllers.FEBase}
 * @constructor
 */
zz.mvc.controllers.Application = function( model, view, opt_dom ){

    goog.base( this, model, view, opt_dom );
};
goog.inherits( zz.mvc.controllers.Application, zz.controllers.FEBase );
zz.environment.services.MVCRegistry.setController( 'application', zz.mvc.controllers.Application );

/**
 * @override
 */
zz.mvc.controllers.Application.prototype.setupListenersInternal = function( ){

    // Add event handlers here...
    this.getHandler( ).listen( this, zz.controllers.enums.EventType.ENTER, function( e ){

        console.log( e );
    } );
    this.getHandler( ).listen( this, zz.controllers.enums.EventType.LEAVE, function( e ){

        console.log( e );
    } );
    this.getHandler( ).listen( this, zz.controllers.enums.EventType.ACTION, function( e ){

        console.log( e );
    } );
    this.getHandler( ).listen( this, zz.controllers.enums.EventType.INPUT, function( e ){

        console.log( e );
        console.log( e.oldValue );
        console.log( e.newValue );
    } );
    this.getHandler( ).listen( this, zz.controllers.enums.EventType.FOCUS, function( e ){

        console.log( e );
    } );
    this.getHandler( ).listen( this, zz.controllers.enums.EventType.BLUR, function( e ){

        console.log( e );
    } );
    this.getHandler( ).listen( this, zz.controllers.enums.EventType.KEY, function( e ){

        console.log( e );
    } );
};

/**
 * @override
 */
zz.mvc.controllers.Application.prototype.setupModelInternal = function( ){

    // Load data.
    this.getModel( ).createLast( [ 'Test application', '0.0.1', 'Good guys', 'Copyright info', '', false, true ] );

    var layoutModel = window['layoutModel'] =this.getModel( ).lastDatarow( ).layout;
    layoutModel.createLast( [ '100px', '100px' ] );

    var viewModel = layoutModel.lastDatarow( ).views;
    viewModel.createLast( [ 'Title here!' ] );
};