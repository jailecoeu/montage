/*global require, exports */

var Montage = require("core/core").Montage;

/**
 * A component can expose internal components to external usage using aliases.
 * For example, a [Repetition]{@link Repetition} exposes
 * `@repetition:iteration` and a table might expose the current cell as
 * `@table:cell`, aliasing the internal `@cells:iteration`.
 *
 * An alias declaration in a component sheet (serialization) looks like:
 *
 *     {
 *         ":cell": {
 *             "alias": "repetition:iteration"
 *         }
 *     }
 *
 * An `Alias` is a representation of one of these declarations.
 * An alias can only point to another template property and can be optionally
 * followed by a path.
 *
 * @class Alias
 * @classdesc Models a label alias in a component sheet (serialization).
 * @extends Montage
 */
exports.Alias = Montage.specialize({ /** @lends Alias# */

    _value: {
        value: null
    },

    _aliasRegExp: {
        // $1: component name
        // $2: property name
        // $3: path (starts with a dot or colon)
        // alias = @$1:$2$3
        value: /@([_a-zA-Z$][0-9_a-zA-Z$]*):([_a-zA-Z$][0-9_a-zA-Z$]*)([\.:].*$)?/
    },

    /**
     * The alias string as found in the serialization.
     *
     * @name Alias#value
     * @type {string}
     */
    value: {
        get: function() {
            return this._value;
        },

        set: function(value) {
            var split = this._aliasRegExp.exec(value);

            if (!split) {
                throw new Error("Invalid alias syntax: " + value);
            }

            this._value = value;

            this._componentName = split[1];
            this._propertyName = split[2];
            this._path = split[3];
        }
    },

    _componentName: {
        value: null
    },

    /**
     * The component name part of the alias, this is the component where the
     * template property is located.
     * Derived from the alias.
     *
     * @name Alias#componentName
     * @type {string}
     * @readonly
     */
    componentName: {
        get: function() {
            return this._componentName;
        }
    },

    _propertyName: {
        value: null
    },

    /**
     * The property name of the template property. It's up to the component
     * template to define this property.
     * Derived from the alias.
     *
     * @name Alias#propertyName
     * @type {string}
     * @readonly
     */
    propertyName: {
        get: function() {
            return this._propertyName;
        }
    },

    _path: {
        value: null
    },

    /**
     * The path that follows the property name reference.
     * Derived from the alias.
     *
     * @name Alias#path
     * @type {string}
     * @readonly
     */
    path: {
        get: function() {
            return this._path;
        }
    },

    init: {
        value: function(value) {
            this.value = value;

            return this;
        }
    }
});
