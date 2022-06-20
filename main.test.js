const fs = require("fs");

window.document.body.innerHTML = fs.readFileSync('./index.html');
const {createKeyboard, createWord, getGameWord, KEYS, word} = require('./main');
let gameWord = "";

describe("setup game", () => {
    test('should display letter buttons as inputs', () => {
        createKeyboard();
        expect(document.querySelectorAll('#keyboard button.b').length).toEqual(26);
    })

    test('should choose one word to play the game', () => {
        gameWord = getGameWord();
        expect(Array.isArray(gameWord)).toBe(true);
        gameWord.forEach(value => {
            expect(value.length).toBeGreaterThan(0);
        });
        word.find(set => {
            return set.reduce((acc, cur, i)=>{
                return acc && cur == gameWord[i]
            }, true);
        }).forEach((value, index) => {
            expect(gameWord[index]).toEqual(value);
        });
    })
    
    test('should display blank lines for each letter of word', () => {
        createWord(gameWord);
        expect(document.querySelectorAll('#letter span').length).toEqual(gameWord[0].length);
    })
});
