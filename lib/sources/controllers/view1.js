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
goog.require( 'zz.mvc.models.View' );
goog.require( 'zz.mvc.views.View1' );
goog.require( 'zz.app.controllers.FELayoutView' );
goog.require( 'zz.environment.services.MVCRegistry' );


/**
 * Views controller.
 * @extends {zz.app.controllers.FELayoutView}
 */
zz.mvc.controllers.View1 = class extends zz.app.controllers.FELayoutView{

    constructor( ){

        super(
            new zz.mvc.models.View( ),
            zz.mvc.views.View1.getInstance( ) );
    }

    /**
     * @override
     */
    setupListenersInternal( ){ };

    /**
     * @override
     */
    setupModelInternal( ){

        this.getModel( ).createLast( );
    };

    /**
     * @override
     */
    bootstrap( ){ };
};
zz.environment.services.MVCRegistry
    .setController( 'view1', zz.mvc.controllers.View1 );