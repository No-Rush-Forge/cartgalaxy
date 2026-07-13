/* ------------------------------------------------------------------
   Design tokens
   Palette:
     --bg-0   #0d0f13  page base
     --bg-1   #171a21  card surface
     --bg-2   #1e2229  input surface
     --line   #2a2e37  hairline borders
     --line-2 #363b46  hover borders
     --ink-0  #eceef1  primary text
     --ink-1  #9ba0ac  secondary text
     --ink-2  #676c78  tertiary / placeholder
     --amber  #d99a4e  accent (signature)
     --amber-hi #eab06a hover accent
     --amber-dim rgba(217,154,78,0.12)
     --green  #3ecf8e  success
     --red    #e5636a  error
   Type: Inter (display/body), JetBrains Mono (eyebrow/labels/meta)
------------------------------------------------------------------- */

const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

    .auth-root {
      --bg-0:#0d0f13; --bg-1:#171a21; --bg-2:#1e2229;
      --line:#2a2e37; --line-2:#363b46;
      --ink-0:#eceef1; --ink-1:#9ba0ac; --ink-2:#676c78;
      --amber:#d99a4e; --amber-hi:#eab06a; --amber-dim:rgba(217,154,78,0.14);
      --green:#3ecf8e; --red:#e5636a;
      font-family:'Inter',ui-sans-serif,system-ui,sans-serif;
      min-height:100vh;
      width:100%;
      position:relative;
      background:
        radial-gradient(1100px 520px at 15% -8%, rgba(217,154,78,0.07), transparent 60%),
        radial-gradient(900px 500px at 100% 100%, rgba(217,154,78,0.04), transparent 55%),
        linear-gradient(160deg, #14161c 0%, #101217 45%, #0b0d11 100%);
      color:var(--ink-0);
      overflow:hidden;
    }
    .auth-grid {
      position:absolute; inset:0;
      background-image:
        linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px);
      background-size: 42px 42px;
      mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 75%);
      pointer-events:none;
    }
    .mono { font-family:'JetBrains Mono', ui-monospace, monospace; }
    .eyebrow {
      font-family:'JetBrains Mono', ui-monospace, monospace;
      font-size:11px; letter-spacing:0.14em; text-transform:uppercase;
      color:var(--ink-2);
    }
    .field-label {
      font-family:'JetBrains Mono', ui-monospace, monospace;
      font-size:11px; letter-spacing:0.09em; text-transform:uppercase;
      color:var(--ink-1);
    }
    .top-link {
      color:var(--ink-1);
      transition:color .18s ease;
    }
    .top-link:hover { color:var(--ink-0); }

    .card {
      background:var(--bg-1);
      border:1px solid var(--line);
      border-radius:14px;
      box-shadow: 0 1px 0 rgba(255,255,255,0.03) inset, 0 20px 50px -20px rgba(0,0,0,0.6);
      position:relative;
      overflow:hidden;
      animation: card-in .5s cubic-bezier(.16,1,.3,1);
    }
    .card::before {
      content:'';
      position:absolute; top:0; left:0; right:0; height:2px;
      background:linear-gradient(90deg, transparent, var(--amber), transparent);
      opacity:.85;
    }
    @keyframes card-in {
      from { opacity:0; transform:translateY(10px) scale(.985); }
      to { opacity:1; transform:translateY(0) scale(1); }
    }

    .logo-mark {
      width:34px; height:34px; border-radius:8px;
      background:linear-gradient(155deg, var(--amber), #b97a34);
      display:flex; align-items:center; justify-content:center;
      font-family:'JetBrains Mono', monospace; font-weight:600; font-size:14px;
      color:#0d0f13;
      box-shadow: 0 6px 16px -4px rgba(217,154,78,0.45);
    }

    .input-shell {
      display:flex; align-items:center; gap:10px;
      background:var(--bg-2);
      border:1px solid var(--line);
      border-radius:9px;
      padding:0 12px;
      transition: border-color .16s ease, box-shadow .16s ease, background .16s ease;
    }
    .input-shell:hover { border-color:var(--line-2); }
    .input-shell.focused {
      border-color:var(--amber);
      box-shadow:0 0 0 3px var(--amber-dim);
      background:#20242c;
    }
    .input-shell.error {
      border-color:var(--red);
      box-shadow:0 0 0 3px rgba(229,72,77,0.12);
    }
    .input-shell input {
      background:transparent; border:none; outline:none;
      color:var(--ink-0); font-size:14px; width:100%;
      padding:11px 2px; font-family:'Inter',sans-serif;
    }
    .input-shell input::placeholder { color:var(--ink-2); }
    .icon-btn {
      color:var(--ink-2); transition:color .15s ease; cursor:pointer;
      display:flex; align-items:center; background:none; border:none; padding:0;
    }
    .icon-btn:hover { color:var(--ink-1); }

    .err-msg {
      display:flex; align-items:center; gap:6px;
      font-size:12.5px; color:var(--red); margin-top:6px;
      animation: fade-down .16s ease;
    }
    @keyframes fade-down {
      from { opacity:0; transform:translateY(-3px); }
      to { opacity:1; transform:translateY(0); }
    }

    .btn-primary {
      width:100%;
      background:linear-gradient(160deg, var(--amber-hi), var(--amber));
      color:#181008;
      font-weight:600; font-size:14.5px;
      border:none; border-radius:9px;
      padding:12px 16px;
      display:flex; align-items:center; justify-content:center; gap:8px;
      cursor:pointer;
      transition:filter .15s ease, transform .12s ease, box-shadow .15s ease;
      box-shadow:0 8px 20px -8px rgba(217,154,78,0.55);
    }
    .btn-primary:hover:not(:disabled) { filter:brightness(1.08); transform:translateY(-1px); }
    .btn-primary:active:not(:disabled) { transform:translateY(0); }
    .btn-primary:disabled { opacity:.75; cursor:default; }
    .btn-primary:focus-visible, .input-shell input:focus-visible, .top-link:focus-visible, .icon-btn:focus-visible, .text-link:focus-visible {
      outline:2px solid var(--amber); outline-offset:2px;
    }

    .text-link {
      color:var(--amber); font-weight:500; cursor:pointer;
      background:none; border:none; padding:0; font-size:inherit;
      font-family:inherit;
      transition:color .15s ease;
    }
    .text-link:hover { color:var(--amber-hi); text-decoration:underline; }

    .divider-line { height:1px; background:var(--line); }

    .page-transition {
      animation: page-in .38s cubic-bezier(.16,1,.3,1);
    }
    @keyframes page-in {
      from { opacity:0; transform:translateY(6px); }
      to { opacity:1; transform:translateY(0); }
    }

    .success-box {
      background:rgba(62,207,142,0.08);
      border:1px solid rgba(62,207,142,0.3);
      border-radius:9px;
      padding:14px;
      display:flex; gap:10px; align-items:flex-start;
      animation: fade-down .2s ease;
    }

    @keyframes spin { to { transform: rotate(360deg); } }

    @media (prefers-reduced-motion: reduce) {
      .card, .page-transition, .err-msg, .success-box { animation:none !important; }
      .btn-primary:hover:not(:disabled) { transform:none; }
    }
  `}</style>
);

export default GlobalStyle;
