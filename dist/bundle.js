(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.hangmangame = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}]},{},[1])(1)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLypcbiAqID4gQ29kZWQgQnkgVGhvbWFzIEhqXG4gKi9cblxuLy8gRk9SIFJFRkFDVE9SXG5cbi8qKlxuICogXG4gKiBUT0RPUzpcbiAqICAxLiBmb3IgcmVmYWN0b3IgXG4gKiAgMi4gd3JpdGUgdGVzdHNcbiovXG5cbi8vIFdvcmQgc2VsZWN0aW9uXG4vLyBOZXcgd29yZCA9IFtcIldvcmQgbmFtZVwiLCBcIkhpbnRcIl1cbnZhciB3b3JkID0gW1tcIkhhbmdtYW5cIiwgXCJUaGF0IGdhbWUgeW91IGFyZSBwbGF5aW5nIHJpZ2h0IG5vdy5cIl0sIFtcIlRob21hcyBIalwiLCBcIkFib3V0IHRoZSBjcmVhdG9yIG9mIHRoaXMgZ2FtZS5cIl0sIFtcIkhUTUxcIiwgXCJNYXJrdXAgbGFuZ3VhZ2UgZm9yIGNyZWF0aW5nIFdlYiBwYWdlcy5cIl0sIFtcIkNTU1wiLCBcIldlcCBwYWdlIHN0eWxlc1wiXSwgW1wiUEhQXCIsIFwiQSB2ZXJ5IHBvcHVsYXIgc2VydmVyIHNjcmlwdGluZyBsYW5ndWFnZS5cIl0sIFtcIkphdmFTY3JpcHRcIiwgXCJNYWtlIHdlYi1wYWdlIGR5bmFtaWMgd2l0aG91dCByZWxvYWQgdGhlIHdlYiBwYWdlLlwiXSwgW1wiSmF2YVwiLCBcIlJ1biAxNSBiaWxsaW9uIGRldmljZXMuXFxuQSBwcm9ncmFtIGNhbiBiZSBydW4gaW4gV2luZG93cywgTGludXggYW5kIE1hY1wiXSwgW1wiU29sb0xlYXJuXCIsIFwiQSBjb21wYW55IHRoYXQgZXZlcnlvbmUgY2FuIGNvZGUgZm9yIGZ1biBhbmQgc2hhcmUuXCJdLCBbXCJMb3ZlXCIsIFwiV2hhdCBpcyA/XFxuQmFieSBkb24ndCBodXJ0IG1lXFxuRG9uJ3QgaHVydCBtZVxcbk5vIG1vcmVcIl0sIFtcIkRvY3VtZW50XCIsIFwiQSBsb3Qgb2YgdGV4dCBpbiB0aGUgYSBmaWxlLlwiXSwgW1wiUGxheWdyb3VuZFwiLCBcIlRoZXJlIHNjaG9vbCBraWRzIGdvIHRvLlwiXSwgW1wiUnVuXCIsIFwiVXNhaW4gYm9sdC5cIl0sIFtcIkNvZGVcIiwgXCJ2YXIgaHcgPSAnSGVsbG8gV29ybGQnO1wiXSwgW1wiU2Ftc3VuZ1wiLCBcIkEgY29tcGFueSBjcmVhdGUgUGhvbmUsIFR2LCBNb25pdG9yLCBTREQsIE1lbW9yeSBjaGlwLi4uXCJdLCBbXCJTdXBlciBNYXJpb1wiLCBcIkEgdmVyeSBwb3B1bGFyIGdhbWUgaW4gTmludGVuZG8gNjQgdGhhdCBoYXZlIHJlZCBoYXQuXCJdLCBbXCJTdGFyXCIsIFwiU3VwZXIgTWFyaW8gbGlrZSB0byBnZXQuXCJdLCBbXCJDbG9ja1wiLCBcIjE0OjEyIG9yIDE0cG1cIl0sIFtcIkJpbmFyeSBDbG9ja1wiLCBcIkEgY2xvY2sgdGhhdCBvbmx5IHVzZSAwIG9yIDEuXCJdLCBbXCJTd29yZFwiLCBcIkxpbmsgZnJvbSBaZWxkYSBoYXZlIG9uIHRoZSBoYW5kLlwiXSwgW1wiR2lybFwiLCBcIk5vdCBib3kgYnV0ID9cIl0sIFtcIkJveVwiLCBcIk5vdCBnaXJsIGJ1dCA/XCJdLCBbXCJGZW1hbGVcIiwgXCJPdGhlciBuYW1lIGFzIGdpcmwuXCJdLCBbXCJNYWxlXCIsIFwiT3RoZXIgbmFtZSBhcyBib3kuXCJdLCBbXCJTbWFydHBob25lXCIsIFwiU29tZXRoaW5nIHlvdSd2ZSBhbHdheXMgb24geW91LlwiXV1cblxuLy8gR2FtZSBrZXlib2FyZFxuY29uc3QgS0VZUyA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpcIjtcblxubGV0IGhhbmdtYW47XG5cbi8vIFdlYi1wYWdlIG9ubG9hZFxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgIGdldEJ5SWQoXCJtb3ZlS2V5Ym9yZFwiKS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHdIID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgIHRZID0gZS50b3VjaGVzWzBdLmNsaWVudFlcbiAgICAgICAgZUwgPSBnZXRCeUlkKFwidGFzdGF0dXJcIilcbiAgICAgICAgcmVzWSA9IHdIIC0gdFkgLSBlTC5vZmZzZXRIZWlnaHRcbiAgICAgICAgaWYocmVzWSA8IDApIHtcbiAgICAgICAgICAgIHJlc1kgPSAwXG4gICAgICAgIH0gZWxzZSBpZihyZXNZID4gd0ggLyAyKSB7XG4gICAgICAgICAgICByZXNZID0gd0ggLyAyXG4gICAgICAgIH1cbiAgICAgICAgZUwuc3R5bGUuYm90dG9tID0gcmVzWSArIFwicHhcIlxuwqDCoMKgIH0sIGZhbHNlKVxuICAgIGNyZWF0ZUtleWJvYXJkKClcbn1cblxuLyoqXG4gKiBzZXR1cFxuICogdXRpbGl0eSBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBrZXlib2FyZExpc3RlbmVyKGUpe1xuICAgIGlmKEtFWVMuc3BsaXQoXCJcIikuaW5kZXhPZihlLmtleS50b1VwcGVyQ2FzZSgpKSA+IC0xKXtcbiAgICAgICAgbGV0IGluZGV4ID0gLTE7XG4gICAgICAgIGNvbnN0IGxldHRlckJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24uYicpO1xuICAgICAgICBsZXR0ZXJCdXR0b25zLmZvckVhY2goKGJ1dHRvbiwgaWQpID0+IHtcbiAgICAgICAgICAgIGlmKGJ1dHRvbi5pbm5lclRleHQgPT0gZS5rZXkudG9VcHBlckNhc2UoKSkgaW5kZXggPSBpZDtcbiAgICAgICAgfSk7XG4gICAgICAgIGhhbmdtYW4uYlRhcyhsZXR0ZXJCdXR0b25zLml0ZW0oaW5kZXgpKTtcbiAgICB9XG59XG5cbi8qKlxuICogc2V0dXBcbiAqIHV0aWxpdHkgZnVuY3Rpb25cbiAqIEByZXR1cm4ge3N0cmluZ30gd29yZFxuICovXG5mdW5jdGlvbiBnZXRHYW1lV29yZCgpIHtcbiAgICBsZXQgaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB3b3JkLmxlbmd0aCk7XG4gICAgaGFuZ21hbi5zZXRTZWxlY3QoaW5kZXgpO1xuICAgIHJldHVybiB3b3JkW2luZGV4XTtcbn1cblxuLyoqXG4gKiBzZXR1cFxuICogRE9NIG1hbmlwdWxhdGlvblxuICovXG5mdW5jdGlvbiBjcmVhdGVLZXlib2FyZCgpIHtcbiAgICB2YXIgY29udGFpbmVyID0gZ2V0QnlJZChcImtleWJvYXJkXCIpXG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCJcbiAgICBLRVlTLnNwbGl0KFwiXCIpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgbGV0IGIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBiLmNsYXNzTmFtZSA9IFwiYlwiO1xuICAgICAgICBiLmlubmVyVGV4dCA9IGtleS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICBiLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJcIilcbiAgICAgICAgYi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBoYW5nbWFuLmJUYXModGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGIpXG4gICAgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlib2FyZExpc3RlbmVyLCBmYWxzZSk7XG59XG5cbi8qKlxuICogdXRpbGl0eSBmdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gKiBAcmV0dXJucyBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIGdldEJ5SWQoaWQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpXG59XG5cbi8qKlxuICogc3RhcnQgZ2FtZVxuICovXG5mdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gICAgZ2V0QnlJZChcImhvbWVcIikuY2xhc3NOYW1lID0gXCJoXCI7XG4gICAgZ2V0QnlJZChcInJlc3VsdFwiKS5jbGFzc05hbWUgPSBcImhcIjtcbiAgICBoYW5nbWFuID0gbmV3IEhhbmdtYW5HYW1lKCk7XG4gICAgaGFuZ21hbi5uZXdHYW1lKCk7XG59XG5cbi8qKlxuICogXG4gKiBAcmV0dXJucyBIYW5nbWFuIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIGdldEdhbWUoKSB7XG4gICAgcmV0dXJuIGhhbmdtYW47XG59XG5cbmNsYXNzIEhhbmdtYW5HYW1lIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIC8vIEdhbWUgbWVtb3J5XG4gICAgICAgIHRoaXMuc2VsZWN0ID0gMFxuICAgICAgICB0aGlzLndvcmRMZWZ0ID0gW11cbiAgICAgICAgdGhpcy5mYWlsID0gMFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBzZXRTZWxlY3QodmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZWxlY3QgPSB2YWx1ZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlc2V0XG4gICAgICovXG4gICAgbmV3R2FtZSgpIHtcbiAgICAgICAgdGhpcy5jbGVhcktleWJvYXJkKClcbiAgICAgICAgdGhpcy5jbGVhclBsYXllcigpXG4gICAgICAgIHRoaXMuY3JlYXRlV29yZChnZXRHYW1lV29yZCgpKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdhbWUgbG9naWNcbiAgICAgKiBHYW1lIGNoZWNrLCBJZiBzaG93IG5leHQgZXJyb3IgLyBnYW1lIGVuZFxuICAgICAqIEBwYXJhbSB7Kn0gYSBcbiAgICAgKi9cbiAgICBiVGFzKGEpIHtcbiAgICAgICAgaWYoISFhICYmIGEuZ2V0QXR0cmlidXRlKFwiZGF0YVwiKSA9PSBcIlwiKSB7XG4gICAgICAgICAgICB2YXIgeCA9IHRoaXMuaXNFeGlzdChhLmlubmVyVGV4dClcbiAgICAgICAgICAgIGEuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCB4KVxuICAgICAgICAgICAgaWYoeCkge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMud29yZExlZnQubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lRW5kKHRydWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dOZXh0RmFpbCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnYW1lIGxvZ2ljXG4gICAgICogRE9NIG1hbmlwdWxhdGlvblxuICAgICAqL1xuICAgIHNob3dOZXh0RmFpbCgpIHtcbiAgICAgICAgc3dpdGNoKCsrdGhpcy5mYWlsKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgZ2V0QnlJZChcImcwXCIpLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJ0cnVlXCIpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBnZXRCeUlkKFwiZzFcIikuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcInRydWVcIilcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIGdldEJ5SWQoXCJnMlwiKS5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIFwidHJ1ZVwiKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgZ2V0QnlJZChcImczXCIpLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJ0cnVlXCIpXG4gICAgICAgICAgICAgICAgZ2V0QnlJZChcImhpbnRCdXR0b25cIikuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcInRydWVcIilcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIGdldEJ5SWQoXCJnNFwiKS5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIFwidHJ1ZVwiKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgZ2V0QnlJZChcImc1XCIpLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJ0cnVlXCIpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICBnZXRCeUlkKFwiZzVcIikuc2V0QXR0cmlidXRlKFwibFwiLCBcInRydWVcIilcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgIGdldEJ5SWQoXCJnNVwiKS5zZXRBdHRyaWJ1dGUoXCJyXCIsIFwidHJ1ZVwiKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgZ2V0QnlJZChcImc2XCIpLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJ0cnVlXCIpXG4gICAgICAgICAgICAgICAgZ2V0QnlJZChcImc2XCIpLnNldEF0dHJpYnV0ZShcImxcIiwgXCJ0cnVlXCIpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgICAgZ2V0QnlJZChcImc2XCIpLnNldEF0dHJpYnV0ZShcInJcIiwgXCJ0cnVlXCIpXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lRW5kKGZhbHNlKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2FtZSBsb2dpY1xuICAgICAqIERPTSBtYW5pcHVsYXRpb25cbiAgICAgKiBHYW1lIHJlc3VsdFxuICAgICAqIEBwYXJhbSB7Kn0gZSBcbiAgICAgKi9cbiAgICBnYW1lRW5kKGUpIHtcbiAgICAgICAgdmFyIGQgPSBnZXRCeUlkKFwicmVzdWx0XCIpXG4gICAgICAgIGQuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBlKVxuICAgICAgICBpZihlKSB7XG4gICAgICAgICAgICBnZXRCeUlkKFwiclRcIikuaW5uZXJUZXh0ID0gXCJZb3UgV2luIVwiXG4gICAgICAgICAgICBnZXRCeUlkKFwick1cIikuaW5uZXJIVE1MID0gXCJDb25ncmF0dWxhdGlvbnMsIHlvdSBmb3VuZCB0aGUgd29yZCE8YnIvPjxici8+R29vZCBKb2IhXCJcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdldEJ5SWQoXCJyVFwiKS5pbm5lclRleHQgPSBcIllvdSBMb3NlIVwiXG4gICAgICAgICAgICBnZXRCeUlkKFwick1cIikuaW5uZXJIVE1MID0gXCJUaGUgd29yZCB3YXMgPGJyLz48YnIvPlxcXCJcIiArIHdvcmRbdGhpcy5zZWxlY3RdWzBdLnRvVXBwZXJDYXNlKCkgKyBcIlxcXCI8YnIvPjxici8+QmV0dGVyIGx1Y2sgbmV4dCB0aW1lLlwiXG4gICAgICAgIH1cbiAgICAgICAgZC5jbGFzc05hbWUgPSBcIlwiXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0dXAgYm9hcmRcbiAgICAgKiBET00gbWFuaXB1bGF0aW9uXG4gICAgICovXG4gICAgIGNsZWFyS2V5Ym9hcmQoKSB7XG4gICAgICAgIHZhciBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImJcIilcbiAgICAgICAgZm9yKHZhciBhID0gMDsgYSA8IGUubGVuZ3RoOyBhKyspIHtcbiAgICAgICAgICAgIGVbYV0uc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcIlwiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0dXAgcGxheWVyXG4gICAgICogRE9NIG1hbmlwdWxhdGlvblxuICAgICAqL1xuICAgIGNsZWFyUGxheWVyKCkge1xuICAgICAgICB0aGlzLmZhaWwgPSAwXG4gICAgICAgIHRoaXMud29yZExlZnQgPSBbXVxuICAgICAgICBnZXRCeUlkKFwiZzBcIikuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcImZhbHNlXCIpXG4gICAgICAgIGdldEJ5SWQoXCJnMVwiKS5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIFwiZmFsc2VcIilcbiAgICAgICAgZ2V0QnlJZChcImcyXCIpLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJmYWxzZVwiKVxuICAgICAgICBnZXRCeUlkKFwiZzNcIikuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcImZhbHNlXCIpXG4gICAgICAgIGdldEJ5SWQoXCJnNFwiKS5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIFwiZmFsc2VcIilcbiAgICAgICAgZ2V0QnlJZChcImc1XCIpLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJmYWxzZVwiKVxuICAgICAgICBnZXRCeUlkKFwiZzVcIikuc2V0QXR0cmlidXRlKFwiclwiLCBcImZhbHNlXCIpXG4gICAgICAgIGdldEJ5SWQoXCJnNVwiKS5zZXRBdHRyaWJ1dGUoXCJsXCIsIFwiZmFsc2VcIilcbiAgICAgICAgZ2V0QnlJZChcImc2XCIpLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJmYWxzZVwiKVxuICAgICAgICBnZXRCeUlkKFwiZzZcIikuc2V0QXR0cmlidXRlKFwibFwiLCBcImZhbHNlXCIpXG4gICAgICAgIGdldEJ5SWQoXCJnNlwiKS5zZXRBdHRyaWJ1dGUoXCJyXCIsIFwiZmFsc2VcIilcbiAgICAgICAgZ2V0QnlJZChcImhpbnRCdXR0b25cIikuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcImZhbHNlXCIpXG4gICAgICAgIGdldEJ5SWQoXCJoaW50XCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldHVwXG4gICAgICogRE9NIG1hbmlwdWxhdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBnYW1lV29yZFxuICAgICAqL1xuICAgIGNyZWF0ZVdvcmQoZ2FtZVdvcmQpIHtcbiAgICAgICAgdmFyIGQgPSBnZXRCeUlkKFwibGV0dGVyXCIpXG4gICAgICAgIGQuaW5uZXJIVE1MID0gXCJcIlxuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IGdhbWVXb3JkWzBdO1xuICAgICAgICBmb3IobGV0IGEgPSAwOyBhIDwgc2VsZWN0ZWQubGVuZ3RoOyBhKyspIHtcbiAgICAgICAgICAgIHZhciB4ID0gc2VsZWN0ZWRbYV0udG9VcHBlckNhc2UoKVxuICAgICAgICAgICAgdmFyIGIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICAgICAgICAgICAgYi5jbGFzc05hbWUgPSBcImxcIiArICh4ID09IFwiIFwiID8gXCIgbHNcIiA6IFwiXCIpXG4gICAgICAgICAgICBiLmlubmVySFRNTCA9IFwiJm5ic3BcIlxuICAgICAgICAgICAgYi5pZCA9IFwibFwiICsgYTtcbiAgICAgICAgICAgIGQuYXBwZW5kQ2hpbGQoYilcbiAgICAgICAgICAgIGlmKHggIT0gXCIgXCIpIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLndvcmRMZWZ0LmluZGV4T2YoeCkgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JkTGVmdC5wdXNoKHgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2FtZSBsb2dpY1xuICAgICAqIEBwYXJhbSB7Kn0gZSBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBpc0V4aXN0KGUpIHtcbiAgICAgICAgZSA9IGUudG9VcHBlckNhc2UoKVxuICAgICAgICB2YXIgeCA9IHRoaXMud29yZExlZnQuaW5kZXhPZihlKVxuICAgICAgICBpZih4ICE9IC0xKSB7XG4gICAgICAgICAgICB0aGlzLndvcmRMZWZ0LnNwbGljZSh4LCAxKVxuICAgICAgICAgICAgdGhpcy50eXBlV29yZChlKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93IGhpbnRcbiAgICAgKiBET00gbWFuaXB1bGF0aW9uXG4gICAgICovXG4gICAgaGludCgpIHtcbiAgICAgICAgZ2V0QnlJZChcImhpbnRUZXh0XCIpLmlubmVyVGV4dCA9IHdvcmRbdGhpcy5zZWxlY3RdWzFdXG4gICAgICAgIGdldEJ5SWQoXCJoaW50XCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCJcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeGl0IGhpbnRcbiAgICAgKiBET00gbWFuaXB1bGF0aW9uXG4gICAgICovXG4gICAgaGludEV4aXQoKSB7XG4gICAgICAgIGdldEJ5SWQoXCJoaW50XCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERPTSBtYW5pcHVsYXRpb25cbiAgICAgKiBAcGFyYW0geyp9IGUgXG4gICAgICovXG4gICAgdHlwZVdvcmQoZSkge1xuICAgICAgICBmb3IobGV0IGEgPSAwOyBhIDwgd29yZFt0aGlzLnNlbGVjdF1bMF0ubGVuZ3RoOyBhKyspIHtcbiAgICAgICAgICAgIGlmKHdvcmRbdGhpcy5zZWxlY3RdWzBdW2FdLnRvVXBwZXJDYXNlKCkgPT0gZSkge1xuICAgICAgICAgICAgICAgIGdldEJ5SWQoXCJsXCIgKyBhKS5pbm5lclRleHQgPSBlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB3b3JkLFxuICAgIGhhbmdtYW4sXG4gICAgS0VZUyxcbiAgICBjcmVhdGVLZXlib2FyZCxcbiAgICBnZXRHYW1lV29yZCxcbiAgICBnZXRHYW1lLFxuICAgIGtleWJvYXJkTGlzdGVuZXIsXG4gICAgc3RhcnRHYW1lLFxuICAgIEhhbmdtYW5HYW1lLFxufTtcbiJdfQ==
