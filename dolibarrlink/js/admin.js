(function() {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('dolibarr-admin-form');
        const rulesTextarea = document.getElementById('dolibarr-rules');
        const status = document.getElementById('dolibarr-status');
        
        if (!form || !rulesTextarea || !status) {
            console.error('DolibarrLink: Required elements not found');
            return;
        }
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const rules = rulesTextarea.value.trim() || '[]';
            
            // Validate JSON
            try {
                JSON.parse(rules);
            } catch (err) {
                status.textContent = 'Error: Invalid JSON format';
                status.style.color = 'red';
                return;
            }
            
            // Show loading
            status.textContent = 'Saving...';
            status.style.color = 'blue';
            
            // Send request
            const url = OC.generateUrl('/apps/dolibarrlink/admin/rules');
            const data = new FormData();
            data.append('rules', rules);
            
            fetch(url, {
                method: 'POST',
                headers: {
                    'requesttoken': OC.requestToken
                },
                body: data
            })
            .then(response => response.json())
            .then(result => {
                if (result.ok) {
                    status.textContent = 'Saved successfully!';
                    status.style.color = 'green';
                } else {
                    status.textContent = 'Error: ' + (result.error || 'Unknown error');
                    status.style.color = 'red';
                }
            })
            .catch(error => {
                console.error('DolibarrLink save error:', error);
                status.textContent = 'Network error';
                status.style.color = 'red';
            });
        });
    });
})();