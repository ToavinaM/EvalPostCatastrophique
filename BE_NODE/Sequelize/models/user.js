import { Model } from 'sequelize';

export default class User extends Model {
    static associate(models) {
        // Définition des relations ici
    }

    static init(sequelize, DataTypes) {
        return super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING
        }, { sequelize, modelName: 'User' });
    }
}
