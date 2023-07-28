$("#contrasena2").on("keyup", function () {
	// Mostrar el mensaje y cambiar la clase de bootstrap
	if ($("#contrasena1").val() == $("#contrasena2").val()) {
		$("#message")
			.html("Las contraseñas coinciden")
			.addClass("text-success")
			.removeClass("text-danger");
		$("#btn_register").prop("disabled", false);
	} else {
		$("#message")
			.html("Las contraseñas no coinciden")
			.addClass("text-danger")
			.removeClass("text-success");
		$("#btn_register").prop("disabled", true);
	}
});

$("#contrasena1").on("keyup", function () {
	// Mostrar el mensaje y cambiar la clase de bootstrap
	if ($("#contrasena1").val() == $("#contrasena2").val()) {
		$("#message")
			.html("Las contraseñas coinciden")
			.addClass("text-success")
			.removeClass("text-danger");
		$("#btn_register").prop("disabled", false);
	} else {
		$("#message")
			.html("Las contraseñas no coinciden")
			.addClass("text-danger")
			.removeClass("text-success");
		$("#btn_register").prop("disabled", true);
	}
});
