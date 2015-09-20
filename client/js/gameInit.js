var platforms;
var player;
var corn;
var cursors;

var preload = function() {
  game.load.image('chicken', 'assets/chicken.png');
  game.load.image('ground', 'assets/platform.png');
  game.load.image('sky', 'assets/sky.jpg');
  game.load.image('kernel', 'assets/corn.png');    
  //load spritesheet differently
  // game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
};

var create = function() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.add.sprite(0, 0, 'sky');

  //can group together similar objects
  platforms = game.add.group();
  platforms.enableBody = true;

  //create the ground
  var ground = platforms.create(0, game.world.height - 64, 'ground');
  ground.scale.setTo(2, 2);
  //if not immovable, platform would fall when player collided on it
  ground.body.immovable = true;

  //creates ledges
  var ledge1 = platforms.create(400, 400, 'ground');
  ledge1.body.immovable = true;

  ledge2 = platforms.create(-150, 250, 'ground');
  ledge2.body.immovable = true;

  player = game.add.sprite(10, 120, 'chicken');
  game.physics.arcade.enable(player);
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;

  //can add animations if sprite
  // player.animations.add('left', [0, 1, 2, 3], 10, true);
  // player.animations.add('right', [5, 6, 7, 8], 10, true);


  corn = game.add.group();
  corn.enableBody = true;
  for (var i = 0; i < 12; i++) {
      //  Create a kernel inside of the 'corn' group
      var kernel = corn.create(i * 70, 0, 'kernel');

      //  Let gravity do its thing
      kernel.body.gravity.y = 6;

      //  This just gives each kernel a slightly random bounce value
      kernel.body.bounce.y = 0.7 + Math.random() * 0.2;
  }

  //add input controls
  cursors = game.input.keyboard.createCursorKeys();
};

var collectKernel = function(player, kernel) {
  kernel.kill();
};

var update = function() {
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.collide(corn, platforms);
  game.physics.arcade.overlap(player, corn, collectKernel, null, this);
  
  //clears velocity every frame
  player.body.velocity.x = 0;
  
  if (cursors.left.isDown) {
      //  Move to the left
      player.body.velocity.x = -150;
      
      // player.animations.play('left');
  } else if (cursors.right.isDown) {
      //  Move to the right
      player.body.velocity.x = 150;
      
      // player.animations.play('right');
  } else {
      player.animations.stop();
      
      // player.frame = 4;
  }
  
  //  Allow the player to jump if they are touching the ground.
  if (cursors.up.isDown && player.body.touching.down) {
      player.body.velocity.y = -350;
  }

};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas', { preload: preload, create: create, update: update });
