module.exports = {
    name: 'opla',
    description: 'Per leggere una **perla** random del buon Fabio 👊🏻',
    commandOptions: [],
    access: [],
    global: false,
    getQuote() {
        const quotes = [
            'Vue sì o no? Per me è la **cipolla**',
            'Bene, si è fatto tardi, tra poco chiudiamo questa live su Twitch -> la live finisce due ore dopo',
            'Usare un approccio idiomatico, ovvero non fare le cose alla ca**o',
            '(In live, reactive forms e meteo API) Bene, ora a _Milano_ tolgo _lano_...',
            '_XXX_ è una persona seria. Mica come me :smile:',
            'Alla live di oggi sarò con _XXX_, che mi insulterà',
            'Ok e dopo queste mie affermazioni penso che molti di voi abbandoneranno la community o mi odieranno a vita',
            'mi hanno detto a volte che sono "la Ferragni del web"',
        ]

        const quoteIndex = Math.floor(Math.random() * quotes.length)
        return quotes[quoteIndex]
    },
    execute(interaction) {
        const quote = this.getQuote()
        const embed = new client._botMessageEmbed()
            .setTitle('Fabio Biondi ha detto: ')
            .setColor('RANDOM')
            .setDescription('' + quote + '')
        client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                    embeds: [embed],
                }
            }
        })
    },
};