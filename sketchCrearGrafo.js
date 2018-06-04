var leftBuffer;
var rightBuffer;

var anchoizquierdo= 800;
var altoizquierdo = 400;



var anchoderecho= 300;
var altoderecho = 400;

let Nodos = [];
let Aristas =[];

let RADIO=18; 

var canvas;

var nodoBtn;
var nodoFlag=false;

var aristaBtn;
var aristaFlag=false;

var removeNodoBtn;
var removeNodoFlag=false;

var removeArBtn;
var removeArFlag=false;

var radioBtn;

var listoBtn;
var editarBtn;

var comenzarBtn;
var comenzarBtnFlag=false;

var nextBtn;
var lastBtn;
var regresarElegirBtn;


var clickunoAr=true;


function setup() {

  canvas=createCanvas(1200, 400);

  canvas.mousePressed(canvaspressed);

  leftBuffer = createGraphics(anchoizquierdo, altoizquierdo);
  rightBuffer = createGraphics(anchoderecho, altoderecho);


  createDiv("");

  nodoBtn=createButton("Agregar nodo");
  nodoBtn.mousePressed(nodoBtnPressed);

  aristaBtn=createButton("Agregar arista");
  aristaBtn.mousePressed(aristaBtnPressed);

  removeNodoBtn=createButton("Remover nodo");
  removeNodoBtn.mousePressed( removeNodoBtnPressed);

  removeArBtn=createButton("Remover arista");
  removeArBtn.mousePressed(removeArBtnPressed );

  createP("");
  listoBtn=createButton("Listo");
  listoBtn.mousePressed(listoBtnPressed);

  editarBtn=createButton("Editar grafo.")
  editarBtn.mousePressed( editarBtnPressed );
  editarBtn.hide();


  radioBtn = createRadio();
  radioBtn.option('BFS');
  radioBtn.option('DFS');
  radioBtn.hide();  

  comenzarBtn=createButton("Comenzar.")
  comenzarBtn.mousePressed( comenzarBtnPressed );
  comenzarBtn.hide();


  lastBtn=createButton("Anterior.")
  lastBtn.mousePressed( lastBtnPressed );
  lastBtn.hide();

  nextBtn=createButton("Siguiente.")
  nextBtn.mousePressed( nextBtnPressed );
  nextBtn.hide();

  regresarElegirBtn=createButton("Regresar.");
  regresarElegirBtn.mousePressed(regresarElegirBtnPressed);
  regresarElegirBtn.hide();
  

  //Creando nodos.
  /* for (let i = 0; i < 20; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(10, 50);
    Nodos[i] = new Nodo(x, y, r);
  } */
  

}

var cual1=-1;
function canvaspressed( ){

  //Verificar que se haya hecho click en la parte izquierda del canvas.
  if( !(mouseX > anchoizquierdo ) && !( mouseY > altoizquierdo  ) ){
    if( nodoFlag ){
      //alert("Nodo. ");
      nodoAux=new Nodo(mouseX, mouseY, RADIO, Nodos.length );
      
      let overlapping = false;
  
      for (var k=0; k< Nodos.length ; k++) {
        // console.log(k);
        if ( nodoAux !== Nodos[k]  && nodoAux.intersects( Nodos[k] )) {
          
          overlapping = true;
        }
      }
       
      if (overlapping) {
        //Si queda sobre otro nodo, no dibujar.
        alert("Ya hay un nodo aqui!");
  
      } else {
        //Si no, no hay problema, dibujar.
        
        //alert("No hay nodo aqui");
        Nodos.push( nodoAux  );
      } 
  
      
    }
    else if(aristaFlag ){
      // alert("Arista.");
      //click uno y click dos
  
      nodoAux=new Nodo(mouseX, mouseY, RADIO);
      
      let overlapping = false;
      let f=true;
      cual=-1;
      for (var k=0; k< Nodos.length ; k++) {
         //console.log(k);
        if ( nodoAux !== Nodos[k]  && nodoAux.intersects( Nodos[k] )) {
          cual=k;
        }
      }
  
      if(cual!=-1){
        //console.log("Se eligio el nodo de coordenadas: ");
        //console.log(Nodos[cual].x, " ,", Nodos[cual].y )
        
      }else{
        alert("Haga click en un nodo.");      
        f=false;
      }
      
      if(f){
        if(clickunoAr){
  
          Nodo1=Nodos[cual];
  
          cual1=cual;
          clickunoAr=false;
        }else{
          //Es el segundo nodo.
  
          Nodo2=Nodos[cual];
  
  
          console.log("Se va a crear el arista del nodo ", cual1);
          console.log(Nodo1.x, " ,", Nodo1.y );
          console.log("Al nodo: ", cual);
          console.log(Nodo2.x, " ,", Nodo2.y ); 
  
  
          aristaAux=new Arista( Nodo1, Nodo2 );
          
          igu=false;
          for(let ari of Aristas){
            if( ari.igualDirigido( aristaAux ) ){
              igu=true;
            }
          }
  
          if(!igu ){
            Aristas.push( aristaAux );
  
            if(!Nodos[cual].conectado)
              Nodos[cual].conectado=true;
              
            if(!Nodos[cual1].conectado)  
              Nodos[cual1].conectado=true;
          }else{
            console.log("Esta arista ya existe.");
            alert("Esta arista ya existe.");
          }
          
  
          
          clickunoAr=true;
        }
      }
  
    }
    else if(removeNodoFlag){
      // alert("Rmv nodo")
    }
    else if(removeArFlag){
      // alert("Rmv arista")
    }
  }

}


function nodoBtnPressed(){
  nodoFlag=true;
  aristaFlag=false;
  removeNodoFlag=false;
  removeArFlag=false;
}

function aristaBtnPressed(){
  nodoFlag=false;
  aristaFlag=true;
  removeNodoFlag=false;
  removeArFlag=false;
}


function removeNodoBtnPressed(){
  nodoFlag=false;
  aristaFlag=false;
  removeNodoFlag=true;
  removeArFlag=false;
}


function removeArBtnPressed(){
  nodoFlag=false;
  aristaFlag=false;
  removeNodoFlag=false;
  removeArFlag=true;
}

function editarBtnPressed(){
  nodoBtn.show();
  aristaBtn.show();
  removeArBtn.show();
  removeNodoBtn.show();
  listoBtn.show();
  editarBtn.hide();
}

function comenzarBtnPressed(){

  comenzarBtnFlag=true;
  editarBtn.hide();
  comenzarBtn.hide();
  radioBtn.hide();

  lastBtn.show();
  nextBtn.show();

  regresarElegirBtn.show();

}

function lastBtnPressed(){

}

function nextBtnPressed(){
  
}

function regresarElegirBtnPressed(){
  comenzarBtnFlag=false;
  editarBtn.show();
  comenzarBtn.show();
  radioBtn.show();

  lastBtn.hide();
  nextBtn.hide();

  regresarElegirBtn.hide();

  //Que se limpieelcanvas derecho.
}

function listoBtnPressed(){

  nodoFlag=false;
  aristaFlag=false;
  removeNodoFlag=false;
  removeArFlag=false;

  mal=false;
  for (let b of Nodos) {
    if(!b.conectado){
      alert("Todos los nodos deben tener al menos un arista.");
      mal=true;
    }
  }

  if(!mal){
    //Crear matriz de adyacencia.
    nodoBtn.hide();
    aristaBtn.hide();
    removeArBtn.hide();
    removeNodoBtn.hide();

    editarBtn.show();
    listoBtn.hide();
    radioBtn.show();
    comenzarBtn.show();
    
  }


}

function draw() {
  // Draw on your buffers however you like
  drawLeftBuffer();
  drawRightBuffer();
  // Paint the off-screen buffers onto the main canvas
  image(leftBuffer, 0, 0);
  image(rightBuffer, anchoizquierdo, 0);

}


function drawLeftBuffer(){

  leftBuffer.background(0);

  //Trazando aristas.
  for(let ari of Aristas){
    ari.show();
  }

  //Trazando nodos.
  for (let b of Nodos) {
    b.show();
    //b.move();
  }
}

function drawRightBuffer(){

  if(comenzarBtnFlag ){
    //Si ya se hizo click en continuar.
    rightBuffer.background(100);
    // dibujar contorno

    //Texto que diga Pila o Cola. TODO
    var algoritmo = radioBtn.value();

    //VERIFICAR que se haya elegido un algoritmo si no alertar y no avanzar hasta que no se haya elegido uno.
    // console.log(algoritmo)
    rightBuffer.text(algoritmo, anchoderecho / 2, 20);


    rightBuffer.stroke(255);
    rightBuffer.strokeWeight(3);

    rightBuffer.fill(39, 125, 200);
    
    rightBuffer.ellipse(20, 20, 9 * 2);

    //rightBuffer.noFill();

    //rightBuffer.rect(  anchoizquierdo+5, 5,anchoderecho-5,altoizquierdo-5   );
    
  }else{
    rightBuffer.background(255);
  }
    
}



class Nodo {
  constructor(x, y, r = 50, numero=-1, conectado=false, visitado=false) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 100;
    this.numero=numero;
  }

  intersects(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    return (d < this.r + other.r);
    // if (d < this.r + other.r) {
    //   return true;
    // } else {
    //   return false;
    // }
  }

  changeColor(bright) {
    this.brightness = bright;
  }

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }

  move() {
    this.x = this.x + random(-2, 2);
    this.y = this.y + random(-2, 2);
  }

  show() {
    leftBuffer.stroke(255);
    leftBuffer.strokeWeight(3);
    leftBuffer.fill(this.brightness, 125, 200);
    
    leftBuffer.ellipse(this.x, this.y, this.r * 2);

    leftBuffer.noStroke();
    leftBuffer.fill(0);
    leftBuffer.text(this.numero, this.x-2, this.y+1); 
    
  }
}


 class Arista {

  constructor(Nodo1, Nodo2) {
    this.Nodo1=Nodo1;
    this.Nodo2=Nodo2;
    console.log("Este arista va de: ")
    console.log( this.Nodo1.x , ",", this.Nodo1.y, " a " , this.Nodo2.x, ", ", this.Nodo2.y );
  }

  show(){
    leftBuffer.stroke(255);
    leftBuffer.strokeWeight(3);
    leftBuffer.line(this.Nodo1.x, this.Nodo1.y, this.Nodo2.x,this.Nodo2.y);
  }

  igualDirigido(otraArista){
    return(  ( (this.Nodo1==otraArista.Nodo1) && (this.Nodo2 == otraArista.Nodo2) ) ||  ( (this.Nodo1==otraArista.Nodo2) && (this.Nodo2 == otraArista.Nodo1) )  )
  }

  igualNoDirigido(otraArista){
    return(  (this.Nodo1==otraArista.Nodo1) && (this.Nodo2 == otraArista.Nodo2)    )
  }

}


//TODO verificar Si hay forma de llegar a él. DEBE ser conexo.
//Remover nodos y aristas.
//Que tenga buen diseño.

//Agregar rdButton elegir BFS o DPS y un boton para comenzar.

//Una vez que se presione comenzar, tomar el valor del rdbutton.

//Dibujar Boton siguiente y anterior. (Su funcionalidad depende del algoritmo elegido)

//Dibujar a la derecha la pila o la cola.
//El tamaño del contenedor sera del numero de nodos.
//Ir imprimiendo la salida.


//Todo donde se muestran solo anterior y siguiente añadir boton para regresar a la eleccion de algoritmo.