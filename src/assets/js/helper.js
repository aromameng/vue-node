const isType = (type)=>{
    return function(obj) {
        return {}.toString.call(obj) == '[object ' + type + ']';
    }
}
export const isFunction = isType('Function');
export const isObject = isType('Object');
export const isArray = isType('Array');
export const isString = isType('String');
export const isNumber = isType('Number');
export const isUndefined = isType('Undefined');