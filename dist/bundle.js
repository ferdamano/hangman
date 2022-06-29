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
                    gameEnd(true)
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
        this.fail++
        switch(this.fail) {
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
    hangman,
    KEYS,
    createKeyboard,
    getGameWord,
    getGame,
    keyboardListener,
    startGame,
};

},{}]},{},[1])(1)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qXG4gKiA+IENvZGVkIEJ5IFRob21hcyBIalxuICovXG5cbi8vIEZPUiBSRUZBQ1RPUlxuXG4vKipcbiAqIFxuICogVE9ET1M6XG4gKiAgMS4gZm9yIHJlZmFjdG9yIFxuICogIDIuIHdyaXRlIHRlc3RzXG4qL1xuXG4vLyBXb3JkIHNlbGVjdGlvblxuLy8gTmV3IHdvcmQgPSBbXCJXb3JkIG5hbWVcIiwgXCJIaW50XCJdXG52YXIgd29yZCA9IFtbXCJIYW5nbWFuXCIsIFwiVGhhdCBnYW1lIHlvdSBhcmUgcGxheWluZyByaWdodCBub3cuXCJdLCBbXCJUaG9tYXMgSGpcIiwgXCJBYm91dCB0aGUgY3JlYXRvciBvZiB0aGlzIGdhbWUuXCJdLCBbXCJIVE1MXCIsIFwiTWFya3VwIGxhbmd1YWdlIGZvciBjcmVhdGluZyBXZWIgcGFnZXMuXCJdLCBbXCJDU1NcIiwgXCJXZXAgcGFnZSBzdHlsZXNcIl0sIFtcIlBIUFwiLCBcIkEgdmVyeSBwb3B1bGFyIHNlcnZlciBzY3JpcHRpbmcgbGFuZ3VhZ2UuXCJdLCBbXCJKYXZhU2NyaXB0XCIsIFwiTWFrZSB3ZWItcGFnZSBkeW5hbWljIHdpdGhvdXQgcmVsb2FkIHRoZSB3ZWIgcGFnZS5cIl0sIFtcIkphdmFcIiwgXCJSdW4gMTUgYmlsbGlvbiBkZXZpY2VzLlxcbkEgcHJvZ3JhbSBjYW4gYmUgcnVuIGluIFdpbmRvd3MsIExpbnV4IGFuZCBNYWNcIl0sIFtcIlNvbG9MZWFyblwiLCBcIkEgY29tcGFueSB0aGF0IGV2ZXJ5b25lIGNhbiBjb2RlIGZvciBmdW4gYW5kIHNoYXJlLlwiXSwgW1wiTG92ZVwiLCBcIldoYXQgaXMgP1xcbkJhYnkgZG9uJ3QgaHVydCBtZVxcbkRvbid0IGh1cnQgbWVcXG5ObyBtb3JlXCJdLCBbXCJEb2N1bWVudFwiLCBcIkEgbG90IG9mIHRleHQgaW4gdGhlIGEgZmlsZS5cIl0sIFtcIlBsYXlncm91bmRcIiwgXCJUaGVyZSBzY2hvb2wga2lkcyBnbyB0by5cIl0sIFtcIlJ1blwiLCBcIlVzYWluIGJvbHQuXCJdLCBbXCJDb2RlXCIsIFwidmFyIGh3ID0gJ0hlbGxvIFdvcmxkJztcIl0sIFtcIlNhbXN1bmdcIiwgXCJBIGNvbXBhbnkgY3JlYXRlIFBob25lLCBUdiwgTW9uaXRvciwgU0RELCBNZW1vcnkgY2hpcC4uLlwiXSwgW1wiU3VwZXIgTWFyaW9cIiwgXCJBIHZlcnkgcG9wdWxhciBnYW1lIGluIE5pbnRlbmRvIDY0IHRoYXQgaGF2ZSByZWQgaGF0LlwiXSwgW1wiU3RhclwiLCBcIlN1cGVyIE1hcmlvIGxpa2UgdG8gZ2V0LlwiXSwgW1wiQ2xvY2tcIiwgXCIxNDoxMiBvciAxNHBtXCJdLCBbXCJCaW5hcnkgQ2xvY2tcIiwgXCJBIGNsb2NrIHRoYXQgb25seSB1c2UgMCBvciAxLlwiXSwgW1wiU3dvcmRcIiwgXCJMaW5rIGZyb20gWmVsZGEgaGF2ZSBvbiB0aGUgaGFuZC5cIl0sIFtcIkdpcmxcIiwgXCJOb3QgYm95IGJ1dCA/XCJdLCBbXCJCb3lcIiwgXCJOb3QgZ2lybCBidXQgP1wiXSwgW1wiRmVtYWxlXCIsIFwiT3RoZXIgbmFtZSBhcyBnaXJsLlwiXSwgW1wiTWFsZVwiLCBcIk90aGVyIG5hbWUgYXMgYm95LlwiXSwgW1wiU21hcnRwaG9uZVwiLCBcIlNvbWV0aGluZyB5b3UndmUgYWx3YXlzIG9uIHlvdS5cIl1dXG5cbi8vIEdhbWUga2V5Ym9hcmRcbmNvbnN0IEtFWVMgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXCI7XG5cbmxldCBoYW5nbWFuO1xuXG4vLyBXZWItcGFnZSBvbmxvYWRcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICBnZXRCeUlkKFwibW92ZUtleWJvcmRcIikuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZnVuY3Rpb24oZSkge1xuICAgICAgICB3SCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICB0WSA9IGUudG91Y2hlc1swXS5jbGllbnRZXG4gICAgICAgIGVMID0gZ2V0QnlJZChcInRhc3RhdHVyXCIpXG4gICAgICAgIHJlc1kgPSB3SCAtIHRZIC0gZUwub2Zmc2V0SGVpZ2h0XG4gICAgICAgIGlmKHJlc1kgPCAwKSB7XG4gICAgICAgICAgICByZXNZID0gMFxuICAgICAgICB9IGVsc2UgaWYocmVzWSA+IHdIIC8gMikge1xuICAgICAgICAgICAgcmVzWSA9IHdIIC8gMlxuICAgICAgICB9XG4gICAgICAgIGVMLnN0eWxlLmJvdHRvbSA9IHJlc1kgKyBcInB4XCJcbsKgwqDCoCB9LCBmYWxzZSlcbiAgICBjcmVhdGVLZXlib2FyZCgpXG59XG5cbi8qKlxuICogc2V0dXBcbiAqIHV0aWxpdHkgZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24ga2V5Ym9hcmRMaXN0ZW5lcihlKXtcbiAgICBpZihLRVlTLnNwbGl0KFwiXCIpLmluZGV4T2YoZS5rZXkudG9VcHBlckNhc2UoKSkgPiAtMSl7XG4gICAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgICBjb25zdCBsZXR0ZXJCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uLmInKTtcbiAgICAgICAgbGV0dGVyQnV0dG9ucy5mb3JFYWNoKChidXR0b24sIGlkKSA9PiB7XG4gICAgICAgICAgICBpZihidXR0b24uaW5uZXJUZXh0ID09IGUua2V5LnRvVXBwZXJDYXNlKCkpIGluZGV4ID0gaWQ7XG4gICAgICAgIH0pO1xuICAgICAgICBoYW5nbWFuLmJUYXMobGV0dGVyQnV0dG9ucy5pdGVtKGluZGV4KSk7XG4gICAgfVxufVxuXG4vKipcbiAqIHNldHVwXG4gKiB1dGlsaXR5IGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtzdHJpbmd9IHdvcmRcbiAqL1xuZnVuY3Rpb24gZ2V0R2FtZVdvcmQoKSB7XG4gICAgbGV0IGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogd29yZC5sZW5ndGgpO1xuICAgIHJldHVybiB3b3JkW2luZGV4XTtcbn1cblxuLyoqXG4gKiBzZXR1cFxuICogRE9NIG1hbmlwdWxhdGlvblxuICovXG5mdW5jdGlvbiBjcmVhdGVLZXlib2FyZCgpIHtcbiAgICB2YXIgY29udGFpbmVyID0gZ2V0QnlJZChcImtleWJvYXJkXCIpXG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCJcbiAgICBLRVlTLnNwbGl0KFwiXCIpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgbGV0IGIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBiLmNsYXNzTmFtZSA9IFwiYlwiO1xuICAgICAgICBiLmlubmVyVGV4dCA9IGtleS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICBiLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJcIilcbiAgICAgICAgYi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBoYW5nbWFuLmJUYXModGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGIpXG4gICAgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlib2FyZExpc3RlbmVyLCBmYWxzZSk7XG59XG5cbi8qKlxuICogdXRpbGl0eSBmdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gKiBAcmV0dXJucyBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIGdldEJ5SWQoaWQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpXG59XG5cbi8qKlxuICogc3RhcnQgZ2FtZVxuICovXG5mdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gICAgZ2V0QnlJZChcImhvbWVcIikuY2xhc3NOYW1lID0gXCJoXCI7XG4gICAgZ2V0QnlJZChcInJlc3VsdFwiKS5jbGFzc05hbWUgPSBcImhcIjtcbiAgICBoYW5nbWFuID0gbmV3IEhhbmdtYW5HYW1lKCk7XG4gICAgaGFuZ21hbi5uZXdHYW1lKCk7XG59XG5cbi8qKlxuICogXG4gKiBAcmV0dXJucyBIYW5nbWFuIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIGdldEdhbWUoKSB7XG4gICAgcmV0dXJuIGhhbmdtYW47XG59XG5cbmNsYXNzIEhhbmdtYW5HYW1lIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIC8vIEdhbWUgbWVtb3J5XG4gICAgICAgIHRoaXMuc2VsZWN0ID0gMFxuICAgICAgICB0aGlzLndvcmRMZWZ0ID0gW11cbiAgICAgICAgdGhpcy5mYWlsID0gMFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlc2V0XG4gICAgICovXG4gICAgbmV3R2FtZSgpIHtcbiAgICAgICAgdGhpcy5jbGVhcktleWJvYXJkKClcbiAgICAgICAgdGhpcy5jbGVhclBsYXllcigpXG4gICAgICAgIHRoaXMuY3JlYXRlV29yZChnZXRHYW1lV29yZCgpKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdhbWUgbG9naWNcbiAgICAgKiBHYW1lIGNoZWNrLCBJZiBzaG93IG5leHQgZXJyb3IgLyBnYW1lIGVuZFxuICAgICAqIEBwYXJhbSB7Kn0gYSBcbiAgICAgKi9cbiAgICBiVGFzKGEpIHtcbiAgICAgICAgaWYoISFhICYmIGEuZ2V0QXR0cmlidXRlKFwiZGF0YVwiKSA9PSBcIlwiKSB7XG4gICAgICAgICAgICB2YXIgeCA9IHRoaXMuaXNFeGlzdChhLmlubmVyVGV4dClcbiAgICAgICAgICAgIGEuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCB4KVxuICAgICAgICAgICAgaWYoeCkge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMud29yZExlZnQubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZ2FtZUVuZCh0cnVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93TmV4dEZhaWwoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2FtZSBsb2dpY1xuICAgICAqIERPTSBtYW5pcHVsYXRpb25cbiAgICAgKi9cbiAgICBzaG93TmV4dEZhaWwoKSB7XG4gICAgICAgIHRoaXMuZmFpbCsrXG4gICAgICAgIHN3aXRjaCh0aGlzLmZhaWwpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBnZXRCeUlkKFwiZzBcIikuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcInRydWVcIilcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGdldEJ5SWQoXCJnMVwiKS5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIFwidHJ1ZVwiKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgZ2V0QnlJZChcImcyXCIpLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJ0cnVlXCIpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICBnZXRCeUlkKFwiZzNcIikuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcInRydWVcIilcbiAgICAgICAgICAgICAgICBnZXRCeUlkKFwiaGludEJ1dHRvblwiKS5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIFwidHJ1ZVwiKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgZ2V0QnlJZChcImc0XCIpLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJ0cnVlXCIpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICBnZXRCeUlkKFwiZzVcIikuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcInRydWVcIilcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgIGdldEJ5SWQoXCJnNVwiKS5zZXRBdHRyaWJ1dGUoXCJsXCIsIFwidHJ1ZVwiKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgZ2V0QnlJZChcImc1XCIpLnNldEF0dHJpYnV0ZShcInJcIiwgXCJ0cnVlXCIpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICBnZXRCeUlkKFwiZzZcIikuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcInRydWVcIilcbiAgICAgICAgICAgICAgICBnZXRCeUlkKFwiZzZcIikuc2V0QXR0cmlidXRlKFwibFwiLCBcInRydWVcIilcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgICAgICBnZXRCeUlkKFwiZzZcIikuc2V0QXR0cmlidXRlKFwiclwiLCBcInRydWVcIilcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVFbmQoZmFsc2UpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnYW1lIGxvZ2ljXG4gICAgICogRE9NIG1hbmlwdWxhdGlvblxuICAgICAqIEdhbWUgcmVzdWx0XG4gICAgICogQHBhcmFtIHsqfSBlIFxuICAgICAqL1xuICAgIGdhbWVFbmQoZSkge1xuICAgICAgICB2YXIgZCA9IGdldEJ5SWQoXCJyZXN1bHRcIilcbiAgICAgICAgZC5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIGUpXG4gICAgICAgIGlmKGUpIHtcbiAgICAgICAgICAgIGdldEJ5SWQoXCJyVFwiKS5pbm5lclRleHQgPSBcIllvdSBXaW4hXCJcbiAgICAgICAgICAgIGdldEJ5SWQoXCJyTVwiKS5pbm5lckhUTUwgPSBcIkNvbmdyYXR1bGF0aW9ucywgeW91IGZvdW5kIHRoZSB3b3JkITxici8+PGJyLz5Hb29kIEpvYiFcIlxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2V0QnlJZChcInJUXCIpLmlubmVyVGV4dCA9IFwiWW91IExvc2UhXCJcbiAgICAgICAgICAgIGdldEJ5SWQoXCJyTVwiKS5pbm5lckhUTUwgPSBcIlRoZSB3b3JkIHdhcyA8YnIvPjxici8+XFxcIlwiICsgd29yZFt0aGlzLnNlbGVjdF1bMF0udG9VcHBlckNhc2UoKSArIFwiXFxcIjxici8+PGJyLz5CZXR0ZXIgbHVjayBuZXh0IHRpbWUuXCJcbiAgICAgICAgfVxuICAgICAgICBkLmNsYXNzTmFtZSA9IFwiXCJcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXR1cCBib2FyZFxuICAgICAqIERPTSBtYW5pcHVsYXRpb25cbiAgICAgKi9cbiAgICAgY2xlYXJLZXlib2FyZCgpIHtcbiAgICAgICAgdmFyIGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYlwiKVxuICAgICAgICBmb3IodmFyIGEgPSAwOyBhIDwgZS5sZW5ndGg7IGErKykge1xuICAgICAgICAgICAgZVthXS5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIFwiXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXR1cCBwbGF5ZXJcbiAgICAgKiBET00gbWFuaXB1bGF0aW9uXG4gICAgICovXG4gICAgY2xlYXJQbGF5ZXIoKSB7XG4gICAgICAgIHRoaXMuZmFpbCA9IDBcbiAgICAgICAgdGhpcy53b3JkTGVmdCA9IFtdXG4gICAgICAgIGdldEJ5SWQoXCJnMFwiKS5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIFwiZmFsc2VcIilcbiAgICAgICAgZ2V0QnlJZChcImcxXCIpLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJmYWxzZVwiKVxuICAgICAgICBnZXRCeUlkKFwiZzJcIikuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcImZhbHNlXCIpXG4gICAgICAgIGdldEJ5SWQoXCJnM1wiKS5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIFwiZmFsc2VcIilcbiAgICAgICAgZ2V0QnlJZChcImc0XCIpLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJmYWxzZVwiKVxuICAgICAgICBnZXRCeUlkKFwiZzVcIikuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcImZhbHNlXCIpXG4gICAgICAgIGdldEJ5SWQoXCJnNVwiKS5zZXRBdHRyaWJ1dGUoXCJyXCIsIFwiZmFsc2VcIilcbiAgICAgICAgZ2V0QnlJZChcImc1XCIpLnNldEF0dHJpYnV0ZShcImxcIiwgXCJmYWxzZVwiKVxuICAgICAgICBnZXRCeUlkKFwiZzZcIikuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcImZhbHNlXCIpXG4gICAgICAgIGdldEJ5SWQoXCJnNlwiKS5zZXRBdHRyaWJ1dGUoXCJsXCIsIFwiZmFsc2VcIilcbiAgICAgICAgZ2V0QnlJZChcImc2XCIpLnNldEF0dHJpYnV0ZShcInJcIiwgXCJmYWxzZVwiKVxuICAgICAgICBnZXRCeUlkKFwiaGludEJ1dHRvblwiKS5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIFwiZmFsc2VcIilcbiAgICAgICAgZ2V0QnlJZChcImhpbnRcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0dXBcbiAgICAgKiBET00gbWFuaXB1bGF0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGdhbWVXb3JkXG4gICAgICovXG4gICAgY3JlYXRlV29yZChnYW1lV29yZCkge1xuICAgICAgICB2YXIgZCA9IGdldEJ5SWQoXCJsZXR0ZXJcIilcbiAgICAgICAgZC5pbm5lckhUTUwgPSBcIlwiXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gZ2FtZVdvcmRbMF07XG4gICAgICAgIGZvcihsZXQgYSA9IDA7IGEgPCBzZWxlY3RlZC5sZW5ndGg7IGErKykge1xuICAgICAgICAgICAgdmFyIHggPSBzZWxlY3RlZFthXS50b1VwcGVyQ2FzZSgpXG4gICAgICAgICAgICB2YXIgYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gICAgICAgICAgICBiLmNsYXNzTmFtZSA9IFwibFwiICsgKHggPT0gXCIgXCIgPyBcIiBsc1wiIDogXCJcIilcbiAgICAgICAgICAgIGIuaW5uZXJIVE1MID0gXCImbmJzcFwiXG4gICAgICAgICAgICBiLmlkID0gXCJsXCIgKyBhO1xuICAgICAgICAgICAgZC5hcHBlbmRDaGlsZChiKVxuICAgICAgICAgICAgaWYoeCAhPSBcIiBcIikge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMud29yZExlZnQuaW5kZXhPZih4KSA9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmRMZWZ0LnB1c2goeClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHYW1lIGxvZ2ljXG4gICAgICogQHBhcmFtIHsqfSBlIFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIGlzRXhpc3QoZSkge1xuICAgICAgICBlID0gZS50b1VwcGVyQ2FzZSgpXG4gICAgICAgIHZhciB4ID0gdGhpcy53b3JkTGVmdC5pbmRleE9mKGUpXG4gICAgICAgIGlmKHggIT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMud29yZExlZnQuc3BsaWNlKHgsIDEpXG4gICAgICAgICAgICB0aGlzLnR5cGVXb3JkKGUpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3cgaGludFxuICAgICAqIERPTSBtYW5pcHVsYXRpb25cbiAgICAgKi9cbiAgICBoaW50KCkge1xuICAgICAgICBnZXRCeUlkKFwiaGludFRleHRcIikuaW5uZXJUZXh0ID0gd29yZFt0aGlzLnNlbGVjdF1bMV1cbiAgICAgICAgZ2V0QnlJZChcImhpbnRcIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIlxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4aXQgaGludFxuICAgICAqIERPTSBtYW5pcHVsYXRpb25cbiAgICAgKi9cbiAgICBoaW50RXhpdCgpIHtcbiAgICAgICAgZ2V0QnlJZChcImhpbnRcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRE9NIG1hbmlwdWxhdGlvblxuICAgICAqIEBwYXJhbSB7Kn0gZSBcbiAgICAgKi9cbiAgICB0eXBlV29yZChlKSB7XG4gICAgICAgIGZvcihsZXQgYSA9IDA7IGEgPCB3b3JkW3RoaXMuc2VsZWN0XVswXS5sZW5ndGg7IGErKykge1xuICAgICAgICAgICAgaWYod29yZFt0aGlzLnNlbGVjdF1bMF1bYV0udG9VcHBlckNhc2UoKSA9PSBlKSB7XG4gICAgICAgICAgICAgICAgZ2V0QnlJZChcImxcIiArIGEpLmlubmVyVGV4dCA9IGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGhhbmdtYW4sXG4gICAgS0VZUyxcbiAgICBjcmVhdGVLZXlib2FyZCxcbiAgICBnZXRHYW1lV29yZCxcbiAgICBnZXRHYW1lLFxuICAgIGtleWJvYXJkTGlzdGVuZXIsXG4gICAgc3RhcnRHYW1lLFxufTtcbiJdfQ==
