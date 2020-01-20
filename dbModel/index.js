module.exports = {
    dbs: [
        {
            dataType: { name: String, pass: String, phone: String, email: String, roles: Number, createTime: Number },
            collection: "users"
        },
        {
            dataType: { url: String, headers: Object, type: Array || String, roles: Number },
            collection: "apiUrl"
        }
    ]
};