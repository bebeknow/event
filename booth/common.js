/* 베베노 부스 공통 — 직원 화면(index.html)과 고객 화면(customer.html)이 함께 씀 */
var GAS_URL = "https://script.google.com/macros/s/AKfycbwOrp74H1BYqzJ-8Wv7jv4q5qJ8K0qfA1z6YpHIRz-LsfTCHWrP8SoGe_8QYl51Q_zOew/exec";

/* 맥북·아이패드 한 쌍 = 스테이션. 부스가 둘이면 주소 뒤에 ?s=2 를 양쪽에 똑같이 붙임 */
var STATION = (new URLSearchParams(location.search).get("s") || "1").replace(/[^\w-]/g, "").slice(0, 20) || "1";

/* 제품·단가·색상 (여기서 수정) — 백엔드 BUY_PRODUCTS·PRODUCT_COLORS 와 이름이 같아야 함 */
/* 화면 순서 = 이 순서. set: 세트(콧물흡입기 색상 선택 + 배송일 때 "콧물흡입기 현장 수령" 체크) */
var SET_KEY = "아기비데+콧물흡입기";
var PRODUCTS = [
  { key: "콧물흡입기",       price: 189000, colors: ["핑크", "베이지", "그린"] },
  { key: SET_KEY,            price: 259000, colors: ["핑크", "베이지", "그린"], set: true, label: "아기비데 + 콧물흡입기 세트" },
  { key: "아기비데",         price: 84800 },
  { key: "실리콘약병 3개입", price: 14800 },
  /* 2026-10-16 판매 중단: 목록에는 안 보이고, 예전 주문을 불러와 고칠 때 단가만 씀 */
  { key: "실리콘약병 1개입", price: 8000, colors: ["핑크", "옐로우", "베이지"], hidden: true }
];
/* Purchase Order 에 찍는 정식 상품명 (백엔드 SHIP_NAMES 와 같게) */
var FULL_NAMES = {
  "콧물흡입기": "베베노 무선 전동식 아기 콧물흡입기",
  "아기비데": "베베노 아기비데",
  "실리콘약병 3개입": "베베노 실리콘 약병 3개입",
  "실리콘약병 1개입": "베베노 실리콘 약병 1개입",
  "아기비데+콧물흡입기": "베베노 아기비데 + 콧물흡입기 세트"
};
var PICKUP_NOTE = "콧물흡입기 현장 수령";
/* 배송 안내 문구. 발송 일정이 확정되기 전까지는 날짜 대신 이 문구를 보여줌 (서버가 주는 다음 영업일 날짜는 쓰지 않음) */
var SHIP_NOTE = "행사 종료 후 순차 발송 (영업일 기준 2~3일)";

function $(id) { return document.getElementById(id); }
function priceOf(product) { for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].key === product) return PRODUCTS[i].price; return 0; }
function digits(v) { return String(v || "").replace(/\D/g, ""); }
function fmtPhone(v) {
  var d = digits(v).slice(0, 11);
  if (d.length > 7) return d.slice(0, 3) + "-" + d.slice(3, d.length === 10 ? 6 : 7) + "-" + d.slice(d.length === 10 ? 6 : 7);
  if (d.length > 3) return d.slice(0, 3) + "-" + d.slice(3);
  return d;
}
function won(n) { return Number(n || 0).toLocaleString("ko-KR") + "원"; }
function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
/* 주소 HTML: 상세주소("A-A513호" 등)는 중간에서 줄이 갈리지 않게 한 덩어리로 묶음 */
function addrHtml(o) {
  var a2 = String(o.address2 || "").trim();
  return esc((o.zip ? "(" + o.zip + ") " : "") + (o.address || "")) +
    (a2 ? " " + (a2.length <= 24 ? '<span style="white-space:nowrap">' + esc(a2) + "</span>" : esc(a2)) : "");
}
function productLabel(key) { for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].key === key) return PRODUCTS[i].label || key; return key; }
function itemLabel(it) { return productLabel(it.product) + (it.color ? " · " + it.color : ""); }
/* 세트에서 콧물흡입기만 현장에서 가져간 경우 표시 (배송 주문에서만 의미 있음) */
function pickupText(it, method) { return it.pickup && it.product === SET_KEY && method === "배송" ? PICKUP_NOTE : ""; }
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
function msg(el, text, cls) { el.className = "msg" + (text ? " " + (cls || "err") : ""); el.textContent = text || ""; }

/* 핫스팟 환경: 25초 넘게 응답이 없으면 실패로 처리 */
function fetchJSON(url, opt) {
  var ctl = new AbortController();
  var t = setTimeout(function () { ctl.abort(); }, 25000);
  opt = opt || {};
  opt.signal = ctl.signal;
  opt.redirect = "follow";
  return fetch(url, opt).then(function (r) { return r.json(); }).finally(function () { clearTimeout(t); });
}
function apiGet(params) {
  var q = Object.keys(params).map(function (k) { return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]); }).join("&");
  return fetchJSON(GAS_URL + "?" + q, {});
}
function apiPost(body) { return fetchJSON(GAS_URL, { method: "POST", body: JSON.stringify(body) }); }

/* 카카오 우편번호 검색 — 한 번 만든 레이어를 재사용. onPick({zip, address}) */
function openAddrSearch(onPick) {
  var layer = $("addrLayer");
  if (!layer) {
    layer = document.createElement("div");
    layer.id = "addrLayer";
    layer.className = "addr-layer";
    layer.innerHTML = '<div class="addr-panel" role="dialog" aria-modal="true" aria-label="주소 검색">' +
      '<div class="addr-head"><b>주소 검색</b><button type="button" class="addr-close" aria-label="닫기">✕</button></div>' +
      '<div class="addr-embed"></div></div>';
    document.body.appendChild(layer);
    layer.addEventListener("click", function (e) { if (e.target === layer || e.target.closest(".addr-close")) closeAddr(); });
  }
  var embed = layer.querySelector(".addr-embed");
  function closeAddr() { layer.hidden = true; embed.innerHTML = ""; }
  if (!window.daum || !window.daum.Postcode) return false;
  layer.hidden = false;
  embed.innerHTML = "";
  new daum.Postcode({
    oncomplete: function (data) {
      var a = data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress, extra = "";
      if (data.userSelectedType === "R") {
        if (data.bname && /[동로가]$/.test(data.bname)) extra += data.bname;
        if (data.buildingName && data.apartment === "Y") extra += (extra ? ", " : "") + data.buildingName;
        if (extra) a += " (" + extra + ")";
      }
      closeAddr();
      onPick({ zip: data.zonecode, address: a });
    },
    onclose: function (state) { if (state === "FORCE_CLOSE") closeAddr(); },
    width: "100%", height: "100%"
  }).embed(embed);
  return true;
}
