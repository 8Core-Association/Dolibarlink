<?php

namespace OCA\DolibarrLink\Controller;

use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;
use OCP\IConfig;

class AdminController extends Controller {
    
    private $config;
    
    public function __construct($AppName, IRequest $request, IConfig $config) {
        parent::__construct($AppName, $request);
        $this->config = $config;
    }
    
    /**
     * @AdminRequired
     * @NoCSRFRequired
     */
    public function saveSettings() {
        try {
            $enabled = $this->request->getParam('enabled', 'false') === 'true';
            $rules = $this->request->getParam('rules', '[]');
            
            if (is_string($rules)) {
                $rules = json_decode($rules, true);
            }
            
            if (!is_array($rules)) {
                $rules = [];
            }
            
            // Save to app config
            $this->config->setAppValue('dolibarrlink', 'enabled', $enabled ? '1' : '0');
            $this->config->setAppValue('dolibarrlink', 'rules', json_encode($rules));
            
            return new JSONResponse([
                'status' => 'success',
                'message' => 'Settings saved successfully'
            ]);
            
        } catch (\Exception $e) {
            return new JSONResponse([
                'status' => 'error', 
                'message' => 'Error saving settings: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * @AdminRequired
     * @NoCSRFRequired
     */
    public function getSettings() {
        try {
            $enabled = $this->config->getAppValue('dolibarrlink', 'enabled', '1') === '1';
            $rules = $this->config->getAppValue('dolibarrlink', 'rules', '[]');
            
            $rulesArray = json_decode($rules, true);
            if (!is_array($rulesArray)) {
                $rulesArray = [
                    ["type" => "hrefContains", "value" => "/dolibarr/"],
                    ["type" => "title", "value" => "Dolibarr"]
                ];
            }
            
            return new JSONResponse([
                'enabled' => $enabled,
                'rules' => $rulesArray
            ]);
            
        } catch (\Exception $e) {
            return new JSONResponse([
                'status' => 'error',
                'message' => 'Error loading settings: ' . $e->getMessage()
            ], 500);
        }
    }
}