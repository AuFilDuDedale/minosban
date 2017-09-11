let moves = 0;

let tileset = new Image();
tileset.src = "minos.png";

let eventkeys = [37, 38, 39, 40, 90, 81, 68, 83];

let win = false;

window.onload = function() {
    minosban_init();
};

function minosban_init() {
    canvas = document.getElementById("sokoban_canvas");
    canvasContext = canvas.getContext("2d");

    window.addEventListener(
        "keydown",
        function(e) {
            if (eventkeys.includes(e.keyCode)) {
                e.preventDefault();
                switch (e.keyCode) {
                    case 38:
                    case 90:
                        moveUp();
                        break;	
                    case 37: 
                    case 81:
                        moveLeft();
                        break;
                    case 39:
                    case 68: 
                        moveRight();
                        break;
                    case 40:
                    case 83: 
                        moveDown();
                        break;
                }
                draw();
            }
        },
        true
    );

    var rejouer = document.getElementById("rejouer_button");
    rejouer.onclick = function() {
        reload();
    }

    reload();
}

function reload() {
    moves = 0;
    win = false;

    document.getElementById("gagne").style.visibility = 'invisible';
    document.getElementById("gagne").style.display = 'none';
    document.getElementById("perdu").style.visibility = 'invisible';
    document.getElementById("perdu").style.display = 'none';

    createLevelFromMap(pacman);
    draw();
}

function checkForWin() {
    for (i = 0; i < map.length; i++) {			
        for (j = 0; j < map[i].length; j++) {
            if (level[i][j] == Tile.Slot) return false;
        }
    }
    return true;
}

function draw() {
    if (checkForWin()) {
        if (moves < 300) {
            win = true;
            document.getElementById("gagne").style.visibility = 'visible';
            document.getElementById("gagne").style.display = 'block';
        } else {
            document.getElementById("perdu").style.visibility = 'visible';
            document.getElementById("perdu").style.display = 'block';
        }
    }
	
    canvasContext.fillStyle = "#FFFFFF";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    drawMoves();
    drawMap();
    drawMinos();
}

function drawMoves() {
    document.getElementById("moves").innerHTML = moves;
}

function moveUp() {
    if (pacman.y - 1 > 0 && level[pacman.y - 1][pacman.x] != Tile.Wall && level[pacman.y - 1][pacman.x] < 6) {
        if (level[pacman.y - 1][pacman.x] == Tile.Crate ||
            level[pacman.y - 1][pacman.x] == Tile.SlotCrate) {
            if (level[pacman.y - 2][pacman.x] == Tile.Wall ||
                level[pacman.y - 2][pacman.x] == Tile.Crate ||
                level[pacman.y - 2][pacman.x] == Tile.SlotCrate) {
                // Do nothing
            } else {
                level[pacman.y - 1][pacman.x] = map[pacman.y - 1].charAt(pacman.x) == '.' ? Tile.Slot : Tile.Empty;
                level[pacman.y - 2][pacman.x] = map[pacman.y - 2].charAt(pacman.x) == '.' ? Tile.SlotCrate : Tile.Crate;
                pacman.y -= 1;
		moves += 1;
            }
        } else {
            pacman.y -= 1;
	    moves += 1;
        }
    }
    pacman.direction = Direction.Up;
}

function moveDown() {
    if (pacman.y + 1 < level.length && level[pacman.y + 1][pacman.x] != Tile.Wall && level[pacman.y + 1][pacman.x] < 6) {
        if (level[pacman.y + 1][pacman.x] == Tile.Crate ||
            level[pacman.y + 1][pacman.x] == Tile.SlotCrate) {
            if (level[pacman.y + 2][pacman.x] == Tile.Wall ||
                level[pacman.y + 2][pacman.x] == Tile.Crate ||
                level[pacman.y + 2][pacman.x] == Tile.SlotCrate) {
                // Do nothing
            } else {
                level[pacman.y + 1][pacman.x] = map[pacman.y + 1].charAt(pacman.x) == '.' ? Tile.Slot : Tile.Empty;
                level[pacman.y + 2][pacman.x] = map[pacman.y + 2].charAt(pacman.x) == '.' ? Tile.SlotCrate : Tile.Crate;
                pacman.y += 1;
		moves += 1;
            }
        } else {
            pacman.y += 1;
	    moves += 1;
        }
        
    }
    pacman.direction = Direction.Down;
}

function moveLeft() {
    if (pacman.x - 1 > 0 && level[pacman.y][pacman.x - 1] != Tile.Wall && level[pacman.y][pacman.x - 1] < 6) {
        if (level[pacman.y][pacman.x - 1] == Tile.Crate ||
            level[pacman.y][pacman.x - 1] == Tile.SlotCrate) {
            if (level[pacman.y][pacman.x - 2] == Tile.Wall ||
                level[pacman.y][pacman.x - 2] == Tile.Crate ||
                level[pacman.y][pacman.x - 2] == Tile.SlotCrate) {
                // Do nothing
            } else {
                level[pacman.y][pacman.x - 1] = map[pacman.y].charAt(pacman.x - 1) == '.' ? Tile.Slot : Tile.Empty;
                level[pacman.y][pacman.x - 2] = map[pacman.y].charAt(pacman.x - 2) == '.' ? Tile.SlotCrate : Tile.Crate;
                pacman.x -= 1;
		moves += 1;
            }
        } else {
            pacman.x -= 1;
	    moves += 1;
        }
        
    }
    pacman.direction = Direction.Left;
}

function moveRight() {
    if (pacman.x + 1 < level[pacman.y].length && level[pacman.y][pacman.x + 1] != Tile.Wall && level[pacman.y][pacman.x + 1] < 6) {
        if (level[pacman.y][pacman.x + 1] == Tile.Crate ||
            level[pacman.y][pacman.x + 1] == Tile.SlotCrate) {
            if (level[pacman.y][pacman.x + 2] == Tile.Wall ||
                level[pacman.y][pacman.x + 2] == Tile.Crate ||
                level[pacman.y][pacman.x + 2] == Tile.SlotCrate) {
                // Do nothing
            } else {
                level[pacman.y][pacman.x + 1] = map[pacman.y].charAt(pacman.x + 1) == '.' ? Tile.Slot : Tile.Empty;
                level[pacman.y][pacman.x + 2] = map[pacman.y].charAt(pacman.x + 2) == '.' ? Tile.SlotCrate : Tile.Crate;
                pacman.x += 1;
		moves += 1;
            }
        } else {
            pacman.x += 1;
	    moves += 1;
        }
        
    }
    pacman.direction = Direction.Right;
}
