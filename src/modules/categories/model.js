import mongoose, { Schema } from 'mongoose'

const Category = new Schema({
  name: { type: String, required: true, trim: true }
}, {
  timestamps: true
})

export default mongoose.model('Category', Category)
