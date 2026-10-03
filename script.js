const $ = id => document.getElementById(id);
const END = "\u2764\uFE0F \uD83D\uDC3C"; /* one red heart + one panda */

/* fill text from config.js */
$("hello").textContent = "Hey " + CONFIG.hisName;
$("title").textContent = CONFIG.title;
$("cap").textContent = CONFIG.photoCaption;
$("greet").textContent = CONFIG.greeting;
$("sign").textContent = CONFIG.sign;
CONFIG.letter.forEach(t => { const p = document.createElement("p"); p.textContent = t; $("letter").appendChild(p); });
const endLine = document.createElement("p"); endLine.className = "end"; endLine.textContent = END;
$("letter").appendChild(endLine);

/* photo */
const img = new Image(); img.alt = "Us";
img.onload = () => { $("fr").textContent = ""; $("fr").appendChild(img); };
img.src = CONFIG.photo;
$("photoBtn").onclick = () => $("file").click();
$("file").onchange = e => {
  const f = e.target.files[0]; if (!f) return;
  const r = new FileReader();
  r.onload = () => { img.src = r.result; $("fr").textContent = ""; $("fr").appendChild(img); };
  r.readAsDataURL(f);
};

/* countdown */
const target = new Date(CONFIG.countdownDate).getTime();
function tick(){
  const diff = target - Date.now();
  $("lbl").textContent = diff >= 0 ? CONFIG.countdownLabelFuture : CONFIG.countdownLabelPast;
  const t = Math.abs(diff) / 1000;
  $("d").textContent = Math.floor(t / 86400);
  $("h").textContent = Math.floor(t % 86400 / 3600);
  $("m").textContent = Math.floor(t % 3600 / 60);
  $("s").textContent = Math.floor(t % 60);
}
tick(); setInterval(tick, 1000);

/* soft pink hearts */
function burst(x, y){
  for (let i = 0; i < 9; i++){
    const s = document.createElement("span");
    s.className = "fly"; s.textContent = "\u2665";
    s.style.left = x + "px"; s.style.top = y + "px";
    s.style.setProperty("--dx", (Math.random() * 200 - 100) + "px");
    s.style.animationDelay = (i * 60) + "ms";
    document.body.appendChild(s); setTimeout(() => s.remove(), 1800);
  }
}

/* pages */
function show(id){
  document.querySelectorAll(".page").forEach(p => p.classList.remove("on"));
  $(id).classList.add("on"); window.scrollTo(0, 0);
}
$("box").onclick = () => {
  const b = $("box");
  if (b.classList.contains("open")) return;
  b.classList.add("open");
  const r = b.getBoundingClientRect();
  burst(r.left + r.width / 2, r.top + r.height / 3);
  setTimeout(() => { show("p2"); b.classList.remove("open"); }, 2300);
};
$("back").onclick = () => show("p1");
$("next").onclick = () => show("p3");
$("back2").onclick = () => show("p2");

/* seven letters */
$("sTitle").textContent = CONFIG.surpriseTitle;
$("sSub").textContent = CONFIG.surpriseSub;
CONFIG.letters.forEach(l => {
  const b = document.createElement("button");
  b.className = "env"; b.textContent = l.label;
  b.onclick = e => {
    b.classList.add("read");
    $("mTitle").textContent = l.label;
    $("mText").textContent = l.text + " " + END;
    $("modal").classList.add("on");
    burst(e.clientX || innerWidth / 2, e.clientY || innerHeight / 2);
    $("mClose").focus();
  };
  $("envGrid").appendChild(b);
});
const closeModal = () => $("modal").classList.remove("on");
$("mClose").onclick = closeModal;
$("modal").onclick = e => { if (e.target.id === "modal") closeModal(); };
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
