/* Purchase Order — HPRT N41 4×6인치(101.6×152.4mm) 감열 라벨용. common.js 다음, body 맨 끝에서 불러옴
 * printPO(order) : 주문 결과(백엔드 order/update 응답)를 받아 라벨 한 장을 인쇄 */
var SELLER = { name: "(주)라이프비기닝", bizNo: "411-87-02761", tel: "02-788-7456" };   /* 본점 사업자번호 + 본점 대표전화 */
/* 실제 베베노 로고(bebeknow+Logo)를 감열 인쇄용 순흑색으로 바꾼 것 */
var PO_LOGO = "data:image/png;base64,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";

(function () {
  var font = document.createElement("link");
  font.rel = "stylesheet";
  font.href = "https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap";
  document.head.appendChild(font);

  var css = document.createElement("style");
  css.textContent = [
    "@page{size:101.6mm 152.4mm;margin:0}",
    /* 화면에서는 밖으로 빼 두고(크기 측정은 가능), 인쇄할 때만 라벨 하나만 보이게 */
    "#poPrint{position:fixed;left:-400mm;top:0;pointer-events:none}",
    "@media print{html,body{background:#fff!important;margin:0!important;padding:0!important;min-height:0!important;display:block!important}",
    "body>*{display:none!important}body>#poPrint{display:block!important;position:static}}",
    ".po{width:101.6mm;height:152.4mm;background:#fff;color:#000;padding:5mm 5.5mm 4.5mm;display:flex;flex-direction:column;",
    "font-family:'Apple SD Gothic Neo','Malgun Gothic','Noto Sans KR',sans-serif;font-size:var(--fs,9.5pt);line-height:1.35;overflow:hidden;",
    "word-break:keep-all;overflow-wrap:break-word;box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}",
    ".po *{box-sizing:border-box;margin:0;padding:0}",
    ".po .brandf{font-family:'Comfortaa',sans-serif;font-weight:700;letter-spacing:-0.045em;text-transform:lowercase}",
    ".po .head{display:flex;flex-direction:column;align-items:flex-start;gap:.65em;border-bottom:1.2mm solid #000;padding-bottom:.55em}",
    ".po .head img{display:block;height:2.85em;width:auto}",
    ".po .head h1{font-size:1.75em;line-height:1;white-space:nowrap}",
    ".po .kv{display:grid;grid-template-columns:19mm 1fr;column-gap:2mm;row-gap:.8mm;padding:2mm 0;border-bottom:.35mm solid #000}",
    ".po .kv dt{font-weight:700}.po .kv dd{font-weight:500}.po .kv dd.strong{font-weight:900}",
    ".po .sec{font-size:.95em;margin-top:2mm}",
    ".po table{width:100%;border-collapse:collapse;margin-top:1.2mm}",
    ".po thead th{font-size:.9em;font-weight:900;text-align:left;border-top:.35mm solid #000;border-bottom:.35mm solid #000;padding:1mm 0}",
    ".po th.q,.po td.q{width:11mm;text-align:center}.po th.a,.po td.a{width:23mm;text-align:right}",
    ".po tbody td{padding:1.3mm 0;border-bottom:.2mm dashed #000;vertical-align:top}",
    ".po td.n .opt{font-weight:700}.po td.a,.po td.q{font-variant-numeric:tabular-nums;font-weight:700}",
    ".po .total{display:flex;justify-content:space-between;align-items:baseline;border-top:1mm solid #000;margin-top:1.6mm;padding-top:1.6mm}",
    ".po .total span{font-weight:900;font-size:1.05em}.po .total strong{font-size:1.6em;font-weight:900;font-variant-numeric:tabular-nums}",
    ".po .spacer{flex:1}",
    ".po .foot{border-top:.35mm solid #000;padding-top:1.6mm;font-size:.85em;text-align:center}"
  ].join("\n");
  document.head.appendChild(css);

  var box = document.createElement("div");
  box.id = "poPrint";
  box.innerHTML = '<div class="po" id="poSheet"></div>';
  document.body.appendChild(box);
})();

function renderPO(o) {
  var items = o.items || [];
  var total = items.reduce(function (s, it) { return s + (Number(it.amount) || 0); }, 0);
  var isShip = o.method === "배송";
  var addr = isShip ? (o.zip ? "(" + o.zip + ") " : "") + (o.address || "") + (o.address2 ? " " + o.address2 : "") : "현장 수령";
  var rows = items.map(function (it) {
    return "<tr><td class=\"n\">" + esc(FULL_NAMES[it.product] || it.product) + (it.color ? " <span class=\"opt\">(" + esc(it.color) + ")</span>" : "") +
      "</td><td class=\"q\">" + esc(it.qty) + "</td><td class=\"a\">" + won(it.amount) + "</td></tr>";
  }).join("");
  $("poSheet").innerHTML =
    '<div class="head"><img src="' + PO_LOGO + '" alt="bebeknow"><h1 class="brandf">purchase order</h1></div>' +
    '<dl class="kv">' +
      "<dt>사업자명</dt><dd class=\"strong\">" + SELLER.name + "</dd>" +
      "<dt>사업자번호</dt><dd>" + SELLER.bizNo + "</dd>" +
      "<dt>고객센터</dt><dd>" + SELLER.tel + "</dd>" +
      "<dt>주문일시</dt><dd>" + esc(o.at) + "</dd>" +
      "<dt>주문번호</dt><dd>" + esc(o.orderNo) + "</dd>" +
    "</dl>" +
    '<dl class="kv">' +
      "<dt>고객명</dt><dd class=\"strong\">" + esc(o.name) + "</dd>" +
      "<dt>연락처</dt><dd>" + esc(o.phone) + "</dd>" +
      "<dt>" + (isShip ? "배송지" : "수령") + "</dt><dd>" + esc(addr) + "</dd>" +
    "</dl>" +
    '<div class="sec brandf">order items</div>' +
    '<table><thead><tr><th>제품</th><th class="q">수량</th><th class="a">금액</th></tr></thead><tbody>' + rows + "</tbody></table>" +
    '<div class="total"><span>합계</span><strong>' + won(total) + "</strong></div>" +
    '<div class="spacer"></div>' +
    '<div class="foot">Easy care, Easy life · bebeknow.com</div>';
}

/* 품목이 많아 라벨을 넘치면 글자를 0.25pt씩 줄여 한 장에 맞춤 (최소 6.5pt) */
function fitPO() {
  var po = $("poSheet"), fs = 9.5;
  po.style.setProperty("--fs", fs + "pt");
  while (po.scrollHeight > po.clientHeight + 1 && fs > 6.5) { fs -= 0.25; po.style.setProperty("--fs", fs + "pt"); }
}

/* 인쇄는 한 장씩 차례로 (폰트를 기다리는 사이 다른 인쇄가 끼어들어 같은 내용이 두 번 나가지 않게) */
var poQueue = Promise.resolve();
function printPO(o) {
  poQueue = poQueue.then(function () {
    renderPO(o);
    var img = $("poSheet").querySelector("img");
    var waits = [img && img.decode ? img.decode().catch(function () {}) : null];
    if (document.fonts && document.fonts.load) waits.push(document.fonts.load("700 16px Comfortaa").catch(function () {}));
    var timeout = new Promise(function (res) { setTimeout(res, 3000); });   // 폰트가 늦어도 3초 뒤에는 인쇄
    return Promise.race([Promise.all(waits), timeout]).then(function () { fitPO(); window.print(); });
  }).catch(function () {});
  return poQueue;
}
window.addEventListener("beforeprint", function () { if ($("poSheet").innerHTML) fitPO(); });
