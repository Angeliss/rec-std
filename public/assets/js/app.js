function runToast(mode) {
	var toast = Metro.toast.create;
	switch (mode) {
		case 'error': toast("Echèc de l'opération", null, 5000, "bg-red fg-white"); break;
		case 'success': toast("Opération réussi", null, 5000, "bg-green fg-white"); break;
		default: toast("This is default toast");
	}
}

function runInfo(mode, message) {
	// let info = Metro.infobox.create();
	switch (mode) {
		case 'error':
			// info.setType('alert')
			// info.setContent(message)
			// info.open()
			Metro.infobox.create(message, "alert")
			break;
		case 'info':
			info.setType('info')
			info.setContent(message)
			info.open()
		break
	
		default:
			break;
	}
}