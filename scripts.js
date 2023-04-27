var cadena = [];
var cadenaNumCompactos = [];
var resultado = 0;

function contarMultYDiv() {
  let cont = 0;
  for (let i=0;i<cadenaNumCompactos.length;i++) {
    if (cadenaNumCompactos[i] == "*" || cadenaNumCompactos[i] == "/") {
      cont += 1;
    }
  }
  return cont;
}

function ChequearDatos () {
  let check=true;
  for (let i=0; i<cadena.length; i++) {
    if (cadena[i] == "+" ||
        cadena[i] == "-" ||
        cadena[i] == "*" ||
        cadena[i] == "/" ) {
      valor_ant = cadena[i-1];
      valor_pos = cadena[i+1];
      if (cadena[i] == valor_ant || cadena[i] == valor_pos) check=false;
    }
  }
  return check;
}

function CompactarCadena () {
  cadenaNumCompactos = [];
  while (cadena.length > 0) {
    let i=0;
    let num = "";
    while (cadena[i] !== "+" && 
           cadena[i] !== "-" &&
           cadena[i] !== "*" &&
           cadena[i] !== "/" &&
           cadena[i] !== undefined) {
      num += cadena[i];
      i++;
    }
    cadenaNumCompactos.push(num);
    if ( cadena[i] == "+" || 
         cadena[i] == "-" ||
         cadena[i] == "*" ||
         cadena[i] == "/" ) {
      cadenaNumCompactos.push(cadena[i]);
    }  
    cadena.splice(0,i+1);
  }
}

function calcular () {
  let cantDeMultYDiv = contarMultYDiv();
  for (let j=0;j<cantDeMultYDiv;j++){
    for (let i=0; i<cadenaNumCompactos.length; i++){
      if(cadenaNumCompactos[i]=="*") {
        let calc = parseFloat(cadenaNumCompactos[i-1])*parseFloat(cadenaNumCompactos[i+1]);
        cadenaNumCompactos[i-1]=calc;
        cadenaNumCompactos.splice(i,2);
        i=0;
        break;
      }  
      if(cadenaNumCompactos[i]=="/") {
        let calc = parseFloat(cadenaNumCompactos[i-1])/parseFloat(cadenaNumCompactos[i+1]);
        cadenaNumCompactos[i-1]=calc;
        cadenaNumCompactos.splice(i,2);
        i=0;
        break;
      }
    }
  }
  resultado = cadenaNumCompactos[cadenaNumCompactos.length-1];
  cadenaNumCompactos.pop();
  
  while (cadenaNumCompactos.length > 1) {
    if (cadenaNumCompactos[cadenaNumCompactos.length-1] == "+"){
      resultado = parseFloat(resultado) + parseFloat(cadenaNumCompactos[cadenaNumCompactos.length-2]);
      cadenaNumCompactos.pop();
      cadenaNumCompactos.pop();
    }
    if (cadenaNumCompactos[cadenaNumCompactos.length-1] == "-"){
      resultado = parseFloat(resultado) - parseFloat(cadenaNumCompactos[cadenaNumCompactos.length-2]);
      cadenaNumCompactos.pop();
      cadenaNumCompactos.pop();
    }
  }
  return resultado;
}

const calculadora = document.getElementById("calculadora");
document.getElementById("renglon1").innerHTML = "";
document.getElementById("renglon2").innerHTML = 0;
  
calculadora.addEventListener("click", function(event) {
  if (event.target.classList.contains("boton")) {
    let valor = event.target.value;
    if (valor=="=") {
      if (!isNaN(cadena[cadena.length-1])){
        if(ChequearDatos()) {
          CompactarCadena();
          resultado = calcular();
          document.getElementById("renglon2").innerHTML = resultado;
        } else {
          document.getElementById("renglon2").innerHTML = "Error de tipeo";
        }
      } else {
        if (cadena.length !== 0){
          document.getElementById("renglon2").innerHTML = "No termina en numero";
        }
      }  
    } else if (valor=="C") {
      cadena = [];
      document.getElementById("renglon1").innerHTML = "";
      document.getElementById("renglon2").innerHTML = 0;
    } else if (valor=="CE" && document.getElementById("renglon1").innerHTML !== "") {
      let ultimo = cadena.length-1;
      while (cadena[ultimo] !== "+" && 
             cadena[ultimo] !== "-" &&
             cadena[ultimo] !== "*" &&
             cadena[ultimo] !== "/" ) {
        cadena.pop();
        ultimo = cadena.length-1;
        if (ultimo <= 0) {
          document.getElementById("renglon1").innerHTML = "";
          break;
        }   
      }
      cadena.pop(); /*para eliminar tambien la operacion matematica*/
      document.getElementById("renglon1").innerHTML = cadena.join("");
    } else if (valor=="i") {
      cadena.pop();
      document.getElementById("renglon1").innerHTML = cadena.join("");
    } else {
      if (valor !== "CE") cadena.push(valor);
      document.getElementById("renglon1").innerHTML = cadena.join("");
    }
  }  
});