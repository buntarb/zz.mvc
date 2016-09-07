goog.provide( 'zz.mvc.models.AppDataset' );
goog.provide( 'zz.mvc.models.AppDatarow' );

goog.require( 'zz.models.Datarow' );
goog.require( 'zz.models.Dataset' );
goog.require( 'zz.models.enums.FieldType' );

goog.require( 'zz.mvc.models.LayoutDataset' );

/**
 * @param {!zz.models.Dataset} dataset
 * @param {?Array.<string>} opt_data
 * @extends {zz.models.Datarow}
 * @constructor
 */
zz.mvc.models.AppDatarow = function( dataset, opt_data ){

    /**
     * @type {string}
     */
    this.title = undefined;

    /**
     * @type {string}
     */
    this.version = undefined;

    /**
     * @type {string}
     */
    this.authors = undefined;

    /**
     * @type {string}
     */
    this.copyright = undefined;

    /**
     * @type {zz.mvc.models.LayoutDataset}
     */
    this.layout = undefined;

    /**
     * Call parent constructor.
     */
    zz.models.Datarow.call( this, dataset, opt_data );
};

goog.inherits( zz.mvc.models.AppDatarow, zz.models.Datarow );

/**
 * @param {goog.event.EventTarget=} opt_parent
 * @param {Array.<Array>=} opt_data
 * @extends {zz.models.Dataset}
 * @constructor
 */
zz.mvc.models.AppDataset = function( opt_parent, opt_data ){

    zz.models.Dataset.call( this, opt_parent, opt_data );
};
goog.inherits( zz.mvc.models.AppDataset, zz.models.Dataset );

/**
 * Current dataset row type.
 * @constructor
 * @overwrite
 * @type {zz.mvc.models.AppDatarow}
 */
zz.mvc.models.AppDataset.prototype.DatarowConstructor = zz.mvc.models.AppDatarow;

/**
 * Return zz.mvc.models.AppDatarow schema object.
 * @override
 * @returns {Object}
 */
zz.mvc.models.AppDataset.prototype.getDatarowSchema = function( ){

    return {

        title: {

            index: 0,
            type: zz.models.enums.FieldType.STRING,
            required:false
        },
        version: {

            index: 1,
            type: zz.models.enums.FieldType.STRING,
            required:false
        },
        authors: {

            index: 2,
            type: zz.models.enums.FieldType.STRING,
            required:false
        },
        copyright: {

            index: 3,
            type: zz.models.enums.FieldType.STRING,
            required:false
        },
        layout: {

            index: 4,
            type: zz.mvc.models.LayoutDataset,
            required:false
        }
    };
};