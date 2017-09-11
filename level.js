let level;

var Tile = {
    None: -1,
    Empty: 0,
    Wall: 1,
    Crate: 2,
    Slot: 3,
    Start: 4,
    SlotCrate: 5,
};

let map = new Array();

tileXSize = 40;
tileYSize = 40;
margin = 5;

map[0] =  "~~~~#####~~~~~~~~~~";
map[1] =  "~~~~#   #~~~~~~~~~~";
map[2] =  "~~~~#$  #~~~~~~~~~~";
map[3] =  "~~###  $##~~~~~~~~~";
map[4] =  "~~#  $ $ #~~~~~~~~~";
map[5] =  "### # ## #~~~######";
map[6] =  "#   # ## #####  ..#";
map[7] =  "# $  $          ..#";
map[8] =  "##### ### #@##  ..#";
map[9] =  "~~~~#     #########";
map[10] = "~~~~#######~~~~~~~~";

function createLevelFromMap(minos) {
	level = new Array();
	levelHeight = map.length;
	for (i = 0; i < levelHeight; i++) {
		level[i] = new Array();
		levelWidth = map[i].length;
		for (j = 0; j < levelWidth; j++) {
			if (map[i].charAt(j) == "#") {
				level[i][j] = Tile.Wall;
			} else if(map[i].charAt(j) == "~") {
				level[i][j] = Tile.None;
			} else if(map[i].charAt(j) == "$") {
				level[i][j] = Tile.Crate;
			} else if(map[i].charAt(j) == ".") {
				level[i][j] = Tile.Slot;
			} else if(map[i].charAt(j) == "!") {
				level[i][j] = Tile.Sign;
			} else if(map[i].charAt(j) == "@") {
				level[i][j] = Tile.Start;
				minos.x = j;
				minos.y = i;
				minos.direction = Direction.Up;
			} else {
				level[i][j] = Tile.Empty;
			}	
		}
    }
}

var canvasLevel = document.createElement("canvas"),
levelContext = canvasLevel.getContext("2d");
canvasLevel.width = map[0].length * tileXSize;
canvasLevel.height = map.length * tileYSize;
levelContext.strokeStyle = "#FFFFFF";

function drawMap() {
    for (i = 0; i < map.length; i++) {			
        for (j = 0; j < map[i].length; j++) {
            drawTile(j, i);
        }
    }
    canvasContext.drawImage(levelContext.canvas, 0, 0);
}

function drawTile(x, y) {
    switch(level[y][x]){
        case Tile.None:
			drawRectangle(x * tileXSize, y * tileYSize, tileXSize, tileYSize, "#F6F6F6");
			break;
        case Tile.Empty:
		case Tile.Start:
            //drawRectangle(x * tileXSize, y * tileYSize, tileXSize, tileYSize, "#FFFFFF");
            levelContext.drawImage(tileset, 120, 160, 40, 40, x * tileXSize, y * tileYSize, tileXSize, tileYSize);
            break;
        case Tile.Wall:
            //levelContext.drawImage(tileset, 120, 0, 40, 40, x * tileXSize, y * tileYSize, tileXSize, tileYSize);
            drawRectangle(x * tileXSize, y * tileYSize, tileXSize, tileYSize, "#000000");
            break;
        case Tile.Crate:
            levelContext.drawImage(tileset, 120, 40, 40, 40, x * tileXSize, y * tileYSize, tileXSize, tileYSize);
            break;
		case Tile.Slot:
            levelContext.drawImage(tileset, 120, 80, 40, 40, x * tileXSize, y * tileYSize, tileXSize, tileYSize);
			break;
        case Tile.SlotCrate:
            levelContext.drawImage(tileset, 120, 120, 40, 40, x * tileXSize, y * tileYSize, tileXSize, tileYSize);
            break;
    }
}

function drawRectangle(x, y, w, h, c) {
    levelContext.fillStyle = c;
    levelContext.fillRect(x, y, w, h);
}