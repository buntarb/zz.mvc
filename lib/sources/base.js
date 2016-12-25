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

goog.require( 'zz.app.services.FEViewRouter' );

goog.require( 'zz.mvc.controllers.Application' );
goog.require( 'zz.mvc.controllers.Layout' );
goog.require( 'zz.mvc.controllers.View' );

goog.require( 'zz.mvc.views.Application' );
goog.require( 'zz.mvc.views.Layout' );
goog.require( 'zz.mvc.views.View' );

/**
 * Bootstrap module method.
 */
zz.mvc.bootstrap = function( ){

    zz.app.services.FEViewRouter
        .getInstance( )
        .when( '', zz.mvc.controllers.Application )
        .when( '/', zz.mvc.controllers.Application )
        .when( '/1', zz.mvc.controllers.Application )
        .when( '/2', zz.mvc.controllers.Application )
        .otherwise( '' )
        .bootstrap( );
};

goog.exportSymbol( 'zz.mvc.bootstrap', zz.mvc.bootstrap );