<?php
declare(strict_types=1);

namespace OCA\DolibarrLink\Settings;

use OCP\Settings\ISettings;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\IConfig;
use OCP\Util;

class Admin implements ISettings {
    
    /** @var IConfig */
    private $config;

    public function __construct(IConfig $config) {
        $this->config = $config;
    }

    public function getSection(): string {
        return 'dolibarrlink';
    }
    
    public function getPriority(): int {
        return 50;
    }
    
    public function getForm(): TemplateResponse {
        $rules = $this->config->getAppValue('dolibarrlink', 'rules', '[]');
        
        // Load admin script
        Util::addScript('dolibarrlink', 'admin');
        
        return new TemplateResponse('dolibarrlink', 'settings/admin', [
            'rules' => $rules
        ], '');
    }
}