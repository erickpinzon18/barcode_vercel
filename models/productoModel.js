import { DataTypes } from "sequelize";
import sequelize from "../connections/database.js";

const Producto = sequelize.define(
	"producto",
	{
		codigo: {
			type: DataTypes.STRING(50),
			primaryKey: true,
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
	},
	{
		tableName: "producto",
		timestamps: true,
	}
);

export default Producto;
