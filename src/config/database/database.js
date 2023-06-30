const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')
dotenv.config()

const sequelize = new Sequelize(process.env.DATABASE_NAME.toString(), process.env.DATABASE_USER.toString(),
    process.env.DATABASE_PASSWORD.toString(), {
    host: process.env.HOST.toString(),
    dialect: 'mysql',
    logging: (...msg) => console.log(msg),
})

//getting of data models
const Devise = require('../../models/devise')(sequelize, DataTypes)
const Capital = require('../../models/capital')(sequelize, DataTypes)
const Economie = require('../../models/economie')(sequelize, DataTypes)
const Operation = require('../../models/operation')(sequelize, DataTypes)
const Files = require('../../models/files')(sequelize, DataTypes)

//Association
Capital.Devise = Capital.belongsTo(Devise)

Capital.Economies = Capital.hasMany(Economie, {
    'onDelete': 'CASCADE',
    'onUpdate': 'CASCADE'
})

Economie.Capital = Economie.belongsTo(Capital)
Capital.Operations = Capital.hasMany(Operation, {
    'onDelete': 'CASCADE',
    'onUpdate': 'CASCADE'
})

Operation.Capital = Operation.belongsTo(Capital)
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
                    Devise.create({ currency: 'TND', region: 'Tunisia' }).then(devise => {
                        console.log(devise.toJSON());
                        Capital.create({ amount: 0, DeviseId: devise.id }).then(capital => {
                            console.log(capital.toJSON());
                        }).catch(err => {
                            console.log(err);
                        })
                    }).catch(err => {
                        console.log(err);
                    })
                    
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