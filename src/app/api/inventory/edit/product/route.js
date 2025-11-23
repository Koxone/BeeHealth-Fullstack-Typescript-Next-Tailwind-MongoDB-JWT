import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import Transaction from '@/models/Transaction';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { getAuthUser } from '@/lib/auth/getAuthUser';

// @route    PATCH /api/inventory/edit/product
// @desc     Edit a product in the inventory
// @access   Private
export async function PATCH(req) {
  try {
    // Connect to DB
    await connectDB();

    // Get data from request
    const { productId, name, type, category, costPrice, salePrice } = await req.json();
    if (!productId) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'PRODUCT_ID_REQUIRED',
            message: 'Product ID is required',
            reason: 'The request did not include a valid productId field',
          },
        },
        { status: 400 }
      );
    }

    // Authenticate User
    const auth = await getAuthUser(req);
    if (!auth.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: auth.error,
        },
        { status: auth.status }
      );
    }

    // Find product item
    const productItem = await Product.findById(productId);
    if (!productItem) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'PRODUCT_NOT_FOUND',
            message: 'Product not found',
            product: productId,
            reason:
              'The product ID provided does not correspond to any existing product or is missing.',
          },
        },
        { status: 404 }
      );
    }
    const { userId, specialty } = auth;

    // Update product fields
    if (name) productItem.name = name;
    if (type) productItem.type = type;
    if (category) productItem.category = category;
    productItem.specialty = specialty;
    if (costPrice !== undefined) productItem.costPrice = costPrice;
    if (salePrice !== undefined) productItem.salePrice = salePrice;

    // Save updated product
    await productItem.save();

    return NextResponse.json(
      {
        ok: true,
        message: 'Product updated successfully',
        product: productItem,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An error occurred while updating the product',
          reason: error.message,
        },
      },
      { status: 500 }
    );
  }
}
