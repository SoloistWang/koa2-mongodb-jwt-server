import mongoose from 'mongoose'

/**
 * @type {mongoose}
 * @return {Object} define and return a mongoose model 返回数据库模型
 */

const Schema = mongoose.Schema
const UserSchema = new Schema({
  username: {
    unique: true,
    type: String
  },
  password: String,
  meta: {
    createAt: {
      type: Date,
      dafault: Date.now()
    },
    updateAt: {
      type: Date,
      dafault: Date.now()
    }
  }
})

// Defines a pre hook 定义数据库保存前的操作
UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }
  next()
})

const User = mongoose.model('User', UserSchema)
module.exports = User

/**
 * more info about [`mongoose`]：https://cnodejs.org/topic/548e54d157fd3ae46b233502
 */