class Nota {
  constructor(posX, posY, tecla){
    this.largura = 20;
    this.altura = 0;
    this.posX = posX;
    this.posY = posY;
    this.tecla = tecla;
    this.espacamento = 40;

    this.editData();
    this.velocidadeY = 4;
  }
  
  editData (){ 
    if(this.tecla == 'A'){
      this.posX = this.posX + this.espacamento * 1;
      this.nota = 'C4'; // Dó
      this.color = color('#23FFF0');
      this.freq = 261;
    } else if(this.tecla == 'S') {
      this.posX = this.posX + this.espacamento * 2;
      this.nota = 'D4'; // Dó
      this.color = color('#3C0CE8');
      this.freq = 294;
    } else if(this.tecla == 'D') {
      this.posX = this.posX + this.espacamento * 3;
      this.nota = 'E4'; // Dó
      this.color = color('#FF0000');
      this.freq = 330;
    } else if(this.tecla == 'F') {
      this.posX = this.posX + this.espacamento * 4;
      this.nota = 'F4'; // Dó
      this.color = color('#E89F0C');
      this.freq = 349;
    } else if(this.tecla == 'G') {
      this.posX = this.posX + this.espacamento * 5;
      this.nota = 'G4'; // Dó
      this.color = color('#7AFF0D');
      this.freq = 392;
    } else if(this.tecla == 'H') {
      this.posX = this.posX + this.espacamento * 6;
      this.nota = 'A4'; // Dó
      this.color = color('#FFC323')
      this.freq = 440;
    } else if(this.tecla == 'J') {
      this.posX = this.posX + this.espacamento * 7;
      this.nota = 'B4'; // Dó
      this.color = color('#90E80C');
      this.freq = 494;
    } else if(this.tecla == 'K') {
      this.posX = this.posX + this.espacamento * 8;
      this.nota = 'C5'; // Dó
      this.color = color('#90E80C');
      this.freq = 523;
    }else {
      this.posX = this.posX + -1 * 7;
      this.nota = 0;
      this.color = color('#90E80C');
    }
  }

  changePosition () {
    this.posY--;
  }

  changePosY (direction = 1) {
    this.posY -= direction * this.velocidadeY;
  }

  changeHeight () {
    this.altura += 1 * this.velocidadeY;
  }

  fillColor () {
    fill(this.color);
  }

  isUpScreen(screenHeight){
    if(this.posY + this.altura < 0)
      return true;
    return false;
  }

  drawNota () {
    noStroke();
    rect(this.posX + 30, this.posY, this.largura, this.altura, 20);
  }
}