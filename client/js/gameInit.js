var preload = function() {
  game.load.image('chicken', 'assets/chicken.jpg')
};

var create = function() {
  game.add.sprite(0, 0, 'chicken');
};

var update = function() {

};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas', { preload: preload, create: create, update: update });
