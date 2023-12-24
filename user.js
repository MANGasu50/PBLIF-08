const Joi = require('joi');
const Controller = require('./controller');
const db = require('../../database');

class User {
  static validate(data) {
    const schema = Joi.object({
      name: Joi.string()
        .required()
        .messages({
          'any.required': 'Nama wajib diisi'
        }),
      type: Joi.string()
        .valid('admin', 'operator')
        .required()
        .messages({
          'string.valid': 'Tipe harus salah satu dari \'admin\' atau \'operator\'',
          'any.required': 'Tipe wajib diisi',
        }),
      username: Joi.string()
        .required()
        .messages({
          'any.required': 'Username harus diisi'
        }),
      password: Joi.string()
        .required()
        .min(8)
        .messages({
          'any.required': 'Password harus diisi'
        }),
      birthdate: Joi.date().required()
        .messages({
          'date.required': 'Tanggal lahir harus diisi'
        }),
      address: Joi.string()
        .required()
        .messages({
          'any.required': 'Alamat harus diisi'
        })
    })
    .validate(data);

    if (schema?.error?.message) {
      throw Error(schema?.error?.message);
    }

    return schema.value;
  }

  /**
   * 
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   */
  static async getAll(req, res) {
    try {
      const users = await db('users')
        .select();
  
      return res.status(200).json(Controller.baseResponse(true, 'Success', users));
    } catch (error) {
      return res.status(500).json(Controller.baseResponse(false, error.message));
    }
  }

  /**
   * 
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   */
  static async create(req, res) {
    try {
      const data = User.validate(req.body);

      const checkUsername = await db('users').where('username', '=', data.username).select();
      if (checkUsername.length) throw Error('Username sudah ada');

      await db('users').insert(data);
  
      return res.status(200).json(Controller.baseResponse(true, 'Success', null));
    } catch (error) {
      return res.status(400).json(Controller.baseResponse(false, error.message));
    }
  }

  /**
   * 
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   */
  static async update(req, res) {
    try {
      const {id: userId} = req.params;
      const data = User.validate(req.body);

      const users = await db('users').where('id', '=', userId).select();
      if (!users.length) throw Error('User tidak ditemukan');

      const oldUser = users[0];

      if (oldUser.username !== data.username) {
        const checkUsername = await db('users').where('username', '=', data.username).select();

        if (checkUsername.length) throw Error('Username sudah ada');
      }

      const newUser = {
        ...oldUser,
        ...data
      };

      await db('users').where('id', '=', userId).update(data);
  
      return res.status(200).json(Controller.baseResponse(true, 'Success', newUser));
    } catch (error) {
      return res.status(400).json(Controller.baseResponse(false, error.message));
    }
  }

  /**
   * 
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   */
  static async delete(req, res) {
    try {
      const {id: userId} = req.params;

      const users = await db('users').where('id', '=', userId).select();
      if (!users.length) throw Error('User tidak ditemukan');

      await db('users').where('id', '=', userId).delete();
  
      return res.json(Controller.baseResponse(true, 'Success', null));
    } catch (error) {
      return res.json(Controller.baseResponse(false, error.message));
    }
  }
}

module.exports = User;
