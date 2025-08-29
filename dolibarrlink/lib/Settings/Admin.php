<?php
namespace OCA\DolibarrLink\Settings;

use OCP\Settings\ISettings;
use OCP\AppFramework\Http\TemplateResponse;

class Admin implements ISettings {
    public function getSection(): string { return 'dolibarrlink'; }
    public function getPriority(): int { return 50; }
    public function getForm(): TemplateResponse {
        $config = \OC::$server->getConfig();
        $rules = $config->getAppValue('dolibarrlink','rules','[]');
        return new TemplateResponse('dolibarrlink','settings/admin', ['rules'=>$rules], '');
    }
}
