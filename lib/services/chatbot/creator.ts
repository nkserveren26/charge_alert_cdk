import { CfnSlackChannelConfiguration } from "aws-cdk-lib/aws-chatbot";
import { Construct } from "constructs";

export class ChatbotCreator {
    public static createSlackChannelConfiguration(
        self: Construct, 
        configName: string, 
        slackChannelID: string, 
        slackWorkspaceID: string): CfnSlackChannelConfiguration {
        const channel = new CfnSlackChannelConfiguration(self, configName, {
            configurationName: configName,
            iamRoleArn: "",
            slackChannelId: slackChannelID,
            slackWorkspaceId: slackWorkspaceID,
            snsTopicArns: [""]
        });
        return channel;
    }
}