import { CfnBudget } from "aws-cdk-lib/aws-budgets";
import { Construct } from "constructs";

export class BudgetsCreator {
    public static createBudgets(self: Construct, budgetsName: string) {
        const budgets = new CfnBudget(self, budgetsName, {
            budget: {
                budgetType: "COST",
                timeUnit: "MONTHLY",
                budgetLimit: {
                    amount: 80,
                    unit: 'USD',
                },
            },
        });
    }
}