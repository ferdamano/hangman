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
    createWord(getGameWord())
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
 * utility function
 * @return {string} word
 */
function getGameWord() {
    let index = Math.floor(Math.random() * word.length);
    return word[index];
}

/**
 * setup
 * DOM mmanipulation
 * @param {string} gameWord
 */
function createWord(gameWord) {
    var d = getById("letter")
    d.innerHTML = ""
    const selected = gameWord[0];
    for(a = 0; a < selected.length; a++) {
        var x = selected[a].toUpperCase()
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
 * utility function
 * @param {string} id
 * @returns element
 */
function getById(id) {
    return document.getElementById(id)
}

module.exports = {
    KEYS,
    createKeyboard,
    createWord,
    getGameWord,
    hint,
    hintExit,
    startGame,
    word
};

},{}]},{},[1])(1)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qXG4gKiA+IENvZGVkIEJ5IFRob21hcyBIalxuICovXG5cbi8vIEZPUiBSRUZBQ1RPUlxuXG4vKipcbiAqIFxuICogVE9ET1M6XG4gKiAgMS4gZm9yIHJlZmFjdG9yIFxuICogIDIuIHdyaXRlIHRlc3RzXG4qL1xuXG4vLyBXb3JkIHNlbGVjdGlvblxuLy8gTmV3IHdvcmQgPSBbXCJXb3JkIG5hbWVcIiwgXCJIaW50XCJdXG52YXIgd29yZCA9IFtbXCJIYW5nbWFuXCIsIFwiVGhhdCBnYW1lIHlvdSBhcmUgcGxheWluZyByaWdodCBub3cuXCJdLCBbXCJUaG9tYXMgSGpcIiwgXCJBYm91dCB0aGUgY3JlYXRvciBvZiB0aGlzIGdhbWUuXCJdLCBbXCJIVE1MXCIsIFwiTWFya3VwIGxhbmd1YWdlIGZvciBjcmVhdGluZyBXZWIgcGFnZXMuXCJdLCBbXCJDU1NcIiwgXCJXZXAgcGFnZSBzdHlsZXNcIl0sIFtcIlBIUFwiLCBcIkEgdmVyeSBwb3B1bGFyIHNlcnZlciBzY3JpcHRpbmcgbGFuZ3VhZ2UuXCJdLCBbXCJKYXZhU2NyaXB0XCIsIFwiTWFrZSB3ZWItcGFnZSBkeW5hbWljIHdpdGhvdXQgcmVsb2FkIHRoZSB3ZWIgcGFnZS5cIl0sIFtcIkphdmFcIiwgXCJSdW4gMTUgYmlsbGlvbiBkZXZpY2VzLlxcbkEgcHJvZ3JhbSBjYW4gYmUgcnVuIGluIFdpbmRvd3MsIExpbnV4IGFuZCBNYWNcIl0sIFtcIlNvbG9MZWFyblwiLCBcIkEgY29tcGFueSB0aGF0IGV2ZXJ5b25lIGNhbiBjb2RlIGZvciBmdW4gYW5kIHNoYXJlLlwiXSwgW1wiTG92ZVwiLCBcIldoYXQgaXMgP1xcbkJhYnkgZG9uJ3QgaHVydCBtZVxcbkRvbid0IGh1cnQgbWVcXG5ObyBtb3JlXCJdLCBbXCJEb2N1bWVudFwiLCBcIkEgbG90IG9mIHRleHQgaW4gdGhlIGEgZmlsZS5cIl0sIFtcIlBsYXlncm91bmRcIiwgXCJUaGVyZSBzY2hvb2wga2lkcyBnbyB0by5cIl0sIFtcIlJ1blwiLCBcIlVzYWluIGJvbHQuXCJdLCBbXCJDb2RlXCIsIFwidmFyIGh3ID0gJ0hlbGxvIFdvcmxkJztcIl0sIFtcIlNhbXN1bmdcIiwgXCJBIGNvbXBhbnkgY3JlYXRlIFBob25lLCBUdiwgTW9uaXRvciwgU0RELCBNZW1vcnkgY2hpcC4uLlwiXSwgW1wiU3VwZXIgTWFyaW9cIiwgXCJBIHZlcnkgcG9wdWxhciBnYW1lIGluIE5pbnRlbmRvIDY0IHRoYXQgaGF2ZSByZWQgaGF0LlwiXSwgW1wiU3RhclwiLCBcIlN1cGVyIE1hcmlvIGxpa2UgdG8gZ2V0LlwiXSwgW1wiQ2xvY2tcIiwgXCIxNDoxMiBvciAxNHBtXCJdLCBbXCJCaW5hcnkgQ2xvY2tcIiwgXCJBIGNsb2NrIHRoYXQgb25seSB1c2UgMCBvciAxLlwiXSwgW1wiU3dvcmRcIiwgXCJMaW5rIGZyb20gWmVsZGEgaGF2ZSBvbiB0aGUgaGFuZC5cIl0sIFtcIkdpcmxcIiwgXCJOb3QgYm95IGJ1dCA/XCJdLCBbXCJCb3lcIiwgXCJOb3QgZ2lybCBidXQgP1wiXSwgW1wiRmVtYWxlXCIsIFwiT3RoZXIgbmFtZSBhcyBnaXJsLlwiXSwgW1wiTWFsZVwiLCBcIk90aGVyIG5hbWUgYXMgYm95LlwiXSwgW1wiU21hcnRwaG9uZVwiLCBcIlNvbWV0aGluZyB5b3UndmUgYWx3YXlzIG9uIHlvdS5cIl1dXG5cbi8vIEdhbWUga2V5Ym9hcmRcbmNvbnN0IEtFWVMgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXCJcblxuLy8gR2FtZSBtZW1vcnlcbnZhciBzZWxlY3QgPSAwXG52YXIgd29yZExlZnQgPSBbXVxudmFyIGZhaWwgPSAwXG5cbi8vIFdlYi1wYWdlIG9ubG9hZFxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgIGdldEJ5SWQoXCJtb3ZlS2V5Ym9yZFwiKS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHdIID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgIHRZID0gZS50b3VjaGVzWzBdLmNsaWVudFlcbiAgICAgICAgZUwgPSBnZXRCeUlkKFwidGFzdGF0dXJcIilcbiAgICAgICAgcmVzWSA9IHdIIC0gdFkgLSBlTC5vZmZzZXRIZWlnaHRcbiAgICAgICAgaWYocmVzWSA8IDApIHtcbiAgICAgICAgICAgIHJlc1kgPSAwXG4gICAgICAgIH0gZWxzZSBpZihyZXNZID4gd0ggLyAyKSB7XG4gICAgICAgICAgICByZXNZID0gd0ggLyAyXG4gICAgICAgIH1cbiAgICAgICAgZUwuc3R5bGUuYm90dG9tID0gcmVzWSArIFwicHhcIlxuwqDCoMKgIH0sIGZhbHNlKVxuICAgIGNyZWF0ZUtleWJvYXJkKClcbn1cblxuLy8gU3RhcnQgZ2FtZVxuZnVuY3Rpb24gc3RhcnRHYW1lKCkge1xuICAgIGdldEJ5SWQoXCJob21lXCIpLmNsYXNzTmFtZSA9IFwiaFwiXG4gICAgZ2V0QnlJZChcInJlc3VsdFwiKS5jbGFzc05hbWUgPSBcImhcIlxuICAgIG5ld0dhbWUoKVxufVxuXG4vLyBOZXcgZ2FtZVxuZnVuY3Rpb24gbmV3R2FtZSgpIHtcbiAgICBjbGVhclRhc3RhdHVyKClcbiAgICBjbGVhclBsYXllcigpXG4gICAgY3JlYXRlV29yZChnZXRHYW1lV29yZCgpKVxufVxuXG4vLyBDbGVhciBrZXlib2FyZFxuZnVuY3Rpb24gY2xlYXJUYXN0YXR1cigpIHtcbiAgICB2YXIgZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJiXCIpXG4gICAgZm9yKGEgPSAwOyBhIDwgZS5sZW5ndGg7IGErKykge1xuICAgICAgICBlW2FdLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJcIilcbiAgICB9XG59XG5cbi8vIENsZWFyIHBsYXllclxuZnVuY3Rpb24gY2xlYXJQbGF5ZXIoKSB7XG4gICAgZmFpbCA9IDBcbiAgICB3b3JkTGVmdCA9IFtdXG4gICAgZ2V0QnlJZChcImcwXCIpLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJmYWxzZVwiKVxuICAgIGdldEJ5SWQoXCJnMVwiKS5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIFwiZmFsc2VcIilcbiAgICBnZXRCeUlkKFwiZzJcIikuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcImZhbHNlXCIpXG4gICAgZ2V0QnlJZChcImczXCIpLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJmYWxzZVwiKVxuICAgIGdldEJ5SWQoXCJnNFwiKS5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIFwiZmFsc2VcIilcbiAgICBnZXRCeUlkKFwiZzVcIikuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcImZhbHNlXCIpXG4gICAgZ2V0QnlJZChcImc1XCIpLnNldEF0dHJpYnV0ZShcInJcIiwgXCJmYWxzZVwiKVxuICAgIGdldEJ5SWQoXCJnNVwiKS5zZXRBdHRyaWJ1dGUoXCJsXCIsIFwiZmFsc2VcIilcbiAgICBnZXRCeUlkKFwiZzZcIikuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcImZhbHNlXCIpXG4gICAgZ2V0QnlJZChcImc2XCIpLnNldEF0dHJpYnV0ZShcImxcIiwgXCJmYWxzZVwiKVxuICAgIGdldEJ5SWQoXCJnNlwiKS5zZXRBdHRyaWJ1dGUoXCJyXCIsIFwiZmFsc2VcIilcbiAgICBnZXRCeUlkKFwiaGludEJ1dHRvblwiKS5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIFwiZmFsc2VcIilcbiAgICBnZXRCeUlkKFwiaGludFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcbn1cblxuXG5cbi8vIElmIGxldHRlciBcIlhcIiBleGlzdFxuZnVuY3Rpb24gaXNFeGlzdChlKSB7XG4gICAgZSA9IGUudG9VcHBlckNhc2UoKVxuICAgIHZhciB4ID0gd29yZExlZnQuaW5kZXhPZihlKVxuICAgIGlmKHggIT0gLTEpIHtcbiAgICAgICAgd29yZExlZnQuc3BsaWNlKHgsIDEpXG4gICAgICAgIHR5cGVXb3JkKGUpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxufVxuXG4vLyBTaG93IG5leHQgZmFpbCBkcmF3aW5nXG5mdW5jdGlvbiBzaG93TmV4dEZhaWwoKSB7XG4gICAgZmFpbCsrXG4gICAgc3dpdGNoKGZhaWwpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgZ2V0QnlJZChcImcwXCIpLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJ0cnVlXCIpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGdldEJ5SWQoXCJnMVwiKS5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIFwidHJ1ZVwiKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIFxuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBnZXRCeUlkKFwiZzJcIikuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcInRydWVcIilcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgZ2V0QnlJZChcImczXCIpLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJ0cnVlXCIpXG4gICAgICAgICAgICBnZXRCeUlkKFwiaGludEJ1dHRvblwiKS5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIFwidHJ1ZVwiKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIFxuICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICBnZXRCeUlkKFwiZzRcIikuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcInRydWVcIilcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBcbiAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgZ2V0QnlJZChcImc1XCIpLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJ0cnVlXCIpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgXG4gICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgIGdldEJ5SWQoXCJnNVwiKS5zZXRBdHRyaWJ1dGUoXCJsXCIsIFwidHJ1ZVwiKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIFxuICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICBnZXRCeUlkKFwiZzVcIikuc2V0QXR0cmlidXRlKFwiclwiLCBcInRydWVcIilcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBcbiAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgZ2V0QnlJZChcImc2XCIpLnNldEF0dHJpYnV0ZShcImRhdGFcIiwgXCJ0cnVlXCIpXG4gICAgICAgICAgICBnZXRCeUlkKFwiZzZcIikuc2V0QXR0cmlidXRlKFwibFwiLCBcInRydWVcIilcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBcbiAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgIGdldEJ5SWQoXCJnNlwiKS5zZXRBdHRyaWJ1dGUoXCJyXCIsIFwidHJ1ZVwiKVxuICAgICAgICAgICAgZ2FtZUVuZChmYWxzZSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdHlwZVdvcmQoZSkge1xuICAgIGZvcihhID0gMDsgYSA8IHdvcmRbc2VsZWN0XVswXS5sZW5ndGg7IGErKykge1xuICAgICAgICBpZih3b3JkW3NlbGVjdF1bMF1bYV0udG9VcHBlckNhc2UoKSA9PSBlKSB7XG4gICAgICAgICAgICBnZXRCeUlkKFwibFwiICsgYSkuaW5uZXJUZXh0ID0gZVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyBHYW1lIHJlc3VsdFxuZnVuY3Rpb24gZ2FtZUVuZChlKSB7XG4gICAgdmFyIGQgPSBnZXRCeUlkKFwicmVzdWx0XCIpXG4gICAgZC5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIGUpXG4gICAgaWYoZSkge1xuICAgICAgICBnZXRCeUlkKFwiclRcIikuaW5uZXJUZXh0ID0gXCJZb3UgV2luIVwiXG4gICAgICAgIGdldEJ5SWQoXCJyTVwiKS5pbm5lckhUTUwgPSBcIkNvbmdyYXR1bGF0aW9ucywgeW91IGZvdW5kIHRoZSB3b3JkITxici8+PGJyLz5Hb29kIEpvYiFcIlxuICAgIH0gZWxzZSB7XG4gICAgICAgIGdldEJ5SWQoXCJyVFwiKS5pbm5lclRleHQgPSBcIllvdSBMb3NlIVwiXG4gICAgICAgIGdldEJ5SWQoXCJyTVwiKS5pbm5lckhUTUwgPSBcIlRoZSB3b3JkIHdhcyA8YnIvPjxici8+XFxcIlwiICsgd29yZFtzZWxlY3RdWzBdLnRvVXBwZXJDYXNlKCkgKyBcIlxcXCI8YnIvPjxici8+QmV0dGVyIGx1Y2sgbmV4dCB0aW1lLlwiXG4gICAgfVxuICAgIGQuY2xhc3NOYW1lID0gXCJcIlxufVxuXG4vLyBTaG93IGhpbnRcbmZ1bmN0aW9uIGhpbnQoKSB7XG4gICAgZ2V0QnlJZChcImhpbnRUZXh0XCIpLmlubmVyVGV4dCA9IHdvcmRbc2VsZWN0XVsxXVxuICAgIGdldEJ5SWQoXCJoaW50XCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCJcbn1cblxuLy8gRXhpdCBoaW50XG5mdW5jdGlvbiBoaW50RXhpdCgpIHtcbiAgICBnZXRCeUlkKFwiaGludFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcbn1cblxuLy8gR2FtZSBjaGVjaywgSWYgc2hvdyBuZXh0IGVycm9yIC8gZ2FtZSBlbmRcbi8qKlxuICogXG4gKiBAcGFyYW0geyp9IGEgXG4gKi9cbmZ1bmN0aW9uIGJUYXMoYSkge1xuICAgIGlmKGEuZ2V0QXR0cmlidXRlKFwiZGF0YVwiKSA9PSBcIlwiKSB7XG4gICAgICAgIHZhciB4ID0gaXNFeGlzdChhLmlubmVyVGV4dClcbiAgICAgICAgYS5zZXRBdHRyaWJ1dGUoXCJkYXRhXCIsIHgpXG4gICAgICAgIGlmKHgpIHtcbiAgICAgICAgICAgIGlmKHdvcmRMZWZ0Lmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgZ2FtZUVuZCh0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2hvd05leHRGYWlsKClcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBzZXR1cFxuICogdXRpbGl0eSBmdW5jdGlvblxuICogQHJldHVybiB7c3RyaW5nfSB3b3JkXG4gKi9cbmZ1bmN0aW9uIGdldEdhbWVXb3JkKCkge1xuICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHdvcmQubGVuZ3RoKTtcbiAgICByZXR1cm4gd29yZFtpbmRleF07XG59XG5cbi8qKlxuICogc2V0dXBcbiAqIERPTSBtbWFuaXB1bGF0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gZ2FtZVdvcmRcbiAqL1xuZnVuY3Rpb24gY3JlYXRlV29yZChnYW1lV29yZCkge1xuICAgIHZhciBkID0gZ2V0QnlJZChcImxldHRlclwiKVxuICAgIGQuaW5uZXJIVE1MID0gXCJcIlxuICAgIGNvbnN0IHNlbGVjdGVkID0gZ2FtZVdvcmRbMF07XG4gICAgZm9yKGEgPSAwOyBhIDwgc2VsZWN0ZWQubGVuZ3RoOyBhKyspIHtcbiAgICAgICAgdmFyIHggPSBzZWxlY3RlZFthXS50b1VwcGVyQ2FzZSgpXG4gICAgICAgIHZhciBiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgICAgICAgYi5jbGFzc05hbWUgPSBcImxcIiArICh4ID09IFwiIFwiID8gXCIgbHNcIiA6IFwiXCIpXG4gICAgICAgIGIuaW5uZXJIVE1MID0gXCImbmJzcFwiXG4gICAgICAgIGIuaWQgPSBcImxcIiArIGE7XG4gICAgICAgIGQuYXBwZW5kQ2hpbGQoYilcbiAgICAgICAgXG4gICAgICAgIGlmKHggIT0gXCIgXCIpIHtcbiAgICAgICAgICAgIGlmKHdvcmRMZWZ0LmluZGV4T2YoeCkgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB3b3JkTGVmdC5wdXNoKHgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogc2V0dXBcbiAqIERPTSBtbWFuaXB1bGF0aW9uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUtleWJvYXJkKCkge1xuICAgIHZhciBjb250YWluZXIgPSBnZXRCeUlkKFwia2V5Ym9hcmRcIilcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIlxuICAgIEtFWVMuc3BsaXQoXCJcIikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBsZXQgYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIGIuY2xhc3NOYW1lID0gXCJiXCI7XG4gICAgICAgIGIuaW5uZXJUZXh0ID0ga2V5LnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIGIuc2V0QXR0cmlidXRlKFwiZGF0YVwiLCBcIlwiKVxuICAgICAgICBiLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGJUYXModGhpcylcbiAgICAgICAgfVxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYilcbiAgICB9KTtcbn1cblxuLyoqXG4gKiB1dGlsaXR5IGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAqIEByZXR1cm5zIGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gZ2V0QnlJZChpZCkge1xuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgS0VZUyxcbiAgICBjcmVhdGVLZXlib2FyZCxcbiAgICBjcmVhdGVXb3JkLFxuICAgIGdldEdhbWVXb3JkLFxuICAgIGhpbnQsXG4gICAgaGludEV4aXQsXG4gICAgc3RhcnRHYW1lLFxuICAgIHdvcmRcbn07XG4iXX0=
