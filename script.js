(() => {
  const doc = document;
  const body = doc.body;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const promiseData = {
    apology: {
      title: "I’m sorry for the way I handled this.",
      text: "I’m not going to dress it up or make excuses. Something between us hurt, and I know my part in that hurt matters. You deserved more care, more clarity, and more softness from me.",
      flower: "White Tulip"
    },
    listen: {
      title: "I will listen before I defend myself.",
      text: "You do not have to convince me that you were hurt. I want to understand what this felt like from your side — properly, without interrupting, correcting, or trying to win.",
      flower: "Bluebell"
    },
    patience: {
      title: "I can give you time without disappearing.",
      text: "Taking time does not scare me. I can let you breathe. I can stay steady. I can care about you without demanding that you feel better on my schedule.",
      flower: "Chamomile"
    },
    work: {
      title: "I want to repair, not just apologise.",
      text: "An apology only means something when my actions become gentler afterward. I want to earn back peace through consistency, honesty, and the little things I do when nobody is applauding.",
      flower: "Daffodil"
    },
    hope: {
      title: "I still have hope for us.",
      text: "Not a hope that ignores reality. A quiet hope that says one painful chapter does not have to become the ending. I believe some things can be repaired when two people are willing to try.",
      flower: "Goldenrod"
    },
    love: {
      title: "My feelings for you did not disappear with the argument.",
      text: "I love you. I’m not saying that to put weight on your heart. I’m saying it because I want you to know what is true in mine — even while I respect whatever time your heart needs.",
      flower: "Gardenia"
    }
  };

  const bouquetData = {
    hurt: {
      mood: "For the hurt",
      title: "You don’t have to hide the bruise.",
      text: "I know an apology cannot rewind the moment. So I’m not asking you to pretend it didn’t happen. Let it be real. Let yourself feel whatever you feel. I will meet you there with patience, not pressure.",
      promise: "I will not rush your healing just because I miss you.",
      flowers: ["Violet", "Poppy", "Forget-me-not"],
      accent: "#9b7aa9"
    },
    angry: {
      mood: "For the anger",
      title: "You’re allowed to be angry with me.",
      text: "You never need to make your feelings smaller so I can stay comfortable. Tell me what hurt. Tell me what you needed. I would rather hear an uncomfortable truth than receive a comfortable silence.",
      promise: "I will listen to understand, not listen to answer.",
      flowers: ["Iris", "Marigold", "Protea"],
      accent: "#bd6874"
    },
    tired: {
      mood: "For the tired heart",
      title: "Put the weight down for a while.",
      text: "You don't have to solve us tonight. You don't have to decide what this becomes. Rest. Breathe. Eat something. Sleep. Let tomorrow be tomorrow.",
      promise: "I can love you patiently without asking you to carry my anxiety too.",
      flowers: ["Magnolia", "Stock", "Lily of the Valley"],
      accent: "#8d8aaa"
    },
    quiet: {
      mood: "For the quiet",
      title: "You can have some silence here.",
      text: "Priya, if quiet is what gives you room to settle, I can respect that. You are not required to keep a conversation going just because I am ready before you are.",
      promise: "I will give you space without making you feel guilty for taking it.",
      flowers: ["Snowdrop", "Primrose", "Bellflower"],
      accent: "#7b65a7"
    },
    hope: {
      mood: "For hopeful someday",
      title: "Maybe things can feel gentle again.",
      text: "I still hope for a better chapter, but I do not need you to promise me one. I can simply be honest about that hope and leave the future where it belongs — in its own time.",
      promise: "I will hold hope softly, without placing it in your hands.",
      flowers: ["Crocus", "Water Lily", "Hyacinth"],
      accent: "#c49a45"
    },
    scared: {
      mood: "For the fear",
      title: "Let’s not let one fear write the whole story.",
      text: "I know trust can feel fragile when a misunderstanding touches an old fear. I won't tell you that you are silly for feeling it. I want to make safety something you can actually feel from my actions.",
      promise: "I will choose transparency over ambiguity, again and again.",
      flowers: ["Bluebell", "Lavender", "Baby's Breath"],
      accent: "#6e83b1"
    },
    ready: {
      mood: "For whenever you’re ready",
      title: "One honest conversation is all I’m asking for.",
      text: "Not a promise. Not an instant answer. Not a decision about forever. Just one real conversation, whenever your heart says it is safe enough to have it.",
      promise: "I’ll come without a speech to win you — only with a heart ready to listen.",
      flowers: ["Daisy", "Sunflower", "White Tulip"],
      accent: "#b78b4b"
    }
  };

  const state = {
    activePromise: "apology",
    activeBouquet: "hurt"
  };

  function setup() {
    setupNav();
    setupReveal();
    setupAcknowledgement();
    setupPromiseTabs();
    setupBouquetTabs();
    setupAmbientCanvas();
    renderHeroFlowers();
    renderNoticeFlowers();
    renderApologyFlowers();
    renderPromise();
    renderBouquet();
    rotateFinalNote();
    body.classList.add("is-ready");
  }

  function setupAcknowledgement() {
    const button = doc.getElementById("acknowledgeButton");
    const popup = doc.getElementById("acknowledgementPopup");
    const close = doc.getElementById("acknowledgementClose");
    if (!button || !popup) return;

    let hideTimer = null;

    const hidePopup = () => {
      popup.classList.remove("is-visible");
      popup.setAttribute("aria-hidden", "true");
      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }
    };

    const showPopup = () => {
      popup.classList.add("is-visible");
      popup.setAttribute("aria-hidden", "false");
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = window.setTimeout(hidePopup, 3000);
    };

    button.addEventListener("click", showPopup);
    close?.addEventListener("click", hidePopup);
    popup.addEventListener("click", (event) => {
      if (event.target === popup) hidePopup();
    });
    doc.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && popup.classList.contains("is-visible")) hidePopup();
    });
  }

  function setupNav() {
    const toggle = doc.getElementById("navToggle");
    const nav = doc.getElementById("primaryNav");
    if (!toggle || !nav) return;
    const setOpen = (open) => {
      body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    };
    toggle.addEventListener("click", () => setOpen(!body.classList.contains("nav-open")));
    doc.querySelectorAll("#primaryNav a").forEach(a => a.addEventListener("click", () => setOpen(false)));
    doc.addEventListener("keydown", e => {
      if (e.key === "Escape") setOpen(false);
    });
  }

  function setupReveal() {
    const items = [...doc.querySelectorAll(".reveal")];
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(x => x.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    items.forEach(item => observer.observe(item));
  }

  function setupPromiseTabs() {
    doc.querySelectorAll(".promise-tab").forEach(button => {
      button.addEventListener("click", () => {
        state.activePromise = button.dataset.promise;
        doc.querySelectorAll(".promise-tab").forEach(b => {
          const active = b === button;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-pressed", String(active));
        });
        renderPromise();
      });
    });
  }

  function renderPromise() {
    const data = promiseData[state.activePromise];
    if (!data) return;
    const title = doc.getElementById("promiseTitle");
    const text = doc.getElementById("promiseText");
    const flower = doc.getElementById("promiseFlower");
    const label = doc.getElementById("promiseFlowerLabel");
    if (title) title.textContent = data.title;
    if (text) text.textContent = data.text;
    if (label) label.textContent = data.flower;
    if (flower) {
      flower.replaceChildren();
      flower.appendChild(createFlowerIllustration(data.flower, "promise"));
    }
  }

  function setupBouquetTabs() {
    doc.querySelectorAll(".bouquet-tab").forEach(button => {
      button.addEventListener("click", () => {
        state.activeBouquet = button.dataset.bouquet;
        doc.querySelectorAll(".bouquet-tab").forEach(b => {
          const active = b === button;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-pressed", String(active));
        });
        renderBouquet();
      });
    });
  }

  function renderBouquet() {
    const data = bouquetData[state.activeBouquet];
    if (!data) return;
    const display = doc.getElementById("bouquetDisplay");
    const mood = doc.getElementById("bouquetMood");
    const title = doc.getElementById("bouquetTitle");
    const text = doc.getElementById("bouquetText");
    const promise = doc.getElementById("bouquetPromise");
    const flowers = doc.getElementById("bouquetFlowers");
    if (!display || !flowers) return;

    if (mood) mood.textContent = data.mood;
    if (title) title.textContent = data.title;
    if (text) text.textContent = data.text;
    if (promise) promise.textContent = data.promise;

    display.style.setProperty("--bouquet-accent", data.accent);
    flowers.replaceChildren();

    data.flowers.forEach((name, index) => {
      const card = doc.createElement("div");
      card.className = `bouquet-flower flower-${index + 1}`;
      card.appendChild(createFlowerIllustration(name, "bouquet"));
      const caption = doc.createElement("span");
      caption.textContent = name;
      card.appendChild(caption);
      flowers.appendChild(card);
    });
  }

  function renderApologyFlowers() {
    doc.querySelectorAll("[data-apology-flower]").forEach((host) => {
      const name = host.dataset.apologyFlower;
      if (!name) return;
      host.replaceChildren(createFlowerIllustration(name, "apology"));
    });
  }

  function renderNoticeFlowers() {
    doc.querySelectorAll("[data-notice-flower]").forEach((host) => {
      const name = host.dataset.noticeFlower;
      if (!name) return;
      host.replaceChildren(createFlowerIllustration(name, "notice"));
    });
  }

  function renderHeroFlowers() {
    const wrap = doc.getElementById("heroBouquet");
    if (!wrap) return;
    ["Rosemary", "Gladiolus", "Zinnia"].forEach((name, index) => {
      const flower = doc.createElement("div");
      flower.className = `hero-flower hero-flower-${index + 1}`;
      flower.appendChild(createFlowerIllustration(name, "hero"));
      wrap.appendChild(flower);
    });
  }

  function setupAmbientCanvas() {
    const canvas = doc.getElementById("gardenCanvas");
    if (!canvas || reduceMotion) return;
    if (window.matchMedia("(max-width: 600px), (pointer: coarse)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = 0, h = 0;
    let particles = [];
    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * ratio);
      canvas.height = Math.floor(h * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = Array.from({length: 30}, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        s: 3 + Math.random() * 6,
        v: 0.12 + Math.random() * 0.28,
        p: Math.random() * Math.PI * 2
      }));
    }
    function frame(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.y += p.v;
        p.x += Math.sin(t / 1200 + p.p) * 0.14;
        if (p.y > h + 15) {
          p.y = -15;
          p.x = Math.random() * w;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(Math.sin(t / 1400 + p.p));
        ctx.fillStyle = "rgba(217,106,123,0.18)";
        ctx.beginPath();
        ctx.ellipse(0, 0, p.s * 0.42, p.s, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      requestAnimationFrame(frame);
    }
    resize();
    window.addEventListener("resize", resize, {passive:true});
    requestAnimationFrame(frame);
  }

  const speciesProfiles = {
    "lavender": { template: "lavender", primary: "#7b65a7", secondary: "#b8a8dc", leaf: "#6f9f71" },
    "sunflower": { template: "sunflower", primary: "#e7a931", secondary: "#ffe084", leaf: "#5f9a55" },
    "lily": { template: "lily", primary: "#f8f7ef", secondary: "#e1efe4", accent: "#c97f7f", leaf: "#6b8f75" },
    "daisy": { template: "daisy", primary: "#ffffff", secondary: "#eef7f4", accent: "#d89b2e", leaf: "#4f9a8f" },
    "bluebell": { template: "bluebell", primary: "#5879c8", secondary: "#90a9ed", leaf: "#4f8a60" },
    "rosemary": { template: "rosemary", primary: "#88a88a", secondary: "#9db7da", leaf: "#4d7c63" },
    "forget-me-not": { template: "forgetMeNot", primary: "#6f92c6", secondary: "#a8c7ef", accent: "#f0cc45", leaf: "#5f936d" },
    "rose": { template: "rose", primary: "#d96a7b", secondary: "#f3a6b2", leaf: "#4f8a60" },
    "white-tulip": { template: "tulip", primary: "#fffaf0", secondary: "#dce9d5", leaf: "#5f9a68" },
    "tulip": { template: "tulip", primary: "#d96a7b", secondary: "#f3a6b2", leaf: "#5f9a68" },
    "olive-leaf": { template: "olive", primary: "#8aa15e", secondary: "#ccd0a4", leaf: "#798f55" },
    "chamomile": { template: "chamomile", primary: "#ffffff", secondary: "#f3f7f0", accent: "#e2b33e", leaf: "#6c9964" },
    "daffodil": { template: "daffodil", primary: "#ffd963", secondary: "#f5a936", leaf: "#5f9555" },
    "crocus": { template: "crocus", primary: "#8b71c8", secondary: "#d3c7ef", leaf: "#587f4e" },
    "lotus": { template: "lotus", primary: "#d96a9f", secondary: "#f5b8d0", leaf: "#5f9d80" },
    "blue-lotus": { template: "lotus", primary: "#6d82d8", secondary: "#a6c4f2", leaf: "#5f9d80" },
    "jasmine": { template: "jasmine", primary: "#fffdf2", secondary: "#f0ead1", leaf: "#4f8a60" },
    "lily-of-the-valley": { template: "lilyOfValley", primary: "#fffdf4", secondary: "#dfe8d2", leaf: "#5f8d5d" },
    "gladiolus": { template: "gladiolus", primary: "#d96a7b", secondary: "#f3a6b2", leaf: "#5b8f5f" },
    "zinnia": { template: "zinnia", primary: "#d96a7b", secondary: "#f0b33f", leaf: "#5f9365" },
    "cherry-blossom": { template: "cherryBlossom", primary: "#f3a7bd", secondary: "#ffd7e1", leaf: "#7b5a44" },
    "marigold": { template: "marigold", primary: "#f0a12f", secondary: "#c9632d", leaf: "#5f8f50" },
    "dahlia": { template: "dahlia", primary: "#c35f8e", secondary: "#f0a8c7", leaf: "#5f8f5f" }
  };

  const generatedTemplates = ["daisy", "bell", "spike", "cup", "cluster", "pom", "star"];
  const generatedPalettes = [
    ["#d96a7b", "#f4a6b3", "#5f9365"],
    ["#e7a931", "#ffe084", "#6c9155"],
    ["#7b65a7", "#b8a8dc", "#587f62"],
    ["#4f9a8f", "#9ed3cf", "#5f8f5f"],
    ["#c35f8e", "#f0a8c7", "#6d8f5b"],
    ["#6f92c6", "#a8c7ef", "#597f6d"]
  ];

  function createFlowerIllustration(name, context) {
    const profile = profileForSpecies(name);
    const svg = svgFromMarkup(flowerMarkup(profile, name), name);
    svg.classList.add(`flower-svg-${profile.template}`);
    svg.dataset.species = profile.key;
    svg.dataset.context = context || "default";
    if (context && context !== "default") {
      svg.setAttribute("aria-hidden", "true");
      svg.removeAttribute("role");
      svg.removeAttribute("aria-label");
    }
    return svg;
  }

  function profileForSpecies(name) {
    const key = normalizeSpeciesName(name);
    if (speciesProfiles[key]) return { ...speciesProfiles[key], key };

    if (key.includes("lily-of-the-valley")) return { ...speciesProfiles["lily-of-the-valley"], key };
    if (key.includes("forget")) return { ...speciesProfiles["forget-me-not"], key };
    if (key.includes("bluebell") || key.includes("bellflower")) return { ...speciesProfiles.bluebell, key };
    if (key.includes("rosemary")) return { ...speciesProfiles.rosemary, key };
    if (key.includes("sunflower")) return { ...speciesProfiles.sunflower, key };
    if (key.includes("lavender")) return { ...speciesProfiles.lavender, key };
    if (key.includes("blue-lotus")) return { ...speciesProfiles["blue-lotus"], key };
    if (key.includes("lotus") || key.includes("water-lily")) return { ...speciesProfiles.lotus, key };
    if (key.includes("white-tulip")) return { ...speciesProfiles["white-tulip"], key };
    if (key.includes("tulip")) return { ...speciesProfiles.tulip, key };
    if (key.includes("olive")) return { ...speciesProfiles["olive-leaf"], key };
    if (key.includes("chamomile") || key.includes("feverfew")) return { ...speciesProfiles.chamomile, key };
    if (key.includes("daffodil") || key.includes("jonquil")) return { ...speciesProfiles.daffodil, key };
    if (key.includes("crocus")) return { ...speciesProfiles.crocus, key };
    if (key.includes("jasmine")) return { ...speciesProfiles.jasmine, key };
    if (key.includes("gladiolus")) return { ...speciesProfiles.gladiolus, key };
    if (key.includes("zinnia")) return { ...speciesProfiles.zinnia, key };
    if (key.includes("cherry")) return { ...speciesProfiles["cherry-blossom"], key };
    if (key.includes("marigold") || key.includes("calendula")) return { ...speciesProfiles.marigold, key };
    if (key.includes("dahlia")) return { ...speciesProfiles.dahlia, key };
    if (key.includes("rose")) return { ...speciesProfiles.rose, key };
    if (key.includes("daisy") || key.includes("aster") || key.includes("cosmos")) return { ...speciesProfiles.daisy, key };
    if (key.includes("lily") || key.includes("calla")) return { ...speciesProfiles.lily, key };

    return generatedProfile(name, key);
  }

  function generatedProfile(name, key) {
    const hash = hashString(name);
    const palette = generatedPalettes[hash % generatedPalettes.length];
    return {
      key,
      template: "generated",
      family: generatedTemplates[hash % generatedTemplates.length],
      primary: palette[0],
      secondary: palette[1],
      leaf: palette[2],
      accent: generatedPalettes[(hash + 3) % generatedPalettes.length][0],
      petalCount: 7 + (hash % 10)
    };
  }

  function normalizeSpeciesName(name) {
    return String(name)
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function hashString(value) {
    return [...String(value)].reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) >>> 0, 0);
  }

  function svgFromMarkup(markup, label) {
    const template = doc.createElement("template");
    template.innerHTML = markup.trim();
    const svg = template.content.firstElementChild;
    svg.classList.add("botanical-svg");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", label);
    return svg;
  }

  function flowerMarkup(profile, name) {
    const templates = {
      lavender: lavenderSvg,
      sunflower: sunflowerSvg,
      lily: lilySvg,
      daisy: daisySvg,
      bluebell: bluebellSvg,
      rosemary: rosemarySvg,
      forgetMeNot: forgetMeNotSvg,
      rose: roseSvg,
      tulip: tulipSvg,
      olive: oliveSvg,
      chamomile: chamomileSvg,
      daffodil: daffodilSvg,
      crocus: crocusSvg,
      lotus: lotusSvg,
      jasmine: jasmineSvg,
      lilyOfValley: lilyOfValleySvg,
      gladiolus: gladiolusSvg,
      zinnia: zinniaSvg,
      cherryBlossom: cherryBlossomSvg,
      marigold: marigoldSvg,
      dahlia: dahliaSvg,
      generated: generatedSvg
    };

    const renderer = templates[profile.template] || generatedSvg;
    return baseSvg(name, renderer(profile));
  }

  function baseSvg(label, body) {
    return `
      <svg viewBox="0 0 180 220" xmlns="http://www.w3.org/2000/svg" focusable="false">
        <title>${escapeHtml(label)}</title>
        <g class="plant-sway">${body}</g>
      </svg>
    `;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function petalRing(cx, cy, count, radius, rx, ry, fill, stroke, start) {
    return Array.from({ length: count }, (_, index) => {
      const angle = start + (360 / count) * index;
      return `<ellipse cx="${cx}" cy="${cy - radius}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${stroke}" stroke-width="1" transform="rotate(${angle} ${cx} ${cy})"/>`;
    }).join("");
  }

  function pointedPetalRing(cx, cy, count, radius, width, height, fill, stroke, start) {
    return Array.from({ length: count }, (_, index) => {
      const angle = start + (360 / count) * index;
      const top = cy - radius - height;
      const bottom = cy - radius + height * 0.2;
      return `<path d="M${cx} ${top} C${cx - width} ${cy - radius - height * 0.35} ${cx - width} ${bottom} ${cx} ${bottom} C${cx + width} ${bottom} ${cx + width} ${cy - radius - height * 0.35} ${cx} ${top}Z" fill="${fill}" stroke="${stroke}" stroke-width="1" transform="rotate(${angle} ${cx} ${cy})"/>`;
    }).join("");
  }

  function fivePetal(cx, cy, size, fill, center) {
    return `
      ${petalRing(cx, cy, 5, size * 0.55, size * 0.32, size * 0.72, fill, "rgba(53,68,82,0.18)", -18)}
      <circle cx="${cx}" cy="${cy}" r="${size * 0.28}" fill="${center}"/>
    `;
  }

  function leafPair(cx, y, color) {
    return `
      <path d="M${cx} ${y} C${cx - 44} ${y - 20} ${cx - 58} ${y + 20} ${cx - 12} ${y + 18}" fill="${color}" opacity="0.92"/>
      <path d="M${cx} ${y + 12} C${cx + 44} ${y - 10} ${cx + 58} ${y + 30} ${cx + 12} ${y + 26}" fill="${color}" opacity="0.82"/>
    `;
  }

  function lavenderSvg(profile) {
    const spike = (x, top, lean, color) => `
      <path d="M${x} 196 C${x - lean * 0.7} 140 ${x - lean} 86 ${x - lean * 1.5} ${top}" fill="none" stroke="${profile.leaf}" stroke-width="5" stroke-linecap="round"/>
      ${Array.from({ length: 7 }, (_, index) => {
        const cy = top + index * 18;
        const cx = x - lean * 1.5 + (index % 2 === 0 ? -7 : 7);
        return `<ellipse cx="${cx}" cy="${cy}" rx="8" ry="14" fill="${index % 2 ? profile.primary : color}" transform="rotate(${lean * 1.7} ${cx} ${cy})"/>`;
      }).join("")}
    `;
    return `
      ${leafPair(92, 172, "#7fa77a")}
      ${spike(82, 32, 16, profile.secondary)}
      ${spike(112, 42, -6, profile.primary)}
      ${spike(99, 22, 4, profile.secondary)}
    `;
  }

  function sunflowerSvg(profile) {
    return `
      <path d="M91 198 C88 158 92 125 91 86" fill="none" stroke="${profile.leaf}" stroke-width="9" stroke-linecap="round"/>
      ${leafPair(91, 164, "#6fa35f")}
      ${petalRing(91, 72, 22, 34, 11, 26, profile.secondary, "#c68a24", -6)}
      ${petalRing(91, 72, 22, 27, 9, 22, profile.primary, "#c68a24", 3)}
      <circle cx="91" cy="72" r="29" fill="#714622"/>
      <circle cx="91" cy="72" r="20" fill="#966230"/>
      ${Array.from({ length: 18 }, (_, index) => {
        const angle = (Math.PI * 2 * index) / 18;
        const x = 91 + Math.cos(angle) * (7 + (index % 3) * 4);
        const y = 72 + Math.sin(angle) * (7 + (index % 3) * 4);
        return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.2" fill="#57351c"/>`;
      }).join("")}
    `;
  }

  function lilySvg(profile) {
    return `
      <path d="M90 199 C88 152 89 121 91 88" fill="none" stroke="${profile.leaf}" stroke-width="7" stroke-linecap="round"/>
      ${leafPair(90, 166, profile.leaf)}
      <g transform="translate(0 4)">
        <path d="M91 90 C56 62 54 31 84 56 C89 63 91 75 91 90Z" fill="${profile.primary}" stroke="#cbd8c7"/>
        <path d="M91 90 C126 61 127 31 98 56 C92 64 90 76 91 90Z" fill="${profile.primary}" stroke="#cbd8c7"/>
        <path d="M91 91 C69 58 78 30 92 56 C96 69 96 81 91 91Z" fill="${profile.secondary}" stroke="#cbd8c7"/>
        <path d="M91 91 C112 58 104 30 90 56 C86 69 87 82 91 91Z" fill="${profile.secondary}" stroke="#cbd8c7"/>
        <path d="M91 94 C58 92 38 64 73 68 C86 72 91 83 91 94Z" fill="${profile.primary}" stroke="#cbd8c7"/>
        <path d="M91 94 C124 92 143 64 108 68 C96 72 90 83 91 94Z" fill="${profile.primary}" stroke="#cbd8c7"/>
        <path d="M91 92 C88 77 89 64 91 50" fill="none" stroke="#d59a69" stroke-width="2"/>
        <path d="M83 91 C80 77 78 65 74 54" fill="none" stroke="#d59a69" stroke-width="2"/>
        <path d="M99 91 C103 77 105 65 108 54" fill="none" stroke="#d59a69" stroke-width="2"/>
        <circle cx="91" cy="50" r="3" fill="${profile.accent}"/>
        <circle cx="74" cy="54" r="3" fill="${profile.accent}"/>
        <circle cx="108" cy="54" r="3" fill="${profile.accent}"/>
      </g>
    `;
  }

  function daisySvg(profile) {
    return `
      <path d="M90 198 C88 155 89 122 91 87" fill="none" stroke="${profile.leaf}" stroke-width="6" stroke-linecap="round"/>
      ${leafPair(90, 168, "#6fa36b")}
      ${petalRing(91, 76, 18, 28, 7, 24, profile.primary, "#dfe9e4", 0)}
      ${petalRing(91, 76, 18, 23, 6, 20, profile.secondary, "#dfe9e4", 10)}
      <circle cx="91" cy="76" r="20" fill="${profile.accent}"/>
      <circle cx="84" cy="69" r="3" fill="#ffe083"/>
      <circle cx="97" cy="72" r="3" fill="#c88728"/>
      <circle cx="90" cy="82" r="3" fill="#f2c35b"/>
    `;
  }

  function bluebellSvg(profile) {
    const bell = (x, y, rotate) => `
      <g transform="rotate(${rotate} ${x} ${y})">
        <path d="M${x - 12} ${y - 5} C${x - 17} ${y + 12} ${x - 8} ${y + 24} ${x} ${y + 24} C${x + 8} ${y + 24} ${x + 17} ${y + 12} ${x + 12} ${y - 5} C${x + 6} ${y - 13} ${x - 6} ${y - 13} ${x - 12} ${y - 5}Z" fill="${profile.primary}" stroke="#4364a8"/>
        <path d="M${x - 10} ${y + 17} C${x - 6} ${y + 12} ${x - 3} ${y + 12} ${x} ${y + 18} C${x + 3} ${y + 12} ${x + 6} ${y + 12} ${x + 10} ${y + 17}" fill="none" stroke="${profile.secondary}" stroke-width="2"/>
      </g>
    `;
    return `
      <path d="M92 198 C92 138 119 98 78 47" fill="none" stroke="${profile.leaf}" stroke-width="6" stroke-linecap="round"/>
      <path d="M86 184 C48 154 43 119 85 146" fill="${profile.leaf}" opacity="0.86"/>
      <path d="M96 184 C134 154 140 120 100 146" fill="${profile.leaf}" opacity="0.7"/>
      ${bell(83, 58, -18)}
      ${bell(104, 75, 12)}
      ${bell(73, 91, -22)}
      ${bell(109, 111, 18)}
      ${bell(88, 128, -8)}
    `;
  }

  function rosemarySvg(profile) {
    const needles = Array.from({ length: 18 }, (_, index) => {
      const y = 48 + index * 7.6;
      const side = index % 2 === 0 ? -1 : 1;
      const x = 90 + side * 7;
      return `<ellipse cx="${x}" cy="${y}" rx="3.5" ry="16" fill="${profile.leaf}" transform="rotate(${side * 55} ${x} ${y})"/>`;
    }).join("");
    return `
      <path d="M92 199 C88 150 91 98 89 36" fill="none" stroke="#6f6950" stroke-width="6" stroke-linecap="round"/>
      <path d="M91 118 C67 88 62 65 78 43" fill="none" stroke="#6f6950" stroke-width="4" stroke-linecap="round"/>
      <path d="M91 145 C119 114 125 89 106 62" fill="none" stroke="#6f6950" stroke-width="4" stroke-linecap="round"/>
      ${needles}
      ${fivePetal(72, 74, 8, profile.secondary, "#f4e7a5")}
      ${fivePetal(111, 92, 7, profile.secondary, "#f4e7a5")}
      ${fivePetal(82, 132, 6, profile.secondary, "#f4e7a5")}
    `;
  }

  function forgetMeNotSvg(profile) {
    return `
      <path d="M91 199 C86 151 91 119 88 92" fill="none" stroke="${profile.leaf}" stroke-width="5" stroke-linecap="round"/>
      <path d="M89 128 C66 105 55 83 45 58" fill="none" stroke="${profile.leaf}" stroke-width="3" stroke-linecap="round"/>
      <path d="M90 119 C119 101 130 78 135 52" fill="none" stroke="${profile.leaf}" stroke-width="3" stroke-linecap="round"/>
      ${leafPair(90, 169, "#72a178")}
      ${fivePetal(45, 58, 11, profile.secondary, profile.accent)}
      ${fivePetal(64, 80, 10, profile.primary, profile.accent)}
      ${fivePetal(136, 52, 11, profile.primary, profile.accent)}
      ${fivePetal(121, 78, 9, profile.secondary, profile.accent)}
      ${fivePetal(88, 95, 10, profile.primary, profile.accent)}
    `;
  }

  function roseSvg(profile) {
    return `
      <path d="M91 199 C91 152 91 112 91 78" fill="none" stroke="${profile.leaf}" stroke-width="7" stroke-linecap="round"/>
      <path d="M92 146 L105 137 L96 153" fill="none" stroke="#315f42" stroke-width="3" stroke-linecap="round"/>
      <path d="M90 165 L76 156 L84 174" fill="none" stroke="#315f42" stroke-width="3" stroke-linecap="round"/>
      ${leafPair(91, 170, "#5f9a68")}
      <path d="M91 86 C50 79 53 39 88 51 C82 31 119 32 112 56 C145 48 140 88 106 89 C102 109 75 109 91 86Z" fill="${profile.secondary}" stroke="#b94f63"/>
      <path d="M91 84 C70 78 72 57 90 62 C87 50 107 51 103 66 C119 64 119 84 101 84 C99 96 82 96 91 84Z" fill="${profile.primary}" stroke="#a84859"/>
      <path d="M88 78 C95 65 111 73 101 86 C92 96 76 88 88 78Z" fill="#b94f63"/>
    `;
  }

  function tulipSvg(profile) {
    return `
      <path d="M90 199 C88 157 89 121 90 82" fill="none" stroke="${profile.leaf}" stroke-width="8" stroke-linecap="round"/>
      <path d="M88 184 C42 147 50 104 88 139" fill="${profile.leaf}" opacity="0.9"/>
      <path d="M94 181 C139 146 131 106 96 139" fill="${profile.leaf}" opacity="0.74"/>
      <path d="M91 94 C54 80 59 39 78 53 C81 25 102 25 105 53 C126 39 130 80 91 94Z" fill="${profile.primary}" stroke="#b85b70"/>
      <path d="M90 95 C74 73 79 50 90 37 C103 51 109 75 90 95Z" fill="${profile.secondary}" stroke="#b85b70"/>
      <path d="M89 95 C67 77 61 57 77 53" fill="none" stroke="rgba(120,70,80,0.32)" stroke-width="2"/>
      <path d="M92 95 C115 77 119 57 104 53" fill="none" stroke="rgba(120,70,80,0.32)" stroke-width="2"/>
    `;
  }

  function oliveSvg(profile) {
    const leaves = Array.from({ length: 9 }, (_, index) => {
      const y = 54 + index * 15;
      const side = index % 2 === 0 ? -1 : 1;
      const x = 90 + side * 20;
      return `<ellipse cx="${x}" cy="${y}" rx="8" ry="24" fill="${index % 2 ? profile.primary : profile.secondary}" transform="rotate(${side * 62} ${x} ${y})"/>`;
    }).join("");
    return `
      <path d="M91 198 C84 143 94 96 86 34" fill="none" stroke="#6f6950" stroke-width="6" stroke-linecap="round"/>
      ${leaves}
      <circle cx="78" cy="91" r="5" fill="#5b6741"/>
      <circle cx="105" cy="121" r="5" fill="#5b6741"/>
      <circle cx="78" cy="151" r="4.5" fill="#5b6741"/>
    `;
  }

  function chamomileSvg(profile) {
    return `
      <path d="M91 199 C88 158 90 120 91 84" fill="none" stroke="${profile.leaf}" stroke-width="5" stroke-linecap="round"/>
      <path d="M84 160 C63 139 56 119 64 96" fill="none" stroke="${profile.leaf}" stroke-width="2"/>
      <path d="M98 164 C121 143 128 119 118 98" fill="none" stroke="${profile.leaf}" stroke-width="2"/>
      ${petalRing(91, 78, 18, 22, 5, 19, profile.primary, "#e3e7dc", 0)}
      <circle cx="91" cy="78" r="15" fill="${profile.accent}"/>
      <path d="M65 112 L50 101 M65 112 L47 117 M65 112 L52 129" stroke="${profile.leaf}" stroke-width="2" stroke-linecap="round"/>
      <path d="M116 112 L134 101 M116 112 L137 117 M116 112 L128 129" stroke="${profile.leaf}" stroke-width="2" stroke-linecap="round"/>
    `;
  }

  function daffodilSvg(profile) {
    return `
      <path d="M90 199 C87 153 88 119 91 84" fill="none" stroke="${profile.leaf}" stroke-width="7" stroke-linecap="round"/>
      ${leafPair(90, 170, "#6fa35f")}
      ${petalRing(91, 78, 6, 28, 15, 31, profile.primary, "#d59c25", 30)}
      <path d="M72 78 C75 57 107 57 110 78 C108 99 74 99 72 78Z" fill="${profile.secondary}" stroke="#bd7b25"/>
      <ellipse cx="91" cy="78" rx="17" ry="12" fill="#f7c152" stroke="#bd7b25"/>
    `;
  }

  function crocusSvg(profile) {
    return `
      <path d="M83 199 C72 158 76 126 86 102" fill="none" stroke="${profile.leaf}" stroke-width="5" stroke-linecap="round"/>
      <path d="M97 199 C111 160 106 126 94 102" fill="none" stroke="${profile.leaf}" stroke-width="5" stroke-linecap="round"/>
      <path d="M91 105 C56 88 61 49 87 73 C88 47 99 47 103 73 C130 49 126 88 91 105Z" fill="${profile.primary}" stroke="#6f56aa"/>
      <path d="M91 108 C74 87 78 66 91 49 C103 66 109 87 91 108Z" fill="${profile.secondary}" stroke="#6f56aa"/>
      <path d="M82 183 C49 150 55 116 84 145" fill="${profile.leaf}" opacity="0.9"/>
      <path d="M100 183 C132 151 126 117 99 145" fill="${profile.leaf}" opacity="0.75"/>
    `;
  }

  function lotusSvg(profile) {
    return `
      <ellipse cx="91" cy="196" rx="62" ry="15" fill="${profile.leaf}" opacity="0.42"/>
      <path d="M45 193 C66 177 82 177 91 193 C70 204 54 204 45 193Z" fill="${profile.leaf}" opacity="0.7"/>
      <path d="M137 193 C116 177 100 177 91 193 C113 204 128 204 137 193Z" fill="${profile.leaf}" opacity="0.62"/>
      ${pointedPetalRing(91, 116, 8, 24, 12, 38, profile.secondary, "#b85887", 0)}
      ${pointedPetalRing(91, 112, 8, 16, 10, 34, profile.primary, "#b85887", 22)}
      ${pointedPetalRing(91, 111, 6, 8, 8, 28, "#fff4db", "#d3a647", 30)}
      <circle cx="91" cy="114" r="9" fill="#e0b33c"/>
    `;
  }

  function jasmineSvg(profile) {
    return `
      <path d="M91 199 C88 149 90 112 90 76" fill="none" stroke="${profile.leaf}" stroke-width="5" stroke-linecap="round"/>
      <path d="M90 123 C64 96 57 75 51 49" fill="none" stroke="${profile.leaf}" stroke-width="3" stroke-linecap="round"/>
      <path d="M91 130 C121 105 127 82 132 58" fill="none" stroke="${profile.leaf}" stroke-width="3" stroke-linecap="round"/>
      ${leafPair(90, 168, "#66a06a")}
      ${petalRing(52, 49, 6, 12, 6, 18, profile.primary, "#d9dcc8", 30)}<circle cx="52" cy="49" r="5" fill="#e7c257"/>
      ${petalRing(132, 58, 6, 12, 6, 18, profile.primary, "#d9dcc8", 0)}<circle cx="132" cy="58" r="5" fill="#e7c257"/>
      ${petalRing(91, 78, 6, 13, 6, 19, profile.primary, "#d9dcc8", 15)}<circle cx="91" cy="78" r="5" fill="#e7c257"/>
    `;
  }

  function lilyOfValleySvg(profile) {
    const bell = (x, y) => `
      <path d="M${x - 10} ${y - 8} C${x - 17} ${y + 5} ${x - 9} ${y + 20} ${x} ${y + 20} C${x + 9} ${y + 20} ${x + 17} ${y + 5} ${x + 10} ${y - 8} C${x + 4} ${y - 13} ${x - 4} ${y - 13} ${x - 10} ${y - 8}Z" fill="${profile.primary}" stroke="#cfd7c8"/>
    `;
    return `
      <path d="M90 199 C104 143 110 91 74 51" fill="none" stroke="${profile.leaf}" stroke-width="5" stroke-linecap="round"/>
      <path d="M82 190 C36 147 43 91 83 133" fill="${profile.leaf}" opacity="0.9"/>
      <path d="M98 190 C137 150 132 100 100 134" fill="${profile.leaf}" opacity="0.7"/>
      ${bell(82, 62)}
      ${bell(102, 85)}
      ${bell(89, 108)}
      ${bell(106, 131)}
    `;
  }

  function gladiolusSvg(profile) {
    const bloom = (x, y, flip) => `
      <g transform="scale(${flip} 1) translate(${flip === -1 ? -180 : 0} 0)">
        <path d="M${x} ${y} C${x - 26} ${y - 24} ${x - 14} ${y - 52} ${x + 10} ${y - 30} C${x + 40} ${y - 39} ${x + 43} ${y + 3} ${x + 8} ${y + 9} C${x - 11} ${y + 17} ${x - 21} ${y + 7} ${x} ${y}Z" fill="${profile.primary}" stroke="#b85b70"/>
        <path d="M${x + 6} ${y - 4} C${x - 4} ${y - 21} ${x + 14} ${y - 32} ${x + 24} ${y - 12}" fill="${profile.secondary}" opacity="0.7"/>
      </g>
    `;
    return `
      <path d="M91 199 C88 139 91 82 89 31" fill="none" stroke="${profile.leaf}" stroke-width="7" stroke-linecap="round"/>
      <path d="M83 190 C48 154 49 117 84 146" fill="${profile.leaf}" opacity="0.8"/>
      <path d="M98 184 C135 148 131 111 100 143" fill="${profile.leaf}" opacity="0.65"/>
      ${bloom(91, 62, 1)}
      ${bloom(85, 91, -1)}
      ${bloom(92, 120, 1)}
      ${bloom(86, 150, -1)}
    `;
  }

  function zinniaSvg(profile) {
    return `
      <path d="M91 199 C89 153 91 119 91 83" fill="none" stroke="${profile.leaf}" stroke-width="6" stroke-linecap="round"/>
      ${leafPair(91, 168, "#6f9f71")}
      ${pointedPetalRing(91, 76, 18, 30, 9, 28, profile.primary, "#b84f67", 0)}
      ${pointedPetalRing(91, 76, 14, 22, 8, 23, profile.secondary, "#c98b2a", 13)}
      ${pointedPetalRing(91, 76, 10, 14, 7, 18, "#f5d16d", "#c98b2a", 0)}
      <circle cx="91" cy="76" r="10" fill="#9b6530"/>
    `;
  }

  function cherryBlossomSvg(profile) {
    return `
      <path d="M39 160 C75 126 111 85 141 36" fill="none" stroke="#7b5a44" stroke-width="8" stroke-linecap="round"/>
      <path d="M70 130 C63 101 48 79 36 58" fill="none" stroke="#7b5a44" stroke-width="4" stroke-linecap="round"/>
      <path d="M103 93 C126 89 139 75 151 58" fill="none" stroke="#7b5a44" stroke-width="4" stroke-linecap="round"/>
      ${fivePetal(38, 58, 13, profile.secondary, "#d89b50")}
      ${fivePetal(72, 128, 14, profile.primary, "#d89b50")}
      ${fivePetal(119, 75, 13, profile.secondary, "#d89b50")}
      ${fivePetal(143, 39, 12, profile.primary, "#d89b50")}
    `;
  }

  function marigoldSvg(profile) {
    return `
      <path d="M91 199 C88 153 90 119 91 86" fill="none" stroke="${profile.leaf}" stroke-width="7" stroke-linecap="round"/>
      ${leafPair(91, 168, "#688f4e")}
      ${petalRing(91, 78, 18, 27, 12, 20, profile.secondary, "#a84f24", 0)}
      ${petalRing(91, 78, 16, 20, 10, 18, profile.primary, "#a84f24", 12)}
      ${petalRing(91, 78, 12, 12, 8, 13, "#ffd35f", "#bd7b25", 0)}
      <circle cx="91" cy="78" r="11" fill="#c9632d"/>
    `;
  }

  function dahliaSvg(profile) {
    return `
      <path d="M91 199 C89 153 91 119 91 84" fill="none" stroke="${profile.leaf}" stroke-width="7" stroke-linecap="round"/>
      ${leafPair(91, 169, "#6c9a66")}
      ${pointedPetalRing(91, 78, 24, 31, 8, 30, profile.secondary, "#a74d78", 0)}
      ${pointedPetalRing(91, 78, 18, 22, 8, 24, profile.primary, "#a74d78", 10)}
      ${pointedPetalRing(91, 78, 12, 13, 7, 18, "#f2bfd5", "#a74d78", 0)}
      <circle cx="91" cy="78" r="8" fill="#d89b50"/>
    `;
  }

  function generatedSvg(profile) {
    if (profile.family === "bell") {
      return bluebellSvg({ ...profile, template: "bluebell" });
    }
    if (profile.family === "spike") {
      return lavenderSvg({ ...profile, template: "lavender" });
    }
    if (profile.family === "cup") {
      return tulipSvg({ ...profile, template: "tulip" });
    }
    if (profile.family === "cluster") {
      return forgetMeNotSvg({ ...profile, template: "forgetMeNot", accent: "#f0cc45" });
    }
    if (profile.family === "pom") {
      return marigoldSvg({ ...profile, template: "marigold" });
    }
    if (profile.family === "star") {
      return jasmineSvg({ ...profile, template: "jasmine" });
    }

    return `
      <path d="M91 199 C89 154 91 119 91 84" fill="none" stroke="${profile.leaf}" stroke-width="6" stroke-linecap="round"/>
      ${leafPair(91, 169, profile.leaf)}
      ${petalRing(91, 78, profile.petalCount, 27, 8, 23, profile.secondary, "rgba(52,64,54,0.22)", 0)}
      ${petalRing(91, 78, Math.max(6, profile.petalCount - 4), 20, 7, 19, profile.primary, "rgba(52,64,54,0.2)", 12)}
      <circle cx="91" cy="78" r="15" fill="${profile.accent}"/>
    `;
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", setup, {once: true});
  } else {
    setup();
  }
})();
