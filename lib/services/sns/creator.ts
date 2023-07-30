import { Topic } from "aws-cdk-lib/aws-sns";
import { EmailSubscription } from "aws-cdk-lib/aws-sns-subscriptions";
import { Construct } from "constructs";

export class SNSCreator {
    public static createSNSTopic(self: Construct, topicName: string): Topic {
        const topic: Topic = new Topic(self, topicName, {
            topicName: topicName,
        });
        return topic;
    }
    public static addEmailSubscription(topic: Topic, email: string): void {
        const emailSubscription = new EmailSubscription(email);
        topic.addSubscription(emailSubscription);
    }
}