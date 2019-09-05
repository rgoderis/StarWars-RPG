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
charIndex(characters)

// functons that calculates the attack value
// function attackCounter(attack) {
//     var baseAttack = attack
//     var newAttack = attack + baseAttack
//     console.log(newAttack)
// }

// function that displays character array to DOM
function displayCharacters(id) {
    characters.forEach(function(char){
        $(id).append("<div class='col-3 character' value="+char.value+"><div class='card text-center'><div class='card-header name'>"+char.name+"</div><div class='imgBox'><img src="+char.img+" class='img' alt="+char.name+"></div><div class='card-footer hp'>"+char.hp+"</div></div></div>")
        });        
}
$(document).ready(function() {

    // displays characters to availableCharacters div
    displayCharacters("#availableCharacters")

    // activates when a available character is clicked
    $(".character").on("click", function(){
        // if(userSelected === false){
        
        $(this).addClass("user")
        // retrieving index of user character
        userIndex = parseInt($(".user").attr("value"));
        userArray = characters.splice(userIndex, 1);
        charIndex(characters)

        console.log(userArray)
        console.log(characters)

        // moves clicked character to the Your Character section
        displayCharacters("#availableEnemies")
          
            
        // remove .character class from userCharacter div
        // $(this).removeClass("character")

        // moves remaining characters to Avaialble Enemies
        // $("#availableEnemies").append($("#availableCharacters"))                 
        // userSelected = true;          
        // } 
        // else {

        //     // moves clicked character to chosenEnemy div
        //     $("#chosenEnemy").append(this);
        //     enemySelected = true;
        // }

        // // prevent user from clicking on another character
        // if(enemySelected === true){
        //     // should prevent the user from clicking on any other characters
        //     $(".character").off("click");
        // }
    });
    

    // attackCounter(characters[0].attack)

});