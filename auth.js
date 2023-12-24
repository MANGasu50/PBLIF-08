const jwt = require('jsonwebtoken');
const Controller = require('./controller');
const db = require('../../database');
const Global = require('../../global');

class Auth {
  /**
   * 
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   */
  static async login(req, res) {
    try {
      const {username, password} = req.body;

      if (!username || !password) {
        throw Error('Username dan password wajib diisi');
      }

      const users = await db('users')
        .where('username', '=', username)
        .select();

      if (!users.length) throw Error('Username tidak ditemukan');

      let user = users[0];

      if (password !== user.password) throw Error('Password tidak sesuai');

      const token = jwt.sign({id: user.id}, Global.PRIVATE_KEY);
      user.token = token;
  
      return res.status(200).json(Controller.baseResponse(true, 'Success', user));
    } catch (error) {
      return res.status(500).json(Controller.baseResponse(false, error.message));
    }
  }
}

module.exports = Auth;
