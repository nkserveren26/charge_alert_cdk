import { CfnBudget } from "aws-cdk-lib/aws-budgets";
import { Construct } from "constructs";
import { BudgetParam } from "./interfaces";

export class BudgetsCreator {
    public static createBudgets(
        self: Construct, 
        budgetsParam: BudgetParam,
        notificationsSubscribers: CfnBudget.NotificationWithSubscribersProperty[]): CfnBudget {
        const budgets: CfnBudget = new CfnBudget(self, budgetsParam.budgetsName, {
            budget: {
                budgetName: budgetsParam.budgetsName,
                budgetType: budgetsParam.budgetsType,
                timeUnit: budgetsParam.timeUnit,
                budgetLimit: {
                    amount: budgetsParam.budgetAmount,
                    unit: budgetsParam.unit,
                },
                timePeriod: {
                    start: 'PAST_MONTH',
                }
            },
            notificationsWithSubscribers: notificationsSubscribers,
        });
        return budgets;
    }
}