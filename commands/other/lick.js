const { Command } = require('discord.js-commando');
const Jimp = require('jimp');
const fs = require('fs');
const request = require('request');
const { token } = require('../../config.json');
const { Attachment } = require('discord.js');

module.exports = class SayCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'lick',
      aliases: [],
      memberName: 'lick',
      group: 'other',
      description: 'Make the bot lick a user',
      args: [
        {
          key: 'text',
          prompt: 'Who do you want to lick?',
          type: 'string'
        }
      ]
    });
  }

  run(message, { text }) {
    console.log(token);
    console.log(Attachment);
    request.get(`https://discord.com/api/users/${ message.mentions.users.first().id }`, {
      headers: {
        'Authorization': `Bot ${ token}`
      }
    }, (err, res, body) => {
      console.log(body);
      const user = JSON.parse(body);
      const avatarURL = `https://cdn.discordapp.com/avatars/${ user.id }/${ user.avatar}.png`;
      console.log(avatarURL);
      Jimp.read(`${ __dirname }/../../resources/images/lick.jpg`)
      .then(lick => {
        Jimp.read(avatarURL)
        .then(shook => {
          shook
          .rotate(-94)
          .resize(120, 120);

          lick.composite(shook, 320, 320,
            [{
              mode: Jimp.BLEND_SOURCE_OVER,
              opacitySource: 1,
              opacityDest: 1
            }]
          );

          Jimp.read(avatarURL)
          .then(shook2 => {
            shook2
            .rotate(-18)
            .resize(160, 160)

            lick.composite(shook2, 443, 350,
              [{
                mode: Jimp.BLEND_SOURCE_OVER,
                opacitySource: 1,
                opacityDest: 1
              }]
            );

            Jimp.read(avatarURL)
            .then(shook3 => {
              shook3
              .rotate(55)
              .resize(188, 188)

              lick.composite(shook3, 142, 344,
                [{
                  mode: Jimp.BLEND_SOURCE_OVER,
                  opacitySource: 1,
                  opacityDest: 1
                }]
              );

              Jimp.read(avatarURL)
              .then(async shook4 => {
                shook4
                .rotate(208)
                .resize(188, 188)

                lick.composite(shook4, -40, 260,
                  [{
                    mode: Jimp.BLEND_SOURCE_OVER,
                    opacitySource: 1,
                    opacityDest: 1
                  }]
                );

                const tempFile = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                lick.write(`${ __dirname }/../../resources/images/${ tempFile }.png`);

                await message.channel.send(`${ message.mentions.users.first().username } has been LICKED LOL`, {
                  files: [`${ __dirname }/../../resources/images/${ tempFile }.png`]
                });

                fs.unlink(`${ __dirname }/../../resources/images/${ tempFile }.png`,  () => {});
              });
            });
          });
        });
      });
    });
  }
};
