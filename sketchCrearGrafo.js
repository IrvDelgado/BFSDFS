var leftBuffer;
var rightBuffer;

var anchoizquierdo= 800;
var altoizquierdo = 400;

var  anchoCanvas= 1200;
var  altoCanvas=400;

var currentNode=-1;
var lastNode=-1;
var auxptr=-1;
var toVisit=-1;
var auxflg=false;
var marcaraux=-1;

var Pila=[]; //Ya implementado
var Cola=[]; //Casi implementado.
var paths=[];

var haycaminos=false;
var moveractual=false;
var anchoderecho= 300;
var altoderecho = 400;

let Nodos = [];
let Aristas =[];

let RADIO=18; 
var currentPath=-1;
var canvas;

var addToQueue=false;
var addToStack=false;

var buscarCaminos=false;
var moverCamino= false;
haycaminossinvisitar=false;

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

var lblinfo;
var clickunoAr=true;


function setup() {

  canvas=createCanvas(anchoCanvas, altoCanvas);

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
  radioBtn.option('Breadth First Search');
  radioBtn.option('Depth First Search ');
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
  
  lblinfo=createP("");

  //Creando nodos.
  /* for (let i = 0; i < 20; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(10, 50);
    Nodos[i] = new Nodo(x, y, r);
  } */
  

}

var cual1=-1;
var unvisited=0;

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
  
  
          // console.log("Se va a crear el arista del nodo ", cual1);
          // console.log(Nodo1.x, " ,", Nodo1.y );
          // console.log("Al nodo: ", cual);
          // console.log(Nodo2.x, " ,", Nodo2.y ); 
  
  
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

  if(radioBtn.value()== 'Depth First Search ' || radioBtn.value() == 'Breadth First Search' ){
    comenzarBtnFlag=true;
    editarBtn.hide();
    comenzarBtn.hide();
    radioBtn.hide();
  
    // lastBtn.show();
    nextBtn.show();
  
    regresarElegirBtn.show();
  }else{
    comenzarBtnFlag=false;
    alert("Debe elegir un algoritmo!");
  }

  

}

function lastBtnPressed(){

}

function nextBtnPressed(){
  // console.log("Pressed.");

  

  if( radioBtn.value()=='Breadth First Search')
  {
 
    //1. 
    if( currentNode!=-1 ){
       //Si es el primer nodo, marcar como visitado.
      if(currentNode==0 && (!Nodos[currentNode].visitado) ){
        //Se acaba de comenzar.
        Nodos[currentNode].visitado=true;
        lblinfo.html("Visitando al primer nodo ("+currentNode.toString() +"). Marcando como visitado.");
        buscarCaminos=true;
        haycaminos=false;
        paths=[]
      }


      // ___________________________________________________________________________________________________________

      else if(buscarCaminos){
        console.log("buscarcaminos");
        //El nodo actual ya se visitó. Buscando cuantos nodos hay a un paso del nodo actual.
        for(edge of Aristas){
          if(edge.Nodo1.x ==  Nodos[currentNode].x && edge.Nodo1.y ==  Nodos[currentNode].y )
          {
            //tomar Nodo2 como un camino desde Nodos[currentNode]
            //console.log("Pushing node ", edge.Nodo1.numero);
            paths.push( edge.Nodo2 );
          }else if(edge.Nodo2.x ==  Nodos[currentNode].x && edge.Nodo2.y ==  Nodos[currentNode].y  ){
            //tomar Nodo1 como un camino desde Nodos[currentNode]
            paths.push( edge.Nodo1);
            // console.log("Pushing node ", edge.Nodo2.numero);
          }

        }

        
        if( paths.length >0){
          haycaminos=true;

          if( paths.length >1)
            lblinfo.html("Hay "+paths.length.toString() + " posibles caminos desde el nodo "+currentNode.toString()+ "\n. Se van a visitar los caminos.");
          else
            lblinfo.html("Hay "+paths.length.toString() + " posible camino desde el nodo "+currentNode.toString()+ "\n. Se va a visitar el camino.");

          

          //Buscando cuantos no se han visitado.
          unvisited=0;
          for(way of paths ){
            if(!way.visitado)
              unvisited++;
          }
        }
        else{
          lblinfo.html(" No Hay posibles caminos desde el nodo "+currentNode.toString());
          haycaminos=false;
          moveractual=true;
        }

        buscarCaminos=false;

      }
       //_____________________________________________________________________________________________________________

      else if(auxflg ){
        console.log("auxptr visitando el nodo ");
        auxptr = toVisit;
        if(!Nodos[auxptr].visitado){
          lblinfo.html(" Visitando el nodo "+auxptr.toString() + " desde el nodo "+currentNode.toString());
          marcaraux=auxptr;
          auxptr=-1;
          auxflg=false;
        }
        
      }
      //_____________________________________________________________________________________________________________
      else if(marcaraux!=-1){
        console.log("Marcando");
        Nodos[marcaraux].visitado=true;
        lblinfo.html(" Marcando el  nodo "+marcaraux.toString() + " como visitado. ");
        addToQueue=true;
        
        toAdd=marcaraux;
        marcaraux=-1;
        
      }
      //_____________________________________________________________________________________________________________
      else if(addToQueue){
        console.log("Adding to quee");
        //CHECAR QUE SE AÑADA COMO COLA Y NO COMO PILA.
        nodoAux= new Nodo(Nodos[toAdd].x, Nodos[toAdd].y, Nodos[toAdd].r,Nodos[toAdd].numero );
        //Calcular su valor en y.
        nodoAux.x= ((anchoderecho-(20+ (anchoderecho/2)) )/2 )+ anchoderecho-(anchoderecho/2) ;
        
        
        // nodoAux.y= altoderecho- ((toAdd+1)* nodoAux.r*2); //TODO que la altura sea el alto menos la suma de radios*2 que hay en la Cola.
        // nodoAux.y= altoderecho- ((factor+1)* nodoAux.r*2); //TODO que la altura sea el alto menos la suma de radios*2 que hay en la Cola.
        //CHECAR ^__ BUScar que numero de elemento es toAdd en la Cola ese numero es el que se debe multiplicar por la altura.
        
        Cola.push(nodoAux);
      
      
        var factor=-1;
        for(var contad=0; contad< Cola.length ; contad++){
          // console.log("Checando Cola nodo: ", Cola[contad].numero);
           if( Nodos[toAdd].numero == Cola[contad].numero ){
             factor=contad;
            //  console.log("Found! @ ", contad);
             break;
           }
        }
      
        
        Cola[Cola.length-1].y= altoderecho- ((factor+1)* nodoAux.r*2); //TODO que la altura sea el alto menos la suma de radios*2 que hay en la Cola.
        
      
        
        lblinfo.html("Se añade el nodo a la cola.")
      
        addToQueue=false;
      }
      //_____________________________________________________________________________________________________________
      else if( haycaminos){
        console.log("haycaminos");
        
        if( unvisited==0){
          moveractual=true;
          haycaminos=false;
          lblinfo.html(" Ya se han visitado todos los nodos desde el nodo "+currentNode.toString());
        }
        else
        {
          //Mover auxpointer.
          
          toVisit=paths.pop().numero;
          auxflg=true;
          
          unvisited--;
        }

      }

      //______________________________________________________________________________________________________________
      else if( moveractual){

        //Moviendo actual al primer elemento en la cola.
        lblinfo.html(" Ya se han visitado todos los nodos desde el nodo "+currentNode.toString());
        //Mover currentNode
        currentNode= Cola.splice(0,1)[0].numero ;

        moveractual=false;

        

      }
      //______________________________________________________________________________________________________________

    }

  }else if(radioBtn.value()=='Depth First Search ')
  {
    if(currentNode!=-1 ){
      if(!Nodos[currentNode].visitado ){
        Nodos[currentNode].visitado=true;
        addToStack=true;
        lblinfo.html("Marcando nodo "+currentNode.toString() +" como visitado.")
      }else if(addToStack ){
        //Añadiendo a la pila.
        nodoAux= new Nodo(Nodos[currentNode].x, Nodos[currentNode].y, Nodos[currentNode].r,Nodos[currentNode].numero );
        //Calcular su valor en y.
        nodoAux.x= ((anchoderecho-(20+ (anchoderecho/2)) )/2 )+ anchoderecho-(anchoderecho/2) ;
        
        
        // nodoAux.y= altoderecho- ((currentNode+1)* nodoAux.r*2); //TODO que la altura sea el alto menos la suma de radios*2 que hay en la pila.
        // nodoAux.y= altoderecho- ((factor+1)* nodoAux.r*2); //TODO que la altura sea el alto menos la suma de radios*2 que hay en la pila.
        //CHECAR ^__ BUScar que numero de elemento es currentNode en la pila ese numero es el que se debe multiplicar por la altura.
        
        Pila.push(nodoAux);


        var factor=-1;
        for(var contad=0; contad< Pila.length ; contad++){
          // console.log("Checando pila nodo: ", Pila[contad].numero);
           if( Nodos[currentNode].numero == Pila[contad].numero ){
             factor=contad;
            //  console.log("Found! @ ", contad);
             break;
           }
        }

        
        Pila[Pila.length-1].y= altoderecho- ((factor+1)* nodoAux.r*2); //TODO que la altura sea el alto menos la suma de radios*2 que hay en la pila.
        

        console.log("Added node to stack!")
        lblinfo.html("Se añade el nodo a la pila")
        //Dibujando.
        buscarCaminos=true;
        currentPath=-1;
        paths=[]
        addToStack=false;
      }else if( buscarCaminos){
        //Buscar si hay caminos desde el nodo actual.
        // console.log("Got here. Looking paths.");
        if(currentPath==-1){
          //Buscar caminos.
          //Buscando todas las aristas que tengan al nodo.
          for(edge of Aristas){
            if(edge.Nodo1.x ==  Nodos[currentNode].x && edge.Nodo1.y ==  Nodos[currentNode].y )
            {
              //tomar Nodo2 como un camino desde Nodos[currentNode]
              //console.log("Pushing node ", edge.Nodo1.numero);
              paths.push( edge.Nodo2 );
            }else if(edge.Nodo2.x ==  Nodos[currentNode].x && edge.Nodo2.y ==  Nodos[currentNode].y  ){
              //tomar Nodo1 como un camino desde Nodos[currentNode]
              paths.push( edge.Nodo1);
              // console.log("Pushing node ", edge.Nodo2.numero);
            }

          }
          
          if(paths.length >0 ){
            currentPath=0;
          }

        }

        console.log("Hay ", paths.length, " caminos");
        //**************************************************************
        // lblinfo.html("Hay "+ paths.length.toString()+ " caminos");
        //De los posibles caminos, ir al camino no visitado con numeor menor.
        var m=0
        var posiblescaminos=false;
        for( p of paths){
          console.log("checando el camino", m+1, " este camino es hacia el nodo ", p.numero);
          //lblinfo.html("Checando el camino hacia el nodo "+ p.numero.toString() );
          if(! Nodos[p.numero ].visitado){
            currentNode=p.numero;
            console.log("No se ha visitado, Cambiando al nodo ", p.numero);
            lblinfo.html("No se ha visitado el nodo"+ p.numero.toString()+ ", cambiando al nodo "+ p.numero.toString());
            buscarCaminos=false;
            posiblescaminos=true;
            break;
          }

          
          m++;
        }

        if(!posiblescaminos){
          //si ya no hay a donde ir.
          console.log("Ya se visitó, no ir. No hay donde ir, ir al ultimo elemento de la pila.")
          
          //Moviendo al valor donde apunta la pila.
          
          //
          
          Pila.pop().numero;
          lblinfo.html("Ya No hay nodos que no se hayan visitado desde el nodo "+currentNode + " <br> Cambiando ultimo nodo en la pila, el nodo: "+ Pila[Pila.length-1].numero);
          currentNode= Pila[Pila.length-1].numero;
          
          
          

          currentPath=-1;
          //console.log("Popping node ",  );
        }

        

      }
    }
  

  }


}

function regresarElegirBtnPressed(){
  comenzarBtnFlag=false;
  editarBtn.show();
  comenzarBtn.show();
  radioBtn.show();

  lastBtn.hide();
  nextBtn.hide();

  regresarElegirBtn.hide();

  //Que se limpieelcanvas derecho y que se marquen como no visitados todso.
  for( nod of Nodos){
    nod.visitado=false;
  }

  Pila=[];
  Cola=[];
  currentNode=-1;
  auxptr=-1;  
  auxflg=false;

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
  let con=0;
  for (let b of Nodos) {
    b.showOnLeft();
    
    if( comenzarBtnFlag ){

      if(con==currentNode || con==auxptr)
      {
        if(con==currentNode){
          flechaux= new Flecha( b );
          flechaux.showIzq();
        }else{
          //Dibujando una flecha auxiliar. verde.

          flechaux2= new Flecha( b, 0, 255, 0 );
          flechaux2.showIzq();
        }
      }else if(currentNode==-1 && Nodo.length >0 ){
        currentNode=0;
      }
    
      con++;

    }
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
    rightBuffer.noStroke();
    rightBuffer.fill(0);
    rightBuffer.text(algoritmo, anchoderecho / 2, 20);
    

    //Dibujando contorno de pila/cola
    rightBuffer.stroke(255);
    rightBuffer.strokeWeight(3);
    // rightBuffer.fill(39, 125, 200);
    rightBuffer.noFill();
    // rightBuffer.ellipse(20, 20, 9 * 2);
    rightBuffer.rect( anchoderecho-(anchoderecho/2), 40, anchoderecho-(20+ (anchoderecho/2)), altoderecho-50 )
    //rightBuffer.noFill();


    //Dibujando los elementos de la pila o cola.
    if(radioBtn.value()== 'Depth First Search '  ){

      rightBuffer.noStroke();
      rightBuffer.fill(0);
      rightBuffer.text("Inicio de la Pila ->", anchoderecho*.1, 45);
      rightBuffer.text("Fin de la Pila ->", anchoderecho*.1 , altoderecho-20);
      //Dibujando elementos de la pila.
      for( el of Pila ){
        el.showOnRight();
      }

    }else if(   radioBtn.value() == 'Breadth First Search' ){

      rightBuffer.noStroke();
      rightBuffer.fill(0);
      rightBuffer.text("Inicio de la Cola ->", anchoderecho*.1, 45);
      rightBuffer.text("Fin de la Cola ->", anchoderecho*.1, altoderecho- 20);
      //Dibujando elementos de la cola.
      for( el of Cola ){
        el.showOnRight();
      }
    }
    
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

  showOnLeft() {
    leftBuffer.stroke(255);
    leftBuffer.strokeWeight(3);
    
    if(!this.visitado)
      leftBuffer.fill(this.brightness, 125, 200);
    else
      leftBuffer.fill(0,200,20);
    // leftBuffer.noFill();
    
    leftBuffer.ellipse(this.x, this.y, this.r * 2);

    leftBuffer.noStroke();
    leftBuffer.fill(0);
    leftBuffer.text(this.numero, this.x-2, this.y+1);  
  }

  showOnRight() {
    rightBuffer.stroke(255);
    rightBuffer.strokeWeight(3);
    
    rightBuffer.fill(this.brightness, 125, 200);
    // leftBuffer.noFill();
    
    rightBuffer.ellipse(this.x, this.y, this.r * 2);

    rightBuffer.noStroke();
    rightBuffer.fill(0);
    rightBuffer.text(this.numero, this.x-2, this.y+1);  
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

class Flecha {
  //Crear una flecha que apunta a un nodo.
  constructor( nodo, r=255, g=0, b=0  ) {
    // verticeIzq, verticeSuperior, verticeInferior, verticeDer

    //Verificando si el nodo está muy a la izquierda, en ese caso orientar a la derecha.

    if(nodo.x <= nodo.r*2){
      //La distancia por la izquierda es pequeña, orientar a la derecha.
    }else{
      this.verticeDerX=nodo.x - (nodo.r + nodo.r*.2 ) ;
      this.verticeDerY=nodo.y;

      this.verticeIzqX=nodo.x - (nodo.r *3 ) ;
      this.verticeIzqY=nodo.y;

      
      this.verticeSuperiorX=this.verticeDerX- (nodo.r*.4);
      this.verticeSuperiorY=nodo.y - (nodo.r*.3) ;

      this.verticeInferiorX=this.verticeSuperiorX;
      this.verticeInferiorY= nodo.y + (nodo.r*.3);

      this.r=r;
      this.g=g;
      this.b=b;
    }

    
  }

  showIzq(){
    //leftBuffer.stroke(this.r,this.g,this.b);
    leftBuffer.stroke(255,0,0);
    leftBuffer.strokeWeight(3);
    leftBuffer.fill(this.r,this.g,this.b);
    //Linea de vertizq al centro de la linea entre vertSup y vertInf
     leftBuffer.line( this.verticeIzqX, this.verticeIzqY, this.verticeInferiorX, this.verticeIzqY  );
    // leftBuffer.line(this.verticeIzqX, this.verticeIzqY, this.verticeDerX,this.verticeDerY);

    //Triangulo de los puntos verticeSuperior, verticeInferior, verticeDer

    leftBuffer.triangle(this.verticeDerX,this.verticeDerY, this.verticeSuperiorX, this.verticeSuperiorY, this.verticeInferiorX, this.verticeInferiorY);
    // leftBuffer.triangle(this.verticeIzqX,this.verticeIzqY, this.verticeSuperiorX, this.verticeSuperiorY, this.verticeInferiorX, this.verticeInferiorY);

  }


  
  showDer(){
    rightBuffer.stroke(255,0,0);
    rightBuffer.strokeWeight(3);
    rightBuffer.fill(255,0,0);
    //Linea de vertizq al centro de la linea entre vertSup y vertInf
    rightBuffer.line( this.verticeIzqX, this.verticeIzqY, this.verticeInferiorX, this.verticeIzqY  );
    // leftBuffer.line(this.verticeIzqX, this.verticeIzqY, this.verticeDerX,this.verticeDerY);

    //Triangulo de los puntos verticeSuperior, verticeInferior, verticeDer

    rightBuffer.triangle(this.verticeDerX,this.verticeDerY, this.verticeSuperiorX, this.verticeSuperiorY, this.verticeInferiorX, this.verticeInferiorY);
    // leftBuffer.triangle(this.verticeIzqX,this.verticeIzqY, this.verticeSuperiorX, this.verticeSuperiorY, this.verticeInferiorX, this.verticeInferiorY);

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
