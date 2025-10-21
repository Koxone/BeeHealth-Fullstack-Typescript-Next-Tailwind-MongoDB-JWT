import mongoose from 'mongoose';

//  Subschema for meal of the day
const MealSchema = new mongoose.Schema({
  timeOfDay: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'], required: true },
  title: { type: String, required: true },
  description: { type: String },
  ingredients: [{ type: String }],
  instructions: [{ type: String }],
  images: [{ type: String }],
  calories: { type: Number },
});

// Main Diet Schema
const DietSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    goal: { type: String },
    durationDays: { type: Number },
    caloriesPerDay: { type: Number },
    tags: [{ type: String }],

    // Relation to Medic and optionally Patient
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Medic', required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },

    // Meals for each day
    dailyMeals: [
      {
        day: { type: Number, required: true },
        meals: [MealSchema],
      },
    ],

    // General ingredients/instructions/images
    ingredients: [{ type: String }],
    instructions: [{ type: String }],
    images: [{ type: String }],

    isPublic: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Diet || mongoose.model('Diet', DietSchema);
