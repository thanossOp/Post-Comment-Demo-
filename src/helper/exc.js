function exc(data={} , exclude=[],include=[]) {
    exclude =[...exclude,'createdAt',"updatedAt",'deletedBy','deletedAt','isDeleted','author']

    if('toJSON' in data){
        data = {...data.toJSON()}
    }

    for(const key of exclude){
        if(key in data){
            delete data[key]
        }
    }
    return data
}

function excforarray(d=[],exclude=[]) {
    let data = []

    for(let value of d){
        data.push(exc(value,exclude))
    }

    return data
}

module.exports = {exc, excforarray}