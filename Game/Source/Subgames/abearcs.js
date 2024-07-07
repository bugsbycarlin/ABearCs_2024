//
// This file contains the one and only screen for ABearCs.
// This is the meat of the game.
//
// Copyright 2024 Alpha Zoo LLC.
// Written by Matthew Carlin
//




class Display extends Screen {
  // Set up the screen
  initialize(game_width, game_height) {
    this.state = null;

    shakers = [];

    this.layers = {};
    let layers = this.layers;

    this.soundQueue = [];

    this.busy_time = 200;
    this.letter_delay = 200;
    this.word_delay = 1000;

    this.last_letter = null;
    this.last_picture = null;

    this.game_width = game_width;
    this.game_height = game_height;

    layers["picture"] = new PIXI.Container();
    this.addChild(layers["picture"]);

    layers["letter"] = new PIXI.Container();
    this.addChild(layers["letter"]);

    this.letter_font = {fontFamily: "Bebasneue Regular", fontSize: 192, fontWeight: 200, fill: 0x000000, letterSpacing: 1, align: "left"};
    this.word_font = {fontFamily: "Bebasneue Regular", fontSize: 144, fontWeight: 200, fill: 0x000000, letterSpacing: 1, align: "left"};

    // this.picture = makeSprite("phone_0", layers["picture"], game_width * 0.666, game_height * 0.5, 0.5, 0.5)

    this.letter_text = makeText("", this.letter_font, layers["letter"], game_width * 0.20, game_height * 0.30, 0.5, 0.5);
    this.word_text = makeText("", this.word_font, layers["letter"], game_width * 0.20, game_height * 0.70, 0.5, 0.5);

    // this.initializeAddBox();

    this.state = "ready";

    this.choosePicture(pick(lower_array))
  }


  // initializeAddBox() {
  //   let layers = this.layers;

  // }

  stateCheck(check_state="ready") {
    return this.state == check_state;
  }



  keyDown(ev) {
    let key = ev.key;

    for (i in lower_array) {
      if (key === lower_array[i] || key === letter_array[i]) {
        if (key != this.last_letter) {
          this.choosePicture(lower_array[i]);
        }
      }
    }

    if (key === " ") {
      this.choosePicture(pick(lower_array))
    }

    // if (this.stateGuard("add")) {
    //   for (i in lower_array) {
    //     if (key === lower_array[i]) {
    //       this.addType(lower_array[i]);
    //     }
    //   }
    //   for (i in letter_array) {
    //     if (key === letter_array[i]) {
    //       this.addType(letter_array[i]);
    //     }
    //   }
    //   if (key === " ") this.addType(" ");
    //   if (key === "Backspace" || key === "Delete") this.deleteType();
    // }
  }


  choosePicture(letter) {
    if (!this.stateCheck()) {
      console.log("foo tast");
      return;
    }
    let layers = this.layers;
    let items = image_master_list[letter];
    let picture = pick(items);
    if (picture == this.last_picture) picture = items[0];

    layers["picture"].removeChildren();
    this.picture = makeSprite(picture, layers["picture"], this.game_width * 0.666, this.game_height * 0.5, 0.5, 0.5)
    // shakers.push(this.picture);
    // this.picture.shake = markTime();

    this.letter_text.text = ""
    this.word_text.text = ""

    this.soundQueue = [];
    stopAllSound();
    soundEffect("button");

    this.soundQueue = [
      [picture[0], this.letter_delay, "l"],
      [picture.split("_")[0], this.word_delay, "w"]
    ];

    this.last_letter = letter;
    this.last_picture = picture;
    this.state = "busy";
    this.stateChange = new Date();
  }


  // deleteType() {
  //   if (this.new_data.title.length > 0) this.new_data.title = this.new_data.title.slice(0,-1);
  //   this.add_box_name.text = "Name: " + this.new_data.title;
  //   this.add_box_grey.visible = (this.new_data.title.length == 0);
  //   this.check_mark.visible = (this.new_data.title.length > 0);
  // }


  // Regular update method
  update(diff) {
    let fractional = diff / (1000/30.0);

    shakeDamage();

    let now = new Date();
    // console.log(now - this.stateChange);
    if (this.state == "busy" && (now - this.stateChange > this.busy_time)) {
      this.state = "ready";
    }

    if (this.soundQueue.length > 0) {
      if (now - this.stateChange > this.soundQueue[0][1]) {
        soundEffect(this.soundQueue[0][0])

        if (this.soundQueue[0][2] == "l") {
          this.letter_text.text = this.soundQueue[0][0];
          this.letter_text.shake = markTime();
          shakers.push(this.letter_text);
        } else if (this.soundQueue[0][2] == "w") {
          this.word_text.text = this.soundQueue[0][0];
          this.word_text.shake = markTime();
          shakers.push(this.word_text);
        }

        this.soundQueue.shift()
      }
    }
  }
}

