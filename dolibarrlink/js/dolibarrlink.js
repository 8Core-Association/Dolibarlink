(function(){
  const rules = (OCP && OCP.InitialState && OCP.InitialState.loadState('dolibarrlink','rules')) || [];
  const match = (a) => {
    return rules.some(r => {
      try {
        if (r.type === 'title') return a.getAttribute('title') === r.value;
        if (r.type === 'hrefContains') return (a.getAttribute('href') || '').indexOf(r.value) !== -1;
        if (r.type === 'selector') return a.matches(r.value);
      } catch(e) { return false; }
      return false;
    });
  };
  const patchLink = (a) => {
    if (!a || a.dataset._dlbPatched === '1' || !match(a)) return;
    a.setAttribute('target', '_self');
    a.addEventListener('click', (e)=>{
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;                // samo LKM
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return; // pusti prečace
      const href = a.getAttribute('href');
      if (!href) return;
      e.preventDefault();
      window.location.href = href;
    }, {capture:true});
    a.dataset._dlbPatched = '1';
  };
  const scan = () => document.querySelectorAll('a').forEach(patchLink);
  document.addEventListener('DOMContentLoaded', scan);
  new MutationObserver(scan).observe(document.documentElement, {childList:true, subtree:true});
})();