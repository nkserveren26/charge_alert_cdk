import { Effect, PolicyStatement, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Topic } from "aws-cdk-lib/aws-sns";
import { Construct } from "constructs";

export class IAMCreator {
    public static createCodeBuildRole(self: Construct, roleName: string): Role {
        const codeBuildRole = new Role(self, roleName, {
            roleName: roleName,
            assumedBy: new ServicePrincipal('codebuild.amazonaws.com'),
            managedPolicies: [
                {
                    managedPolicyArn: 'arn:aws:iam::aws:policy/AdministratorAccess',
                },
            ],
        });
        return codeBuildRole;
    }
    public static createSNSPublishPolocyForCostServices(snsTopic: Topic): PolicyStatement {
        const SNSPublishPolicy: PolicyStatement = new PolicyStatement({
            sid: "SNSPublishingPermissions",
            effect: Effect.ALLOW,
            principals: [
                new ServicePrincipal("costalerts.amazonaws.com"),
                new ServicePrincipal("budgets.amazonaws.com"),
            ],
            actions: ["SNS:Publish"],
            resources: [snsTopic.topicArn],
        });
        return SNSPublishPolicy;
    }
}