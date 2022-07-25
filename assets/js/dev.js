function submitForm(e, opt) {
    e.preventDefault();
    e.stopPropagation();
    let iniForm = opt.form ? opt.form : "#iniForm";
    let form = document.querySelector(iniForm);
    if (form.checkValidity()) {
        let url = "";
        console.log(location.hostname);
        if (location.hostname == "localhost") {
            url = opt.url ? opt.url : window.location.pathname.substring(5);
        } else {
            url = opt.url ? opt.url : window.location.pathname.substring(1);
        }
        let div = opt.div ? opt.div : "tampil",
            modal = opt.modal ? opt.modal : "ya",
            btnSimpan = form.querySelectorAll("button[type='submit']")[0],
            oldBtnCap = btnSimpan.innerHTML.trim(),
            btnTutup = opt.tutup ? opt.tutup : "tutupModal";
        let data = new FormData(form);
        btnSimpan.innerHTML = `<i class="spinner-border spinner-border-sm"></i> ${oldBtnCap}`;
        btnSimpan.disabled = true;
        fetch('sys/crud', {
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
                    if (opt.cetak) {
                        window.open(res.cetak);
                    }
                    if (modal == "ya") {
                        document.getElementById(btnTutup).click();
                    }
                } else {
                    pesan("Proses Gagal", res.pesan, "danger");
                    btnSimpan.innerHTML = oldBtnCap;
                    btnSimpan.disabled = false;
                }
            } else {
                console.log(hasil);
                pesan("Proses Gagal", "Mohon maaf terjadi kesalahan ketika memproses", "danger");
                btnSimpan.innerHTML = oldBtnCap;
                btnSimpan.disabled = false;
            }
        }).catch((error) => {
            btnSimpan.innerHTML = oldBtnCap;
            btnSimpan.disabled = false;
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

function modal(opt) {
    let url = opt.url ? opt.url : "",
        jenis = opt.cls ? opt.cls : " ",
        id = opt.id ? opt.id : "modal",
        data = opt.data ? opt.data : "url",
        node = document.createElement("div");
    node.innerHTML = ` <div data-bs-target="#${id}" data-bs-toggle="modal" id="triger${id}"></div>
                        <div class="modal fade" data-bs-backdrop="static" id="${id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
    `);
    script.appendChild(ss);
    document.getElementById("modalKonten" + id).appendChild(script);
    document.getElementById(`triger${id}`).click();
}

function numberFormat(ini) {
    var formatter = new Intl.NumberFormat("en-GB", { style: "decimal" });
    var nmr = 0, result = "";
    if (ini != null) {
        if (!isNaN(ini)) {
            nmr = ini;
        }
        result = formatter.format(nmr.toString().replace(/,/g, ""));
    }
    return result;
}

function intFormat(ini) {
    let data = ini.toString().replace(/,/g, "");
    return data;
}

function stringFormat(ini) {
    let data1 = ini.replace(/'/g, "");
    let data2 = data1.replace(/"/g, '');
    let data3 = data2.replace(/`/g, '');
    return data3;
}

function stringAman(val) {
    let val1 = val.replace("'", "");
    let val2 = val1.replace('"', '');
    return (val2);
}

function addslashes(val){
    return val.replace("'", "\'").replace('"', '\"');
}

function malesLoad(lokasi = "tampil", col = 4, row = 3) {
    let div = `<table class="table table-bordered"><tbody>`;
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
    document.getElementById(lokasi).innerHTML = div;
}

function pesan(title, details, jenis, waktu = 5000) {
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

function TampilBulan(date) {
    let bulan = date.substring(5);
    let tahun = date.substring(0, 4);
    let BulanIndo = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agust", "Sept", "Okt", "Nov", "Des"];
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
        if (jml > 8) { if (page > 7) { akhir = parseInt(page) + 7; } else { akhir = 8; } } else { akhir = jml; }
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

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function random_rgba() {
    var o = Math.round,
        r = Math.random,
        s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
}

function cetak(data) {
    var myWindow = window.open('', '', 'width=1000,height=800');
    myWindow.document.write(data);
    myWindow.document.close();
    myWindow.focus();
    myWindow.print();
    myWindow.close();
}

function api(url) {
    return new Promise((resolve, reject) => {
        fetch(encodeURI(url))
            .then(response => response.text())
            .then(hasil => {
                try {
                    resolve(JSON.parse(hasil));
                } catch (e) {
                    console.log(hasil);
                    return false;
                }
            }).catch((error) => {
                reject(error)
            });
    });
}

async function rendTable(opt) {
    let sql = await api(opt.url);
    let fn = opt.fn ? opt.fn : "main";
    let table = document.createElement("table");
    let thead = table.createTHead();
    let tbody = table.createTBody();
    table.className = opt.table.cls ? opt.table.cls : "table table-striped";
    thead.className = opt.thead.cls ? opt.thead.cls : "color-bg-biru";
    tbody.id = opt.tbody.id ? opt.tbody.id : "tbodyData";
    let THEAD = '<tr>';
    for (th of sql.field.thead) {
        if (th.sort) {
            THEAD += `<th class="cursor" width="${th.width}" onclick="sorts('${th.sort}', '${fn}', '${opt.tbody.id}', '${sql.field.thead.length}')">${th.cap}</th>`;
        } else {
            THEAD += `<th class="cursor" width="${th.width}">${th.cap}</th>`;
        }
    }
    THEAD += `</tr>`;
    thead.innerHTML = THEAD;
    if (sql.data.length > 0) {
        for (i in sql.data) {
            let data = sql.data[i];
            let dom = `<tr>`;
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
    if (opt.paggination) {
        let divPG = opt.paggination.div ? opt.paggination.div : "paggination";
        rendPagginations({
            jml: sql.field.j,
            div: divPG,
            fn: fn,
            tbody: opt.tbody.id ? opt.tbody.id : "tbodyData",
            td: sql.field.thead.length
        });
    }
}

function sorts(val, fn, tbody, td = 5) {
    let ct = document.getElementById(tbody).rows.length;
    malesLoad(tbody, td, ct);
    sessionStorage.setItem("sort", val);
    if (sessionStorage.getItem("by") == "ASC") {
        sessionStorage.setItem("by", "DESC");
    } else {
        sessionStorage.setItem("by", "ASC");
    }
    execFunction(fn);
}

function rendPagginations(opt) {
    let page = sessionStorage.getItem("page"),
        jml = opt.jml,
        pg = opt.div ? opt.div : "paggination",
        fn = opt.fn ? opt.fn : "main",
        tbody = opt.tbody ? opt.tbody : "tbodyData",
        td = opt.td ? opt.td : 5,
        awal = 0,
        akhir = 0;
    if (jml > 0) {
        let div = `<ul class="pagination justify-content-center">`;
        if (page == 1) {
            div += `<li class="page-item"><span class="page-link"><i class="material-icons" style="cursor:not-allowed; font-size:12px; display: inline-flex; vertical-align: middle;">keyboard_arrow_left</i></span></li>`;
        } else {
            div += `<li class="page-item" onclick="paginations('${parseInt(page) - 1}', '${fn}', '${tbody}', '${td}');"><span class="page-link"><i class="material-icons" style="font-size:12px; display: inline-flex; vertical-align: middle;">keyboard_arrow_left</i></span></li>`;
        }
        if (page > 7) { awal = page; } else { awal = 1; }
        if (jml > 8) { if (page > 7) { akhir = parseInt(page) + 7; } else { akhir = 8; } } else { akhir = jml; }
        for (let i = awal; i <= akhir; i++) {
            if (page == i) {
                div += `<li class="page-item" style="cursor:not-allowed;"><a class="page-link active-paggination" href="javascript:">${i}</a></li>`;
            } else {
                div += `<li class="page-item" onclick="paginations('${i}', '${fn}', '${tbody}', '${td}');"><a class="page-link" href="#">${i}</a></li>`;
            }
        }
        if (page == jml) {
            div += `<li class="page-item"><span class="page-link"><i class="material-icons" style="cursor:not-allowed; font-size:12px; display: inline-flex; vertical-align: middle;">keyboard_arrow_right</i></span></li>`;
        } else {
            div += `<li class="page-item" onclick="paginations('${parseInt(page) + 1}', '${fn}', '${tbody}', '${td}');"><a class="page-link" href="#"><i class="material-icons" style="font-size:12px; display: inline-flex; vertical-align: middle;">keyboard_arrow_right</i></a></li>`;
        }
        document.getElementById(pg).innerHTML = div;
    } else {
        document.getElementById(pg).innerHTML = "";
    }
    sessionStorage.setItem("page", page);
}

function paginations(page, fn, tbody, td = 5) {
    let ct = document.getElementById(tbody).rows.length;
    malesLoad(tbody, td, ct);
    sessionStorage.setItem("page", page);
    execFunction(fn);
}

function saiki(DD = "") {
    var today = new Date();
    var dd = DD != "" ? DD : today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) { dd = '0' + dd; }
    if (mm < 10) { mm = '0' + mm; }
    today = yyyy + '-' + mm + '-' + dd;
    return today;
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