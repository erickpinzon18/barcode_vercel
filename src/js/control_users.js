$("#nav_users").addClass("active");

function editarUsuario(id) {
	$("#id_edit").val(id);
	$("#nombre_edit").val($(`#nombre_n${id}`).text());
	$("#usuario_edit").val($(`#usuario_n${id}`).text());
	$("#contrasena1_edit").val($(`#contrasena_n${id}`).text());
    $("#message")
			.html("Las contraseñas no coinciden")
			.addClass("text-danger")
			.removeClass("text-success");
		$("#btn_Editar").prop("disabled", true);
	$("#status_edit option[value='0']").attr(
		"selected",
		$(`#status_n${id}`).text() == "Deshabilitado"
	);
	$("#modalEditar").modal("show");
}

function eliminarUsuario(id) {
	$("#id_delete").val(id);
	$("#nombre_delete").val($(`#nombre_n${id}`).text());
	$("#usuario_delete").val($(`#usuario_n${id}`).text());
	$("#contrasena_delete").val($(`#contrasena_n${id}`).text());
	$("#status_delete option[value='0']").attr(
		"selected",
		$(`#status_n${id}`).text() == "Deshabilitado"
	);
	$("#modalEliminar").modal("show");
}

$("#contrasena2_edit").on("keyup", function () {
	// Mostrar el mensaje y cambiar la clase de bootstrap
	if ($("#contrasena1_edit").val() == $("#contrasena2_edit").val()) {
		$("#message")
			.html("Las contraseñas coinciden")
			.addClass("text-success")
			.removeClass("text-danger");
		$("#btn_Editar").prop("disabled", false);
	} else {
		$("#message")
			.html("Las contraseñas no coinciden")
			.addClass("text-danger")
			.removeClass("text-success");
		$("#btn_Editar").prop("disabled", true);
	}
});

$("#contrasena1_edit").on("keyup", function () {
	// Mostrar el mensaje y cambiar la clase de bootstrap
	if ($("#contrasena1_edit").val() == $("#contrasena2_edit").val()) {
		$("#message")
			.html("Las contraseñas coinciden")
			.addClass("text-success")
			.removeClass("text-danger");
		$("#btn_Editar").prop("disabled", false);
	} else {
		$("#message")
			.html("Las contraseñas no coinciden")
			.addClass("text-danger")
			.removeClass("text-success");
		$("#btn_Editar").prop("disabled", true);
	}
});