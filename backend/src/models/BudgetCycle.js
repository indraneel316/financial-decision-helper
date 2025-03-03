// models/BudgetCycle.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const BudgetCycleSchema = new Schema({
    userId: {
        type: Number,
        required: true
    },
    // Make sure every cycle has a unique identifier.
    budgetCycleId: {
        type: String,
        required: true,
        unique: true
    },
    // Optional descriptive name for the cycle.
    cycleName: {
        type: String
    },
    budgetCycleDuration: {
        type: String,
        required: true
    },
    startDate: { type: Date },
    endDate: { type: Date },
    totalMoneyAllocation: {
        type: Number,
        required: true
    },
    savingsTarget: {
        type: Number,
        required: true
    },
    allocatedEntertainment: { type: Number, default: 0 },
    allocatedGroceries:     { type: Number, default: 0 },
    allocatedUtilities:     { type: Number, default: 0 },
    allocatedCommute:       { type: Number, default: 0 },
    allocatedShopping:      { type: Number, default: 0 },
    allocatedDiningOut:     { type: Number, default: 0 },
    allocatedMedicalExpense:{ type: Number, default: 0 },
    allocatedAccommodation: { type: Number, default: 0 },
    allocatedVacation:      { type: Number, default: 0 },
    allocatedOtherExpenses: { type: Number, default: 0 },
    // Pre-aggregated field: overall spending in this cycle.
    spentSoFar: { type: Number, default: 0 },
    // Pre-aggregated field: breakdown of spending per category.
    categorySpent: { type: Map, of: Number, default: {} },
    // Status field to denote if this cycle is active, completed, or paused.
    status: { type: String, enum: ['active', 'completed'], default: 'active' }
}, { timestamps: true });

// Virtual populate to link to the User model.
BudgetCycleSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: 'userId',
    justOne: true
});

export default model('BudgetCycle', BudgetCycleSchema);
