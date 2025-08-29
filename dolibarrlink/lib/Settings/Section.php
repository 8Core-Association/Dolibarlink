<?php
namespace OCA\DolibarrLink\Settings;

use OCP\Settings\ISection;

class Section implements ISection {
    public function getID(): string { return 'dolibarrlink'; }
    public function getName(): string { return 'Dolibarr Link'; }
    public function getPriority(): int { return 50; }
    public function getIcon(): ?string { return ''; }
}
