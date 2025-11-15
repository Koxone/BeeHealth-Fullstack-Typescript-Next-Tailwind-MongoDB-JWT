import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Inventory from '@/models/Inventory';
import Product from '@/models/Product';
import Transaction from '@/models/Transaction';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// @route    PATCH /api/inventory/edit
// @desc     Edit product name, category, quantity, and prices
// @access   Private
export async function PATCH(req) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Parse request body
    const body = await req.json();
    const { inventoryId, name, category, quantity, costPrice, salePrice, reason } = body;

    // Extract token from cookie or authorization header
    const cookieHeader = req.headers.get('cookie') || '';
    const refreshToken =
      cookieHeader
        .split('; ')
        .find((c) => c.startsWith('refreshToken='))
        ?.split('=')[1] || null;

    const authHeader = req.headers.get('authorization');
    const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    const token = bearerToken || refreshToken;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    // Get user ID from decoded token
    const userId = decoded.id;

    // Validate inventory ID
    if (!inventoryId) {
      return NextResponse.json({ error: 'Inventory ID is required' }, { status: 400 });
    }

    // Find inventory and linked product
    const inventoryItem = await Inventory.findById(inventoryId).populate('product');
    if (!inventoryItem) {
      return NextResponse.json({ error: 'Inventory item not found' }, { status: 404 });
    }

    // Find product item
    const productItem = await Product.findById(inventoryItem.product._id);
    if (!productItem) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Save previous values BEFORE editing
    const previousQuantity = inventoryItem.quantity;

    const oldCost = productItem.costPrice;
    const oldSale = productItem.salePrice;

    // Update editable product fields
    if (name) productItem.name = name;
    if (category) productItem.category = category;
    if (costPrice !== undefined) productItem.costPrice = Number(costPrice);
    if (salePrice !== undefined) productItem.salePrice = Number(salePrice);

    await productItem.save();

    // Determine movement direction
    let movement = null;
    let delta = 0;

    if (quantity !== undefined) {
      delta = Number(quantity) - previousQuantity;

      if (delta > 0) {
        movement = 'IN';
      } else if (delta < 0) {
        movement = 'OUT';
      } else {
        movement = 'NONE';
      }
    }

    if (quantity !== undefined) {
      inventoryItem.quantity = Number(quantity);
      await inventoryItem.save();
    }

    // Detailed quantity change logging
    if (quantity !== undefined && movement !== 'NONE' && movement !== null) {
      const newQuantity = Number(quantity);

      await Transaction.create({
        inventory: inventoryItem._id,
        movement,
        reasonType: 'correction',
        performedBy: new mongoose.Types.ObjectId(userId),

        oldQuantity: previousQuantity,
        newQuantity: newQuantity,
        quantityDelta: Math.abs(newQuantity - previousQuantity),

        quantity: Math.abs(delta),

        reason: reason || 'Quantity update',
      });
    }

    // Detect price changes
    const priceChanged =
      (costPrice !== undefined && Number(costPrice) !== oldCost) ||
      (salePrice !== undefined && Number(salePrice) !== oldSale);

    if (priceChanged) {
      const newCost = costPrice !== undefined ? Number(costPrice) : oldCost;
      const newSale = salePrice !== undefined ? Number(salePrice) : oldSale;

      // Determinar qué campo cambió
      let priceField = 'both';
      if (newCost !== oldCost && newSale === oldSale) priceField = 'costPrice';
      if (newSale !== oldSale && newCost === oldCost) priceField = 'salePrice';

      // Determinar movimiento
      let priceMovement = 'NONE';
      if (newCost > oldCost || newSale > oldSale) priceMovement = 'IN';
      if (newCost < oldCost || newSale < oldSale) priceMovement = 'OUT';

      let priceDelta = 0;

      if (newCost !== oldCost) {
        priceDelta += Math.abs(newCost - oldCost);
      }

      if (newSale !== oldSale) {
        priceDelta += Math.abs(newSale - oldSale);
      }

      await Transaction.create({
        inventory: inventoryItem._id,
        movement: priceMovement,
        reasonType: 'correction',
        performedBy: new mongoose.Types.ObjectId(userId),
        reason: reason || 'Price update',

        oldCostPrice: oldCost,
        newCostPrice: newCost,
        oldSalePrice: oldSale,
        newSalePrice: newSale,

        priceField,
        priceDelta,
      });
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Product updated successfully',
        inventory: { ...inventoryItem.toObject(), product: productItem },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating inventory:', error);
    return NextResponse.json({ error: 'Server error while updating inventory' }, { status: 500 });
  }
}
