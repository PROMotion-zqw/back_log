module.exports = {
    dbs: [
        {
            dataType: { name: String, pass: String, phone: String, email: String, roles: Number, createTime: Number },
            collection: "users"
        },
        {
            dataType: { url: String, headers: Object, type: Array || String, roles: Number },
            collection: "apiUrl"
        },
        {
            dataType: {
                v: String,
                n: String,
                adj: String,
                adv: String,
                back_color: Boolean,
                pron: String,
                prep: String,
                vi: String,
                vt: String,
                s: String,
                conj: String,
                ctrl: Number,
                sc: String,
                o: String,
                oc: String,
                "aux v": String,
                art: String,
                num: String,
                u: String,
                c: String,
                pl: String,
                en: String,
                ps: String,
                desc: String,
                det: String,
                int: String,
                audio: Boolean
            },
            collection: "wordTable"
        }
    ]
};