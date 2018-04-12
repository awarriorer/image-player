
function mergeData(to, from){
	if (!from) return to

	let key, toVal, fromVal
	const keys = Object.keys(from)
  
	for (let i = 0; i < keys.length; i++) {
		key   = keys[i]
		toVal = to[key]
		fromVal = from[key]
		
		if (!hasOwn(to, key)) {
			to[key] = fromVal
		} else 
		if (isPlainObject(toVal) && isPlainObject(fromVal)) {
			mergeData(toVal, fromVal)
		}
	}
	
  return to
}

const hasOwnProperty = Object.prototype.hasOwnProperty

function hasOwn (obj, key){

	return hasOwnProperty.call(obj, key)
}

const _toString = Object.prototype.toString

function isPlainObject (obj){
  return _toString.call(obj) === '[object Object]'
}

function isFunction(functionToCheck) {

	return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

function isNumber(str) {

	return !isNaN(str);
}

function doChain(filters, args, next) {
    let i   = 0;

    let doFilter = function() {
        if (i < filters.length) {
            filters[i++](args, doFilter);
        } else {
            next && next(args);
        }
    };

    doFilter(args);
}

function getRequestAnimationFrame() {
    return window.requestAnimationFrame
		|| window.mozRequestAnimationFrame
		|| window.webkitRequestAnimationFrame
		|| window.msRequestAnimationFrame
		|| window.oRequestAnimationFrame
		|| function(callback) {setTimeout(callback, 1000 / 60)};
}

function getCancelAnimationFrame () {
    return window.cancelAnimationFrame 
		|| window.mozCancelAnimationFrame
		|| window.webkitCancelAnimationFrame
		|| window.msCancelAnimationFrame
		|| window.oCancelAnimationFrame
		|| function(id) {clearTimeout(id)};
}

export default {
	mergeData,
	hasOwn,
	isPlainObject,
	isFunction,
	isNumber,
	doChain,
	getRequestAnimationFrame,
	getCancelAnimationFrame
}