/**
 * The SafeArray creates an object which sort of acts like an array, with the specific
 * purpose to prevent 'cannot read property X of undefined' errors. Common array functions
 * are available in the returned object. Some of these functions do have a specific usage.
 *
 * Internally, the value of the latest action will be cached. A function will always perform its action on the cached value.
 * Example: if you supply an array and perform a .find with a property specified (see below), the value will overwrite the
 * internally cached array. Any next actions will be performed on the new value instead of the original array.
 *
 * find: .find(v => v === X, 'property'). The 'property' will replace the value on which the .find() was performed.
 * filter: .filter(v => v === X, 'property'). The 'property' will replace the value on which the .filter() was performed.
 * forEach: .forEach(v => v.property = true). Acts like a regular .forEach().
 * pick: .pick('property'). Tries to grab the property of the current cached value.
 * set: .set('property', value). Sets the value of the specified property.
 * get: .get() or .get('property'). Returns the cached value or a property of the cached value.
 * getOrDefault: .getOrDefault('property', defaultValue). Returns a property of the cached value, or returns the default value when null.
 *
 * Example found at https://stackoverflow.com/a/5370569
 *
 * @param arr The array which serves as the starting point for the SafeArray.
 * @returns {{find, filter, forEach, pick, set, get, getOrDefault}} An object with the following
 * functions: find, filter, forEach, pick, set, get, getOrDefault
 */
export const safeArray = (arr) => {
    let value = arr;

    return {
        find: function (func, key = null) {
            if (value !== undefined) value = value.find(v => func(v));
            return this.pick(key);
        },
        filter: function (func, key = null) {
            if (value !== undefined) value = value.filter(v => func(v));
            return this.pick(key);
        },
        forEach: function (func) {
            if (value !== undefined) value.forEach(v => func(v))
            return this;
        },
        pick: function (key) {
            if (value !== undefined && (key !== null && key !== undefined)) value = value[String(key)]
            return this;
        },
        set: function (key, val) {
            if (value !== undefined) {
                value[String(key)] = val;
            }
            return this;
        },
        get: function (key = null) {
            if (value === null || value === undefined) {
                return undefined;
            }
            if (key !== null && key !== undefined) {
                return value[String(key)];
            }
            return value;
        },
        getOrDefault: function (key, def = null) {
            if (value === null || value === undefined) {
                return (def !== null && def !== undefined) ? def : undefined;
            }
            const v = value[String(key)];
            return (v !== undefined && v !== null) ? value[String(key)] : def;
        }
    };
};
