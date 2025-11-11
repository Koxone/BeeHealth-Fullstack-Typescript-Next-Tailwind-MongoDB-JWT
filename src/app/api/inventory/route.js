import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import Transaction from '@/models/Transaction';
import Inventory from '@/models/Inventory';

// @route    POST /api/inventory
// @desc     Create a new inventory item
// @access   Private
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const quantity = Number(body.quantity);
    if (!body.name || isNaN(quantity)) {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
    }

    const validTypes = ['medicamento', 'receta', 'suministro'];
    const normalizedType =
      typeof body.type === 'string' && validTypes.includes(body.type.toLowerCase())
        ? body.type.toLowerCase()
        : 'medicamento';

    const newProduct = await Product.create({
      name: body.name,
      type: normalizedType,
      category: body.category || 'General',
      inStock: body.inStock ?? true,
      costPrice: body.costPrice ?? 0,
      salePrice: body.salePrice ?? 0,
    });

    const newInventory = await Inventory.create({
      product: newProduct._id,
      productType: newProduct.type,
      quantity,
      minStock: body.minStock ?? 0,
      maxStock: body.maxStock ?? 0,
    });

    const newTransaction = await Transaction.create({
      inventory: newInventory._id,
      type: 'IN',
      quantity,
      reason: 'Initial stock',
      patient: null,
    });

    return NextResponse.json(
      {
        message: 'Producto agregado correctamente',
        product: newProduct,
        inventory: newInventory,
        transaction: newTransaction,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
