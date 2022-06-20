(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.hangman = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
const KEYS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

// Game memory
var select = 0
var wordLeft = []
var fail = 0

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

// Start game
function startGame() {
    getById("home").className = "h"
    getById("result").className = "h"
    newGame()
}

// New game
function newGame() {
    clearTastatur()
    clearPlayer()
    createWord()
}

// Clear keyboard
function clearTastatur() {
    var e = document.getElementsByClassName("b")
    for(a = 0; a < e.length; a++) {
        e[a].setAttribute("data", "")
    }
}

// Clear player
function clearPlayer() {
    fail = 0
    wordLeft = []
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

// Get new word
function createWord() {
    var d = getById("letter")
    d.innerHTML = ""
    select = Math.floor(Math.random() * word.length)
    for(a = 0; a < word[select][0].length; a++) {
        var x = word[select][0][a].toUpperCase()
        var b = document.createElement("span")
        b.className = "l" + (x == " " ? " ls" : "")
        b.innerHTML = "&nbsp"
        b.id = "l" + a;
        d.appendChild(b)
        
        if(x != " ") {
            if(wordLeft.indexOf(x) == -1) {
                wordLeft.push(x)
            }
        }
    }
}

// If letter "X" exist
function isExist(e) {
    e = e.toUpperCase()
    var x = wordLeft.indexOf(e)
    if(x != -1) {
        wordLeft.splice(x, 1)
        typeWord(e)
        return true
    }
    return false
}

// Show next fail drawing
function showNextFail() {
    fail++
    switch(fail) {
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
            gameEnd(false)
            break;
    }
}

function typeWord(e) {
    for(a = 0; a < word[select][0].length; a++) {
        if(word[select][0][a].toUpperCase() == e) {
            getById("l" + a).innerText = e
        }
    }
}

// Game result
function gameEnd(e) {
    var d = getById("result")
    d.setAttribute("data", e)
    if(e) {
        getById("rT").innerText = "You Win!"
        getById("rM").innerHTML = "Congratulations, you found the word!<br/><br/>Good Job!"
    } else {
        getById("rT").innerText = "You Lose!"
        getById("rM").innerHTML = "The word was <br/><br/>\"" + word[select][0].toUpperCase() + "\"<br/><br/>Better luck next time."
    }
    d.className = ""
}

// Show hint
function hint() {
    getById("hintText").innerText = word[select][1]
    getById("hint").style.display = "block"
}

// Exit hint
function hintExit() {
    getById("hint").style.display = "none"
}

// Game check, If show next error / game end
/**
 * 
 * @param {*} a 
 */
function bTas(a) {
    if(a.getAttribute("data") == "") {
        var x = isExist(a.innerText)
        a.setAttribute("data", x)
        if(x) {
            if(wordLeft.length == 0) {
                gameEnd(true)
            }
        } else {
            showNextFail()
        }
    }
}

/**
 * setup
 * DOM mmanipulation
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
            bTas(this)
        }
        container.appendChild(b)
    });
}

/**
 * func
 * @param {string} id
 * @returns element
 */
function getById(id) {
    return document.getElementById(id)
}

module.exports = {
    KEYS,
    createKeyboard,
    hint,
    hintExit,
    startGame
};

},{}]},{},[1])(1)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKlxuICogPiBDb2RlZCBCeSBUaG9tYXMgSGpcbiAqL1xuXG4vLyBGT1IgUkVGQUNUT1JcblxuLyoqXG4gKiBcbiAqIFRPRE9TOlxuICogIDEuIGZvciByZWZhY3RvciBcbiAqICAyLiB3cml0ZSB0ZXN0c1xuKi9cblxuLy8gV29yZCBzZWxlY3Rpb25cbi8vIE5ldyB3b3JkID0gW1wiV29yZCBuYW1lXCIsIFwiSGludFwiXVxudmFyIHdvcmQgPSBbW1wiSGFuZ21hblwiLCBcIlRoYXQgZ2FtZSB5b3UgYXJlIHBsYXlpbmcgcmlnaHQgbm93LlwiXSwgW1wiVGhvbWFzIEhqXCIsIFwiQWJvdXQgdGhlIGNyZWF0b3Igb2YgdGhpcyBnYW1lLlwiXSwgW1wiSFRNTFwiLCBcIk1hcmt1cCBsYW5ndWFnZSBmb3IgY3JlYXRpbmcgV2ViIHBhZ2VzLlwiXSwgW1wiQ1NTXCIsIFwiV2VwIHBhZ2Ugc3R5bGVzXCJdLCBbXCJQSFBcIiwgXCJBIHZlcnkgcG9wdWxhciBzZXJ2ZXIgc2NyaXB0aW5nIGxhbmd1YWdlLlwiXSwgW1wiSmF2YVNjcmlwdFwiLCBcIk1ha2Ugd2ViLXBhZ2UgZHluYW1pYyB3aXRob3V0IHJlbG9hZCB0aGUgd2ViIHBhZ2UuXCJdLCBbXCJKYXZhXCIsIFwiUnVuIDE1IGJpbGxpb24gZGV2aWNlcy5cXG5BIHByb2dyYW0gY2FuIGJlIHJ1biBpbiBXaW5kb3dzLCBMaW51eCBhbmQgTWFjXCJdLCBbXCJTb2xvTGVhcm5cIiwgXCJBIGNvbXBhbnkgdGhhdCBldmVyeW9uZSBjYW4gY29kZSBmb3IgZnVuIGFuZCBzaGFyZS5cIl0sIFtcIkxvdmVcIiwgXCJXaGF0IGlzID9cXG5CYWJ5IGRvbid0IGh1cnQgbWVcXG5Eb24ndCBodXJ0IG1lXFxuTm8gbW9yZVwiXSwgW1wiRG9jdW1lbnRcIiwgXCJBIGxvdCBvZiB0ZXh0IGluIHRoZSBhIGZpbGUuXCJdLCBbXCJQbGF5Z3JvdW5kXCIsIFwiVGhlcmUgc2Nob29sIGtpZHMgZ28gdG8uXCJdLCBbXCJSdW5cIiwgXCJVc2FpbiBib2x0LlwiXSwgW1wiQ29kZVwiLCBcInZhciBodyA9ICdIZWxsbyBXb3JsZCc7XCJdLCBbXCJTYW1zdW5nXCIsIFwiQSBjb21wYW55IGNyZWF0ZSBQaG9uZSwgVHYsIE1vbml0b3IsIFNERCwgTWVtb3J5IGNoaXAuLi5cIl0sIFtcIlN1cGVyIE1hcmlvXCIsIFwiQSB2ZXJ5IHBvcHVsYXIgZ2FtZSBpbiBOaW50ZW5kbyA2NCB0aGF0IGhhdmUgcmVkIGhhdC5cIl0sIFtcIlN0YXJcIiwgXCJTdXBlciBNYXJpbyBsaWtlIHRvIGdldC5cIl0sIFtcIkNsb2NrXCIsIFwiMTQ6MTIgb3IgMTRwbVwiXSwgW1wiQmluYXJ5IENsb2NrXCIsIFwiQSBjbG9jayB0aGF0IG9ubHkgdXNlIDAgb3IgMS5cIl0sIFtcIlN3b3JkXCIsIFwiTGluayBmcm9tIFplbGRhIGhhdmUgb24gdGhlIGhhbmQuXCJdLCBbXCJHaXJsXCIsIFwiTm90IGJveSBidXQgP1wiXSwgW1wiQm95XCIsIFwiTm90IGdpcmwgYnV0ID9cIl0sIFtcIkZlbWFsZVwiLCBcIk90aGVyIG5hbWUgYXMgZ2lybC5cIl0sIFtcIk1hbGVcIiwgXCJPdGhlciBuYW1lIGFzIGJveS5cIl0sIFtcIlNtYXJ0cGhvbmVcIiwgXCJTb21ldGhpbmcgeW91J3ZlIGFsd2F5cyBvbiB5b3UuXCJdXVxuXG4vLyBHYW1lIGtleWJvYXJkXG5jb25zdCBLRVlTID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWlwiXG5cbi8vIEdhbWUgbWVtb3J5XG52YXIgc2VsZWN0ID0gMFxudmFyIHdvcmRMZWZ0ID0gW11cbnZhciBmYWlsID0gMFxuXG4vLyBXZWItcGFnZSBvbmxvYWRcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICBnZXRCeUlkKFwibW92ZUtleWJvcmRcIikuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZnVuY3Rpb24oZSkge1xuICAgICAgICB3SCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICB0WSA9IGUudG91Y2hlc1swXS5jbGllbnRZXG4gICAgICAgIGVMID0gZ2V0QnlJZChcInRhc3RhdHVyXCIpXG4gICAgICAgIHJlc1kgPSB3SCAtIHRZIC0gZUwub2Zmc2V0SGVpZ2h0XG4gICAgICAgIGlmKHJlc1kgPCAwKSB7XG4gICAgICAgICAgICByZXNZID0gMFxuICAgICAgICB9IGVsc2UgaWYocmVzWSA+IHdIIC8gMikge1xuICAgICAgICAgICAgcmVzWSA9IHdIIC8gMlxuICAgICAgICB9XG4gICAgICAgIGVMLnN0eWxlLmJvdHRvbSA9IHJlc1kgKyBcInB4XCJcbsKgwqDCoCB9LCBmYWxzZSlcbiAgICBjcmVhdGVLZXlib2FyZCgpXG59XG5cbi8vIFN0YXJ0IGdhbWVcbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgICBnZXRCeUlkKFwiaG9tZVwiKS5jbGFzc05hbWUgPSBcImhcIlxuICAgIGdldEJ5SWQoXCJyZXN1bHRcIikuY2xhc3NOYW1lID0gXCJoXCJcbiAgICBuZXdHYW1lKClcbn1cblxuLy8gTmV3IGdhbWVcbmZ1bmN0aW9uIG5ld0dhbWUoKSB7XG4gICAgY2xlYXJUYXN0YXR1cigpXG4gICAgY2xlYXJQbGF5ZXIoKVxuICAgIGNyZWF0ZVdvcmQoKVxufVxuXG4vLyBDbGVhciBrZXlib2FyZFxuZnVuY3Rpb24gY2xlYXJUYXN0YXR1cigpIHtcbiAgICB2YXIgZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJiXCIpXG4gICAgZm9yKGEgPSAwOyBhIDwgZS5sZW5ndGg7IGErKykge1xuICAgICAgICBlW2FdLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJcIilcbiAgICB9XG59XG5cbi8vIENsZWFyIHBsYXllclxuZnVuY3Rpb24gY2xlYXJQbGF5ZXIoKSB7XG4gICAgZmFpbCA9IDBcbiAgICB3b3JkTGVmdCA9IFtdXG4gICAgZ2V0QnlJZChcImcwXCIpLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJmYWxzZVwiKVxuICAgIGdldEJ5SWQoXCJnMVwiKS5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIFwiZmFsc2VcIilcbiAgICBnZXRCeUlkKFwiZzJcIikuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcImZhbHNlXCIpXG4gICAgZ2V0QnlJZChcImczXCIpLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJmYWxzZVwiKVxuICAgIGdldEJ5SWQoXCJnNFwiKS5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIFwiZmFsc2VcIilcbiAgICBnZXRCeUlkKFwiZzVcIikuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcImZhbHNlXCIpXG4gICAgZ2V0QnlJZChcImc1XCIpLnNldEF0dHJpYnV0ZShcInJcIiwgXCJmYWxzZVwiKVxuICAgIGdldEJ5SWQoXCJnNVwiKS5zZXRBdHRyaWJ1dGUoXCJsXCIsIFwiZmFsc2VcIilcbiAgICBnZXRCeUlkKFwiZzZcIikuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcImZhbHNlXCIpXG4gICAgZ2V0QnlJZChcImc2XCIpLnNldEF0dHJpYnV0ZShcImxcIiwgXCJmYWxzZVwiKVxuICAgIGdldEJ5SWQoXCJnNlwiKS5zZXRBdHRyaWJ1dGUoXCJyXCIsIFwiZmFsc2VcIilcbiAgICBnZXRCeUlkKFwiaGludEJ1dHRvblwiKS5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIFwiZmFsc2VcIilcbiAgICBnZXRCeUlkKFwiaGludFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcbn1cblxuLy8gR2V0IG5ldyB3b3JkXG5mdW5jdGlvbiBjcmVhdGVXb3JkKCkge1xuICAgIHZhciBkID0gZ2V0QnlJZChcImxldHRlclwiKVxuICAgIGQuaW5uZXJIVE1MID0gXCJcIlxuICAgIHNlbGVjdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHdvcmQubGVuZ3RoKVxuICAgIGZvcihhID0gMDsgYSA8IHdvcmRbc2VsZWN0XVswXS5sZW5ndGg7IGErKykge1xuICAgICAgICB2YXIgeCA9IHdvcmRbc2VsZWN0XVswXVthXS50b1VwcGVyQ2FzZSgpXG4gICAgICAgIHZhciBiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgICAgICAgYi5jbGFzc05hbWUgPSBcImxcIiArICh4ID09IFwiIFwiID8gXCIgbHNcIiA6IFwiXCIpXG4gICAgICAgIGIuaW5uZXJIVE1MID0gXCImbmJzcFwiXG4gICAgICAgIGIuaWQgPSBcImxcIiArIGE7XG4gICAgICAgIGQuYXBwZW5kQ2hpbGQoYilcbiAgICAgICAgXG4gICAgICAgIGlmKHggIT0gXCIgXCIpIHtcbiAgICAgICAgICAgIGlmKHdvcmRMZWZ0LmluZGV4T2YoeCkgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB3b3JkTGVmdC5wdXNoKHgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIElmIGxldHRlciBcIlhcIiBleGlzdFxuZnVuY3Rpb24gaXNFeGlzdChlKSB7XG4gICAgZSA9IGUudG9VcHBlckNhc2UoKVxuICAgIHZhciB4ID0gd29yZExlZnQuaW5kZXhPZihlKVxuICAgIGlmKHggIT0gLTEpIHtcbiAgICAgICAgd29yZExlZnQuc3BsaWNlKHgsIDEpXG4gICAgICAgIHR5cGVXb3JkKGUpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxufVxuXG4vLyBTaG93IG5leHQgZmFpbCBkcmF3aW5nXG5mdW5jdGlvbiBzaG93TmV4dEZhaWwoKSB7XG4gICAgZmFpbCsrXG4gICAgc3dpdGNoKGZhaWwpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgZ2V0QnlJZChcImcwXCIpLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJ0cnVlXCIpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGdldEJ5SWQoXCJnMVwiKS5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIFwidHJ1ZVwiKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIFxuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBnZXRCeUlkKFwiZzJcIikuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcInRydWVcIilcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgZ2V0QnlJZChcImczXCIpLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJ0cnVlXCIpXG4gICAgICAgICAgICBnZXRCeUlkKFwiaGludEJ1dHRvblwiKS5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIFwidHJ1ZVwiKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIFxuICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICBnZXRCeUlkKFwiZzRcIikuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcInRydWVcIilcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBcbiAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgZ2V0QnlJZChcImc1XCIpLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJ0cnVlXCIpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgXG4gICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgIGdldEJ5SWQoXCJnNVwiKS5zZXRBdHRyaWJ1dGUoXCJsXCIsIFwidHJ1ZVwiKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIFxuICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICBnZXRCeUlkKFwiZzVcIikuc2V0QXR0cmlidXRlKFwiclwiLCBcInRydWVcIilcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBcbiAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgZ2V0QnlJZChcImc2XCIpLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJ0cnVlXCIpXG4gICAgICAgICAgICBnZXRCeUlkKFwiZzZcIikuc2V0QXR0cmlidXRlKFwibFwiLCBcInRydWVcIilcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBcbiAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgIGdldEJ5SWQoXCJnNlwiKS5zZXRBdHRyaWJ1dGUoXCJyXCIsIFwidHJ1ZVwiKVxuICAgICAgICAgICAgZ2FtZUVuZChmYWxzZSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdHlwZVdvcmQoZSkge1xuICAgIGZvcihhID0gMDsgYSA8IHdvcmRbc2VsZWN0XVswXS5sZW5ndGg7IGErKykge1xuICAgICAgICBpZih3b3JkW3NlbGVjdF1bMF1bYV0udG9VcHBlckNhc2UoKSA9PSBlKSB7XG4gICAgICAgICAgICBnZXRCeUlkKFwibFwiICsgYSkuaW5uZXJUZXh0ID0gZVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyBHYW1lIHJlc3VsdFxuZnVuY3Rpb24gZ2FtZUVuZChlKSB7XG4gICAgdmFyIGQgPSBnZXRCeUlkKFwicmVzdWx0XCIpXG4gICAgZC5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIGUpXG4gICAgaWYoZSkge1xuICAgICAgICBnZXRCeUlkKFwiclRcIikuaW5uZXJUZXh0ID0gXCJZb3UgV2luIVwiXG4gICAgICAgIGdldEJ5SWQoXCJyTVwiKS5pbm5lckhUTUwgPSBcIkNvbmdyYXR1bGF0aW9ucywgeW91IGZvdW5kIHRoZSB3b3JkITxici8+PGJyLz5Hb29kIEpvYiFcIlxuICAgIH0gZWxzZSB7XG4gICAgICAgIGdldEJ5SWQoXCJyVFwiKS5pbm5lclRleHQgPSBcIllvdSBMb3NlIVwiXG4gICAgICAgIGdldEJ5SWQoXCJyTVwiKS5pbm5lckhUTUwgPSBcIlRoZSB3b3JkIHdhcyA8YnIvPjxici8+XFxcIlwiICsgd29yZFtzZWxlY3RdWzBdLnRvVXBwZXJDYXNlKCkgKyBcIlxcXCI8YnIvPjxici8+QmV0dGVyIGx1Y2sgbmV4dCB0aW1lLlwiXG4gICAgfVxuICAgIGQuY2xhc3NOYW1lID0gXCJcIlxufVxuXG4vLyBTaG93IGhpbnRcbmZ1bmN0aW9uIGhpbnQoKSB7XG4gICAgZ2V0QnlJZChcImhpbnRUZXh0XCIpLmlubmVyVGV4dCA9IHdvcmRbc2VsZWN0XVsxXVxuICAgIGdldEJ5SWQoXCJoaW50XCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCJcbn1cblxuLy8gRXhpdCBoaW50XG5mdW5jdGlvbiBoaW50RXhpdCgpIHtcbiAgICBnZXRCeUlkKFwiaGludFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcbn1cblxuLy8gR2FtZSBjaGVjaywgSWYgc2hvdyBuZXh0IGVycm9yIC8gZ2FtZSBlbmRcbi8qKlxuICogXG4gKiBAcGFyYW0geyp9IGEgXG4gKi9cbmZ1bmN0aW9uIGJUYXMoYSkge1xuICAgIGlmKGEuZ2V0QXR0cmlidXRlKFwiZGF0YVwiKSA9PSBcIlwiKSB7XG4gICAgICAgIHZhciB4ID0gaXNFeGlzdChhLmlubmVyVGV4dClcbiAgICAgICAgYS5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIHgpXG4gICAgICAgIGlmKHgpIHtcbiAgICAgICAgICAgIGlmKHdvcmRMZWZ0Lmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgZ2FtZUVuZCh0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2hvd05leHRGYWlsKClcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBzZXR1cFxuICogRE9NIG1tYW5pcHVsYXRpb25cbiAqL1xuZnVuY3Rpb24gY3JlYXRlS2V5Ym9hcmQoKSB7XG4gICAgdmFyIGNvbnRhaW5lciA9IGdldEJ5SWQoXCJrZXlib2FyZFwiKVxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiXG4gICAgS0VZUy5zcGxpdChcIlwiKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGxldCBiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgYi5jbGFzc05hbWUgPSBcImJcIjtcbiAgICAgICAgYi5pbm5lclRleHQgPSBrZXkudG9VcHBlckNhc2UoKTtcbiAgICAgICAgYi5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIFwiXCIpXG4gICAgICAgIGIub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYlRhcyh0aGlzKVxuICAgICAgICB9XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChiKVxuICAgIH0pO1xufVxuXG4vKipcbiAqIGZ1bmNcbiAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICogQHJldHVybnMgZWxlbWVudFxuICovXG5mdW5jdGlvbiBnZXRCeUlkKGlkKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBLRVlTLFxuICAgIGNyZWF0ZUtleWJvYXJkLFxuICAgIGhpbnQsXG4gICAgaGludEV4aXQsXG4gICAgc3RhcnRHYW1lXG59O1xuIl19
