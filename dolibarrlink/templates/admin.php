<?php
script('dolibarrlink', 'admin');
style('dolibarrlink', 'admin');
?>

<div class="section">
    <h2><?php p($l->t('DolibarrLink Configuration')); ?></h2>
    
    <div class="dolibarr-settings">
        <div class="setting-row">
            <h3><?php p($l->t('Basic Settings')); ?></h3>
            <label>
                <input type="checkbox" id="dolibarr-enabled" checked>
                <?php p($l->t('Enable DolibarrLink patching')); ?>
            </label>
            <p class="hint"><?php p($l->t('Enables or disables link patching on the entire page.')); ?></p>
        </div>
        
        <div class="setting-row">
            <h3><?php p($l->t('Link Matching Rules')); ?></h3>
            <p class="hint"><?php p($l->t('Configure which rules will be used to recognize links that need to be patched.')); ?></p>
            
            <div id="rules-container">
                <!-- Rules will be populated by JavaScript -->
            </div>
            
            <button id="add-rule" class="button"><?php p($l->t('Add Rule')); ?></button>
            <button id="test-rules" class="button"><?php p($l->t('Test Rules')); ?></button>
        </div>
        
        <div class="setting-row">
            <button id="save-settings" class="button primary"><?php p($l->t('Save Settings')); ?></button>
            <span id="save-status"></span>
        </div>
        
        <div class="setting-row">
            <h3><?php p($l->t('Current Status')); ?></h3>
            <div id="status-info">
                <p><strong><?php p($l->t('Script Status:')); ?></strong> <span id="script-status"><?php p($l->t('Loading...')); ?></span></p>
                <p><strong><?php p($l->t('Last Scan:')); ?></strong> <span id="last-scan">-</span></p>
                <p><strong><?php p($l->t('Patched Links:')); ?></strong> <span id="links-patched">0</span></p>
            </div>
        </div>
        
        <div class="developer-info">
            <strong><?php p($l->t('Develop by: 8Core Association 2014-2025')); ?></strong>
        </div>
    </div>
</div>