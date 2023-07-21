function runToast(mode) {
	var toast = Metro.toast.create;
	switch (mode) {
		case 'error': toast("Echèc de l'opération", null, 5000, "bg-red fg-white"); break;
		case 'success': toast("Opération réussi", null, 5000, "bg-green fg-white"); break;
		default: toast("This is default toast");
	}
}