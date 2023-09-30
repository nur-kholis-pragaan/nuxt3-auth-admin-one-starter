/**
 * 
 * @param {String} permissionName 
 * @returns 
 */
export const hasPermission = async (permissionName) => {
	const userPermissions = await useCookie('permissions');
	return userPermissions.value.includes(permissionName);
}