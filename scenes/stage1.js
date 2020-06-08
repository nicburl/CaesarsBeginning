class Stage1 extends Phaser.Scene {
  constructor () {
    super('Stage1');
  }
//Next steps: locational spawning of enemies, bigger and taller Tilemap, enemy behavior
  preload () {

    this.load.image('lvl1','assets/Tilemap.png');
    this.load.spritesheet('Caesar' , 'assets/Caesar.png' , { frameWidth: 32, frameHeight: 32});
    this.load.spritesheet('BadGuy' , 'assets/Bad Guy.png' , { frameWidth: 48, frameHeight: 48});
    this.load.spritesheet('Bullet','assets/Bullet.png', { frameWidth: 10, frameHeight: 10});
    this.load.spritesheet('Spear','assets/Spike.png', { frameWidth: 45, frameHeight: 45});
    this.load.spritesheet('knife','assets/Knife 2.png',{ frameWidth: 45,frameHeight: 30});
    this.cameras.main.setSize(800, 600);

  }
//git add -A, git commit -m "new update", git push


  create () {

//collision with worldbounds and Knife
        this.physics.world.on('worldbounds', function(thing){
          console.log(thing.gameObject.specialTitle)
          if (thing.gameObject.specialTitle === 'knife'){
            thing.gameObject.destroy();
          }
          });

          // this.physics.world.on('knife', function(thing){
          //   console.log(thing.gameObject.specialTitle)
          //   if (thing.gameObject.specialTitle === 'Caesar'){
          //     thing.gameObject.destroy();
          //   }
          //   });
        // this.cameras.main.setBounds(0,0,800,1920);
        // this.iter = 3.14;
        // this.score = 23
        // this.scoreText = this.add.text(16, 16, 'Knifes left: 23', {fontSize: '48px',fill: '#000'});

    //Tilemap code
        this.map= this.make.tilemap({ data: maps[0], tileWidth : 25, tileHeight: 25});
        this.tiles = this.map.addTilesetImage("lvl1", null, 25, 25, 0, 0);
        this.layer = this.map.createDynamicLayer(0, this.tiles, 0, 0);
        this.map.setCollision([1, 2, 3, 4, 5, 6, 7, 8, 9,10,11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,22,23,25, 26])

         this.cameras.main.centerOn(0, 0);



    //Keyboard inputs
        this.player = this.physics.add.sprite(100, 1800, 'Caesar');
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors.w = this.input.keyboard.addKey('W');
        this.cursors.d = this.input.keyboard.addKey('D');
        this.cursors.right = this.input.keyboard.addKey('right');
        this.cursors.knife = this.input.keyboard.addKey('attack');
        this.cursors.s = this.input.keyboard.addKey('S');
        this.cursors.up = this.input.keyboard.addKey('up');

        this.player.setScale(2);

        this.player.setSize(16,22,0,0).setOffset(8,4);

        this.player.setCollideWorldBounds(true);

        this.cameras.main.startFollow(this.player);

        this.cameras.main.startFollow(this.player, false, 0.1, 0.1);

        let enemyMove = this.time.addEvent({
          delay:500,
          callback: this.moveEnemies,
          callbackScope: this,
          loop: true

        });

        this.enemies = this.add.group({
          key: 'enemy'
        });

        console.log("I was")
        this.knife = this.add.group({
            //add a groups for bullets that can be summoned by the enemies
            key: 'knife',
            collideWorldBounds: true
          });

//Creating the enemy knife
          this.createKnife = this.time.addEvent({delay:1000,callback: function(){
            Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
              let tempKnife = this.physics.add.sprite(enemy.x,enemy.y,"knife")
              tempKnife.body.setAllowGravity(false);
              tempKnife.body.onWorldBounds = true;
              tempKnife.specialTitle = 'knife';
              tempKnife.setVelocityX(-200);
              tempKnife.setVelocityY(5);
              tempKnife.setCollideWorldBounds(true);
              tempKnife.setSize(30,30);
              tempKnife.setScale(2);
              }, this);
          }, callbackScope: this, loop: true})


          this.player.specialTitle = 'Caesar';

          // this.hitPlayer(player,knife){
          //     knife.destroy();
          //     player.destroy();
          //   };

          //Attempt at more randomized enemy attack
          // createKnife(){
          //   let tempEnemy = this.enemies.getChildren();
          //   for (var i = 0; i < tempEnemy.length; i++){
          //     let randEmy = Phaser.Math.Between(0, 9);
          //     if (1 == randEnemy){
          //
          //       let tempLazer = this.physics.add.sprite(tempEnemy[i].x, tempEnemy[i].y, 'knife')
          //       tempKnife.body.setAllowGravity(false)
          //       tempKnife.setCollideWorldBounds(true);
          //       tempKnife.setSize(30, 30);
          //       tempKnife.body.onWorldBounds = true;
          //       tempKnife.specialTitle = 'knife';
          //       this.knife.add(tempKnife);
          //
          //       let currentPoint = new Phaser.Geom.Point(tempKnife.x, tempKnife.y);
          //       let pointToMoveTo = new Phaser.Geom.Point(this.player.x, this.player.y);
          //       tempLazer rotation = Phaser.Math.Angle.BetweenPoints(currentPoint, pointToMoveTo);
          //       let randomX = Phaser.Math.Between(-100, 100);
          //       let randomY = Phaser.Math.Between(-100, 100);
          //       this.physics.moveTo(tempKnife,this.player.x,this.player.y, 200);
          //     }
          //   }
          // };

          //Failed Player spear attack code
        //   this.createMultiple({
    		// 	classType: Spear, // This is the class we create just below
    		// 	frameQuantity: 30, // Create 30 instances in the pool
    		// 	active: false,
    		// 	visible: false,
    		// 	key: 'Spear'
    		// })

    //https://www.codecaptain.io/blog/game-development/shooting-bullets-phaser-3-using-arcade-physics-groups/696
        // constructor() {
        // 		// ...
        // 		this.spearGroup;
        // 	}
        //
        // 	// ...
        //
        //
        // 		// ...
        // 		this.spearGroup = new spearGroup(this);
        // 		this.addEvents();
        //
        //
        //   addEvents() {
        //   	// ...
        //   	this.input.on('pointerdown', pointer => {
        //   		this.shootSpear();
        //   	});
        //   }
        //
        //   class SpearGroup extends Phaser.Physics.Arcade.Group
        //   {
        //   	// ...
        //   	fireSpear(x, y) {
        //   		// Get the first available sprite in the group
        //   		const Spear = this.getFirstDead(false);
        //   		if (Spear) {
        //   			Spear.fire(x, y);
        //   		}
        //   	}
        //   }
        //   class Spear extends Phaser.Physics.Arcade.Sprite {
        //
        //   	// ...
        //   	fire(x, y) {
        //   		this.body.reset(x, y);
        //
        //   		this.setActive(true);
        //   		this.setVisible(true);
        //
        //   		this.setVelocityY(-900);
        //   	}
        //
        //   }
        //
        //   class Spear extends Phaser.Physics.Arcade.Sprite {
        //   	// ...
        //   	preUpdate(time, delta) {
        //   		super.preUpdate(time, delta);
        //
        //   		if (this.y <= 0) {
        //   			this.setActive(false);
        //   			this.setVisible(false);
        //   		}
        //   	}
        //
        //   }
        //
        //   class SpaceScene extends Phaser.Scene
        //   {
        //   	constructor() {
        //   		// ...
        //   		this.inputKeys;
        //   	}
        //
        //   	// ...
        //   	addEvents() {
        //   		this.inputKeys = [
        //   			this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
        //   			this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
        //   		];
        //   	}
        //
        //   	// ...
        //
        //   	update() {
        //   		// Loop over all keys
        //   		this.inputKeys.forEach(key => {
        //   			// If key was just pressed down, shoot the Spear. We use JustDown to make sure this only fires once.
        //   			if (Phaser.Input.Keyboard.JustDown(key)) {
        //   				this.shootSpear();
        //   			}
        //   		});
        //   	}
       //}


        for (var a = 0; a < 8; a++)
          {
            let tempEnemy = this.physics.add.sprite(Math.random()*1600+200, Math.random()*1600+200, 'BadGuy');
            this.enemies.add(tempEnemy);
            // old generation = Math.random()*500+100, Math.random()*500+100
            //400,500,
            tempEnemy.setSize(40,50);
            tempEnemy.body.setAllowGravity(true);
            tempEnemy.setCollideWorldBounds(false);
            //tempEnemy.setVelocityX(-50);
          }

        //creating a destructable tile
        this.temp = this.map.filterTiles(function (tile) {
           return (tile.index === 26);
        });
        // this.physics.world.overLapTiles(this.player, this.temp, function(player, temp){
        // 	temp.destroy();
        // }, null, this);



    //Animations
            this.anims.create({
                  key:'right',
                  frames: this.anims.generateFrameNumbers('Caesar', { start: 22, end: 26}),
                  frameRate: 11,
                  repeat: -1
                });

            this.anims.create({
                  key:'attack',
                  frames: this.anims.generateFrameNumbers('BadGuy', { start: 10, end: 12}),
                      frameRate: 11,
                      repeat: -1
                    });

            this.anims.create({
                  key: 'turn',
                  frames: [ { key: 'bro', frame: 0 } ],
                  frameRate: 20,
                  repeat: -1
                });

            this.anims.create({
              frames: this.anims.generateFrameNumbers('Caesar', { start: 57, end: 62}),
              frameRate: 11,
              repeat: -1

            });

            this.anims.create({
                  key:'left',
                  frames: this.anims.generateFrameNumbers('Caesar', { start: 57, end: 61}),
                  frameRate: 11,
                  repeat: -1
                    });
              this.anims.create({
                  key:'up',
                  frames: this.anims.generateFrameNumbers('Caesar', { start: 24, end: 26}),
                  frameRate: 8,
                  repeat: -1
                });

              this.anims.create({
                    key:'w',
                    frames: this.anims.generateFrameNumbers('Caesar', { start: 10, end: 18}),
                    frameRate: 15,
                    repeat: -1
                  });
                this.anims.create({
                    key:'d',
                    frames: this.anims.generateFrameNumbers('Caesar', { start: 27, end: 35}),
                    frameRate: 13,
                    repeat: -1
                  });
                this.anims.create({
                    key:'s',
                    frames: this.anims.generateFrameNumbers('Caesar', { start: 18, end: 21}),
                    frameRate: 10,
                    repeat: -1
                      });
                this.anims.create({
                    key:'die',
                    frames: this.anims.generateFrameNumbers('Caesar', { start: 0, end: 4}),
                    frameRate: 10,
                    repeat: -1,
                    });

                // this.anims.create({
                //   key:'attack',
                //   frames: this.anims.generateFrameNumbers('BadGuy', { start: 14, end: 16}),
                //   frameRate: 10,
                //   repeat: -1
                // });



        //colliders
        this.physics.add.collider(this.player, this.layer);
        this.physics.add.collider(this.enemies, this.layer);
        this.physics.add.collider(this.enemies, this.enemies);
        this.physics.add.collider(this.player, this.enemies);
        this.physics.add.collider(this.player, this.tempKnife, this.hitPlayer,null, this);
        this.physics.add.collider(this.layer, this.tempLnife, function(layer, tempKnife){
          knife.destroy();
        });


  };




update(){

//    this.player.setVelocityY(0);
    this.player.setVelocityX(0);
//    this.player.anims.play('turn', true);

    if (this.cursors.up.isDown && this.player.body.onFloor()) //&& this.player.body.onFloor()
    {
      this.player.setVelocityY(-330);
    }

    if (this.cursors.right.isDown)
       {
      this.player.setVelocityX(160);

      this.player.anims.play('right', true);
    }

    else if (this.cursors.left.isDown)
    {
      this.player.setVelocityX(-160);

      this.player.anims.play('left', true);
    }
    else {
      this.player.setVelocityX(0);

      //this.player.anims.play('turn', true);

    }






//ways to trigger an enemies attack: collision and line of sight (maybe the x position lines up with an enemies)

    // if (this.cursors.attack.isDown)
    // {
    //   this.enemy.anims.play('attack',true);
    //
    // }

//controls
    if (this.cursors.w.isDown)
    {
      this.player.setVelocityX(0);

      this.player.anims.play('w', true);
    }

    if (this.cursors.d.isDown)
    {
      this.player.setVelocityX(0);

      this.player.anims.play('d', true);
    }

    if (this.cursors.s.isDown)
    {
      this.player.setVelocityX(0);

      this.player.anims.play('s', true);
    }



    // this.score -= 1;
    // this.scoreText.setText('Knifes left: ' + this.score);

    // if (this.physics.world.overLapTiles(this.player, this.enemy))
    // {
    //   this.player.anims.play()
    //
    // }


    // else{
    //   this.player.setVelocityX(0);
    //
    //   this.player.anims.play('turn', true);
    // }
    //this.physics.world.overlapTiles(this.player, this.spkies, this.hitSpike, null, this);
    //hitSpike(player, spike){ console.log("OUCH"); }
  }
};
