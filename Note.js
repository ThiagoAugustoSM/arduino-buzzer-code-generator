class Note {
  constructor(posX, posY, key) {
    this.width = 20;
    this.height = 0;
    this.posX = posX;
    this.posY = posY;
    this.key = key;
    this.spacing = 40;
    this.editData();
    this.speedY = 4;
  }

  editData() {
    if (this.key == "A") {
      this.posX = this.posX + this.spacing * 1;
      this.note = "C4";
      this.color = color("#ff0000");
      this.freq = 261;
    } else if (this.key == "S") {
      this.posX = this.posX + this.spacing * 2;
      this.note = "D4";
      this.color = color("#ff6600");
      this.freq = 294;
    } else if (this.key == "D") {
      this.posX = this.posX + this.spacing * 3;
      this.note = "E4";
      this.color = color("#ffff00");
      this.freq = 330;
    } else if (this.key == "F") {
      this.posX = this.posX + this.spacing * 4;
      this.note = "F4";
      this.color = color("#66ff33");
      this.freq = 349;
    } else if (this.key == "G") {
      this.posX = this.posX + this.spacing * 5;
      this.note = "G4";
      this.color = color("#6699ff");
      this.freq = 392;
    } else if (this.key == "H") {
      this.posX = this.posX + this.spacing * 6;
      this.note = "A4";
      this.color = color("#000080");
      this.freq = 440;
    } else if (this.key == "J") {
      this.posX = this.posX + this.spacing * 7;
      this.note = "B4";
      this.color = color("#9900ff");
      this.freq = 494;
    } else if (this.key == "K") {
      this.posX = this.posX + this.spacing * 8;
      this.note = "C5";
      this.color = color("#ff66cc");
      this.freq = 523;
    } else {
      this.posX = this.posX + -1 * 7;
      this.note = 0;
      this.color = color("#90E80C");
    }
  }

  changePosition() {
    this.posY--;
  }

  changePosY(direction = 1) {
    this.posY -= direction * this.speedY;
  }

  changeHeight() {
    this.height += 1 * this.speedY;
  }

  fillColor() {
    fill(this.color);
  }

  isUpScreen(screenHeight) {
    if (this.posY + this.height < 0) return true;
    return false;
  }

  drawNote() {
    noStroke();
    rect(this.posX + 30, this.posY, this.width, this.height, 20);
  }
}
