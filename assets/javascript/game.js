

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
var restart = false;

var characters = [
        {
            name: "Luke Skywalker",
            img: "assets/images/luke-skywalker.jpeg",
            hp: 100,
            attack: 15,
            counterAttack: 10,
            value: ""},
        {
            name: "Darth Vader",
            img: "assets/images/darth-vader.jpg",
            hp: 150,
            attack: 25,
            counterAttack: 20,
            value: ""},
        {
            name: "Emperor Palpatine",
            img: "assets/images/emperor-palpatine.jpg",
            hp: 180,
            attack: 20,
            counterAttack: 25,
            value: ""},
        {
            name: "Obi-Wan Kenobi",
            img: "assets/images/obi-wan-kenobi.png",
            hp: 120,
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
            // if last enemy has been selected
        } else if(characters.length === 1 && enemyArray.length === 0){
            // display enemyArray in #defender
            displayCharacters("#defender", characters);
            // updates enemyHP with defender
            enemyHp = characters[0].hp;
            // clears availableEnemies div
            $("#availableEnemies").empty();
            // eneables attack button
            enemySelected = true;
        }
        else{
            $(this).addClass("chosenEnemy")
            // retrieves index of enemy character
            enemyIndex = parseInt($(".chosenEnemy").attr("value"));
            enemyArray = characters.splice(enemyIndex, 1);
            // updates value in characters array
            charIndex(characters);
            // updates value in enemyArray
            charIndex(enemyArray);
            // displays selected enemy in defender div
            displayCharacters("#defender", enemyArray);
            enemyHp = enemyArray[0].hp;  
            // enables attack button
            enemySelected = true;
            // updates availableEnemies
            $("#availableEnemies").empty();
            displayEnemies("#availableEnemies", characters);            
        }
    });   

    // combat logic
    $(document).on("click", "#attack", function(){
        if(enemySelected !== true){
            $("#combatText").text("please select an enemy to fight");
            return(false);
            // happens during the last enemy fight
        } else if(enemySelected === true && enemyArray.length === 0){
            // user attacks when attack button is clicked
            countingAttack(userArray[0].attack)
            // enemyhealth is decreased by user attack
            enemyHealth(userAttack)
            // if the user kills the enemy
            if(enemyHp <= 0){
                $("#combatText").text("You Win!!! Please play again!")
                // clears defender div
                $("#defender").empty();
                // allows the user to restart the game
                restart = true;
            } else {
                // counter attack damage
                counterAttack = characters[0].counterAttack;
                // the enemy counter attacks the user
                userHealth(counterAttack)
                $("#combatText").text("You attacked the enemy for " + userAttack + " and he counter attacked for " + counterAttack + ". User hp is " + userHp + " enemy hp is " + enemyHp)
                if(userHp <= 0) {
                    $("#combatText").text("You died, try again")
                    restart = true
                }
            } // happens if an enemy is selected 
        } else {
            // user attacks when attack button is clicked
            countingAttack(userArray[0].attack)
            // enemyhealth is decreased by user attack
            enemyHealth(userAttack)
            // if the user kills the enemy
            if(enemyHp <= 0){
                $("#combatText").text("you attacked the enemy for " + userAttack + " and killed him.  Your ramaining health is " + userHp)
                // clears enemyArray
                enemyArray = [];
                // clears defender div
                $("#defender").empty();
                // allows the user to select a new enemy
                enemySelected = false;
            } else {
                // counter attack damage
                counterAttack = enemyArray[0].counterAttack;
                // the enemy counter attacks the user
                userHealth(counterAttack)
                $("#combatText").text("You attacked the enemy for " + userAttack + " and he counter attacked for " + counterAttack + ". User hp is " + userHp + " enemy hp is " + enemyHp)
                // if the user dies
                if(userHp <= 0) {
                    $("#combatText").text("You died, try again")
                    // allows the user to restart
                    restart = true
                }
            }
        }        
    })
});