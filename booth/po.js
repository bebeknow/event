/* Purchase Order — HPRT N41 100×150mm 감열 라벨용. common.js 다음, body 맨 끝에서 불러옴
 * printPO(order) : 주문 결과(백엔드 order/update 응답)를 받아 라벨 한 장을 인쇄 */
var SELLER = { name: "(주)라이프비기닝", bizNo: "411-87-02761", tel: "02-788-7456" };   /* 본점 사업자번호 + 본점 대표전화 */
/* 고객용 라벨 아래 "베베노 톡톡 문의하기" QR — http://talk.naver.com/W46FM2 (qrcode 1.5.4, 오류 정정 M으로 만든 SVG) */
var TALK_URL = "http://talk.naver.com/W46FM2";
var TALK_QR = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 29" shape-rendering="crispEdges"><path fill="#ffffff" d="M0 0h29v29H0z"/><path stroke="#000000" d="M0 0.5h7m1 0h1m1 0h1m1 0h1m2 0h2m3 0h1m1 0h7M0 1.5h1m5 0h1m3 0h5m1 0h3m3 0h1m5 0h1M0 2.5h1m1 0h3m1 0h1m1 0h2m1 0h2m1 0h3m2 0h2m1 0h1m1 0h3m1 0h1M0 3.5h1m1 0h3m1 0h1m3 0h1m1 0h1m1 0h1m2 0h1m4 0h1m1 0h3m1 0h1M0 4.5h1m1 0h3m1 0h1m5 0h4m2 0h1m1 0h1m1 0h1m1 0h3m1 0h1M0 5.5h1m5 0h1m1 0h1m2 0h2m2 0h1m1 0h2m1 0h1m1 0h1m5 0h1M0 6.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M10 7.5h3m1 0h3m1 0h1m1 0h1M0 8.5h1m1 0h1m3 0h2m1 0h1m2 0h3m2 0h2m1 0h1m2 0h1m2 0h1m1 0h1M1 9.5h3m1 0h1m2 0h4m1 0h2m3 0h3m1 0h2m3 0h2M2 10.5h1m1 0h1m1 0h1m3 0h1m1 0h1m2 0h1m3 0h1m3 0h1m1 0h2m1 0h1M1 11.5h1m1 0h1m5 0h1m3 0h1m4 0h3m1 0h3M0 12.5h2m1 0h1m1 0h3m1 0h2m1 0h2m1 0h3m2 0h1m1 0h2m4 0h1M1 13.5h2m1 0h2m1 0h3m6 0h2m1 0h2m1 0h1m3 0h3M0 14.5h1m3 0h5m3 0h3m1 0h1m1 0h2m1 0h2m2 0h1m2 0h1M0 15.5h1m1 0h1m2 0h1m2 0h1m1 0h2m2 0h4m1 0h1m1 0h1m2 0h1M0 16.5h3m1 0h1m1 0h2m2 0h1m2 0h2m4 0h2m1 0h2m1 0h1m2 0h1M2 17.5h4m1 0h2m2 0h1m1 0h2m4 0h5m1 0h4M0 18.5h2m3 0h2m4 0h1m3 0h1m1 0h1m1 0h2m1 0h3m3 0h1M2 19.5h3m4 0h1m1 0h1m1 0h1m5 0h2m1 0h3M0 20.5h2m1 0h4m3 0h2m1 0h1m1 0h2m1 0h1m1 0h6m1 0h1M8 21.5h2m1 0h1m4 0h1m3 0h1m3 0h3m1 0h1M0 22.5h7m1 0h1m1 0h5m1 0h3m1 0h1m1 0h1m1 0h1m3 0h1M0 23.5h1m5 0h1m2 0h1m1 0h1m2 0h3m3 0h1m3 0h2m1 0h1M0 24.5h1m1 0h3m1 0h1m2 0h1m1 0h4m2 0h8m3 0h1M0 25.5h1m1 0h3m1 0h1m7 0h1m2 0h1m2 0h2m2 0h2m1 0h1M0 26.5h1m1 0h3m1 0h1m1 0h1m3 0h2m1 0h1m3 0h3m2 0h5M0 27.5h1m5 0h1m3 0h2m1 0h1m3 0h1m1 0h3m1 0h1m1 0h1M0 28.5h7m1 0h1m2 0h1m1 0h1m1 0h3m2 0h1m1 0h4m2 0h1"/></svg>';
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
    ".po .foot{border-top:.35mm solid #000;padding-top:1.6mm;font-size:.85em;text-align:center}",
    /* 설치 확인 후 발송 안내 */
    ".po .hold{margin-top:2mm;border:.5mm solid #000;padding:1.5mm 2mm;font-size:.92em;line-height:1.4}.po .hold b{font-weight:900}",
    /* 고객용: 톡톡 문의 QR */
    ".po .talk{display:flex;align-items:center;justify-content:space-between;gap:3mm;border-top:.35mm solid #000;padding:1.6mm 0}",
    ".po .talk b{font-weight:900;font-size:1.15em}",
    ".po .talk svg{width:19mm;height:19mm;flex:none;display:block}"
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
  var isShip = isShipLike(o.method), isHold = o.method === HOLD_METHOD;
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
      "<dt>수령 방식</dt><dd class=\"strong\">" + (isHold ? "설치 확인 후 발송 · 보류 (" + esc(o.holdBy || "기한 미정") + ")" : isShip ? "배송" + (o.dest ? " · " + (o.dest === "MCK" ? "MCK 발주" : o.dest === "MCK+직접" ? "아기비데 MCK 발주 + 나머지 직접 발송" : "직접 발송") : "") : "현장 수령") + "</dd>" +
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
      "<dt>연락처</dt><dd>" + esc(o.phone || "-") + "</dd>" +
      "<dt>" + (isShip ? "배송지" : "수령") + "</dt><dd>" + addr + "</dd>" +
    "</dl>" +
    '<div class="sec brandf">Order Items</div>' +
    '<table><thead><tr><th>제품</th><th class="q">수량</th><th class="a">금액</th></tr></thead><tbody>' + rows + "</tbody></table>" +
    '<div class="total"><span>합계</span><strong>' + won(total) + "</strong></div>" +
    (isHold && !company ? '<div class="hold"><b>🏠 설치 확인 후 발송</b> (결제 완료) · 집에서 설치 가능 여부를 확인하신 뒤 <b>' + esc(o.holdBy || "기한 내") + "</b> <b>네이버 톡톡</b>으로 알려 주세요. 기한이 지나면 자동으로 배송됩니다.</div>" : "") +
    mg +
    '<div class="spacer"></div>' +
    (company ? "" : '<div class="talk"><b>베베노 톡톡 문의하기</b>' + TALK_QR + "</div>") +
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
