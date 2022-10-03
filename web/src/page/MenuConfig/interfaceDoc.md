# 菜单配置页

## 新建

`put` /create

- request

后端新建数据时 hidden 默认为 true

```
{
    pGuid:'1234-5678'
}
```

- response

```
{
    success:true,
    data: {
        guid:'1234-5678',
        ...
    }
}
```

## 保存

`post` /update

- request

```
{
    guid:'1234-5678',
    pGuid:null,
    title:'菜单名',
    path:'/routePath',
    hidden:true
}
```

- response

```
{
    success:true,
    data: {
        guid:'1234-5678',
        ...
    }
}
```

## 获取菜单树

`get` /getMenuTree

- request

```
{}
```

- response

```
{
    success:true,
    data: [
        {
            guid:'1234-5678',
            pGuid:null,
            title:'一级菜单',
            path:'/',
            hidden:true,
            children: [
                    {
                        guid:'1234-5678',
                        pGuid:null,
                        title:'二级菜单',
                        path:'/',
                        hidden:true,
                        children:[
                            {
                                guid:'1234-5678',
                                pGuid:null,
                                title:'三级菜单',
                                path:'/routePath',
                                hidden:true,
                                ...
                            },
                        ]
                        ...
                    },
            ]
            ...
        },

    ]
}
```

## 根据 guid 获取菜单详情

`get` /getMenuDetailByGuid/{guid}

- request

```
{}
```

- response

```
{
    success:true,
    data: [
        {
            guid:'1234-5678',
            pGuid:null,
            title:'一级菜单',
            path:'/routePath',
            hidden:true,
            ...
        },

    ]
}
```

## 根据 guid 删除菜单

`del` /delMenuByGuid/{guid}

- request

```
{
    guid:'1234-5678'
}
```

- response

```
{
    success:true,
    data: [
        {}
    ]
}
```
