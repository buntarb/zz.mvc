goog.provide( 'zz.mvc.models.Dataset' );
goog.provide( 'zz.mvc.models.Datarow' );

goog.require( 'zz.models.Datarow' );
goog.require( 'zz.models.Dataset' );
goog.require( 'zz.models.enums.FieldType' );

/**
 * @param {!zz.models.Dataset} dataset
 * @param {?Array.<string>} opt_data
 * @extends {zz.models.Datarow}
 * @constructor
 */
zz.mvc.models.Datarow = function( dataset, opt_data ){

    /**
     * @type {number}
     */
    this.id = undefined;

    /**
     * @type {string}
     */
    this.test = undefined;

    /**
     * Call parent constructor.
     */
    zz.models.Datarow.call( this, dataset, opt_data );
};

goog.inherits( zz.mvc.models.Datarow, zz.models.Datarow );

/**
 * @param {goog.event.EventTarget=} opt_parent
 * @param {Array.<Array>=} opt_data
 * @extends {zz.models.Dataset}
 * @constructor
 */
zz.mvc.models.Dataset = function( opt_parent, opt_data ){

    zz.models.Dataset.call( this, opt_parent, opt_data );
};
goog.inherits( zz.mvc.models.Dataset, zz.models.Dataset );

/**
 * Current dataset row type.
 * @constructor
 * @overwrite
 * @type {zz.mvc.models.Datarow}
 */
zz.mvc.models.Dataset.prototype.DatarowConstructor = zz.mvc.models.Datarow;

/**
 * Return zz.mvc.models.Datarow schema object.
 * @override
 * @returns {Object}
 */
zz.mvc.models.Dataset.prototype.getDatarowSchema = function( ){

    return {

        id: {

            index: 0,
            type: zz.models.enums.FieldType.NUMBER,
            required:false
        },
        test: {

            index: 1,
            type: zz.models.enums.FieldType.STRING,
            required:false
        }
    };
};