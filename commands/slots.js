const slots = ['🍇', '🍊', '🍐', '🍒', '🍋'];

module.exports.run = async(client, msg, args) => {
    const slotOne = slots[Math.floor(Math.random() * slots.length)];
    const slotTwo = slots[Math.floor(Math.random() * slots.length)];
    const slotThree = slots[Math.floor(Math.random() * slots.length)];
    if (slotOne === slotTwo && slotOne === slotThree) {
        return msg.reply(`
            ${slotOne}|${slotTwo}|${slotThree}
            Wow! You Win! You Are Pro!
        `);
    }
    return msg.reply(`
        ${slotOne}|${slotTwo}|${slotThree}
        Nooooo... You Lose Try Again?
    `);
}

module.exports.help = {
    name: "slots"
}