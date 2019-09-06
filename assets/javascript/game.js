

var userHp;
var enemyHp;
var baseAttack;
var userAttack = 0;
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
            attack: 6,
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
            attack: 12,
            counterAttack: 25,
            value: ""},
        {
            name: "Obi-Wan Kenobi",
            img: "assets/images/obi-wan-kenobi.png",
            hp: 125,
            attack: 8,
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

// function that increases attack amount
function countingAttack(attack) {
    // sets baseAttack to attack
    baseAttack = attack
    // add baseAttack to userAttack
    userAttack += baseAttack      
} 

// function that calculates user health
function userHealth(attack) {
    userHp -= attack
}

// function that calculates enemy health 
function enemyHealth(attack) {
    enemyHp -= attack
}

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
            userHp = userArray[0].hp;
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
            enemyIndex = parseInt($(".chosenEnemy").attr("value"));
            enemyArray = characters.splice(enemyIndex, 1);
            // updates value in characters array
            charIndex(characters);
            // updates value in enemyArray
            charIndex(enemyArray);
            // updates availableEnemies
            $("#availableEnemies").empty();
            displayEnemies("#availableEnemies", characters);
            // displays selected enemy in chosenEnemy div
            displayCharacters("#chosenEnemy", enemyArray);
            enemyHp = enemyArray[0].hp;
            enemySelected = true;
        }
    });
    
    
    $(document).on("click", "#attack", function(){
        
        // console.log("User HP is: " + userHp);
        
        // console.log("Enemy HP is: " + enemyHp)
        countingAttack(userArray[0].attack)
        console.log("User Attack is: " + userAttack)
        counterAttack = enemyArray[0].counterAttack;
        console.log("Enemy Countattack is: " + counterAttack)
        // calculates user health
        userHealth(counterAttack)
        // calculates enemy health
        enemyHealth(userAttack)
        console.log("User's remaining health is: " + userHp+ ", and Enemy's remaining health is: " + enemyHp);
        // display user health and enemy health to DOM
        if(userHp <= 0){
            console.log("you died")
        }
        if(enemyHp <= 0){
            console.log("you killed him");
            $("#chosenEnemy").empty();
            enemySelected = false;
        }
    })


});