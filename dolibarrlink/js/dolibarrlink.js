(function() {
    'use strict';
    
    console.log('DolibarrLink: Script loaded');
    
    // This will be loaded on all pages to patch links
    // For now, we'll use a simple approach without complex state management
    
    let rules = [];
    
    // Try to get rules from various sources
    function loadRules() {
        // For now, we'll make an AJAX request to get the rules
        // This is not ideal but works for Nextcloud 30
        
        if (typeof OC === 'undefined') {
            console.warn('DolibarrLink: OC not available');
            return;
        }
        
        const url = OC.generateUrl('/apps/dolibarrlink/admin/rules');
        
        fetch(url, {
            method: 'GET',
            headers: {
                'requesttoken': OC.requestToken || ''
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data && Array.isArray(data.rules)) {
                rules = data.rules;
                console.log('DolibarrLink: Loaded rules:', rules);
                scanAndPatchLinks();
            }
        })
        .catch(error => {
            console.warn('DolibarrLink: Could not load rules:', error);
        });
    }
    
    function matchesRule(link) {
        return rules.some(rule => {
            try {
                if (!rule || typeof rule !== 'object') return false;
                
                switch (rule.type) {
                    case 'title':
                        return link.getAttribute('title') === rule.value;
                    case 'hrefContains':
                        const href = link.getAttribute('href') || '';
                        return href.indexOf(rule.value) !== -1;
                    case 'selector':
                        return link.matches(rule.value);
                    default:
                        return false;
                }
            } catch (e) {
                console.warn('DolibarrLink: Rule error:', e, rule);
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
            if (e.button !== 0) return; // Only left click
            if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return; // Allow shortcuts
            
            const href = link.getAttribute('href');
            if (!href) return;
            
            console.log('DolibarrLink: Redirecting to:', href);
            e.preventDefault();
            window.location.href = href;
        }, { capture: true });
        
        link.dataset.dolibarrPatched = '1';
    }
    
    function scanAndPatchLinks() {
        const links = document.querySelectorAll('a');
        console.log('DolibarrLink: Scanning', links.length, 'links');
        links.forEach(patchLink);
    }
    
    // Initialize
    function init() {
        loadRules();
        
        // Watch for dynamic content
        if (typeof MutationObserver !== 'undefined') {
            const observer = new MutationObserver(function() {
                scanAndPatchLinks();
            });
            observer.observe(document.documentElement, {
                childList: true,
                subtree: true
            });
        }
    }
    
    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();