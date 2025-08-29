// DolibarrLink Configuration
// Edit this file to change rules and settings

window.DolibarrLinkConfig = {
    enabled: true,
    rules: [
        {"type": "hrefContains", "value": "/dolibarr/"},
        {"type": "title", "value": "Dolibarr"},
        {"type": "hrefContains", "value": "dolibarr"},
        {"type": "textContent", "value": "Dashboard"}
    ]
};

console.log('DolibarrLink: Configuration loaded with', window.DolibarrLinkConfig.rules.length, 'rules');