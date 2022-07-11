<?php

namespace ban;

use ban\commands\BanCommand;
use ban\events\Check;
use ban\provider\ConfigProvider;
use pocketmine\command\Command;
use pocketmine\plugin\PluginBase;

class Main extends PluginBase
{

  public const PERMISSION_NOTBAN = 'notban';

  public static Main $instance;

  function onEnable(): void
  {
    self::$instance = $this;
    $this->registerCommands(new BanCommand('banir', 'ban a player'));
    $this->getServer()->getPluginManager()->registerEvents(new Check($this->getServer()), $this);
    
    foreach (scandir($this->getSkinDir()) as $file) {
      if ($file != '.' and $file != '..')
        @unlink($this->getSkinDir() . $file);
    }
  }

  public static function getInstance(): self
  {
    return self::$instance;
  }

  function getSkinDir(): string
  {
    @mkdir($this->getDataFolder() . 'tmp');
    return $this->getDataFolder() . 'tmp/';
  }

  function registerCommands(Command $command): void
  {
    $this->getServer()->getCommandMap()->register('Ban', $command);
  }

  public function getConfigProvider(): ConfigProvider
  {
    return new ConfigProvider($this);
  }
}
