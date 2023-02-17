const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const database_url = 'mongodb://localhost:27017';
const database_name = 'studyVue';
// const database_name = 'xinhui';

async function connect(){
    let client = await MongoClient.connect(database_url,{ useNewUrlParser: true });
    let db = client.db(database_name);
    return {db,client}
}


exports.insert = async (colName,data)=>{

    let {db,client} = await connect();


    // console.log('client',client)
    // console.log('db',db)
    let collection = db.collection(colName);
    let res = await collection[Array.isArray(data)?'insertMany':'insertOne'](data);

    client.close();

    return res;
}

exports.delete = async (colName,query)=>{

    let {db,client} = await connect();

    let collection = db.collection(colName);
    let res = await collection['deleteMany'](query);

    client.close();

    return res;
}

exports.update = async (colName,query,newData)=>{

    let {db,client} = await connect();

    let collection = db.collection(colName);
    let res = await collection['updateMany'](query,newData);

    client.close();

    return res;
}

exports.find = async (colName,query)=>{

    let {db,client} = await connect();

    let collection = db.collection(colName);
    let res = await collection.find(query).toArray();
    client.close();

    // 返回查询结果
    return res;
}

exports.findTime = async(colName,query)=>{
    let {db,client} = await connect();

    let collection = db.collection(colName);
    let res = await collection.find()
    client.close();
}

// 分页查询
exports.findPage = async(colName,query)=>{
    let size = query.pageSize*1
    let idx = query.pageIndex*1
    let {db,client} = await connect();
    let collection = db.collection(colName);
    let res = await collection.find({}).limit(size).skip((idx-1)*size).sort({}).toArray();
    client.close();

    return res
}
// 总条数查询
exports.count = async(colName,query)=>{
    let {db,client} = await connect();
    let collection = db.collection(colName);
    let res = await collection.find({}).count();
    client.close();

    return res
}