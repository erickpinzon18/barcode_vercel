import { DataTypes } from "sequelize";
import sequelize from "../connections/database.js";

const Producto = sequelize.define(
	"producto",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
            autoIncrement: true,
		},
		codigo: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		etiqueta: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		cantidad: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		fecha_cap: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		id_usuario: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		tableName: "producto", // Nombre real de la tabla en la base de datos
		timestamps: false, // Deshabilitar los campos createdAt y updatedAt
	}
);

export default Producto;
