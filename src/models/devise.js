module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Devise', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg : require('../config/utils/valueIsRequiredMsg')('Devise Currency')},
                notEmpty: { msg: require('../config/utils/valueIsRequiredMsg')('Devise Currency') },
                max: 3
            }
        },
        region: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg : require('../config/utils/valueIsRequiredMsg')('Devise Region')},
                notEmpty: { msg: require('../config/utils/valueIsRequiredMsg')('Devise Region') }
            }
        },
        iso2: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg : require('../config/utils/valueIsRequiredMsg')('Devise iso2')},
                notEmpty: { msg: require('../config/utils/valueIsRequiredMsg')('Devise iso2') }
            }
        },
        default: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
    }, {
        indexes: [
            {
                    name: 'unique_currency_region',
                    unique: true,
                    fields: ['currency', 'region']
                }
            ]
        }, {
        timestamps: true
    })
}