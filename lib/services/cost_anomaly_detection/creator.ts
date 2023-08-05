import { CfnAnomalyMonitor } from "aws-cdk-lib/aws-ce";
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
    public static createAnomalySubscription(subscriptionName: string) {}

}