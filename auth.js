const jwt = require('jsonwebtoken');
const Global = require('../../global');
const Controller = require('../controllers/controller');

class Auth {
  /**
   * 
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   * @param {import("express").NextFunction} next
   */
  static async protect(req, res, next) {
    try {
      const { authorization } = req.headers;

      const token = authorization
        .replace('Bearer ', '')
        .replace('bearer ', '');

      await (new Promise((resolve, reject) => {
        jwt.verify(token, Global.PRIVATE_KEY, (err, decoded) => {
          if (err?.message) reject(err);

          resolve(decoded);
        });
      }));

      return next();
    } catch (error) {
      return res.status(401).json(Controller.baseResponse(false, 'Need Auth', null));
    }
  }
};

module.exports = Auth;