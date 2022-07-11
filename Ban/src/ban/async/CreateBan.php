<?php

namespace ban\async;

use ban\EntityBan;
use ban\Main;
use ban\skin\SkinAPI;
use CURLFile;
use pocketmine\player\Player;
use pocketmine\scheduler\AsyncTask;
use pocketmine\Server;
use stdClass;

class CreateBan extends AsyncTask
{

  private string $dir;

  public function __construct(
    private EntityBan $entity,
    private string $data,
    private string $router = 'http://localhost:3333/create-banned',
  ) {
    $this->dir = Main::getInstance()->getSkinDir() . "{$this->entity->player_nick}.png";
  }

  public function onRun(): void
  {
    $skin = SkinAPI::createSkinImage($this->data, $this->dir);
    imagepng($skin, $this->dir);
    try {
      $payload = array(
        'file' => curl_file_create($this->dir),
        "player_nick" => $this->entity->player_nick,
        "player_xuid" => $this->entity->player_xuid,
        "reason" => $this->entity->reason,
        "staff_nick" => $this->entity->staff_nick, 
        "staff_xuid" => $this->entity->staff_xuid,
        "date" => $this->entity->date,
        "banned" => $this->entity->banned
      );

      $curl = curl_init($this->router);

      curl_setopt($curl, CURLOPT_POST, true);
      curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
      curl_setopt($curl, CURLOPT_POSTFIELDS, $payload);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($curl, CURLOPT_HTTPHEADER, array(        
        'Content-Type:multipart/form-data',
        'Content-Type: application/json'
      ));      

      $result = curl_exec($curl);      

      /** @var stdClass */
      $std = json_decode($result);

      $this->setResult($std->sucess);      

      @unlink($this->dir);

    } catch (\Throwable $th) {
      echo $th;
    }
  }

  function onCompletion(): void
  {

    $config = Main::getInstance()->getConfigProvider();

    /** Messages */
    $broadcast_banned = $config->formatMessageBanned($this->entity);
    $kick_message = $config->formatMessageKick($this->entity);

    /** Server instance */
    $server = Server::getInstance();

    $staff = $server->getPlayerExact($this->entity->staff_nick);
    $player = $server->getPlayerExact($this->entity->player_nick);

    /** Result */
    $result = $this->getResult();

    if ($staff instanceof Player) {
      if ($result) {

        $server->broadcastMessage($broadcast_banned);

        if ($player instanceof Player) {
          $player->kick($kick_message);
        }
      } else {
        $staff->sendMessage("§ePlayer already banned");
      }
    }
  }
}
