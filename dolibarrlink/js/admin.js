(function() {
    'use strict';
    
    let currentRules = [];
    
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DolibarrLink Admin: Initializing');
        
        // Load initial data
        loadSettings();
        
        // Bind events
        document.getElementById('add-rule').addEventListener('click', addRule);
        document.getElementById('save-settings').addEventListener('click', saveSettings);
        document.getElementById('test-rules').addEventListener('click', testRules);
        
        // Update status periodically
        updateStatus();
        setInterval(updateStatus, 5000);
    });
    
    function loadSettings() {
        const baseUrl = OC.generateUrl('/apps/dolibarrlink');
        
        fetch(baseUrl + '/admin/get', {
            method: 'GET',
            headers: {
                'requesttoken': OC.requestToken,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.enabled !== undefined) {
                document.getElementById('dolibarr-enabled').checked = data.enabled;
                currentRules = data.rules || [];
                renderRules();
                console.log('DolibarrLink Admin: Settings loaded from server');
            } else {
                // Fallback to default
                currentRules = [
                    {"type": "hrefContains", "value": "/dolibarr/"},
                    {"type": "title", "value": "Dolibarr"}
                ];
                document.getElementById('dolibarr-enabled').checked = true;
                renderRules();
                console.log('DolibarrLink Admin: Using default settings');
            }
        })
        .catch(error => {
            console.error('DolibarrLink Admin: Error loading settings:', error);
            // Use defaults on error
            currentRules = [
                {"type": "hrefContains", "value": "/dolibarr/"},
                {"type": "title", "value": "Dolibarr"}
            ];
            document.getElementById('dolibarr-enabled').checked = true;
            renderRules();
        });
    }
    
    function renderRules() {
        const container = document.getElementById('rules-container');
        container.innerHTML = '';
        
        currentRules.forEach((rule, index) => {
            const ruleDiv = document.createElement('div');
            ruleDiv.className = 'rule-item';
            ruleDiv.innerHTML = `
                <select data-index="${index}" class="rule-type">
                    <option value="hrefContains" ${rule.type === 'hrefContains' ? 'selected' : ''}>URL sadrži</option>
                    <option value="title" ${rule.type === 'title' ? 'selected' : ''}>Title sadrži</option>
                    <option value="textContent" ${rule.type === 'textContent' ? 'selected' : ''}>Tekst sadrži</option>
                </select>
                <input type="text" data-index="${index}" class="rule-value" value="${rule.value || ''}" placeholder="Unesite vrijednost...">
                <button class="delete-rule" data-index="${index}">Obriši</button>
            `;
            container.appendChild(ruleDiv);
        });
        
        // Bind events for new elements
        container.querySelectorAll('.rule-type').forEach(select => {
            select.addEventListener('change', updateRule);
        });
        container.querySelectorAll('.rule-value').forEach(input => {
            input.addEventListener('input', updateRule);
        });
        container.querySelectorAll('.delete-rule').forEach(button => {
            button.addEventListener('click', deleteRule);
        });
    }
    
    function addRule() {
        currentRules.push({
            type: 'hrefContains',
            value: ''
        });
        renderRules();
    }
    
    function updateRule(event) {
        const index = parseInt(event.target.dataset.index);
        const isType = event.target.classList.contains('rule-type');
        
        if (isType) {
            currentRules[index].type = event.target.value;
        } else {
            currentRules[index].value = event.target.value;
        }
    }
    
    function deleteRule(event) {
        const index = parseInt(event.target.dataset.index);
        currentRules.splice(index, 1);
        renderRules();
    }
    
    function saveSettings() {
        const enabled = document.getElementById('dolibarr-enabled').checked;
        const statusSpan = document.getElementById('save-status');
        const baseUrl = OC.generateUrl('/apps/dolibarrlink');
        
        statusSpan.textContent = 'Spremam...';
        statusSpan.className = '';
        
        const formData = new FormData();
        formData.append('enabled', enabled ? 'true' : 'false');
        formData.append('rules', JSON.stringify(currentRules));
        formData.append('requesttoken', oc_requesttoken);
        
        fetch(baseUrl + '/admin/save', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                statusSpan.textContent = 'Uspješno spremljeno!';
                statusSpan.className = 'success';
                console.log('DolibarrLink Admin: Settings saved successfully');
            } else {
                statusSpan.textContent = 'Greška: ' + (data.message || 'Unknown error');
                statusSpan.className = 'error';
                console.error('DolibarrLink Admin: Save error:', data.message);
            }
        })
        .catch(error => {
            console.error('DolibarrLink Admin: Network error:', error);
            statusSpan.textContent = 'Greška mreže!';
            statusSpan.className = 'error';
        });
    }
    
    function testRules() {
        const links = document.querySelectorAll('a[href]');
        let matchCount = 0;
        
        links.forEach(link => {
            const matches = currentRules.some(rule => {
                switch (rule.type) {
                    case 'title':
                        const title = link.getAttribute('title') || '';
                        return title.toLowerCase().includes(rule.value.toLowerCase());
                    case 'hrefContains':
                        const href = link.getAttribute('href') || '';
                        return href.toLowerCase().includes(rule.value.toLowerCase());
                    case 'textContent':
                        const text = link.textContent || '';
                        return text.toLowerCase().includes(rule.value.toLowerCase());
                    default:
                        return false;
                }
            });
            
            if (matches) {
                matchCount++;
                link.style.outline = '2px solid red';
                setTimeout(() => {
                    link.style.outline = '';
                }, 3000);
            }
        });
        
        alert(`Pronađeno je ${matchCount} poklapajućih linkova na ovoj stranici. Označeni su crveno na 3 sekunde.`);
    }
    
    function updateStatus() {
        const scriptStatus = document.getElementById('script-status');
        const lastScan = document.getElementById('last-scan');
        const linksPatched = document.getElementById('links-patched');
        
        // Check if main script is loaded
        if (window.DolibarrLinkStatus) {
            scriptStatus.textContent = 'Aktivan';
            scriptStatus.className = 'active';
            
            if (window.DolibarrLinkStatus.lastScan) {
                lastScan.textContent = new Date(window.DolibarrLinkStatus.lastScan).toLocaleString();
            }
            
            if (window.DolibarrLinkStatus.patchedCount !== undefined) {
                linksPatched.textContent = window.DolibarrLinkStatus.patchedCount;
            }
        } else {
            scriptStatus.textContent = 'Neaktivan';
            scriptStatus.className = 'inactive';
        }
    }
})();