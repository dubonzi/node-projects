const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate new message correctly', () => {
    let from = 'Eduardo'
    let text = 'Mensagem teste';
    let newMessage = generateMessage(from, text);
    // expect(newMessage.from).toBe(from);
    // expect(newMessage.text).toBe(text);
    expect(newMessage).toMatchObject({from, text});
    expect(typeof newMessage.createdAt).toBe('number');
  })

});