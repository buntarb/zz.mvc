goog.provide( 'zz.mvc.models.LayoutDataset' );
goog.provide( 'zz.mvc.models.LayoutDatarow' );

goog.require( 'zz.models.Datarow' );
goog.require( 'zz.models.Dataset' );
goog.require( 'zz.models.enums.FieldType' );
goog.require( 'zz.mvc.models.ViewDataset' );
/**
 * @param {!zz.models.Dataset} dataset
 * @param {?Array.<string>} opt_data
 * @extends {zz.models.Datarow}
 * @constructor
 */
zz.mvc.models.LayoutDatarow = function( dataset, opt_data ){

    /**
     * @type {number}
     */
    this.width = undefined;

    /**
     * @type {number}
     */
    this.height = undefined;

    /**
     * @type {zz.mvc.models.ViewDataset}
     */
    this.views = undefined;

    /**
     * Call parent constructor.
     */
    zz.models.Datarow.call( this, dataset, opt_data );
};

goog.inherits( zz.mvc.models.LayoutDatarow, zz.models.Datarow );

/**
 * @param {goog.event.EventTarget=} opt_parent
 * @param {Array.<Array>=} opt_data
 * @extends {zz.models.Dataset}
 * @constructor
 */
zz.mvc.models.LayoutDataset = function( opt_parent, opt_data ){

    zz.models.Dataset.call( this, opt_parent, opt_data );
};
goog.inherits( zz.mvc.models.LayoutDataset, zz.models.Dataset );

/**
 * Current dataset row type.
 * @constructor
 * @overwrite
 * @type {zz.mvc.models.LayoutDatarow}
 */
zz.mvc.models.LayoutDataset.prototype.DatarowConstructor = zz.mvc.models.LayoutDatarow;

/**
 * Return zz.mvc.models.LayoutDatarow schema object.
 * @override
 * @returns {Object}
 */
zz.mvc.models.LayoutDataset.prototype.getDatarowSchema = function( ){

    return {

        width: {

            index: 0,
            type: zz.models.enums.FieldType.NUMBER,
            required:false
        },
        height: {

            index: 2,
            type: zz.models.enums.FieldType.NUMBER,
            required:false
        },
        views: {

            index: 1,
            type: zz.mvc.models.ViewDataset,
            required:false
        }
    };
};