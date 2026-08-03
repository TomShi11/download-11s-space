// ---- 页面进场动画 ----
document.addEventListener("DOMContentLoaded", () => {
  const els = document.querySelectorAll(".app-card, .dl-table, .shot-frame, .feature-card, .about-card, .checksum");
  els.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${Math.min(i * 60, 360)}ms`;
  });

  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
});

// ---- 下载按钮：提示 + 本地计数 ----
const toastEl = document.getElementById("toast");
let toastTimer = null;

function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2800);
}

document.querySelectorAll(".btn-download").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const app = btn.dataset.app || "软件";
    let count = 0;
    try { count = Number(localStorage.getItem("dl:" + app)) || 0; } catch (_) {}
    count += 1;
    try { localStorage.setItem("dl:" + app, String(count)); } catch (_) {}
    showToast(`正在下载 ${app}… 感谢使用 ❤`);
    // 不阻止默认下载行为
  });
});

// ---- 自动获取安装包大小 ----
document.querySelectorAll("[data-size]").forEach(async (el) => {
  const file = el.dataset.size;
  if (!file) return;
  try {
    const res = await fetch("downloads/" + file, { method: "HEAD" });
    if (res.ok) {
      const bytes = Number(res.headers.get("Content-Length")) || 0;
      if (bytes > 0) {
        const mb = (bytes / 1024 / 1024).toFixed(1);
        el.textContent = mb + " MB";
      }
    }
  } catch (_) {
    // 离线打开时忽略
  }
});

// ---- 平滑滚动 ----
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id.length > 1) {
      const target = document.querySelector(id);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
