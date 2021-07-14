import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy,ChangeDetectorRef } from '@angular/core';
import { Texts } from 'src/app/models/texts.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ApiResponse } from 'src/app/models/api-response.model';
import { NewsTemplates } from 'src/app/models/news-templates.model';


@Component({
  selector: 'app-test-case',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements AfterViewInit, OnInit, OnDestroy {

  /** Template reference to the canvas element */
  @ViewChild('canvasEl', { static: false }) canvasEl: ElementRef;
  
  /** Canvas 2d context */
  text: string = "";
  fontSize: number = 50;
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

  //news form
  newsForm: FormGroup;
  subscription: any = [];
  submitted = false;
  newsTemplates:NewsTemplates=new NewsTemplates();
  public min = new Date();
  selectedImageId: Number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private readonly notifier: NotifierService,
    private cdref: ChangeDetectorRef
  ) {
    this.min.setDate(this.min.getDate() + 1); //add 1 day in current date for default
    var that = this;
    setInterval(function () {
      that.refreshPreview();
    }, 1000);

    this.images = [
      {
        id: 1,
        text: "Everfresh Flowers",
        image: "./assets/img/nali-logo.png"
      },
      {
        id: 2,
        text: "Everfresh Flowers",
        image: "./assets/img/sample1.jpg"
      },
      {
        id: 3,
        text: "Everfresh Flowers",
        image: "./assets/img/sample1.jpg"
      },
      {
        id: 4,
        text: "Everfresh Flowers",
        image: "./assets/img/sample2.png"
      },
    ]

    var text1 = new Texts();
    text1.text = "Sample Text";
    this.texts.push(text1);
    this.selectTextIndex(0);
    this.getTemplateData();
  }

  getTemplateData(){
    // this.ifData=false;
    let s1 = this.apiService.templateFilesForPanels().subscribe(
      result => {
        const apiResponse: ApiResponse = result;
        this.newsTemplates=apiResponse.data;
        this.images=this.newsTemplates.files;
      },
      error => {
        // this.apiService.handleError(error);
      })
    this.subscription.push(s1);
  }

  public refreshPreview() {
    this.imageUrl = this.context.canvas.toDataURL();
  }

  ngAfterViewInit() {
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');
    this.imageUrl = "";
    this.changeDrawing();
  }
  changeDate(event) {
    if (this.f.end_date_time.value < event.value) {
      this.f.end_date_time.setValue(event.value)
    }
  }
  ngOnInit() {
    this.newsForm = this.formBuilder.group({
      news_title: ['', [Validators.required, Validators.maxLength(100)]],
      news_description: ['', [Validators.required]],
      term_condition: [''],
     
      end_date_time: [this.min, [Validators.required]],
      enabled: [true],
    });
    // start_date_time: [this.min, [Validators.required]],
  }
  get f() { return this.newsForm.controls; }
  getDateString(d) {
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  }
  onSubmit() {
    this.submitted = true;
    if (this.newsForm.invalid) {
      return;
    }
    var body = {};
    body['news_image'] = this.imageUrl;
    body['background_image'] = this.selectedImage.src == undefined ? "" : this.selectedImage.src.substring(this.selectedImage.src.lastIndexOf('/') + 1);
    body['image_data'] = JSON.stringify(this.texts);
    body['news_title'] = this.f.news_title.value;
    body['news_description'] = this.f.news_description.value;
    body['term_condition'] = this.f.term_condition.value;
    //body['start_date_time'] = this.getDateString(this.f.start_date_time.value); removed start date and set current date at server end
    body['end_date_time'] = this.getDateString(this.f.end_date_time.value);
    body['enabled'] = this.f.enabled.value;
    let s1 = this.apiService.addStoreNews(body).subscribe(

      result => {
        const apiResponse: ApiResponse = result;
        // this.notifier.notify("success", apiResponse.message);
        this.router.navigate(['home/news']);
      },
      error => {
        this.apiService.handleError(error);
      })
    this.subscription.push(s1);

  }

  convertToBlob(base64) {
    base64 = base64.replace("data:image/png;base64,", "");
    console.log("base64", base64);
    const date = new Date().valueOf();
    let text = '';
    const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      text += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
    }
    // Replace extension according to your media type
    const imageName = date + '.' + text + '.jpeg';
    // call method that creates a blob from dataUri
    const imageBlob = this.dataURItoBlob(base64);
    const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
    return imageFile;
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }


  time = { hour: 13, minute: 30 };

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
    this.context.clearRect(0, 0, (this.canvasEl.nativeElement as HTMLCanvasElement).width, (this.canvasEl.nativeElement as HTMLCanvasElement).height);
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
  marginTopIncrement = () => { this.top = this.top + 25; this.changeDrawing(); }
  marginTopBalance = () => { this.top = 180; this.changeDrawing(); }
  marginTopDecrement = () => { this.top = this.top - 25; this.changeDrawing(); }
  marginLeftDecrement = () => { this.left = this.left + 25; this.changeDrawing(); }
  marginLeftBalance = () => { this.left = 300; this.changeDrawing(); }
  marginLeftIncrement = () => { this.left = this.left - 25; this.changeDrawing(); }

  shadowTopIncrement = () => { this.shadowY = this.shadowY + 5; this.changeDrawing(); }
  shadowTopBalance = () => { this.shadowY = 0; this.changeDrawing(); }
  shadowTopDecrement = () => { this.shadowY = this.shadowY - 5; this.changeDrawing(); }
  shadowLeftDecrement = () => { this.shadowX = this.shadowX + 5; this.changeDrawing(); }
  shadowLeftBalance = () => { this.shadowX = 0; this.changeDrawing(); }
  shadowLeftIncrement = () => { this.shadowX = this.shadowX - 5; this.changeDrawing(); }


  drawImage = ($event, img) => {
    this.selectedImageId = img.id;
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
    this.left = this.left + (difX * 2.5);
    this.top = this.top + (difY * 2.5)
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
    this.startX = event.screenX;
    this.startY = event.screenY;
  }
  allowDrop(event) {
    event.preventDefault();
    document.getElementById("previewImage").classList.add("draggable-cursor");

  }
  addNewText() {
    var text = new Texts();
    text.text = "Sample Text " + (this.texts.length + 1);
    text.top = 180;
    text.left = 300;
    this.texts.push(text);
    this.selectTextIndex(this.texts.length - 1);
    this.changeDrawing();
  }
  deleteText(selectTextIndex) {
    this.texts.splice(selectTextIndex, 1);
    if (this.texts.length <= 0) {
      this.addNewText();
    } else {
      this.selectTextIndex(this.texts.length - 1);
      this.changeDrawing();
    }
    this.cdref.detectChanges();
  }
  carouselOptions = {
    marginLeftBalance: 40,
    margin: 10,
    items: 6,
    autoHeight: false,
    nav: false,
    autoplay: false,
    // navText: ["<div class='nav-btn prev-slide'></div>", "<div class='nav-btn next-slide'></div>"],
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
  ngOnDestroy() {
    this.subscription.forEach(s => {
      s.unsubscribe();
    });
  }

}
