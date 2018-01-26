import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const User = new Schema({
  email: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, required: true, trim: true }
}, {
  timestamps: true
})

User.pre('save', function(next) {
  let user = this
  bcrypt.hash(user.password, 10)
    .then(hash => user.password = hash)
    .then(next)
    .catch(next)
})

User.methods.isValidPassword = function(password) {
  let user = this
  return bcrypt.compare(password, user.password)
}

export default mongoose.model('User', User)
