# DolibarrLink - Nextcloud App

Prisilno otvaranje linkova u istom tabu na temelju konfiguriranih pravila.

## Admin sučelje

Otvori `templates/admin.php` u browseru za konfiguraciju pravila.

## Tipovi pravila

- **URL sadrži (hrefContains)**: Provjerava URL linka (href atribut)
- **Title sadrži (title)**: Provjerava title atribut linka  
- **Tekst sadrži (textContent)**: Provjerava tekst unutar linka

## Primjer konfiguracije

```javascript
{
    "enabled": true,
    "rules": [
        {"type": "hrefContains", "value": "/dolibarr/"},
        {"type": "title", "value": "Dolibarr"},
        {"type": "textContent", "value": "Dashboard"}
    ]
}
```

## Instalacija

1. Kopiraj folder `dolibarrlink` u `apps/` direktorij
2. Omogući aplikaciju u Nextcloud admin sučelju
3. Otvori `templates/admin.php` za konfiguraciju

## Develop by

8Core Association 2014-2025