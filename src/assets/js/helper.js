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

// url拼接
export const parse = function(path,params){
    if (path.charAt(path.length - 1) === '/') path = path.substr(0, path.length - 1)
    if (isString(params)) return path + '/' + params
    if (isNumber(params)) return path + '/' + params
    if (isObject(params)) {
      if (/:[a-zA-Z]+/.test(path)) {
        for (var key in params) {
          path = path.replace(new RegExp(':' + key, 'g'), params[key])
        }
      } else {
        var search = '?'
        if (path.indexOf('?') > -1) {
          search = '&'
        }
        var counter = 0
        for (var key in params) {
          if (counter) search += '&'
          search += key + '=' + params[key]
          counter++
        }
        return path + search
      }
    }
    return path
  }