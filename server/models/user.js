'use strict';
const {
  Model
} = require('sequelize');

const { encryptPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  };
  User.init({
    full_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Nama panjang tidak boleh kosong'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Oops.. Email telah digunakan...'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Input harus berformat email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
         len: {
           args: [4, 16],
           msg: 'Password harus memiliki minimal 4 karakter dan maksimal 16 karakter'
         }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook('beforeCreate', user => {
    user.password = encryptPassword(user.password)
  })

  return User;
  
};