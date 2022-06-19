const fs = require("fs");

window.document.body.innerHTML = fs.readFileSync('./index.html');
const {createKeyboard, KEYS} = require('./index');

describe("setup game", () => {
    test('should display letter buttons', () => {
        createKeyboard();
        expect(document.querySelectorAll('#keyboard button.b').length).toEqual(26);
    })
});
