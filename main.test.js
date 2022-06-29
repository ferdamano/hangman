const fs = require("fs");

window.document.body.innerHTML = fs.readFileSync('./index.html');
const mainjs = require('./main');
const {
    hangman,
    KEYS,
    createKeyboard,
    getGameWord,
    getGame,
    keyboardListener,
    startGame,
    HangmanGame,
} = mainjs;
let gameWord = "";

describe("setup game", () => {
    test('should display letter buttons as inputs', () => {
        createKeyboard();
        expect(document.querySelectorAll('#keyboard button.b').length).toEqual(26);
    })

    // test('letter key is pressed, listener should be called', () => {
    //     let events = {};
    //     document.addEventListener = jest.fn((event, cb) => {
    //         events[event] = cb;
    //     });

    //     const spy = jest.spyOn(mainjs, 'bTas');

    //     var event = new KeyboardEvent('keydown', {'keyCode': 65});
    //     document.dispatchEvent(event);

    //     expect(spy).toHaveBeenCalled();
    //     spy.mockRestore();
    // })

    // test('should choose one word to play the game', () => {
    //     gameWord = getGameWord();
    //     expect(Array.isArray(gameWord)).toBe(true);
    //     gameWord.forEach(value => {
    //         expect(value.length).toBeGreaterThan(0);
    //     });
    //     word.find(set => {
    //         return set.reduce((acc, cur, i)=>{
    //             return acc && cur == gameWord[i]
    //         }, true);
    //     }).forEach((value, index) => {
    //         expect(gameWord[index]).toEqual(value);
    //     });
    // })
    
    test('should display blank lines for each letter of word', () => {
        const hangmangame = new HangmanGame();
        const gameWord = getGameWord()
        hangmangame.createWord(gameWord);
        expect(document.querySelectorAll('#letter span').length).toEqual(gameWord[0].length);
    })
});
