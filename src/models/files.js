const filesTypes = ['Image','Texte','Pdf']
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Files', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg : require('../config/utils/valueIsRequiredMsg')('File Name')},
                notEmpty: { msg: require('../config/utils/valueIsRequiredMsg')('File Name') },
            }
        },
        extension: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg : require('../config/utils/valueIsRequiredMsg')('File Extension')},
                notEmpty: { msg: require('../config/utils/valueIsRequiredMsg')('File Extension') },
            }
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg : require('../config/utils/valueIsRequiredMsg')('File size')},
                notEmpty: { msg: require('../config/utils/valueIsRequiredMsg')('File size') },
            }
        },
        types: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: [filesTypes],
            validate: {
                notNull: { msg : require('../config/utils/valueIsRequiredMsg')('File Type')+' '+filesTypes.join(' or ')},
                notEmpty: { msg: require('../config/utils/valueIsRequiredMsg')('File Type')+' '+filesTypes.join(' or ') },
            }
        },
    }, {
        timestamps: true
    })
}