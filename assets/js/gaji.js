async function iniFunction(fn = "none", id = "", from = "") {
    if (fn != "none") {
        let sql = await api("sys/api?act=detailFunction&fn=" + fn);
        let setting = sql.Form;
        let form = JSON.parse(setting);
        rendForms(form, "divFunction");
        if (id != "") {
            var exec = window[fn];
            if (typeof exec === 'function') exec(id, from);
        }
    }else{
        GI("divFunction").innerHTML = "";
    }
}

async function fungsifnHarian(id = "", from = "") {
    if (id != "none") {
        let url = from != "" ? `sys/api?act=detailKomponenGajiKaryawan2&id=${id}` : `sys/api?act=detailKomponenGaji&id=${id}`;
        let sql = await api(url);
        let total = 0;
        let type = GI("edtTypeGaji").value;
        if (sql.FN != null) {
            let setting = JSON.parse(sql.Setting);
            type = setting.type;
            total = setting.total;
            GI("opt" + setting.type).selected = true;
        }
        if (type == "total") {
            GI("edtTotalJam").disabled = false;
            GI("edtTotalJam").value = total;
        } else {
            GI("edtTotalJam").disabled = true;
        }
    } else {
        let type = GI("edtTypeGaji").value;
        if (type == "total") {
            GI("edtTotalJam").disabled = false;
            GI("edtTotalJam").value = "0";
        } else {
            GI("edtTotalJam").disabled = true;
        }
    }
}