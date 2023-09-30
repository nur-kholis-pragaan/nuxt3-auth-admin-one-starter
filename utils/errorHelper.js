/**
 * 
 * @param {*} error 
 */
export const a = async (error) => {
}

/**
 * get 422 erray array
 * 
 * @param {*} error 
 * @returns 
 */
export function get422Error(error) {
	console.log('get error');
	var result = [];
	console.log(error.value.statusCode);
	console.log(error.value.data);
	if (error.value.statusCode == 422) {
		result = error.value.data.errors;
	}
	console.log(result);
	return result;
}