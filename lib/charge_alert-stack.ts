import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BudgetsCreator } from './services/budgets/creator';
import { BudgetParam } from './services/budgets/interfaces';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ChargeAlertStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //Budgetsのパラメーター
    const budgetsParam: BudgetParam = {
      budgetsName: "testbudget_cdk",
      budgetsType: "COST",
      timeUnit: "MONTHLY",
      budgetAmount: 80,
      unit: "USD",
    };

    //Budgetsの作成
    const budgets = BudgetsCreator.createBudgets(this,budgetsParam);
  }
}
