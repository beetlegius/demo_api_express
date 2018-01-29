import mongoose, { Schema } from 'mongoose'
import { slugify } from 'lodash-addons'
import Category from './category'

const Product = new Schema({
  category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  name: { type: String, required: true, trim: true },
  price: { type: Number },
  slug: { type: String, trim: true }
}, {
  timestamps: true
})

Product.pre('save', function(next) {
  this.slug = slugify(this.name)
  next()
})

Product.pre('save', function(next) {
  let product = this
  if (!product.isNew) return next()

  Category.update({ _id: product.category_id }, { $inc: { products_count: 1 } }, next)
    .catch(next)
})

Product.post('remove', function(next) {
  let product = this
  Category.update({ _id: product.category_id }, { $inc: { products_count: -1 } }).then(next).catch(next)
})

export default mongoose.model('Product', Product)
