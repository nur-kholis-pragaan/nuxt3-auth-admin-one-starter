

export const useToast = (option) => {
	const { $swal } = useNuxtApp()
	$swal.fire({
		position: 'top-end',
		type: option.type ?? 'success',
		title: option.title ?? 'Success!',
		showConfirmButton: false,
		timer: 3000
	});
}