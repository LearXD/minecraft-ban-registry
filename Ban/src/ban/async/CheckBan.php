<?php

namespace ban\async;

use ban\EntityBan;
use ban\Main;
use pocketmine\player\Player;
use pocketmine\scheduler\AsyncTask;
use pocketmine\Server;
use stdClass;
use Throwable;

class CheckBan extends AsyncTask
{
  public function __construct(
    private string $name,
    private string $xuid,
    private string $router = "http://localhost:3333/listing-bans"
  ) {
  }

  function onRun(): void
  { 

    try {
      $curl = curl_init($this->router);

      curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        "Accept: application/json"
      ));

      $result = curl_exec($curl);
      curl_close($curl);

      /** @var stdClass */
      $std = json_decode($result);

      for ($id = 0; $id < count($std->listing); $id++) {
        if (
          ($std->listing[$id]->player_xuid == $this->xuid or $std->listing[$id]->player_nick == $this->name)
          and $std->listing[$id]->banned
        ) {
          $this->setResult($std->listing[$id]);
        }
      }
    } catch (Throwable $th) {
    }
  }

  function onCompletion(): void
  {
    if ($this->getResult()) {

      $server = Server::getInstance();
      $main = Main::getInstance();
      $player = $server->getPlayerExact($this->name);

      if ($player instanceof Player) {

        $ban = new EntityBan(
          $this->getResult()->player_nick,
          $this->getResult()->player_xuid,
          '',
          '',
          $this->getResult()->reason,
          $this->getResult()->staff_nick,
          $this->getResult()->staff_xuid,
          $this->getResult()->date,
          $this->getResult()->banned,
        );

        $player->kick($main->getConfigProvider()->formatMessageKick($ban));
      }
    }
  }
}
