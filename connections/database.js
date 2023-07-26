import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

/**
 * Instancia de Sequelize para la conexión a la base de datos.
 * @type {Sequelize}
 */
const sequelize = new Sequelize(
	process.env.MYSQL_ADDON_DB,
	process.env.MYSQL_ADDON_USER,
	process.env.MYSQL_ADDON_PASSWORD,
	{
		host: process.env.MYSQL_ADDON_HOST,
		port: parseInt(process.env.MYSQL_ADDON_PORT),
		dialect: "mysql",
		logging: false, // Establecer a false para desactivar los mensajes de sequelize
	}
);

/**
 * Sincroniza los modelos con la base de datos.
 * @returns {Promise} Una promesa que se resuelve una vez que se ha completado la sincronización.
 */
sequelize
	.sync({ force: false })
	.then(() => {
		console.info("Connected to MYSQL");
	})
	.catch((e) => {
		console.error(`Error: ${e}`);
	});

export default sequelize;
