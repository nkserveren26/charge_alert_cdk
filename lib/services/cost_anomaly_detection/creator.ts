import { CfnAnomalyMonitor, CfnAnomalySubscription } from "aws-cdk-lib/aws-ce";
import { Topic } from "aws-cdk-lib/aws-sns";
import { Construct } from "constructs";

export class CostAnomalyDetectionCreator {
    public static createCostMonitorForAWSServices(
        self: Construct, 
        monitorName: string,
        ): CfnAnomalyMonitor {
            const costMonitor = new CfnAnomalyMonitor(self, monitorName, {
                monitorName: monitorName,
                monitorType: "DIMENSIONAL",
                monitorDimension: "SERVICE",
            });
            return costMonitor;
    }
    public static createAnomalySubscription(
        self: Construct, 
        subscriptionName: string, 
        monitor: CfnAnomalyMonitor,
        snsTopic: Topic,
    ): CfnAnomalySubscription {
        const subscription: CfnAnomalySubscription = new CfnAnomalySubscription(self, subscriptionName, {
            frequency: "IMMEDIATE",
            monitorArnList: [monitor.attrMonitorArn],
            subscribers: [{
                address: snsTopic.topicArn,
                type: "SNS",
            }],
            subscriptionName: subscriptionName,
            thresholdExpression: `{
                "Dimensions": {
                "Key": "ANOMALY_TOTAL_IMPACT_PERCENTAGE",
                "MatchOptions": ["GREATER_THAN_OR_EQUAL"],
                "Values": ["100"]
                }
            }`
        });
        return subscription;
    }

}