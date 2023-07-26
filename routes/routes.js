import express from "express";
import Producto from "../models/productoModel.js";

const routes = express.Router();

/**
 * STATUS CODES
 * 400: Producto ya existe
 * 201: Producto creado
 * 500: Error en el servidor
 */

// Ruta principal
routes.get("/", async (req, res) => {
	try {
		// Obtener todos los productos de la base de datos
		const productos = await Producto.findAll();
		// Renderizar la vista index.ejs y pasarle los productos
		res.render("index.ejs", { productos, messages: req.session.messages });
	} catch (error) {
		console.log(error);
		// Retornar un error en caso de que no se puedan obtener los productos
		res.status(500).json({ message: "Error al obtener los productos" });
	}
});

routes.get('/reader', async (req, res) => {
    try {
		// Obtener todos los productos de la base de datos
		const productos = await Producto.findAll();
		// Renderizar la vista index.ejs y pasarle los productos
		res.render("reader.ejs", { productos, messages: req.session.messages });
	} catch (error) {
		console.log(error);
		// Retornar un error en caso de que no se puedan obtener los productos
		res.status(500).json({ message: "Error al obtener los productos" });
	}
});

// Ruta para registrar un producto
routes.post("/registrarProducto", async (req, res) => {
	try {
		// Obtener los datos del formulario
		const { barcode, etiqueta, cantidad } = req.body;
        if (!barcode || !etiqueta || !cantidad) {
            req.session.messages = { message: "Por favor, llene todos los campos" };
		    res.redirect("/");
            return;
        }
		// Validar que el producto no exista
		const existBarcode = await Producto.findOne({ barcode });
		// Si el producto existe, retornar un error
		if (existBarcode) {
            req.session.messages = { message: "El producto ya existe", producto: existBarcode };
    		res.redirect("/");
            return;
		}
		// Si el producto no existe, crearlo
		const producto = new Producto({ codigo: barcode, etiqueta, cantidad });
		// Guardar el producto en la base de datos
		const productoCreado = await producto.save();
		// Retornar el producto creado
		res.redirect("/");
	} catch (error) {
		console.log(error);
		// Retornar un error en caso de que no se pueda crear el producto
        req.session.messages = { message: "Error al crear el producto" };
		res.redirect("/");
	}
});

export default routes;
