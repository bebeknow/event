/* MCK 수동 발주 업로드 양식 채우기.
 * MCK가 보낸 양식 파일(mck_template.xlsx) 자체에 2행부터 주문 줄을 넣어서, 글꼴·빨간 머리글·열 너비·텍스트 서식을 그대로 둔다.
 * buildMckXlsx(JSZip, 양식 ArrayBuffer, rows[10열], "blob"|"uint8array") → Promise */
(function (root) {
  var COLS = "ABCDEFGHIJ";
  var TEXT_STYLE = 6, GEN_STYLE = 7;          // 양식의 열 기본 서식: B·C(전화번호) = 텍스트·왼쪽, 나머지 = 일반·왼쪽
  function xesc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; })
                    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "");
  }
  function buildMckXlsx(JSZip, buf, rows, type) {
    return JSZip.loadAsync(buf).then(function (zip) {
      return Promise.all([zip.file("xl/sharedStrings.xml").async("string"), zip.file("xl/worksheets/sheet1.xml").async("string")]).then(function (t) {
        var ss = t[0], sh = t[1];
        var unique = (ss.match(/<si>/g) || []).length;
        var countM = ss.match(/<sst[^>]*\scount="(\d+)"/), count = countM ? +countM[1] : unique;
        var added = [], uses = 0;
        function sidx(v) { added.push('<si><t xml:space="preserve">' + xesc(v) + "</t></si>"); uses++; return unique + added.length - 1; }
        var xml = rows.map(function (r, i) {
          var rn = i + 2;
          return '<row r="' + rn + '" spans="1:10">' + r.map(function (v, j) {
            if (v === "" || v === null || v === undefined) return "";
            var ref = COLS[j] + rn, st = (j === 1 || j === 2) ? TEXT_STYLE : GEN_STYLE;
            if (j === 6 && /^\d+$/.test(String(v))) return '<c r="' + ref + '" s="' + st + '"><v>' + String(v) + "</v></c>";   // 상품 수량은 숫자
            return '<c r="' + ref + '" s="' + st + '" t="s"><v>' + sidx(v) + "</v></c>";
          }).join("") + "</row>";
        }).join("");
        if (sh.indexOf("</sheetData>") < 0) throw new Error("양식 시트 구조가 예상과 달라요");
        sh = sh.replace("</sheetData>", xml + "</sheetData>")
               .replace(/<dimension ref="[^"]*"\/>/, '<dimension ref="A1:J' + (rows.length + 1) + '"/>');
        ss = ss.replace("</sst>", added.join("") + "</sst>")
               .replace(/(<sst[^>]*\s)count="\d+"/, "$1count=\"" + (count + uses) + "\"")
               .replace(/uniqueCount="\d+"/, 'uniqueCount="' + (unique + added.length) + '"');
        zip.file("xl/sharedStrings.xml", ss);
        zip.file("xl/worksheets/sheet1.xml", sh);
        return zip.generateAsync({ type: type || "blob", mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", compression: "DEFLATE" });
      });
    });
  }
  root.buildMckXlsx = buildMckXlsx;
  if (typeof module !== "undefined" && module.exports) module.exports = buildMckXlsx;
})(typeof window !== "undefined" ? window : this);
