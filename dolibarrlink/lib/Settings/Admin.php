<?php
declare(strict_types=1);

namespace OCA\DolibarrLink\Settings;

use OCP\Settings\ISettings;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\IConfig;
use OCP\Util;

class Admin implements ISettings {
    private IConfig $config;

    public function __construct(IConfig $config) {
        $this->config = $config;
    }

    public function getSection(): string { return 'dolibarrlink'; }
    public function getPriority(): int { return 50; }
    public function getForm(): TemplateResponse {
        $rules = $this->config->getAppValue('dolibarrlink','rules','[]');
        
        // Add the main script here instead of in app.php
        Util::addScript('dolibarrlink', 'dolibarrlink');
        
        return new TemplateResponse('dolibarrlink','settings/admin', [
            'rules' => $rules,
            'rulesJson' => $rules // Pass JSON directly to template
        ], '');
    }
}
