var textArduino = "<span class='define'>#define</span><span class='valor'> NOTE_C4 262</span><br>\
<span class='define'>#define</span><span class='valor'> NOTE_CS4 277</span><br>\
<span class='define'>#define</span><span class='valor'> NOTE_D4 294</span><br>\
<span class='define'>#define</span><span class='valor'> NOTE_DS4 311</span><br>\
<span class='define'>#define</span><span class='valor'> NOTE_E4 330</span><br>\
<span class='define'>#define</span><span class='valor'> NOTE_F4 349</span><br>\
<span class='define'>#define</span><span class='valor'> NOTE_FS4 370</span><br>\
<span class='define'>#define</span><span class='valor'> NOTE_G4 392</span><br>\
<span class='define'>#define</span><span class='valor'> NOTE_GS4 415</span><br>\
<span class='define'>#define</span><span class='valor'> NOTE_A4 440</span><br>\
<span class='define'>#define</span><span class='valor'> NOTE_AS4 466</span><br>\
<span class='define'>#define</span><span class='valor'> NOTE_B4 494</span><br>\
<span class='define'>#define</span><span class='valor'> NOTE_C5 523</span><br><br>\
<span class='define'>#define</span><span class='valor'> PIN_BUZZER 13</span><br><br>\
<span class='tipoFuncao'>void </span><span class='funcao'>setup</span> <span class='valor'>() {</span><br>\
<span class='tipoFuncaoTab'>pinMode</span><span class='valor'>(PIN_BUZZER, OUTPUT);</span><br>\
<span class='valor'>}</span><br>  <br>\
<span class='tipoFuncao'>void </span><span class='funcao'>loop</span> <span class='valor'>() {</span>";

var textInicial = textArduino;
var osc;
var Notas = [];
var create = false;

var codigo = '';
var lastText = '';
var fr = 30;
var t2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J'];
var delaySilence = 0;
var running = false;

function setup() {
  
  codigo = select('#codigo');
  
  var canvas = createCanvas(600, 400);
  canvas.parent('sketch-holder');
  
  frameRate(fr);

  // Creating the sound objects
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.amp(0);
  osc.start();
}

function draw() {
  background(0);

  fill(120,120,120);
  textSize(28);
  text('Press', 165, 20);
  text('A', 70, 50);
  text('S', 110, 50);
  text('D', 150, 50);
  text('F', 190, 50);
  text('G', 230, 50);
  text('H', 270, 50);
  text('J', 310, 50);

  if(keyIsPressed){
    
    let keySelected = String.fromCharCode(keyCode).toUpperCase(); 
    if( keySelected == 'W')
      running = true;
    else if(keySelected == 'E'){
      if(running){
        textArduino+="<span class='valor'>}</span>";
        lastText="<span class='valor'>}</span>";
        codigo.html(textArduino);
      }
      running = false;
    } 
    else if(keySelected == 'R'){
      Notas = [];
      running = false;
      textArduino = textInicial;
      codigo.html(textArduino);
      delaySilence = 0;
    }
    // Create new notes
    else if(running === true && create === false && t2.includes(keySelected)){
      // No silence anymore
      delaySilence = 0;

      // If it was one of the piano's keys
      Notas.push(new Nota(0, 400, String.fromCharCode(keyCode).toUpperCase()));
      
      lastNote = Notas[Notas.length - 1];
      textArduino+="<br><span class='tipoFuncaoTab'>tone<span class='valor'>(PIN_BUZZER, NOTE_" + lastNote.nota + ");</span></span><br>";
      codigo.html(textArduino);
    }
    else if(running && create == true && t2.includes(keySelected)){
      // No silence anymore
      delaySilence = 0;
      
      // Increase the height of the Note Box
      let lastNote = Notas[Notas.length-1];
      lastNote.changeHeight();
      
      // If this is the first time running this loop
      if(lastNote.altura != lastNote.velocidadeY)
        textArduino=textArduino.substring(0, textArduino.length - lastText.length);
      
      textArduino+="\
                    <span class='tipoFuncaoTab'>delay<span class='valor'>(" + Math.floor(lastNote.altura/fr*1000) + ");</span></span>\
                    ";
      lastText=   "\
                  <span class='tipoFuncaoTab'>delay<span class='valor'>(" + Math.floor(lastNote.altura/fr*1000)  + ");</span></span>\
                  ";
      codigo.html(textArduino);

      playSound(lastNote.freq);
    }


    create = true;
    // Scroll div to bottom
    codigo.elt.scrollTop = (codigo.elt.scrollHeight);
  }else if(running){
    create = false;
    
    if(!delaySilence){
      textArduino+="<br><span class='tipoFuncaoTab'>noTone</span><span class='valor'>(PIN_BUZZER);</span><br>"
    }else{
      textArduino=textArduino.substring(0, textArduino.length - lastText.length);
    }

    delaySilence++;
    textArduino+="<span class='tipoFuncaoTab'>delay<span class='valor'>(" + Math.floor(delaySilence/fr*1000) + ");</span></span>\
                  <br>";
    lastText="<span class='tipoFuncaoTab'>delay<span class='valor'>(" + Math.floor(delaySilence/fr*1000) + ");</span></span>\
              <br>";
    codigo.html(textArduino);

    // Scroll div to bottom
    codigo.elt.scrollTop = (codigo.elt.scrollHeight);

    stopSound();
  }
  
  Notas.forEach((item) => {
    item.fillColor();
    item.changePosY();
    item.drawNota();
  }); 
}

function playSound(nota){
  osc.freq(nota);
  osc.amp(0.5, 0.05);
}

function stopSound(){
  osc.amp(0, 0.05);
}

