<?php
$server = \OC::$server;
/** @var \OCP\IConfig $config */
$config = $server->getConfig();
$rulesJson = $config->getAppValue('dolibarrlink', 'rules', '[]');
$rules = json_decode($rulesJson, true);
if (!is_array($rules)) { $rules = []; }

\OCP\Util::addInitialState('dolibarrlink', 'rules', $rules);
\OCP\Util::addScript('dolibarrlink', 'dolibarrlink');

// Legacy registration for older setups to ensure the admin page appears
\OCP\App::registerAdmin('dolibarrlink', 'admin');
