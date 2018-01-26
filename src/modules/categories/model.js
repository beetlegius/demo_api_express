import mongoose, { Schema } from 'mongoose'
import { slugify } from 'lodash-addons'

const Category = new Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, trim: true },
  products_count: { type: Number, default: 0 }
}, {
  timestamps: true
})

Category.pre('save', function(next) {
  this.slug = slugify(this.name)
  next()
})

export default mongoose.model('Category', Category)
