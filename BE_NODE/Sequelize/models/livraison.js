import { Model, DataTypes } from 'sequelize';

export default class Livraison extends Model {
  static associate(models) {
    // Définis ici les relations si nécessaire
  }

  static init(sequelize) {
    return super.init({
      dateLivraison: {
        type: DataTypes.DATE,
        allowNull: false
      },
      statut: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Livraison'
    });
  }
}
