
async function getNotif() {
    let data = await api("sys/api?act=dataNotif");
    let qty = data.qty;
    let hutang = data.hutang;
    let piutang = data.piutang;
    let project = data.project;
    let divQty = "", divHutang = "", divPiutang = "", divProject = "";
    if (qty.length > 0) {
        divQty = `<h2 class="accordion-header" id="flush-headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                ${qty.length} Barang di bawah minimal Stok
                </button>
                </h2>
                <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample"><div class="accordion-body list-group">`;
        for (QTY of qty) {
            divQty += `<button type="button" class="list-group-item list-group-item-action">Stok <b>${QTY.ItemName}</b> adalah <b>${QTY.Qty}</b></button>`;
        }
        divQty += `</div></div>`;
    }
    if (hutang.length > 0) {
        divHutang = `
                <h2 class="accordion-header" id="flush-headingTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                        ${hutang.length} Hutang Jatuh Tempo
                    </button>
                </h2>
                <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">`;
        for (HUTANG of hutang) {
            divHutang += `<button type="button" class="list-group-item list-group-item-action">Hutang Kepada <b>${HUTANG.CardName}</b> jatuh tempo pada <b>${tanggalIndo(HUTANG.TermDate)}</b></button>`;
        }
        divHutang += `</div></div>`;
    }
    if (piutang.length > 0) {
        divPiutang = `
                <h2 class="accordion-header" id="flush-headingThree">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                        ${piutang.length} Hutang Jatuh Tempo
                    </button>
                </h2>
                <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">`;
        for (PIUTANG of piutang) {
            divPiutang += `<button type="button" class="list-group-item list-group-item-action">Piutang Ke <b>${PIUTANG.CardName}</b> jatuh tempo pada <b>${tanggalIndo(PIUTANG.TermDate)}</b></button>`;
        }
        divPiutang += `</div></div>`;
    }
    if (project.length > 0) {
        divProject = `
                <h2 class="accordion-header" id="flush-headingProject">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseProject" aria-expanded="false" aria-controls="flush-collapseProject">
                        ${project.length} Project Jatuh Tempo
                    </button>
                </h2>
                <div id="flush-collapseProject" class="accordion-collapse collapse" aria-labelledby="flush-headingProject" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">`;
        for (PROJECT of project) {
            divProject += `<button type="button" class="list-group-item list-group-item-action">Project <b>${PROJECT.Judul}</b> jatuh tempo pada <b>${tanggalIndo(PROJECT.TermDate)}</b></button>`;
        }
        divProject += `</div></div>`;
    }
    let dom = `
            <div class="offcanvas-header">
                <h5 id="offcanvasRightLabel">Pemberitahuan</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div class="accordion accordion-flush" id="accordionFlushExample">
                    <div class="accordion-item">
                        ${divQty}
                    </div>
                    <div class="accordion-item">
                        ${divHutang}
                    </div>
                    <div class="accordion-item">
                        ${divPiutang}
                    </div>
                    <div class="accordion-item">
                        ${divProject}
                    </div>
                </div>
            </div>`;
    document.getElementById('divSetting').innerHTML = dom;
}

setInterval(async () => {
    let cek = await api("sys/api?act=cekNotif");
    if (cek.total > 0) {
        document.getElementById('badgeNotif').style.display = "block";
    } else {
        document.getElementById('badgeNotif').style.display = "none";
    }
}, 60000);

async function getKurir(div = "edtKurir") {
    let data = await api("sys/api?act=dataKurir");
    let opt = `<option value="" selected>Silahkan pilih expedisi</option>`;
    for (provinsi of data) {
        opt += `<option value="${provinsi.ID}" id="prov${provinsi.ID}">${provinsi.Nama}</option>`;
    }
    document.getElementById(div).innerHTML = opt;
    document.getElementById(div).disabled = false;
}

async function getProvinsi(div = "edtProvinsi") {
    let data = await api("sys/api?act=dataProvinsi");
    let opt = `<option value="" selected>Silahkan pilih provinsi</option>`;
    for (provinsi of data) {
        opt += `<option value="${provinsi.ID}" id="prov${provinsi.ID}">${provinsi.Nama}</option>`;
    }
    document.getElementById(div).innerHTML = opt;
    document.getElementById(div).disabled = false;
}

async function getKota(id, div = "edtKota") {
    let data = await api("sys/api?act=dataKota&id=" + id);
    let opt = `<option value="" selected>Silahkan pilih kota</option>`;
    for (kota of data) {
        opt += `<option value="${kota.ID}" id="kota${kota.ID}">${kota.Nama}</option>`;
    }
    document.getElementById(div).innerHTML = opt;
    document.getElementById(div).disabled = false;
}

async function getKecamatan(id, div = "edtKecamatan") {
    let data = await api("sys/api?act=dataKecamatan&id=" + id);
    let opt = `<option value="" selected>Silahkan pilih kecamatan</option>`;
    for (kec of data) {
        opt += `<option value="${kec.ID}" id="kec${kec.ID}">${kec.Nama}</option>`;
    }
    document.getElementById(div).innerHTML = opt;
    document.getElementById(div).disabled = false;
}
function modalDelete(opt) {
    let fn = opt.fn ? opt.fn : "main";
    let dom = `
    <form id="iniForm" onsubmit="submitForm(event, {fn:'${fn}'});" class="needs-validation" novalidate>
        <input type="hidden" name="act" value="${opt.act}">
        <input type="hidden" name="id" value="${opt.id}">
        <div class="modal-header">
            <h5 class="modal-title">Hapus Data</h5>
            <button type="button" class="btn-close-modal" data-bs-dismiss="modal" id="dismissModal"><i class="material-icons">close</i></button>
        </div>
        <div class="modal-body">
            <h5>Apakah anda yakin akan menghapus data ini !!</h5>
        </div>
        <div class="modal-footer">
            <button type="button" id="tutupModal" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            <button type="submit" class="btn btn-danger"> <span class="material-icons">delete</span> Hapus </button>
        </div>
    </form>`;
    modal({
        data: dom
    });
}

function modalExport(opt) {
    let dom = `
    <form action="sys/export" method="post" target="_blank" class="needs-validation" novalidate>
        <input type="hidden" name="act" value="${opt.act}">
        <div class="modal-header">
            <h5 class="modal-title">Export Transaksi</h5>
            <button type="button" class="btn-close-modal" data-bs-dismiss="modal" id="dismissModal"><i class="material-icons">close</i></button>
        </div>
        <div class="modal-body">
            <div class="form-group">
                <label>Tanggal Awal</label>
                <input type="date" name="d1" id="edtD1" class="form-control orm-control-sm" value="${saiki(01)}">
            </div>
            <div class="form-group">
                <label>Tanggal Akhir</label>
                <input type="date" name="d2" id="edtD2" class="form-control orm-control-sm" value="${saiki()}">
            </div>
            <div class="form-group">
                <label>Type Laporan</label>
                <select name="type" id="edtType" class="form-control form-control-sm">
                    <option value="detail">Detail</option>
                    <option value="global">Global</option>
                </select>
            </div>
            <div class="form-group">
                <label>Export Sebagai</label>
                <select name="export" id="edtExport" class="form-control form-control-sm">
                    <option value="excel">Excel</option>
                    <option value="cetak">Cetak</option>
                </select>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="tutupModal" data-bs-dismiss="modal">Batal</button>
            <button type="sumbit" class="btn btn-default" id="btnForm"><i class="material-icons" id="lblForm">get_app</i> Export</button>
        </div>
    </form>`;
    modal({
        data: dom
    });
}

function pilihMenu(menu, caption, path) {
    let div = `<div class="main-header color-bgt-default shadow">
                    <div class="main-title">Memuat . . .</div>
                </div>
                <div class="card-body main-body">
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody id="tbodyData"></tbody>
                        </table>
                    </div>
                </div>`;
    document.getElementById("tampil").innerHTML = div;
    malesLoad('tbodyData', 5, 5);
    var h;
    var e = document.getElementsByClassName("active");
    for (let h = 0; h < e.length; h++) {
        e[h].classList.remove("active");
    }
    history.pushState(path, caption, path)
    document.getElementById(path).className = "active";
    document.title = caption;
    if (__resolusi.matches == true) {
        document.getElementById("sidebar").classList.add("active");
    }
    load("view/" + menu, "tampil");
}