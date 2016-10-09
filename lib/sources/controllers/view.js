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

goog.provide( 'zz.mvc.controllers.View' );
goog.require( 'zz.environment.services.MVCTree' );
goog.require( 'zz.controllers.FEBase' );
goog.require( 'zz.controllers.enums.EventType' );

/**
 * Views controller.
 * @param {zz.mvc.models.Layout} model
 * @param {zz.mvc.views.Layout} view
 * @param opt_dom
 * @constructor
 */
zz.mvc.controllers.View = function( model, view, opt_dom ){

    goog.base( this, model, view, opt_dom );
};
goog.inherits( zz.mvc.controllers.View, zz.controllers.FEBase );
zz.environment.services.MVCTree.registry.setController( 'view', zz.mvc.controllers.View );