let readed = false;
import Producto from "./functions/Producto.js";

const producto = new Producto();

window.onload = $("#label_detenido").hide();

document.addEventListener("DOMContentLoaded", () => {
	const $resultados = document.querySelector("#result");
	Quagga.init(
		{
			inputStream: {
				constraints: {
					width: 1920,
					height: 1080,
				},
				name: "Live",
				type: "LiveStream",
				target: document.querySelector("#container"), // Pasar el elemento del DOM
			},
			decoder: {
				readers: ["ean_reader"],
			},
		},
		function (err) {
			if (err) {
				$("#modal_error").html("Error al iniciar la cámara");
				$("#modal_body").html(
					"<p>Ha ocurrido un error al iniciar la cámara</p><br><p>Por favor, asegurese de dar permisos y recargue la página</p>"
				);
				$("#modalError").modal("show");
				console.log(err);
				return;
			}
			console.log("Iniciado correctamente");
			Quagga.start();
		}
	);

	Quagga.onDetected((data) => {
		barcodeRead(data.codeResult.code);
	});
});

function barcodeRead(barcode) {
	$("#label_detenido").show();
	$("#label_leyendo").hide();
	$("#barcode").val(barcode);
	$("#barcode").prop("readonly", true);
	$("#etiqueta").trigger("focus");
}

function editarProducto(barcode) {
    producto.editarProducto(barcode);
}

$("#btn_add").on("click", function (event) {
	event.preventDefault();
	$("#cantidad").val(parseInt($("#cantidad").val()) + 1);
});

$("#btn_substract").on("click", function (event) {
	event.preventDefault();
	if ($("#cantidad").val() > 1) {
		$("#cantidad").val(parseInt($("#cantidad").val()) - 1);
	}
});

$("#btn_reset").on("click", function (event) {
	Quagga.start();
	$("#label_detenido").hide();
	$("#label_leyendo").show();
	$("#barcode").prop("readonly", false);
});

// $("#formNuevoProducto").submit(async function (event) {
// 	event.preventDefault();



// 	const producto = new Producto();

// 	producto.registrarProducto({
// 		barcode: $("#barcode").val(),
// 		etiqueta: $("#etiqueta").val(),
// 		cantidad: $("#cantidad").val(),
// 	});
// });
