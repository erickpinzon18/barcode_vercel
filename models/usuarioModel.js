import { DataTypes } from "sequelize";
import sequelize from "../connections/database.js";

const Usuario = sequelize.define(
	"usuario",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
            autoIncrement: true,
		},
		nombre: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		usuario: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		contrasena: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		status: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
	},
	{
		tableName: "usuario", // Nombre real de la tabla en la base de datos
		timestamps: false, // Deshabilitar los campos createdAt y updatedAt
	}
);

export default Usuario;
