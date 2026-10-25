/**
 * Perchboard ASCII sharks.
 *
 * Side-profile sharks drawn as monospace glyphs on a transparent canvas, so they
 * read as sharks at a glance: pointed snout, tall swept-back dorsal fin, pectoral
 * fin, crescent tail with a longer upper lobe, eye, gill slits and countershading
 * (dark back, pale belly). They cruise across the page, bob gently, sweep their
 * tails, leave a cyan wake and shy away from the pointer.
 *
 * Usage:
 *   const sea = new AsciiSharks(canvas, [{ kind: 'great', size: 1.1 }, { kind: 'reef', size: 0.8 }]);
 *   sea.destroy();
 */
(function () {
  'use strict';

  const TAU = Math.PI * 2;
  const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);
  const rand = (lo, hi) => lo + Math.random() * (hi - lo);

  function hash3(x, y, z) {
    let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(z | 0, 1442695041);
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  }

  function inPoly(x, y, pts) {
    let inside = false;
    for (let i = 0, j = pts.length - 2; i < pts.length; j = i, i += 2) {
      const xi = pts[i], yi = pts[i + 1], xj = pts[j], yj = pts[j + 1];
      if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  }

  // Shark profiles in body units: u runs 0 (snout) → 1 (tail tip), v is vertical
  // (negative = up), both as a fraction of body length. Fins are polygons.
  const PEDUNCLE = 0.8;
  const KINDS = {
    // Great white: heavy torpedo body, big triangular dorsal, deep crescent tail.
    great: {
      depth: 0.13,
      thickest: 0.36,
      dorsal: [0.34, -0.09, 0.46, -0.27, 0.47, -0.275, 0.462, -0.19, 0.53, -0.08],
      pectoral: [0.24, 0.085, 0.39, 0.24, 0.415, 0.25, 0.355, 0.105],
      pelvic: [0.6, 0.045, 0.655, 0.105, 0.675, 0.04],
      dorsal2: [0.705, -0.03, 0.735, -0.075, 0.75, -0.025],
      anal: [0.725, 0.025, 0.765, 0.07, 0.78, 0.022],
      caudal: [0.78, -0.022, 0.9, -0.14, 1.0, -0.27, 0.958, -0.15, 0.925, -0.012, 0.965, 0.16, 0.918, 0.11, 0.86, 0.03, 0.78, 0.022],
      eye: [0.085, -0.03],
      gills: [0.2, 0.235, 0.27],
    },
    // Reef shark: slimmer, longer snout, tall falcate dorsal, longer upper tail lobe.
    reef: {
      depth: 0.11,
      thickest: 0.34,
      dorsal: [0.33, -0.08, 0.43, -0.24, 0.455, -0.255, 0.445, -0.17, 0.5, -0.07],
      pectoral: [0.23, 0.06, 0.39, 0.23, 0.41, 0.24, 0.34, 0.08],
      pelvic: [0.59, 0.04, 0.64, 0.095, 0.66, 0.035],
      dorsal2: [0.7, -0.026, 0.73, -0.065, 0.745, -0.022],
      anal: [0.72, 0.022, 0.755, 0.06, 0.77, 0.02],
      caudal: [0.78, -0.02, 0.9, -0.14, 1.0, -0.3, 0.955, -0.15, 0.92, -0.01, 0.95, 0.13, 0.905, 0.09, 0.85, 0.025, 0.78, 0.02],
      eye: [0.08, -0.024],
      gills: [0.19, 0.225, 0.26],
    },
  };

  // Half-depth of the trunk at u: rounded conical snout, thickest just ahead of
  // the dorsal fin, tapering to a slim caudal peduncle.
  function halfDepth(shape, u) {
    const d = shape.depth;
    const t = shape.thickest;
    if (u <= 0 || u > PEDUNCLE + 0.02) return 0;
    if (u < t) return d * Math.pow(u / t, 0.55);
    const k = clamp((u - t) / (PEDUNCLE - t), 0, 1);
    return 0.02 + (d - 0.02) * Math.pow(1 - k, 1.35);
  }
  // The back arches a little more than the belly sags; the snout sits slightly high.
  const backBias = (u) => -0.012 * Math.sin(Math.min(1, u / PEDUNCLE) * Math.PI);

  const PARTS = { NONE: 0, BACK: 1, BELLY: 2, FIN: 3, PEC: 4 };

  function classify(shape, u, v) {
    if (u < -0.01 || u > 1.02) return PARTS.NONE;
    const h = halfDepth(shape, u);
    if (h > 0) {
      const c = backBias(u);
      const top = c - h * 1.05;
      const bot = c + h * 0.92;
      if (v >= top && v <= bot) {
        // Countershading line runs a little below the midline, rising toward the tail.
        return v < c + h * (0.2 - 0.25 * u) ? PARTS.BACK : PARTS.BELLY;
      }
    }
    if (inPoly(u, v, shape.dorsal) || inPoly(u, v, shape.caudal) || inPoly(u, v, shape.dorsal2)) return PARTS.FIN;
    if (inPoly(u, v, shape.pectoral) || inPoly(u, v, shape.pelvic) || inPoly(u, v, shape.anal)) return PARTS.PEC;
    return PARTS.NONE;
  }

  const SUB = [0.5, 0.5, 0.22, 0.25, 0.78, 0.25, 0.22, 0.75, 0.78, 0.75];
  const BACK_GLYPHS = '#%@8&#%';
  const BACK_LIGHT = '*+=#';
  const BELLY_GLYPHS = ':;+=:;';
  const FIN_GLYPHS = '#%@#';
  const PEC_GLYPHS = '%#*+';
  const EDGE_GLYPHS = ".,'`";

  function palette(dark) {
    return dark
      ? {
          back: (a) => `rgba(125,211,252,${a})`,
          belly: (a) => `rgba(186,230,253,${a * 0.75})`,
          fin: (a) => `rgba(56,189,248,${a})`,
          edge: (a) => `rgba(56,189,248,${a * 0.6})`,
          eye: '#F8FAFC',
          wake: (a) => `rgba(56,189,248,${a})`,
        }
      : {
          back: (a) => `rgba(15,42,82,${a})`,
          belly: (a) => `rgba(2,132,199,${a * 0.62})`,
          fin: (a) => `rgba(12,52,96,${a})`,
          edge: (a) => `rgba(2,132,199,${a * 0.45})`,
          eye: '#020617',
          wake: (a) => `rgba(2,132,199,${a})`,
        };
  }

  class AsciiSharks {
    constructor(canvas, specs, opts) {
      this.canvas = canvas;
      this.opts = Object.assign({ opacity: 0.8, speed: 1, interactive: true, cellSize: 0 }, opts || {});
      this.specs = specs && specs.length ? specs : [{ kind: 'great', size: 1 }, { kind: 'reef', size: 0.75 }];
      this.ctx = canvas.getContext('2d', { alpha: true });
      this.sharks = [];
      this.pointer = { x: -1e4, y: -1e4, active: false };
      this.time = 0;
      this.raf = 0;
      this.disposed = false;
      this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

      this.frame = (now) => {
        const dt = Math.min(0.05, (now - this.last) / 1000);
        this.last = now;
        this.step(dt * this.opts.speed);
        this.draw();
        this.raf = requestAnimationFrame(this.frame);
      };
      this.onResize = () => this.resize();
      this.onPointer = (e) => {
        const r = this.canvas.getBoundingClientRect();
        this.pointer.x = e.clientX - r.left;
        this.pointer.y = e.clientY - r.top;
        this.pointer.active = true;
      };
      this.onLeave = () => { this.pointer.active = false; };
      this.onVisibility = () => (document.hidden ? cancelAnimationFrame(this.raf) : this.start());

      this.resizeObserver = new ResizeObserver(this.onResize);
      this.resizeObserver.observe(canvas);
      if (this.opts.interactive) {
        window.addEventListener('pointermove', this.onPointer, { passive: true });
        document.documentElement.addEventListener('pointerleave', this.onLeave);
      }
      document.addEventListener('visibilitychange', this.onVisibility);
      this.resize();
      this.start();
    }

    resize() {
      const rect = this.canvas.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.W = rect.width;
      this.H = rect.height;
      this.dpr = dpr;
      this.canvas.width = Math.round(this.W * dpr);
      this.canvas.height = Math.round(this.H * dpr);
      this.cw = this.opts.cellSize > 0 ? this.opts.cellSize : clamp(Math.round(this.W / 170), 6, 10);
      this.ch = Math.round(this.cw * 1.5);
      this.cols = Math.ceil(this.W / this.cw);
      this.rows = Math.ceil(this.H / this.ch);
      this.wake = new Float32Array(this.cols * this.rows);
      this.wakeTmp = new Float32Array(this.cols * this.rows);
      this.cell = new Int32Array(this.cols * this.rows);
      const family = getComputedStyle(this.canvas).fontFamily || 'ui-monospace, monospace';
      this.font = `700 ${Math.round(this.ch * 0.86)}px ${family}`;
      const first = !this.sharks.length;
      if (first) this.seed();
      if (this.reduced.matches) this.draw();
    }

    seed() {
      const base = clamp(this.W * 0.3, 220, 520);
      this.sharks = this.specs.map((spec, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        return {
          shape: KINDS[spec.kind] || KINDS.great,
          L: base * (spec.size || 1),
          depth: clamp(spec.size || 1, 0.6, 1.2),
          dir,
          x: this.W * (dir > 0 ? rand(0.15, 0.45) : rand(0.55, 0.9)),
          y: this.H * (i % 2 === 0 ? rand(0.22, 0.4) : rand(0.6, 0.78)),
          targetY: 0,
          vy: 0,
          speed: rand(46, 62),
          boost: 0,
          phase: rand(0, TAU),
          id: i + 1,
        };
      });
      this.sharks.forEach((s) => (s.targetY = s.y));
    }

    start() {
      cancelAnimationFrame(this.raf);
      if (this.disposed || document.hidden) return;
      if (this.reduced.matches) {
        this.draw();
        return;
      }
      this.last = performance.now();
      this.raf = requestAnimationFrame(this.frame);
    }

    step(dt) {
      this.time += dt;
      const { W, H } = this;
      for (const s of this.sharks) {
        const L = s.L;
        // Startle: the pointer near the head makes the shark kick and veer.
        if (this.pointer.active) {
          const hx = s.x - s.dir * L * 0.3;
          const dx = this.pointer.x - hx;
          const dy = this.pointer.y - s.y;
          const d = Math.hypot(dx, dy);
          if (d < L * 0.55) {
            s.boost = Math.min(1, s.boost + dt * 3);
            s.targetY = clamp(s.y - Math.sign(dy || 1) * L * 0.5, H * 0.1, H * 0.9);
          }
        }
        s.boost = Math.max(0, s.boost - dt * 0.6);
        const v = s.speed * (1 + s.boost * 1.6) * (0.75 + 0.25 * s.depth);
        s.x += s.dir * v * dt;
        // Gentle glide toward a cruising depth, plus a slow bob.
        if (Math.abs(s.targetY - s.y) < 6 && Math.random() < dt * 0.15) {
          s.targetY = clamp(s.y + rand(-0.25, 0.25) * H, H * 0.12, H * 0.88);
        }
        s.vy += ((s.targetY - s.y) * 0.25 - s.vy) * Math.min(1, dt * 0.9);
        s.y += s.vy * dt + Math.sin(this.time * 0.7 + s.id) * 6 * dt;
        s.phase += dt * (3.2 + s.boost * 5);
        // Off one side → reappear on the other, maybe turned around, at a new depth.
        const margin = L * 1.1;
        if ((s.dir > 0 && s.x - L > W + 20) || (s.dir < 0 && s.x + L < -20)) {
          s.dir = Math.random() < 0.6 ? -s.dir : s.dir;
          s.x = s.dir > 0 ? -margin * 0.1 : W + margin * 0.1;
          s.y = s.targetY = rand(0.15, 0.85) * H;
          s.vy = 0;
        }
        // Wake: the tail stirs the water.
        const tailU = 0.9;
        const tx = s.x - s.dir * L * tailU;
        const ty = s.y + Math.sin(s.phase) * L * 0.02;
        this.stir(tx, ty, 0.16 + s.boost * 0.4);
              }
      this.diffuse(dt);
    }

    stir(x, y, amount) {
      const c = Math.floor(x / this.cw);
      const r = Math.floor(y / this.ch);
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -2; dc <= 2; dc++) {
          const cc = c + dc, rr = r + dr;
          if (cc < 0 || rr < 0 || cc >= this.cols || rr >= this.rows) continue;
          const i = rr * this.cols + cc;
          const fall = 1 - (Math.abs(dc) + Math.abs(dr)) / 4;
          this.wake[i] = Math.min(1.5, this.wake[i] + amount * fall * 0.3);
        }
      }
    }

    diffuse(dt) {
      const { cols, rows, wake, wakeTmp } = this;
      const decay = Math.exp(-dt * 1.8);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const l = c > 0 ? wake[i - 1] : wake[i];
          const rt = c < cols - 1 ? wake[i + 1] : wake[i];
          const u = r > 0 ? wake[i - cols] : wake[i];
          const d = r < rows - 1 ? wake[i + cols] : wake[i];
          wakeTmp[i] = (wake[i] * 4 + l + rt + u + d) * 0.125 * decay;
        }
      }
      this.wake = wakeTmp;
      this.wakeTmp = wake;
    }

    // World point → body units, undoing the swim motion.
    toBody(s, px, py) {
      let u = s.dir > 0 ? (s.x - px) / s.L : (px - s.x) / s.L;
      let v = (py - s.y) / s.L;
      // Lateral tail sweep seen side-on: the tail lobes foreshorten and spread.
      const sweep = Math.cos(s.phase);
      if (u > PEDUNCLE - 0.02) u = PEDUNCLE - 0.02 + (u - PEDUNCLE + 0.02) / (0.72 + 0.28 * Math.abs(sweep));
      // A soft travelling flex through the rear body.
      v -= 0.018 * Math.sin(s.phase - u * 4) * u * u;
      return [u, v];
    }

    draw() {
      const { ctx, cw, ch, cols, rows, dpr } = this;
      if (!ctx || !cols) return;
      const dark = document.documentElement.classList.contains('dark');
      const pal = palette(dark);
      const op = this.opts.opacity;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, this.W, this.H);
      ctx.font = this.font;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const tick = Math.floor(this.time * 2.2);
      const owner = this.cell;
      owner.fill(0);

      // Far (smaller) sharks first so the near one swims over them.
      const order = this.sharks.slice().sort((a, b) => a.depth - b.depth);
      for (const s of order) {
        const L = s.L;
        const shape = s.shape;
        const dim = (0.62 + 0.38 * s.depth) * op;
        const x0 = s.dir > 0 ? s.x - L * 1.02 : s.x - L * 0.02;
        const x1 = x0 + L * 1.05;
        const c0 = Math.max(0, Math.floor(x0 / cw));
        const c1 = Math.min(cols - 1, Math.floor(x1 / cw));
        const r0 = Math.max(0, Math.floor((s.y - L * 0.34) / ch));
        const r1 = Math.min(rows - 1, Math.floor((s.y + L * 0.3) / ch));
        for (let r = r0; r <= r1; r++) {
          for (let c = c0; c <= c1; c++) {
            const px = c * cw;
            const py = r * ch;
            let hits = 0;
            let part = PARTS.NONE;
            let cu = 0, cv = 0;
            for (let k = 0; k < SUB.length; k += 2) {
              const [u, v] = this.toBody(s, px + SUB[k] * cw, py + SUB[k + 1] * ch);
              const p = classify(shape, u, v);
              if (p) {
                hits++;
                if (k === 0 || !part) { part = p; cu = u; cv = v; }
              }
            }
            if (!hits) continue;
            const i = r * cols + c;
            owner[i] = s.id;
            const key = (hash3(Math.round(cu * 70), Math.round(cv * 70), s.id) * 4294967295) >>> 0;
            const shimmer = hash3(key, tick + (key % 7), 3) < 0.12;
            let glyph, color;
            if (hits <= 2) {
              glyph = EDGE_GLYPHS[(key >>> 5) % EDGE_GLYPHS.length];
              color = pal.edge(dim);
            } else if (part === PARTS.BACK) {
              const h = halfDepth(shape, cu) || 0.02;
              const fromTop = clamp((cv - (backBias(cu) - h)) / (h * 1.2), 0, 1);
              const set = fromTop < 0.55 ? BACK_GLYPHS : BACK_LIGHT;
              glyph = set[((key >>> 7) + (shimmer ? 1 : 0)) % set.length];
              color = pal.back(dim * (0.95 - fromTop * 0.25));
            } else if (part === PARTS.BELLY) {
              glyph = BELLY_GLYPHS[((key >>> 7) + (shimmer ? 1 : 0)) % BELLY_GLYPHS.length];
              color = pal.belly(dim);
            } else if (part === PARTS.FIN) {
              glyph = FIN_GLYPHS[((key >>> 7) + (shimmer ? 1 : 0)) % FIN_GLYPHS.length];
              color = pal.fin(dim * 0.95);
            } else {
              glyph = PEC_GLYPHS[((key >>> 7) + (shimmer ? 1 : 0)) % PEC_GLYPHS.length];
              color = pal.fin(dim * 0.8);
            }
            ctx.fillStyle = color;
            ctx.fillText(glyph, px + cw / 2, py + ch / 2 + 1);
          }
        }

        // Gill slits: short curved strokes behind the eye.
        ctx.fillStyle = pal.belly(dim * 1.3);
        let lastGc = -9;
        for (const gu of shape.gills) {
          const gx = s.x - s.dir * gu * L;
          const gcol = Math.floor(gx / cw);
          if (Math.abs(gcol - lastGc) < 2) continue;
          lastGc = gcol;
          const h = halfDepth(shape, gu);
          for (let gv = -h * 0.35; gv <= h * 0.5; gv += ch / L) {
            const gc = Math.floor(gx / cw);
            const gr = Math.floor((s.y + gv * L) / ch);
            if (gc < 0 || gr < 0 || gc >= cols || gr >= rows || owner[gr * cols + gc] !== s.id) continue;
            ctx.clearRect(gc * cw, gr * ch, cw, ch);
            ctx.fillText(s.dir > 0 ? '(' : ')', gc * cw + cw / 2, gr * ch + ch / 2 + 1);
          }
        }

        // Eye: one crisp dark cell.
        const ex = s.x - s.dir * shape.eye[0] * L;
        const ey = s.y + shape.eye[1] * L;
        const ec = Math.floor(ex / cw);
        const er = Math.floor(ey / ch);
        if (ec >= 0 && er >= 0 && ec < cols && er < rows) {
          ctx.clearRect(ec * cw, er * ch, cw, ch);
          ctx.fillStyle = pal.eye;
          ctx.globalAlpha = Math.min(1, dim * 1.2);
          ctx.fillText('o', ec * cw + cw / 2, er * ch + ch / 2 + 1);
          ctx.globalAlpha = 1;
        }
      }

      // Wake ripples, drawn under nothing: skip cells a shark already owns.
      const wake = this.wake;
      for (let i = 0; i < wake.length; i++) {
        const e = wake[i];
        if (e < 0.05 || owner[i]) continue;
        const c = i % cols;
        const r = (i / cols) | 0;
        const a = clamp(e * 1.2, 0, 0.5) * op;
        ctx.fillStyle = pal.wake(a.toFixed(3));
        ctx.fillText(e > 0.3 ? '~' : '·', c * cw + cw / 2, r * ch + ch / 2 + 1);
      }
    }

    destroy() {
      this.disposed = true;
      cancelAnimationFrame(this.raf);
      this.resizeObserver.disconnect();
      window.removeEventListener('pointermove', this.onPointer);
      document.documentElement.removeEventListener('pointerleave', this.onLeave);
      document.removeEventListener('visibilitychange', this.onVisibility);
      if (this.ctx) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  window.AsciiSharks = AsciiSharks;
})();
