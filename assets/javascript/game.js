$(document).ready(function() {

var hp1;
var hp2;
var userAttack;
var compAttack;

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

// displays available characters from characters array
characters.forEach(function(char){
    $("#availableCharacters").append("<div class='col-3'><div class='card text-center character'><div class='card-header name'>"+char.name+"</div><div class='imgBox'><img src="+char.img+" class='img' alt="+char.name+"></div><div class='card-footer hp'>"+char.hp+"</div></div></div>")
})


// activates when a available character is clicked
$(".character").on("click", function(){
    // moves clicked character to the Your Character section
    $("#userCharacter").append(this)
    // hides the other available characters that weren't selected
    $("#availableCharacters").css("display", "none")
});





});