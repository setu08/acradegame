// Player starting point
var PLAYER_START_X = 300;
var PLAYER_START_Y = 400;

// Enemies
var Enemy = function(enemyX, enemyY, enemySpeed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = enemyX;
    this.y = enemyY;
    this.speed = enemySpeed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    var spaceSize = 60;

    // Putting the enemies with different speeds
    if (this.x >= 500) {
        this.x = -spaceSize;
        this.speed = spaceSize * Math.floor(Math.random() * 7 + 2);
    }

    var minX = this.x - spaceSize;
    var maxX = this.x + spaceSize;
    var minY = this.y - spaceSize;
    var maxY = this.y + spaceSize;

    if ((player.update(player.x, minX, maxX)) &&
        (player.update(player.y, minY, maxY))) {
        player.x = PLAYER_START_X;
        player.y = PLAYER_START_Y;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Play initial place coordinate
    this.x = PLAYER_START_X;
    this.y = PLAYER_START_Y;
    this.sprite = 'images/char-boy.png';
};

// Update the player position, required method for game, checking if the enemy and player are coliding
Player.prototype.update = function(x, min, max) {
    // console.log(x, min, max, x >= min && x <= max);
    return x >= min && x <= max;
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keyPressed) {
    // Listening to keyPressed 'left', 'up', 'right', 'down'
    var spaceX = 100;
    var spaceY = 90;

    // console.log(this.y + ' ' + keyPressed + ' ' + this.x + ' ' + this.y);
    if (keyPressed === 'left' && this.x !== 0) {
        this.x -= spaceX;
    } else if (keyPressed === 'right' && this.x !== 400) {
        this.x += spaceX;
    } else if (keyPressed === 'up') {
        if (this.y === 40) {
            // Starting over
            this.x = PLAYER_START_X;
            this.y = PLAYER_START_Y;
        } else {
            this.y -= spaceY;
        }
    } else if (keyPressed === 'down' && this.y !== 400) {
        this.y += spaceY;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

// Adding  Enemies
for (var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy(-60, 60 + 85 * i, Math.floor(Math.random() * 5 + 1) * 75));
}

// Starting the game
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
