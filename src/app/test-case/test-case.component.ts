import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators'



export class Texts {
  text: string = "asdfasd";
  fontFamily: string = "Arial";
  fontSize: number = 200;
  textColor: string = "#FFFFFF";
  bold: boolean = false;
  italic: boolean = false;
  strock: boolean = false;
  shadowColor: string = "#FFFFFF";
  shadowX: number = 0;
  shadowY: number = 0;
  top: number = 100;
  left: number = 100;
  strockWidth: number = 1;
  lineheight: number = 100;
  shadowBlur: number = 4;
  fillColor: string = "#f16501";
}



@Component({
  selector: 'app-test-case',
  templateUrl: './test-case.component.html',
  styleUrls: ['./test-case.component.css']
})
export class TestCaseComponent implements AfterViewInit {

  /** Template reference to the canvas element */
  @ViewChild('canvasEl', { static: false }) canvasEl: ElementRef;

  /** Canvas 2d context */
  text: string = "";
  fontSize: number = 100;
  fontFamily: string = "Arial";
  imageUrl: any = "";
  bold: boolean;
  italic: boolean;
  underline: boolean;
  selectedImage: any = "";
  textColor: string = "#FFFFFF";
  top: number = 20;
  left: number = 10;
  shadowColor: string = "#FFFFFF";
  shadowX: number = 0;
  shadowY: number = 0;
  images: any;
  strockWidth: number = 1;
  public selectedTextIndex: number = 0;
  private context: CanvasRenderingContext2D;
  public texts: Array<Texts> = [];
  shadowBlur: number = 4
  fillColor: string = "#f16501";
  strock: boolean = false;

  constructor() {
    var that = this;
    setInterval(function () {
      that.refreshPreview();
    }, 1000);

    this.images = [
      {
        text: "Everfresh Flowers",
        image: "./assets/img/black.jpg"
      },
      {
        text: "Everfresh Flowers",
        image: "./assets/img/black.jpg"
      },
      {
        text: "Everfresh Flowers",
        image: "./assets/img/black.jpg"
      },
      {
        text: "Everfresh Flowers",
        image: "./assets/img/black.jpg"
      },
      {
        text: "Everfresh Flowers",
        image: "./assets/img/black.jpg"
      },
      {
        text: "Everfresh Flowers",
        image: "./assets/img/black.jpg"
      },
      {
        text: "Everfresh Flowers",
        image: "./assets/img/black.jpg"
      },
      {
        text: "Everfresh Flowers",
        image: "./assets/img/black.jpg"
      },
    ]

    var text1 = new Texts();
    text1.text = "Text 1";
    var text2 = new Texts();
    text2.text = "Text 2";
    text2.top = 300;
    this.texts = [text1];
    this.texts.push(text2);
    this.selectTextIndex(0);

  }

  public refreshPreview() {
    this.imageUrl = this.context.canvas.toDataURL();
  }

  ngAfterViewInit() {
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');
    this.imageUrl = "";
    this.changeDrawing();
  }


  private drawAllText() {
    this.texts.forEach(text => {
      this.context.shadowBlur = text.shadowBlur;
      this.context.shadowColor = text.shadowColor;
      this.context.shadowOffsetX = text.shadowX;
      this.context.shadowOffsetY = text.shadowY;
      var bold = text.bold ? "bold " : "";
      var italic = text.italic ? "italic " : "";
      this.context.font = bold + italic + text.fontSize + "px " + text.fontFamily;
      var lineheight = text.lineheight;
      var lines = text.text.split('\n');
      var b = (text.fontSize / 1.8) + text.top;
      for (var j = 0; j < lines.length; j++) {
        if (text.strock) {
          this.context.lineWidth = text.strockWidth;
          this.context.strokeStyle = text.textColor;
          this.context.strokeText(lines[j], text.left, b + (j * lineheight));
          this.context.fillStyle = text.fillColor;
          this.context.fillText(lines[j], text.left, b + (j * lineheight));
        } else {
          this.context.fillStyle = text.textColor;
          this.context.fillText(lines[j], text.left, b + (j * lineheight));
        }
      }
    });

  }

  private drawText() {
    const x = (this.canvasEl.nativeElement as HTMLCanvasElement).width / 2;
    const mx = (this.canvasEl.nativeElement as HTMLCanvasElement).width;
    const y = (this.canvasEl.nativeElement as HTMLCanvasElement).height / 2;

    this.context.clearRect(0, 0, (this.canvasEl.nativeElement as HTMLCanvasElement).width, (this.canvasEl.nativeElement as HTMLCanvasElement).height);
    if (this.selectedImage !== "") {
      this.context.drawImage(this.selectedImage, 0, 0, (this.canvasEl.nativeElement as HTMLCanvasElement).width, (this.canvasEl.nativeElement as HTMLCanvasElement).height);
    }
    else {
      this.context.fillStyle = "#f16501";
      this.context.fillRect(0, 0, (this.canvasEl.nativeElement as HTMLCanvasElement).width, (this.canvasEl.nativeElement as HTMLCanvasElement).height);
    }
    this.drawAllText();
  }
  changeDrawing() {
    this.texts[this.selectedTextIndex].fontFamily = this.fontFamily;
    this.texts[this.selectedTextIndex].fontSize = this.fontSize;
    this.texts[this.selectedTextIndex].italic = this.italic;
    this.texts[this.selectedTextIndex].bold = this.bold;
    this.texts[this.selectedTextIndex].textColor = this.textColor;
    this.texts[this.selectedTextIndex].top = this.top;
    this.texts[this.selectedTextIndex].left = this.left;
    this.texts[this.selectedTextIndex].shadowColor = this.shadowColor;
    this.texts[this.selectedTextIndex].shadowX = this.shadowX;
    this.texts[this.selectedTextIndex].shadowY = this.shadowY;
    this.texts[this.selectedTextIndex].strock = this.strock;
    this.texts[this.selectedTextIndex].strockWidth = this.strockWidth;
    this.texts[this.selectedTextIndex].text = this.text;
    this.texts[this.selectedTextIndex].fillColor = this.fillColor;
    this.texts[this.selectedTextIndex].top = this.top;
    this.texts[this.selectedTextIndex].left = this.left;
    this.drawText();
  }
  doBold = () => { this.bold = !this.bold; this.changeDrawing(); }
  doItalic = () => { this.italic = !this.italic; this.changeDrawing(); }
  doStrock = () => { this.strock = !this.strock; this.changeDrawing(); }
  marginTopIncrement = () => { this.top = this.top + 50; this.changeDrawing(); }
  marginTopBalance = () => { this.top = 800; this.changeDrawing(); }
  marginTopDecrement = () => { this.top = this.top - 50; this.changeDrawing(); }
  marginLeftDecrement = () => { this.left = this.left + 50; this.changeDrawing(); }
  marginLeftBalance = () => { this.left = 600; this.changeDrawing(); }
  marginLeftIncrement = () => { this.left = this.left - 50; this.changeDrawing(); }

  shadowTopIncrement = () => { this.shadowY = this.shadowY + 5; this.changeDrawing(); }
  shadowTopBalance = () => { this.shadowY = 0; this.changeDrawing(); }
  shadowTopDecrement = () => { this.shadowY = this.shadowY - 5; this.changeDrawing(); }
  shadowLeftDecrement = () => { this.shadowX = this.shadowX + 5; this.changeDrawing(); }
  shadowLeftBalance = () => { this.shadowX = 0; this.changeDrawing(); }
  shadowLeftIncrement = () => { this.shadowX = this.shadowX - 5; this.changeDrawing(); }


  interval;
  timeLeft: number = 60;
  longPress=(event,fun)=>{
    this.interval = setInterval(() => fun,100)
  }

  mouseUpEvent() {
    clearInterval(this.interval);
  }


  drawImage = ($event, img) => {
    this.selectedImage = $event.target as HTMLImageElement;
    this.changeDrawing();
  }
  endX = 0;
  endY = 0;
  onMouseDragEnd(event) {
    this.endX = event.screenX;
    this.endY = event.screenY;
    var difX = this.endX - this.startX;
    var difY = this.endY - this.startY;
    this.left = this.left + (difX * 5);
    this.top = this.top + (difY * 5)
    document.getElementById("previewImage").classList.remove("draggable-cursor");
    this.changeDrawing();
  }
  selectTextIndex(index) {
    this.selectedTextIndex = index;
    this.text = this.texts[this.selectedTextIndex].text;
    this.fontFamily = this.texts[this.selectedTextIndex].fontFamily;
    this.fontSize = this.texts[this.selectedTextIndex].fontSize;
    this.italic = this.texts[this.selectedTextIndex].italic;
    this.bold = this.texts[this.selectedTextIndex].bold;
    this.textColor = this.texts[this.selectedTextIndex].textColor;
    this.top = this.texts[this.selectedTextIndex].top;
    this.left = this.texts[this.selectedTextIndex].left;
    this.shadowColor = this.texts[this.selectedTextIndex].shadowColor;
    this.shadowX = this.texts[this.selectedTextIndex].shadowX;
    this.shadowY = this.texts[this.selectedTextIndex].shadowY;
    this.strock = this.texts[this.selectedTextIndex].strock;
    this.strockWidth = this.texts[this.selectedTextIndex].strockWidth;
    this.text = this.texts[this.selectedTextIndex].text;
    this.fillColor = this.texts[this.selectedTextIndex].fillColor;
    this.top = this.texts[this.selectedTextIndex].top;
    this.left = this.texts[this.selectedTextIndex].left;
  }
  startX = 0;
  startY = 0;
  onMouseMove(event) {
    document.getElementById("previewImage").classList.add("draggable-cursor");
    this.startX = event.screenX;
    this.startY = event.screenY;
  }
  addNewText(event) {
    var text = new Texts();
    text.text = "Text "+(this.texts.length+1);
    text.top = 800;
    text.left = 600;
    this.texts.push(text);

    this.selectTextIndex(this.texts.length - 1);
    this.changeDrawing();
  }
  deleteText(selectTextIndex) {

    if (selectTextIndex !== -1) {
      this.texts.splice(selectTextIndex, 1);
    }
    this.selectTextIndex(this.texts.length - 1);
    this.changeDrawing();
  }
  carouselOptions = {
    margin: 25,
    items: 12,
    autoHeight: true,
    nav: false,
    autoplay: false,
    navText: ["<div class='nav-btn prev-slide'></div>", "<div class='nav-btn next-slide'></div>"],
    responsiveClass: true,
  }
  getFontFamily(fontFamily) {
    return fontFamily;
  }

  getFontSize(start = 100, end = 300) {
    let numArray = [];
    for (let i = start; i < end; i++) {
      numArray.push(i);
    }
    return numArray;
  }

}
