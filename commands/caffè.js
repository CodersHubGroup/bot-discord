module.exports = {
    name: 'caffè',
    description: 'Ideala per bere una buona caffè in compagnia o offerto dal bot 👊🏻',
    commandOptions: [
        {
            name: "utente",
            description: "Offri una caffè ad un utente specifico",
            type: 6,
            required: false
        }
    ],
    access: [],
    global: false,
    execute(interaction) {
        // Messaggio standard
        let member_id = interaction.member.user.id;
        let text = `Ciao <@${member_id}>! Eccoti una buona :coffee: 😘 `

        // Verifico se c'è un utente taggato
        let tagged_id;
        if (interaction.data.resolved) {
            tagged_id = Object.values(interaction.data.resolved.users)[0].id
            if (tagged_id === member_id ) {
                text = 'Non puoi offrire un caffè a te stesso 😂'
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
            text = `Ciao <@${tagged_id}>! <@${member_id}> ti ha offerto una buon :coffee: :D `
        }

        client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                    content: text
                }
            }
        })
    },
};