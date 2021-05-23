require('dotenv').config()

const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const { Client } = require("discord-slash-commands-client");
const mongo = require('./core/mongo')
const fs = require('fs');


mongo.init().then(async () => {
    /**
     * Client di discord
     * @type {Discord.Client}
     */
    const client = new Discord.Client();
    /**
     * Carico tutti i comandi di presenti in discord
     * @type {Discord.Collection}
     */
    client.commands = new Discord.Collection();
    client._botMessageEmbed = MessageEmbed
    client._botMongo = mongo
    /**
     * Imposto global.client
     * @type {Discord.Client}
     */
    global.client = client
    /**
     * Stampa degli errori di processo
     */
    process.on('unhandledRejection', error => {
        console.log(`UnhandledPromiseRejection : ${error}\n`)
    });
    /**
     * Quando il bot è pronto
     */
    client.on('ready', async () => {
        console.log(`\nLogged in : ${client.user.tag}\n`)
        /**
         * Setto l'attività del bot
         */
        client.user.setActivity(`Slash!`, { type: "PLAYING" })
            .then((presense) => console.log(`Usa il tasto : ${presense.activities[0]}\n`))
            .catch(console.error);

        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

        // Preparo l'app per il caricamento dei comandi
        const getApp = (guildId) => {
            const app = global.client.api.applications(client.user.id)
            if (guildId) {
                app.guilds(guildId)
            }
            return app
        }

        // console.log("Clean Commands")
        // let cmdArrGlobalForClean = await getApp().commands.get()
        // let cmdArrGuildForClean = await getApp(process.env.GUILD_ID).commands.get()
        // cmdArrGlobalForClean.forEach(element => {
        //     getApp().commands(element.id).delete()
        // });
        // cmdArrGuildForClean.forEach(element => {
        //     getApp(process.env.GUILD_ID).commands(element.id).delete(element.id)
        // });

        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);
            /**
             * Questi comandi vengono passati solo per il gruppo
             */
            getApp(process.env.GUILD_ID).commands.post({ data: {
                name: command.name,
                description: command.description,
                options: command.commandOptions
            }})
            /**
             * Questi comandi vengono passati anche globalmente
             * Inteso che non è riferito nessun gruppo
             */
            if (command.global == true) {
                getApp().commands.post({ data: {
                    name: command.name,
                    description: command.description,
                    options: command.commandOptions
                }})
            }
            /**
             * Aggiungo i comandi all'interno della proprietà commands
             */
            client.commands.set(command.name, command);
        }

        /**
         * Carico i comandi nel log
         */
        console.log("Get Commands:")
        let cmdArrGlobal = await getApp().commands.get()
        let cmdArrGuild = await getApp(process.env.GUILD_ID).commands.get()
        cmdArrGlobal.forEach(element => {
            console.log("Global command loaded : " + element.name + " (" + element.id + ")" )
        });
        cmdArrGuild.forEach(element => {
            console.log("Guild command loaded : " + element.name + " (" + element.id + ")")
        });
    });

    /**
     * Ad ogni interazione il sistema verifica la presenza nella proprietà client.commands
     * Esegue il metodo execute è un try per eventualemtne rispondere con il messaggio d'errore
     */
    client.ws.on('INTERACTION_CREATE', async interaction => {
        /**
         * Verifico che il nome esista all'interno della lista
         */
        if (!client.commands.has(interaction.data.name)) return;
        try {
            client.commands.get(interaction.data.name).execute(interaction);
        } catch (error) {
            /**
             * Stampo l'errore all'utente in discord
             */
            console.log(`Error from command ${interaction.data.name} : ${error.message}`);
            console.log(`${error.stack}\n`)
            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                    type: 4,
                    data: {
                        content: `Purtroppo qualcosa non ha funzionato... mi dispiace 🥲`
                    }
                }
            })
        }

    })
    // Avvio il bot
    client.login(process.env.TOKEN_BOT);
})
