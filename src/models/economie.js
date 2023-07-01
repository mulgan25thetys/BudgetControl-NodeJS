module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Economie', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notNull: { msg : require('../config/utils/valueIsRequiredMsg')('Economy Amount')},
                notEmpty: { msg: require('../config/utils/valueIsRequiredMsg')('Economy Amount') },
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        timestamps: true
    })
}