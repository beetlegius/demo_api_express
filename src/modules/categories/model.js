import mongoose, { Schema } from 'mongoose'

const Category = new Schema({
  name: { type: String, required: true, trim: true },
  products_count: { type: Number, default: 0 }
}, {
  timestamps: true
})

export default mongoose.model('Category', Category)
