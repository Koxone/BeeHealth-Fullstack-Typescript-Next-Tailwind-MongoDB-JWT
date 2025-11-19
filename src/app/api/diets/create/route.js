import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { getAuthUser } from '@/lib/auth/getAuthUser';

// Models
import Consultation from '@/models/Consult';
import Inventory from '@/models/Inventory';
import Transaction from '@/models/Transaction';
import Product from '@/models/Product';
import User from '@/models/User';
import Diet from '@/models/Diet';

// @route    GET /api/diets/create
// @desc     Create a new diet
// @access   Private
export async function POST(req) {
  try {
    // Connect to database
    await connectDB();

    // Authenticate user
    const authUser = await getAuthUser(req);
    if (!authUser) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { userId } = authUser;

    // Parse request body
    const {
      doctor,
      patients,
      name,
      category,
      recommendations,
      benefits,
      ingredients,
      instructions,
      description,
      isActive,
      images,
      notes,
    } = await req.json();
    if (!patients || !name) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Create new diet
    const newDiet = await Diet.create({
      doctor: new mongoose.Types.ObjectId(userId),
      patients: patients.map((id) => new mongoose.Types.ObjectId(id)),
      name,
      category,
      recommendations,
      benefits,
      ingredients,
      instructions,
      description,
      isActive,
      images,
      notes,
    });

    return NextResponse.json({ diet: newDiet }, { status: 201 });
  } catch (error) {
    console.error('Error creating diet:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
