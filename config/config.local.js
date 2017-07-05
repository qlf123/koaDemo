/**
 * Created by qinlifang on 2017/7/4.
 */
const config = {
  mysql: {
    database: 'hbb_growup_wx_garden',
    username: 'root',
    password: '123456',
    host: 'localhost',
    port: 3306
  },

  qiniu: {
    ak: 'A7x1E0ygz5XWHtbCiu8t4_6NqptWQ7Ma8oY3ysMN',
    sk: 'CGC-eriN03MfpJluhizyMFWMs0mfeyIpaHCuUTCi',
    bucket: 'hbb-growup-wechat',
    host: 'http://oibzvf99m.bkt.clouddn.com'
  }
}

module.exports = config;