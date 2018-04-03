var expect = require('expect');
var { generateMessage } = require("./message");




describe('generateMessage', () => {
    it('should generate message object', () => {
        var from = 'sankar';
        var message = 'testing message'
        var messageObj = generateMessage(from, message);

        expect(messageObj.from).toBe(from);
        expect(messageObj.text).toBe(message);
        expect(typeof messageObj.createdAt).toBe('number');
    })
})