const fs = require('fs');
const f = require('./modules/functions');

exports.dbCreateCollection = (collection, store = "./data/") => {

    if (!fs.existsSync(store)) {
        fs.mkdirSync(store)
    } 
    if (!fs.existsSync(store + collection)) {
        fs.mkdirSync(store + collection)
    } 

    return store + collection
}

exports.dbInsert = (dataInsert, collection, store = "./data/") => {

    dbCreateCollection (collection, store)
    let id = f.crypto()
    let directory = store+collection+"/"+id+".json";

    fs.access(directory, fs.F_OK, (err) => {

        if (err) {
            fs.writeFile(directory, JSON.stringify(dataInsert), 'utf8', function(err) {
                if(err) throw err;
            });
        } 

        // else {
        //     fs.appendFile(directory, dataInsert, function (err) {
        //         if (err) throw err;
        //     });
        // }

    })

    return {
        id: id,
        directory: directory
    }
    
}

exports.dbGetIndex = (collection = null, store = "./data/") => {

    let directory 
        if( collection === null) { directory = store; } 
        else { directory = store+collection; }

    let response = fs.readdirSync(directory);
    let arrC = []
        response.forEach(r =>{
                arrC.push(r.replace(".json", ""))            
        })
    return arrC
}

exports.dbGetData = (id, collection, store = "./data/") => {

    let directory = store+collection+"/"+id+".json";

    return fs.readFileSync(directory, 'utf-8');

}
