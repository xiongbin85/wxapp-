const db = wx.cloud.database()
//查询数据库信息
export async function get(_collection, _where = {}) {
    //_collection数据库里面的集合
    //_where查询条件  
    let res = await db.collection(_collection).where(_where).get()
    return res
}
//添加数据库信息
export async function add(_collection, data = {}) {
    //_collection数据库里面的集合 
    //data添加的数据 data={username:"xxx",sex:"x"}
    let res = await db.collection(_collection).add({
        data
    })
    return res
}
//修改数据库信息
export async function update(_collection, params = {}, data = {}) {
    //_collection数据库里面的集合
    //params查询条件 params={_id:xxx}
    //attr 修改的内容
    let res = await db.collection(_collection).doc(params).update({
        data
    })
    return res
}
//删除数据库信息
export async function del(_collection, params = "") {
    //_collection数据库里面的集合
    //params查询条件 params=_id
    let res = await db.collection(_collection).doc(params).remove()
    return res
}
//字段自增减
export async function inc(_collection, _id, data={}) {
    //_collection数据库里面的集合
    //_id=""
    //data={code:_.inc(1)}
    return await db.collection(_collection).doc(_id).update({
        data
    })
}
//条件查询加分页
export async function skip(_collection,_where={},skip,limit){
    //skin跳过多少条数据
    //limit拿多少条数据
    return await db.collection(_collection).where(_where).skip(skip).limit(limit).get()
}
//分页
export async function onlySkip(_collection,_skip,_limit){
    //skin跳过多少条数据
    //limit拿多少条数据
    return await db.collection(_collection).skip(_skip).limit(_limit).get()
}