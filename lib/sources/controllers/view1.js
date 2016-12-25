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

goog.provide( 'zz.mvc.controllers.View1' );

goog.require( 'zz.environment.services.MVCRegistry' );
goog.require( 'zz.controllers.FEBase' );

goog.require( 'zz.mvc.models.View' );
goog.require( 'zz.mvc.views.View1' );

/**
 * Views controller.
 * @extends {zz.controllers.FEBase}
 * @constructor
 */
zz.mvc.controllers.View1 = function( ){

    goog.base(
        this,
        new zz.mvc.models.View( ),
        zz.mvc.views.View1.getInstance( ) );
};

goog.inherits(
    zz.mvc.controllers.View1,
    zz.controllers.FEBase );

zz.environment.services.MVCRegistry
    .setController(
        'view',
        zz.mvc.controllers.View1 );

/**
 * @override
 */
zz.mvc.controllers.View1.prototype.setupListenersInternal = function( ){ };

/**
 * @override
 */
zz.mvc.controllers.View1.prototype.setupModelInternal = function( ){

    this.getModel( ).createLast( );
};

/**
 * @override
 */
zz.mvc.controllers.View1.prototype.bootstrap = function( ){ };