import { Canvas } from "./Canvas";
import './style.css'
import './BtnCustom.css'
import './CustomInputStyle.css'
import { Segment } from "./Segment";
import { Vector2 } from "./Vector2";

const canvasArea = document.querySelector<HTMLDivElement>('#canvasArea')!
const ResetCanvasBtn = document.querySelector<HTMLButtonElement>('#ResetCanvasBtn')!
const CanvasWidthInput = document.querySelector<HTMLInputElement>('#canvasWidth')!
const CanvasHeightInput = document.querySelector<HTMLInputElement>('#canvasHeight')!
const subdivbtn = document.querySelector<HTMLButtonElement>('#subdivbtn')!
const resetSegs = document.querySelector<HTMLButtonElement>('#resetSegments')!
const captureImg = document.querySelector<HTMLButtonElement>('#CaptureImg')!
const canvas = new Canvas(600, 600)

CanvasWidthInput.value = "600"
CanvasHeightInput.value = "600"

ResetCanvasBtn.addEventListener('click', ( ) => {
  canvas._width = parseInt(CanvasWidthInput.value) || canvas._width
  canvas._height = parseInt(CanvasHeightInput.value) || canvas._height
  canvas.ResetCanvas()
})

captureImg.addEventListener('click', () => {
  var imgurl = canvas.getCanvas().toDataURL('image/png')
  var dlLink = document.createElement('a');
  dlLink.download = 'canvas.png';
  dlLink.href = imgurl;
  dlLink.dataset.downloadurl = ['image/png', dlLink.download, dlLink.href].join(':');
  dlLink.click()
})


canvasArea.appendChild(canvas.getCanvas())


let segments = new Array<Segment>();
const setupSegs = () => {
  segments = new Array<Segment>();

  let off = new Vector2(canvas._width/2, canvas._height/2)
  let p1 = new Vector2(0, 1).scale(canvas._height*0.5).add(off)
  let p2 = new Vector2(0, 1).scale(canvas._height*0.5).rotateBy((120.0*Math.PI)/180.0).add(off)
  let p3 = new Vector2(0, 1).scale(canvas._height*0.5).rotateBy((240.0*Math.PI)/180.0).add(off)

  segments.push(new Segment(p1, p2))
  segments.push(new Segment(p2, p3))
  segments.push(new Segment(p3, p1))
  canvas.ResetCanvas()
  segments.forEach(e => e.draw(canvas))
}

setupSegs()

subdivbtn.addEventListener('click', () => {
  let nexts = new Array<Segment>()
  segments.forEach(e => e.subdiv().forEach(s => nexts.push(s)))
  segments = nexts
  canvas.ResetCanvas()
  segments.forEach(e => e.draw(canvas))
})

resetSegs.addEventListener('click', setupSegs)
