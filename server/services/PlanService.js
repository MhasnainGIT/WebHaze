const Plan = require('../models/Plan');

class PlanService {
    // Get all active plans
    async getActivePlans() {
        try {
            const plans = await Plan.find({ isActive: true })
                .sort({ sortOrder: 1 });
            return { success: true, plans };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Get plan by slug
    async getPlanBySlug(slug) {
        try {
            const plan = await Plan.findOne({ slug, isActive: true });
            if (!plan) {
                throw new Error('Plan not found');
            }
            return { success: true, plan };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Calculate plan pricing with add-ons
    async calculatePricing(planId, addOnIds = [], billingCycle = 'monthly') {
        try {
            const plan = await Plan.findById(planId);
            if (!plan) {
                throw new Error('Plan not found');
            }

            let totalPrice = plan.pricing.basePrice;
            let selectedAddOns = [];

            // Add selected add-ons
            if (addOnIds.length > 0) {
                selectedAddOns = plan.addOns.filter(addon => 
                    addOnIds.includes(addon._id.toString())
                );
                totalPrice += selectedAddOns.reduce((sum, addon) => sum + addon.price, 0);
            }

            // Apply billing cycle discount (yearly gets discount)
            if (billingCycle === 'yearly') {
                totalPrice = totalPrice * 12 * 0.9; // 10% discount for yearly
            }

            return {
                success: true,
                pricing: {
                    basePrice: plan.pricing.basePrice,
                    addOns: selectedAddOns,
                    totalPrice,
                    currency: plan.pricing.currency,
                    billingCycle,
                    validityPeriod: plan.pricing.validityPeriod
                }
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Get EMI options for a plan
    async getEMIOptions(planId, amount) {
        try {
            const plan = await Plan.findById(planId);
            if (!plan) {
                throw new Error('Plan not found');
            }

            const eligibleEMIs = plan.emiOptions.filter(emi => 
                amount >= emi.minAmount
            );

            const emiCalculations = eligibleEMIs.map(emi => {
                const monthlyAmount = (amount * (1 + emi.interestRate / 100)) / emi.tenure;
                return {
                    tenure: emi.tenure,
                    monthlyAmount: Math.round(monthlyAmount * 100) / 100,
                    totalAmount: Math.round(monthlyAmount * emi.tenure * 100) / 100,
                    interestRate: emi.interestRate
                };
            });

            return { success: true, emiOptions: emiCalculations };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}

module.exports = PlanService;