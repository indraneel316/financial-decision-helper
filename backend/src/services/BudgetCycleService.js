import Budget from '../models/BudgetCycle.js';

export const createBudget = async (budgetData) => {
    const budget = new Budget(budgetData);
    await budget.save();
    return budget;
};

export const updateBudget = async (budgetCycleId, updates) => {
    return Budget.findOneAndUpdate({budgetCycleId}, updates, {
        new: true,
    });
};

export const deleteBudget = async (budgetCycleId) => {
    return Budget.findOneAndDelete({budgetCycleId});
};

export const getBudget = async (budgetCycleId) => {
    return Budget.findOne({budgetCycleId});
};