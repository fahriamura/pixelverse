const axios = require('axios');
const readline = require('readline-sync');

const secret = readline.question('secret token : ');
const TgId = readline.question('TgId : ');

function postData() {
  const data = {
    clicksAmount: 1
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Secret': secret,
      'Tg-Id': TgId,
      'Origin': 'https://sexyzbot.pxlvrs.io',
      'Referer': 'https://sexyzbot.pxlvrs.io/',
      'Sec-Fetch-Site': 'cross-site'
    }
  };

  axios.post('https://api-clicker.pixelverse.xyz/api/users', data, config)
    .then((response) => {
      console.log(`telegramUserId: ${response.data.telegramUserId} | energy: ${response.data.pet.energy} | total point: ${response.data.clicksCount}`);
      if (response.data.pet.energy > 1) {
        postData();
      } else {
        console.log('Delay 1 Menit');
        setTimeout(postData, 60000);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      postData();
    });
}

postData();
