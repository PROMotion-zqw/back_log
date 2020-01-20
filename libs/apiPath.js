module.exports = async function (db, ob) {
    let { apiUrl } = db;
    await apiUrl.find().then(res => {
        res.filter((item, index) => {
            let i= item.url.lastIndexOf('/')+1,
            k = item.url.slice(i);
            ob[k] = item;
        })
    }).catch(err => {
        console.log('er em', err);
    })
    if(JSON.stringify(ob) !== "{}") {
        return ob
    }
    ob = null;
}