<?php

namespace ban\skin;

use ban\Main;
use pocketmine\Server;
use pocketmine\utils\BinaryStream;

class SkinAPI
{
  // https://github.com/pmmp/PocketMine-MP/blob/a19143cae76ad55f1bdc2f39ad007b1fc170980b/src/pocketmine/entity/Skin.php#L33-L37
  public const ACCEPTED_SKIN_SIZES = [
    64 * 32 * 4,
    64 * 64 * 4,
    128 * 128 * 4
  ];

  public static function validateSize(int $size): bool
  {
    return in_array($size, self::ACCEPTED_SKIN_SIZES);
  }

  public static function createSkinImage(string $data)
  {
    $data = substr($data, ($pos = (64 * 8 * 4)), $pos);
    $maxX = 8;
    $maxY = 8;
    $image = imagecreatetruecolor(8, 8);
    for ($x = 0; $x < $maxX; $x++) {
      for ($y = 0; $y < $maxY; $y++) {
        $key = ((64 * $y) + 8+ $x) * 4;
        $r = ord($data[$key]);
        $g = ord($data[$key + 1]);
        $b = ord($data[$key + 2]);

        $color = imagecolorallocatealpha($image, $r, $g, $b, 0);
        imagesetpixel($image, $x, $y, $color);
      }
    }
    $new = imagecreate(64, 64);
    imagecopyresampled($new, $image, 0, 0 ,0, 0, 64, 64, 8, 8);
    imagedestroy($image);    
    imagedestroy($new);    
    return $new;
  }
}
