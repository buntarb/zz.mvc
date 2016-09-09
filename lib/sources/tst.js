goog.provide( 'zz.mvc.models.Test' );


/**
* @constructor
*/
zz.mvc.models.Test = function( ){

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
};
zz.mvc.models.Test.prototype.test = function () {
    
}