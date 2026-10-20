/* Purchase Order — HPRT N41 100×150mm 감열 라벨용. common.js 다음, body 맨 끝에서 불러옴
 * printPO(order) : 주문 결과(백엔드 order/update 응답)를 받아 라벨 한 장을 인쇄 */
var SELLER = { name: "(주)라이프비기닝", bizNo: "411-87-02761", tel: "02-788-7456" };   /* 본점 사업자번호 + 본점 대표전화 */
/* 베베노 글자 로고(심볼 B 제외)를 감열 인쇄용 순흑색으로 바꾼 것 */
var PO_LOGO = "data:image/png;base64,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";

(function () {
  var font = document.createElement("link");
  font.rel = "stylesheet";
  font.href = "https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap";
  document.head.appendChild(font);

  var css = document.createElement("style");
  css.textContent = [
    "@page{size:100mm 150mm;margin:0}",
    /* 화면에서는 밖으로 빼 두고(크기 측정은 가능), 인쇄할 때만 라벨 하나만 보이게 */
    "#poPrint{position:fixed;left:-400mm;top:0;pointer-events:none}",
    "@media print{html,body{background:#fff!important;margin:0!important;padding:0!important;min-height:0!important;display:block!important}",
    "body>*{display:none!important}body>#poPrint{display:block!important;position:static}}",
    ".po{width:100mm;height:150mm;background:#fff;color:#000;padding:5mm 5.5mm 4.5mm;display:flex;flex-direction:column;",
    "font-family:'Apple SD Gothic Neo','Malgun Gothic','Noto Sans KR',sans-serif;font-size:var(--fs,9.5pt);line-height:1.35;overflow:hidden;",
    "word-break:keep-all;overflow-wrap:break-word;box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}",
    /* 직원 화면 스타일(소문자 브랜드 글꼴, 회색 글자 등)이 라벨에 섞이지 않게 막음 */
    ".po *{box-sizing:border-box;margin:0;padding:0;color:#000;text-transform:none}",
    ".po .brandf{font-family:'Comfortaa',sans-serif;font-weight:700;letter-spacing:-0.045em;text-transform:none}",
    /* 머리말: 왼쪽 크게 Purchase Order, 오른쪽 작게 bebeknow 글자 로고 (심볼 없음) */
    ".po .head{display:flex;justify-content:space-between;align-items:flex-end;gap:2mm;border-bottom:1.2mm solid #000;padding-bottom:.6em}",
    ".po .head h1{font-size:2.15em;line-height:1;white-space:nowrap}",
    ".po .head img{display:block;height:1em;width:auto;margin-bottom:.15em;flex-shrink:0}",
    ".po .kv{display:grid;grid-template-columns:19mm 1fr;column-gap:2mm;row-gap:.8mm;padding:2mm 0;border-bottom:.35mm solid #000}",
    ".po .kv dt{font-weight:700}.po .kv dd{font-weight:500}.po .kv dd.strong{font-weight:900}",
    ".po .sec{font-size:.95em;margin-top:2mm}",
    ".po table{width:100%;border-collapse:collapse;margin-top:1.2mm}",
    ".po thead th{font-size:.9em;font-weight:900;text-align:left;border-top:.35mm solid #000;border-bottom:.35mm solid #000;padding:1mm 0}",
    ".po th.q,.po td.q{width:11mm;text-align:center}.po th.a,.po td.a{width:23mm;text-align:right}",
    ".po tbody td{padding:1.3mm 0;border-bottom:.2mm dashed #000;vertical-align:top}",
    ".po td.n .pk{font-size:.85em;font-weight:700;margin-top:.5mm}",
    ".po td.n .opt{font-weight:700}.po td.a,.po td.q{font-variant-numeric:tabular-nums;font-weight:700}",
    ".po .total{display:flex;justify-content:space-between;align-items:baseline;border-top:1mm solid #000;margin-top:1.6mm;padding-top:1.6mm}",
    ".po .total span{font-weight:900;font-size:1.05em;color:#000}.po .total strong{font-size:1.6em;font-weight:900;font-variant-numeric:tabular-nums}",
    ".po .spacer{flex:1}",
    /* 고객용 / 회사 보관용 구분 */
    ".po .copy{margin-top:1.2mm;text-align:right;font-size:.85em;font-weight:900;letter-spacing:.02em}",
    ".po .copy.co{text-align:center;background:#000;color:#fff;padding:.9mm 0;font-size:1em;letter-spacing:.08em}",
    ".po .mg{margin-top:2mm;border:.35mm solid #000;padding:1.4mm 2mm}",
    ".po .mg .kv{border-bottom:none;padding:0;row-gap:.6mm}",
    ".po .mg .ttl{font-weight:900;font-size:.9em;margin-bottom:1mm}",
    ".po .foot{border-top:.35mm solid #000;padding-top:1.6mm;font-size:.85em;text-align:center}"
  ].join("\n");
  document.head.appendChild(css);

  var box = document.createElement("div");
  box.id = "poPrint";
  box.innerHTML = '<div class="po" id="poSheet"></div>';
  document.body.appendChild(box);
})();

/* copy: "customer"(고객용, 기본) | "company"(회사 보관용 — 주문 수집용 관리 정보 추가) */
function renderPO(o, copy) {
  var company = copy === "company";
  var items = o.items || [];
  var total = items.reduce(function (s, it) { return s + (Number(it.amount) || 0); }, 0);
  var isShip = o.method === "배송";
  var addr = isShip ? addrHtml(o) : "현장 수령";
  var rows = items.map(function (it) {
    return "<tr><td class=\"n\">" + esc(FULL_NAMES[it.product] || it.product) + (it.color ? " <span class=\"opt\">(" + esc(it.color) + ")</span>" : "") +
      (pickupText(it, o.method) ? "<div class=\"pk\">└ " + esc(pickupText(it, o.method)) + "</div>" : "") +
      "</td><td class=\"q\">" + esc(it.qty) + "</td><td class=\"a\">" + won(it.amount) + "</td></tr>";
  }).join("");
  /* 회사 보관용: 주문 수집 때 필요한 관리 정보 */
  var mg = "";
  if (company) {
    var picks = items.filter(function (it) { return pickupText(it, o.method); })
      .map(function (it) { return "콧물흡입기(" + esc(it.color) + ") × " + esc(it.qty); });
    mg = '<div class="mg"><div class="ttl">관리 정보</div><dl class="kv">' +
      "<dt>수령 방식</dt><dd class=\"strong\">" + (isShip ? "배송" : "현장 수령") + "</dd>" +
      "<dt>결제</dt><dd class=\"strong\">" + (o.pay === "계좌이체" ? "계좌이체 · 입금자 " + esc(o.payer || o.name) : o.pay ? esc(o.pay) : "-") + "</dd>" +
      "<dt>이벤트 참여</dt><dd>" + (o.participant ? "O" : "X") + "</dd>" +
      (picks.length ? "<dt>현장 전달</dt><dd class=\"strong\">" + picks.join("<br>") + " · 택배는 아기비데만</dd>" : "") +
      (o.request ? "<dt>배송 요청</dt><dd>" + esc(o.request) + "</dd>" : "") +
    "</dl></div>";
  }
  $("poSheet").innerHTML =
    '<div class="head"><h1 class="brandf">Purchase Order</h1><img src="' + PO_LOGO + '" alt="bebeknow"></div>' +
    (company ? '<div class="copy co">회사 보관용 · COMPANY COPY</div>' : '<div class="copy">고객용 · CUSTOMER COPY</div>') +
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
      "<dt>" + (isShip ? "배송지" : "수령") + "</dt><dd>" + addr + "</dd>" +
    "</dl>" +
    '<div class="sec brandf">Order Items</div>' +
    '<table><thead><tr><th>제품</th><th class="q">수량</th><th class="a">금액</th></tr></thead><tbody>' + rows + "</tbody></table>" +
    '<div class="total"><span>합계</span><strong>' + won(total) + "</strong></div>" +
    mg +
    '<div class="spacer"></div>' +
    (company ? '<div class="foot">회사 보관용 · ' + esc(o.orderNo) + "</div>" : '<div class="foot">Easy breath, Easy life · bebeknow.com</div>');
}

/* 품목이 많아 라벨을 넘치면 글자를 0.25pt씩 줄여 한 장에 맞춤 (최소 6.5pt) */
function fitPO() {
  var po = $("poSheet"), fs = 9.5;
  po.style.setProperty("--fs", fs + "pt");
  while (po.scrollHeight > po.clientHeight + 1 && fs > 6.5) { fs -= 0.25; po.style.setProperty("--fs", fs + "pt"); }
}

/* 인쇄는 한 장씩 차례로 (폰트를 기다리는 사이 다른 인쇄가 끼어들어 같은 내용이 두 번 나가지 않게) */
var poQueue = Promise.resolve();
function printPO(o, copy) {
  poQueue = poQueue.then(function () {
    renderPO(o, copy);
    var img = $("poSheet").querySelector("img");
    var waits = [img && img.decode ? img.decode().catch(function () {}) : null];
    if (document.fonts && document.fonts.load) waits.push(document.fonts.load("700 16px Comfortaa").catch(function () {}));
    var timeout = new Promise(function (res) { setTimeout(res, 3000); });   // 폰트가 늦어도 3초 뒤에는 인쇄
    return Promise.race([Promise.all(waits), timeout]).then(function () { fitPO(); window.print(); });
  }).catch(function () {});
  return poQueue;
}
/* 접수 완료: 고객용 먼저, 이어서 회사 보관용 */
function printBoth(o) { printPO(o, "customer"); return printPO(o, "company"); }
window.addEventListener("beforeprint", function () { if ($("poSheet").innerHTML) fitPO(); });
