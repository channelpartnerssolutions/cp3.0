// Channel Partners particle wave — canvas background as a web component.
(function () {
  const CP = {
    deep: [24, 97, 136],
    blue: [2, 117, 179],
    light: [150, 220, 245],
    green: [2, 179, 145],
    greenLight: [150, 240, 220],
  };
  const lerp = (a, b, k) => a + (b - a) * k;
  const mix = (c1, c2, k) => [lerp(c1[0], c2[0], k), lerp(c1[1], c2[1], k), lerp(c1[2], c2[2], k)];
  const rnd = (i) => { const s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };

  class ParticleWave extends HTMLElement {
    connectedCallback() {
      if (this._built) return;
      this._built = true;
      this.style.position = this.style.position || 'absolute';
      if (!this.style.inset) this.style.inset = '0';
      if (!this.style.width) this.style.width = '100%';
      if (!this.style.height) this.style.height = '100%';
      this.style.display = 'block';
      this.style.overflow = 'hidden';
      this.style.background = '#0e181c';
      this.innerHTML =
        '<div style="position:absolute;inset:0;background:radial-gradient(120% 95% at 62% 18%, rgba(2,117,179,0.22) 0%, rgba(23,53,66,0.35) 40%, rgba(14,24,28,0) 72%);"></div>' +
        '<div style="position:absolute;inset:0;background:radial-gradient(70% 60% at 14% 88%, rgba(2,179,145,0.13) 0%, rgba(14,24,28,0) 68%);"></div>' +
        '<canvas style="position:absolute;inset:0;width:100%;height:100%;display:block;"></canvas>' +
        '<div style="position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg, rgba(14,24,28,0.55) 0%, rgba(14,24,28,0) 30%, rgba(14,24,28,0) 70%, rgba(14,24,28,0.65) 100%);"></div>';

      const canvas = this.querySelector('canvas');
      const ctx = canvas.getContext('2d');
      this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.specks = Array.from({ length: 70 }, (_, i) => ({
        x: rnd(i * 3.1), y: rnd(i * 7.7 + 2), r: 0.4 + rnd(i * 1.3) * 1.1, ph: rnd(i * 5.9) * 6.28,
      }));

      this.resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const r = canvas.getBoundingClientRect();
        this.w = Math.max(1, r.width);
        this.h = Math.max(1, r.height);
        canvas.width = Math.round(this.w * dpr);
        canvas.height = Math.round(this.h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        this.draw(ctx, this.reduced ? 3.4 : (performance.now() - (this.t0 || performance.now())) / 1000);
      };
      this.resize();
      this.ro = new ResizeObserver(this.resize);
      this.ro.observe(canvas);

      if (this.reduced) return;
      this.t0 = performance.now();
      const tick = (now) => {
        this.raf = requestAnimationFrame(tick);
        this.draw(ctx, (now - this.t0) / 1000);
      };
      this.raf = requestAnimationFrame(tick);
    }

    disconnectedCallback() {
      if (this.raf) cancelAnimationFrame(this.raf);
      if (this.ro) this.ro.disconnect();
      this._built = false;
    }

    num(attr, fallback) {
      const v = parseFloat(this.getAttribute(attr));
      return Number.isFinite(v) ? v : fallback;
    }

    field(uu, tt, H, amp) {
      const s = uu - tt * 0.17;
      return (
        Math.sin(s * 3.5) * H * 0.155 +
        Math.sin(s * 6.7 + 1.3) * H * 0.062 +
        Math.sin(s * 1.6 + 2.6) * H * 0.05 +
        Math.sin(uu * 2.4 + tt * 0.22) * H * 0.028
      ) * amp;
    }

    draw(ctx, t) {
      const amp = this.num('amplitude', 1);
      const speed = this.num('speed', 1);
      const density = this.num('density', 1);
      const foldK = this.num('fold', 1);
      const greenHint = this.num('green-hint', 0.5);
      const W = this.w, H = this.h;
      if (!W || !H) return;
      ctx.clearRect(0, 0, W, H);
      const T = t * 0.42 * speed;

      for (const s of this.specks) {
        const a = 0.10 + 0.16 * (0.5 + 0.5 * Math.sin(T * 1.6 + s.ph));
        ctx.fillStyle = `rgba(150,212,240,${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      const sheets = [
        { strands: Math.round(46 * density), n: Math.round(Math.min(420, W / 2.4) * density), lag: 1.55, drift: H * 0.17, yOff: H * 0.50, op: 1.0, dot: 1.0 },
        { strands: Math.round(28 * density), n: Math.round(Math.min(320, W / 3.4) * density), lag: -1.55, drift: H * 0.15, yOff: H * 0.64, op: 0.72, dot: 0.9 },
      ];

      for (let li = 0; li < sheets.length; li++) {
        const S = sheets[li];
        const strands = Math.max(12, S.strands);
        const N = Math.max(80, S.n);
        const dq = 1 / (strands - 1);
        const phase = li === 0 ? 0 : 2.1;

        for (let s = 0; s < strands; s++) {
          const q = s / (strands - 1);
          const shear = q * S.lag * 0.10 * foldK + phase * 0.05;
          const shear2 = (q + dq) * S.lag * 0.10 * foldK + phase * 0.05;

          for (let i = 0; i < N; i++) {
            const u = (i + q * 0.9) / (N - 1 + 0.9);
            const pitch = W / (N - 1);
            const x = u * W + (rnd(li * 613 + s * 97 + i * 1.7) - 0.5) * pitch * 1.25;
            const jy = (rnd(li * 331 + s * 53 + i * 2.3) - 0.5) * 1.6;
            const y = S.yOff + this.field(u + shear, T, H, amp) + (q - 0.5) * S.drift + jy;
            const yN = S.yOff + this.field(u + shear2, T, H, amp) + (q + dq - 0.5) * S.drift;

            const gap = Math.abs(yN - y);
            const nominal = Math.abs(S.drift) / strands;
            const conv = 1 / (1 + Math.pow(gap / (nominal * 1.6), 1.35));

            const edge = Math.min(1, Math.sin(Math.PI * u) * 1.9);
            const band = 0.35 + 0.65 * Math.pow(Math.sin(Math.PI * q), 0.5);
            const jitter = 0.82 + 0.36 * rnd(li * 977 + s * 131 + i);

            const alpha = Math.min(0.5, S.op * edge * band * (0.24 + 0.66 * conv) * jitter);
            if (alpha < 0.014) continue;

            let col = mix(CP.deep, CP.blue, Math.min(1, conv * 1.6));
            if (conv > 0.62) col = mix(col, CP.light, (conv - 0.62) / 0.38 * 0.75);

            if (greenHint > 0) {
              const gc = 0.5 + 0.3 * Math.sin(T * 0.18 + li * 0.9);
              const gz = Math.exp(-Math.pow((u - gc) / 0.11, 2));
              const gk = Math.min(0.7, gz * Math.min(1, greenHint * 1.5));
              if (gk > 0.02) {
                const gcol = mix(CP.green, CP.greenLight, Math.max(0, (conv - 0.6) / 0.4) * 0.85);
                col = mix(col, gcol, gk);
              }
            }

            const size = (0.5 + 0.8 * conv) * S.dot;
            ctx.fillStyle = `rgba(${Math.round(col[0])},${Math.round(col[1])},${Math.round(col[2])},${alpha.toFixed(3)})`;
            ctx.fillRect(x - size / 2, y - size / 2, size, size);
          }
        }
      }
    }
  }

  if (!customElements.get('particle-wave')) customElements.define('particle-wave', ParticleWave);
})();
