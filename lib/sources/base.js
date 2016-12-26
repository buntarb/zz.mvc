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
goog.require( 'zz.mvc.controllers.Application' );
goog.require( 'zz.mvc.models.Application' );
goog.require( 'zz.mvc.views.Application' );

/**
 * Bootstrap module method.
 */
zz.mvc.bootstrap = function( ){

    window.controller = new zz.mvc.controllers.Application(
        new zz.mvc.models.Application( ),
        zz.mvc.views.Application.getInstance( ) );
};

goog.exportSymbol( 'zz.mvc.bootstrap', zz.mvc.bootstrap );