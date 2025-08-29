<?php

namespace OCA\DolibarrLink\Settings;

use OCP\AppFramework\Http\TemplateResponse;
use OCP\Settings\ISettings;

class AdminSettings implements ISettings {
    
    public function getForm() {
        \OCP\Util::addScript('dolibarrlink', 'admin');
        \OCP\Util::addStyle('dolibarrlink', 'admin');
        return new TemplateResponse('dolibarrlink', 'admin', [], '');
    }

    public function getSection() {
        return 'additional';
    }

    public function getPriority() {
        return 50;
    }
}