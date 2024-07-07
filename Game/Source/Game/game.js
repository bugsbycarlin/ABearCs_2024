//
// This file contains the root "game" class for Follow Through. This is the starting point.
//
// Copyright 2023 Alpha Zoo LLC.
// Written by Matthew Carlin
//

'use strict';

var log_performance = true;
var performance_result = null;

var first_screen = "abearcs";

var subgames = ["abearcs"];

var pixi = null;
var game = null;

function initialize() {
  game = new Game();  
}


let image_master_list = {
  "a":[
    "airplane_0",
    "alice_0",
    "alice_1",
    "alice_2",
    "alice_3",
    "apple_0",],
  "b":[
    "baby_0",
    "baby_1",
    "baby_2",
    "bear_0",
    "bear_1",
    "bear_2",
    "bear_3",
    "bear_4",
    "bear_5",
    "bear_6",
    "bear_7",
    "bear_8",
    "bear_9",
    "bear_10",],
  "c":[
    "car_0",
    "car_1",
    "car_2",
    "cat_0",
    "cat_1",
    "cat_2",
    "cat_3",
    "cat_4",
    "clara_0",
    "clara_1",
    "clara_2",
    "clara_3",
    "clara_4",
    "clara_5",
    "clara_6",
    "clara_7",
    "cow_0",],
  "d":[
    "daddy_0",
    "daddy_1",
    "daddy_2",
    "daddy_3",
    "daddy_4",
    "daddy_5",
    "dinosaur_0",
    "dinosaur_1",
    "dog_0",
    "dog_1",
    "dog_2",
    "drum_0",
    "drum_1",
    "drum_2",
    "drum_3",
    "drum_4",
    "drum_5",
    "duck_0",
    "duck_1",],
  "e":[
    "eggs_0",
    "eggs_1",
    "eggs_2",
    "elephant_0",
    "elephant_1",],
  "f":[
    "flowers_0",
    "flowers_1",
    "flowers_2",],
  "g":[
    "goat_0",
    "goat_1",
    "gorilla_0",
    "gorilla_1",
    "gorilla_2",
    "grapes_0",
    "grapes_1",
    "grapes_2",
    "gigi_0",
    "gigi_1",
    "gigi_2",
    "gaga_0",
    "gaga_1",
    "gaga_2",],
  "h":[
    "hamburger_0",
    "horse_0",
    "horse_1",
    "horse_2",
    "horse_3",],
  "i":[
    "ice_cream_0",
    "ice_cream_1",
    "ice_cream_2",],
  "j":[
    "jewel_0",
    "jewel_1",
    "jewel_2",
    "jewel_3",
    "juice_0",
    "juice_1",
    "juice_2",],
  "k":[
    "key_0",
    "key_1",
    "key_2",
    "king_0",
    "king_1",
    "king_2",
    "king_3",
    "koala_0",
    "koala_1",
    "koala_2",],
  "l":[
    "lego_0",
    "lego_1",
    "lego_2",
    "lion_0",
    "lion_1",
    "laolao_0",
    "laolao_1",
    "laoye_0",
    "laoye_1",],
  "m":[
    "mommy_0",
    "mommy_1",
    "mommy_2",
    "mommy_3",
    "mommy_4",
    "mommy_5",
    "mommy_6",
    "mommy_7",
    "monkey_0",
    "monkey_1",
    "monkey_2",],
  "n":[
    "noodles_0",
    "noodles_1",
    "noodles_2",
    "noodles_3",
    "noodles_4",
    "nose_0",
    "nose_1",
    "nuggets_0",
    "nuggets_1",],
  "o":[
    "octopus_0",
    "octopus_1",
    "octopus_2",
    "octopus_3",
    "orange_0",
    "orange_1",
    "orange_2",
    "orange_3",],
  "p":[
    "phone_0",
    "phone_1",
    "pizza_0",
    "pizza_1",
    "pizza_2",],
  "q":[
    "quartz_0",
    "quartz_1",
    "queen_0",
    "queen_1",
    "queen_2",
    "queen_3",
    "queen_4",
    "queen_5",
    "quilt_0",
    "quilt_1",
    "quilt_2",
    "quilt_3",
    "quilt_4",],
  "r":[
    "rainbow_0",
    "rainbow_1",
    "rainbow_2",
    "rainbow_3",
    "rainbow_4",
    "rainbow_5",
    "rainbow_6",
    "rhino_0",
    "rhino_1",
    "rhino_2",
    "rock_0",
    "rock_1",],
  "s":[
    "strawberry_0",
    "strawberry_1",
    "strawberry_2",
    "strawberry_3",],
  "t":[
    "toes_0",
    "toes_1",
    "toes_2",
    "truck_0",
    "truck_1",],
  "u":[
    "umbrella_0",
    "umbrella_1",
    "umbrella_2",
    "umbrella_3",
    "umbrella_4",],
  "v":[
    "viola_0",
    "violin_0",
    "violin_1",],
  "w":[
    "water_0",
    "water_1",
    "watermelon_0",
    "watermelon_1",
    "watermelon_2",
    "wolf_0",
    "wolf_1",
    "wolf_2",
    "wolf_3",
    "wolf_4",
    "wolf_5",],
  "x":[
    "xylophone_0",
    "xylophone_1",
    "xylophone_2",],
  "y":[
    "yoga_0",
    "yoga_1",],
  "z":[
    "zebra_0",
    "zebra_1",
    "zebra_2",],
}

class Game {
  constructor() {
    this.tracking = {};

    this.basicInit();

    this.keymap = {};

    // Useful place to load config, such as the map
    //this.content_config_length = Object.keys(content_config).length;

    document.addEventListener("keydown", (ev) => {this.handleKeyDown(ev)}, false);
    document.addEventListener("keyup", (ev) => {this.handleKeyUp(ev)}, false);
    document.addEventListener("mousemove", (ev) => {this.handleMouseMove(ev)}, false);
    document.addEventListener("mousedown", (ev) => {this.handleMouseDown(ev)}, false);
    document.addEventListener("mouseup", (ev) => {this.handleMouseUp(ev)}, false);

    window.onfocus = (ev) => {
      if (this.keymap != null) {
        this.keymap["ArrowDown"] = null;
        this.keymap["ArrowUp"] = null;
        this.keymap["ArrowLeft"] = null;
        this.keymap["ArrowRight"] = null;
      }
    };
    window.onblur = (ev) => {
      if (this.keymap != null) {
        this.keymap["ArrowDown"] = null;
        this.keymap["ArrowUp"] = null;
        this.keymap["ArrowLeft"] = null;
        this.keymap["ArrowRight"] = null;
      }
    };
  }


  basicInit() {
    this.width = 1440;
    this.height = 900;

    // Create the pixi application
    pixi = new PIXI.Application(this.width, this.height, {antialias: true});
    const initPromise = pixi.init({ background: '#FEFEFE', resizeTo: window });
    
    initPromise.then((thing) => {
      document.body.appendChild(pixi.canvas);

      // document.getElementById("mainDiv").appendChild(pixi.view);
      this.renderer = pixi.renderer;
      pixi.renderer.resize(this.width,this.height);
      pixi.renderer.backgroundColor = 0xFEFEFE;

      // Set up rendering and tweening loop
      let ticker = PIXI.Ticker.shared;
      ticker.autoStart = false;
      ticker.stop();

      let fps_counter = 0;
      let last_frame = 0;
      let last_performance_update = 0;

      let animate = now => {
        
        fps_counter += 1;
        let diff = now - last_frame;
        last_frame = now

        if (!this.paused == true) {
          this.trackStart("tween");
          TWEEN.update(now);
          this.trackStop("tween");

          this.trackStart("update");
          this.update(diff);
          this.trackStop("update");

          this.trackStart("animate");
          ticker.update(now);
          pixi.renderer.render(pixi.stage);
          this.trackStop("animate");

          if (now - last_performance_update > 3000 && log_performance) {
            //There were 3000 milliseconds, so divide fps_counter by 3
            // console.log("FPS: " + fps_counter / 3);
            // this.trackPrint(["update", "tween", "animate"]);
            fps_counter = 0;
            last_performance_update = now;
          }
        }
        requestAnimationFrame(animate);
      }
      animate(0);

      this.preloadAnimations(() => {
        this.initializeScreens();
      });
    })

    
  }


  //
  // Tracking functions, useful for testing the timing of things.
  //
  trackStart(label) {
    if (!(label in this.tracking)) {
      this.tracking[label] = {
        start: 0,
        total: 0
      }
    }
    this.tracking[label].start = Date.now();
  }


  trackStop(label) {
    if (this.tracking[label].start == -1) {
      console.log("ERROR! Tracking for " + label + " stopped without having started.")
    }
    this.tracking[label].total += Date.now() - this.tracking[label].start;
    this.tracking[label].start = -1
  }


  trackPrint(labels) {
    var sum_of_totals = 0;
    for (var label of labels) {
      sum_of_totals += this.tracking[label].total;
    }
    for (var label of labels) {
      var fraction = this.tracking[label].total / sum_of_totals;
      console.log(label + ": " + Math.round(fraction * 100).toFixed(2) + "%");
    }
  }

  preloadAnimations(and_then) {
    let Assets = PIXI.Assets;

    Assets.add({ alias: "BebasNeue-Regular.ttf", src:"BebasNeue-Regular.ttf", data: { scaleMode: PIXI.SCALE_MODES.NEAREST }});
    
    let load_list = ["BebasNeue-Regular.ttf"];

    for (i in lower_array) {
      let l = lower_array[i];
      for (let j in image_master_list[l]) {
        let item = image_master_list[l][j];
        Assets.add({ alias: item, src: "Art/" + item + ".png" });
        load_list.push(item)
      }
    }

    // Assets.add({ alias: "flowers_0", src: "Art/flowers_0.png" });
    // Assets.add({ alias: "flowers_1", src: "Art/flowers_1.png" });
    // Assets.add({ alias: "phone_0", src: "Art/phone_0.png" });
    const assetsPromise = Assets.load(
      load_list
      // [
      //  "flowers_0","flowers_1","phone_0"]
       //"check_mark", "BitOperator.ttf"]
    );
    assetsPromise.then((assets) => {
      console.log(assets)
      and_then();
    });
  }


  handleMouseMove(ev) {
    if (this.screens != null
      && this.current_screen != null
      && this.screens[this.current_screen].mouseMove != null) {
      this.screens[this.current_screen].mouseMove(ev);
    }
  }


  handleMouseDown(ev) {
    if (this.screens != null
      && this.current_screen != null
      && this.screens[this.current_screen].mouseDown != null) {
      this.screens[this.current_screen].mouseDown(ev);
    }
  }


  handleMouseUp(ev) {
    console.log("le clicks")
    if (this.screens != null
      && this.current_screen != null
      && this.screens[this.current_screen].mouseUp != null) {
      this.screens[this.current_screen].mouseUp(ev);
    }
  }


  handleKeyUp(ev) {
    ev.preventDefault();

    this.keymap[ev.key] = null;

    if (this.screens != null
      && this.current_screen != null
      && this.screens[this.current_screen].keyUp != null) {
      this.screens[this.current_screen].keyUp(ev);
    }
  }


  handleKeyDown(ev) {
    if (ev.key === "Tab") {
      ev.preventDefault();
    }

    this.keymap[ev.key] = true;

    if (this.screens != null
      && this.current_screen != null
      && this.screens[this.current_screen].keyDown != null) {
      this.screens[this.current_screen].keyDown(ev);
    }
  }


  update(diff) {
    if (this.screens != null && this.current_screen != null) {
      this.screens[this.current_screen].update(diff);
    }
  }
}
