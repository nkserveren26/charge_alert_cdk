#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ChargeAlertStack } from '../lib/charge_alert-stack';

const app = new cdk.App();
new ChargeAlertStack(app, 'ChargeAlertStack', {
  //Cost Anomaly Detectionはus-east-1でないとデプロイできないので、リージョンをus-east-1に指定
  env: { region: 'us-east-1' },
});