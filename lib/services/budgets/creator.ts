import { CfnBudget } from "aws-cdk-lib/aws-budgets";
import { Construct } from "constructs";
import { BudgetParam } from "./interfaces";

export class BudgetsCreator {
    public static createHalfYearAverageBudgets(
        self: Construct, 
        budgetsParam: BudgetParam,
        notificationsSubscribers: CfnBudget.NotificationWithSubscribersProperty[]): CfnBudget {
        const budgets: CfnBudget = new CfnBudget(self, budgetsParam.budgetsName, {
            budget: {
                budgetName: budgetsParam.budgetsName,
                budgetType: budgetsParam.budgetsType,
                timeUnit: budgetsParam.timeUnit,
                autoAdjustData: {
                    autoAdjustType: "HISTORICAL",

                    // the properties below are optional
                    historicalOptions: {
                        budgetAdjustmentPeriod: 6,
                    },
                }
            },
            notificationsWithSubscribers: notificationsSubscribers,
        });
        return budgets;
    }
}