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
        }
    }, {
        timestamps: true
    })
}