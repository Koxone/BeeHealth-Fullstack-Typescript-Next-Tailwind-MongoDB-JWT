import mongoose from 'mongoose';

const InventorySchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  minStock: { type: Number, required: true },
  maxStock: { type: Number, required: true },
  lastUpdated: { type: Date, default: Date.now },
});

const Inventory = mongoose.model('Inventory', InventorySchema);

export default Inventory;
