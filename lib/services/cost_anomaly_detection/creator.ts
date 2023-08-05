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
        const subscription = new CfnAnomalySubscription(self, subscriptionName, {
            frequency: "IMMEDIATE",
            monitorArnList: [monitor.attrMonitorArn],
            subscribers: [{
                address: snsTopic.topicArn,
                type: "SNS",
                status: "CONFIRMED",
            }],
            subscriptionName: subscriptionName,

        });
        return subscription;
    }

}