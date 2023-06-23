
function gerarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function gerarCartela() {
    var cartela = [];
    var numeros = [];

    for (var i = 0; i < 5; i++) {
      var coluna = [];
  
      var min = i * 15 + 1;
      var max = (i + 1) * 15;
  
      while (coluna.length < 5) {
        var numero = gerarNumeroAleatorio(min, max);
        if (coluna.indexOf(numero) === -1) {
          coluna.push(numero);
        }
      }
  
      cartela.push(coluna);
      numeros = numeros.concat(coluna);
    }
  
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 5; j++) {
        var letra = "";
        if (j === 0) letra = "b";
        if (j === 1) letra = "i";
        if (j === 2) letra = "n";
        if (j === 3) letra = "g";
        if (j === 4) letra = "o";
        document.getElementById(letra + (i + 1)).textContent = cartela[j][i];
      }
    }
  
    return numeros;
  }
  
  var numerosSorteados = [];
  
  function GerarCartelas() {
    var cartelas = [];
  
    for (var i = 1; i <= 5; i++) {
      var numeros = gerarCartela();
      console.log("Cartela " + i + ": " + numeros);
      cartelas.push(numeros);
    }
  
    return cartelas;
  }
  
  function ReiniciarJogo() {

    numerosSorteados = [];
  
    for (var i = 1; i <= 5; i++) {
      for (var j = 1; j <= 5; j++) {
        document.getElementById("b" + j).textContent = "";
        document.getElementById("i" + j).textContent = "";
        document.getElementById("n" + j).textContent = "";
        document.getElementById("g" + j).textContent = "";
        document.getElementById("o" + j).textContent = "";
      }
    }
 
    var elementos = document.querySelectorAll("#cartela td");
    for (var i = 0; i < elementos.length; i++) {
      elementos[i].classList.remove("marcado");
      elementos[i].style.backgroundColor = "";
    }
  
    document.getElementById("mensagemVitoria").textContent = "";
  }
  
  function marcarNumeroSorteado(numero) {
    var elementos = document.querySelectorAll("#cartela td");
    for (var i = 0; i < elementos.length; i++) {
      if (elementos[i].textContent == numero) {
        elementos[i].classList.add("marcado");
        elementos[i].style.backgroundColor = "#ff714b";
      }
    }
  }
  
  function sortearNumero() {
    var numero;
    do {
      numero = gerarNumeroAleatorio(1, 75);
    } while (numerosSorteados.indexOf(numero) !== -1);
  
   
    var numerosElement = document.createElement("div");
    numerosElement.textContent = numero;
    numerosElement.classList.add("numero-gerado"); 
    document.getElementById("Numeros").appendChild(numerosElement);
  
    
    marcarNumeroSorteado(numero);
  
    numerosSorteados.push(numero);
  
    
    if (verificarVitoria()) {
     
      document.getElementById("mensagemVitoria").textContent = "Bingo! Você ganhou!";
    }
  }
  
  function Jogar() {
    var intervalId = setInterval(sortearNumero, 2000); 
  
   
    setTimeout(function () {
      clearInterval(intervalId);
    }, 10000);
  }
  
  
  function verificarVitoria() {

    for (var i = 1; i <= 5; i++) {
      var linhaCompleta = true;
      for (var j = 1; j <= 5; j++) {
        var letra = "";
        if (j === 1) letra = "b";
        if (j === 2) letra = "i";
        if (j === 3) letra = "n";
        if (j === 4) letra = "g";
        if (j === 5) letra = "o";
        var elemento = document.getElementById(letra + i);
        if (!elemento.classList.contains("marcado")) {
          linhaCompleta = false;
          break;
        }
      }
      if (linhaCompleta) {
        return true;
      }
    }
  
    for (var i = 1; i <= 5; i++) {
      var colunaCompleta = true;
      for (var j = 1; j <= 5; j++) {
        var letra = "";
        if (i === 1) letra = "b";
        if (i === 2) letra = "i";
        if (i === 3) letra = "n";
        if (i === 4) letra = "g";
        if (i === 5) letra = "o";
        var elemento = document.getElementById(letra + j);
        if (!elemento.classList.contains("marcado")) {
          colunaCompleta = false;
          break;
        }
      }
      if (colunaCompleta) {
        return true;
      }
    }
  
    var diagonal1Completa = true;
    var diagonal2Completa = true;
    for (var i = 1; i <= 5; i++) {
      var elemento1 = document.getElementById("elemento" + i + i);
      var elemento2 = document.getElementById("elemento" + i + (6 - i));
      if (!elemento1.classList.contains("marcado")) {
        diagonal1Completa = false;
      }
      if (!elemento2.classList.contains("marcado")) {
        diagonal2Completa = false;
      }
    }
    if (diagonal1Completa || diagonal2Completa) {
      return true;
    }
  
    return false;
  }