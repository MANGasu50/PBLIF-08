const Joi = require('joi');
const Controller = require('./controller');
const db = require('../../database');

class Checkpoint {
  static validate(data) {
    const schema = Joi.object({
      name: Joi.string()
        .required()
        .messages({
          'any.required': 'Nama wajib diisi'
        }),
      status: Joi.boolean()
        .required()
        .messages({
          'any.required': 'Status wajib diisi'
        }),
    }).validate(data);

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
      const checkpoints = await db('checkpoint')
        .select();
  
      return res.status(200).json(Controller.baseResponse(true, 'Success', checkpoints));
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
      const data = Checkpoint.validate(req.body);

      await db('checkpoint').insert(data);
  
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
      const {id: checkpointId} = req.params;
      const data = Checkpoint.validate(req.body);

      const checkpoints = await db('checkpoint').where('id', '=', checkpointId).select();
      if (!checkpoints.length) throw Error('Checkpoint tidak ditemukan');

      const newCheckpoint = {
        ...checkpoints[0],
        ...data
      };

      await db('checkpoint').where('id', '=', checkpointId).update(data);
  
      return res.status(200).json(Controller.baseResponse(true, 'Success', newCheckpoint));
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
      const {id: checkpointId} = req.params;

      const checkpoints = await db('checkpoint').where('id', '=', checkpointId).select();
      if (!checkpoints.length) throw Error('Checkpoint tidak ditemukan');

      await db('checkpoint').where('id', '=', checkpointId).delete();
  
      return res.json(Controller.baseResponse(true, 'Success', null));
    } catch (error) {
      return res.json(Controller.baseResponse(false, error.message));
    }
  }
}

module.exports = Checkpoint;
