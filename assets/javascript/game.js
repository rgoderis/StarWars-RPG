var hp1 = 100;
var hp2 = 100
var userAttack;
var compAttack;
var isDefeated = false;
var userSelected = false;
var enemySelected = false;

var characters = [
        {
            name: "Luke Skywalker",
            img: "assets/images/luke-skywalker.jpeg",
            hp: 100,
            attack: 10,
            counterAttack: 10},
        {
            name: "Darth Vader",
            img: "assets/images/darth-vader.jpg",
            hp: 100,
            attack: 10,
            counterAttack: 10},
        {
            name: "Emperor Palpatine",
            img: "assets/images/emperor-palpatine.jpg",
            hp: 100,
            attack: 10,
            counterAttack: 10},
        {
            name: "Obi-Wan Kenobi",
            img: "assets/images/obi-wan-kenobi.png",
            hp: 100,
            attack: 10,
            counterAttack: 10}];

$(document).ready(function() {

    // displays available characters from characters array
    characters.forEach(function(char){
        $("#availableCharacters").append("<div class='col-3 character'><div class='card text-center'><div class='card-header name'>"+char.name+"</div><div class='imgBox'><img src="+char.img+" class='img' alt="+char.name+"></div><div class='card-footer hp'>"+char.hp+"</div></div></div>")
        });

    // activates when a available character is clicked
    $(".character").on("click", function(){
        if(userSelected === false){
        // moves clicked character to the Your Character section
        $("#userCharacter").append(this);

        // remove .character class from userCharacter div
        // $(this).removeClass("character")

        // moves remaining characters to Avaialble Enemies
        $("#availableEnemies").append($("#availableCharacters"))                 
        userSelected = true;          
        } else {
            // moves clicked character to chosenEnemy div
            $("#chosenEnemy").append(this);
            enemySelected = true;
        }

        // prevent user from clicking on another character
        if(enemySelected === true){
            // should prevent the user from clicking on any other characters
            $(".character").off("click");
        }
    });

});