<?php
script('dolibarrlink', 'admin');
style('dolibarrlink', 'admin');
?>

<div id="dolibarrlink-admin" class="section">
    <h2><?php p($l->t('Dolibarr Link Configuration')); ?></h2>
    
    <div class="dolibarr-settings">
        <div class="setting-row">
            <label>
                <input type="checkbox" id="dolibarr-enabled" <?php if ($_['enabled'] === '1') p('checked'); ?>>
                <?php p($l->t('Enable Dolibarr Link patching')); ?>
            </label>
            <p class="hint"><?php p($l->t('When enabled, links matching the rules below will be forced to open in the same tab.')); ?></p>
        </div>

        <div class="setting-row">
            <h3><?php p($l->t('Link Matching Rules')); ?></h3>
            <p class="hint"><?php p($l->t('Configure which links should be patched to open in the same tab.')); ?></p>
            
            <div id="rules-container">
                <!-- Rules will be populated by JavaScript -->
            </div>
            
            <button id="add-rule" class="button"><?php p($l->t('Add Rule')); ?></button>
        </div>

        <div class="setting-row">
            <button id="save-settings" class="button primary"><?php p($l->t('Save Settings')); ?></button>
            <button id="test-rules" class="button"><?php p($l->t('Test Rules')); ?></button>
            <span id="save-status"></span>
        </div>

        <div class="setting-row">
            <h3><?php p($l->t('Current Status')); ?></h3>
            <div id="status-info">
                <p><strong><?php p($l->t('Script Status:')); ?></strong> <span id="script-status">Loading...</span></p>
                <p><strong><?php p($l->t('Last Scan:')); ?></strong> <span id="last-scan">Never</span></p>
                <p><strong><?php p($l->t('Links Patched:')); ?></strong> <span id="links-patched">0</span></p>
            </div>
        </div>
    </div>
</div>