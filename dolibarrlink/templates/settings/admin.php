<?php script('dolibarrlink','admin'); ?>
<div class="section">
  <h2>Dolibarr Link</h2>
  <p>Pravila u JSON formatu (po <code>title</code>, <code>hrefContains</code> ili <code>selector</code>).</p>
  <form id="dlb-form">
    <textarea id="rules" name="rules" rows="12" style="width:100%"><?php p($_['rules']); ?></textarea>
    <br/>
    <button class="primary" type="submit">Spremi</button>
  </form>
  <div id="dlb-status" class="hint"></div>
</div>
