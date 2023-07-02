const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')
dotenv.config()

const sequelize = new Sequelize(process.env.DATABASE_NAME.toString(), process.env.DATABASE_USER.toString(),
    process.env.DATABASE_PASSWORD.toString(), {
    host: process.env.HOST.toString(),
    dialect: 'mysql',
    logging: null,
})

//getting of data models
const Devise = require('../../models/devise')(sequelize, DataTypes)
const Capital = require('../../models/capital')(sequelize, DataTypes)
const Economie = require('../../models/economie')(sequelize, DataTypes)
const Operation = require('../../models/operation')(sequelize, DataTypes)
const Files = require('../../models/files')(sequelize, DataTypes)

//Association
Devise.Capitals = Devise.hasMany(Capital, {
    'onDelete': 'CASCADE',
    'onUpdate': 'CASCADE'
})
Capital.Devise = Capital.belongsTo(Devise)

Devise.Economies = Devise.hasMany(Economie, {
    'onDelete': 'CASCADE',
    'onUpdate': 'CASCADE'
})

Economie.Devise = Economie.belongsTo(Devise)
Devise.Operations = Devise.hasMany(Operation, {
    'onDelete': 'CASCADE',
    'onUpdate': 'CASCADE'
})

Operation.Devise = Operation.belongsTo(Devise)
Operation.Files = Operation.hasMany(Files, {
    'onDelete': 'CASCADE',
    'onUpdate': 'CASCADE'
})

Files.Operation = Files.belongsTo(Operation)


try {
    sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
            //Initialize datas
            if (parseInt(process.env.INITIALIZE_DATA) == 1) {
                sequelize.sync({ force: true }).then(() => {
                console.log('Synchronization has been established successfully.');
                    // Devise.create({ currency: 'TND',default: true, region: 'Tunisia' }).then(devise => {
                    //     //console.log(devise.toJSON());
                    //     // Capital.create({ amount: 0, DeviseId: devise.id, sign: 'nulle' }).then(capital => {
                    //     //     console.log(capital.toJSON());
                    //     // }).catch(err => {
                    //     //     console.log(err);
                    //     // })
                    // }).catch(err => {
                    //     console.log(err);
                    // })
                    
                    unsetInitDatabase();
                }).catch(err => {
                    console.log(err);
                })
            }
        })
        .catch(err => {
        console.log(err);
    });
    
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

function unsetInitDatabase () {
    fs.readFile(path.resolve(__dirname, '../../../.env'), { encoding: 'utf8' }, function (err, data) {
        var formatted = data.replace(/INITIALIZE_DATA=1/g, 'INITIALIZE_DATA=0')
        fs.writeFile(path.resolve(__dirname, '../../../.env'), formatted, 'utf8', function (err) {
        if (err) return console.log(err)
            console.log('unset done!')
        })
    })
}

module.exports = { sequelize, Devise, Capital, Economie, Operation, Files }