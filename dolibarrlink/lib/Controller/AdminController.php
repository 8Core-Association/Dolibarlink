<?php
declare(strict_types=1);

namespace OCA\DolibarrLink\Controller;

use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;
use OCP\IConfig;

class AdminController extends Controller {
    
    /** @var IConfig */
    private $config;

    public function __construct(string $appName, IRequest $request, IConfig $config) {
        parent::__construct($appName, $request);
        $this->config = $config;
    }

    /**
     * @AdminRequired
     */
    public function setRules(string $rules): DataResponse {
        // Validate JSON
        $decoded = json_decode($rules, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            return new DataResponse([
                'ok' => false, 
                'error' => 'Invalid JSON: ' . json_last_error_msg()
            ], 400);
        }
        
        // Save rules
        $this->config->setAppValue('dolibarrlink', 'rules', $rules);
        
        return new DataResponse(['ok' => true]);
    }
}