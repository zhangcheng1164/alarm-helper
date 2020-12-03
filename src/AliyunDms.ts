import Core from '@alicloud/pop-core'
import { NonEmptyArray, Logger } from './commons'

export interface DmsConfig extends Core.Config {
  AccountName: string
}

export class AliyunDms {
  private client: Core

  private logger: Logger = console

  constructor(private config: DmsConfig, logger?: Logger) {
    this.client = new Core(config)
    this.logger = logger ?? this.logger
  }

  async sendEmail(
    ToAddresses: NonEmptyArray<string>,
    Subject: string,
    TextBody: string
  ): Promise<void> {
    const params = {
      RegionId: 'cn-hangzhou',
      AccountName: this.config.AccountName,
      AddressType: 1,
      ReplyToAddress: false,
      ToAddress: ToAddresses.join(','),
      Subject,
      TextBody,
    }

    const requestOption = {
      method: 'POST',
    }

    await this.client.request('SingleSendMail', params, requestOption).then(
      (result) => {
        this.logger.info('use Tencent cloud sending email successfully', result)
      },
      (ex) => {
        this.logger.error('use Tencent cloud sending email unsuccessfully', ex)
      }
    )
  }
}
