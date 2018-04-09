
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

export default {
	mergeData,
	hasOwn,
	isPlainObject
}