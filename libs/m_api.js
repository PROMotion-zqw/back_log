module.exports = {
    attrEmpty: function (n, arrKey) {
        let msg = "";
        if (!arrKey) {
            Object.keys(n).filter((v, i) => {
                if (!n[v] && n[v] !== 0) {
                    !msg ? msg = `param '${v}' is empty` : null;
                }
            })
        } else {
            arrKey.filter((ark, ari) => {
                if (ark in n) {
                    if (!n[ark] && n[ark] !== 0) {
                        !msg ? msg = `param '${ark}' is empty` : null;
                    }
                } else {
                    !msg ? msg = `param '${ark}' is empty` : null;
                }
            })
        }
        if (!msg) {
            return null
        }
        return msg
    }
}