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

goog.provide( 'zz.mvc.views.View' );
goog.require( 'zz.views.FEBase' );
goog.require( 'zz.mvc.templates' );

/**
 * Views view.
 * @constructor
 */
zz.mvc.views.View = function( ){

    goog.base( this, zz.mvc.templates.view );
};
goog.inherits( zz.mvc.views.View, zz.views.FEBase );
goog.addSingletonGetter( zz.mvc.views.View );
zz.environment.services.MVCTree.registry.setView( 'view', zz.mvc.views.View );

