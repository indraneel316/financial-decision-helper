import Transaction from '../models/Transaction.js';

import { processTransactionRecommendationAsync } from './transactionRecommendation.js';
import { scheduleAnalyticsUpdateForUser } from './scheduleAnalyticsUpdate.js';

/**
 * Create a new transaction and trigger recommendation processing and analytics update asynchronously.
 *
 * @param {Object} transactionData - Data for the new transaction.
 * @returns {Promise<Object>} The saved transaction document.
 */
export const createTransaction = async (transactionData) => {
    const transaction = new Transaction(transactionData);
    await transaction.save();
    // Trigger the recommendation logic asynchronously.
    setImmediate(() => {
        processTransactionRecommendationAsync(transaction);
    });
    // Schedule the analytics update 10 minutes later.
    scheduleAnalyticsUpdateForUser(transaction.userId, transaction.purchaseCategory);
    return transaction;
};

/**
 * Update an existing transaction and trigger recommendation processing and analytics update asynchronously.
 *
 * @param {String} transactionId - The transaction document ID.
 * @param {Object} updates - The fields to update.
 * @returns {Promise<Object>} The updated transaction document.
 */
export const updateTransaction = async (transactionId, updates) => {
    const transaction = await Transaction.findByIdAndUpdate(transactionId, updates, { new: true });
    if (!transaction) throw new Error('Transaction not found');
    setImmediate(() => {
        processTransactionRecommendationAsync(transaction);
    });
    scheduleAnalyticsUpdateForUser(transaction.userId, transaction.purchaseCategory);
    return transaction;
};



export const deleteTransaction = async (transactionId) => {
    return Transaction.findByIdAndDelete(transactionId);
};

export const getTransactions = async (userId) => {
    return Transaction.find({userId});
};