/**
 * Dr. Balance — shared nav / footer / mobile menu
 * Each page sets: <body data-root=".." data-page="home">
 * data-root: relative path to site root ("" | "../" | "../../")
 * data-page: current page id for aria-current
 */
(function () {
  const root = (document.body.getAttribute("data-root") || "").replace(/\/?$/, function (m) {
    return m || (document.body.getAttribute("data-root") === "" ? "" : "");
  });
  // Normalize: ensure trailing slash if non-empty
  const base = document.body.getAttribute("data-root") || "";
  const B = base; // e.g. "" or "../" or "../../" — already with trailing slash when nested
  const page = document.body.getAttribute("data-page") || "";

  function href(path) {
    return B + path;
  }

  function isCurrent(id) {
    return page === id ? ' aria-current="page"' : "";
  }

  const headerHTML = `
    <div class="header-inner">
      <a class="logo" href="${href("index.html")}">Dr. Balance<span>한의원</span></a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="메뉴 열기">
        <span></span><span></span><span></span>
      </button>
      <nav class="site-nav" id="site-nav" aria-label="주요 메뉴">
        <ul>
          <li><a href="${href("index.html")}"${isCurrent("home")}>홈</a></li>
          <li>
            <a href="${href("acupuncture/index.html")}"${isCurrent("acu")}>침 치료</a>
            <ul class="nav-sub">
              <li><a href="${href("acupuncture/neck-shoulder.html")}"${isCurrent("neck")}>목·어깨 긴장</a></li>
              <li><a href="${href("acupuncture/headache.html")}"${isCurrent("headache")}>두통·편두통</a></li>
              <li><a href="${href("acupuncture/back-pelvis.html")}"${isCurrent("back")}>허리·골반 통증</a></li>
              <li><a href="${href("acupuncture/ankle-calf.html")}"${isCurrent("ankle")}>발목·종아리·부종</a></li>
            </ul>
          </li>
          <li>
            <a href="${href("herbs/index.html")}"${isCurrent("herbs")}>한약</a>
            <ul class="nav-sub">
              <li><a href="${href("herbs/digestion.html")}"${isCurrent("digestion")}>소화불량·역류</a></li>
              <li><a href="${href("herbs/hives.html")}"${isCurrent("hives")}>두드러기</a></li>
              <li><a href="${href("herbs/anxiety-sleep.html")}"${isCurrent("anxiety")}>불안·불면</a></li>
            </ul>
          </li>
          <li><a href="${href("visit/index.html")}"${isCurrent("visit")}>처음 오시는 분</a></li>
          <li><a href="${href("doctor/index.html")}"${isCurrent("doctor")}>원장 소개</a></li>
          <li><a href="${href("contact/index.html")}"${isCurrent("contact")}>오시는 길</a></li>
        </ul>
        <div class="nav-cta">
          <a class="btn btn--ghost" href="tel:【전화번호】">【전화번호】</a>
          <a class="btn btn--primary" href="【네이버 예약】">네이버 예약</a>
        </div>
      </nav>
    </div>
  `;

  const footerHTML = `
    <div class="wrap wrap--wide">
      <div class="footer-grid">
        <div>
          <div class="footer-brand">Dr. Balance<span>스트레스가 몸에 남긴 것을 푸는 한의원</span></div>
          <p>서울 강남구 논현동 37-16<br>(학동역 권역)</p>
          <p style="margin-top:0.75rem">전화 <span class="placeholder">【전화번호】</span><br>
          예약 <span class="placeholder">【네이버 예약】</span></p>
        </div>
        <div>
          <div class="footer-heading">진료 안내</div>
          <ul>
            <li><a href="${href("visit/index.html")}">처음 오시는 분</a></li>
            <li><a href="${href("contact/index.html")}">오시는 길·진료시간</a></li>
            <li><a href="${href("acupuncture/index.html")}">침 치료</a></li>
            <li><a href="${href("herbs/index.html")}">한약</a></li>
          </ul>
        </div>
        <div>
          <div class="footer-heading">진료시간</div>
          <p><span class="placeholder">【원장 확인】</span> 확정 후 공개합니다.<br>
          점심시간 예약 가능 여부도 함께 안내 예정입니다.</p>
        </div>
      </div>
      <div class="footer-bottom">
        © Dr. Balance. 의료광고 심의 기준을 준수합니다.
      </div>
    </div>
  `;

  const headerEl = document.getElementById("site-header");
  const footerEl = document.getElementById("site-footer");
  if (headerEl) headerEl.innerHTML = headerHTML;
  if (footerEl) footerEl.innerHTML = footerHTML;

  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 899px)").matches) {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        }
      });
    });
  }

  // Header scroll state
  const header = document.getElementById("site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
