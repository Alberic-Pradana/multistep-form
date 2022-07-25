function playNotif() {
    var sound = new Audio("assets/bell.mp3");
    sound.play();
}
function counterTools() {
    let domAwal = ` <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Kode Barang</label>
                                <input type="text" id="edtKode" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Jumlah</label>
                                <input type="number" id="edtCounter" class="form-control" value="1">
                            </div>
                        </div>
                    </div>
                    <p></p>
                    <div class="d-grid">
                        <button class="btn btn-primary btn-lg" id="btnProsesCounter">Mulai</button>
                    </div>
                    `;
    document.getElementById('divTools').innerHTML = domAwal;
    document.getElementById('btnProsesCounter').addEventListener("click", function () {
        let code = document.getElementById('edtKode').value;
        let ct = document.getElementById('edtCounter').value;
        mulaiMenghitung(code, ct);
    });
}

function mulaiMenghitung(code, ct) {
    let dom = `<div class="d-flex justify-content-center align-items-center">
                    <div class="card shadow shadow-lg" style="min-height:220px; min-width:220px">
                        <div class="card-body" style="text-align:center">
                            <h1 id="h1Count" style="font-size:200px">${ct}</h1>
                        </div>
                    </div>
                </div>
                <input type="text" class="form-control" id="edtChecker">
                <div class="d-grid">
                    <button class="btn btn-primary" id="btnProgress">Proses</button>
                </div>
                `;
    document.getElementById('divTools').innerHTML = dom;
    document.getElementById('edtChecker').focus = true;
    document.getElementById('btnProgress').addEventListener("click", function () {
        let str = document.getElementById('edtChecker');
        if (str.value == code) {
            ct--;
            document.getElementById("h1Count").innerHTML = ct;
            str.value = "";
            str.focus = true;
            if (ct <= 0) playNotif();
        }
    });

    document.getElementById('edtChecker').addEventListener("input", function () {
        let str = document.getElementById('edtChecker');
        if (str.value == code) {
            ct--;
            document.getElementById("h1Count").innerHTML = ct;
            str.value = "";
            str.focus = true;
            if (ct <= 0) playNotif();
        }
    });
}

// kalklator
function calculatorTools() {
    let dom = ` <input type="number" id="edtHasil" style="width: 100%;" class="form-control form-control-lg" readonly>
                <table style="width: 100%;">
                    <tr>
                        <td><button style="width:100%" class="btn btn-primary" onclick="prosesCalculator(this.innerText)">1</button></td>
                        <td><button style="width:100%" class="btn btn-primary" onclick="prosesCalculator(this.innerText)">2</button></td>
                        <td><button style="width:100%" class="btn btn-primary" onclick="prosesCalculator(this.innerText)">3</button></td>
                        <td><button style="width:100%" class="btn btn-danger" onclick="prosesCalculator(this.innerText)">+</button></td>
                    </tr>
                    <tr>
                        <td><button style="width:100%" class="btn btn-primary" onclick="prosesCalculator(this.innerText)">4</button></td>
                        <td><button style="width:100%" class="btn btn-primary" onclick="prosesCalculator(this.innerText)">5</button></td>
                        <td><button style="width:100%" class="btn btn-primary" onclick="prosesCalculator(this.innerText)">6</button></td>
                        <td><button style="width:100%" class="btn btn-danger" onclick="prosesCalculator(this.innerText)">-</button></td>
                    </tr>
                    <tr>
                        <td><button style="width:100%" class="btn btn-primary" onclick="prosesCalculator(this.innerText)">7</button></td>
                        <td><button style="width:100%" class="btn btn-primary" onclick="prosesCalculator(this.innerText)">8</button></td>
                        <td><button style="width:100%" class="btn btn-primary" onclick="prosesCalculator(this.innerText)">9</button></td>
                        <td><button style="width:100%" class="btn btn-danger" onclick="prosesCalculator(this.innerText)">:</button></td>
                    </tr>
                    <tr>
                        <td><button style="width:100%" class="btn btn-primary" onclick="prosesCalculator(this.innerHTML)">0</button></td>
                        <td colspan="2"><button style="width:100%" class="btn btn-warning" onclick="prosesCalculator(this.innerHTML)">=</button></td>
                        <td><button style="width:100%" class="btn btn-danger" onclick="prosesCalculator(this.innerHTML)">X</button></td>
                    </tr>
                </table>`;
    document.getElementById('divTools').innerHTML = dom;
}

function prosesCalculator(nah) {
    var nil = nah.replace(/\s+/g, '');
    if (!isNaN(nil)) {
        if (document.getElementById('edtHasil').value == 0) {
            document.getElementById('edtHasil').value = nil;
        } else {
            document.getElementById('edtHasil').value += nil;
        }
    } else {
        if (nil != "=") {
            sessionStorage.setItem("tmp", document.getElementById('edtHasil').value);
            sessionStorage.setItem("opr", nil);
            document.getElementById('edtHasil').value = 0;
        } else {
            var val = document.getElementById('edtHasil').value;
            var opr = sessionStorage.getItem("opr");
            var tmp = sessionStorage.getItem("tmp");
            if (opr == "-") {
                document.getElementById('edtHasil').value = tmp - val;
            } else if (opr == "+") {
                document.getElementById('edtHasil').value = parseInt(tmp) + parseInt(val);
            } else if (opr == "X") {
                document.getElementById('edtHasil').value = tmp * val;
            } else if (opr == ":") {
                document.getElementById('edtHasil').value = tmp / val;
            }
        }
    }
}

// tools buat qr;
function qrTools() {
    let dom = `<div class="row">
                    <div class="col-md-4 mb-2">
                        <div class="form-group">
                            <label>Text</label>
                            <input type="text" class="form-control" id="edtQR" required>
                        </div>
                    </div>
                    <div class="col-md-4 mb-2">
                        <div class="form-group">
                            <label>Ukuran</label>
                            <input type="number" class="form-control" id="edtSize" value="250" required>
                        </div>
                    </div>
                    <div class="col-md-4 mb-2">
                        <div class="form-group">
                            <label>Jumlah</label>
                            <input type="number" class="form-control" id="edtQty" required>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div></
                </div>
                <div class="row">
                    <div class="col-md-6 mb-2">
                        <div class="d-grid"><button class="btn btn-primary" id="btnQR">Proses</button></div>
                    </div>
                    <div class="col-md-6 mb-2">
                        <div class="d-grid"><button class="btn btn-primary" id="btnPrint" disabled>Cetak</button></div>                    
                    </div>
                </div>
                <p></p>
                <center id="divResult"></center>`;
    document.getElementById('divTools').innerHTML = dom;

    if (!document.getElementById("scriptQRGenerator")) {
        var nodeQR = document.createElement("script");
        nodeQR.id = "scriptQRGenerator";
        nodeQR.src = "assets/js/qr-generator.js";
        document.getElementById("divScript").appendChild(nodeQR);
    }
    document.getElementById('btnQR').addEventListener("click", () => {
        let text = document.getElementById('edtQR').value;
        let size = document.getElementById('edtSize').value;
        let jml = document.getElementById('edtQty').value;
        if (text != "") {
            document.getElementById('btnPrint').disabled = false;
            let domR = "<div class='row'>";
            for (i = 0; i < jml; i++) {
                domR += `<div class="col mb-2"><canvas id="qr-code${i}"></canvas></div>`;
            }
            domR += "</div>";
            document.getElementById('divResult').innerHTML = domR;
            for (i = 0; i < jml; i++) {
                qr = new QRious({
                    element: document.getElementById('qr-code' + i)
                });
                qr.set({
                    foreground: 'black',
                    size: size,
                    value: text
                });
            }

        } else {
            alert("Silahkan isi text terlebih dahulu");
        }
    });

    document.getElementById('btnPrint').addEventListener("click", function () {
        let myWindow = window.open('', '', 'width=1000,height=800');
        myWindow.document.write(document.getElementById('divResult').innerHTML);
        myWindow.document.close();
        myWindow.focus();
        myWindow.print();
        myWindow.close();
    });
}

function barcodeTools() {
    let dom = `<div class="row">
                    <div class="col-md-4 mb-2">
                        <div class="form-group">
                            <label>Text</label>
                            <input type="text" class="form-control" id="edtBC" required>
                        </div>
                    </div>
                    <div class="col-md-6 mb-2">
                        <div class="row">
                            <div class="col-md-6 mb-2">
                                <div class="form-group">
                                    <label>Height</label>
                                    <input type="number" class="form-control" id="edtHeight" value="100" required>
                                </div>
                            </div>
                            <div class="col-md-6 mb-2">
                                <div class="form-group">
                                    <label>Width</label>
                                    <input type="number" class="form-control" id="edtWidth" value="2" required>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2 mb-2">
                        <div class="form-group">
                            <label>Jumlah</label>
                            <input type="number" value="1" class="form-control" id="edtQty" required>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div></
                </div>
                <div class="row">
                    <div class="col-md-6 mb-2">
                        <div class="d-grid"><button class="btn btn-primary" id="btnBC">Proses</button></div>
                    </div>
                    <div class="col-md-6 mb-2">
                        <div class="d-grid"><button class="btn btn-primary" id="btnPrint" disabled>Cetak</button></div>                    
                    </div>
                </div>
                <p></p>
                <center id="divResult">
                    
                </center>`;
    document.getElementById('divTools').innerHTML = dom;

    document.getElementById('btnBC').addEventListener("click", () => {
        let text = document.getElementById('edtBC').value;
        let height = document.getElementById('edtHeight').value;
        let width = document.getElementById('edtWidth').value;
        let jml = document.getElementById('edtQty').value;
        if (text != "") {
            let domB = `<div class="row">`;
            document.getElementById('btnPrint').disabled = false;
            for (i = 0; i < jml; i++) {
                domB += `<div class="col mb-2"><svg class="barcode" viewBox="0 0 0 0"></svg></div>`;
            }
            document.getElementById('divResult').innerHTML = domB;
            JsBarcode(".barcode", text,{
                height:height,
                width:width
            });
        } else {
            alert("Silahkan isi text terlebih dahulu");
        }
    });

    document.getElementById('btnPrint').addEventListener("click", function () {
        let myWindow = window.open('', '', 'width=1000,height=800');
        myWindow.document.write(document.getElementById('divResult').innerHTML);
        myWindow.document.close();
        myWindow.focus();
        myWindow.print();
        myWindow.close();
    });
}

async function trackingTools() {
    let sql = await api("sys/api?act=dataKurir");
    let opt = "";
    for (tr of sql) opt += `<option value="${tr.Code}">${tr.Nama}</option>`;
    let dom = `<div class="row">
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label>Nama Expedisi</label>
                        <select name="expedisi" id="edtKurir" class="form-control" required>${opt}</select>
                        <div class="invalid-feedback">Silahkan Pilih Expedisi Yang Anda Gunakan</div>
                    </div>
                </div>
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label>Nomer Resi</label>
                        <input type="text" name="resi" id="edtResi" class="form-control" required>
                        <div class="invalid-feedback">Sulahkan masukan nomor resi</div>
                    </div>
                </div>
                <div class="d-grid">
                    <button class="btn btn-default" id="btnTracking">Tracking</button>
                </div>
                <div id="viewHasil"></div>`;
    document.getElementById("divTools").innerHTML = dom;
    document.getElementById("btnTracking").addEventListener("click", async () => {
        let resi = document.getElementById('edtResi').value;
        let kurir = document.getElementById('edtKurir').value;
        let track = await api(`sys/api?act=tracking&expedisi=${kurir}&resi=${resi}`);
        if (track.rajaongkir.status.code == "200") {
            let data = track.rajaongkir.result;
            let table = `
                <table class="table table-stripet">
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Jam</th>
                            <th>Status</th>
                        </tr>
                    </thead>  
                    <tbody>`;
            for (res of data.manifest) {
                table += `
                <tr>
                    <td>${res.manifest_date}</td>
                    <td>${res.manifest_time}</td>
                    <td>${res.manifest_description}</td>
                </tr>`;
            }
            table += `</tbody></table>`;
            document.getElementById("viewHasil").innerHTML = table;
        } else {
            document.getElementById("viewHasil").innerHTML = track.rajaongkir.status.description;
        }
    });
}

async function ongkirTools() {
    let kurir = await api("sys/api?act=dataKurir");
    let optKurir = "";
    for (tr of kurir) optKurir += `<option value="${tr.Code}">${tr.Nama}</option>`;
    let prov = await api("sys/api?act=dataProvinsi");
    let optProv = "";
    for (tr of prov) optProv += `<option value="${tr.ID}">${tr.Nama}</option>`;
    let dom = `<div class="row">
                <div class="col-md-6 mb2">
                    <div class="form-group">
                        <label>Provinsi Asal</label>
                        <select name="provinsiA" id="edtProvinsiA" class="form-control form-control-sm" onchange="getKota(this.value, 'edtKotaA')" required>
                            <option value="" selected disabled>Silahkan Pilih Provinsi</option>
                            ${optProv}
                        </select>
                        <div class="invalid-feedback">Silahkan Pilih Provinsi Asal</div>
                    </div>
                    <div class="form-group">
                        <label>Kota Asal</label>
                        <select name="kotaA" id="edtKotaA" class="form-control form-control-sm" onchange="getKecamatan(this.value, 'edtKecamatanA')" disabled required></select>
                        <div class="invalid-feedback">Silahkan Pilih Kota Asal</div>
                    </div>
                    <div class="form-group">
                        <label>Kecamatan Asal</label>
                        <select name="kecamatanA" id="edtKecamatanA" class="form-control form-control-sm" disabled required></select>
                        <div class="invalid-feedback">Silahkan Pilih Kecamatan Asal</div>
                    </div>
                </div>
                <div class="col-md-6 mb2">
                    <div class="form-group">
                        <label>Provinsi Tujuan</label>
                        <select name="provinsiT" id="edtProvinsiT" class="form-control form-control-sm" onchange="getKota(this.value, 'edtKotaT')" required>
                            <option value="" selected disabled>Silahkan Pilih Provinsi</option>
                            ${optProv}
                        </select>
                        <div class="invalid-feedback">Silahkan Pilih Provinsi Tujuan</div>
                    </div>
                    <div class="form-group">
                        <label>Kota Tujuan</label>
                        <select name="kotaT" id="edtKotaT" class="form-control form-control-sm" onchange="getKecamatan(this.value, 'edtKecamatanT')" disabled required></select>
                        <div class="invalid-feedback">Silahkan Pilih Kota Tujuan</div>
                    </div>
                    <div class="form-group">
                        <label>Kecamatan Tujuan</label>
                        <select name="kecamatanT" id="edtKecamatanT" class="form-control form-control-sm" disabled required></select>
                        <div class="invalid-feedback">Silahkan Pilih Kecamatan Tujuan</div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <div class="form-group">
                        <label>Berat Paket</label>
                        <div class="input-group input-group-sm">
                            <input type="number" name="berat" id="edtBerat" class="form-control form-control-sm" value="500" required>
                            <span class="input-group-text input-group-text-sm">Gram</span>
                        </div>
                        <div class="invalid-feedback">Berat Paket Wajib diisi</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label>Panjang Paket</label>
                        <div class="input-group input-group-sm">
                            <input type="number" name="panjang" class="form-control form-control-sm">
                            <span class="input-group-text input-group-text-sm">CM</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label>Lebar Paket</label>
                        <div class="input-group input-group-sm">
                            <input type="number" name="lebar" class="form-control form-control-sm">
                            <span class="input-group-text input-group-text-sm">CM</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label>Tinggi Paket</label>
                        <div class="input-group input-group-sm">
                            <input type="number" name="tinggi" class="form-control form-control-sm">
                            <span class="input-group-text input-group-text-sm">CM</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label>Kurir</label>
                <select name="kurir" id="edtKurir" class="form-control form-control-sm" required>${optKurir}</select>
                <div class="invalid-feedback">Silahkan Pilih Kurir</div>
            </div>
            <p></p>
            <div class="d-grid">
                <button id="btnOngkir" class="btn btn-default">Cek Ongkir</button>
            </div>
            <div id="divHasilOngkir"></div>`;
    document.getElementById('divTools').innerHTML = dom;
    document.getElementById('btnOngkir').addEventListener("click", async () => {
        let btn = document.getElementById('btnOngkir');
        btn.disabled = true;
        btn.innerText = "Mengecek . . .";
        let k = document.getElementById('edtKurir').value;
        let b = document.getElementById('edtBerat').value;
        let a = document.getElementById('edtKecamatanA').value;
        let t = document.getElementById('edtKecamatanT').value;
        let sql = await api(`sys/api?act=cekOngkir&kecamatanA=${a}&kecamatanT=${t}&berat=${b}&kurir=${k}`);
        let td = "";
        for (x of sql.rajaongkir.results[0].costs) {
            td += `<tr>
                        <td>${x.service}</td>
                        <td>${numberFormat(x.cost[0].value)}</td>
                        <td>${x.cost[0].etd}</td>
                    </tr>`;
        }

        let table = `<table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Layanan</th>
                                <th>Biaya</th>
                                <th>Estimasi</th>
                            </tr>
                        </thead>
                        <tbody>${td}</tbody>
                    </table>`;
        document.getElementById('divHasilOngkir').innerHTML = table;
        btn.disabled = false;
        btn.innerText = "Cek Ongkir";
    });
}