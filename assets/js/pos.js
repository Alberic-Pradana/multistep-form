let __TempCard = [];
let __Audio = new Audio("assets/bell.mp3");

const tutorialModal = document.getElementById("tutorial-modal");

// OPEN TUTORIAL MODAL
function openModal() {
  GI("frameYoutubeTutorial").src = "https://www.youtube.com/embed/iPQKr6gvg8U";
  tutorialModal.style.display = "grid";
}

// CLOSE TUTORIAL MODAL
async function closeModal() {
  let chk = document.getElementById("chkSkipTutorial");
  if (chk.checked == true) await api("sys/api?act=hideTutorial&id=dashboard");
  tutorialModal.style.display = "none";
}

// CLOSE TUTORIAL MODAL ON WINDOW CLICK
window.onclick = function (event) {
  if (event.target == tutorialModal) {
    tutorialModal.style.display = "none";
  }
};

// COPY LINK TUTORIAL
function copyValue() {
  /* Get the text field */
  var copyText = document.getElementById("myValue");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value);

  /* Alert the copied text */
  pesan("Berhasil", "Link Tutorial Penggunaan Naylatools Telah Tercopy", "primary");
}

async function cekTutorial() {
  let sql = await api("sys/api?act=statusTutorial&id=dashboard");
  if (sql == 1) {
    tutorialModal.style.display = "grid";
    GI("frameYoutubeTutorial").src = "https://www.youtube.com/embed/iPQKr6gvg8U";
  } else {
    tutorialModal.style.display = "none";
  }
}

cekTutorial();

async function getNotif() {
  let data = await api("sys/api?act=dataNotif");
  let qty = data.qty;
  let hutang = data.hutang;
  let piutang = data.piutang;
  let project = data.project;
  let NamaGJ = data.NamaGJ;
  let TelpGJ = data.TelpGJ;
  let AlamatBL = data.AlamatBL;
  let divQty = "",
    arrDivQty = [],
    divHutang = "",
    arrDivHutang = [],
    divPiutang = "",
    arrDivPiutang = [],
    divProject = "",
    arrDivProject = [],
    divTrans = "",
    arrDivTrans = [];
  if (qty.length > 0) {
    for (QTY of qty) arrDivQty.push({ elm: "div", cls: "alert alert-warning", attr: { role: "alert" }, html: `Stok <b>${QTY.ItemName}</b> adalah <b>${QTY.Qty}</b>` });
    divQty = [
      {
        elm: "h2",
        cls: "accordion-header alert alert-warning",
        id: "flush-headingOne",
        elms: [
          {
            elm: "button",
            cls: "accordion-button collapsed",
            type: "button",
            attr: { "data-bs-toggle": "collapse", "data-bs-target": "#notifStok", "aria-expanded": "false", "aria-controls": "notifStok" },
            text: `${qty.length} Barang di bawah minimal Stok`,
          },
        ],
      },
      { elm: "div", cls: "accordion-collapse collapse", id: "notifStok", attr: { "data-bs-parent": "#divNotifExpand", "aria-labelledby": "notifStok" }, elms: arrDivQty },
    ];
  }
  if (hutang.length > 0) {
    for (HUTANG of hutang) arrDivHutang.push({ elm: "div", cls: "alert alert-danger", attr: { role: "alert" }, html: `Hutang Kepada <b>${HUTANG.CardName}</b> jatu Tempo Pada <b>${tanggalIndo(HUTANG.TermDate)}</b>` });
    divHutang = [
      {
        elm: "h2",
        cls: "accordion-header alert alert-danger",
        id: "flush-headingTwo",
        elms: [
          {
            elm: "button",
            cls: "accordion-button collapsed",
            type: "button",
            attr: { "data-bs-toggle": "collapse", "data-bs-target": "#notifHutang", "aria-expanded": "false", "aria-controls": "notifHutang" },
            text: `${hutang.length} Hutang Jatuh Tempo`,
          },
        ],
      },
      { elm: "div", cls: "accordion-collapse collapse", id: "notifHutang", attr: { "data-bs-parent": "#divNotifExpand", "aria-labelledby": "notifHutang" }, elms: arrDivHutang },
    ];
  }
  if (piutang.length > 0) {
    for (PIUTANG of piutang) arrDivPiutang.push({ elm: "div", cls: "alert alert-info", attr: { role: "alert" }, html: `Piutang Kepada <b>${HUTANG.CardName}</b> jatu Tempo Pada <b>${tanggalIndo(HUTANG.TermDate)}</b>` });
    divPiutang = [
      {
        elm: "h2",
        cls: "accordion-header alert alert-info",
        id: "flush-headingThree",
        elms: [
          {
            elm: "button",
            cls: "accordion-button collapsed",
            type: "button",
            attr: { "data-bs-toggle": "collapse", "data-bs-target": "#notifPiutang", "aria-expanded": "false", "aria-controls": "notifPiutang" },
            text: `${piutang.length} Piutang Jatuh Tempo`,
          },
        ],
      },
      { elm: "div", cls: "accordion-collapse collapse", id: "notifPiutang", attr: { "data-bs-parent": "#divNotifExpand", "aria-labelledby": "notifPiutang" }, elms: arrDivPiutang },
    ];
  }
  if (project.length > 0) {
    for (PROJECT of project) {
      arrDivProject.push({ elm: "div", cls: "alert alert-success", attr: { role: "alert" }, html: `Project <b>${PROJECT.Nama}</b> adalah <b>${PROJECT.Project}</b>` });
    }
    divProject = [
      {
        elm: "h2",
        cls: "accordion-header alert alert-success",
        id: "flush-headingFour",
        elms: [
          {
            elm: "button",
            cls: "accordion-button collapsed",
            type: "button",
            attr: { "data-bs-toggle": "collapse", "data-bs-target": "#notifProject", "aria-expanded": "false", "aria-controls": "notifProject" },
            text: `${project.length} Project Jatuh Tempo`,
          },
        ],
      },
      { elm: "div", cls: "accordion-collapse collapse", id: "notifProject", attr: { "data-bs-parent": "#divNotifExpand", "aria-labelledby": "notifProject" }, elms: arrDivProject },
    ];
  }
  let TransGJ = parseInt(NamaGJ) + parseInt(AlamatBL) + parseInt(TelpGJ);
  if (TransGJ > 0) {
    if (NamaGJ > 0)
      arrDivTrans.push({
        elm: "div",
        cls: "alert alert-success cursor",
        attr: { role: "alert", onclick: "pilihMenu('permintaanpenjualan', 'Transaksi Permintaan Penjualan', 'permintaanpenjualan', 'filterNamaGJ')" },
        html: `Nama Tidak Jelas <b>${NamaGJ}</b>`,
      });
    if (AlamatBL > 0)
      arrDivTrans.push({
        elm: "div",
        cls: "alert alert-success cursor",
        attr: { role: "alert", onclick: "pilihMenu('permintaanpenjualan', 'Transaksi Permintaan Penjualan', 'permintaanpenjualan', 'filterAlamatGJ')" },
        html: `Alamat Di Blacklist <b>${AlamatBL}</b>`,
      });
    if (TelpGJ > 0)
      arrDivTrans.push({
        elm: "div",
        cls: "alert alert-success cursor",
        attr: { role: "alert", onclick: "pilihMenu('permintaanpenjualan', 'Transaksi Permintaan Penjualan', 'permintaanpenjualan', 'filterTelpGJ')" },
        html: `Telp Tidak Jelas <b>${TelpGJ}</b>`,
      });
    divTrans = [
      {
        elm: "h2",
        cls: "accordion-header alert alert-success",
        id: "flush-headingFive",
        elms: [
          {
            elm: "button",
            cls: "accordion-button collapsed",
            type: "button",
            attr: { "data-bs-toggle": "collapse", "data-bs-target": "#notifTrans", "aria-expanded": "false", "aria-controls": "notifTrans" },
            text: `${TransGJ} Transaksi Bermasalah`,
          },
        ],
      },
      { elm: "div", cls: "accordion-collapse collapse", id: "notifTrans", attr: { "data-bs-parent": "#divNotifExpand", "aria-labelledby": "notifTrans" }, elms: arrDivTrans },
    ];
  }
  rendElm({
    to: "#divSetting",
    elm: [
      {
        elm: "div",
        cls: "offcanvas-header",
        elms: [
          { elm: "h5", id: "offcanvasRightLabel", text: "Pemberitahuan" },
          { elm: "button", cls: "btn-close text-reset", attr: { type: "button", "data-bs-dismiss": "offcanvas", "aria-label": "Close" } },
        ],
      },
      {
        elm: "div",
        cls: "offcanvas-body",
        elms: [
          {
            elm: "div",
            cls: "accordion accordion-flush",
            attr: { id: "divNotifExpand" },
            elms: [
              { elm: "div", cls: "accordion-item", elms: divQty },
              { elm: "div", cls: "accordion-item", elms: divHutang },
              { elm: "div", cls: "accordion-item", elms: divPiutang },
              { elm: "div", cls: "accordion-item", elms: divProject },
              { elm: "div", cls: "accordion-item", elms: divTrans },
            ],
          },
        ],
      },
    ],
  });
}

setInterval(async () => {
  let cek = await api("sys/api?act=cekNotif");
  if (cek.total > 0) {
    GI("badgeNotif").style.display = "block";
  } else {
    GI("badgeNotif").style.display = "none";
  }
  if (cek.sound == 1) __Audio.play();
}, 10000);

async function getKurir(div = "edtKurir") {
  let data = await api("sys/api?act=dataKurir");
  let opt = `<option value="" selected>Silahkan pilih expedisi</option>`;
  for (provinsi of data) {
    opt += `<option value="${provinsi.Code}" id="kur${provinsi.Code}">${provinsi.Nama}</option>`;
  }
  GI(div).innerHTML = opt;
  GI(div).disabled = false;
}

async function getProvinsi(div = "edtProvinsi") {
  let data = await api("sys/api?act=dataProvinsi");
  let opt = `<option value="" selected>Silahkan pilih provinsi</option>`;
  for (provinsi of data) {
    opt += `<option value="${provinsi.ID}" id="prov${provinsi.ID}">${provinsi.Nama}</option>`;
  }
  GI(div).innerHTML = opt;
  GI(div).disabled = false;
}

async function getKota(id, div = "edtKota") {
  let data = await api("sys/api?act=dataKota&id=" + id);
  let opt = `<option value="" selected>Silahkan pilih kota</option>`;
  for (kota of data) {
    opt += `<option value="${kota.ID}" id="kota${kota.ID}">${kota.Nama}</option>`;
  }
  GI(div).innerHTML = opt;
  GI(div).disabled = false;
}

async function getKecamatan(id, div = "edtKecamatan") {
  let data = await api("sys/api?act=dataKecamatan&id=" + id);
  let opt = `<option value="" selected>Silahkan pilih kecamatan</option>`;
  for (kec of data) opt += `<option value="${kec.ID}" id="kec${kec.ID}">${kec.Nama}</option>`;
  GI(div).innerHTML = opt;
  GI(div).disabled = false;
}

async function getKodePos(id, div = "edtKodePos") {
  let data = await api("sys/api?act=getKodePos&id=" + id);
  GI(div).value = data[0].Pos;
}

async function modalInfo(id, type) {
  let sql = await api(`sys/api?act=infoTransaksi&id=${id}&type=${type}`);
  let diskon = 0,
    voucher = 0,
    harga = 0,
    ppn = 0,
    total = 0,
    tr = "",
    trjrn = "",
    trtrns = "",
    dlvro = "",
    AmountOtherNote = sql.header[0].AmountOtherNote != null ? `(${sql.header[0].AmountOtherNote})` : "";
  let header = sql.header[0];
  let card = sql.card;
  for (trans of sql.detail) {
    diskon += trans.VDiscount * trans.Qty;
    voucher += trans.VVoucher * trans.Qty;
    harga += trans.Price * trans.Qty;
    ppn += trans.VPpn * trans.Qty;
    total += Math.round(trans.Total);
    let unit = "";
    if (sql.unit.length > 0) {
      unit = " ( ";
      for (un of sql.unit) {
        if (un.ItemID == trans.ItemID) unit += `${un.Qty} ${un.UnitName}, `;
      }
      unit += " )";
    }
    tr += `<tr>
                    <td>${trans.ItemName}</td>
                    <td>${trans.Qty * trans.QtyUnit} <b>(${trans.Qty} ${trans.UnitName})</b></td>
                    <td>Rp. ${numberFormat(trans.Price)}</td>
                    <td>Rp. ${numberFormat(trans.VDiscount * trans.Qty)} (${trans.PDiscount} %)</td>
                    <td>Rp. ${numberFormat(trans.VPpn * trans.Qty)}</td>
                    <td>Rp. ${numberFormat(trans.Total)}</td>
                </tr>`;
  }

  let HPP = "";
  if (sql.hpp.length > 0) {
    let tbodyHpp = "";
    for (let hpp of sql.hpp) {
      tbodyHpp += `<tr>
                            <td>${hpp.DocNumber}</td>
                            <td>${hpp.ItemName}</td>
                            <td>${hpp.Qty}</td>
                            <td>Rp. ${numberFormat(hpp.Price)}</td>
                            <td>Rp. ${numberFormat(hpp.Price * hpp.Qty)}</td>
                        </tr>`;
    }
    HPP = `<label>HPP</label>
                <table class="table table-striped">
                    <thead class="color-bg-biru">
                        <tr>
                            <th>Nama Dokumen</th>
                            <th>Nama Barang</th>
                            <th>Qty</th>
                            <th>Harga</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>${tbodyHpp}</tbody>
                </table>`;
  }

  for (jurnal of sql.jurnal) {
    trjrn += `<tr>
                    <td>${jurnal.NamaAkun}</td>
                    <td>${numberFormat(jurnal.DAmount)}</td>
                    <td>${numberFormat(jurnal.CAmount)}</td>
                </tr>`;
  }
  for (jurnal of sql.jtrans) {
    trtrns += `<tr>
                    <td>${jurnal.NamaAkun}</td>
                    <td>${numberFormat(jurnal.DAmount)}</td>
                    <td>${numberFormat(jurnal.CAmount)}</td>
                </tr>`;
  }
  for (jurnal of sql.jdlvro) {
    dlvro += `<tr>
                    <td>${jurnal.NamaAkun}</td>
                    <td>${numberFormat(jurnal.DAmount)}</td>
                    <td>${numberFormat(jurnal.CAmount)}</td>
                  </tr>`;
  }
  let tdVoucher = "",
    tempVoucher = 0,
    tdDiscon = "";
  if (sql.voucher.length > 0) {
    for (let voc of sql.voucher) {
      tdVoucher += `<tr>
                                <td colspan="5">Voucher <strong>(${voc.Code})</strong></td>
                                <td>Rp. -${numberFormat(voc.Amount)}</td>
                            </tr>`;
      tempVoucher += parseInt(voc.Amount);
    }
  }
  if (header.VDiscount > 0) {
    tdDiscon = `<tr>
                        <td colspan="5">Diskon</strong></td>
                        <td>Rp. -${numberFormat(header.VDiscount)}</td>
                    </tr>`;
  }
  let file = "";
  if (sql.file.length > 0) {
    for (let f of sql.file) {
      file += rendElm({
        elm: [{ elm: "img", attr: { src: f.File, width: "200px", height: "200px", onclick: `openImg('${f.File}')` } }],
      });
    }
  }
  let dom = `<div class="modal-header">
                    <h5 class="modal-title">Detail Transaksi</h5>
                    <button type="button" class="btn-close-modal" data-bs-dismiss="modal" id="dismissModal"><i class="material-icons">close</i></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <table class="table">
                                <tr>
                                    <td width="20%">Tanggal</td>
                                    <td>${tanggalIndo(header.DocDate)}</td>
                                </tr>
                                <tr>
                                    <td>Reff Docnumber</td>
                                    <td>${header.ReffDocNumber}</td>
                                </tr>
                                <tr>
                                    <td>Nomor Faktur</td>
                                    <td>${header.DocNumber}</td>
                                </tr>
                                <tr>
                                    <td>Pelanggan</td>
                                    <td>${header.CardName}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-md-6">
                            <table class="table">
                                <tr>
                                    <td width="20%">Keterangan</td>
                                    <td>${header.Notes}</td>
                                </tr>
                                <tr>
                                    <td width="20%">Penerima</td>
                                    <td>${card.CardName}</td>
                                </tr>
                                <tr>
                                    <td width="20%">Telp</td>
                                    <td>${card.Telp}</td>
                                </tr>
                                <tr>
                                    <td width="20%">Alamat</td>
                                    <td>${card.Alamat}</td>
                                </tr>
                                <tr>
                                    <td width="20%">Di Buat Oleh</td>
                                    <td>${header.Karyawan}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <p>${file}</p>
                    
                    <div class="table-responsive-sm">
                        <table class="table table-striped">
                            <thead class="color-bgt-biru">
                                <tr>
                                    <th>Nama Barang</th>
                                    <th>Qty</th>
                                    <th>Harga</th>
                                    <th>Diskon</th>
                                    <th>PPN</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${tr}
                                <tr>
                                    <td colspan="2">Total</td>
                                    <td>Rp. ${numberFormat(harga)}</td>
                                    <td>Rp. ${numberFormat(diskon)}</td>
                                    <td>Rp. ${numberFormat(ppn)}</td>
                                    <td>Rp. ${numberFormat(total)}</td>
                                </tr>
                                <tr>
                                    <td colspan="5"><strong>Biaya Lain-Lain ${AmountOtherNote}</strong></td>
                                    <td>Rp. ${numberFormat(header.AmountOther)}</td>
                                </tr>
                                ${tdDiscon}
                                ${tdVoucher}
                                <tr>
                                    <td colspan="5"><strong>Grand Total</strong></td>
                                    <td>Rp. ${numberFormat(parseInt(total - (tempVoucher + parseInt(header.VDiscount))) + parseInt(header.AmountOther))}</td>
                                </tr>
                            </tbody>
                        </table>
                        <label>Alur Keuangan</label>
                        <table class="table table-striped">
                            <thead class="color-bg-biru">
                                <tr>
                                    <th>Nama Akun</th>
                                    <th>Debit</th>
                                    <th>Kredit</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${trjrn}
                                <tr>
                                    <td colspan="3"><b>Akun Persediaan<b></td>
                                </tr>
                                ${trtrns}
                                ${dlvro}
                            </tbody>
                        </table>
                        ${HPP}
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" onclick="modalHistory('trans', '${id}')">History Edit</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Keluar</button>
                </div>`;
  modal({
    data: dom,
    cls: "modal-xl",
    static: "tidak",
  });
}

function openImg(img) {
  window.open(img, "_blank");
}

async function modalHistory(type, id) {
  let dom = rendElm({
    elm: [
      {
        elm: "div",
        cls: "row",
        elms: [
          {
            elm: "div",
            cls: "col-md-6",
            elms: [
              { elm: "h4", text: "Sebelum Diedit", style: "text-align:center" },
              { elm: "div", cls: "table-responsive", id: "tableBefore" },
            ],
          },
          {
            elm: "div",
            cls: "col-md-6",
            elms: [
              { elm: "h4", text: "Sesudah Diedit", style: "text-align:center" },
              { elm: "div", cls: "table-responsive", id: "tableAfter" },
            ],
          },
        ],
      },
    ],
  });

  rendModal({
    title: "History Edit",
    body: dom,
    id: "modalLog",
    cls: "modal-xl",
    static: "tidak",
  });

  let sql = await api("sys/api?act=dataLog", { act: "dataLog", type: type, id: id });
  if (sql.length > 0) {
    let arrBefore = [],
      arrAfter = [];
    for (let log of sql) {
      let before = JSON.parse(log.Before);
      let after = JSON.parse(log.After);
      arrAfter.push({
        DocDate: after.header.DocDate,
        PayType: after.header.PayType,
        PayStatus: after.header.PayStatus,
        GrandTotal: after.header.GrandTotal,
        Notes: after.header.Notes,
        UserName: log.UserName,
        ID: log.ID,
      });
      arrBefore.push({
        DocDate: before.header.DocDate,
        PayType: before.header.PayType,
        PayStatus: before.header.PayStatus,
        GrandTotal: before.header.GrandTotal,
        Notes: before.header.Notes,
        UserName: log.UserName,
        ID: log.ID,
      });
    }
    let field = {
      thead: [
        { cap: "Tanggal", sort: "DocDate" },
        { cap: "Jenis Pembayaran", sort: "PayType" },
        { cap: "Status Pembayaran", sort: "PayStatus" },
        { cap: "Total", sort: "GrandTotal" },
        { cap: "Keterangan", sort: "Notes", type: "str" },
        { cap: "Oleh", sort: "UserName" },
        { cap: "", sort: "", type: "opsi", width: "10%" },
      ],
    };
    rendTables({
      divid: "tableBefore",
      id: "tableDataBefore",
      tbody: {
        id: "tbodyDataBefore",
        opsi: [{ type: "info", event: "detailHistory", cap: "Detail" }],
      },
      dataset: { data: arrBefore, field: field },
    });
    rendTables({
      divid: "tableAfter",
      id: "tableDataAfter",
      tbody: {
        id: "tbodyDataAfter",
        opsi: [{ type: "info", event: "detailHistory", cap: "Detail" }],
      },
      dataset: { data: arrAfter, field: field },
    });
  } else {
    let tbl = rendElm({
      elm: [{ elm: "h5", text: "Tidak ada histori edit" }],
    });
    GI("tableBefore").innerHTML = tbl;
    GI("tableAfter").innerHTML = tbl;
  }
}

async function detailHistory(id) {
  let sql = await api("sys/api?act=detailLog", { act: "detailLog", id: id });
  let before = JSON.parse(sql.Before);
  let after = JSON.parse(sql.After);
  let detailBefore = before.detail,
    detailAfter = after.detail;
  let dom = rendElm({
    elm: [
      {
        elm: "div",
        cls: "row",
        elms: [
          {
            elm: "div",
            cls: "col-md-6",
            elms: [
              { elm: "h4", text: "Sebelum Diedit", style: "text-align:center" },
              {
                elm: "div",
                cls: "table-responsive",
                id: "tableBefore",
                elms: [
                  {
                    elm: "table",
                    cls: "table table-striped",
                    elms: [
                      {
                        elm: "tr",
                        elms: [
                          { elm: "td", text: "Nomor Faktur" },
                          { elm: "td", text: ":" },
                          { elm: "td", text: before.header.DocNumber },
                        ],
                      },
                      {
                        elm: "tr",
                        elms: [
                          { elm: "td", text: "Tanggal" },
                          { elm: "td", text: ":" },
                          { elm: "td", text: tanggalIndo(before.header.DocDate) },
                        ],
                      },
                      {
                        elm: "tr",
                        elms: [
                          { elm: "td", text: "Jenis Pembayaran" },
                          { elm: "td", text: ":" },
                          { elm: "td", text: before.header.PayType },
                        ],
                      },
                      {
                        elm: "tr",
                        elms: [
                          { elm: "td", text: "Status Pembayaran" },
                          { elm: "td", text: ":" },
                          { elm: "td", text: before.header.PayStatus },
                        ],
                      },
                      {
                        elm: "tr",
                        elms: [
                          { elm: "td", text: "Akun Pembayaran" },
                          { elm: "td", text: ":" },
                          { elm: "td", text: before.header.PayName },
                        ],
                      },
                      {
                        elm: "tr",
                        elms: [
                          { elm: "td", text: "Tanggal Bayar" },
                          { elm: "td", text: ":" },
                          { elm: "td", text: before.header.PayDate },
                        ],
                      },
                      {
                        elm: "tr",
                        elms: [
                          { elm: "td", text: "Biaya Lain-lain" },
                          { elm: "td", text: ":" },
                          { elm: "td", text: numberFormat(before.header.AmountOther) + " " + before.header.AmountOtherNote },
                        ],
                      },
                      {
                        elm: "tr",
                        elms: [
                          { elm: "td", text: "Total" },
                          { elm: "td", text: ":" },
                          { elm: "td", text: numberFormat(before.header.GrandTotal) },
                        ],
                      },
                      {
                        elm: "tr",
                        elms: [
                          { elm: "td", text: "Jumlah Bayar" },
                          { elm: "td", text: ":" },
                          { elm: "td", text: numberFormat(before.header.JumlahUang) },
                        ],
                      },
                      {
                        elm: "tr",
                        elms: [
                          { elm: "td", text: "Keterangan" },
                          { elm: "td", text: ":" },
                          { elm: "td", text: before.header.Notes },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            elm: "div",
            cls: "col-md-6",
            elms: [
              { elm: "h4", text: "Sesudah Diedit", style: "text-align:center" },
              {
                elm: "div",
                cls: "table-responsive",
                id: "tableAfter",
                elms: [
                  {
                    elm: "table",
                    cls: "table table-striped",
                    elms: [
                      {
                        elm: "tr",
                        elms: [
                          { elm: "td", text: "Nomor Faktur" },
                          { elm: "td", text: ":" },
                          { elm: "td", text: after.header.DocNumber },
                        ],
                      },
                      {
                        elm: "tr",
                        elms: [
                          { elm: "td", text: "Tanggal" },
                          { elm: "td", text: ":" },
                          { elm: "td", text: tanggalIndo(after.header.DocDate) },
                        ],
                      },
                      {
                        elm: "tr",
                        elms: [
                          { elm: "td", text: "Jenis Pembayaran" },
                          { elm: "td", text: ":" },
                          { elm: "td", text: after.header.PayType },
                        ],
                      },
                      {
                        elm: "tr",
                        elms: [
                          { elm: "td", text: "Status Pembayaran" },
                          { elm: "td", text: ":" },
                          { elm: "td", text: after.header.PayStatus },
                        ],
                      },
                      {
                        elm: "tr",
                        elms: [
                          { elm: "td", text: "Akun Pembayaran" },
                          { elm: "td", text: ":" },
                          { elm: "td", text: after.header.PayName },
                        ],
                      },
                      {
                        elm: "tr",
                        elms: [
                          { elm: "td", text: "Tanggal Bayar" },
                          { elm: "td", text: ":" },
                          { elm: "td", text: after.header.PayDate },
                        ],
                      },
                      {
                        elm: "tr",
                        elms: [
                          { elm: "td", text: "Biaya Lain-lain" },
                          { elm: "td", text: ":" },
                          { elm: "td", text: numberFormat(after.header.AmountOther) + " " + after.header.AmountOtherNote },
                        ],
                      },
                      {
                        elm: "tr",
                        elms: [
                          { elm: "td", text: "Total" },
                          { elm: "td", text: ":" },
                          { elm: "td", text: numberFormat(after.header.GrandTotal) },
                        ],
                      },
                      {
                        elm: "tr",
                        elms: [
                          { elm: "td", text: "Jumlah Bayar" },
                          { elm: "td", text: ":" },
                          { elm: "td", text: numberFormat(after.header.JumlahUang) },
                        ],
                      },
                      {
                        elm: "tr",
                        elms: [
                          { elm: "td", text: "Keterangan" },
                          { elm: "td", text: ":" },
                          { elm: "td", text: after.header.Notes },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            elm: "div",
            cls: "col-md-6",
            elms: [
              { elm: "h6", text: "Detail Transaksi", style: "text-align:left" },
              { elm: "div", cls: "table-responsive", id: "tableDetailBefore" },
            ],
          },
          {
            elm: "div",
            cls: "col-md-6",
            elms: [
              { elm: "h6", text: "Detail Transaksi", style: "text-align:left" },
              { elm: "div", cls: "table-responsive", id: "tableDetailAfter" },
            ],
          },
        ],
      },
    ],
  });

  rendModal({
    title: "Detail History Edit",
    body: dom,
    id: "modalDetailLog",
    cls: "modal-fullscreen",
    static: "tidak",
  });

  let field = {
    thead: [
      { cap: "Nama", sort: "ItemName" },
      { cap: "Qty", sort: "Qty" },
      { cap: "Harga", sort: "Price" },
      { cap: "Diskon", sort: "VDiscount" },
      { cap: "PPN", sort: "Ppn" },
      { cap: "Total", sort: "Total" },
    ],
  };

  rendTables({
    dataset: { data: detailBefore, field: field },
    divid: "tableDetailBefore",
    id: "tableDataBefore",
    tbody: { id: "tbodyDataBefore" },
    tfoot: {
      cap: "Total",
      field: ["Qty", "Price", "VDiscount", "Total"],
    },
  });

  rendTables({
    dataset: { data: detailAfter, field: field },
    divid: "tableDetailAfter",
    id: "tableDataAfter",
    tbody: { id: "tbodyDataAfter" },
    tfoot: {
      cap: "Total",
      field: ["Qty", "Price", "VDiscount", "Total"],
    },
  });
}

async function modalStokMinus(data) {
  let tr = "";
  for (let td of data) {
    tr += rendElm({
      elm: [
        {
          elm: "tr",
          elms: [
            { elm: "td", text: td.ItemName },
            { elm: "td", text: numberFormat(td.Qty) },
            { elm: "td", text: numberFormat(td.Jml) },
            { elm: "td", text: numberFormat(td.Total) },
          ],
        },
      ],
    });
  }
  let dom = rendElm({
    elm: [
      {
        elm: "div",
        cls: "table-respnsive",
        id: "tableDataStokMinus",
        elms: [
          {
            elm: "table",
            cls: "table table-striped",
            elms: [
              {
                elm: "thead",
                cls: "color-bg-biru",
                elms: [
                  {
                    elm: "tr",
                    elms: [
                      { elm: "th", text: "Nama Barang" },
                      { elm: "th", text: "Jumlah Stok" },
                      { elm: "th", text: "Jumlah Diminta" },
                      { elm: "th", text: "Kekurangan" },
                    ],
                  },
                ],
              },
              { elm: "tbody", id: "tbodyDataStokMinus", html: tr },
            ],
          },
        ],
      },
    ],
  });

  rendModal({
    title: "Detail Stok Minus",
    body: dom,
    id: "modalLog",
    cls: "modal-lg modal-dialog-centered",
    static: "tidak",
  });
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
    data: dom,
    id: "modalDelete",
    static: "tidak",
  });
}

function modalDelete2(id, param) {
  let opt = JSON.parse(param);
  let act = opt.act || "hapus transaksi";
  let frm = opt.frmID || "iniForm";
  let fn = opt.fn || "main";
  let crud = opt.crud || "sys/crud";
  let form = rendElm({
    elm: [
      { elm: "input", type: "hidden", name: "act", value: act },
      { elm: "input", type: "hidden", name: "id", value: id },
      { elm: "h5", text: "Apakah Anda Yakin akan menghapus data ini !!" },
    ],
  });
  let btn = rendElm({
    elm: [
      {
        elm: "button",
        type: "submit",
        cls: "btn btn-danger",
        id: "btnSubmitDelete",
        elms: [
          { elm: "span", cls: "material-icons", text: "delete" },
          { elm: "span", text: " Hapus" },
        ],
      },
    ],
  });
  rendModal({
    title: "Hapus Data",
    body: form,
    form: true,
    footer: btn,
    frmID: frm,
    fn: `submitForm(event, {form:'#${frm}', fn:'${fn}', crud:'${crud}'})`,
  });
}

async function modalCard(type = "suplier", edtNama = "edtCardNama", edtID = "edtCardID", fn = false) {
  let dom = rendElm({
    elm: [
      {
        elm: "div",
        cls: "row",
        elms: [
          {
            elm: "div",
            cls: "col-md-3 mb-2",
            elms: [
              {
                elm: "select",
                id: "edtFilterCard",
                cls: "form-select",
                elms: [
                  { elm: "option", value: "Nama", text: "Nama" },
                  { elm: "option", value: "Telp", text: "Telp" },
                  { elm: "option", value: "Alamat", text: "Alamat" },
                  { elm: "option", value: "Email", text: "Email" },
                  { elm: "option", value: "MemberCode", text: "Kode Member" },
                ],
              },
            ],
          },
          {
            elm: "div",
            cls: "col-md-9 mb-2",
            elms: [
              {
                elm: "div",
                cls: "input-group",
                elms: [
                  { elm: "input", type: "search", cls: "form-control", placeholder: "Cari Data " + type, id: "edtCariCard" },
                  { elm: "button", cls: "btn btn-default", elms: [{ elm: "span", cls: "material-icons", text: "restart_alt" }], id: "btnReset" },
                ],
              },
            ],
          },
        ],
      },
      { elm: "p" },
      { elm: "div", cls: "table-responsive", id: "divTableCariCard" },
    ],
  });

  rendModal({
    title: `Cari data ${type}`,
    body: dom,
    id: "modalCard",
    static: "tidak",
    btn: "tutupModalCard",
    cls: "modal-lg",
  });

  let sql = await api(`sys/api?act=dataCard&type=${type}&filter=Nama&q=`);
  __TempCard = sql;
  let field = {
    thead: [
      { cap: "Nama", sort: "Nama", type: "str" },
      { cap: "Kode Member", sort: "MemberCode", type: "str" },
      { cap: "Telp", sort: "Telp", type: "str" },
      { cap: "Email", sort: "Email", type: "str" },
      { cap: "Alamat", sort: "Alamat", type: "str" },
    ],
  };

  rendTables({
    divid: "divTableCariCard",
    id: "tableDataCariCard",
    dataset: { data: sql.data, field: field },
    tbody: {
      click: "pilihCard",
      param: JSON.stringify({ fn: fn, edtNama: edtNama, edtID: edtID }),
    },
  });

  GI("btnReset").addEventListener("click", function () {
    if (GI(edtNama)) GI(edtNama).value = "";
    if (GI(edtID)) GI(edtID).value = "";
    setState({ CardID: "", CardNama: "" });
    if (fn != false) main();
    GI("tutupModalCard").click();
  });

  GI("edtCariCard").addEventListener("keyup", async function () {
    let filter = GI("edtFilterCard").value;
    let sql = await api(`sys/api?act=dataCard&type=${type}&filter=${filter}&q=${this.value}`);
    __TempCard = sql;
    rendTables({
      divid: "divTableCariCard",
      id: "tableDataCariCard",
      dataset: { data: sql.data, field: field },
      tbody: {
        click: "pilihCard",
        param: JSON.stringify({ fn: fn, edtNama: edtNama, edtID: edtID }),
      },
    });
  });
}

function pilihCard(e, param) {
  let opt = JSON.parse(param);
  let ini = e.target.parentNode;
  let i = ini.rowIndex;
  let card = __TempCard.data[i - 1];
  let nama = ini.cells[0].innerText;
  if (GI(opt.edt)) GI(opt.edt).value = nama;
  if (GI("edtTelp")) GI("edtTelp").value = ini.cells[1].innerText;
  if (GI(opt.edtNama)) GI(opt.edtNama).value = nama;
  if (GI(opt.edtID)) GI(opt.edtID).value = ini.dataset.id;
  if (GI("edtAlamat")) GI("edtAlamat").value = ini.cells[3].innerText;
  if (GI("prov" + card.Provinsi)) GI("prov" + card.Provinsi).selected = true;
  if (GI("edtKota")) getKota(card.Provinsi);
  if (GI("edtKecamatan")) getKecamatan(card.Kota);
  if (GI("edtKodePos")) getKodePos(card.Kec, "edtKodePos");
  setTimeout(() => {
    if (GI("kec" + card.Kec)) GI("kec" + card.Kec).selected = true;
    if (GI("kota" + card.Kota)) GI("kota" + card.Kota).selected = true;
  }, 200);
  setState({ CardID: ini.dataset.id, CardNama: nama });
  if (opt.fn != false) {
    window[opt.fn]();
  }
  GI("tutupModalCard").click();
}

function modalItem(opt) {
  let dom = rendElm({
    elm: [
      { elm: "input", type: "search", id: "edtQItem", cls: "form-control fokus", placeholder: "Cari Nama Barang", style: "margin-bottom:10px" },
      {
        elm: "table",
        cls: "table table-striped table-hover",
        elms: [
          {
            elm: "thead",
            cls: "color-bg-biru",
            elms: [
              {
                elm: "tr",
                elms: [
                  { elm: "th", text: "Nama" },
                  { elm: "th", text: "Stok" },
                  { elm: "th", text: "Harga" },
                  { elm: "th", text: "Type" },
                  { elm: "th", text: "Keterangan" },
                ],
              },
            ],
          },
          { elm: "tbody", id: "dataBarangTmp" },
        ],
      },
    ],
  });

  rendModal({
    title: "Cari Barang",
    body: dom,
    static: "tidak",
    cls: "modal-lg",
    btn: "tutupModalSearch",
  });

  cariDataItem("", opt);
  GI("edtQItem").addEventListener("keyup", function () {
    cariDataItem(this.value, opt);
  });
}

async function cariDataItem(q, opt) {
  let type = opt.qty ? opt.qty : "",
    isSell = opt.isSell ? opt.isSell : "",
    isBuy = opt.isBuy ? opt.isBuy : "",
    isShow = opt.isShow ? opt.isShow : "",
    isProd = opt.isProd ? opt.isProd : "",
    MP = opt.MarketplaceID ? opt.MarketplaceID : "";
  let data = await api(`sys/api?act=dataBarang&type=Nama&q=${q}&mp=${MP}&mode=${type}&isBuy=${isBuy}&isSell=${isSell}&isShow=${isShow}&isProd=${isProd}`);
  let dom = "";
  if (data.length > 0) {
    for (barang of data) {
      let harga = type == "IsSell" ? barang.HargaJual : barang.HargaBeli;
      dom += `<tr data-id="${barang.ID}" style="cursor:pointer;">
                        <td>${barang.Nama}</td>
                        <td>${barang.Qty}</td>
                        <td>${numberFormat(harga)}</td>
                        <td>${barang.Type}</td>
                        <td>${barang.Keterangan}</td>
                    </tr>`;
    }
  } else {
    dom += `<tr><td colspan="4">Tidak ada data</td></tr>`;
  }
  GI("dataBarangTmp").innerHTML = dom;
  document.querySelector("#dataBarangTmp").addEventListener("click", function (e) {
    pilihItem(e, opt);
  });
}

function pilihItem(e, opt) {
  let elm = e.target.parentNode,
    id = elm.dataset.id,
    nama = stringAman(elm.cells[0].innerText),
    harga = intFormat(elm.cells[2].innerText),
    tbody = opt.tbody ? opt.tbody : "tbodyItem",
    fn = opt.fn ? opt.fn : "tidak";
  let table = GI(tbody);
  let row = table.insertRow(0);
  if (GI(`edt${tbody}${id}`)) {
    let old = GI(`edtJumlah${tbody}${id}`).value;
    GI(`edtJumlah${tbody}${id}`).value = parseInt(old) + 1;
    sumTable(tbody);
  } else {
    let cell0 = row.insertCell(0),
      cell1 = row.insertCell(1),
      cell2 = row.insertCell(2),
      cell3 = row.insertCell(3),
      cell4 = row.insertCell(4),
      cell5 = row.insertCell(5),
      cell6 = row.insertCell(6),
      fieldid = tbody != "tbodyItem" ? `id${tbody}[]` : `id[]`,
      fieldname = tbody != "tbodyItem" ? `nama${tbody}[]` : `nama[]`,
      fieldqty = tbody != "tbodyItem" ? `jumlah${tbody}[]` : `jumlah[]`,
      fieldprice = tbody != "tbodyItem" ? `harga${tbody}[]` : `harga[]`,
      fieldtax = tbody != "tbodyItem" ? `pajak${tbody}[]` : `pajak[]`,
      fielddiskon = tbody != "tbodyItem" ? `diskon${tbody}[]` : `diskon[]`,
      fielddpdiskon = tbody != "tbodyItem" ? `dpdiskon${tbody}[]` : `dpdiskon[]`,
      fieldtotal = tbody != "tbodyItem" ? `total${tbody}[]` : `total[]`;
    cell0.innerHTML = `<input type="hidden" name="${fieldid}" id="edt${tbody}${id}" value="${id}"><input type="text" name="${fieldname}" value="${nama}" class="form-control form-control-sm" readonly>`;
    cell1.innerHTML = `<input type="number" name="${fieldqty}" value="1" min="1" id="edtJumlah${tbody}${id}" onkeyup="calculateTable('${tbody}${id}');" onfocus="this.select()" class="form-control form-control-sm td-qty" required>`;
    cell2.innerHTML = `<input type="number" name="${fieldprice}" value="${harga}" min="1" id="edtHarga${tbody}${id}" onkeyup="calculateTable('${tbody}${id}');" onfocus="this.select()" class="form-control form-control-sm td-price" required>`;
    cell3.innerHTML = `<select name="${fieldtax}" id="edtPajak${tbody}${id}" onchange="calculateTable('${tbody}${id}');" class="form-control form-control-sm td-tax">
                                <option value="non">Non PPN</option>
                                <option value="exclude">Exclude</option>
                                <option value="include">Include</option>
                            </select>`;
    cell4.innerHTML = `<div class="row">
                                <div class="col-md-6 mb-2">
                                <div class="input-group input-group-sm">
                                    <span class="input-group-text" id="lblDiskon">Rp</span>
                                    <input type="number" name="${fielddiskon}" value="0" min="0" id="edtDiskon${tbody}${id}" data-id="${tbody}${id}" onkeyup="calculateDiscount(this);" class="form-control form-control-sm td-discon" onfocus="this.select()">
                                </div>
                                </div>
                                <div class="col-md-6 mb-2">
                                <div class="input-group input-group-sm">
                                    <input type="number" name="${fielddpdiskon}" value="0" min="0" id="edtPDiskon${tbody}${id}" data-id="${tbody}${id}" onkeyup="calculateDiscount(this);" class="form-control form-control-sm td-pdiscon" onfocus="this.select()">
                                    <span class="input-group-text" id="lblPDiskoon">%</span>
                                </div>
                                </div>
                            </div>`;
    cell5.innerHTML = `<input type="number" name="${fieldtotal}" value="${harga}" id="edtTotal${tbody}${id}" class="form-control form-control-sm td-total" readonly>`;
    cell6.innerHTML = `<button type="button" onclick="deleteTable(this, '${tbody}')" class="btn btn-opsi"><i class="material-icons">delete</i></button>`;
    sumTable(tbody);
  }
  if (fn != "tidak") {
    let index = fn.indexOf("(");
    let indexEnd = fn.indexOf(")");
    let newFn = fn.substring(0, index);
    let param = fn.substring(index + 1, indexEnd);
    window[newFn](param);
  }

  GI("tutupModalSearch").click();
}

function modalTrans(opt) {
  let dom = `<input type="search" name="q" id="edtQTransSearch" class="form-control fokus" placeholder="Cari Nomor Dokumen">
                <table class="table table-striped">
                    <thead class="color-bg-biru">
                        <tr>
                            <th>Nomor</th>
                            <th>Nama</th>
                            <th>Jumlah</th>
                            <th>Keterangan</th>
                        </tr>
                    </thead>
                    <tbody id="dataTransTmp"></tbody>
                </table>`;
  rendModal({ title: "Cari Dokumen", body: dom, cls: "modal-lg", id: "modalTrans", btn: "tutupModalSearch" });
  cariDataTrans("", opt);
  GI("edtQTransSearch").addEventListener("keyup", function () {
    cariDataTrans(this.value, opt);
  });
}

async function cariDataTrans(val, opt) {
  let type = opt.type ? opt.type : "PURCH",
    tbody = opt.tbody ? opt.tbody : "tbodyItem",
    fn = opt.fn ? opt.fn : "tidak",
    proc = opt.proc ? opt.proc : "";
  let data = await api(`sys/api?act=dataTransaksi&q=${val}&type=${type}&proc=${proc}`);
  let dom = "";
  if (data.length > 0) {
    for (trans of data) {
      dom += `<tr onclick="pilihTrans('${trans.DocNumber}', '${tbody}', '${fn}', 'modal');" style="cursor:pointer;">
                        <td>${trans.DocNumber}</td>
                        <td>${trans.CardName}</td>
                        <td>${numberFormat(trans.GrandTotal)}</td>
                        <td>${trans.Notes}</td> 
                    </tr>`;
    }
  } else {
    dom += `<tr><td colspan="4">Tidak ada data</td></tr>`;
  }
  GI("dataTransTmp").innerHTML = dom;
}

async function pilihTrans(id, tbody = "tbodyItem", fn, from = "trans") {
  setState({ tempDocNumber: id });
  let sql = await api("sys/api?act=detailTransaksi&id=" + id);
  let arrDetail = [];
  for (let detail of sql.detail) {
    arrDetail.push({
      elm: "tr",
      elms: [
        {
          elm: "td",
          elms: [
            { elm: "input", type: "hidden", id: "edtID" + detail.ItemID, attr: { name: "id[]", value: detail.ItemID } },
            { elm: "input", type: "text", cls: "form-control form-control-sm", attr: { value: detail.ItemName, readonly: true, name: "nama[]" } },
          ],
        },
        {
          elm: "td",
          elms: [
            {
              elm: "input",
              type: "number",
              cls: "form-control form-control-sm td-qty",
              id: "edtJumlah" + detail.ItemID,
              attr: { value: detail.Qty * detail.QtyUnit, min: "1", name: "jumlah[]", onkeyup: `calculateTable('${detail.ItemID}')`, onfocus: "this.select()" },
            },
          ],
        },
        {
          elm: "td",
          elms: [
            {
              elm: "input",
              type: "number",
              cls: "form-control form-control-sm td-price",
              id: "edtHarga" + detail.ItemID,
              attr: { value: detail.Price, min: "1", name: "harga[]", onkeyup: `calculateTable('${detail.ItemID}')`, onfocus: "this.select()" },
            },
          ],
        },
        {
          elm: "td",
          elms: [
            {
              elm: "select",
              cls: "form-select form-select-sm td-tax",
              id: "edtPajak" + detail.ItemID,
              attr: { name: "pajak[]", onchange: `calculateTable('${detail.ItemID}')` },
              elms: [
                { elm: "option", attr: { value: detail.Ppn }, text: detail.Ppn },
                { elm: "option", attr: { value: "non" }, text: "Non PPN" },
                { elm: "option", attr: { value: "exclude" }, text: "Exclude" },
                { elm: "option", attr: { value: "include" }, text: "Include" },
              ],
            },
          ],
        },
        {
          elm: "td",
          elms: [
            {
              elm: "div",
              cls: "d-flex jutify-content-start align-items-center gap-2",
              elms: [
                {
                  elm: "div",
                  cls: "input-group input-group-sm",
                  elms: [
                    { elm: "span", cls: "input-group-text", text: "Rp" },
                    {
                      elm: "input",
                      type: "number",
                      cls: "form-control form-control-sm td-discon",
                      id: "edtDiskon" + detail.ItemID,
                      attr: { value: detail.VDiscount, min: "0", name: "diskon[]", "data-id": detail.ItemID, onkeyup: "calculateDiscount(this);", onfocus: "this.select()" },
                    },
                  ],
                },
                {
                  elm: "div",
                  attr: { class: "input-group input-group-sm" },
                  elms: [
                    {
                      elm: "input",
                      type: "number",
                      cls: "form-control form-control-sm td-pdiscon",
                      id: "edtPDiskon" + detail.ItemID,
                      attr: { value: detail.PDiscount, min: "0", name: "dpdiskon[]", "data-id": detail.ItemID, onkeyup: "calculateDiscount(this);", onfocus: "this.select()" },
                    },
                    { elm: "span", cls: "input-group-text", text: "%" },
                  ],
                },
              ],
            },
          ],
        },
        {
          elm: "td",
          elms: [{ elm: "input", type: "number", cls: "form-control form-control-sm td-total", id: "edtTotal" + detail.ItemID, attr: { value: detail.Total, min: "1", name: "total[]", readonly: true } }],
        },
        {
          elm: "td",
          elms: [
            {
              elm: "button",
              cls: "btn btn-opsi",
              attr: { type: "button", onclick: `deleteTable(this, '${tbody}');` },
              elms: [{ elm: "span", attr: { class: "material-icons" }, text: "delete" }],
            },
          ],
        },
      ],
    });
  }
  rendElm({
    to: "#" + tbody,
    elm: arrDetail,
  });
  if (from == "modal") GI("edtReffDocNumber").value = id;
  if (fn != "tidak") execFunction(fn);
  sumTable(tbody);
  if (from == "modal") GI("tutupModalSearch").click();
}

function calculateDiscount(ini) {
  let val = ini.value != "" ? ini.value : 0;
  let harga = GI(`edtHarga${ini.dataset.id}`).value;
  if (ini.id == `edtDiskon${ini.dataset.id}`) {
    let hasil = (val / harga) * 100;
    GI("edtPDiskon" + ini.dataset.id).value = hasil.toFixed(0);
  } else {
    let hasil = (val * harga) / 100;
    GI("edtDiskon" + ini.dataset.id).value = hasil.toFixed(0);
  }
  calculateTable(ini.dataset.id);
}

function calculateTable(id) {
  let jumlah = GI(`edtJumlah${id}`).value != "" ? GI(`edtJumlah${id}`).value : 0,
    harga = GI(`edtHarga${id}`).value != "" ? GI(`edtHarga${id}`).value : 0,
    diskon = GI(`edtDiskon${id}`).value != "" ? GI(`edtDiskon${id}`).value : 0,
    pajak = GI(`edtPajak${id}`).value,
    ppn = pajak == "exclude" ? (harga - diskon) * 0.1 : 0,
    hasil = (parseInt(harga) - parseInt(diskon) + ppn) * parseInt(jumlah);
  GI(`edtTotal${id}`).value = hasil;
  let tbody = GI(`edtJumlah${id}`).parentNode.parentNode.parentNode.id;
  sumTable(tbody);
}

function sumTable(tbody = "tbodyItem") {
  let body = document.getElementById(tbody);
  let tdQty = body.querySelectorAll(".td-qty"),
    tdPrice = body.querySelectorAll(".td-price"),
    tdDiscon = body.querySelectorAll(".td-discon"),
    tdPDiscon = body.querySelectorAll(".td-pdiscon"),
    tdTotal = body.querySelectorAll(".td-total"),
    Qty = 0,
    Price = 0,
    Discon = 0,
    Total = 0;
  for (let elm of tdQty) Qty += parseInt(elm.value);
  for (let elm of tdPrice) Price += parseInt(elm.value);
  for (let elm in tdDiscon) {
    if (tdDiscon[elm].value > 0) {
      let hasil = (tdDiscon[elm].value / tdPrice[elm].value) * 100;
      tdPDiscon[elm].value = hasil.toFixed(0);
    }
    if (tdDiscon[elm].value) Discon += parseInt(tdDiscon[elm].value);
    tdTotal[elm].value = (parseInt(tdPrice[elm].value) - parseInt(tdDiscon[elm].value)) * parseInt(tdQty[elm].value);
  }
  for (elm of tdTotal) Total += parseInt(elm.value);
  let foot = body.parentNode.tFoot;
  let trfoot = foot.rows[0];
  let VVoucher = GI("edtVVoucher") ? GI("edtVVoucher").value : 0;
  let VDiscount = GI("edtVDiscount") ? GI("edtVDiscount").value : 0;
  let AmountOther = GI("edtAmountOther") ? GI("edtAmountOther").value : 0;
  let GrandTotal = Total - parseInt(VDiscount) + parseInt(VVoucher) + parseInt(AmountOther);
  if (GrandTotal < 0) GrandTotal = 0;
  trfoot.cells[1].innerText = numberFormat(Qty);
  trfoot.cells[2].innerText = `Rp. ${numberFormat(Price)}`;
  trfoot.cells[4].innerHTML = `Rp. ${numberFormat(Discon)}`;
  trfoot.cells[5].innerText = `Rp. ${numberFormat(Total)}`;
  if (GI("edtTotal")) GI("edtTotal").value = GrandTotal;
  if (GI("edtBayar")) GI("edtBayar").setAttribute("min", GrandTotal);
}

function deleteTable(r, tbody) {
  let i = r.parentNode.parentNode.rowIndex;
  GI(tbody).deleteRow(i - 1);
  sumTable(tbody);
}

function reCal() {
  let __qty = document.querySelectorAll(".td-qty");
  let __price = document.querySelectorAll(".td-price");
  let __tax = document.querySelectorAll(".td-tax");
  let __discon = document.querySelectorAll(".td-discon");
  let __total = document.querySelectorAll(".td-total");

  __qty.forEach((elm, i) => {
    elm.addEventListener("keyup", function () {
      let price = __price[i].value;
      let discon = __discon[i].value;
      let tax = __tax[i].value == "exclude" ? (price - discon) * 0.1 : 0;
      let total = parseInt(price) - discon + parseInt(tax);
      __total[i].value = total * this.value;
      sumAll();
    });
  });

  __price.forEach((elm, i) => {
    elm.addEventListener("keyup", function () {
      let qty = __qty[i].value;
      let discon = __discon[i].value;
      let tax = __tax[i].value == "exclude" ? (this.value - discon) * 0.1 : 0;
      let total = parseInt(this.value) - discon + parseInt(tax);
      __total[i].value = total * qty;
      sumAll();
    });
  });

  __tax.forEach((elm, i) => {
    elm.addEventListener("change", function () {
      let qty = __qty[i].value;
      let price = __price[i].value;
      let discon = __discon[i].value;
      let tax = this.value == "exclude" ? (price - discon) * 0.1 : 0;
      let total = parseInt(price) - discon + parseInt(tax);
      __total[i].value = total * qty;
      sumAll();
    });
  });

  __discon.forEach((elm, i) => {
    elm.addEventListener("keyup", function () {
      let qty = __qty[i].value;
      let price = __price[i].value;
      let discon = this.value;
      let tax = __tax[i].value == "exclude" ? (price - discon) * 0.1 : 0;
      let total = parseInt(price) - discon + parseInt(tax);
      __total[i].value = total * qty;
      sumAll();
    });
  });
  sumAll();
}

function sumAll() {
  let tdTotal = document.getElementsByClassName("td-total");
  let Total = 0;
  for (elm of tdTotal) Total += parseInt(elm.value);
  if (GI("edtTotal")) GI("edtTotal").value = Total;
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
                <input type="date" name="d1" id="edtExportD1" class="form-control orm-control-sm" value="${saiki(01)}">
            </div>
            <div class="form-group">
                <label>Tanggal Akhir</label>
                <input type="date" name="d2" id="edtExportD2" class="form-control orm-control-sm" value="${saiki()}">
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
    data: dom,
    id: "modalExport",
    static: "tidak",
  });
}

function modalExports(opt) {
  let dom = `
    <form id="iniForm" onsubmit="exportsData(event, '${opt.url}', '${opt.type}', '${opt.title}');" class="needs-validation" novalidate>
        <div class="modal-header">
            <h5 class="modal-title">Export ${opt.title}</h5>
            <button type="button" class="btn-close-modal" data-bs-dismiss="modal" id="dismissModal"><i class="material-icons">close</i></button>
        </div>
        <div class="modal-body">
            <div class="form-group">
                <label>Tanggal Awal</label>
                <input type="date" name="d1" id="edtExportD1" class="form-control orm-control-sm" value="${saiki(01)}">
            </div>
            <div class="form-group">
                <label>Tanggal Akhir</label>
                <input type="date" name="d2" id="edtExportD2" class="form-control orm-control-sm" value="${saiki()}">
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
        <div id="divScriptExport"></div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="tutupModal" data-bs-dismiss="modal">Batal</button>
            <button type="sumbit" class="btn btn-default" id="btnSubmit"><i class="material-icons" id="lblSubmit">get_app</i> Export</button>
        </div>
    </form>`;
  modal({
    data: dom,
    id: "modalExport",
    static: "tidak",
  });
  let ss = document.createElement("script");
  ss.src = "assets/js/xls-reader.js";
  GI("divScriptExport").appendChild(ss);
}

async function exportsData(e, url, type, title) {
  e.preventDefault();
  e.stopPropagation();
  let btn = GI("btnSubmit");
  let lbl = GI("lblSubmit");
  btn.disabled = true;
  lbl.innerHTML = "";
  lbl.className = "spinner-border text-danger";
  let d1 = GI("edtExportD1").value;
  let d2 = GI("edtExportD2").value;
  let tp = GI("edtType").value;
  let md = GI("edtExport").value;
  let sql = await api(`sys/api?act=${url}&d1=${d1}&d2=${d2}&type=${tp}&${type}`);
  if (md == "excel") {
    exportData(sql, `Transaksi ${title} ${tanggalIndo(d1)} s/d ${tanggalIndo(d2)}`);
    btn.disabled = false;
    lbl.innerHTML = "get_app";
    lbl.className = "material-icons";
  } else {
    cetak(sql, `Transaksi ${title} ${tanggalIndo(d1)} s/d ${tanggalIndo(d2)}`);
    btn.disabled = false;
    lbl.innerHTML = "get_app";
    lbl.className = "material-icons";
  }
}

function modalTools() {
  let dom = `<div class="modal-header">
                    <h5 class="modal-title" style="color:#fefefe; font-size:25px">Tools</h5>
                    <button type="button" class="btn-close-modal" data-bs-dismiss="modal" id="dismissModal"><i class="material-icons">close</i></button>
                </div>
                <div class="modal-body" style="padding:30px" id="divTools">
                    <center class="row">
                        <div class="col-md-4 mb-2">
                            <div class="card shadow shadow-lg" style="cursor:pointer;" onclick="counterTools()">
                                <div class="card-body" style="text-align:center">
                                    <i class="material-icons" style="font-size:100px">alarm_on</i>
                                    <p></p>
                                    <h4>Counter Barang</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-2">
                            <div class="card shadow shadow-lg" style="cursor:pointer;" onclick="calculatorTools()">
                                <div class="card-body" style="text-align:center">
                                    <i class="material-icons" style="font-size:100px">calculate</i>
                                    <p></p>
                                    <h4>Kalkulator</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-2">
                            <div class="card shadow shadow-lg" style="cursor:pointer;" onclick="qrTools()">
                                <div class="card-body" style="text-align:center">
                                    <i class="material-icons" style="font-size:100px">qr_code_2</i>
                                    <p></p>
                                    <h4>Buat QR Code</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-2">
                            <div class="card shadow shadow-lg" style="cursor:pointer;" onclick="barcodeTools()">
                                <div class="card-body" style="text-align:center">
                                    <i class="material-icons" style="font-size:100px; --webkit-transform: rotate(90deg); --ms-transform: rotate(90deg); --o-transform: rotate(90deg);">line_weight</i>
                                    <p></p>
                                    <h4>Buat Barcode</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-2">
                            <div class="card shadow shadow-lg" style="cursor:pointer;" onclick="ongkirTools()">
                                <div class="card-body" style="text-align:center">
                                    <i class="material-icons" style="font-size:100px;">monetization_on</i>
                                    <p></p>
                                    <h4>Cek Ongkir</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-2">
                            <div class="card shadow shadow-lg" style="cursor:pointer;" onclick="trackingTools()">
                                <div class="card-body" style="text-align:center">
                                    <i class="material-icons" style="font-size:100px;">explore</i>
                                    <p></p>
                                    <h4>Tracking</h4>
                                </div>
                            </div>
                        </div>
                    </center>
                </div>`;
  modal({
    data: dom,
    id: "modalTools",
    cls: "modal-lg",
  });
}

function pilihMenu(menu, caption, path, act = false) {
  rendElm({
    to: "#tampil",
    elm: [
      { elm: "div", cls: "main-header", elms: [{ elm: "div", cls: "main-title", text: "Memuat . . ." }] },
      {
        elm: "div",
        cls: "main-body",
        elms: [{ elm: "div", cls: "div-content d-flex justify-content-center align-items-center", elms: [{ elm: "img", attr: { src: "assets/img/loader.gif" }, cls: "loading", id: "imgLoading" }] }],
      },
    ],
  });
  for (h of document.getElementsByClassName("active")) h.classList.remove("active");
  history.pushState(path, caption, path);
  GI(path).classList.add("active");
  document.title = caption;
  if (__resolusi.matches == true) GI("sidebar").classList.add("active");
  load(`view/${menu}?id=${path}&filter=${act}`, "tampil");
}

function pilihMenu2(menu, caption, path) {
  show("viewLoading");
  for (h of document.getElementsByClassName("active")) h.classList.remove("active");
  history.pushState(path, caption, path);
  GI(path).classList.add("active");
  document.title = caption;
  if (__resolusi.matches == true) GI("sidebar").classList.add("active");
  let page = document.getElementsByClassName("view-page");
  for (let pg of page) hide(pg.id);
  if (!GI("view" + path)) {
    let sc = document.createElement("div");
    sc.id = "view" + path;
    sc.className = "view-page";
    GI("tampil").appendChild(sc);
    load(`view/${menu}?id=${path}`, "view" + path);
  } else {
    show("view" + path);
  }
}

async function rendMenu() {
  let dataMenu = [];
  let q = GI("qMenu").value;
  let data = await api("sys/api?act=dataMenu&q=" + q);
  if (q == "") {
    let arrGroup = [];
    let CT = 1;
    for (let gp of data.menu) {
      if (gp.IsFavorit == 1) {
        arrGroup.push({ elm: "button", cls: "btn btn-sm btn-menu", id: `menuFavorit${CT}`, attr: { onclick: `pilihMenu('${gp.Path}', '${gp.Keterangan}', '${gp.Path}')` }, text: gp.Nama });
        CT++;
      }
    }
    rendElm({ to: "#divMenuTop", elm: arrGroup });
    let menuDom = ``;
    for (root of data.menu) {
      let fn = root.Status == "Active" ? `pilihMenu('${root.Path}', '${root.Keterangan}', this.id)` : `pesan('Pemberitahuan','Akun anda saat ini sudah kadarluarsa silahkan Perpanjang Sekarang untuk menggunakan aplikasi', 'danger', 5000)`;
      dataMenu.push(root.Path);
      if (root.Posisi == "root" && root.Akses != 0) {
        if (root.Path == "dashboard") {
          menuDom += `<li class="menu" onclick="pilihMenu('${root.Path}', '${root.Keterangan}', this.id)" id="${root.Path}">
                                    <a href="javascript:">
                                        <i class="material-icons">${root.Icon}</i>
                                        <span class="nama-menu">${root.Nama}</span>
                                    </a>
                                </li>`;
        } else {
          menuDom += `<li class="menu" onclick="${fn}" id="${root.Path}">
                                    <a href="javascript:">
                                        <i class="material-icons">${root.Icon}</i>
                                        <span class="nama-menu">${root.Nama}</span>
                                    </a>
                                </li>`;
        }
      }
    }
    for (menu of data.group) {
      let ct = 0;
      for (sub of data.menu) if (sub.Posisi == menu.Posisi && sub.Akses != 0) ct++;
      if (ct > 0) {
        menuDom += `<li><a href="#GroupMenu${menu.ID}" data-bs-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                                    <i class="material-icons">${menu.Icon}</i>
                                    <span class="nama-menu">${menu.Nama}</span>
                                </a><ul class="collapse list-unstyled" id="GroupMenu${menu.ID}">`;
        for (submenu of data.menu) {
          let fn = root.Status == "Active" ? `pilihMenu('${submenu.Path}', '${submenu.Keterangan}', this.id)` : `alert('Akun anda saat ini sudah kadarluarsa silahkan perpanjang untuk menggunakan aplikasi')`;
          if (submenu.Posisi == menu.Posisi && submenu.Akses != 0) {
            menuDom += `<li class="menu" onclick="${fn}" id="${submenu.Path}">
                                        <a href="javascript:">${submenu.Nama}</a>
                                    </li>`;
          }
        }
        menuDom += `</ul></li>`;
      }
    }
    GI("ulMenu").innerHTML = menuDom;
  } else {
    let menuDom = ``;
    for (root of data.menu) {
      dataMenu.push(root.Path);
      if (root.Akses != 0) {
        let fn = root.Status == "Active" ? `pilihMenu('${root.Path}', '${root.Keterangan}', this.id)` : `alert('Akun anda saat ini sudah kadarluarsa silahkan perpanjang untuk menggunakan aplikasi')`;
        menuDom += `<li class="menu" onclick="${fn}" id="${root.Path}">
                                <a href="javascript:">
                                    <i class="material-icons">${root.Icon}</i>
                                    <span class="nama-menu">${root.Nama}</span>
                                </a>
                            </li>`;
      }
    }
    GI("ulMenu").innerHTML = menuDom;
  }
  if (dataMenu.includes(path)) {
    GI(path).click();
  } else {
    if (GI("dashboard")) GI("dashboard").click();
  }
}

async function pilihGroupMenu(ini, menu) {
  let cls = document.getElementsByClassName("active-menu");
  for (let c of cls) c.classList.remove("active-menu");
  ini.classList.add("active-menu");
  let sql = await api("sys/api?act=menuGroup&posisi=" + menu);
  let menuDom = ``;
  for (root of sql) {
    if (root.Akses != 0) {
      let fn = root.Status == "Active" ? `pilihMenu('${root.Path}', '${root.Keterangan}', this.id)` : `alert('Akun anda saat ini sudah kadarluarsa silahkan perpanjang untuk menggunakan aplikasi')`;
      menuDom += `<li class="menu" onclick="${fn}" id="${root.Path}">
                            <a href="javascript:">
                                <i class="material-icons">${root.Icon}</i>
                                <span class="nama-menu">${root.Nama}</span>
                            </a>
                        </li>`;
    }
  }
  GI("ulMenu").innerHTML = menuDom;
}

async function rendTutorial() {
  let id = "";
  if (location.hostname == "localhost") {
    id = window.location.pathname.substring(5);
  } else {
    id = window.location.pathname.substring(1);
  }
  let status = await api("sys/api?act=statusTutorial&id=" + id);
  if (status == 1) {
    let dom = `
        <div class="alert alert-primary alert-dismissible" role="alert">
            <h4 class="alert-heading">Tutorial</h4>
            <hr>
            <p class="mb-0">Untuk melihat tuorial mengenai menu ${document.title} silahkan click link berikut <a href="#" onclick="modalTutorial('${id}')">Tutorial</a></p>
            <a href="#" class="alert-link" onclick="hideTutorial('${id}')" data-bs-dismiss="alert">Jangan Tampilkan Lagi</a>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    GI("divTutorial").innerHTML += dom;
  }
}

async function modalTutorial(id) {
  let sql = await api("sys/api?act=detailMenu&id=" + id);
  let dom = '<div class="row">';
  for (data of sql) {
    dom += `<div class="col-md-6 mb-2">
                    <h5>${data.Judul}</h5>
                    <iframe width="100%" height="315" src="https://www.youtube.com/embed/${data.Url}" title="${data.Judul}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>`;
  }
  dom += `</div>`;
  rendModal({
    title: "Tutorial",
    id: "modalTutorial",
    body: dom,
    cls: "modal-xl",
    static: "tidak",
  });
}

async function hideTutorial(id) {
  api("sys/api?act=hideTutorial&id=" + id);
}

let path = "";
if (location.hostname == "localhost") {
  path = window.location.pathname.substring(5);
} else {
  path = window.location.pathname.substring(1);
}

rendMenu();

window.addEventListener("popstate", function (event) {
  if (event.state != null) {
    malesLoad();
    load("view/" + event.state, "tampil");
  }
});

async function cetakInvoice(sql) {
  fetch(encodeURI(sql))
    .then((response) => response.text())
    .then((hasil) => {
      let myWindow = window.open("", "", "width=1000,height=800");
      let time = __resolusi.matches == true ? 15000 : 1000;
      myWindow.document.write(hasil);
      myWindow.focus();

      setTimeout(() => {
        myWindow.print();
      }, 500);

      // setTimeout(() => {
      //     myWindow.close();
      // }, time);
    })
    .catch((error) => {
      reject(error);
    });
}

function modalImg(url) {
  let dom = `<center><img src="${url}" class="img-fluid" alt="Responsive image"></center>`;
  rendModal({
    title: "Detail Gambar",
    id: "modalImg",
    body: dom,
    cls: "modal-xl",
    static: "tidak",
  });
}

async function modalCoa(opt) {
  setState({ edtCoaCode: opt.edtCode || "edtCoaCode", edtCoaNama: opt.edtNama || "edtCoaNama" });
  rendModal({
    title: "Cari Master Akun",
    id: "modalCoa",
    btn: "btnTutupModalCariCoa",
    body: "",
    cls: "modal-lg",
  });

  rendElm({
    to: "#modalBodymodalCoa",
    elm: [
      {
        elm: "div",
        cls: "input-group",
        elms: [
          { elm: "input", type: "search", id: "edtCode", cls: "form-control", attr: { placeholder: "Cari Kode Akun" } },
          {
            elm: "button",
            type: "button",
            cls: "btn btn-default",
            elms: [{ elm: "span", cls: "material-icons", text: "search" }],
          },
        ],
      },
      { elm: "p" },
      { elm: "div", cls: "table-responsive", id: "divTableModalCariCoa" },
    ],
  });

  let field = {
    thead: [
      { cap: "Kode Akun", sort: "Code" },
      { cap: "Nama Akun", sort: "Description" },
      { cap: "Group", sort: "GroupType" },
      { cap: "Posisi", sort: "Posisi" },
    ],
  };

  let sql = await api("sys/api", { act: "data coa", Description: "" });
  rendTables({
    divid: "divTableModalCariCoa",
    id: "tableDataCariCoa",
    dataset: { data: sql, field: field },
    tbody: {
      id: "tbodyDataCariCoa",
      click: "pilihCoa",
    },
  });

  GI("edtCode").addEventListener("keyup", async function () {
    let sql = await api("sys/api", { act: "data coa", Description: this.value });
    rendTables({
      divid: "divTableModalCariCoa",
      id: "tableDataCariCoa",
      dataset: { data: sql, field: field },
      tbody: {
        id: "tbodyDataCariCoa",
        click: "pilihCoa",
      },
    });
  });
}

function pilihCoa(e) {
  if (GI(state("edtCoaCode"))) GI(state("edtCoaCode")).value = e.target.parentNode.dataset.id;
  if (GI(state("edtCoaNama"))) GI(state("edtCoaNama")).value = e.target.parentNode.dataset.id + " - " + e.target.parentNode.cells[1].innerText;
  GI("btnTutupModalCariCoa").click();
}

if (__resolusi.matches == true) {
  GI("sidebar").classList.add("active");
} else {
  GI("sidebar").classList.remove("active");
}

__resolusi.addEventListener("change", function () {
  GI("sidebar").classList.add("active");
});

GI("sidebarCollapse").onclick = function () {
  GI("sidebar").style.display = "block";
  GI("sidebar").classList.toggle("active");
};

GI("qMenu").addEventListener("change", function () {
  rendMenu();
});

async function modalCariItems(opt = {}) {
  setState({
    sortItems: "Nama",
    byItems: "ASC"
  });

  rendModal({
    title: "Cari Barang",
    id: "modalCariItems",
    cls: "modal-lg",
    btn: "btnTutupModalCariItems",
  });

  let QtyMode = opt.qtyMode ? opt.qtyMode : "minus";
  let IsSell = opt.IsSell ? opt.IsSell : "2";
  let IsBuy = opt.IsBuy ? opt.IsBuy : "2";
  let IsProduction = opt.IsProduction ? opt.IsProduction : "2";

  rendElm({
    to: "#modalBodymodalCariItems", elm: [
      {
        elm: "div", cls: "input-group", elms: [
          {
            elm: "select", cls: "form-select", id: "edtTypeFilterItems", elms: [
              { elm: "option", value: "Nama", text: "Nama Barang" },
              { elm: "option", value: "Code", text: "Kode Barang" },
            ]
          },
          { elm: "input", type: "search", id: "edtSearchItems", cls: "form-control w-50", attr: { placeholder: "Cari Barang" } },
        ]
      },
      { elm: "p" },
      { elm: "div", cls: "table-responsive", id: "divTableModalCariItems" },
    ]
  });

  let sql = await api("sys/api", {
    act: "cari data items",
    q: GI("edtSearchItems").value,
    t: GI("edtTypeFilterItems").value,
    s: state("sortItems"),
    b: state("byItems"),
    IsBuy: IsBuy,
    IsSell: IsSell,
    IsProduction: IsProduction
  });

  let field = {
    thead: [
      { cap: "Kode Barang", sort: "Code", type: "str" },
      { cap: "Nama Barang", sort: "Nama", type: "str" },
      { cap: "Stok", sort: "Qty" },
      { cap: "Harga Beli", sort: "HargaBeli" },
      { cap: "Harga Jual", sort: "HargaJual" },
      { cap: "Kategori", sort: "NamaKategori" },
    ]
  };

  rendTables({
    divid: "divTableModalCariItems",
    id: "tableDataCariItems",
    sort: "sortItems",
    by: "byItems",
    dataset: { data: sql, field: field },
    tbody: {
      id: "tbodyDataCariItems",
      click: "modalPilihItems",
    }
  });

  GI("edtSearchItems").addEventListener("keyup", async function () {
    let sql = await api("sys/api", {
      act: "cari data items",
      q: this.value,
      t: GI("edtTypeFilterItems").value,
      s: state("sortItems"),
      b: state("byItems"),
      IsBuy: IsBuy,
      IsSell: IsSell,
      IsProduction: IsProduction
    });

    rendTables({
      divid: "divTableModalCariItems",
      id: "tableDataCariItems",
      dataset: { data: sql, field: field },
      sort: "sortItems",
      by: "byItems",
      tbody: {
        id: "tbodyDataCariItems",
        click: "modalPilihItems",
      }
    });
  });

  GI("edtTypeFilterItems").addEventListener("change", async function () {
    let sql = await api("sys/api", {
      act: "cari data items",
      q: GI("edtSearchItems").value,
      s: state("sortItems"),
      b: state("byItems"),
      t: this.value,
      IsBuy: IsBuy,
      IsSell: IsSell,
      IsProduction: IsProduction
    });

    rendTables({
      divid: "divTableModalCariItems",
      id: "tableDataCariItems",
      dataset: { data: sql, field: field },
      sort: "sortItems",
      by: "byItems",
      tbody: {
        id: "tbodyDataCariItems",
        click: "modalPilihItems",
      }
    });
  });
}

async function modalPilihItems(e, data = false) {
  GI("btnTutupModalCariItems").click();
  rendModal({
    title: "Pilih Barang",
    id: "modalPilihItems",
    btn: "btnTutupModalPilihItems",
    footer: "btnSave",
    form: true,
    fn: "submitItems(event)"
  });

  let ID = e.target.parentNode.dataset.id;

  if (data == false) {
    let sql = await api("sys/api", { act: "data items", ID: ID });
    setState({tempItems:JSON.stringify(sql)});
    let arrQtyUnit = [];
    let CT = 0;
    for (let item of sql) {
      arrQtyUnit.push({
        elm: "tr", elms: [
          {
            elm: "td", elms: [
              { elm: "input", name: "Price", cls: "form-control form-control-sm edt-price", attr: { value: item.HargaJual, required: true, type: "number", step: "0.01", min: "0" } },
              { elm: "div", cls: "invalid-feedback", text: "Harga Tidak boleh kosong" }
            ]
          },
          {
            elm: "td", elms: [
              { elm: "input", name: "QtyUnit", type: "hidden", id: "edtQtyUnit", cls: "edt-qtyunit", attr: { value: item.QtyUnit } },
              {
                elm: "div", cls: "input-group input-group-sm", elms: [
                  { elm: "input", name: "Qty", cls: "form-control form-control-sm edt-qty", attr: { value: CT == 0 ? 1 : 0, required: true, type: "number", step: "0.01", min: "0" } },
                  { elm: "span", cls: "input-group-text", text: item.UnitName },
                  { elm: "div", cls: "invalid-feedback", text: "Jumlah Tidak Boleh Kosong" },
                ]
              }
            ]
          },
          {
            elm: "td", elms: [
              { elm: "input", cls: "form-control form-control-sm edt-total", attr: { value: CT == 0 ? item.HargaJual * item.QtyUnit : 0, disabled: true, type: "number" } },
            ]
          },
        ]
      });
      CT++;
    }

    rendElm({
      to: "#modalBodymodalPilihItems", elm: [
        {
          elm: "table", cls: "table", elms: [
            {
              elm: "thead", cls: "bg-thead", elms: [
                {
                  elm: "tr", elms: [
                    { elm: "th", text: "Harga" },
                    { elm: "th", text: "Qty" },
                    { elm: "th", text: "Total" }
                  ]
                }
              ]
            },
            { elm: "tbody", elms: arrQtyUnit },
          ]
        }
      ]
    });

    let clsPrice = document.querySelectorAll(".edt-price");
    let clsQtyUnit = document.querySelectorAll(".edt-qtyunit");
    let clsQty = document.querySelectorAll(".edt-qty");
    let clsTotal = document.querySelectorAll(".edt-total");
    for (let i = 0; i < clsPrice.length; i++) {
      clsPrice[i].addEventListener("keyup", function () {
        let total = this.value * (clsQtyUnit[i].value * clsQty[i].value);
        clsTotal[i].value = total;
        sql[i].Qty = clsQty[i].value;
        sql[i].Price = clsPrice[i].value;
        sql[i].Total = clsTotal[i].value;
        setState({tempItems:JSON.stringify(sql)});
      });

      clsQty[i].addEventListener("keyup", function () {
        let total = (this.value * clsQtyUnit[i].value) * clsPrice[i].value;
        clsTotal[i].value = total;
        sql[i].Qty = clsQty[i].value;
        sql[i].Price = clsPrice[i].value;
        sql[i].Total = clsTotal[i].value;
        setState({tempItems:JSON.stringify(sql)});
      });
    }
  } else {
    let getData = sessionStorage.getItem(data);
    let sql = JSON.parse(getData);
  }
}

function submitItems(e) {
  e.preventDefault();
  e.stopPropagation();
  if (e.target.checkValidity()) {
    let clsPrice = document.querySelectorAll(".edt-price");
    let clsQtyUnit = document.querySelectorAll(".edt-qtyunit");
    let clsQty = document.querySelectorAll(".edt-qty");
    let clsTotal = document.querySelectorAll(".edt-total");
    let arrData = [];
    for (let i = 0; i < clsPrice.length; i++) {
      arrData.push({
        Price: clsPrice[i].value,
        QtyUnit: clsQtyUnit[i].value,
        Qty: clsQty[i].value,
        Total: clsTotal[i].value
      });
    }
    let data = JSON.parse(sessionStorage.getItem("dataItems"));
    let tempData = JSON.parse(state("tempItems"));
    let cekData = [];
    for (let items of data) {
      for (let item of tempData) {
        console.log(items.ItemID + "=>" + item.ItemID);
      }
    }
    sessionStorage.setItem("dataItems", JSON.stringify(arrData));
    rendTablesItems({});
    GI("btnTutupModalPilihItems").click();
  } else {
    let forms = document.getElementsByClassName('needs-validation');
    let validation = Array.prototype.filter.call(forms, function (form) {
      form.classList.add('was-validated');
    });
  }
}

function rendTablesItems(opt) {
  let divid = opt.divid ? opt.divid : "divTableItems";
  let id = opt.id ? opt.id : "tableDataItems";
  let tbodyid = opt.tbodyid ? opt.tbodyid : "tbodyDataItems";
  let dataset = opt.dataset ? opt.dataset : "dataItems";
  let data = JSON.parse(sessionStorage.getItem(dataset));
  let arrThead = [
    { elm: "th", text: "Nama" },
    { elm: "th", text: "Jumlah" },
    { elm: "th", text: "Harga" },
    { elm: "th", text: "Total" }
  ];

  let arrTbody = [];
  for (let item of data) {
    arrTbody.push({
      elm: "tr", elms: [
        {
          elm: "td", elms: [
            { elm: "input", type: "text", name: "ItemName", cls: "form-control form-control-sm", attr: { value: item.ItemName, readonly: true } }
          ]
        },
        {
          elm: "td", elms: [
            { elm: "input", type: "number", name: "Qty", cls: "form-control form-control-sm", attr: { value: item.Qty, required: true, min: 1 } },
            { elm: "div", cls: "invalid-feedback", text: "Silahkan isi jumlah" }
          ]
        },
        {
          elm: "td", elms: [
            { elm: "input", type: "number", name: "Price", cls: "form-control form-control-sm", attr: { value: item.Price, required: true, min: 1 } },
            { elm: "div", cls: "invalid-feedback", text: "Silahkan isi harga" }
          ]
        },
        {
          elm: "td", elms: [
            { elm: "input", type: "number", name: "Total", cls: "form-control form-control-sm", attr: { value: item.Total, readonly: true } }
          ]
        },
      ]
    });
  }

  rendElm({
    to: "#" + divid, elm: [
      {
        elm: "table", cls: "table", id: id, elms: [
          { elm: "thead", cls: "bg-thead", elms: arrThead },
          { elm: "tbody", id: tbodyid, elms: arrTbody }
        ]
      }
    ]
  });
}