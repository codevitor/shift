"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const discord_js_1 = require("discord.js");
const Redshift = new discord_js_1.Client({
    intents: [discord_js_1.IntentsBitField.Flags.Guilds, discord_js_1.IntentsBitField.Flags.GuildMessageReactions, discord_js_1.IntentsBitField.Flags.GuildMessages],
    partials: [discord_js_1.Partials.Channel, discord_js_1.Partials.Message, discord_js_1.Partials.Reaction]
});
Redshift.on("ready", (e) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Redshift is online");
    setInterval(() => {
        var server = Redshift.guilds.cache.get("940660578437955614");
        let memberCount = server.memberCount;
        Redshift.channels.fetch("1024307009685827614").then((channel) => {
            return channel.setName(`🚀・Membros: ${memberCount}`);
        });
    }, 60000);
    const statusArray = [
        {
            type: 'WATCHING',
            content: `Estamos em desenvolvimento, enquanto isso nos siga no insta! @rocketrp 🥰`,
            status: 'online'
        },
        {
            type: 'PLAYING',
            content: `Este servidor é um privilégio, ninguem tem a obrigação de lhe dar nada, use com respeito.`,
            status: 'online'
        },
        {
            type: 'LISTENING',
            content: `Se inscreva no nosso canal do youtube! [Rocket Roleplay]`,
            status: 'online'
        }
    ];
    function pickStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            const option = Math.floor(Math.random() * statusArray.length);
            Redshift.user.setPresence({
                activities: [
                    {
                        name: statusArray[option].content,
                        url: 'https://rocketmta.com'
                    }
                ],
                status: 'online'
            });
        });
    }
    pickStatus();
    setInterval(pickStatus, 1000 * 60 * 15);
}));
Redshift.on("guildMemberAdd", (member) => __awaiter(void 0, void 0, void 0, function* () {
    var role = member.guild.roles.cache.find((r) => r.id === "1002973868564164628");
    member.roles.add(role);
}));
Redshift.login(process.env.TOKEN);
