<?php

namespace ban\events;

use ban\async\CheckBan;
use ban\Main;
use ban\skin\SkinAPI;
use pocketmine\console\ConsoleCommandSender;
use pocketmine\event\Listener;
use pocketmine\event\player\PlayerJoinEvent;
use pocketmine\Server;

class Check implements Listener
{

  public function __construct(
    private Server $server
  ) {
  }

  function onJoin(PlayerJoinEvent $event)
  {
    $player = $event->getPlayer();        

    if ($player->hasPermission(Main::PERMISSION_NOTBAN)) {
      return;
    }

    $this->server->getAsyncPool()->submitTask(new CheckBan(
      $player->getName(),
      $player->getXuid(),
      Main::getInstance()->getConfigProvider()->getRouterListingBan()
    ));
  }
}
