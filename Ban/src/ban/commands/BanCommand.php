<?php

namespace ban\commands;

use ban\async\CreateBan;
use ban\EntityBan;
use ban\Main;
use pocketmine\command\Command;
use pocketmine\command\CommandSender;
use pocketmine\player\Player;

class BanCommand extends Command
{

  const PREFIX = "§l§4§oBANNED §r§f";

  function execute(CommandSender $sender, string $commandLabel, array $args)
  {
    if (count($args) < 1) {
      $sender->sendMessage(self::PREFIX . "/banir <player> <reason> §7for ban a player");
      return;
    }

    $player = $sender->getServer()->getPlayerExact($args[0]);

    if (!$sender instanceof Player) {
      echo "\nThis command can only be used within the game\n\n";
      return;
    }

    if ($player instanceof Player) {


      $dir = Main::getInstance()->getSkinDir() . "/" . strtolower($player->getName()) . ".png";

      if ($player->hasPermission(Main::PERMISSION_NOTBAN)) {
        $sender->sendMessage(self::PREFIX . "You cannot ban this player");
        $player->sendMessage(self::PREFIX . "{$sender->getName()} tried to ban");
        return;
      }

      unset($args[0]);
      $reason = implode(" ", $args);

      date_default_timezone_set('America/Sao_Paulo');

      $date = date('d/m/Y', time());
      $time = date('G:i', time());      

      $ban = new EntityBan(
        $player->getName(),
        $player->getXuid(),
        $dir,
        $reason,                
        $sender->getName(),
        $sender->getXuid(),
        "$date - $time",
        true
      );

      $sender->getServer()->getAsyncPool()->submitTask(new CreateBan(
        $ban,        
        $player->getSkin()->getSkinData(),
        Main::getInstance()->getConfigProvider()->getRouterRegistryBan(),
      ));
    } else {

      $sender->sendMessage(self::PREFIX . "Player not found");
    }
  }
}
