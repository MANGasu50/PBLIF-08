const Joi = require('joi');
const Controller = require('./controller');
const db = require('../../database');

class Robot {
  static validate(data) {
    const schema = Joi.object({
      name: Joi.string()
        .required()
        .messages({
          'any.required': 'Nama robot wajib diisi'
        }),
      type: Joi.string()
        .required()
        .messages({
          'any.required': 'Tipe robot wajib diisi'
        }),
      battery: Joi.number()
        .required()
        .messages({
          'any.required': 'Baterai robot wajib diisi'
        }),
      series_number: Joi.string()
        .required()
        .messages({
          'any.required': 'Nomor seri robot wajib diisi'
        })
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
  static async getOne(req, res) {
    try {
      const {id} = req.params;

      const historyCheckpoint = await db('history_checkpoint')
        .join('robot', 'robot.id', '=', 'history_checkpoint.robot_id')
        .join('checkpoint', 'checkpoint.id', '=', 'history_checkpoint.checkpoint_id')
        .orderBy('history_checkpoint.created_at', 'desc')
        .where('robot.id', id)
        .limit(1)
        .first()
        .select(
          'history_checkpoint.id',
          'history_checkpoint.robot_id',
          'history_checkpoint.checkpoint_id',
          'history_checkpoint.created_by',
          'history_checkpoint.created_at',
          'checkpoint.name as checkpoint_name',
          'robot.name as robot_name',
          'robot.series_number as robot_series_number',
          'robot.type as robot_type',
          'robot.battery as robot_battery',
          'checkpoint.name as checkpoint_name',
        );

      return res.status(200).json(Controller.baseResponse(true, 'Success', historyCheckpoint));
    } catch (error) {
      return res.status(500).json(Controller.baseResponse(false, error.message));
    }
  }

  /**
   * 
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   */
  static async getAll(req, res) {
    try {
      const robots = await db('robot')
        .select();

      return res.status(200).json(Controller.baseResponse(true, 'Success', robots));
    } catch (error) {
      return res.status(500).json(Controller.baseResponse(false, error.message));
    }
  }

  /**
   * 
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   */
  static async getAllHistoryCheckpoint(req, res) {
    try {
      const historyCheckpoints = await db('history_checkpoint')
        .join('robot', 'robot.id', '=', 'history_checkpoint.robot_id')
        .join('checkpoint', 'checkpoint.id', '=', 'history_checkpoint.checkpoint_id')
        .join('users', 'users.id', '=', 'history_checkpoint.created_by')
        .orderBy('history_checkpoint.created_at', 'asc')
        .select(
          'history_checkpoint.id',
          'history_checkpoint.robot_id',
          'history_checkpoint.checkpoint_id',
          'history_checkpoint.created_by',
          'history_checkpoint.created_at',
          'robot.name as robot_name',
          'checkpoint.name as checkpoint_name',
          'users.name as user_name',
        );

      const mapped = historyCheckpoints.reduce((prev, historyCheckpoint) => {
        if (prev[historyCheckpoint.robot_id]) {
          prev[historyCheckpoint.robot_id].push(historyCheckpoint);
        } else {
          prev[historyCheckpoint.robot_id] = [historyCheckpoint];
        }

        return prev;
      }, {});

      return res.status(200).json(Controller.baseResponse(true, 'Success', mapped));
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
      const data = Robot.validate(req.body);

      await db('robot').insert(data);

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
      const { id: robotId } = req.params;
      const data = Robot.validate(req.body);

      const robots = await db('robot').where('id', '=', robotId).select();
      if (!robots.length) throw Error('Robot tidak ditemukan');

      const newRobot = {
        ...robots[0],
        ...data
      };

      await db('robot').where('id', '=', robotId).update(data);

      return res.status(200).json(Controller.baseResponse(true, 'Success', newRobot));
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
      const { id: robotId } = req.params;

      const robots = await db('robot').where('id', '=', robotId).select();
      if (!robots.length) throw Error('Robot tidak ditemukan');

      await db('robot').where('id', '=', robotId).delete();

      return res.json(Controller.baseResponse(true, 'Success', null));
    } catch (error) {
      return res.json(Controller.baseResponse(false, error.message));
    }
  }
}

module.exports = Robot;
