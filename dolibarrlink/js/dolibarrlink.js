(function() {
    'use strict';
    
    console.log('DolibarrLink: Script loaded');
    
    // Simple hardcoded rules for testing
    const rules = [
        {"type": "hrefContains", "value": "/dolibarr/"},
        {"type": "title", "value": "Dolibarr"}
    ];
    
    function matchesRule(link) {
        return rules.some(rule => {
            try {
                switch (rule.type) {
                    case 'title':
                        return link.getAttribute('title') === rule.value;
                    case 'hrefContains':
                        const href = link.getAttribute('href') || '';
                        return href.indexOf(rule.value) !== -1;
                    default:
                        return false;
                }
            } catch (e) {
                return false;
            }
        });
    }
    
    function patchLink(link) {
        if (!link || link.dataset.dolibarrPatched === '1') return;
        if (!matchesRule(link)) return;
        
        console.log('DolibarrLink: Patching link:', link.href);
        
        link.setAttribute('target', '_self');
        link.addEventListener('click', function(e) {
            if (e.defaultPrevented) return;
            if (e.button !== 0) return;
            if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
            
            const href = link.getAttribute('href');
            if (!href) return;
            
            console.log('DolibarrLink: Redirecting to:', href);
            e.preventDefault();
            window.location.href = href;
        });
        
        link.dataset.dolibarrPatched = '1';
    }
    
    function scanAndPatchLinks() {
        const links = document.querySelectorAll('a');
        console.log('DolibarrLink: Scanning', links.length, 'links');
        links.forEach(patchLink);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', scanAndPatchLinks);
    } else {
        scanAndPatchLinks();
    }
    
    // Watch for dynamic content
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(scanAndPatchLinks);
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }
    
})();