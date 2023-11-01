const rl = require("readline-sync");
const chalk = require("chalk");
const mazoRevuelto = require("./modules/deck-shuffle");
const selectionUno = require("./modules/seleccion");

//juego UNO
async function jugar() {
  var deck = [];
  var colors = ["yellow", "blue", "green", "red"];
  var types = ["Comun", "Especial", "Comodin"];
  var card = {
    color: null, // amarillo, azul , verde , rojo
    number: null, // 0-9
    Type: null, // comun, especiales y comodines
  };

  for (var cColor = 0; cColor < colors.length; cColor++) {
    for (var cNumber = 0; cNumber < 10; cNumber++) {
      deck.push({ color: colors[cColor], number: cNumber, type: "comun" });
    }
    for (var cNumber1 = 1; cNumber < 10; cNumber1++) {}
    deck.push({ color: colors[cColor], number: "+2", type: "comun" });
    deck.push({ color: colors[cColor], number: "+2", type: "comun" });
    deck.push({ color: colors[cColor], number: "B", type: "comun" });
    deck.push({ color: colors[cColor], number: "B", type: "comun" });
    deck.push({ color: colors[cColor], number: "R", type: "comun" });
    deck.push({ color: colors[cColor], number: "R", type: "comun" });
  }

  deck.push({ color: null, number: "+4", type: "comodin" });
  deck.push({ color: null, number: "+4", type: "comodin" });
  deck.push({ color: null, number: "+4", type: "comodin" });
  deck.push({ color: null, number: "+4", type: "comodin" });
  deck.push({ color: null, number: "CC", type: "comodin" });
  deck.push({ color: null, number: "CC", type: "comodin" });
  deck.push({ color: null, number: "CC", type: "comodin" });
  deck.push({ color: null, number: "CC", type: "comodin" });

  const players = rl.question("¿cuantos jugadores seran?", {});
  const totalcards = players * 7;
  // Deck Shuffle
  mazoRevuelto(deck);
  var cardsPlayers = {};

  for (var cTcards = 0; cTcards < 7; cTcards++) {
    for (var cPlayers = 0; cPlayers < players; cPlayers++) {
      if (!cardsPlayers["player_" + cPlayers]) {
        cardsPlayers["player_" + cPlayers] = [];
      }

      cardsPlayers["player_" + cPlayers].push(deck.shift());
    }
  }
  var trash = [];
  trash.push(deck.shift());

  function cardValidation(card) {
    if (
      card.number == trash[trash.length - 1].number ||
      card.color == trash[trash.length - 1].color
    ) {
      return true;
    } else {
      return false;
    }
  }

  // Recorremos a los jugadores
  for (const player in cardsPlayers) {
    
    console.log(
      chalk.bgWhite("Ultima carta tirada:") + 
      " " + 
      chalk[trash[trash.length - 1].color].bold(
        trash[trash.length - 1].number
        )
    );
    let end = false;
    // Mientras el turno no acabe
    while (end == false) {
      //  Imprimimos el jugador actual como referencia
      console.log("Jugador actual: ", player);
      // Mostramos sus cartas y esperamos seleccione una
      const result = (await selectionUno(cardsPlayers[player], "CHOICE"))
        .selectedOption;
      // Buscar carta seleccionada
      // obtener el index de la carta (buscar result en el arreglo cardsPlayers[player])
      let cardIndex = cardsPlayers[player].findIndex((card) => {
        return card.number == result.number && card.color == result.color;
      }); // Aqui va el index obtenido
      // mediante ese index obtenido
      // validar la carta con nuestra funcion cardValidation()
      // Validar si la carta se puede usar
      if (cardValidation(cardsPlayers[player][cardIndex])) {
        // si es valida end = true
        // se agrega a trash y se remueve del jugador
        trash.push(cardsPlayers[player].splice(cardIndex, 1)[0]);
        // el turno termina y se pasa al sig jugador mediante el while automaticamente
        end = true;
      }
      // 25 min
      // Validar si la carta es un comodin
      // Supongo que la carta es una variable que contiene el valor de la carta
// y que trash es un array que contiene las cartas descartadas
// y que jugador es un array que contiene las cartas del jugador actual

// Validar si la carta es un comodín
// Validar si la carta es un comodín
function cardValidation(card) {
  // Los comodines son los valores +2, +4, Cc y R
  if (card.number == "+2" || card.number == "+4" || card.number == "CC" || card.number == "R") {
    return true;
  } else {
    return false;
  }
}

else if (cardValidation(card)) {
  // Si la carta es un comodín agregarla al trash y quitarla del jugador
  trash.push(card);
  jugar.splice(jugar.indexOf(card), 1);
  // El turno se termina y pasa al siguiente jugador
  // Supongo que hay una variable turno que indica el número del jugador actual
  // y que hay una variable n que indica el número total de jugadores
  turno = (turno + 1) % n;
}
  
  
}
      }
      // el while authmaticamente reinicia a el principio
    }
  

jugar();
