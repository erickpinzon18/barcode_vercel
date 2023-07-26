export default class Producto {
	constructor() {}

	registrarProducto({ barcode, etiqueta, cantidad }) {
		console.log(barcode, etiqueta, cantidad);
		if (!barcode || !etiqueta || !cantidad) {
			alert("Por favor, llene todos los campos");
			return;
		}

		axios({
			method: "post",
			url: "/registrarProducto",
			data: {
				barcode,
				etiqueta,
				cantidad,
			},
		})
			.then((response) => {
				if (response.status === 201) {
					alert("Producto creado correctamente");
					window.location.href = "/";
				} else if (response.status === 400) {
					alert(
						response.data.message +
							JSON.stringify(response.data.producto)
					);
				} else if (response.status === 500) {
					alert("Error al crear el producto");
				}
			})
			.catch((error) => {
				console.log("Error en la petición: ", error);
			});

		// axios.post("/registrarProducto", {
		//     barcode,
		//     etiqueta,
		//     cantidad,
		// })
		// .then((response) => {
		//     if (response.status === 201) {
		//         alert("Producto creado correctamente");
		//         window.location.href = "/";
		//     } else if (response.status === 400) {
		//         alert(response.data.message + JSON.stringify(response.data.producto));
		//     } else if (response.status === 500) {
		//         alert("Error al crear el producto");
		//     }
		// })
		// .catch((error) => {
		//     console.log("Error en la petición: ", error);
		// });
	}

    editarProducto(barcode) {
        console.log(barcode);
    }

    eliminarProducto(barcode) {
        console.log(barcode);
    }
}
