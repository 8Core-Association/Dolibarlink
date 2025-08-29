# DolibarrLink - Nextcloud App

Prisilno otvaranje linkova u istom tabu na temelju konfiguriranih pravila.

## Konfiguracija

Uredi datoteku `js/config.js` za promjenu postavki:

```javascript
window.DolibarrLinkConfig = {
    enabled: true,  // omogući/onemogući aplikaciju
    rules: [
        {"type": "hrefContains", "value": "/dolibarr/"},     // URL sadrži
        {"type": "title", "value": "Dolibarr"},             // Title sadrži  
        {"type": "textContent", "value": "Dashboard"}       // Tekst sadrži
    ]
};
```

## Tipovi pravila

- **hrefContains**: Provjerava URL linka (href atribut)
- **title**: Provjerava title atribut linka
- **textContent**: Provjerava tekst unutar linka

## Instalacija

1. Kopiraj folder `dolibarrlink` u `apps/` direktorij
2. Omogući aplikaciju u Nextcloud admin sučelju
3. Uredi `js/config.js` prema potrebi

## Develop by

8Core Association 2014-2025