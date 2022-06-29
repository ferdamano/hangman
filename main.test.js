const fs = require("fs");

window.document.body.innerHTML = fs.readFileSync('./index.html');
const mainjs = require('./main');
const {
    word,
    hangman,
    KEYS,
    createKeyboard,
    gtoBetGameWord,
    getGame,
    keyboardListener,
    startGame,
    HangmanGame,
} = mainjs;
let gameWord = "";

describe("[DOM manipulation] setup game", () => {
    test('[createKeyboard] should display letter buttons as inputs', () => {
        createKeyboard();
        expect(document.querySelectorAll('#keyboard button.b').length).toEqual(26);
    })

    test('[createWord] should display blank lines for each letter of word', () => {
        const hangmangame = new HangmanGame();
        let index = Math.floor(Math.random() * word.length);
        let gameWord = word[index];
        hangmangame.createWord(gameWord);
        expect(document.querySelectorAll('#letter span').length).toEqual(gameWord[0].length);
    })
});

describe("game logic", () => {
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
})