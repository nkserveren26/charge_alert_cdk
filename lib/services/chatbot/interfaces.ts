export interface ChatbotParam {
    configurationName: string,
    iamRoleArn: string,
    slackChannelID: string,
    slackWorkspaceID: string,
    snsTopicArns: string[],
}