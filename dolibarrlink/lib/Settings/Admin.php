<?php

namespace OCA\DolibarrLink\Settings;

use OCP\AppFramework\Http\TemplateResponse;
use OCP\IConfig;
use OCP\IL10N;
use OCP\Settings\ISettings;
use OCP\Util;

class Admin implements ISettings {
    private $config;
    private $l;

    public function __construct(IConfig $config, IL10N $l) {
        $this->config = $config;
        $this->l = $l;
    }

    public function getForm() {
        // Get current rules from config
        $rules = $this->config->getAppValue('dolibarrlink', 'rules', '[]');
        $enabled = $this->config->getAppValue('dolibarrlink', 'enabled', '1');
        
        // Pass data to JavaScript
        Util::addScript('dolibarrlink', 'admin');
        Util::addInlineScript('dolibarrlink', 
            'window.DolibarrLinkConfig = ' . json_encode([
                'rules' => $rules,
                'enabled' => $enabled
            ]) . ';'
        );

        $parameters = [
            'rules' => $rules,
            'enabled' => $enabled
        ];

        return new TemplateResponse('dolibarrlink', 'admin', $parameters);
    }

    public function getSection() {
        return 'dolibarrlink';
    }

    public function getPriority() {
        return 50;
    }
}