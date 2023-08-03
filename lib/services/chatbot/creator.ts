import { CfnSlackChannelConfiguration } from "aws-cdk-lib/aws-chatbot";
import { Construct } from "constructs";
import { ChatbotParam } from "./interfaces";

export class ChatbotCreator {
    public static createSlackChannelConfiguration(
        self: Construct, 
        chatbotParam: ChatbotParam): CfnSlackChannelConfiguration {
        const { configurationName, iamRoleArn, slackChannelID, slackWorkspaceID, snsTopicArns } = chatbotParam;
        const bot = new CfnSlackChannelConfiguration(self, configurationName, {
            configurationName: configurationName,
            iamRoleArn: iamRoleArn,
            slackChannelId: slackChannelID,
            slackWorkspaceId: slackWorkspaceID,
            snsTopicArns: snsTopicArns,
        });
        return bot;
    }
}