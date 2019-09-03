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
// display character name
// characters.forEach(displayName)
// function displayName(character) {
//     console.log(character.name)
//     $(".name").text(character.name)
// }



$(".character").on("click", function(){
    console.log(this);
    $("#userCharacter").append(this)
    $("#availableCharacters").css("display", "none")
    // console.log(this.name)
    // $("#charName").text("character name");
    // $("#charImg").text("character image");
    // $("#charHP").text("character hp");
});





});