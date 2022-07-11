<?php

namespace ban;

use pocketmine\player\Player;

class EntityBan
{
  public function __construct(
    public string $player_nick,
    public string $player_xuid,
    public string $player_skin_dir,
    public string $reason,
    public string $staff_nick,
    public string $staff_xuid,
    public string $date,    
    public bool $banned,    
  ) {
  }
}