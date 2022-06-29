/*
 * > Coded By Thomas Hj
 */

// FOR REFACTOR

/**
 * 
 * TODOS:
 *  1. for refactor 
 *  2. write tests
*/

// Word selection
// New word = ["Word name", "Hint"]
var word = [["Hangman", "That game you are playing right now."], ["Thomas Hj", "About the creator of this game."], ["HTML", "Markup language for creating Web pages."], ["CSS", "Wep page styles"], ["PHP", "A very popular server scripting language."], ["JavaScript", "Make web-page dynamic without reload the web page."], ["Java", "Run 15 billion devices.\nA program can be run in Windows, Linux and Mac"], ["SoloLearn", "A company that everyone can code for fun and share."], ["Love", "What is ?\nBaby don't hurt me\nDon't hurt me\nNo more"], ["Document", "A lot of text in the a file."], ["Playground", "There school kids go to."], ["Run", "Usain bolt."], ["Code", "var hw = 'Hello World';"], ["Samsung", "A company create Phone, Tv, Monitor, SDD, Memory chip..."], ["Super Mario", "A very popular game in Nintendo 64 that have red hat."], ["Star", "Super Mario like to get."], ["Clock", "14:12 or 14pm"], ["Binary Clock", "A clock that only use 0 or 1."], ["Sword", "Link from Zelda have on the hand."], ["Girl", "Not boy but ?"], ["Boy", "Not girl but ?"], ["Female", "Other name as girl."], ["Male", "Other name as boy."], ["Smartphone", "Something you've always on you."]]

// Game keyboard
const KEYS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let hangman;

// Web-page onload
window.onload = function() {
    getById("moveKeybord").addEventListener('touchmove', function(e) {
        wH = window.innerHeight
        tY = e.touches[0].clientY
        eL = getById("tastatur")
        resY = wH - tY - eL.offsetHeight
        if(resY < 0) {
            resY = 0
        } else if(resY > wH / 2) {
            resY = wH / 2
        }
        eL.style.bottom = resY + "px"
    }, false)
    createKeyboard()
}

/**
 * setup
 * utility function
 */
function keyboardListener(e){
    if(KEYS.split("").indexOf(e.key.toUpperCase()) > -1){
        let index = -1;
        const letterButtons = document.querySelectorAll('button.b');
        letterButtons.forEach((button, id) => {
            if(button.innerText == e.key.toUpperCase()) index = id;
        });
        hangman.bTas(letterButtons.item(index));
    }
}

/**
 * setup
 * utility function
 * @return {string} word
 */
function getGameWord() {
    let index = Math.floor(Math.random() * word.length);
    hangman.setSelect(index);
    return word[index];
}

/**
 * setup
 * DOM manipulation
 */
function createKeyboard() {
    var container = getById("keyboard")
    container.innerHTML = ""
    KEYS.split("").forEach(key => {
        let b = document.createElement("button");
        b.className = "b";
        b.innerText = key.toUpperCase();
        b.setAttribute("data", "")
        b.onclick = function() {
            hangman.bTas(this);
        }
        container.appendChild(b)
    });
    window.addEventListener('keydown', keyboardListener, false);
}

/**
 * utility function
 * @param {string} id
 * @returns element
 */
function getById(id) {
    return document.getElementById(id)
}

/**
 * start game
 */
function startGame() {
    getById("home").className = "h";
    getById("result").className = "h";
    hangman = new HangmanGame();
    hangman.newGame();
}

/**
 * 
 * @returns Hangman instance
 */
function getGame() {
    return hangman;
}

class HangmanGame {

    constructor() {

        // Game memory
        this.select = 0
        this.wordLeft = []
        this.fail = 0
    }

    /**
     * 
     * @param {number} value 
     */
    setSelect(value) {
        this.select = value
    }

    /**
     * 
     * @param {number} value 
     */
     setFail(value) {
        this.fail = value
    }

    /**
     * reset
     */
    newGame() {
        this.clearKeyboard()
        this.clearPlayer()
        this.createWord(getGameWord())
    }

    /**
     * game logic
     * Game check, If show next error / game end
     * @param {*} a 
     */
    bTas(a) {
        if(!!a && a.getAttribute("data") == "") {
            var x = this.isExist(a.innerText)
            a.setAttribute("data", x)
            if(x) {
                if(this.wordLeft.length == 0) {
                    this.gameEnd(true)
                }
            } else {
                this.showNextFail()
            }
        }
    }

    /**
     * game logic
     * DOM manipulation
     */
    showNextFail() {
        switch(++this.fail) {
            case 1:
                getById("g0").setAttribute("data", "true")
                break;
            
            case 2:
                getById("g1").setAttribute("data", "true")
                break;
            
            case 3:
                getById("g2").setAttribute("data", "true")
                break;
            
            case 4:
                getById("g3").setAttribute("data", "true")
                getById("hintButton").setAttribute("data", "true")
                break;
            
            case 5:
                getById("g4").setAttribute("data", "true")
                break;
            
            case 6:
                getById("g5").setAttribute("data", "true")
                break;
            
            case 7:
                getById("g5").setAttribute("l", "true")
                break;
            
            case 8:
                getById("g5").setAttribute("r", "true")
                break;
            
            case 9:
                getById("g6").setAttribute("data", "true")
                getById("g6").setAttribute("l", "true")
                break;
            
            case 10:
                getById("g6").setAttribute("r", "true")
                this.gameEnd(false)
                break;
        }
    }

    /**
     * game logic
     * DOM manipulation
     * Game result
     * @param {*} e 
     */
    gameEnd(e) {
        var d = getById("result")
        d.setAttribute("data", e)
        if(e) {
            getById("rT").innerText = "You Win!"
            getById("rM").innerHTML = "Congratulations, you found the word!<br/><br/>Good Job!"
        } else {
            getById("rT").innerText = "You Lose!"
            getById("rM").innerHTML = "The word was <br/><br/>\"" + word[this.select][0].toUpperCase() + "\"<br/><br/>Better luck next time."
        }
        d.className = ""
    }

    /**
     * setup board
     * DOM manipulation
     */
     clearKeyboard() {
        var e = document.getElementsByClassName("b")
        for(var a = 0; a < e.length; a++) {
            e[a].setAttribute("data", "")
        }
    }

    /**
     * setup player
     * DOM manipulation
     */
    clearPlayer() {
        this.fail = 0
        this.wordLeft = []
        getById("g0").setAttribute("data", "false")
        getById("g1").setAttribute("data", "false")
        getById("g2").setAttribute("data", "false")
        getById("g3").setAttribute("data", "false")
        getById("g4").setAttribute("data", "false")
        getById("g5").setAttribute("data", "false")
        getById("g5").setAttribute("r", "false")
        getById("g5").setAttribute("l", "false")
        getById("g6").setAttribute("data", "false")
        getById("g6").setAttribute("l", "false")
        getById("g6").setAttribute("r", "false")
        getById("hintButton").setAttribute("data", "false")
        getById("hint").style.display = "none"
    }

    /**
     * setup
     * DOM manipulation
     * @param {string} gameWord
     */
    createWord(gameWord) {
        var d = getById("letter")
        d.innerHTML = ""
        const selected = gameWord[0];
        for(let a = 0; a < selected.length; a++) {
            var x = selected[a].toUpperCase()
            var b = document.createElement("span")
            b.className = "l" + (x == " " ? " ls" : "")
            b.innerHTML = "&nbsp"
            b.id = "l" + a;
            d.appendChild(b)
            if(x != " ") {
                if(this.wordLeft.indexOf(x) == -1) {
                    this.wordLeft.push(x)
                }
            }
        }
    }

    /**
     * Game logic
     * @param {*} e 
     * @returns 
     */
    isExist(e) {
        e = e.toUpperCase()
        var x = this.wordLeft.indexOf(e)
        if(x != -1) {
            this.wordLeft.splice(x, 1)
            this.typeWord(e)
            return true
        }
        return false
    }

    /**
     * Show hint
     * DOM manipulation
     */
    hint() {
        getById("hintText").innerText = word[this.select][1]
        getById("hint").style.display = "block"
    }

    /**
     * Exit hint
     * DOM manipulation
     */
    hintExit() {
        getById("hint").style.display = "none"
    }

    /**
     * DOM manipulation
     * @param {*} e 
     */
    typeWord(e) {
        for(let a = 0; a < word[this.select][0].length; a++) {
            if(word[this.select][0][a].toUpperCase() == e) {
                getById("l" + a).innerText = e
            }
        }
    }
}



module.exports = {
    word,
    hangman,
    KEYS,
    createKeyboard,
    getGameWord,
    getGame,
    keyboardListener,
    startGame,
    HangmanGame,
};
