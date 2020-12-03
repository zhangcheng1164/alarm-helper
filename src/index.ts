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

  setSmsAlarm(
    phonesGetter: () => Promise<string[]>,
    smsConfig: SmsConfig
  ): void {
    this.sms = new TencentCloudSms(smsConfig, this.logger)

    this.on('alarm', async (msg: string, engineAddress: string) => {
      const phones = await phonesGetter()
      if (phones.length) {
        this.sms?.sendShortMessage(phones as NonEmptyArray<string>, [
          msg,
          engineAddress,
        ])
      }
    })
  }

  setDmsAlarm(
    emailsGetter: () => Promise<string[]>,
    dmsConfig: DmsConfig
  ): void {
    this.dms = new AliyunDms(dmsConfig, this.logger)

    this.on('alarm', async (msg: string, engineAddress: string) => {
      const emails = await emailsGetter()
      if (emails.length) {
        this.dms?.sendEmail(
          emails as NonEmptyArray<string>,
          '云告警',
          `告警内容: ${msg}, 告警平台: ${engineAddress}`
        )
      }
    })
  }

  alarm(msg: string, engineAddress: string): void {
    this.emit('alarm', msg, engineAddress)
  }
}
