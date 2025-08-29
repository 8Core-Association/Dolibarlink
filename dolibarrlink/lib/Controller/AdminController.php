<?php
namespace OCA\DolibarrLink\Controller;

use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;
use OCP\IConfig;

class AdminController extends Controller {
    public function __construct(string $appName, IRequest $request, private IConfig $config) {
        parent::__construct($appName, $request);
    }

    /** @AdminRequired @CSRFRequired */
    public function setRules(string $rules): DataResponse {
        json_decode($rules, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            return new DataResponse(['ok' => false, 'error' => 'Invalid JSON'], 400);
        }
        $this->config->setAppValue('dolibarrlink', 'rules', $rules);
        return new DataResponse(['ok' => true]);
    }
}
