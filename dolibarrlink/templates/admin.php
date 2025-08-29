<div class="dolibarr-settings">
        <h2>Konfiguracija Dolibarr Link</h2>
        
        <div class="setting-row">
            <h3>Osnovne postavke</h3>
            <label>
                <input type="checkbox" id="dolibarr-enabled" checked>
                Omogući Dolibarr Link patchiranje
            </label>
            <p class="hint">Omogućava ili onemogućava patchiranje linkova na cijeloj stranici.</p>
        </div>
        
        <div class="setting-row">
            <h3>Pravila za poklapanje linkova</h3>
            <p class="hint">Konfiguriraj koja pravila će se koristiti za prepoznavanje linkova koji se trebaju patchirati.</p>
            
            <div id="rules-container">
                <!-- Rules will be populated by JavaScript -->
            </div>
            
            <button id="add-rule" class="button">Dodaj pravilo</button>
            <button id="test-rules" class="button">Testiraj pravila</button>
        </div>
        
        <div class="setting-row">
            <button id="save-settings" class="button primary">Spremi postavke</button>
            <span id="save-status"></span>
        </div>
        
        <div class="setting-row">
            <h3>Trenutni status</h3>
            <div id="status-info">
                <p><strong>Status skripte:</strong> <span id="script-status">Učitavam...</span></p>
                <p><strong>Zadnje skeniranje:</strong> <span id="last-scan">-</span></p>
                <p><strong>Patchiranih linkova:</strong> <span id="links-patched">0</span></p>
            </div>
        </div>
        
        <div class="developer-info">
            <strong>Develop by: 8Core Association 2014-2025</strong>
        </div>