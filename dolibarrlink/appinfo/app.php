<?php
declare(strict_types=1);

$server = \OC::$server;
/** @var \OCP\IConfig $config */
$config = $server->getConfig();
$rulesJson = $config->getAppValue('dolibarrlink', 'rules', '[]');
$rules = json_decode($rulesJson, true);
if (!is_array($rules)) { $rules = []; }

\OCP\Util::addInitialState('dolibarrlink', 'rules', $rules);
\OCP\Util::addScript('dolibarrlink', 'dolibarrlink');
