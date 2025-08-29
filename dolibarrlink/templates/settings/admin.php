<?php
/** @var array $_ */
script('dolibarrlink', 'admin');
?>

<div class="section">
    <h2><?php p($l->t('Dolibarr Link')); ?></h2>
    <p><?php p($l->t('Configure rules to force certain links to open in the same tab.')); ?></p>
    
    <form id="dolibarr-admin-form">
        <label for="dolibarr-rules"><?php p($l->t('Rules (JSON format):')); ?></label>
        <textarea id="dolibarr-rules" name="rules" rows="10" style="width: 100%; font-family: monospace;"><?php p($_['rules']); ?></textarea>
        
        <div style="margin-top: 10px;">
            <button type="submit" class="primary"><?php p($l->t('Save')); ?></button>
            <span id="dolibarr-status" style="margin-left: 10px;"></span>
        </div>
    </form>
    
    <div style="margin-top: 20px;">
        <h3><?php p($l->t('Example rules:')); ?></h3>
        <pre style="background: #f5f5f5; padding: 10px; border-radius: 3px;">[
  {"type": "title", "value": "Dolibarr"},
  {"type": "hrefContains", "value": "/dolibarr/"},
  {"type": "selector", "value": ".dolibarr-link"}
]</pre>
    </div>
</div>