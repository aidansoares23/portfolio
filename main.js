// ─── Custom cursor (desktop only) ─────────────────────────────────────────
if (!window.matchMedia("(pointer: coarse)").matches) {
  const cursor = document.getElementById("cursor");
  const ring = document.getElementById("cursorRing");
  let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
  });

  function animateRing() {
    rx += (mx - rx - 18) * 0.12;
    ry += (my - ry - 18) * 0.12;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll("a, button, .project-card").forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("hover"));
    el.addEventListener("mouseleave", () =>
      ring.classList.remove("hover"),
    );
  });
}

// ─── Nav scroll effect ────────────────────────────────────────────────────
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// ─── Scroll reveal ────────────────────────────────────────────────────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${i * 0.08}s`;
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 },
);
document
  .querySelectorAll(".reveal")
  .forEach((el) => observer.observe(el));

// ─── Hero code card: instant render + typewriter last line ───────────────
//
// Strategy:
//   1) All lines except the last are rendered immediately (no typing).
//   2) The card pops in via CSS after ~1s.
//   3) Only the final comment line is typed out — as a scroll hook.
//
const block = document.getElementById("codeBlock");
if (!block) {
  // Safety: if the hero card is removed in a variant build
  // we skip the effect entirely.
} else {
  block.textContent = "";

  const staticLines = [
    '<span class="keyword">const</span> <span class="func">aidanSoares</span> = {',
    '  <span class="prop">role</span>: <span class="string">"Full Stack Engineer"</span>,',
    '  <span class="prop">education</span>: <span class="string">"CS @ Oregon State"</span>,',
    '  <span class="prop">gpa</span>: <span class="string">3.87</span>,',
    '  <span class="prop">stack</span>: [',
    '    <span class="string">"React"</span>, <span class="string">"Node.js"</span>,',
    '    <span class="string">"Express"</span>, <span class="string">"SQL"</span>,',
    '    <span class="string">"Firestore"</span>, <span class="string">"Python"</span>',
    "  ],",
    '  <span class="prop">seeking</span>: <span class="string">"Full-time 2026"</span>,',
    '  <span class="prop">openToWork</span>: <span class="keyword">true</span>',
    "}",
    "",
  ];

  const finalLinePlain = " // projects below";
  const finalLineHTML = '<span class="comment">// projects below</span>';

  // Render all static lines immediately
  staticLines.forEach((html) => {
    const span = document.createElement("span");
    span.className = "code-line";
    span.innerHTML = html;
    block.appendChild(span);
  });

  // Create the final line element (empty for now)
  const finalEl = document.createElement("span");
  finalEl.className = "code-line";
  block.appendChild(finalEl);

  // Blinking cursor
  const typeCursor = document.createElement("span");
  typeCursor.className = "type-cursor";

  // Start typing after the card pop-in completes.
  // Randomized delays feel human; spaces and punctuation breathe a little longer.
  const TYPE_START = 2000;

  function charDelay(ch) {
    const base = 72 + Math.random() * 58; // 72–130 ms
    if (ch === " " || ch === "—") return base + 75;
    if (ch === "/" || ch === ".") return base + 30;
    return base;
  }

  setTimeout(() => {
    finalEl.appendChild(typeCursor);
    let i = 0;

    function typeChar() {
      if (i < finalLinePlain.length) {
        finalEl.insertBefore(
          document.createTextNode(finalLinePlain[i]),
          typeCursor,
        );
        const delay = charDelay(finalLinePlain[i]);
        i++;
        setTimeout(typeChar, delay);
        return;
      }

      finalEl.innerHTML = finalLineHTML;
      typeCursor.remove();
      setTimeout(() => {
        finalEl.classList.add("comment-final");
        // Brief border brightening when typing completes
        const card = document.querySelector(".hero-card");
        if (card) card.classList.add("typed");
      }, 250);
    }

    typeChar();
  }, TYPE_START);
}
    