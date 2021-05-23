module.exports = {
    name: 'sondaggio',
    description: 'Ideala per bere una buona birra in compagnia o offerto dal bot 👊🏻',
    commandOptions: [
        {
            name: "utente",
            description: "Offri una birra ad un utente specifico",
            type: 6,
            required: false
        }
    ],
    access: [],
    global: false,
    execute(interaction) {
        // Messaggio standard
        let member_id = interaction.member.user.id;
        let text = `Ciao <@${member_id}>! Eccoti una buona :beer: 😘 `

        // Verifico se c'è un utente taggato
        let tagged_id;
        if (interaction.data.resolved) {
            tagged_id = Object.values(interaction.data.resolved.users)[0].id
            if (tagged_id === member_id ) {
                text = 'Non puoi fare un brindisi con te stesso 😂'
                client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                        type: 4,
                        data: {
                            content: text
                        }
                    }
                })
                return
                // Esco per messaggio di errore
            }
        }

        // Modifico il messaggio se è presente un utente
        if (tagged_id){
            text = `Ciao <@${tagged_id}>! <@${member_id}> ti ha offerto una birra :beer: :D `
        }

        // Aggiungo embed Gif 👊🏻
        const Discord = require('discord.js');
        let embed = new Discord.MessageEmbed();
        embed.setImage('https://media1.tenor.com/images/efecb7be9018b9cd11a5866c548a42ca/tenor.gif')

        client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                    content: text,
                    embeds: [embed],
                }
            }
        })
    },
};