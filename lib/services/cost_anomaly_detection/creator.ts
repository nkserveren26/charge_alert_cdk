import { CfnAnomalyMonitor, CfnAnomalySubscription } from "aws-cdk-lib/aws-ce";
import { Topic } from "aws-cdk-lib/aws-sns";
import { Construct } from "constructs";
import { ThresholdParam } from "./interfaces";

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
    public static createAnomalySubscriptionOfImmediate(
        self: Construct, 
        subscriptionName: string, 
        monitor: CfnAnomalyMonitor,
        snsTopic: Topic,
        thresholdParam: ThresholdParam,
    ): CfnAnomalySubscription {
        const { Key, MatchOptions, Values } = thresholdParam;
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
                    "Key": "${Key}",
                    "MatchOptions": ["${MatchOptions}"],
                    "Values": ["${Values}"]
                }
            }`,
        });
        return subscription;
    }

}