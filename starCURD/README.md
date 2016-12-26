# 明星管理!
- 启动mongodb
- 录入数据: 'node add.js'

## 接口文档
- http://127.0.0.1:3000


### 获取分页明星数据
- 请求地址(url)     : `/starlist`
- 请求类型(type)    : `GET`
- 请求所需参数(data):

```javascript
    {
        start: Number, // 表示从数据库中第几条数据开始获取
        count: Number, // 表示从数据库中获取几条数据
    }
```
- 返回结果

```javascript
    {
        status: String , // 值为'ok'时表示请求成功!
        total:Number,    // 表示总共有多少条数据
        starList: Array  // 取回的数据
    }
```

### 删除指定明星的数据
- 请求地址(url)     : `/delete`
- 请求类型(type)    : `POST`
- 请求所需参数(data):

```javascript
    {
        _id: String // 数据的唯一标识，在获取数据时，会随便数据一起得到。
    }
```
- 返回结果

```javascript
    {
        status: String , // 值为'ok'时表示请求成功!,为'err'时表示操作失败
    }
```

### 获取单个明星的详细信息
- 请求地址(url)     : `/stardetails`
- 请求类型(type)    : `POST`
- 请求所需参数(data):

```javascript
    {
        _id: String // 数据的唯一标识，在获取数据时，会随便数据一起得到。
    }
```
- 返回结果

```javascript
    {
        status: String , // 值为'ok'时表示请求成功!,为'err'时表示操作失败
    }
```

### 上传图片
- 请求地址(url)     : `/saveimg`
- 请求类型(type)    : `POST`
- 请求所需参数(data): 直接使用file上传图片即可
- 返回结果

```javascript
    {
        status: String,// 值为'ok'时表示请求成功!,为'err'时表示操作失败
        filename: String, // 新上传的图片的路径，不包ip和端口
    }
```


### 保存单个明星信息
- 请求地址(url)     : `/savestar`
- 请求类型(type)    : `POST`
- 请求所需参数(data): 

```javascript
    {
        _id: String, // 数据的唯一标识
        realName: String,
        stageName: String,
        birth: String,
        works: String,
        poster: String,
        summary: String
    }
```

- 返回结果

```javascript
    {
        status: String,// 值为'ok'时表示请求成功!,为'err'时表示操作失败
    }
```

### 添加一条新的明星信息
- 请求地址(url)     : `/addstar`
- 请求类型(type)    : `POST`
- 请求所需参数(data): 

```javascript
    {
        realName: String,
        stageName: String,
        birth: String,
        works: String,
        poster: String,
        summary: String
    }
```

- 返回结果

```javascript
    {
        status: String,// 值为'ok'时表示请求成功!,为'err'时表示操作失败
    }
```