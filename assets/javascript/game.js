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
var gameOver = false;
var characters = [
        {
            name: "Luke Skywalker",
            img: "assets/images/luke-skywalker.jpeg",
            hp: 125,
            attack: 15,
            counterAttack: 15,
            value: ""},
        {
            name: "Darth Vader",
            img: "assets/images/darth-vader.jpg",
            hp: 140,
            attack: 15,
            counterAttack: 30,
            value: ""},
        {
            name: "Emperor Palpatine",
            img: "assets/images/emperor-palpatine.jpg",
            hp: 100,
            attack: 20,
            counterAttack: 35,
            value: ""},
        {
            name: "Obi-Wan Kenobi",
            img: "assets/images/obi-wan-kenobi.png",
            hp: 130,
            attack: 15,
            counterAttack: 20,
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
    $(document).on("click", ".character", function(){
        if(userSelected){
            return(false)
        } else{  
            $(this).addClass("user")
            $('audio#music')[0].play()
            // retrieving index of user character
            userIndex = parseInt($(".user").attr("value"));
            userArray = characters.splice(userIndex, 1);
            // updates value in characters array
            charIndex(characters)
            // updates value in userArray
            userArray[0].value = 0
            // hides availableCharacters div
            $("#availableCharacters").empty();
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
        // attack button disabled if no enemy is selected
        if(enemySelected !== true){
            $("#combatText").text("please select an enemy to fight");
            return(false);
            // attack button disabled if the game is over.
        } else if(gameOver === true){
            return(false)
        } // happens during the last enemy fight
        else if(enemySelected === true && enemyArray.length === 0){
            
            // user attacks when attack button is clicked
            countingAttack(userArray[0].attack)
            // enemyhealth is decreased by user attack
            enemyHealth(userAttack)
            userName = userArray[0].name
            enemyName = characters[0].name
            // if the user kills the enemy
            if(enemyHp <= 0){
                $("#combatText").text("You Win!!! Please play again!")
                // clears defender div
                $("#defender").empty();
                // allows the user to restart the game
                restart = true;
                $("#restart").css("display", "inline"); 
                // if the enemy has hp after the user attack he couter attacks
            } else {
                // counter attack damage
                counterAttack = characters[0].counterAttack;
                // the enemy counter attacks the user
                userHealth(counterAttack)
                // refreshes user character with new HP
                userArray[0].hp = userHp 
                $("#userCharacter").empty()
                displayCharacters("#userCharacter", userArray)
                // refreshes enemy character with new HP
                characters[0].hp = enemyHp
                $("#defender").empty();
                displayCharacters("#defender", characters);                
                $("#combatText").text(userName +  " attacked " + enemyName +" for " + userAttack + " damage. " + enemyName + " counter attacked for " + counterAttack + " damage.")
                if(userHp <= 0) {
                    $("#combatText").text("You died, try again")
                    restart = true
                    $("#restart").css("display", "inline");
                    gameOver = true  
                }
            } // happens if an enemy is selected 
        } else {
            // user attacks when attack button is clicked
            countingAttack(userArray[0].attack)
            // enemyhealth is decreased by user attack
            enemyHealth(userAttack)
            userName = userArray[0].name
            enemyName = enemyArray[0].name
            // if the user kills the enemy
            if(enemyHp <= 0){
                $("#combatText").text(userName +  " attacked " + enemyName +" for " + userAttack + " damage and killed him.")
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
                // refreshes user character with new HP
                userArray[0].hp = userHp 
                $("#userCharacter").empty()
                displayCharacters("#userCharacter", userArray)
                // refreshes enemy character with new HP
                enemyArray[0].hp = enemyHp
                $("#defender").empty();
                displayCharacters("#defender", enemyArray);
                $("#combatText").text(userName +  " attacked " + enemyName +" for " + userAttack + " damage. " + enemyName + " counter attacked for " + counterAttack + " damage.")
                // if the user dies
                if(userHp <= 0) {
                    $("#combatText").text("You died, try again")
                    // allows the user to restart
                    restart = true;
                    $("#restart").css("display", "inline");
                    gameOver = true;
                }
            }
        }        
    });

    // restart button logic
    $(document).on("click", "#restart", function(){
        if(restart === false){
            return(false)
        } else {
            // clear all divs of text and arrays
            $("#availableCharacters").empty();
            $("#userCharacter").empty();
            $("#availableEnemies").empty();
            $("#defender").empty();
            $("#combatText").empty();
            // reset userAttack
            userAttack = 0;
            // clear userArray and enemyArray
            userArray = [];
            enemyArray = []
            // reset characters array
            characters = [
                {
                    name: "Luke Skywalker",
                    img: "assets/images/luke-skywalker.jpeg",
                    hp: 125,
                    attack: 15,
                    counterAttack: 15,
                    value: ""},
                {
                    name: "Darth Vader",
                    img: "assets/images/darth-vader.jpg",
                    hp: 140,
                    attack: 15,
                    counterAttack: 30,
                    value: ""},
                {
                    name: "Emperor Palpatine",
                    img: "assets/images/emperor-palpatine.jpg",
                    hp: 100,
                    attack: 20,
                    counterAttack: 35,
                    value: ""},
                {
                    name: "Obi-Wan Kenobi",
                    img: "assets/images/obi-wan-kenobi.png",
                    hp: 130,
                    attack: 15,
                    counterAttack: 20,
                    value: ""}];
            // updates value in characters array
            charIndex(characters)
            // display original character array
            displayCharacters("#availableCharacters", characters)
            // reset isDefeated userSelected enemySelected and restart
            isDefeated = false;
            userSelected = false;
            enemySelected = false;
            gameOver = false;
            restart = false;
            $("#restart").css("display", "none");
        }
    })
});