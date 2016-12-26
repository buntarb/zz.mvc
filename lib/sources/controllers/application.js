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
goog.require( 'zz.mvc.controllers.Layout' );
goog.require( 'zz.mvc.controllers.View' );
goog.require( 'zz.mvc.controllers.View1' );
goog.require( 'zz.app.services.FELayoutRouter' );
goog.require( 'zz.app.controllers.FELayoutRoot' );
goog.require( 'zz.environment.enums.EventType' );
goog.require( 'zz.environment.services.MVCRegistry' );


/**
 * Application controller.
 * @param {zz.mvc.models.Application} model
 * @param {zz.mvc.views.Application} view
 * @extends {zz.app.controllers.FELayoutRoot}
 */
zz.mvc.controllers.Application = class extends zz.app.controllers.FELayoutRoot{

    constructor( model, view ){

        super( model, view );
    }

    /**
     * @override
     */
    setupListenersInternal( ){

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
        this.getHandler( ).listen(
            zz.app.services.FELayoutRouter
                .getInstance( ),
            zz.environment.enums.EventType.ROUTED,
            function( e ){

                console.log( e );
            }
        )
    }

    /**
     * @override
     */
    setupModelInternal( ){

        this.getModel( ).createLast( );
    }

    /**
     * @override
     */
    bootstrap( ){

        zz.app.services.FELayoutRouter
            .getInstance( )
            .when( '', zz.mvc.controllers.Layout, zz.mvc.controllers.View )
            .when( '/', zz.mvc.controllers.Layout, zz.mvc.controllers.View )
            .when( '/1', zz.mvc.controllers.Layout, zz.mvc.controllers.View1 )
            .otherwise( '' )
            .bootstrap( );
    };
};
zz.environment.services.MVCRegistry
    .setController( 'application', zz.mvc.controllers.Application );