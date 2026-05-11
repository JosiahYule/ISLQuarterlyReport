// nav.jsx — shared masthead, nav, and loading screen
// Used by: index.html (Social Media), web/index.html (Website), trends/index.html (Trends)
//
// Usage: include BEFORE app-specific script, then call:
//   renderNav("social")   — or "web" or "trends"
// =============================================================================

const { useState, useEffect, useRef } = React;

function LoadingScreen() {
  return (
    <div className="loading-screen" id="loadingScreen">
      <div className="loading-wordmark serif">Integrated <em>Staffing</em></div>
      <div className="loading-track"><div className="loading-fill"></div></div>
      <div className="loading-label">Loading report</div>
    </div>
  );
}

function Masthead() {
  return (
    <header className="masthead">
      <div className="wrap masthead-row">
        <div className="masthead-left">
          <div className="masthead-mark serif">Integrated <em>Staffing</em></div>
        </div>
      </div>
    </header>
  );
}

function MastNav({ active, quarter, onQuarter }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const tabs = [
    { id: "social", label: "Social Media", href: "/" },
    { id: "web",    label: "Website",      href: "/web/" },
    { id: "trends", label: "Trends",       href: "/trends/" },
  ];

  return (
    <div className="masthead-nav">
      <div className="wrap masthead-nav-row">
        <nav className="nav-tabs">
          {tabs.map(t => (
            <a key={t.id} href={t.href} className={active === t.id ? "is-active" : ""}>
              {t.label}
            </a>
          ))}
        </nav>
        {onQuarter ? (
          <div className="nav-meta">
            <span>{quarter?.rangeLabel ?? ""}</span>
            <div ref={ref} style={{ position: "relative" }}>
              <button className="qchooser" onClick={() => setOpen(!open)}>
                <span>{quarter?.label ?? "Quarter"}</span>
                <span className="caret">▾</span>
              </button>
              <div className={"menu" + (open ? " is-open" : "")}>
                <div className="group">2026</div>
                <a href="?report=islq3" className={quarter?.key === "islq3" ? "active" : ""} onClick={() => setOpen(false)}>Q3 — Mar – May 2026</a>
                <a href="?report=islq2" className={quarter?.key === "islq2" ? "active" : ""} onClick={() => setOpen(false)}>Q2 — Dec – Feb 2026</a>
                <div className="group">2025</div>
                <a href="?report=islq1" className={quarter?.key === "islq1" ? "active" : ""} onClick={() => setOpen(false)}>Q1 — Sep – Nov 2025</a>
              </div>
            </div>
          </div>
        ) : (
          <div className="nav-meta">
            <span>Q1 · Q2 · Q3</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Called by each page after including this file.
// active: "social" | "web" | "trends"
// quarter: optional { key, label, rangeLabel } object for pages with quarter switcher
// onQuarter: optional callback — pass null for pages without quarter switching
function renderNav(active, quarter, onQuarter) {
  const navRoot = document.getElementById("nav-root");
  if (!navRoot) return;
  ReactDOM.createRoot(navRoot).render(
    <>
      <LoadingScreen />
      <Masthead />
      <MastNav active={active} quarter={quarter} onQuarter={onQuarter} />
    </>
  );
}

// Call after page content is ready to fade out the loading screen.
function hideLoadingScreen() {
  const el = document.getElementById("loadingScreen");
  if (!el) return;
  el.classList.add("is-gone");
  setTimeout(() => el.remove(), 500);
}