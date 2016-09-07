goog.provide( 'zz.mvc.models.ViewDataset' );
goog.provide( 'zz.mvc.models.ViewDatarow' );

goog.require( 'zz.models.Datarow' );
goog.require( 'zz.models.Dataset' );
goog.require( 'zz.models.enums.FieldType' );
goog.require( 'zz.models.WidgetDataset' );

/**
 * @param {!zz.models.Dataset} dataset
 * @param {?Array.<string>} opt_data
 * @extends {zz.models.Datarow}
 * @constructor
 */
zz.mvc.models.ViewDatarow = function( dataset, opt_data ){

    /**
     * @type {string}
     */
    this.title = undefined;

    /**
     * @type {zz.models.WidgetDataset}
     */
    this.widgets = undefined;

    /**
     * Call parent constructor.
     */
    zz.models.Datarow.call( this, dataset, opt_data );
};

goog.inherits( zz.mvc.models.ViewDatarow, zz.models.Datarow );

/**
 * @param {goog.event.EventTarget=} opt_parent
 * @param {Array.<Array>=} opt_data
 * @extends {zz.models.Dataset}
 * @constructor
 */
zz.mvc.models.ViewDataset = function( opt_parent, opt_data ){

    zz.models.Dataset.call( this, opt_parent, opt_data );
};
goog.inherits( zz.mvc.models.ViewDataset, zz.models.Dataset );

/**
 * Current dataset row type.
 * @constructor
 * @overwrite
 * @type {zz.mvc.models.ViewDatarow}
 */
zz.mvc.models.ViewDataset.prototype.DatarowConstructor = zz.mvc.models.ViewDatarow;

/**
 * Return zz.mvc.models.ViewDatarow schema object.
 * @override
 * @returns {Object}
 */
zz.mvc.models.ViewDataset.prototype.getDatarowSchema = function( ){

    return {

        title: {

            index: 0,
            type: zz.models.enums.FieldType.STRING,
            required:false
        },
        widgets: {

            index: 1,
            type: zz.models.WidgetDataset,
            required:false
        }
    };
};