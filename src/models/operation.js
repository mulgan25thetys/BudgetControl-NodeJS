const operationCategory = ['receipt', 'expense']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Operation', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notNull: { msg : require('../config/utils/valueIsRequiredMsg')('Operation Amount')},
                notEmpty: { msg: require('../config/utils/valueIsRequiredMsg')('Operation Amount') },
            }
        },
        object: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg : require('../config/utils/valueIsRequiredMsg')('Operation Object')+' '+operationCategory.join(' or ')},
                notEmpty: { msg: require('../config/utils/valueIsRequiredMsg')('Operation Object')+' '+operationCategory.join(' or ') },
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        category: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: [operationCategory],
            validate: {
                notNull: { msg : require('../config/utils/valueIsRequiredMsg')('Operation Category')+' '+operationCategory.join(' or ')},
                notEmpty: { msg: require('../config/utils/valueIsRequiredMsg')('Operation Category')+' '+operationCategory.join(' or ') },
            }
        }
    }, {
        timestamps: true
    })
}