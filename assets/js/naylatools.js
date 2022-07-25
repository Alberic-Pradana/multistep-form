let __resolusi = window.matchMedia("(max-width: 768px)");
// fungsi untuk submit form dengan ajax
function submitForm(e, opt) {
    e.preventDefault();
    e.stopPropagation();
    let iniForm = opt.form ? opt.form : "#iniForm";
    let form = document.querySelector(iniForm);
    if (e.target.checkValidity()) {
        let url = "";
        if (location.hostname == "localhost") {
            url = opt.url ? opt.url : window.location.pathname.substring(5);
        } else {
            url = opt.url ? opt.url : window.location.pathname.substring(1);
        }
        let div = opt.div ? opt.div : "tampil",
            modal = opt.modal ? opt.modal : "ya",
            btnSimpan = form.querySelectorAll("button[type='submit']")[0],
            lblSimpan = btnSimpan.querySelectorAll(".material-icons")[0],
            oldBtnCap = lblSimpan.innerHTML.trim(),
            btnTutup = opt.tutup ? opt.tutup : "tutupModal";
        let data = new FormData(e.target);
        lblSimpan.className = "spinner-border spinner-border-sm";
        lblSimpan.innerHTML = "";
        btnSimpan.disabled = true;
        if (modal == "ya") {
            if (document.getElementById(btnTutup)) document.getElementById(btnTutup).disabled = true;
            if (document.getElementById("dismissModal")) document.getElementById("dismissModal").disabled = true;
        }
        let crud = opt.crud ? opt.crud : 'sys/crud';
        fetch(crud, {
            method: 'POST',
            body: data
        }).then(response => response.text()).then(hasil => {
            if (isJson(hasil) == true) {
                let res = JSON.parse(hasil);
                if (res.status == "sukses") {
                    pesan("Proses Berhasil", res.pesan, "primary");
                    if (opt.fn) {
                        execFunction(opt.fn);
                    } else {
                        load(`view/${url}`, div);
                    }
                    if (res.cetak) {
                        cetakInvoice(res.cetak);
                    }
                    if (modal == "ya") {
                        if (document.getElementById(btnTutup)) document.getElementById(btnTutup).disabled = false;
                        if (document.getElementById("dismissModal")) document.getElementById("dismissModal").disabled = false;
                        if (document.getElementById(btnTutup)) document.getElementById(btnTutup).click();
                    }
                } else if (res.status == "gagals") {
                    if (res.pesan == "Stok Minus") {
                        modalStokMinus(res.data);
                        lblSimpan.innerHTML = oldBtnCap;
                        lblSimpan.className = "material-icons";
                        btnSimpan.disabled = false;
                    }
                } else {
                    pesan("Proses Gagal", res.pesan, "danger");
                    lblSimpan.innerHTML = oldBtnCap;
                    lblSimpan.className = "material-icons";
                    btnSimpan.disabled = false;
                    if (modal == "ya") {
                        document.getElementById(btnTutup).disabled = false;
                        document.getElementById("dismissModal").disabled = false;
                    }
                }
            } else {
                console.log(hasil);
                pesan("Proses Gagal", "Mohon maaf terjadi kesalahan ketika memproses", "danger");
                lblSimpan.innerHTML = oldBtnCap;
                lblSimpan.className = "material-icons";
                btnSimpan.disabled = false;
                if (modal == "ya") {
                    document.getElementById(btnTutup).disabled = false;
                    document.getElementById("dismissModal").disabled = false;
                }
            }
        }).catch((error) => {
            lblSimpan.innerHTML = oldBtnCap;
            lblSimpan.className = "material-icons";
            btnSimpan.disabled = false;
            document.getElementById(btnTutup).disabled = false;
            document.getElementById("dismissModal").disabled = false;
            pesan("Proses Gagal", "Mohon maaf terjadi kesalahan ketika memproses", "danger");
            console.log("Error: " + error);
        });
    } else {
        let forms = document.getElementsByClassName('needs-validation');
        let validation = Array.prototype.filter.call(forms, function (form) {
            form.classList.add('was-validated');
        });
    }
}

// fungsi untuk mengambil data ke server
function load(url, id = "tampil") {
    fetch(encodeURI(url)).then(response => response.text()).then(hasil => {
        document.getElementById(id).innerHTML = hasil;
        if (hasil.includes("<script>")) {
            for (let i = 0; i < (hasil.match(/<script>/g) || []).length; i++) {
                let start = hasil.indexOf("<script>", i) + 8;
                let end = hasil.indexOf("</script>", i);
                let script = hasil.substring(start, end);
                let node = document.createElement("script");
                let ss = document.createTextNode(script);
                node.appendChild(ss);
                document.getElementById(id).appendChild(node);
            }
        }
    }).catch((error) => {
        console.log("Error: " + error);
    });
}

// fungsi untuk menampilkan modal bootstrap
function modal(opt) {
    let url = opt.url ? opt.url : "",
        jenis = opt.cls ? opt.cls : " ",
        id = opt.id ? opt.id : "modal",
        data = opt.data ? opt.data : "url",
        static = opt.static == "tidak" ? "" : `data-bs-backdrop="static"`,
        node = document.createElement("div");
    node.innerHTML = ` <div data-bs-target="#${id}" data-bs-toggle="modal" id="triger${id}"></div>
                        <div class="modal fade" ${static} id="${id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog ${jenis}" id="jenis${id}">
                                <div class="modal-content" style="border-radius:25px" id="modalKonten${id}">
                                </div>
                            </div>
                        </div>`;
    document.getElementById("divModal").appendChild(node);
    let konten = document.getElementById('modalKonten' + id);
    konten.innerHTML = `<div class="modal-header">
                        <div class="mid-big-subtitle lazyColor"></div>
                        </div>
                        <div class="modal-body" id="modalBody${id}">
                        <div class="mid-big lazyColor"></div>
                        <div class="mid-big-subtitle lazyColor"></div>
                        <div class="mid lazyColor"></div>
                        </div>
                        <div class="modal-footer">
                        <div class="mid-big-subtitle lazyColor"></div>
                        </div>`;
    if (data == "url") {
        load(url, 'modalKonten' + id);
    } else {
        konten.innerHTML = opt.data;
    }
    let script = document.createElement("script");
    let ss = document.createTextNode(`
        document.getElementById('${id}').addEventListener('hidden.bs.modal', function (e) {
            document.getElementById("${id}").remove();
            document.getElementById("triger${id}").remove();
        });
        document.getElementById('${id}').addEventListener('shown.bs.modal', function() {
            var fokus = document.getElementsByClassName("fokus")[0];
            if (fokus != undefined) {
                fokus.focus();
            }
        });
    `);
    script.appendChild(ss);
    document.getElementById("modalKonten" + id).appendChild(script);
    document.getElementById(`triger${id}`).click();
}

// fungsi untuk merender modal di bootstrap
function rendModal(opt) {
    let frmFn = opt.fn || `submitForm(event, {fn:'main'});`;
    let frmID = opt.frmID || "iniForm";
    let forms = opt.form == true ? `<form id="${frmID}" onsubmit="${frmFn}" class="needs-validation" novalidate>` : "";
    let forme = opt.form == true ? `</form>` : "";
    let title = opt.title || "";
    let foot = opt.footer || "";
    let btnFoot = foot == "btnSave" ? `<button type="submit" class="btn btn-default" id="btnSimpan"><span class="material-icons">save</span> Simpan </button>` : foot;
    let btnCls = opt.btn || "tutupModal";
    let id = opt.id || "iniModal";
    let cls = opt.cls || "";
    let body = opt.body || `<div class="mid-big lazyColor"></div> <div class="mid-big-subtitle lazyColor"></div> <div class="mid lazyColor"></div>`;
    let static = opt.static == "tidak" ? "" : `data-bs-backdrop="static"`;
    let node = document.createElement("div");
    node.innerHTML = `<div data-bs-target="#${id}" data-bs-toggle="modal" id="triger${id}"></div>
                <div class="modal fade" ${static} id="${id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog ${cls}" id="jenis${id}">
                        <div class="modal-content shadow2" style="border-radius:25px" id="modalKonten${id}">
                        ${forms}
                            <div class="modal-header">
                                <h5 class="modal-title">${title}</h5>
                                <button type="button" class="btn-close-modal" data-bs-dismiss="modal" id="dismissModal">
                                    <span class="material-icons">close</span>
                                </button>
                            </div>
                            <div class="modal-body" id="modalBody${id}">
                                ${body}
                            </div>
                            <div class="modal-footer">
                                <button type="button" id="${btnCls}" class="btn btn-secondary mr-auto" data-bs-dismiss="modal">Batal</button>
                                ${btnFoot}
                            </div>
                        ${forme}
                        </div>
                    </div>
                </div>`;
    document.getElementById("divModal").appendChild(node);
    let script = document.createElement("script");
    let ss = document.createTextNode(`
        document.getElementById('${id}').addEventListener('hidden.bs.modal', function (e) {
            document.getElementById("${id}").remove();
            document.getElementById("triger${id}").remove();
        });
        document.getElementById('${id}').addEventListener('shown.bs.modal', function() {
            var fokus = document.getElementsByClassName("fokus")[0];
            if (fokus != undefined) {
                fokus.focus();
            }
        });
    `);
    script.appendChild(ss);
    document.getElementById("modalKonten" + id).appendChild(script);
    document.getElementById(`triger${id}`).click();
}

// fungsi untuk format currency
function numberFormat(val, ini = false) {
    let formatter = new Intl.NumberFormat("en-GB", { style: "decimal" });
    let nmr = 0, result = "";
    if (val != null || val != undefined) {
        if (!isNaN(intFormat(val))) nmr = intFormat(val);
        result = formatter.format(nmr.toString().replace(/,/g, ""));
    }
    if (ini != false) {
        let pss = getCursorPos(ini);
        setCursorPos(ini, pss.start, pss.end);
        ini.value = result;
    } else {
        return result;
    }
}

function intFormat(ini) {
    let data = ini.toString().replace(/,/g, "");
    let data2 = data.replaceAll(".", "");
    return data2;
}

function getCursorPos(input) {
    return {
        start: input.selectionStart,
        end: input.selectionEnd
    };
}

function setCursorPos(input, start, end) {
    setTimeout(function () {
        input.selectionStart = start;
        input.selectionEnd = end;
    }, 1);
}

function stringFormat(ini) {
    let data1 = ini.replace(/'/g, "");
    let data2 = data1.replace(/"/g, '');
    let data3 = data2.replace(/`/g, '');
    return data3;
}

function stringAman(val = "") {
    let vl = String(val);
    if (vl != "") {
        let val1 = vl.replaceAll("'", "");
        let val2 = val1.replaceAll('"', '');
        let val3 = val2.replaceAll('\\', '');
        return (val3);
    } else {
        return "";
    }
}

function addslashes(val) {
    return val.replace("'", "\'").replace('"', '\"');
}

// fungsi untuk merender lazy load
function malesLoad(lokasi = "tampil", col = 4, row = 3, th = "no") {
    let div = `<table class="table table-bordered"><tbody>`;
    if (th != "no") div = `<table class="table table-bordered"><thead class="color-bg-biru"><tr><td colspan="${col}">Memuat Data . . .</td></tr></thead><tbody>`;
    for (let i = 0; i < row; i++) {
        if (i % 2 == 0) {
            div += `<tr>`;
            for (let r = 0; r < col; r++) {
                if (r % 2 == 0) {
                    div += `<td> <div class="mid lazyColor"></div> </td>`;
                } else {
                    div += `<td> <div class="mid-big-subtitle lazyColor"></div></td>`;
                }
            }
            div += `</tr>`;
        } else {
            div += `<tr>`;
            for (let r = 0; r < col; r++) {
                if (r % 2 == 0) {
                    div += `<td> <div class="mid-big-subtitle lazyColor"></div> </td>`;
                } else {
                    div += `<td> <div class="mid lazyColor"></div></div></td>`;
                }
            }
            div += `</tr>`;
        }
    }
    div += `</tbody> </table>`;
    if (GI(lokasi)) GI(lokasi).innerHTML = div;
}

// fungsi untuk menampilkan pesan
function pesan(title, details, jenis = "primary", waktu = 5000) {
    let node = document.createElement("div");
    node.className = `alert alert-${jenis} alert-dismissible animated flipInX`;
    node.innerHTML = `
                <strong>${title}</strong>
                <p>${details}</p>
                <span class="btn close" data-bs-dismiss="alert">
                    <i class='material-icons cursor'>close</i>
                </span>`;
    document.getElementById("divPesan").appendChild(node);

    setTimeout(function () {
        node.className += " flipOutX";
        setTimeout(function () {
            node.remove();
        }, 1000);
    }, waktu);
}

// fungsi untuk membuat format taggal indonesia
function tanggalIndo(data) {
    let BulanIndo = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agust", "Sept", "Okt", "Nov", "Des"];
    let tahun = data.substring(2, 4);
    let bulan = data.substring(5, 7);
    let tgl = data.substring(8, 10);
    let result = `${tgl} ${BulanIndo[bulan - 1]} ${tahun}`;
    return result;
}

function edtCurrency(ini) {
    ini.value = numberFormat(ini.value.toString().replace(/,/g, ""));
}

// fungsi untuk membuat tampilan bulan dan tahun
function TampilBulan(date) {
    let bulan = date.substring(5);
    let tahun = date.substring(0, 4);
    let BulanIndo = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Dessember"];
    let hasil = `${BulanIndo[bulan - 1]} ${tahun}`;
    return hasil;
}

function cari(row = 5, div = "tbodyData") {
    let table = document.getElementById('edtPath').value;
    let q = stringFormat(document.getElementById("edtQ").value);
    let by = document.getElementById('edtOrder').value;
    let s = document.getElementById('edtSort').value;
    malesLoad(div, row, 3);
    load(`view/${table}&q=${q}&s=${s}&b=${by}`, div);
}

function sort(val, ll = 5, table = "tbodyData") {
    document.getElementById('edtSort').value = val;
    var sort = document.getElementById('edtSort').value ? document.getElementById('edtSort').value : "ID";
    var order = document.getElementById('edtOrder').value ? document.getElementById('edtOrder').value : "ASC";
    if (order == "ASC") {
        document.getElementById('edtOrder').value = "DESC";
    } else {
        document.getElementById('edtOrder').value = "ASC";
    }
    var q = document.getElementById('edtQ').value ? document.getElementById('edtQ').value : "";
    var path = document.getElementById('edtPath').value ? document.getElementById('edtPath').value : "barang";
    malesLoad(table, ll, 3);
    load(`view/${path}&s=${sort}&b=${order}&q=${q}`, table);
}

function rendPaggination(page, jml, ll = 5, td = "tbodyData", pg = "paggination") {
    let table = document.getElementById('edtPath').value;
    let q = stringFormat(document.getElementById("edtQ").value);
    let b = document.getElementById('edtOrder').value;
    let s = document.getElementById('edtSort').value;
    let max = __resolusi.matches == true ? 4 : 8;
    let awal = 0;
    let akhir = 0;
    if (jml > 0) {
        let div = `<ul class="pagination justify-content-center">`;
        if (page == 1) {
            div += `<li class="page-item"><span class="page-link"><i class="material-icons" style="cursor:not-allowed; font-size:12px; display: inline-flex; vertical-align: middle;">keyboard_arrow_left</i></span></li>`;
        } else {
            div += `<li class="page-item" onclick="pagination('${table}&p=${parseInt(page) - 1}&q=${q}&s=${s}&b=${b}', '${td}', ${ll});"><span class="page-link"><i class="material-icons" style="font-size:12px; display: inline-flex; vertical-align: middle;">keyboard_arrow_left</i></span></li>`;
        }
        if (page > 7) { awal = page; } else { awal = 1; }
        if (jml > max) { if (page > max - 1) { akhir = parseInt(page) + 7; } else { akhir = max; } } else { akhir = jml; }
        for (let i = awal; i <= akhir; i++) {
            if (page == i) {
                div += `<li class="page-item" style="cursor:not-allowed;"><a class="page-link active-paggination" href="javascript:">${i}</a></li>`;
            } else {
                div += `<li class="page-item" onclick="pagination('${table}&p=${i}&q=${q}&s=${s}&b=${b}', '${td}', ${ll});"><a class="page-link" href="#">${i}</a></li>`;
            }
        }
        if (page == jml) {
            div += `<li class="page-item"><span class="page-link"><i class="material-icons" style="cursor:not-allowed; font-size:12px; display: inline-flex; vertical-align: middle;">keyboard_arrow_right</i></span></li>`;
        } else {
            div += `<li class="page-item" onclick="pagination('${table}&p=${parseInt(page) + 1}&q=${q}&s=${s}&b=${b}', '${td}', ${ll});"><a class="page-link" href="#"><i class="material-icons" style="font-size:12px; display: inline-flex; vertical-align: middle;">keyboard_arrow_right</i></a></li>`;
        }
        document.getElementById(pg).innerHTML = div;
    } else {
        document.getElementById(pg).innerHTML = "";
    }
}

function pagination(act, tbody, td) {
    malesLoad(tbody, td, 3);
    load('view/' + act, tbody);
}

// fungsi untuk cek data json
function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

// fungsi untuk membuat random rgb
function random_rgba() {
    var o = Math.round,
        r = Math.random,
        s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
}

// fungsi untuk export data json ke excel
function exportData(sql, title, field = false) {
    let arr = [];
    let header = [];
    if (field == false) {
        for (th of sql.field.thead) if (th.type != "opsi") header.push(th.cap);
    } else {
        for (th of field) header.push(th.cap);
    }

    arr.push(header);
    for (i in sql.data) {
        let data = sql.data[i];
        var innerRowData = [];
        if (field == false) {
            for (b in sql.field.thead) {
                let td = sql.field.thead[b];
                if (td.type != "opsi") innerRowData.push(data[td.sort]);
            }
        } else {
            for (b in field) {
                let td = field[b];
                innerRowData.push(data[td.sort]);
            }
        }
        arr.push(innerRowData);
    }
    if (sql.total) {
        var innerRowData = [];
        for (tot of sql.total) {
            innerRowData.push(tot);
        }
        arr.push(innerRowData);
    }
    var filename = title + ".xlsx";
    var ws_name = "Data";
    var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.aoa_to_sheet(arr);
    XLSX.utils.book_append_sheet(wb, ws, ws_name);
    XLSX.writeFile(wb, filename);
}

function cetak(sql, title, field = false) {
    let myWindow = window.open('', '', 'width=1000,height=800');
    let thead = "<tr>";
    let TH = [];
    if (field == false) {
        TH = sql.field.thead;
        for (th of sql.field.thead) thead += `<th style="border: 1px solid black;">${th.cap}</th>`;
    } else {
        TH = field;
        for (th of field) thead += `<th style="border: 1px solid black;">${th.cap}</th>`;
    }
    thead += "</tr>";

    let tbody = "";
    for (i in sql.data) {
        let data = sql.data[i];
        let dom = `<tr>`;
        for (b in TH) {
            let td = TH[b];
            let Data = data[td.sort];
            if (td.type != "opsi") {
                if (td.type == "str") {
                    dom += `<td style="border: 1px solid black;">${Data}</td>`;
                } else {
                    if (isNaN(Data)) {
                        dom += `<td style="border: 1px solid black;">${Data}</td>`;
                    } else {
                        dom += `<td style="border: 1px solid black; text-align:right">${numberFormat(Data)}</td>`;
                    }
                }
            }
        }
        tbody += dom;
    }
    if (sql.total) {
        let tr = '<tr>';
        for (tot of sql.total) {
            if (isNaN(tot)) {
                tr += `<td style="border: 1px solid black;">${tot}</td>`;
            } else {
                tr += `<td style="border: 1px solid black; text-align:right">${numberFormat(tot)}</td>`;
            }
        }
        tr += `</tr>`;
        tbody += tr;
    }
    let table = `<h2 style="text-align:center">${title}</h2><table style="border: 1px solid black; width: 100%; border-collapse: collapse;">${thead}${tbody}</table>`;
    myWindow.document.write(table);
    myWindow.document.close();
    myWindow.focus();
    myWindow.print();
    myWindow.close();
}

// fungsi untuk mengambil data dari server
function api(url, data = []) {
    if (data.length == 0) {
        return new Promise((resolve, reject) => {
            fetch(encodeURI(url))
                .then(response => response.text())
                .then(hasil => {
                    if (location.hostname == "localhost") {
                        if (isJson(hasil)) {
                            console.log(JSON.parse(hasil));
                        } else {
                            console.log(hasil);
                        }
                    }
                    try {
                        if (isJson(hasil)) {
                            resolve(JSON.parse(hasil));
                        } else {
                            resolve(hasil);
                        }
                    } catch (e) {
                        resolve({ status: "gagal", pesan: "Terjadi kesalahan ketika memproses" });
                    }
                }).catch((error) => {
                    reject({ status: "gagal", pesan: error });
                });
        });
    } else {
        return new Promise((resolve, reject) => {
            fetch(encodeURI(url), {
                method: 'POST',
                body: jsonToForm(data),
            })
                .then(response => response.text())
                .then(hasil => {
                    if (location.hostname == "localhost") {
                        if (isJson(hasil)) {
                            console.log(JSON.parse(hasil));
                        } else {
                            console.log(hasil);
                        }
                    }
                    try {
                        if (isJson(hasil)) {
                            resolve(JSON.parse(hasil));
                        } else {
                            resolve(hasil);
                        }
                    } catch (e) {
                        resolve({ status: "gagal", pesan: "Terjadi kesalahan ketika memproses" });
                    }
                }).catch((error) => {
                    reject({ status: "gagal", pesan: error });
                });
        });
    }
}

// fungsi untuk merubah json ke formdata
function jsonToForm(data) {
    const formData = new FormData();
    for (let dt in data) {
        formData.append(dt, data[dt]);
    }
    return formData;
}

// fungsi untuk merender tabel
async function rendTable(opt) {
    let sql = opt.dataset ? opt.dataset : await api(opt.url);
    let __fn = opt.fn ? opt.fn : "main",
        __by = opt.by ? opt.by : "by",
        __sort = opt.sort ? opt.sort : "sort",
        __page = opt.page ? opt.page : "page",
        __tbodyid = opt.tbody.id ? opt.tbody.id : "tbodyData",
        table = document.createElement("table"),
        thead = table.createTHead(),
        tbody = table.createTBody();
    table.className = opt.table ? opt.table.cls : "table";
    thead.className = opt.thead ? opt.thead.cls : "";
    tbody.id = __tbodyid;
    let THEAD = `<tr>`;
    for (th of sql.field.thead) {
        if (th.type != "checkbox") {
            if (th.sort) {
                if (th.filter) {
                    THEAD += `<th class="cursor sort-by" width="${th.width}" data-val="${th.sort}">${th.cap} <span class="material-icons icon-filter" data-filter="${th.filter}">filter_alt</span></th>`;
                } else {
                    THEAD += `<th class="cursor sort-by" width="${th.width}" data-val="${th.sort}">${th.cap}</th>`;
                }
            } else {
                if (th.filter) {
                    THEAD += `<th class="cursor" width="${th.width}">${th.cap} <span class="material-icons icon-filter" data-filter="${th.filter}">filter_alt</span></th>`;
                } else {
                    THEAD += `<th class="cursor" width="${th.width}">${th.cap}</th>`;
                }
            }
        } else {
            THEAD += `<th class="cursor" width="${th.width}">
                        <div class="form-check" style="margin: 0; padding-top:10px">
                            <input class="form-check-input" type="checkbox" id="chkAll">
                            <label class="form-check-label" for="chkAll">${th.cap}</label>
                        </div>
                     </th>`;
        }
    }
    THEAD += `</tr>`;
    thead.innerHTML = THEAD;
    if (sql.data.length > 0) {
        for (i in sql.data) {
            let data = sql.data[i],
                dblclk = opt.tbody.dblclick ? `ondblclick="${opt.tbody.dblclick}" ` : "",
                click = opt.tbody.click ? `onclick="${opt.tbody.click}" ` : "",
                dom = `<tr data-id="${data.ID}" ${dblclk} ${click}>`;
            for (b in sql.field.thead) {
                let td = sql.field.thead[b];
                if (td.type == "opsi") {
                    dom += `<td><div class="opsi-desktop">`;
                    for (opsi of opt.tbody.opsi) {
                        if (opsi.type == "edit") {
                            dom += `<button type="button" class="btn-opsi" data-id="${data.ID}" onclick="${opsi.event}"><i class="material-icons">edit</i></button>`;
                        } else if (opsi.type == "other") {
                            dom += `<button type="button" class="btn-opsi" data-id="${data.ID}" onclick="${opsi.event}"><i class="material-icons">${opsi.icon}</i></button>`;
                        } else if (opsi.type == "view") {
                            dom += `<button type="button" class="btn-opsi" data-id="${data.ID}" onclick="${opsi.event}"><i class="material-icons">visibility</i></button>`;
                        } else if (opsi.type == "delete") {
                            dom += `<button type="button" class="btn-opsi" data-id="${data.ID}" onclick="${opsi.event}"><i class="material-icons">delete</i></button>`;
                        }
                    }
                    dom += `</div><div class="opsi-mobile"><button type="button" class="btn btn-outline-light btn-sm text-dark" data-bs-toggle="dropdown"><i class="material-icons">more_vert</i></button><div class="dropdown-menu dropleft">`;
                    for (opsi of opt.tbody.opsi) {
                        if (opsi.type == "edit") {
                            dom += `<button type="button" data-id="${data.ID}" class="dropdown-item" onclick="${opsi.event}"><i class="material-icons">edit</i> Edit</button>`;
                        } else if (opsi.type == "other") {
                            dom += `<button type="button" data-id="${data.ID}" class="dropdown-item" onclick="${opsi.event}"><i class="material-icons">${opsi.icon}</i> ${opsi.cap}</button>`;
                        } else if (opsi.type == "view") {
                            dom += `<button type="button" data-id="${data.ID}" class="dropdown-item" onclick="${opsi.event}"><i class="material-icons">visibility</i> Info</button>`;
                        } else if (opsi.type == "delete") {
                            dom += `<button type="button" data-id="${data.ID}" class="dropdown-item" onclick="${opsi.event}"><i class="material-icons">delete</i> Hapus</button>`;
                        }
                    }
                    dom += `</di></td>`;
                } else if (td.type == "checkbox") {
                    dom += `<td>
                                <div class="form-check" id="chkProses${data.ID}">
                                    <input class="form-check-input chk-trans" type="checkbox" value="${data.ID}" id="chk${data.ID}">
                                    <label class="form-check-label" for="chk${data.ID}">${data[td.sort]}</label>
                                </div>
                            </td>`;
                } else if (td.type == "month") {
                    dom += `<td>${TampilBulan(data[td.sort])}</td>`;
                } else if (td.type == "img") {
                    dom += `<td><img src="${data[td.sort]}" alt="img" width="50px" height="50px" style="border-radius:50%"></td>`;
                } else if (td.type == "str") {
                    dom += `<td>${data[td.sort]}</td>`;
                } else {
                    if (isNaN(data[td.sort])) {
                        if (Number.isNaN(Date.parse(data[td.sort]))) {
                            dom += `<td>${data[td.sort]}</td>`;
                        } else {
                            dom += `<td>${tanggalIndo(data[td.sort])}</td>`;
                        }
                    } else {
                        dom += `<td>${numberFormat(data[td.sort])}</td>`;
                    }
                }
            }
            dom += `</tr>`;
            tbody.innerHTML += dom;
        }
        let dom = "";
        if (sql.total) {
            dom += `<tr>`;
            for (total of sql.total) {
                if (isNaN(total)) {
                    dom += `<td style="font-weight:bold;">${total}</td>`;
                } else {
                    dom += `<td style="font-weight:bold;">${numberFormat(total)}</td>`;
                }
            }
            dom += `</tr>`;
        }
        tbody.innerHTML += dom;
    } else {
        tbody.innerHTML += `<tr><td colspan="${sql.field.thead.length}">Tidak ada data</td></tr>`;
    }
    let div = document.getElementById(opt.div);
    div.innerHTML = "";
    div.appendChild(table);
    // untuk fn paggination
    if (opt.paggination) {
        let divPG = opt.paggination.div ? opt.paggination.div : "paggination";
        rendPagginations({
            jml: sql.field.j,
            div: divPG,
            fn: __fn,
            tbody: opt.tbody.id ? opt.tbody.id : "tbodyData",
            td: sql.field.thead.length,
            page: __page
        });
    }
    // untuk fn sort
    let clsSort = document.querySelectorAll(".sort-by");
    clsSort.forEach(elm => {
        elm.addEventListener("click", function () {
            malesLoad(__tbodyid, sql.field.thead.length, document.getElementById(__tbodyid).rows.length);
            sessionStorage.setItem(__sort, this.dataset.val);
            if (sessionStorage.getItem(__by) == "ASC") {
                sessionStorage.setItem(__by, "DESC");
            } else {
                sessionStorage.setItem(__by, "ASC");
            }
            execFunction(__fn);
        });
    })
    // untuk paggination
    let clsPg = document.querySelectorAll(".btn-pg");
    clsPg.forEach(elm => {
        elm.addEventListener("click", function () {
            malesLoad(__tbodyid, sql.field.thead.length, document.getElementById(__tbodyid).rows.length);
            sessionStorage.setItem(__page, this.dataset.val);
            execFunction(__fn);
        })
    });
    // untuk filter
    let clsFilter = document.querySelectorAll(".icon-filter");
    clsFilter.forEach(elm => {
        elm.addEventListener("click", function (e) {
            e.stopPropagation();
            let arrFilter = [];
            for (let fil of sql.data) {
                if (!arrFilter.includes(fil[elm.dataset.filter])) arrFilter.push(fil[elm.dataset.filter]);
            }
            filterField({ filter: elm.dataset.filter, data: arrFilter });
        })
    });
}

// fungsi untuk merender tabel
async function rendTables(opt) {
    let sql = opt.dataset ? opt.dataset : await api(opt.url);
    let __divid = opt.divid ? opt.divid : "divView",
        __fn = opt.fn ? opt.fn : "main",
        __by = opt.by ? opt.by : "by",
        __sort = opt.sort ? opt.sort : "sort",
        __page = opt.page ? opt.page : "page",
        __tableid = opt.id ? opt.id : "tableData",
        __tbodyid = opt.tbody.id ? opt.tbody.id : "tbodyData";
    if (GI(__divid)) GI(__divid).innerHTML = "";
    if (GI(__tableid)) GI(__tableid).remove();
    let table = document.createElement("table");
    table.className = opt.cls ? opt.cls : "table";
    table.id = __tableid;
    let thead = table.createTHead();
    thead.className = opt.thead ? opt.thead.cls : "bg-thead";
    let trh = thead.insertRow(0);

    for (let i in sql.field.thead) {
        let th = sql.field.thead[i];
        let tdh = trh.insertCell(i);
        if (i == 0 && opt.tbody.checkbox == true) {
            let div = document.createElement("div");
            div.classList = "form-check";
            div.style.margin = 0;
            div.style.paddingTop = "10px";
            let chk = document.createElement("input");
            chk.type = "checkbox";
            chk.className = "form-check-input";
            chk.id = `chkAll`;
            div.appendChild(chk);
            let lbl = document.createElement("label");
            lbl.className = "form-check-label";
            lbl.htmlFor = `chkAll`;
            lbl.innerText = th.cap;
            div.appendChild(lbl);
            tdh.appendChild(div);
        } else {
            tdh.style.width = th.width;
            if (th.sort) {
                tdh.className = "sort-by";
                tdh.dataset.val = th.sort;
            }

            tdh.innerText = th.cap + " ";

            if (th.filter) {
                let icon = document.createElement("span");
                icon.className = "material-icons icon-filter";
                icon.innerText = "filter_alt";
                icon.dataset.filter = th.filter;
                tdh.appendChild(icon);
            }
        }
    }
    let tbody = table.createTBody();
    tbody.id = __tbodyid;
    if (sql.data.length > 0) {
        for (let i in sql.data) {
            let data = sql.data[i];
            let trb = tbody.insertRow(i);
            if (opt.tbody.click) {
                trb.dataset.id = data.ID;
                let param = opt.tbody.param || false;
                trb.onclick = (e) => window[opt.tbody.click](e, param);
            }
            if (opt.tbody.dblclick) {
                trb.dataset.id = data.ID;
                let param = opt.tbody.param || false;
                trb.ondblclick = (e) => window[opt.tbody.dblclick](e, param);
            }
            for (let b in sql.field.thead) {
                let td = sql.field.thead[b];
                let tdb = trb.insertCell(b);
                if (b == 0 && opt.tbody.checkbox == true) {
                    let div = document.createElement("div");
                    div.classList = "form-check";
                    div.id = `chkProses${data.ID}`;
                    let chk = document.createElement("input");
                    chk.className = "form-check-input chk-trans";
                    chk.type = "checkbox";
                    chk.value = data.ID;
                    chk.id = `chk${data.ID}`;
                    div.appendChild(chk);
                    let lbl = document.createElement("label");
                    lbl.className = "form-check-label";
                    lbl.htmlFor = `chk${data.ID}`;
                    lbl.innerText = data[td.sort];
                    div.appendChild(lbl);
                    tdb.appendChild(div);
                } else {
                    let type = td.type;
                    let cap = data[td.sort];
                    if (type == "opsi") {
                        if (opt.tbody.opsiType == "desktop") {
                            let divD = document.createElement("div");

                            for (let opsi of opt.tbody.opsi) {
                                let btnOpsi = document.createElement("button");
                                btnOpsi.className = "btn btn-opsi";
                                btnOpsi.type = "button";
                                let icon = document.createElement("span");
                                icon.className = "material-icons";
                                icon.dataset.event = opsi.event;
                                icon.dataset.id = data.ID;
                                icon.innerText = opsi.type;
                                if (opsi.param) icon.dataset.param = opsi.param;
                                btnOpsi.appendChild(icon);
                                divD.appendChild(btnOpsi);
                            }
                            tdb.appendChild(divD);
                        } else {
                            let divD = document.createElement("div");
                            divD.className = "opsi-desktop";
                            let divM = document.createElement("div");
                            divM.className = "opsi-mobile dropdown";
                            let btnOpsiM = document.createElement("button");
                            btnOpsiM.className = "btn btn-outline-light btn-sm text-dark";
                            btnOpsiM.dataset.bsToggle = "dropdown";
                            btnOpsiM.type = "button";
                            let iconM = document.createElement("span");
                            iconM.className = "material-icons";
                            iconM.innerText = "more_vert";
                            btnOpsiM.appendChild(iconM);
                            let divMp = document.createElement("div");
                            divMp.className = "dropdown-menu dropleft";

                            for (let opsi of opt.tbody.opsi) {
                                let btnOpsi = document.createElement("button");
                                btnOpsi.className = "btn btn-opsi";
                                btnOpsi.type = "button";
                                let icon = document.createElement("span");
                                icon.className = "material-icons";
                                icon.dataset.event = opsi.event;
                                icon.dataset.id = data.ID;
                                icon.innerText = opsi.type;
                                if (opsi.param) icon.dataset.param = opsi.param;
                                btnOpsi.appendChild(icon);
                                divD.appendChild(btnOpsi);

                                let btnMp = document.createElement("button");
                                btnMp.dataset.id = data.ID;
                                btnMp.className = "dropdown-item";
                                btnMp.dataset.event = opsi.event;
                                btnMp.dataset.id = data.ID;
                                btnMp.innerText = opsi.cap;
                                btnMp.type = "button";
                                if (opsi.param) btnMp.dataset.param = opsi.param;
                                divMp.appendChild(btnMp);
                            }
                            divM.appendChild(btnOpsiM);
                            divM.appendChild(divMp);
                            tdb.appendChild(divM);
                            tdb.appendChild(divD);
                        }
                    } else if (type == "month") {
                        tdb.innerText = TampilBulan(data[td.sort]);
                    } else if (td.type == "img") {
                        let img = document.createElement("img");
                        img.style.borderRadius = "50%";
                        img.style.width = "50px";
                        img.style.height = "50px";
                        img.src = data[td.sort];
                        img.alt = "img table";
                        tdb.appendChild(img);
                        tdb.onclick = function () { modalImg(data[td.sort]); };
                    } else if (type == "str") {
                        tdb.innerText = cap;
                    } else if (type == "html") {
                        tdb.innerHTML = cap;
                    } else if (type == "link") {
                        tdb.innerHTML = td.fn ? `<span class="btn-link td-link" data-id="${data[td.sort]}" onclick='${td.fn}(event)'>${cap}</span>` : `<span class="btn-link td-link" data-id="${data[td.sort]}">${cap}</span>`;
                    } else {
                        if (isNaN(data[td.sort])) {
                            if (Number.isNaN(Date.parse(data[td.sort]))) {
                                tdb.innerText = data[td.sort];
                            } else {
                                tdb.innerText = tanggalIndo(data[td.sort]);
                            }
                        } else {
                            tdb.innerText = numberFormat(data[td.sort]);
                        }
                    }
                }
            }
        }
        if (opt.tfoot) {
            let tfoot = table.createTFoot();
            let tr = tfoot.insertRow(0);
            let tdCap = tr.insertCell(0);
            tdCap.style.fontWeight = "bold";
            tdCap.innerText = opt.tfoot.cap;
            for (let td in sql.field.thead) {
                let thead = sql.field.thead[td];
                if (td != 0) {
                    let jml = 0;
                    for (let i in sql.data) {
                        let data = sql.data[i];
                        jml += parseInt(data[thead.sort]);
                    }
                    if (!isNaN(jml) && opt.tfoot.field.includes(thead.sort)) {
                        let tdd = tr.insertCell(td);
                        tdd.style.fontWeight = "bold";
                        tdd.innerText = numberFormat(jml);
                    } else {
                        tr.insertCell(td).innerText = "";
                    }
                }
            }
        }
    } else {
        let trb = tbody.insertRow(0);
        let tdb = trb.insertCell(0);
        tdb.colSpan = sql.field.thead.length;
        tdb.innerText = "Tidak ada data";
    }
    document.getElementById(__divid).appendChild(table);
    document.querySelector("#" + __tableid).addEventListener('click', function (e) {
        if (e.target.dataset.event) {
            let fn = e.target.dataset.event;
            window[fn](e.target.dataset.id, e.target.dataset.param, e);
        }
        if (e.target.className == 'sort-by') {
            malesLoad(__tbodyid, sql.field.thead.length, document.getElementById(__tbodyid).rows.length);
            sessionStorage.setItem(__sort, e.target.dataset.val);
            if (sessionStorage.getItem(__by) == "ASC") {
                sessionStorage.setItem(__by, "DESC");
            } else {
                sessionStorage.setItem(__by, "ASC");
            }
            window[__fn]();
        }
        if (e.target.className == "material-icons icon-filter") {
            e.stopPropagation();
            let arrFilter = [];
            for (let fil of sql.data) {
                if (!arrFilter.includes(fil[e.target.dataset.filter])) arrFilter.push(fil[e.target.dataset.filter]);
            }
            window[opt.fnfilter]({ filter: e.target.dataset.filter, data: arrFilter });
        }
    });

    if (opt.paggination) {
        let divPG = opt.paggination.div ? opt.paggination.div : "paggination";
        let defLimit = __resolusi.matches == true ? 2 : 10;
        let limit = opt.paggination.limit ? opt.paggination.limit : defLimit;
        rendPagginations({
            jml: sql.field.j,
            div: divPG,
            fn: __fn,
            tbody: opt.tbody.id ? opt.tbody.id : "tbodyData",
            td: sql.field.thead.length,
            page: __page,
            limit: limit
        });
    }

    if (opt.totalField) {
        let divTotal = opt.totalField ? opt.totalField : "totalField";
        GI(divTotal).innerHTML = sql.field.t;
    }
    // untuk handle paggination
    let clsPg = document.querySelectorAll(".btn-pg");
    clsPg.forEach(elm => {
        elm.addEventListener("click", function () {
            malesLoad(__tbodyid, sql.field.thead.length, document.getElementById(__tbodyid).rows.length);
            sessionStorage.setItem(__page, this.dataset.val);
            window[__fn]();
        })
    });
}

function filterField(filter) {
    let arr = filter;
    let tmp = __Filter[arr.filter];
    let ul = "", i = 0;
    for (let li of arr.data) if (!__FilterTemp[arr.filter].includes(li)) __FilterTemp[arr.filter].push(li);
    for (let li of __FilterTemp[arr.filter]) {
        let chk = tmp.includes(li) ? "checked" : "";
        ul += `<div class="form-check">
                    <input class="form-check-input" type="checkbox" onchange="setFilter(this)" value="${li}" data-filter="${arr.filter}" id="filter${arr.filter}${i}" ${chk}>
                    <label class="form-check-label" for="filter${arr.filter}${i}">${li}</label>
                </div>`;
        i++;
    }
    let dom = rendElm({
        elm: [
            { elm: "input", cls: "form-control fokus", placeholder: "Cari Data", id: "edtCariDataFilterTable" },
            { elm: "p" },
            { elm: "div", cls: "list-group", id: "divDataFilterTable", html: ul }
        ]
    });

    let btn = `<button class="btn btn-default" data-bs-dismiss="modal" onclick="main()">Filter</button>`;
    rendModal({
        title: "Filter Data",
        cls: "modal-sm",
        body: dom,
        footer: btn,
        static: "tidak"
    });

    GI("edtCariDataFilterTable").addEventListener("keyup", function () {
        var input, filter, ul, li, a, i, txtValue;
        filter = this.value.toUpperCase();
        ul = document.getElementById("divDataFilterTable");
        li = ul.getElementsByTagName("div");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("label")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    });
}

function setFilter(ini) {
    let filter = ini.dataset.filter;
    let data = ini.value;
    let temp = __Filter;
    if (ini.checked == true) {
        if (!temp[filter].includes(data)) temp[filter].push(data);
    } else {
        let i = 0;
        for (let fil of temp[filter]) {
            if (fil == data) delete temp[filter][i];
            i++;
        }
    }
    __Filter = hapusNull(temp);
}

function rendPagginations(opt) {
    let ss = opt.page ? opt.page : "page",
        page = sessionStorage.getItem(ss),
        jml = opt.jml,
        pg = opt.div ? opt.div : "paggination",
        awal = 0,
        akhir = 0,
        ct = opt.limit;
    if (jml > 0) {
        let div = __resolusi.matches == false ? `<ul class="pagination justify-content-end">` : `<ul class="pagination justify-content-center">`;
        if (page == 1) {
            div += `<li class="page-item"><span class="page-link"><i class="material-icons" style="cursor:not-allowed; font-size:12px; display: inline-flex; vertical-align: middle;">keyboard_arrow_left</i></span></li>`;
        } else {
            div += `<li class="page-item btn-pg" data-val="${parseInt(page) - 1}"><span class="page-link"><i class="material-icons" style="font-size:12px; display: inline-flex; vertical-align: middle;">keyboard_arrow_left</i></span></li>`;
        }
        if (page > ct) { awal = page; } else { awal = 1; }
        if (jml > ct + 1) { if (page > ct) { akhir = parseInt(page) + ct; } else { akhir = ct + 1; } } else { akhir = jml; }
        for (let i = awal; i <= akhir; i++) {
            if (page == i) {
                div += `<li class="page-item" style="cursor:not-allowed;"><a class="page-link active-paggination" href="javascript:">${i}</a></li>`;
            } else {
                div += `<li class="page-item btn-pg" data-val="${i}"><a class="page-link" href="#">${i}</a></li>`;
            }
        }
        if (page == jml) {
            div += `<li class="page-item"><span class="page-link"><i class="material-icons" style="cursor:not-allowed; font-size:12px; display: inline-flex; vertical-align: middle;">keyboard_arrow_right</i></span></li>`;
        } else {
            div += `<li class="page-item btn-pg" data-val="${parseInt(page) + 1}"><a class="page-link" href="#"><i class="material-icons" style="font-size:12px; display: inline-flex; vertical-align: middle;">keyboard_arrow_right</i></a></li>`;
        }
        document.getElementById(pg).innerHTML = div;
    } else {
        document.getElementById(pg).innerHTML = "";
    }
    sessionStorage.setItem(ss, page);
}

function rendElm(opt) {
    let to = opt.to ? opt.to : "none";
    let div = document.createElement("main");
    for (let elm of opt.elm) {
        let elms = elm.elms ? elm.elms : [];
        let cElm = document.createElement(elm.elm);
        if (elm.text) cElm.innerText = elm.text;
        if (elm.html) cElm.innerHTML = elm.html;
        if (elm.cls) cElm.className = elm.cls;
        if (elm.type) cElm.type = elm.type;
        if (elm.id) cElm.id = elm.id;
        if (elm.colspan) cElm.colSpan = elm.colspan;
        if (elm.rowspan) cElm.rowSpan = elm.rowspan;
        if (elm.src) cElm.src = elm.src;
        if (elm.role) cElm.role = elm.role;

        if (elm.placeholder) cElm.placeholder = elm.placeholder;
        if (elm.value) cElm.value = elm.value;
        if (elm.name) cElm.name = elm.name;
        if (elm.readonly) cElm.readOnly = elm.readonly;
        if (elm.required) cElm.required = elm.required;
        if (elm.min) cElm.min = elm.min;
        if (elm.max) cElm.max = elm.max;
        if (elm.minlength) cElm.minLength = elm.minlength;
        if (elm.maxlength) cElm.maxLength = elm.maxlength;
        // event
        if (elm.click) {
            let iStart = elm.click.indexOf("(");
            let iEnd = elm.click.indexOf(")");
            let fn = elm.click.substring(0, iStart);
            let param = elm.click.substring(iStart + 1, iEnd);
            cElm.onclick = window[fn](param);
        }
        if (elm.dblclick) {
            let iStart = elm.dblclick.indexOf("(");
            let iEnd = elm.dblclick.indexOf(")");
            let fn = elm.dblclick.substring(0, iStart);
            let param = elm.dblclick.substring(iStart + 1, iEnd);
            cElm.ondblclick = window[fn](param);
        }
        if (elm.focus) {
            let iStart = elm.focus.indexOf("(");
            let iEnd = elm.focus.indexOf(")");
            let fn = elm.focus.substring(0, iStart);
            let param = elm.focus.substring(iStart + 1, iEnd);
            cElm.onfocus = window[fn](param);
        }
        if (elm.change) {
            let iStart = elm.change.indexOf("(");
            let iEnd = elm.change.indexOf(")");
            let fn = elm.change.substring(0, iStart);
            let param = elm.change.substring(iStart + 1, iEnd);
            cElm.onchange = window[fn](param);
        }
        // atribute
        if (elm.style) cElm.setAttribute("style", elm.style);
        if (elm.attr) for (let attr in elm.attr) cElm.setAttribute(attr, elm.attr[attr]);
        if (elms.length > 0) {
            for (let el of elms) {
                let cElms = document.createElement(el.elm);
                let elms1 = el.elms ? el.elms : [];
                if (el.cls) cElms.className = el.cls;
                if (el.type) cElms.type = el.type;
                if (el.id) cElms.id = el.id;
                if (el.colspan) cElms.colSpan = el.colspan;
                if (el.rowspan) cElms.rowSpan = el.rowspan;
                if (el.src) cElms.src = el.src;
                if (el.role) cElms.role = el.role;

                if (el.placeholder) cElms.placeholder = el.placeholder;
                if (el.value) cElms.value = el.value;
                if (el.name) cElms.name = el.name;
                if (el.readonly) cElms.readOnly = el.readonly;
                if (el.required) cElms.required = el.required;
                if (el.min) cElms.min = el.min;
                if (el.max) cElms.max = el.max;
                if (el.minlength) cElms.minLength = el.minlength;
                if (el.maxlength) cElms.maxLength = el.maxlength;
                // event
                if (el.click) {
                    let iStart = el.click.indexOf("(");
                    let iEnd = el.click.indexOf(")");
                    let fn = el.click.substring(0, iStart);
                    let param = el.click.substring(iStart + 1, iEnd);
                    cElms.onclick = window[fn](param);
                }
                if (el.dblclick) {
                    let iStart = el.dblclick.indexOf("(");
                    let iEnd = el.dblclick.indexOf(")");
                    let fn = el.dblclick.substring(0, iStart);
                    let param = el.dblclick.substring(iStart + 1, iEnd);
                    cElms.ondblclick = window[fn](param);
                }
                if (el.focus) {
                    let iStart = el.focus.indexOf("(");
                    let iEnd = el.focus.indexOf(")");
                    let fn = el.focus.substring(0, iStart);
                    let param = el.focus.substring(iStart + 1, iEnd);
                    cElms.onfocus = window[fn](param);
                }
                if (el.keyup) {
                    let iStart = el.keyup.indexOf("(");
                    let iEnd = el.keyup.indexOf(")");
                    let fn = el.keyup.substring(0, iStart);
                    let param = el.keyup.substring(iStart + 1, iEnd);
                    cElms.onkeyup = window[fn](param);
                }
                if (el.change) {
                    let iStart = el.change.indexOf("(");
                    let iEnd = el.change.indexOf(")");
                    let fn = el.change.substring(0, iStart);
                    let param = el.change.substring(iStart + 1, iEnd);
                    cElms.onchange = window[fn](param);
                }
                // attribute
                if (el.style) cElms.setAttribute("style", el.style);
                if (el.attr) for (let attr in el.attr) cElms.setAttribute(attr, el.attr[attr]);
                if (elms1.length > 0) {
                    for (let el1 of elms1) {
                        let cElms1 = document.createElement(el1.elm);
                        let elms1 = el1.elms ? el1.elms : [];
                        if (el1.cls) cElms1.className = el1.cls;
                        if (el1.type) cElms1.type = el1.type;
                        if (el1.id) cElms1.id = el1.id;
                        if (el1.colspan) cElms1.colSpan = el1.colspan;
                        if (el1.rowspan) cElms1.rowSpan = el1.rowspan;
                        if (el1.src) cElms1.src = el1.src;
                        if (el1.role) cElms1.role = el1.role;

                        if (el1.placeholder) cElms1.placeholder = el1.placeholder;
                        if (el1.value) cElms1.value = el1.value;
                        if (el1.name) cElms1.name = el1.name;
                        if (el1.readonly) cElms1.readOnly = el1.readonly;
                        if (el1.required) cElms1.required = el1.required;
                        if (el1.min) cElms1.min = el1.min;
                        if (el1.max) cElms1.max = el1.max;
                        if (el1.minlength) cElms1.minLength = el1.minlength;
                        if (el1.maxlength) cElms1.maxLength = el1.maxlength;
                        // event
                        if (el1.click) {
                            let iStart = el1.click.indexOf("(");
                            let iEnd = el1.click.indexOf(")");
                            let fn = el1.click.substring(0, iStart);
                            let param = el1.click.substring(iStart + 1, iEnd);
                            cElms1.onclick = window[fn](param);
                        }
                        if (el1.dblclick) {
                            let iStart = el1.dblclick.indexOf("(");
                            let iEnd = el1.dblclick.indexOf(")");
                            let fn = el1.dblclick.substring(0, iStart);
                            let param = el1.dblclick.substring(iStart + 1, iEnd);
                            cElms1.ondblclick = window[fn](param);
                        }
                        if (el1.focus) {
                            let iStart = el1.focus.indexOf("(");
                            let iEnd = el1.focus.indexOf(")");
                            let fn = el1.focus.substring(0, iStart);
                            let param = el1.focus.substring(iStart + 1, iEnd);
                            cElms1.onfocus = window[fn](param);
                        }
                        if (el1.keyup) {
                            let iStart = el1.keyup.indexOf("(");
                            let iEnd = el1.keyup.indexOf(")");
                            let fn = el1.keyup.substring(0, iStart);
                            let param = el1.keyup.substring(iStart + 1, iEnd);
                            cElms1.onkeyup = window[fn](param);
                        }
                        if (el1.change) {
                            let iStart = el1.change.indexOf("(");
                            let iEnd = el1.change.indexOf(")");
                            let fn = el1.change.substring(0, iStart);
                            let param = el1.change.substring(iStart + 1, iEnd);
                            cElms1.onchange = window[fn](param);
                        }
                        // attribute
                        if (el1.style) cElms1.setAttribute("style", el1.style);
                        if (el1.attr) for (let attr in el1.attr) cElms1.setAttribute(attr, el1.attr[attr]);
                        if (elms1.length > 0) {
                            for (let el2 of elms1) {
                                let cElms2 = document.createElement(el2.elm);
                                let elms2 = el2.elms ? el2.elms : [];
                                if (el2.cls) cElms2.className = el2.cls;
                                if (el2.type) cElms2.type = el2.type;
                                if (el2.id) cElms2.id = el2.id;
                                if (el2.colspan) cElms2.colSpan = el2.colspan;
                                if (el2.rowspan) cElms2.rowSpan = el2.rowspan;
                                if (el2.src) cElms2.src = el2.src;
                                if (el2.role) cElms2.role = el2.role;

                                if (el2.placeholder) cElms2.placeholder = el2.placeholder;
                                if (el2.value) cElms2.value = el2.value;
                                if (el2.name) cElms2.name = el2.name;
                                if (el2.readonly) cElms2.readOnly = el2.readonly;
                                if (el2.required) cElms2.required = el2.required;
                                if (el2.min) cElms2.min = el2.min;
                                if (el2.max) cElms2.max = el2.max;
                                if (el2.minlength) cElms2.minLength = el2.minlength;
                                if (el2.maxlength) cElms2.maxLength = el2.maxlength;

                                if (el2.style) cElms2.setAttribute("style", el2.style);
                                if (el2.attr) for (let attr in el2.attr) cElms2.setAttribute(attr, el2.attr[attr]);
                                if (elms2.length > 0) {
                                    for (let el3 of elms2) {
                                        let cElms3 = document.createElement(el3.elm);
                                        let elms3 = el3.elms ? el3.elms : [];
                                        if (el3.cls) cElms3.className = el3.cls;
                                        if (el3.type) cElms3.type = el3.type;
                                        if (el3.id) cElms3.id = el3.id;
                                        if (el3.colspan) cElms3.colSpan = el3.colspan;
                                        if (el3.rowspan) cElms3.rowSpan = el3.rowspan;
                                        if (el3.src) cElms3.src = el3.src;
                                        if (el3.role3) cElms3.role = el3.role;

                                        if (el3.placeholder) cElms3.placeholder = el3.placeholder;
                                        if (el3.value) cElms3.value = el3.value;
                                        if (el3.name) cElms3.name = el3.name;
                                        if (el3.readonly) cElms3.readOnly = el3.readonly;
                                        if (el3.required) cElms3.required = el3.required;
                                        if (el3.min) cElms3.min = el3.min;
                                        if (el3.max) cElms3.max = el3.max;
                                        if (el3.minlength) cElms3.minLength = el3.minlength;
                                        if (el3.maxlength) cElms3.maxLength = el3.maxlength;

                                        if (el3.style) cElms3.setAttribute("style", el3.style);
                                        if (el3.attr) for (let attr in el3.attr) cElms3.setAttribute(attr, el3.attr[attr]);
                                        if (elms3.length > 0) {
                                            for (let el4 of elms3) {
                                                let cElms4 = document.createElement(el4.elm);
                                                let elms4 = el4.elms ? el4.elms : [];
                                                if (el4.cls) cElms4.className = el4.cls;
                                                if (el4.type) cElms4.type = el4.type;
                                                if (el4.id) cElms4.id = el4.id;
                                                if (el4.colspan) cElms4.colSpan = el4.colspan;
                                                if (el4.rowspan) cElms4.rowSpan = el4.rowspan;
                                                if (el4.src) cElms4.src = el4.src;
                                                if (el4.role3) cElms4.role = el4.role;

                                                if (el4.placeholder) cElms4.placeholder = el4.placeholder;
                                                if (el4.value) cElms4.value = el4.value;
                                                if (el4.name) cElms4.name = el4.name;
                                                if (el4.readonly) cElms4.readOnly = el4.readonly;
                                                if (el4.required) cElms4.required = el4.required;
                                                if (el4.min) cElms4.min = el4.min;
                                                if (el4.max) cElms4.max = el4.max;
                                                if (el4.minlength) cElms4.minLength = el4.minlength;
                                                if (el4.maxlength) cElms4.maxLength = el4.maxlength;

                                                if (el4.style) cElms4.setAttribute("style", el4.style);
                                                if (el4.attr) for (let attr in el4.attr) cElms4.setAttribute(attr, el4.attr[attr]);
                                                if (elms4.length > 0) {
                                                    for (let el5 of elms4) {
                                                        let cElms5 = document.createElement(el5.elm);
                                                        let elms5 = el5.elms ? el5.elms : [];
                                                        if (el5.cls) cElms5.className = el5.cls;
                                                        if (el5.type) cElms5.type = el5.type;
                                                        if (el5.id) cElms5.id = el5.id;
                                                        if (el5.colspan) cElms5.colSpan = el5.colspan;
                                                        if (el5.rowspan) cElms5.rowSpan = el5.rowspan;
                                                        if (el5.src) cElms5.src = el5.src;
                                                        if (el5.role3) cElms5.role = el5.role;

                                                        if (el5.placeholder) cElms5.placeholder = el5.placeholder;
                                                        if (el5.value) cElms5.value = el5.value;
                                                        if (el5.name) cElms5.name = el5.name;
                                                        if (el5.readonly) cElms5.readOnly = el5.readonly;
                                                        if (el5.required) cElms5.required = el5.required;
                                                        if (el5.min) cElms5.min = el5.min;
                                                        if (el5.max) cElms5.max = el5.max;
                                                        if (el5.minlength) cElms5.minLength = el5.minlength;
                                                        if (el5.maxlength) cElms5.maxLength = el5.maxlength;

                                                        if (el5.style) cElms5.setAttribute("style", el5.style);
                                                        if (el5.attr) for (let attr in el5.attr) cElms5.setAttribute(attr, el5.attr[attr]);
                                                        if (elms5.length > 0) {
                                                            for (let el6 of elms5) {
                                                                let cElms6 = document.createElement(el6.elm);
                                                                let elms6 = el6.elms ? el6.elms : [];
                                                                if (el6.cls) cElms6.className = el6.cls;
                                                                if (el6.type) cElms6.type = el6.type;
                                                                if (el6.id) cElms6.id = el6.id;
                                                                if (el6.colspan) cElms6.colSpan = el6.colspan;
                                                                if (el6.rowspan) cElms6.rowSpan = el6.rowspan;
                                                                if (el6.src) cElms6.src = el6.src;
                                                                if (el6.role3) cElms6.role = el6.role;

                                                                if (el6.placeholder) cElms6.placeholder = el6.placeholder;
                                                                if (el6.value) cElms6.value = el6.value;
                                                                if (el6.name) cElms6.name = el6.name;
                                                                if (el6.readonly) cElms6.readOnly = el6.readonly;
                                                                if (el6.required) cElms6.required = el6.required;
                                                                if (el6.min) cElms6.min = el6.min;
                                                                if (el6.max) cElms6.max = el6.max;
                                                                if (el6.minlength) cElms6.minLength = el6.minlength;
                                                                if (el6.maxlength) cElms6.maxLength = el6.maxlength;

                                                                if (el6.style) cElms6.setAttribute("style", el6.style);
                                                                if (el6.attr) for (let attr in el6.attr) cElms6.setAttribute(attr, el6.attr[attr]);
                                                                if (elms6.length > 0) {
                                                                    for (let el7 of elms6) {
                                                                        let cElms7 = document.createElement(el7.elm);
                                                                        let elms7 = el7.elms ? el7.elms : [];
                                                                        if (el7.cls) cElms7.className = el7.cls;
                                                                        if (el7.type) cElms7.type = el7.type;
                                                                        if (el7.id) cElms7.id = el7.id;
                                                                        if (el7.colspan) cElms7.colSpan = el7.colspan;
                                                                        if (el7.rowspan) cElms7.rowSpan = el7.rowspan;
                                                                        if (el7.src) cElms7.src = el7.src;
                                                                        if (el7.role3) cElms7.role = el7.role;

                                                                        if (el7.placeholder) cElms7.placeholder = el7.placeholder;
                                                                        if (el7.value) cElms7.value = el7.value;
                                                                        if (el7.name) cElms7.name = el7.name;
                                                                        if (el7.readonly) cElms7.readOnly = el7.readonly;
                                                                        if (el7.required) cElms7.required = el7.required;
                                                                        if (el7.min) cElms7.min = el7.min;
                                                                        if (el7.max) cElms7.max = el7.max;
                                                                        if (el7.minlength) cElms7.minLength = el7.minlength;
                                                                        if (el7.maxlength) cElms7.maxLength = el7.maxlength;

                                                                        if (el7.style) cElms7.setAttribute("style", el7.style);
                                                                        if (el7.attr) for (let attr in el7.attr) cElms7.setAttribute(attr, el7.attr[attr]);
                                                                        for (let el8 of elms7) {
                                                                            let cElms8 = document.createElement(el8.elm);
                                                                            let elms8 = el8.elms ? el8.elms : [];
                                                                            if (el8.cls) cElms8.className = el8.cls;
                                                                            if (el8.type) cElms8.type = el8.type;
                                                                            if (el8.id) cElms8.id = el8.id;
                                                                            if (el8.colspan) cElms8.colSpan = el8.colspan;
                                                                            if (el8.rowspan) cElms8.rowSpan = el8.rowspan;
                                                                            if (el8.src) cElms8.src = el8.src;
                                                                            if (el8.role3) cElms8.role = el8.role;

                                                                            if (el8.placeholder) cElms8.placeholder = el8.placeholder;
                                                                            if (el8.value) cElms8.value = el8.value;
                                                                            if (el8.name) cElms8.name = el8.name;
                                                                            if (el8.readonly) cElms8.readOnly = el8.readonly;
                                                                            if (el8.required) cElms8.required = el8.required;
                                                                            if (el8.min) cElms8.min = el8.min;
                                                                            if (el8.max) cElms8.max = el8.max;
                                                                            if (el8.minlength) cElms8.minLength = el8.minlength;
                                                                            if (el8.maxlength) cElms8.maxLength = el8.maxlength;

                                                                            if (el8.style) cElms8.setAttribute("style", el8.style);
                                                                            if (el8.attr) for (let attr in el8.attr) cElms8.setAttribute(attr, el8.attr[attr]);
                                                                            for (let el9 of elms8) {
                                                                                let cElms9 = document.createElement(el9.elm);
                                                                                let elms9 = el9.elms ? el9.elms : [];
                                                                                if (el9.cls) cElms9.className = el9.cls;
                                                                                if (el9.type) cElms9.type = el9.type;
                                                                                if (el9.id) cElms9.id = el9.id;
                                                                                if (el9.colspan) cElms9.colSpan = el9.colspan;
                                                                                if (el9.rowspan) cElms9.rowSpan = el9.rowspan;
                                                                                if (el9.src) cElms9.src = el9.src;
                                                                                if (el9.role3) cElms9.role = el9.role;

                                                                                if (el9.placeholder) cElms9.placeholder = el9.placeholder;
                                                                                if (el9.value) cElms9.value = el9.value;
                                                                                if (el9.name) cElms9.name = el9.name;
                                                                                if (el9.readonly) cElms9.readOnly = el9.readonly;
                                                                                if (el9.required) cElms9.required = el9.required;
                                                                                if (el9.min) cElms9.min = el9.min;
                                                                                if (el9.max) cElms9.max = el9.max;
                                                                                if (el9.minlength) cElms9.minLength = el9.minlength;
                                                                                if (el9.maxlength) cElms9.maxLength = el9.maxlength;

                                                                                if (el9.style) cElms9.setAttribute("style", el9.style);
                                                                                if (el9.attr) for (let attr in el9.attr) cElms9.setAttribute(attr, el9.attr[attr]);
                                                                                for (let el10 of elms9) {
                                                                                    let cElms10 = document.createElement(el10.elm);
                                                                                    let elms10 = el10.elms ? el10.elms : [];
                                                                                    if (el10.cls) cElms10.className = el10.cls;
                                                                                    if (el10.type) cElms10.type = el10.type;
                                                                                    if (el10.id) cElms10.id = el10.id;
                                                                                    if (el10.colspan) cElms10.colSpan = el10.colspan;
                                                                                    if (el10.rowspan) cElms10.rowSpan = el10.rowspan;
                                                                                    if (el10.src) cElms10.src = el10.src;
                                                                                    if (el10.role3) cElms10.role = el10.role;

                                                                                    if (el10.placeholder) cElms10.placeholder = el10.placeholder;
                                                                                    if (el10.value) cElms10.value = el10.value;
                                                                                    if (el10.name) cElms10.name = el10.name;
                                                                                    if (el10.readonly) cElms10.readOnly = el10.readonly;
                                                                                    if (el10.required) cElms10.required = el10.required;
                                                                                    if (el10.min) cElms10.min = el10.min;
                                                                                    if (el10.max) cElms10.max = el10.max;
                                                                                    if (el10.minlength) cElms10.minLength = el10.minlength;
                                                                                    if (el10.maxlength) cElms10.maxLength = el10.maxlength;

                                                                                    if (el10.style) cElms10.setAttribute("style", el10.style);
                                                                                    if (el10.attr) for (let attr in el10.attr) cElms10.setAttribute(attr, el10.attr[attr]);

                                                                                    if (el10.text) cElms10.innerText = el10.text;
                                                                                    if (el10.html) cElms10.innerHTML = el10.html;
                                                                                    cElms9.appendChild(cElms10);
                                                                                }
                                                                                if (el9.text) cElms9.innerText = el9.text;
                                                                                if (el9.html) cElms9.innerHTML = el9.html;
                                                                                cElms8.appendChild(cElms9);
                                                                            }
                                                                            if (el8.text) cElms8.innerText = el8.text;
                                                                            if (el8.html) cElms8.innerHTML = el8.html;
                                                                            cElms7.appendChild(cElms8);
                                                                        }
                                                                        if (el7.text) cElms7.innerText = el7.text;
                                                                        if (el7.html) cElms7.innerHTML = el7.html;
                                                                        cElms6.appendChild(cElms7);
                                                                    }
                                                                }
                                                                if (el6.text) cElms6.innerText = el6.text;
                                                                if (el6.html) cElms6.innerHTML = el6.html;
                                                                cElms5.appendChild(cElms6);
                                                            }
                                                        }
                                                        if (el5.text) cElms5.innerText = el5.text;
                                                        if (el5.html) cElms5.innerHTML = el5.html;
                                                        cElms4.appendChild(cElms5);
                                                    }
                                                }
                                                if (el4.text) cElms4.innerText = el4.text;
                                                if (el4.html) cElms4.innerHTML = el4.html;
                                                cElms3.appendChild(cElms4);
                                            }
                                        }
                                        if (el3.text) cElms3.innerText = el3.text;
                                        if (el3.html) cElms3.innerHTML = el3.html;
                                        cElms2.appendChild(cElms3);
                                    }
                                }
                                if (el2.text) cElms2.innerText = el2.text;
                                if (el2.html) cElms2.innerHTML = el2.html;
                                cElms1.appendChild(cElms2);
                            }
                        }
                        if (el1.text) cElms1.innerText = el1.text;
                        if (el1.html) cElms1.innerHTML = el1.html;
                        cElms.appendChild(cElms1);
                    }
                }
                if (el.text) cElms.innerText = el.text;
                if (el.html) cElms.innerHTML = el.html;
                cElm.appendChild(cElms);
            }
        }
        div.appendChild(cElm);
    }

    if (to != "none") {
        if (!opt.add) document.querySelectorAll(to)[0].innerHTML = "";
        let hasil = div.outerHTML.replace("<main>", "");
        let hasil2 = hasil.replace("</main>", "");
        document.querySelectorAll(to)[0].innerHTML = hasil2;
    } else {
        let hasil = div.outerHTML.replace("<main>", "");
        let hasil2 = hasil.replace("</main>", "");
        return hasil2;
    }
}

function rendForms(opt, rendTo = "dom") {
    let dom = "";
    for (let elm of opt) {
        if (!Array.isArray(elm)) {
            let input = "";
            let labelID = elm.labelID ? `id='${elm.labelID}'` : '';
            let label = elm.label ? `<label ${labelID}>${elm.label}</label>` : "";
            let type = elm.type || "text";
            let id = elm.id ? `id="${elm.id}"` : "";
            let name = elm.name ? `name="${elm.name}"` : "";
            let cls = elm.cls || "form-control";
            let plc = elm.placeholder ? `placeholder="${elm.placeholder}"` : "";
            let req = elm.req || "";
            let min = elm.min ? ` min="${elm.min}" ` : "";
            let max = elm.max ? ` min="${elm.max}" ` : "";
            let isReq = req != "" ? "required" : "";
            let read = elm.readonly || "";
            let isRead = read == true ? "readonly" : "";
            let dis = elm.disabled || "";
            let isDisabled = dis != "" ? "disabled" : "";
            let value = elm.value || "";
            let feed = req != "" ? `<div class="invalid-feedback">${req}</div>` : "";
            let fn = elm.fn || [];
            let exec = ``;
            for (ex of fn) exec += ` on${ex.on}="${ex.fn};" `;
            let btn = elm.addBtn || "";
            let addBtn = "";
            if (btn != "") {
                for (add of btn) {
                    let clsBtn = add.cls || "btn btn-sc";
                    let fn = add.fn || "";
                    let icon = add.icon ? `<i class='material-icons'>${add.icon}</i> ` : "";
                    let lbl = add.label || "";
                    let id = add.id ? `id="${add.id}"` : "";
                    addBtn += `<button type="button" class="${clsBtn}" ${id} onclick="${fn}">${icon}${lbl}</btn>`;
                }
            }
            switch (type) {
                case 'select': {
                    let isVal = value;
                    let clsS = elm.cls || "form-select";
                    let idLabel = elm.idLabel ? `id="${elm.idLabel}" ` : "";
                    if (Array.isArray(value)) {
                        isVal = "";
                        for (opt of value) {
                            let select = opt.value == elm.select ? "selected" : "";
                            let style = opt.style ? ` style="${opt.style}" ` : "";
                            let optID = opt.ID ? ` id="${opt.ID}" ` : "";
                            isVal += `<option value="${opt.value}" ${optID} ${select} ${style}>${opt.caption}</option>`;
                        }
                    }
                    if (addBtn != "") input += `<div class="input-group" ${idLabel}>`;
                    input += `<select ${name} ${id} ${exec} class="${clsS}" ${plc} ${isReq} ${isRead} ${isDisabled}>${isVal}</select>`;
                    if (addBtn != "") input += addBtn + `</div>`;
                } break;

                case 'textarea': {
                    input += `<textarea ${name} ${id} ${exec} class="${cls}" ${plc} ${isReq} ${isRead} ${isDisabled}>${value}</textarea>`;
                } break;

                case 'checkbox': {
                    let chk = elm.chk || "", isChk = chk == true ? "checked" : "";
                    let chkid = elm.id ? elm.id : "chk";
                    input += `<div class="form-check form-switch">
                                <input class="form-check-input" ${name} type="checkbox" role="switch" value="${value}" id="${chkid}" ${exec} ${isChk} ${isDisabled}>
                                <label class="form-check-label" for="${chkid}">${elm.label}</label>
                              </div>`;
                } break;

                case 'other': {
                    input += elm.dom;
                } break;

                case 'numberFormat': {
                    let min = elm.min ? `min="${elm.min}"` : "",
                        max = elm.min ? `min="${elm.max}"` : "";
                    if (addBtn != "") input += `<div class="input-group">`;
                    input += `<input type="number" ${name} ${id} value="${value}" ${exec} class="${cls} number-format" autocomplete="off" ${min} ${max} ${plc} ${isReq} ${isRead} ${isDisabled}/>`;
                    if (addBtn != "") input += addBtn + `</div>`;
                } break;

                case 'hidden': {
                    input += `<input type="${type}" ${name} ${id} value="${value}" />`;
                } break;

                default: {
                    let idLabel = elm.idLabel ? `id="${elm.idLabel}" ` : "";
                    if (addBtn != "") input += `<div class="input-group" ${idLabel}>`;
                    input += `<input type="${type}" ${name} ${id} value="${value}" ${min} ${max} ${exec} class="${cls}" ${plc} ${isReq} ${isRead} ${isDisabled} />`;
                    if (addBtn != "") input += addBtn + `</div>`;
                } break;
            }
            if (type != "checkbox") {
                let parentID = elm.parentID ? `id=${elm.parentID}` : "";
                dom += `<div class="form-group" ${parentID} >${label}${input}${feed}</div>`;
            } else {
                dom += input;
            }
        } else {
            let rowDom = `<div class="row">`;
            for (let div of elm) {
                let input = "";
                let labelID = div.labelID ? `id='${div.labelID}'` : '';
                let label = div.label ? `<label ${labelID}>${div.label}</label>` : "";
                let type = div.type || "text";
                let id = div.id ? `id="${div.id}"` : "";
                let name = div.name ? `name="${div.name}"` : "";
                let cls = div.cls || "form-control";
                let plc = div.placeholder ? `placeholder="${div.placeholder}"` : "";
                let req = div.req || "";
                let isReq = req != "" ? "required" : "";
                let min = div.min ? ` min="${div.min}" ` : "";
                let max = div.max ? ` min="${div.max}" ` : "";
                let read = div.readonly || "";
                let isRead = read == true ? "readonly" : "";
                let dis = div.disabled || "";
                let isDisabled = dis != "" ? "disabled" : "";
                let value = div.value || "";
                let feed = req != "" ? `<div class="invalid-feedback">${req}</div>` : "";
                let fn = div.fn || [];
                let exec = ``;
                for (let ex of fn) exec += ` on${ex.on}="${ex.fn};" `;
                let btn = div.addBtn || "";
                let addBtn = "";
                if (btn != "") {
                    for (add of btn) {
                        let clsBtn = add.cls || "btn btn-sc";
                        let fn = add.fn || "";
                        let icon = add.icon ? `<i class='material-icons'>${add.icon}</i> ` : "";
                        let lbl = add.label || "";
                        let id = add.id ? `id="${add.id}"` : "";
                        addBtn += `<button type="button" class="${clsBtn}" ${id} onclick="${fn}">${icon}${lbl}</btn>`;
                    }
                }
                switch (type) {
                    case 'select': {
                        let isVal = value;
                        let clsS = div.cls || "form-select";
                        let idLabel = div.idLabel ? `id="${div.idLabel}" ` : "";
                        if (Array.isArray(isVal)) {
                            isVal = "";
                            for (opt of value) {
                                let style = opt.style ? ` style="${opt.style}" ` : "";
                                let optID = opt.ID ? ` id="${opt.ID}" ` : "";
                                let select = opt.value == div.select ? "selected" : "";
                                isVal += `<option value="${opt.value}" ${optID} ${select} ${style}>${opt.caption}</option>`;
                            }
                        }
                        if (addBtn != "") input += `<div class="input-group" ${idLabel}>`;
                        input += `<select ${name} ${id} ${exec} class="${clsS}" ${plc} ${isReq} ${isRead} ${isDisabled}>${isVal}</select>`;
                        if (addBtn != "") input += addBtn + `</div>`;
                    } break;

                    case 'textarea': {
                        input += `<textarea ${name} ${id} ${exec} class="${cls}" ${plc} ${isReq} ${isRead} ${isDisabled}>${value}</textarea>`;
                    } break;

                    case 'dateFormat': {
                        input += `<text ${name} ${id} ${exec} class="${cls}" ${plc} ${isReq} ${isRead} ${isDisabled} onfocus="setTypeDate(this)" onblur="setTypeText(this)" value="${value}">`;
                    } break;

                    case 'other': {
                        input += div.dom;
                    } break;

                    case 'hidden': {
                        input += `<input type="${type}" ${name} ${id} value="${value}" />`;
                    } break;

                    case 'numberFormat': {
                        let min = div.min ? `min="${div.min}"` : "",
                            max = div.min ? `min="${div.max}"` : "";
                        if (addBtn != "") input += `<div class="input-group">`;
                        input += `<input type="number" ${name} ${id} value="${value}" ${exec} class="${cls} number-format" autocomplete="off" ${min} ${max} ${plc} ${isReq} ${isRead} ${isDisabled}/>`;
                        if (addBtn != "") input += addBtn + `</div>`;
                    } break;

                    case 'checkbox': {
                        let chk = div.chk || "", isChk = chk == true ? "checked" : "";
                        let chkid = div.id ? div.id : "chk";
                        input += `<div class="form-check form-switch">
                                    <input class="form-check-input" ${name} type="checkbox" role="switch" value="${value}" id="${chkid}" ${exec} ${isChk} ${isDisabled}>
                                    <label class="form-check-label" for="${chkid}">${div.label}</label>
                                </div>`;
                    } break;

                    default: {
                        let idLabel = div.idLabel ? `id="${div.idLabel}" ` : "";
                        if (addBtn != "") input += `<div class="input-group" ${idLabel}>`;
                        input += `<input type="${type}" ${name} ${id} value="${value}" ${min} ${max} ${exec} class="${cls}" ${plc} ${isReq} ${isRead} ${isDisabled}/>`;
                        if (addBtn != "") input += addBtn + `</div>`;
                    } break;
                }
                let parentID = div.parentID ? `id=${div.parentID}` : "";
                if (type != "checkbox") {
                    rowDom += `<div class="col mb-1" ${parentID}><div class="form-group">${label}${input}${feed}</div></div>`;
                } else {
                    rowDom += `<div class="col mb-1" ${parentID}>${input}</div>`;
                }
            }
            rowDom += `</div>`;
            dom += rowDom;
        }
    }
    if (rendTo != "dom") {
        document.getElementById(rendTo).innerHTML = dom;
    } else {
        return dom;
    }
}

function iniNumber() {
    let number = document.querySelectorAll(".number-format");
    number.forEach(elm => {
        elm.addEventListener("focus", function () {
            this.type = "text";
            this.value = numberFormat(this.value);
            this.select();
        });
        elm.addEventListener("keyup", function () {
            numberFormat(this.value, this);
        });
        elm.addEventListener("blur", function () {
            this.value = intFormat(this.value);
            this.type = "number";
        });
        elm.addEventListener("change", function () {
            this.value = intFormat(this.value);
            this.type = "number";
        });
    });
}

function iniString() {
    let number = document.querySelectorAll("input[type=text], textarea");
    number.forEach(elm => {
        elm.addEventListener("keyup", function () {
            this.value = stringAman(this.value);
        });
    });
}

function setTypeDate(ini) {
    ini.type = "date";
    ini.value = ini.value;
}

function saiki(DD = "", type = "full") {
    var today = new Date();
    var dd = DD != "" ? DD : today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) { dd = '0' + dd; }
    if (mm < 10) { mm = '0' + mm; }
    if (type == "full") {
        today = yyyy + '-' + mm + '-' + dd;
    } else if (type == "bulan") {
        today = yyyy + '-' + mm;
    } else if (type == "tahun") {
        today = yyyy;
    }
    return today;
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function YYMMDD(data) {
    let yy = data.substring(0, 4),
        dd = data.substring(5, 7),
        mm = data.substring(8, 10);
    return yy + "-" + mm + "-" + dd;
}

function execFunction(functionName, args, context = window) {
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
}

function GI(id) {
    return document.getElementById(id);
}

const hapusNull = (obj) => {
    Object.keys(obj).forEach(k =>
        (obj[k] && typeof obj[k] === 'object') && hapusNull(obj[k]) ||
        (!obj[k] && obj[k] !== undefined) && delete obj[k]
    );
    return obj;
};

function hide(id) {
    if (document.getElementById(id)) document.getElementById(id).style.display = "none";
}

function show(id) {
    if (document.getElementById(id)) document.getElementById(id).style.display = "block";
}

function state(ssts) {
    return sessionStorage.getItem(ssts);
}

function setState(data) {
    for (let dd in data) sessionStorage.setItem(dd, data[dd]);
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function logout() {
    sessionStorage.clear();
    setCookie("ID", "", -30);
    window.location.href = './';
}

function dateFormat(serial) {
    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);
    var fractional_day = serial - Math.floor(serial) + 0.0000001;
    var total_seconds = Math.floor(86400 * fractional_day);
    var seconds = total_seconds % 60;
    total_seconds -= seconds;
    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;
    let MM = date_info.getMonth() + 1;
    let DD = date_info.getDate();
    let bln = MM < 10 ? "0" + MM : MM;
    let tgl = DD < 10 ? "0" + DD : DD;
    var YYMMDD = date_info.getFullYear() + "-" + (bln) + "-" + tgl;
    return YYMMDD;
}

function checkDateFormat(tgl) {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) { dd = '0' + dd; }
    if (mm < 10) { mm = '0' + mm; }
    let tanggal = yyyy + '-' + mm + '-' + dd;

    let slash = tgl.split("/");
    let dash = tgl.split("-");
    if (tgl.length == 5) {
        let utc_days = Math.floor(tgl - 25569);
        let utc_value = utc_days * 86400;
        let date_info = new Date(utc_value * 1000);
        let fractional_day = tgl - Math.floor(tgl) + 0.0000001;
        let total_seconds = Math.floor(86400 * fractional_day);
        let seconds = total_seconds % 60;
        total_seconds -= seconds;
        let hours = Math.floor(total_seconds / (60 * 60));
        let minutes = Math.floor(total_seconds / 60) % 60;
        let MM = date_info.getMonth() + 1;
        let DD = date_info.getDate();
        let bln = MM < 10 ? "0" + MM : MM;
        let Tgl = DD < 10 ? "0" + DD : DD;
        tanggal = date_info.getFullYear() + "-" + bln + "-" + Tgl;
    } else if (dash.length > 1) {
        let YY = dash[0].length == 4 ? dash[0] : dash[2];
        let MM = dash[1];
        let DD = dash[0].length == 4 ? dash[2] : dash[0];
        tanggal = `${YY}-${MM}-${DD}`;
    } else if (slash.length > 1) {
        let YY = slash[0].length == 4 ? slash[0] : slash[2];
        let MM = slash[1];
        let DD = slash[0].length == 4 ? slash[2] : slash[0];
        tanggal = `${YY}-${MM}-${DD}`;
    }
    console.log(tanggal);
    return tanggal;
}