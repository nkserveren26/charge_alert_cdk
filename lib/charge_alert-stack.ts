import { ThresholdParam } from './services/cost_anomaly_detection/interfaces';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BudgetsCreator } from './services/budgets/creator';
import { BudgetParam } from './services/budgets/interfaces';
import { CfnBudget } from 'aws-cdk-lib/aws-budgets';
import { SNSCreator } from './services/sns/creator';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { fields } from './fields';
import { PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { ChatbotParam } from './services/chatbot/interfaces';
import { ChatbotCreator } from './services/chatbot/creator';
import { IAMCreator } from './services/iam/creator';
import { CostAnomalyDetectionCreator } from './services/cost_anomaly_detection/creator';

export class ChargeAlertStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const chatbotRole: Role = new Role(this, "chatbot-role", {
      roleName: "chatbot-role",
      assumedBy: new ServicePrincipal("sns.amazonaws.com"),
    });

    //Budgetsのアラート用SNS Topicを作成
    const SNSTopic: Topic = SNSCreator.createSNSTopic(this, "budgetsAlertTopic");

    //AWS BudgetsとCostalertsにSNSトピックへのPublish権限を付与するIAMポリシー
    const snspolicy: PolicyStatement = IAMCreator.createSNSPublishPolocyForCostServices(SNSTopic);

    //SNSTopicのリソースポリシーに権限を追加
    SNSTopic.addToResourcePolicy(snspolicy);

    //SNSトピックに連携するChatbotのパラメータ
    const chatbotParam: ChatbotParam = {
      configurationName: "charge-alert",
      iamRoleArn: chatbotRole.roleArn,
      slackChannelID: "C05L4SQHKFU",
      slackWorkspaceID: "T05KC4F4V9Q",
      snsTopicArns: [SNSTopic.topicArn],
    };

    //ChatbotのSlackワークスペースに通知先チャンネルを設定
    const chatbot = ChatbotCreator.createSlackChannelConfiguration(this, chatbotParam);

    //Budgetsのパラメーター
    const budgetsParam: BudgetParam = {
      budgetsName: "testbudget_cdk",
      budgetsType: "COST",
      timeUnit: "MONTHLY",
      unit: "USD",
    };

    //Budgetsアラート通知の設定用パラメーター
    const notificationsParams: CfnBudget.NotificationWithSubscribersProperty[] = [
      {
        notification: {
          comparisonOperator: "GREATER_THAN",
          notificationType: "FORECASTED",
          threshold: 150,
          thresholdType: "PERCENTAGE",
        },
        subscribers: [{
          subscriptionType: "SNS",
          address: SNSTopic.topicArn,
        }],
      },
    ];

    //Budgetsの作成
    const budgets: CfnBudget = BudgetsCreator.createHalfYearAverageBudgets(this,budgetsParam, notificationsParams);

    //Cost Anomaly Detectionの作成
    //アラートの閾値パラメーター
    const thresholdParam: ThresholdParam = {
      Key: "ANOMALY_TOTAL_IMPACT_PERCENTAGE",
      MatchOptions: ["GREATER_THAN_OR_EQUAL"],
      Values: [ "20" ],
    };

    //コストモニターの作成
    const costMonitor = CostAnomalyDetectionCreator.createCostMonitorForAWSServices(this, "cost-monitor-services");
    const anomalySubscription = CostAnomalyDetectionCreator.createAnomalySubscriptionOfImmediate(this, "anomaly-alert", costMonitor, SNSTopic, thresholdParam);

  }
}
