import { AlarmService, NoEmptyArrayGetter } from './index'
import { SmsConfig } from './TencentCloudSms'
import { DmsConfig } from './AliyunDms'

const as = new AlarmService()

// 换成自己的相关数据，参考： https://cloud.tencent.com/document/api/382/38778
const smsConfig: SmsConfig = {
  credential: {
    secretId: '',
    secretKey: '',
  },
  region: '',
  profile: {
    httpProfile: {
      endpoint: 'sms.tencentcloudapi.com',
    },
  },
  TemplateID: '',
  SmsSdkAppid: '',
  Sign: '',
}

// 换成自己的相关号码
const phonesGetter: NoEmptyArrayGetter<string> = async () => [
  '+8618612312345',
  '+8618612312345',
]

as.setSmsAlarm(phonesGetter, smsConfig)

// 换成自己的相关数据，参考 https://help.aliyun.com/document_detail/29444.html
const dmsConfig: DmsConfig = {
  accessKeyId: '',
  accessKeySecret: '',
  endpoint: 'https://dm.aliyuncs.com',
  apiVersion: '2015-11-23',
  AccountName: '',
}

// 换成自己的邮箱
const emailsGetter: NoEmptyArrayGetter<string> = async () => [
  'a@m.com',
  'aa@qq.com',
]
as.setDmsAlarm(emailsGetter, dmsConfig)

setTimeout(() => {
  as.alarm('aaa', 'bbb')
}, 1000)

setTimeout(() => {
  console.log('--- exit ---')
}, 1000 * 10)
