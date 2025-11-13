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

    const productItem = await Product.findById(inventoryItem.product._id);
    if (!productItem) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Update editable product fields
    if (name) productItem.name = name;
    if (category) productItem.category = category;
    if (costPrice !== undefined) productItem.costPrice = Number(costPrice);
    if (salePrice !== undefined) productItem.salePrice = Number(salePrice);

    await productItem.save();

    // Update editable inventory fields
    if (quantity !== undefined) inventoryItem.quantity = Number(quantity);
    await inventoryItem.save();

    // Log correction transaction
    await Transaction.create({
      inventory: inventoryItem._id,
      movement: 'IN',
      reasonType: 'correction',
      performedBy: new mongoose.Types.ObjectId(userId),
      quantity: quantity ?? inventoryItem.quantity,
      reason: reason || 'Manual inventory correction',
    });

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
