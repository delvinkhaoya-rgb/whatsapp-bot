
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot is running!'));
app.listen(3000, () => console.log('Server running'));

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('SCAN HII QR:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot iko tayari!');
});

client.on('message', async (msg) => {
    if (msg.body.toLowerCase() === 'hi' || msg.body.toLowerCase() === 'hello') {
        msg.reply('Hello! Niko online ✅ Bot yako inafanya kazi!');
    }
    if (msg.body === '!ping') {
        msg.reply('pong 🏓');
    }
});

client.initialize();
