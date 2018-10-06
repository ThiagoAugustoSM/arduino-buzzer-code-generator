var textArduino =
  "<span class='define'>#define</span><span class='value'> NOTE_C4 262\n</span><br>\
<span class='define'>#define</span><span class='value'> NOTE_CS4 277\n</span><br>\
<span class='define'>#define</span><span class='value'> NOTE_D4 294\n</span><br>\
<span class='define'>#define</span><span class='value'> NOTE_DS4 311\n</span><br>\
<span class='define'>#define</span><span class='value'> NOTE_E4 330\n</span><br>\
<span class='define'>#define</span><span class='value'> NOTE_F4 349\n</span><br>\
<span class='define'>#define</span><span class='value'> NOTE_FS4 370\n</span><br>\
<span class='define'>#define</span><span class='value'> NOTE_G4 392\n</span><br>\
<span class='define'>#define</span><span class='value'> NOTE_GS4 415\n</span><br>\
<span class='define'>#define</span><span class='value'> NOTE_A4 440\n</span><br>\
<span class='define'>#define</span><span class='value'> NOTE_AS4 466\n</span><br>\
<span class='define'>#define</span><span class='value'> NOTE_B4 494\n</span><br>\
<span class='define'>#define</span><span class='value'> NOTE_C5 523\n\n</span><br><br>\
<span class='define'>#define</span><span class='value'> PIN_BUZZER 13\n\n</span><br><br>\
<span class='typeFunction'>void </span><span class='function'>setup</span> <span class='value'>() {\n</span><br>\
<span class='typeFunctionTab'>\tpinMode</span><span class='value'>(PIN_BUZZER, OUTPUT);</span><br>\
<span class='value'>}\n\n</span><br><br>\
<span class='typeFunction'>void</span><span class='function'> loop</span> <span class='value'>() {\n</span>";

var initalText = textArduino;
var osc;
var Notes = [];
var create = false;
var lastKeyCode;


var code = "";
var lastText = "";
var fr = 30;
var t2 = ["A", "S", "D", "F", "G", "H", "J"];
var delaySilence = 0;
var running = false;

function setup() {
  code = select("#code");

  var canvas = createCanvas(600, 400);
  canvas.parent("sketch-holder");

  frameRate(fr);

  // Creating the sound objects
  osc = new p5.Oscillator();
  osc.setType("sine");
  osc.amp(0);
  osc.start();
}

function draw() {
  background(0);

  fill(120, 120, 120);
  textSize(28);
  text("Press", 165, 20);
  text("A", 70, 50);
  text("S", 110, 50);
  text("D", 150, 50);
  text("F", 190, 50);
  text("G", 230, 50);
  text("H", 270, 50);
  text("J", 310, 50);

  let keySelected = String.fromCharCode(keyCode).toUpperCase();
  if (keyIsPressed) {
    if (keySelected == "W") running = true;
    else if (keySelected == "E") {
      if (running) {
        textArduino += "<span class='value'>}</span>";
        lastText = "<span class='value'>}</span>";
        code.html(textArduino);
      }
      running = false;
    } else if (keySelected == "R") {
      Notes = [];
      running = false;
      textArduino = initalText;
      code.html(textArduino);
      delaySilence = 0;
    }
    
    // Create new notes
    else if (running && (!create || lastKeyCode != keyCode) && t2.includes(keySelected)) { 
      //update lasteyCode
      lastKeyCode = keyCode;

      // No silence anymore
      delaySilence = 0;

      // If it was one of the piano's keys
      Notes.push(new Note(0, 400, String.fromCharCode(lastKeyCode).toUpperCase()));

      lastNote = Notes[Notes.length - 1];
      textArduino +=
        "<br><span class='typeFunctionTab'>tone<span class='value'>(PIN_BUZZER, NOTE_" +
        lastNote.note +
        ");\n</span></span><br>";
      code.html(textArduino);
    } 
    
    //increment note
    else if (running && create && lastKeyCode != 0) {
      // No silence anymore
      delaySilence = 0;

      // Increase the height of the Note Box
      let lastNote = Notes[Notes.length - 1];
      lastNote.changeHeight();

      // If this is the first time running this loop
      if (lastNote.height != lastNote.speedY)
        textArduino = textArduino.substring(
          0,
          textArduino.length - lastText.length
        );

      textArduino +=
        "\
                    <span class='typeFunctionTab'>delay<span class='value'>(" +
        Math.floor((lastNote.height / fr) * 1000) +
        ");\n\n</span></span>\
                    ";
      lastText =
        "\
                  <span class='typeFunctionTab'>delay<span class='value'>(" +
        Math.floor((lastNote.height / fr) * 1000) +
        ");\n\n</span></span>\
                  ";
      code.html(textArduino);

      playSound(lastNote.freq);
    }

    create = true;
    // Scroll div to bottom
    code.elt.scrollTop = code.elt.scrollHeight;
  } 
  
  //create blank space
  else if (running) {
    create = false;
    lastKeyCode = 0;
    if (!delaySilence) {
      textArduino +=
        "<br><span class='typeFunctionTab'>noTone</span><span class='value'>(PIN_BUZZER);\n</span><br>";
    } else {
      textArduino = textArduino.substring(
        0,
        textArduino.length - lastText.length
      );
    }

    delaySilence++;
    textArduino +=
      "<span class='typeFunctionTab'>delay<span class='value'>(" +
      Math.floor((delaySilence / fr) * 1000) +
      ");\n\n</span></span>\
                  <br>";
    lastText =
      "<span class='typeFunctionTab'>delay<span class='value'>(" +
      Math.floor((delaySilence / fr) * 1000) +
      ");\n\n</span></span>\
              <br>";
    code.html(textArduino);

    // Scroll div to bottom
    code.elt.scrollTop = code.elt.scrollHeight;

    stopSound();
  }

  Notes.forEach((item, index, object) => {
    if (item.isUpScreen(400)) {
      object.splice(index, 1);
    }
    item.fillColor();
    item.changePosY();
    item.drawNote();
  });
}

function playSound(note) {
  osc.freq(note);
  osc.amp(0.5, 0.05);
}

function stopSound() {
  osc.amp(0, 0.05);
}