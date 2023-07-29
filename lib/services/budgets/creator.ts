import { CfnBudget } from "aws-cdk-lib/aws-budgets";
import { Construct } from "constructs";
import { BudgetParam } from "./interfaces";

export class BudgetsCreator {
    public static createBudgets(self: Construct, budgetsParam: BudgetParam): CfnBudget {
        const budgets = new CfnBudget(self, budgetsParam.budgetsName, {
            budget: {
                budgetType: budgetsParam.budgetsType,
                timeUnit: budgetsParam.timeUnit,
                budgetLimit: {
                    amount: budgetsParam.budgetAmount,
                    unit: budgetsParam.unit,
                },
            },
        });
        return budgets;
    }
}