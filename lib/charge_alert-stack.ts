import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BudgetsCreator } from './services/budgets/creator';
import { BudgetParam } from './services/budgets/interfaces';
import { CfnBudget } from 'aws-cdk-lib/aws-budgets';
import { SNSCreator } from './services/sns/creator';
import { Topic } from 'aws-cdk-lib/aws-sns';
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

    //Budgetsのアラート用SNS Topicを作成
    const SNSTopic: Topic = SNSCreator.createSNSTopic(this, "budgetsAlertTopic");

    //アラート通知の設定用パラメーター
    const notificationsParams: CfnBudget.NotificationWithSubscribersProperty[] = [
      {
        notification: {
          comparisonOperator: 'GREATER_THAN',
          notificationType: 'FORECASTED',
          threshold: 80,
          thresholdType: 'PERCENTAGE',
        },
        subscribers: [{
          subscriptionType: 'SNS',
          address: SNSTopic.topicArn,
        }],
      },
    ];

    //Budgetsの作成
    const budgets: CfnBudget = BudgetsCreator.createBudgets(this,budgetsParam, notificationsParams);
  }
}
