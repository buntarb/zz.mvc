goog.provide( 'zz.mvc.models.WidgetDataset' );
goog.provide( 'zz.mvc.models.WidgetDatarow' );

goog.require( 'zz.models.Datarow' );
goog.require( 'zz.models.Dataset' );
goog.require( 'zz.models.enums.FieldType' );

/**
 * @param {!zz.models.Dataset} dataset
 * @param {?Array.<string>} opt_data
 * @extends {zz.models.Datarow}
 * @constructor
 */
zz.mvc.models.WidgetDatarow = function( dataset, opt_data ){

    /**
     * @type {string}
     */
    this.title = undefined;

    /**
     * Call parent constructor.
     */
    zz.models.Datarow.call( this, dataset, opt_data );
};

goog.inherits( zz.mvc.models.WidgetDatarow, zz.models.Datarow );

/**
 * @param {goog.event.EventTarget=} opt_parent
 * @param {Array.<Array>=} opt_data
 * @extends {zz.models.Dataset}
 * @constructor
 */
zz.mvc.models.WidgetDataset = function( opt_parent, opt_data ){

    zz.models.Dataset.call( this, opt_parent, opt_data );
};
goog.inherits( zz.mvc.models.WidgetDataset, zz.models.Dataset );

/**
 * Current dataset row type.
 * @constructor
 * @overwrite
 * @type {zz.mvc.models.WidgetDatarow}
 */
zz.mvc.models.WidgetDataset.prototype.DatarowConstructor = zz.mvc.models.WidgetDatarow;

/**
 * Return zz.mvc.models.WidgetDatarow schema object.
 * @override
 * @returns {Object}
 */
zz.mvc.models.WidgetDataset.prototype.getDatarowSchema = function( ){

    return {

        title: {

            index: 0,
            type: zz.models.enums.FieldType.STRING,
            required:false
        }
    };
};