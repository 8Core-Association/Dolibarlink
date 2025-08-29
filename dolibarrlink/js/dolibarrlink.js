(function(){
  'use strict';
  
  // Try multiple ways to get rules for different Nextcloud versions
  let rules = [];
  
  // Method 1: From global variable (Nextcloud 30 compatibility)
  if (typeof window.DolibarrLinkRules !== 'undefined') {
    rules = window.DolibarrLinkRules;
  }
  // Method 2: Try OCP.InitialState for newer versions
  else if (typeof OCP !== 'undefined' && OCP.InitialState && OCP.InitialState.loadState) {
    try {
      rules = OCP.InitialState.loadState('dolibarrlink', 'rules') || [];
    } catch(e) {
      console.warn('DolibarrLink: Could not load rules from InitialState');
    }
  }
  // Method 3: Try OC.InitialState for older versions
  else if (typeof OC !== 'undefined' && OC.InitialState && OC.InitialState.loadState) {
    try {
      rules = OC.InitialState.loadState('dolibarrlink', 'rules') || [];
    } catch(e) {
      console.warn('DolibarrLink: Could not load rules from OC.InitialState');
    }
  }
  
  if (!Array.isArray(rules)) {
    console.warn('DolibarrLink: Invalid rules format, using empty array');
    rules = [];
  }
  
  console.log('DolibarrLink: Loaded rules:', rules);
  
  const match = (a) => {
    return rules.some(r => {
      try {
        if (!r || typeof r !== 'object') return false;
        if (r.type === 'title') return a.getAttribute('title') === r.value;
        if (r.type === 'hrefContains') return (a.getAttribute('href') || '').indexOf(r.value) !== -1;
        if (r.type === 'selector') return a.matches(r.value);
      } catch(e) { 
        console.warn('DolibarrLink rule error:', e, r);
        return false; 
      }
      return false;
    });
  };
  
  const patchLink = (a) => {
    if (!a || a.dataset._dlbPatched === '1' || !match(a)) return;
    
    console.log('DolibarrLink: Patching link:', a.href);
    
    a.setAttribute('target', '_self');
    a.addEventListener('click', (e) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;                // samo LKM
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return; // pusti prečace
      
      const href = a.getAttribute('href');
      if (!href) return;
      
      console.log('DolibarrLink: Redirecting to:', href);
      e.preventDefault();
      window.location.href = href;
    }, {capture: true});
    
    a.dataset._dlbPatched = '1';
  };
  
  const scan = () => {
    const links = document.querySelectorAll('a');
    console.log('DolibarrLink: Scanning', links.length, 'links');
    links.forEach(patchLink);
  };
  
  // Initial scan
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scan);
  } else {
    scan();
  }
  
  // Watch for dynamic content
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(() => {
      scan();
    });
    observer.observe(document.documentElement, {
      childList: true, 
      subtree: true
    });
  }
  
  console.log('DolibarrLink: Initialized with', rules.length, 'rules');
})();