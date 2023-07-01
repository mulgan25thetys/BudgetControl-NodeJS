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
        default: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
    }, {
        timestamps: true
    },{
        sequelize,
        paranoid: true,

        // If you want to give a custom name to the deletedAt column
        deletedAt: 'destroyTime'
    })
}