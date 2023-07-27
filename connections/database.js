import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

/**
 * Instancia de Sequelize para la conexión a la base de datos.
 * @type {Sequelize}
 */
const sequelize = new Sequelize(
	process.env.SQL_NAME,
	process.env.SQL_USER,
	process.env.SQL_PASS,
	{
		host: process.env.SQL_HOST,
		port: parseInt(process.env.SQL_PORT),
		dialect: "mssql",
		dialectOptions: {
			options: {
				encrypt: false, // Si tu servidor SQL Server necesita cifrado, establecer a true
			},
		},
		logging: false, // Establecer a false para desactivar los mensajes de sequelize
	}
);

/**
 * Sincroniza los modelos con la base de datos.
 * @returns {Promise} Una promesa que se resuelve una vez que se ha completado la sincronización.
 */
sequelize
	.sync()
	.then(() => {
		console.info("Connected to SQL SERVER");
	})
	.catch((e) => {
		console.error(`Error: ${e}`);
	});

export default sequelize;
