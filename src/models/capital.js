const capitalSignValues = ['positive', 'negative', 'nulle']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Capital', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notNull: { msg : require('../config/utils/valueIsRequiredMsg')('Capital Amount')},
                notEmpty: { msg: require('../config/utils/valueIsRequiredMsg')('Capital Amount') },
            }
        },
        sign: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: [capitalSignValues],
            validate: {
                notNull: { msg : require('../config/utils/valueIsRequiredMsg')('Capital Amount Sign')},
                notEmpty: { msg: require('../config/utils/valueIsRequiredMsg')('Capital Amount Sign') },
            }
        }
    }, {
        timestamps: true
    })
}