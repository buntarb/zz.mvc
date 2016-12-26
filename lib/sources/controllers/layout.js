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

goog.provide( 'zz.mvc.controllers.Layout' );
goog.require( 'zz.mvc.models.Layout' );
goog.require( 'zz.mvc.views.Layout' );
goog.require( 'zz.app.controllers.FELayout' );
goog.require( 'zz.environment.services.MVCRegistry' );

/**
 * Layout controller.
 * @extends {zz.app.controllers.FELayout}
 */
zz.mvc.controllers.Layout = class extends zz.app.controllers.FELayout{

    constructor( ){

        super(
            new zz.mvc.models.Layout( ),
            zz.mvc.views.Layout.getInstance( ) );
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
    .setController( 'layout', zz.mvc.controllers.Layout );