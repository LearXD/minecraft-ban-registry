<?php

namespace ban\provider;

use ban\EntityBan;
use ban\Main;
use pocketmine\utils\Config;

class ConfigProvider
{

  private static Config $config;

  public function __construct(private Main $main)
  {
    @mkdir($main->getDataFolder());
    self::$config = new Config($main->getDataFolder() . 'data.yml', Config::YAML, array(
      'broadcast-banned' => '§f{player} §3was banned by §a{staff} §3for the reason §7{reason}',
      'player-banned' => "§cYou were banned for §a{staff} §creason: §7{reason}\n§aunban: http://localhost:3000",
      'registry-ban-router' => 'http://localhost:3333/create-banned',
      'listing-ban-router' => 'http://localhost:3333/listing-bans'
    ));
  }

  function getData(string $data): string
  {
    $config = self::$config;
    $data = $config->getAll()[$data];
    return $data;
  }

  function formatMessageBanned(EntityBan $entityBan): string
  {
    $data = self::$config->getAll()['broadcast-banned'];
    $data = str_replace(
      ['{player}', '{staff}', '{reason}'],
      [
        $entityBan->player_nick, $entityBan->staff_nick, $entityBan->reason
      ],
      $data
    );

    return $data;
  }

  function formatMessageKick(EntityBan $entityBan): string
  {
    $data = self::$config->getAll()['player-banned'];
    $data = str_replace(
      ['{staff}', '{reason}'],
      [
        $entityBan->staff_nick, $entityBan->reason
      ],
      $data
    );

    return $data;
  }

  function getRouterRegistryBan(): string
  {
    $data = self::$config->getAll()['registry-ban-router'];

    return $data;
  }

  function getRouterListingBan(): string
  {
    $data = self::$config->getAll()['listing-ban-router'];

    return $data;
  }
}
