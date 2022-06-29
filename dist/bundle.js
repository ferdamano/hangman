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
    hangman.select = index;
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
    HangmanGame,
};

},{}]},{},[1])(1)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKlxuICogPiBDb2RlZCBCeSBUaG9tYXMgSGpcbiAqL1xuXG4vLyBGT1IgUkVGQUNUT1JcblxuLyoqXG4gKiBcbiAqIFRPRE9TOlxuICogIDEuIGZvciByZWZhY3RvciBcbiAqICAyLiB3cml0ZSB0ZXN0c1xuKi9cblxuLy8gV29yZCBzZWxlY3Rpb25cbi8vIE5ldyB3b3JkID0gW1wiV29yZCBuYW1lXCIsIFwiSGludFwiXVxudmFyIHdvcmQgPSBbW1wiSGFuZ21hblwiLCBcIlRoYXQgZ2FtZSB5b3UgYXJlIHBsYXlpbmcgcmlnaHQgbm93LlwiXSwgW1wiVGhvbWFzIEhqXCIsIFwiQWJvdXQgdGhlIGNyZWF0b3Igb2YgdGhpcyBnYW1lLlwiXSwgW1wiSFRNTFwiLCBcIk1hcmt1cCBsYW5ndWFnZSBmb3IgY3JlYXRpbmcgV2ViIHBhZ2VzLlwiXSwgW1wiQ1NTXCIsIFwiV2VwIHBhZ2Ugc3R5bGVzXCJdLCBbXCJQSFBcIiwgXCJBIHZlcnkgcG9wdWxhciBzZXJ2ZXIgc2NyaXB0aW5nIGxhbmd1YWdlLlwiXSwgW1wiSmF2YVNjcmlwdFwiLCBcIk1ha2Ugd2ViLXBhZ2UgZHluYW1pYyB3aXRob3V0IHJlbG9hZCB0aGUgd2ViIHBhZ2UuXCJdLCBbXCJKYXZhXCIsIFwiUnVuIDE1IGJpbGxpb24gZGV2aWNlcy5cXG5BIHByb2dyYW0gY2FuIGJlIHJ1biBpbiBXaW5kb3dzLCBMaW51eCBhbmQgTWFjXCJdLCBbXCJTb2xvTGVhcm5cIiwgXCJBIGNvbXBhbnkgdGhhdCBldmVyeW9uZSBjYW4gY29kZSBmb3IgZnVuIGFuZCBzaGFyZS5cIl0sIFtcIkxvdmVcIiwgXCJXaGF0IGlzID9cXG5CYWJ5IGRvbid0IGh1cnQgbWVcXG5Eb24ndCBodXJ0IG1lXFxuTm8gbW9yZVwiXSwgW1wiRG9jdW1lbnRcIiwgXCJBIGxvdCBvZiB0ZXh0IGluIHRoZSBhIGZpbGUuXCJdLCBbXCJQbGF5Z3JvdW5kXCIsIFwiVGhlcmUgc2Nob29sIGtpZHMgZ28gdG8uXCJdLCBbXCJSdW5cIiwgXCJVc2FpbiBib2x0LlwiXSwgW1wiQ29kZVwiLCBcInZhciBodyA9ICdIZWxsbyBXb3JsZCc7XCJdLCBbXCJTYW1zdW5nXCIsIFwiQSBjb21wYW55IGNyZWF0ZSBQaG9uZSwgVHYsIE1vbml0b3IsIFNERCwgTWVtb3J5IGNoaXAuLi5cIl0sIFtcIlN1cGVyIE1hcmlvXCIsIFwiQSB2ZXJ5IHBvcHVsYXIgZ2FtZSBpbiBOaW50ZW5kbyA2NCB0aGF0IGhhdmUgcmVkIGhhdC5cIl0sIFtcIlN0YXJcIiwgXCJTdXBlciBNYXJpbyBsaWtlIHRvIGdldC5cIl0sIFtcIkNsb2NrXCIsIFwiMTQ6MTIgb3IgMTRwbVwiXSwgW1wiQmluYXJ5IENsb2NrXCIsIFwiQSBjbG9jayB0aGF0IG9ubHkgdXNlIDAgb3IgMS5cIl0sIFtcIlN3b3JkXCIsIFwiTGluayBmcm9tIFplbGRhIGhhdmUgb24gdGhlIGhhbmQuXCJdLCBbXCJHaXJsXCIsIFwiTm90IGJveSBidXQgP1wiXSwgW1wiQm95XCIsIFwiTm90IGdpcmwgYnV0ID9cIl0sIFtcIkZlbWFsZVwiLCBcIk90aGVyIG5hbWUgYXMgZ2lybC5cIl0sIFtcIk1hbGVcIiwgXCJPdGhlciBuYW1lIGFzIGJveS5cIl0sIFtcIlNtYXJ0cGhvbmVcIiwgXCJTb21ldGhpbmcgeW91J3ZlIGFsd2F5cyBvbiB5b3UuXCJdXVxuXG4vLyBHYW1lIGtleWJvYXJkXG5jb25zdCBLRVlTID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWlwiO1xuXG5sZXQgaGFuZ21hbjtcblxuLy8gV2ViLXBhZ2Ugb25sb2FkXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgZ2V0QnlJZChcIm1vdmVLZXlib3JkXCIpLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgd0ggPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAgICAgdFkgPSBlLnRvdWNoZXNbMF0uY2xpZW50WVxuICAgICAgICBlTCA9IGdldEJ5SWQoXCJ0YXN0YXR1clwiKVxuICAgICAgICByZXNZID0gd0ggLSB0WSAtIGVMLm9mZnNldEhlaWdodFxuICAgICAgICBpZihyZXNZIDwgMCkge1xuICAgICAgICAgICAgcmVzWSA9IDBcbiAgICAgICAgfSBlbHNlIGlmKHJlc1kgPiB3SCAvIDIpIHtcbiAgICAgICAgICAgIHJlc1kgPSB3SCAvIDJcbiAgICAgICAgfVxuICAgICAgICBlTC5zdHlsZS5ib3R0b20gPSByZXNZICsgXCJweFwiXG7CoMKgwqAgfSwgZmFsc2UpXG4gICAgY3JlYXRlS2V5Ym9hcmQoKVxufVxuXG4vKipcbiAqIHNldHVwXG4gKiB1dGlsaXR5IGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGtleWJvYXJkTGlzdGVuZXIoZSl7XG4gICAgaWYoS0VZUy5zcGxpdChcIlwiKS5pbmRleE9mKGUua2V5LnRvVXBwZXJDYXNlKCkpID4gLTEpe1xuICAgICAgICBsZXQgaW5kZXggPSAtMTtcbiAgICAgICAgY29uc3QgbGV0dGVyQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbi5iJyk7XG4gICAgICAgIGxldHRlckJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uLCBpZCkgPT4ge1xuICAgICAgICAgICAgaWYoYnV0dG9uLmlubmVyVGV4dCA9PSBlLmtleS50b1VwcGVyQ2FzZSgpKSBpbmRleCA9IGlkO1xuICAgICAgICB9KTtcbiAgICAgICAgaGFuZ21hbi5iVGFzKGxldHRlckJ1dHRvbnMuaXRlbShpbmRleCkpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBzZXR1cFxuICogdXRpbGl0eSBmdW5jdGlvblxuICogQHJldHVybiB7c3RyaW5nfSB3b3JkXG4gKi9cbmZ1bmN0aW9uIGdldEdhbWVXb3JkKCkge1xuICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHdvcmQubGVuZ3RoKTtcbiAgICBoYW5nbWFuLnNlbGVjdCA9IGluZGV4O1xuICAgIHJldHVybiB3b3JkW2luZGV4XTtcbn1cblxuLyoqXG4gKiBzZXR1cFxuICogRE9NIG1hbmlwdWxhdGlvblxuICovXG5mdW5jdGlvbiBjcmVhdGVLZXlib2FyZCgpIHtcbiAgICB2YXIgY29udGFpbmVyID0gZ2V0QnlJZChcImtleWJvYXJkXCIpXG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCJcbiAgICBLRVlTLnNwbGl0KFwiXCIpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgbGV0IGIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBiLmNsYXNzTmFtZSA9IFwiYlwiO1xuICAgICAgICBiLmlubmVyVGV4dCA9IGtleS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICBiLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJcIilcbiAgICAgICAgYi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBoYW5nbWFuLmJUYXModGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGIpXG4gICAgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlib2FyZExpc3RlbmVyLCBmYWxzZSk7XG59XG5cbi8qKlxuICogdXRpbGl0eSBmdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gKiBAcmV0dXJucyBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIGdldEJ5SWQoaWQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpXG59XG5cbi8qKlxuICogc3RhcnQgZ2FtZVxuICovXG5mdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gICAgZ2V0QnlJZChcImhvbWVcIikuY2xhc3NOYW1lID0gXCJoXCI7XG4gICAgZ2V0QnlJZChcInJlc3VsdFwiKS5jbGFzc05hbWUgPSBcImhcIjtcbiAgICBoYW5nbWFuID0gbmV3IEhhbmdtYW5HYW1lKCk7XG4gICAgaGFuZ21hbi5uZXdHYW1lKCk7XG59XG5cbi8qKlxuICogXG4gKiBAcmV0dXJucyBIYW5nbWFuIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIGdldEdhbWUoKSB7XG4gICAgcmV0dXJuIGhhbmdtYW47XG59XG5cbmNsYXNzIEhhbmdtYW5HYW1lIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIC8vIEdhbWUgbWVtb3J5XG4gICAgICAgIHRoaXMuc2VsZWN0ID0gMFxuICAgICAgICB0aGlzLndvcmRMZWZ0ID0gW11cbiAgICAgICAgdGhpcy5mYWlsID0gMFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlc2V0XG4gICAgICovXG4gICAgbmV3R2FtZSgpIHtcbiAgICAgICAgdGhpcy5jbGVhcktleWJvYXJkKClcbiAgICAgICAgdGhpcy5jbGVhclBsYXllcigpXG4gICAgICAgIHRoaXMuY3JlYXRlV29yZChnZXRHYW1lV29yZCgpKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdhbWUgbG9naWNcbiAgICAgKiBHYW1lIGNoZWNrLCBJZiBzaG93IG5leHQgZXJyb3IgLyBnYW1lIGVuZFxuICAgICAqIEBwYXJhbSB7Kn0gYSBcbiAgICAgKi9cbiAgICBiVGFzKGEpIHtcbiAgICAgICAgaWYoISFhICYmIGEuZ2V0QXR0cmlidXRlKFwiZGF0YVwiKSA9PSBcIlwiKSB7XG4gICAgICAgICAgICB2YXIgeCA9IHRoaXMuaXNFeGlzdChhLmlubmVyVGV4dClcbiAgICAgICAgICAgIGEuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCB4KVxuICAgICAgICAgICAgaWYoeCkge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMud29yZExlZnQubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lRW5kKHRydWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dOZXh0RmFpbCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnYW1lIGxvZ2ljXG4gICAgICogRE9NIG1hbmlwdWxhdGlvblxuICAgICAqL1xuICAgIHNob3dOZXh0RmFpbCgpIHtcbiAgICAgICAgdGhpcy5mYWlsKytcbiAgICAgICAgc3dpdGNoKHRoaXMuZmFpbCkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGdldEJ5SWQoXCJnMFwiKS5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIFwidHJ1ZVwiKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgZ2V0QnlJZChcImcxXCIpLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJ0cnVlXCIpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBnZXRCeUlkKFwiZzJcIikuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcInRydWVcIilcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIGdldEJ5SWQoXCJnM1wiKS5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIFwidHJ1ZVwiKVxuICAgICAgICAgICAgICAgIGdldEJ5SWQoXCJoaW50QnV0dG9uXCIpLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJ0cnVlXCIpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICBnZXRCeUlkKFwiZzRcIikuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcInRydWVcIilcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgIGdldEJ5SWQoXCJnNVwiKS5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIFwidHJ1ZVwiKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgZ2V0QnlJZChcImc1XCIpLnNldEF0dHJpYnV0ZShcImxcIiwgXCJ0cnVlXCIpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICBnZXRCeUlkKFwiZzVcIikuc2V0QXR0cmlidXRlKFwiclwiLCBcInRydWVcIilcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgIGdldEJ5SWQoXCJnNlwiKS5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIFwidHJ1ZVwiKVxuICAgICAgICAgICAgICAgIGdldEJ5SWQoXCJnNlwiKS5zZXRBdHRyaWJ1dGUoXCJsXCIsIFwidHJ1ZVwiKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICAgIGdldEJ5SWQoXCJnNlwiKS5zZXRBdHRyaWJ1dGUoXCJyXCIsIFwidHJ1ZVwiKVxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUVuZChmYWxzZSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdhbWUgbG9naWNcbiAgICAgKiBET00gbWFuaXB1bGF0aW9uXG4gICAgICogR2FtZSByZXN1bHRcbiAgICAgKiBAcGFyYW0geyp9IGUgXG4gICAgICovXG4gICAgZ2FtZUVuZChlKSB7XG4gICAgICAgIHZhciBkID0gZ2V0QnlJZChcInJlc3VsdFwiKVxuICAgICAgICBkLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgZSlcbiAgICAgICAgaWYoZSkge1xuICAgICAgICAgICAgZ2V0QnlJZChcInJUXCIpLmlubmVyVGV4dCA9IFwiWW91IFdpbiFcIlxuICAgICAgICAgICAgZ2V0QnlJZChcInJNXCIpLmlubmVySFRNTCA9IFwiQ29uZ3JhdHVsYXRpb25zLCB5b3UgZm91bmQgdGhlIHdvcmQhPGJyLz48YnIvPkdvb2QgSm9iIVwiXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnZXRCeUlkKFwiclRcIikuaW5uZXJUZXh0ID0gXCJZb3UgTG9zZSFcIlxuICAgICAgICAgICAgZ2V0QnlJZChcInJNXCIpLmlubmVySFRNTCA9IFwiVGhlIHdvcmQgd2FzIDxici8+PGJyLz5cXFwiXCIgKyB3b3JkW3RoaXMuc2VsZWN0XVswXS50b1VwcGVyQ2FzZSgpICsgXCJcXFwiPGJyLz48YnIvPkJldHRlciBsdWNrIG5leHQgdGltZS5cIlxuICAgICAgICB9XG4gICAgICAgIGQuY2xhc3NOYW1lID0gXCJcIlxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldHVwIGJvYXJkXG4gICAgICogRE9NIG1hbmlwdWxhdGlvblxuICAgICAqL1xuICAgICBjbGVhcktleWJvYXJkKCkge1xuICAgICAgICB2YXIgZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJiXCIpXG4gICAgICAgIGZvcih2YXIgYSA9IDA7IGEgPCBlLmxlbmd0aDsgYSsrKSB7XG4gICAgICAgICAgICBlW2FdLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJcIilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldHVwIHBsYXllclxuICAgICAqIERPTSBtYW5pcHVsYXRpb25cbiAgICAgKi9cbiAgICBjbGVhclBsYXllcigpIHtcbiAgICAgICAgdGhpcy5mYWlsID0gMFxuICAgICAgICB0aGlzLndvcmRMZWZ0ID0gW11cbiAgICAgICAgZ2V0QnlJZChcImcwXCIpLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJmYWxzZVwiKVxuICAgICAgICBnZXRCeUlkKFwiZzFcIikuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcImZhbHNlXCIpXG4gICAgICAgIGdldEJ5SWQoXCJnMlwiKS5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIFwiZmFsc2VcIilcbiAgICAgICAgZ2V0QnlJZChcImczXCIpLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJmYWxzZVwiKVxuICAgICAgICBnZXRCeUlkKFwiZzRcIikuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcImZhbHNlXCIpXG4gICAgICAgIGdldEJ5SWQoXCJnNVwiKS5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIFwiZmFsc2VcIilcbiAgICAgICAgZ2V0QnlJZChcImc1XCIpLnNldEF0dHJpYnV0ZShcInJcIiwgXCJmYWxzZVwiKVxuICAgICAgICBnZXRCeUlkKFwiZzVcIikuc2V0QXR0cmlidXRlKFwibFwiLCBcImZhbHNlXCIpXG4gICAgICAgIGdldEJ5SWQoXCJnNlwiKS5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIFwiZmFsc2VcIilcbiAgICAgICAgZ2V0QnlJZChcImc2XCIpLnNldEF0dHJpYnV0ZShcImxcIiwgXCJmYWxzZVwiKVxuICAgICAgICBnZXRCeUlkKFwiZzZcIikuc2V0QXR0cmlidXRlKFwiclwiLCBcImZhbHNlXCIpXG4gICAgICAgIGdldEJ5SWQoXCJoaW50QnV0dG9uXCIpLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJmYWxzZVwiKVxuICAgICAgICBnZXRCeUlkKFwiaGludFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXR1cFxuICAgICAqIERPTSBtYW5pcHVsYXRpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZ2FtZVdvcmRcbiAgICAgKi9cbiAgICBjcmVhdGVXb3JkKGdhbWVXb3JkKSB7XG4gICAgICAgIHZhciBkID0gZ2V0QnlJZChcImxldHRlclwiKVxuICAgICAgICBkLmlubmVySFRNTCA9IFwiXCJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBnYW1lV29yZFswXTtcbiAgICAgICAgZm9yKGxldCBhID0gMDsgYSA8IHNlbGVjdGVkLmxlbmd0aDsgYSsrKSB7XG4gICAgICAgICAgICB2YXIgeCA9IHNlbGVjdGVkW2FdLnRvVXBwZXJDYXNlKClcbiAgICAgICAgICAgIHZhciBiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgICAgICAgICAgIGIuY2xhc3NOYW1lID0gXCJsXCIgKyAoeCA9PSBcIiBcIiA/IFwiIGxzXCIgOiBcIlwiKVxuICAgICAgICAgICAgYi5pbm5lckhUTUwgPSBcIiZuYnNwXCJcbiAgICAgICAgICAgIGIuaWQgPSBcImxcIiArIGE7XG4gICAgICAgICAgICBkLmFwcGVuZENoaWxkKGIpXG4gICAgICAgICAgICBpZih4ICE9IFwiIFwiKSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JkTGVmdC5pbmRleE9mKHgpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29yZExlZnQucHVzaCh4KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdhbWUgbG9naWNcbiAgICAgKiBAcGFyYW0geyp9IGUgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgaXNFeGlzdChlKSB7XG4gICAgICAgIGUgPSBlLnRvVXBwZXJDYXNlKClcbiAgICAgICAgdmFyIHggPSB0aGlzLndvcmRMZWZ0LmluZGV4T2YoZSlcbiAgICAgICAgaWYoeCAhPSAtMSkge1xuICAgICAgICAgICAgdGhpcy53b3JkTGVmdC5zcGxpY2UoeCwgMSlcbiAgICAgICAgICAgIHRoaXMudHlwZVdvcmQoZSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvdyBoaW50XG4gICAgICogRE9NIG1hbmlwdWxhdGlvblxuICAgICAqL1xuICAgIGhpbnQoKSB7XG4gICAgICAgIGdldEJ5SWQoXCJoaW50VGV4dFwiKS5pbm5lclRleHQgPSB3b3JkW3RoaXMuc2VsZWN0XVsxXVxuICAgICAgICBnZXRCeUlkKFwiaGludFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXhpdCBoaW50XG4gICAgICogRE9NIG1hbmlwdWxhdGlvblxuICAgICAqL1xuICAgIGhpbnRFeGl0KCkge1xuICAgICAgICBnZXRCeUlkKFwiaGludFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBET00gbWFuaXB1bGF0aW9uXG4gICAgICogQHBhcmFtIHsqfSBlIFxuICAgICAqL1xuICAgIHR5cGVXb3JkKGUpIHtcbiAgICAgICAgZm9yKGxldCBhID0gMDsgYSA8IHdvcmRbdGhpcy5zZWxlY3RdWzBdLmxlbmd0aDsgYSsrKSB7XG4gICAgICAgICAgICBpZih3b3JkW3RoaXMuc2VsZWN0XVswXVthXS50b1VwcGVyQ2FzZSgpID09IGUpIHtcbiAgICAgICAgICAgICAgICBnZXRCeUlkKFwibFwiICsgYSkuaW5uZXJUZXh0ID0gZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaGFuZ21hbixcbiAgICBLRVlTLFxuICAgIGNyZWF0ZUtleWJvYXJkLFxuICAgIGdldEdhbWVXb3JkLFxuICAgIGdldEdhbWUsXG4gICAga2V5Ym9hcmRMaXN0ZW5lcixcbiAgICBzdGFydEdhbWUsXG4gICAgSGFuZ21hbkdhbWUsXG59O1xuIl19
