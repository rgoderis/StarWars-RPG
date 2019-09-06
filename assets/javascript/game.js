

var hp1 = 100;
var hp2 = 100
var userAttack;
var counterAttack;
var userIndex;
var userArray;
var enemyIndex;
var enemyArray;
var isDefeated = false;
var userSelected = false;
var enemySelected = false;

var characters = [
        {
            name: "Luke Skywalker",
            img: "assets/images/luke-skywalker.jpeg",
            hp: 100,
            attack: 10,
            counterAttack: 10,
            value: ""},
        {
            name: "Darth Vader",
            img: "assets/images/darth-vader.jpg",
            hp: 150,
            attack: 10,
            counterAttack: 20,
            value: ""},
        {
            name: "Emperor Palpatine",
            img: "assets/images/emperor-palpatine.jpg",
            hp: 175,
            attack: 10,
            counterAttack: 25,
            value: ""},
        {
            name: "Obi-Wan Kenobi",
            img: "assets/images/obi-wan-kenobi.png",
            hp: 125,
            attack: 10,
            counterAttack: 15,
            value: ""}];

// function that reassigns the value attribute to its index in the array
function charIndex(arr) {
    arr.forEach(function(i){
        var index = arr.indexOf(i)
        characters[index].value = index;
    })
}
// sets index of characters
charIndex(characters)

// functons that calculates the attack value
// function attackCounter(attack) {
//     var baseAttack = attack
//     var newAttack = attack + baseAttack
//     console.log(newAttack)
// }

// function that displays character array to DOM
function displayCharacters(id, arr) {
    arr.forEach(function(char){
        $(id).append("<div class='col-3 character' value="+char.value+"><div class='card text-center'><div class='card-header name'>"+char.name+"</div><div class='imgBox'><img src="+char.img+" class='img' alt="+char.name+"></div><div class='card-footer hp'>"+char.hp+"</div></div></div>")
        });        
}

// same as before but changes class of character to enemy
function displayEnemies(id, arr){
    arr.forEach(function(char){
        $(id).append("<div class='col-3 enemy' value="+char.value+"><div class='card text-center'><div class='card-header name'>"+char.name+"</div><div class='imgBox'><img src="+char.img+" class='img' alt="+char.name+"></div><div class='card-footer hp'>"+char.hp+"</div></div></div>")
        });     
}

$(document).ready(function() {

    // displays characters to availableCharacters div
    displayCharacters("#availableCharacters", characters)

    // activates when a available character is clicked 
    $(".character").on("click", function(){
        if(userSelected){
            return(false)
        } else{  
            $(this).addClass("user")
            // retrieving index of user character
            userIndex = parseInt($(".user").attr("value"));
            userArray = characters.splice(userIndex, 1);
            // updates value in characters array
            charIndex(characters)
            // updates value in userArray
            userArray[0].value = 0
            // hides availableCharacters div
            $("#availableCharacters").css("display", "none")
            // moves clicked character to the Your Character section
            displayCharacters("#userCharacter", userArray)
            // moves new array of available characters to availableEnemies div
            displayEnemies("#availableEnemies", characters)
            userSelected = true;  
        }
    });  

    // activates when a enemy is clicked
    $(document).on("click", ".enemy", function(){    
        if(enemySelected){
            return(false)
        } else{
            $(this).addClass("chosenEnemy")
            // retrieves index of enemy character
            enemyIndex = $(".chosenEnemy").attr("value")
            enemyArray = characters.splice(enemyIndex, 1);
            // updates value in characters array
            charIndex(characters);
            // updates value in enemyArray
            charIndex(enemyArray)
            // updates availableEnemies
            displayEnemies("#availableEnemies", characters)
            // displays selected enemy in chosenEnemy div
            displayCharacters("#chosenEnemy", enemyArray)
            enemySelected = true;
        }

    });

});