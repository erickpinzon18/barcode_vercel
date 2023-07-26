/**
 * Alerta de Bootstrap
 * @param {string} msg - El mensaje a mostrar en la alerta.
 * @param {string} type - El tipo de alerta.
 * @example
 * bsAlert("This is a message", "info");
 */
const bsAlert = (msg, type) => {
	// Crear un elemento HTML
	const wrapper = document.createElement("div");
	// Establecer el contenido del elemento HTML
	wrapper.innerHTML = [
		`<div class="alert alert-${type} tk-dark-text alert-dismissible" role="alert" id="alert_navbar">`,
		`   <div>${msg}</div>`,
		'   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
		"</div>",
	].join("");
	// Agregar el elemento HTML al elemento con ID "div_alert"
	$("#div_alert").append(wrapper);
};

export default bsAlert;
