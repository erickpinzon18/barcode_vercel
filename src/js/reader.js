let scanned = false;
window.onload = $("#label_detenido").hide();

$('#nav_reader').addClass('active');

document.addEventListener("DOMContentLoaded", () => {
	Quagga.init(
		{
			inputStream: {
				constraints: {
					width: 1920,
					height: 1080,
				},
				name: "Live",
				type: "LiveStream",
				target: document.querySelector("#contenedor"), // Pasar el elemento del DOM
			},
			decoder: {
				readers: ["ean_reader"],
			},
		},
		function (err) {
			if (err) {
				$("#modal_error").html("Error al iniciar la cámara");
				$("#modal_error_body").html(
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
		if (!scanned) barcodeRead(data.codeResult.code);
	});

	Quagga.onProcessed(function (result) {
		var drawingCtx = Quagga.canvas.ctx.overlay,
			drawingCanvas = Quagga.canvas.dom.overlay;

		if (result) {
			if (result.boxes) {
				drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
				result.boxes.filter(function (box) {
					return box !== result.box;
				}).forEach(function (box) {
					Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
				});
			}

			if (result.box) {
				Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
			}

			if (result.codeResult && result.codeResult.code) {
				Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
			}
		}
	});
});

function barcodeRead(barcode) {
    var audio = new Audio('/sounds/beep.mp3');
    audio.play();
	$("#label_detenido").show();
	$("#label_leyendo").hide();
	$("#barcode").val(barcode);
	$("#barcode").prop("readonly", true);
	$("#etiqueta").trigger("focus");
    scanned = true;
}

function editarProducto(barcode) {
	$("#barcode_edit").val(barcode);
	$("#etiqueta_edit").val($(`#etiqueta_n${barcode}`).text());
	$("#cantidad_edit").val($(`#cantidad_n${barcode}`).text());
	$("#modalEditar").modal("show");
}

function eliminarProducto(barcode) {
    $("#barcode_delete").val(barcode);
	$("#etiqueta_delete").val($(`#etiqueta_n${barcode}`).text());
	$("#cantidad_delete").val($(`#cantidad_n${barcode}`).text());
	$("#modalEliminar").modal("show");
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

$("#btn_add_edit").on("click", function (event) {
	event.preventDefault();
	$("#cantidad_edit").val(parseInt($("#cantidad_edit").val()) + 1);
});

$("#btn_substract_edit").on("click", function (event) {
	event.preventDefault();
	if ($("#cantidad_edit").val() > 1) {
		$("#cantidad_edit").val(parseInt($("#cantidad_edit").val()) - 1);
	}
});

$("#btn_reset").on("click", function (event) {
	Quagga.start();
	$("#label_detenido").hide();
	$("#label_leyendo").show();
	$("#barcode").prop("readonly", false);
    scanned = false;
});
