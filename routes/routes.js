import express from "express";
import Producto from "../models/productoModel.js";
import Usuario from "../models/usuarioModel.js";

const routes = express.Router();

/**
 * STATUS CODES
 * 400: Producto ya existe
 * 201: Producto creado
 * 500: Error en el servidor
 */

// Ruta para el login
routes.get("/", (req, res) => {
    res.render("login.ejs", { messages: req.session.messages });
});

// Ruta para cerrar sesion
routes.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

// Ruta principal
routes.get("/reader", async (req, res) => {
	if (!req.session.user) {
        res.redirect("/");
        return;
    }
    try {
		// Obtener todos los productos de la base de datos
		const productos = await Producto.findAll();
		// Renderizar la vista index.ejs y pasarle los productos
		res.render("reader.ejs", { productos, messages: req.session.messages, usuario: req.session.user });
	} catch (error) {
		console.log(error);
		// Retornar un error en caso de que no se puedan obtener los productos
		res.status(500).json({ message: "Error al obtener los productos" });
	}
});

// Ruta para login
routes.post("/login", async (req, res) => {
    try {
        // Obtener los datos del formulario
        const { usuario, contrasena } = req.body;
        if (!usuario || !contrasena) {
            req.session.messages = {
                message: "Por favor, llene todos los campos",
            };
            res.redirect("/");
            return;
        }
        // Validar que el usuario exista
        const existUser = await Usuario.findOne({
            where: { usuario },
        });
        // Si el usuario no existe, retornar un error
        if (!existUser) {
            req.session.messages = {
                message: "El usuario no existe",
            };
            res.redirect("/");
            return;
        }
        // Si el usuario existe, validar la contraseña
        if (existUser.contrasena !== contrasena) {
            req.session.messages = {
                message: "Contraseña incorrecta",
            };
            res.redirect("/");
            return;
        }
        // Si la contraseña es correcta, iniciar sesión
        req.session.user = existUser;
        // Limpiar los mensajes
        req.session.messages = {
            message: "",
        };
        // Retornar el usuario
        res.redirect("/reader");
    } catch (error) {
        console.log(error);
        // Retornar un error en caso de que no se pueda iniciar sesión
        req.session.messages = { message: "Error al iniciar sesión" };
        res.redirect("/");
    }
});

// Ruta para registrar usuario
routes.post("/registrarUsuario", async (req, res) => {
	try {
		// Obtener los datos del formulario
		const { nombre, usuario, contrasena } = req.body;
		console.log(req.body);
		if (!nombre || !usuario || !contrasena) {
			req.session.messages = {
				message: "Por favor, llene todos los campos",
			};
			res.redirect("/");
			return;
		}
		// Validar que el usuario no exista
		const existUser = await Usuario.findOne({
			where: { usuario },
		});
		console.log(existUser);
		// Si el usuario existe, retornar un error
		if (existUser) {
			req.session.messages = {
				message: "El usuario ya existe",
			};
			res.redirect("/");
			return;
		}
		// Si el usuario no existe, crearlo
		const newUsuario = new Usuario({
			nombre,
			usuario,
			contrasena,
			status: true,
		});
		// Guardar el usuario en la base de datos
		const usuarioCreado = await newUsuario.save();
		// Retornar el usuario creado
		res.redirect("/");
	} catch (error) {
		console.log(error);
		// Retornar un error en caso de que no se pueda crear el usuario
		req.session.messages = { message: "Error al crear el usuario" };
		res.redirect("/");
	}
});

// Ruta para registrar un producto
routes.post("/registrarProducto", async (req, res) => {
	try {
		// Obtener los datos del formulario
		const { barcode, etiqueta, cantidad, usuario } = req.body;
		if (!barcode || !etiqueta || !cantidad || !usuario ) {
			req.session.messages = {
				message: "Por favor, llene todos los campos",
			};
			res.redirect("/reader");
			return;
		}
		// Validar que el producto no exista
		const existBarcode = await Producto.findOne({
			where: { codigo: barcode },
		});
		// Si el producto existe, retornar un error
		if (existBarcode) {
			req.session.messages = {
				message: "El producto ya existe",
				producto: existBarcode,
			};
			res.redirect("/reader");
			return;
		}
		const fechaActual = new Date();
		const fechaFormateada = fechaActual.toISOString().slice(0, -6);
		console.log(fechaFormateada);

		// Si el producto no existe, crearlo
		const producto = new Producto({
			codigo: barcode,
			etiqueta,
			cantidad,
			fecha_cap: new Date(Date.now()).toISOString(),
			id_usuario: usuario,
		});
		// Guardar el producto en la base de datos
		const productoCreado = await producto.save();
		// Retornar el producto creado
		res.redirect("/reader");
	} catch (error) {
		console.log(error);
		// Retornar un error en caso de que no se pueda crear el producto
		req.session.messages = { message: "Error al crear el producto" };
		res.redirect("/reader");
	}
});

// Ruta para actualizar un producto
routes.post("/actualizarProducto", async (req, res) => {
	try {
		// Obtener los datos del formulario
		const { barcode, etiqueta, cantidad, usuario } = req.body;
		if (!barcode || !etiqueta || !cantidad || !usuario) {
			req.session.messages = {
				message: "Por favor, llene todos los campos",
			};
			res.redirect("/reader");
			return;
		}
		// Validar que el producto exista
		const existBarcode = await Producto.findOne({
			where: { codigo: barcode },
		});
		// Si el producto no existe, retornar un error
		if (!existBarcode) {
			req.session.messages = { message: "El producto no existe" };
			res.redirect("/reader");
			return;
		}
		// Si el producto existe, editarlo
		existBarcode.etiqueta = etiqueta;
		existBarcode.cantidad = cantidad;
        existBarcode.fecha_cap = new Date(Date.now()).toISOString();
        existBarcode.id_usuario = usuario;
		// Guardar el producto en la base de datos
		const productoEditado = await existBarcode.save();
		// Retornar el producto editado
		req.session.messages = {
			message: "Producto editado correctamente",
			producto: productoEditado,
		};
		res.redirect("/reader");
	} catch (error) {
		console.log(error);
		// Retornar un error en caso de que no se pueda editar el producto
		req.session.messages = { message: "Error al editar el producto" };
		res.redirect("/reader");
	}
});

// Ruta para eliminar un producto
routes.post("/eliminarProducto", async (req, res) => {
	try {
		// Obtener el código del producto a eliminar
		const { barcode } = req.body;
		// Validar que el producto exista
		const existBarcode = await Producto.findOne({
			where: { codigo: barcode },
		});
		// Si el producto no existe, retornar un error
		if (!existBarcode) {
			req.session.messages = { message: "El producto no existe" };
			res.redirect("/reader");
			return;
		}
		// Si el producto existe, eliminarlo
		await existBarcode.destroy();
		// Retornar el producto eliminado
		req.session.messages = {
			message: "Producto eliminado correctamente",
			producto: existBarcode,
		};
		res.redirect("/reader");
	} catch (error) {
		console.log(error);
		// Retornar un error en caso de que no se pueda eliminar el producto
		req.session.messages = { message: "Error al eliminar el producto" };
		res.redirect("/reader");
	}
});

export default routes;
