const rl = require("readline-sync");
const chalk = require("chalk");
const mazoRevuelto = require('./modules/revuelveMazo')
//juego UNO
var deck = [];
var colors = ["yellow","blue", "green", "red"];
var types = ["Comun", "Especial","Comodin"];
var card = {
    color: null, // amarillo, azul , verde , rojo 
    number: null, // 0-9
    Type: null // comun, especiales y comodines
};

for (var cColor = 0; cColor < colors.length; cColor++ ){
    
    for (var cNumber = 0; cNumber < 10; cNumber++){
        
        deck.push({color: colors[cColor], number: cNumber, type: "comun"});
    }
    for (var cNumber1 = 1; cNumber < 10; cNumber1++){
        
    }
    deck.push({color: colors[cColor], number: "+2", type: "comun"});
    deck.push({color: colors[cColor], number: "+2", type: "comun"});
    deck.push({color: colors[cColor], number: "B", type: "comun"});
    deck.push({color: colors[cColor], number: "B", type: "comun"});
    deck.push({color: colors[cColor], number: "R", type: "comun"});
    deck.push({color: colors[cColor], number: "R", type: "comun"});

} 

deck.push({color: null, number: "+4", type: "comun"});
deck.push({color: null, number: "+4", type: "comun"});
deck.push({color: null, number: "+4", type: "comun"});
deck.push({color: null, number: "+4", type: "comun"});
deck.push({color: null, number: "CC", type: "comun"});
deck.push({color: null, number: "CC", type: "comun"});
deck.push({color: null, number: "CC", type: "comun"});
deck.push({color: null, number: "CC", type: "comun"});

const players = rl.question("¿cuantos jugadores seran?", {})
const totalcards = players * 7;
// Deck Shuffle
mazoRevuelto(deck);
var cardsPlayers = {};

for(var cTcards = 0; cTcards < 7; cTcards++){
    for(var cPlayers = 0; cPlayers < players; cPlayers++) {
        if (!cardsPlayers["player_"+cPlayers]) {
            cardsPlayers["player_"+cPlayers] = [];
        }

        cardsPlayers["player_"+cPlayers].push(deck.shift());
        }
}
var trash = [];
trash.push(deck.shift());

function cardValidation(card) {
    console.log(card.number)
    //if (card.number == 2) llamar a numero y carta 
    if (card.number == trash[trash.length-1].number || card.color == trash[trash.length-1].color) {
        console.log("es igual");
    } else {console.log("no es igual")}
}

function jumpPlayer(card){
    if (card.number == "B") {
        return true
    }
    return false
}

console.log(chalk.bgWhite("Ultima carta tirada:") +" "+ chalk[trash[trash.length-1].color].bold(trash[trash.length-1].number))
console.log(trash[trash.length-1]);

//0 Perez Alegria -- Modulo/Funcionalidad "Seleccionar opciones (definidas)"
//0 Polanco Aguilar -- Modulo/Funcionalidad "Cambio Color"
//0 Caamal Cime -- Modulo/Funcionalidad "Comodin +4"
//0 Garcia Rafael -- Modulo/Funcionalidad "Especial +2"
//10 HH Ivan -- Modulo/Funcionalidad "Revolver/Randomizar cartas (deck)"
//0 Chi Hernandez -- Modulo/Funcionalidad "Especial Reversa"
//0 Yonni -- Modulo/Funcionalidad "Aplicar especial Brincar"