module.exports = {
    name: 'sondaggio',
    description: 'Questo comando serve a creare dei sondaggi',
    commandOptions: [
        {
            name: "domanda",
            description: "Scrivi la domanda del sondaggio",
            type: 3,
            required: true
        },
        {
            name: "risposta_uno",
            description: "Scrivi una possibile risposta",
            type: 3,
            required: true
        },
        {
            name: "risposta_due",
            description: "Scrivi una possibile risposta",
            type: 3,
            required: true
        },
        {
            name: "risposta_tre",
            description: "Scrivi una possibile risposta",
            type: 3,
            required: false
        },
        {
            name: "risposta_quattro",
            description: "Scrivi una possibile risposta",
            type: 3,
            required: false
        },
        {
            name: "risposta_cinque",
            description: "Scrivi una possibile risposta",
            type: 3,
            required: false
        },
        {
            name: "risposta_sei",
            description: "Scrivi una possibile risposta",
            type: 3,
            required: false
        },
        {
            name: "risposta_sette",
            description: "Scrivi una possibile risposta",
            type: 3,
            required: false
        },
        {
            name: "risposta_otto",
            description: "Scrivi una possibile risposta",
            type: 3,
            required: false
        },
        {
            name: "risposta_nove",
            description: "Scrivi una possibile risposta",
            type: 3,
            required: false
        },
        {
            name: "risposta_dieci",
            description: "Scrivi una possibile risposta",
            type: 3,
            required: false
        },
    ],
    access: [],
    global: false,
    execute(interaction) {
        console.log(interaction)

        let question = interaction.data.options[0]
        console.log(question)






        client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                    content: `:ping_pong: Pong: ${client.ws.ping}ms!`
                }
            }
        })
    },
};