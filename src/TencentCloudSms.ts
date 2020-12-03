import * as tencentcloud from 'tencentcloud-sdk-nodejs'
import { ClientConfig } from 'tencentcloud-sdk-nodejs/tencentcloud/common/interface'
import { Client as SmsClientClass } from 'tencentcloud-sdk-nodejs/tencentcloud/services/sms/v20190711/sms_client'
import { NonEmptyArray, Logger } from './commons'

const SmsClient = tencentcloud.sms.v20190711.Client

export interface SmsConfig extends ClientConfig {
  TemplateID: string
  SmsSdkAppid: string
  Sign: string
}

export class TencentCloudSms {
  private logger: Logger = console

  private smsClient: SmsClientClass

  constructor(private smsConfig: SmsConfig, logger?: Logger) {
    this.smsClient = new SmsClient(smsConfig)
    this.logger = logger ?? this.logger
  }

  sendShortMessage(
    phones: NonEmptyArray<string>,
    TemplateParamSet: [string, string]
  ): void {
    this.smsClient
      .SendSms({
        PhoneNumberSet: phones,
        TemplateParamSet,
        TemplateID: this.smsConfig.TemplateID,
        SmsSdkAppid: this.smsConfig.SmsSdkAppid,
        Sign: this.smsConfig.Sign,
      })
      .then((data) => {
        this.logger.info(
          'use Tencent cloud sending short message successfully',
          data
        )
      })
      .catch((err) => {
        this.logger.error(
          'use Tencent cloud send short message unsuccessfully',
          err
        )
      })
  }
}
