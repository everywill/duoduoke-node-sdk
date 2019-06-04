# duoduoke-node-sdk
拼多多开放平台多多客node sdk，欢迎issue和pr。

#### 安装
使用npm:
```
npm i duoduoke-node-sdk -S
```
或者yarn:
```
yarn add duoduoke-node-sdk
```

#### 引入文件
```
const PddClient = require('duoduoke-node-sdk')
```

#### 配置
使用多多客联盟的client_id，client_secret和api的endpoint进行初始化:
```
const client = new PddClient({
  clientId: 'your client_id',
  clientSecret: 'your client_secret',
  endpoint: 'pinduoduo open endpoint', // 默认为 http://gw-api.pinduoduo.com/api/router
})
```

#### API
例如查询商品： 
```
client.execute('pdd.ddk.goods.search', {
      keyword: '逆水寒',
      page: 1,
      page_size: 20,
      sort_type: 0,
      with_coupon: false,
    })
```
注意调用api返回的都是promise，因此可使用async/await。
