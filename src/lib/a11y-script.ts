// Shared by the root layout (server) and a11y-prefs.ts (client), so it must
// not import React.

export const A11Y_KEY = "portfolio:a11y";

export const A11Y_INIT_SCRIPT = `(function(){try{var p=JSON.parse(localStorage.getItem(${JSON.stringify(
  A11Y_KEY
)})||"{}"),d=document.documentElement;if(p.textSize===1||p.textSize===2)d.dataset.textSize=String(p.textSize);if(p.highContrast)d.dataset.contrast="high";if(p.underlineLinks)d.dataset.underlineLinks="";}catch(e){}})();`;
