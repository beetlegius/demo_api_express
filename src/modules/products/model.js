import mongoose, { Schema } from 'mongoose'

const Product = new Schema({
  category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  name: { type: String, required: true, trim: true },
  price: { type: Number },
}, {
  timestamps: true
})

export default mongoose.model('Product', Product)
