var Direction = {
    Up: 0,
    Left: 1,
    Right: 2,
    Down: 3
};

let pacman = 
{
    x: 0,
    y: 0,
    clipX: 40,
    clipY: 0,
    direction: Direction.Up
};

function drawMinos() {
    let canvasPacman = document.createElement("canvas");
    let pacmanContext = canvasPacman.getContext("2d");
    canvasPacman.width = canvasPacman.height = 40;

    pacman.clipX = 40;
    switch (pacman.direction) {
    case Direction.Up:
        pacman.clipY = 40;
        break;
    case Direction.Right:
        pacman.clipY = 120;
        break;
    case Direction.Down:
        pacman.clipY = 0;
        break;
    case Direction.Left:
        pacman.clipY = 80;
        break;
    }
	if (win) pacman.clipY = 160;

    pacmanContext.drawImage(tileset, pacman.clipX, pacman.clipY, 40, 40, 0, 0, 30, 30);
    canvasContext.drawImage(pacmanContext.canvas, (pacman.x * tileXSize) + margin, (pacman.y * tileYSize) + margin);
}