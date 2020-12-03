import { EventEmitter } from 'events'
import { AliyunDms, DmsConfig } from './AliyunDms'
import { TencentCloudSms, SmsConfig } from './TencentCloudSms'
import { NonEmptyArray, Logger } from './commons'

export type NoEmptyArrayGetter<T> = () => Promise<NonEmptyArray<T>>

export class AlarmService extends EventEmitter {
  private dms?: AliyunDms

  private sms?: TencentCloudSms

  private logger: Logger = console

  constructor(logger?: Logger) {
    super()
    this.logger = logger ?? this.logger
  }

  async setSmsAlarm(
    phonesGetter: NoEmptyArrayGetter<string>,
    smsConfig: SmsConfig
  ): Promise<void> {
    this.sms = new TencentCloudSms(smsConfig, this.logger)
    const phones = await phonesGetter()

    this.on('alarm', (msg: string, engineAddress: string) => {
      this.sms?.sendShortMessage(phones, [msg, engineAddress])
    })
  }

  async setDmsAlarm(
    emailsGetter: NoEmptyArrayGetter<string>,
    dmsConfig: DmsConfig
  ): Promise<void> {
    const emails = await emailsGetter()
    this.dms = new AliyunDms(dmsConfig, this.logger)

    this.on('alarm', (msg: string, engineAddress: string) => {
      this.dms?.sendEmail(
        emails,
        '云告警',
        `告警内容: ${msg}, 告警平台: ${engineAddress}`
      )
    })
  }

  alarm(msg: string, engineAddress: string): void {
    this.emit('alarm', msg, engineAddress)
  }
}
