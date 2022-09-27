import "dotenv/config";
import { Client, IntentsBitField, Partials, VoiceChannel } from "discord.js";
import express from "express";
import { prisma } from "database/client";
import { short } from "prisma"
const app = express();

app.use(express.json())

const Redshift: Client = new Client({
  intents: [ IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessageReactions, IntentsBitField.Flags.GuildMessages ],
  partials: [Partials.Channel, Partials.Message, Partials.Reaction]
});

Redshift.on("ready", async (e) => {
  console.log("Redshift is online")
  
  setInterval(() => {
    var server = Redshift.guilds.cache.get("940660578437955614");
    let memberCount = server.memberCount;
    Redshift.channels.fetch("1024307009685827614").then((channel: VoiceChannel) => {
      return channel.setName(`🚀・Membros: ${memberCount}`)
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

  async function pickStatus () {
    const option = Math.floor(Math.random() * statusArray.length);


    Redshift.user.setPresence({
      activities: [
        {
          name: statusArray[option].content,
          url: 'https://rocketmta.com'
        }
      ],
      status: 'online'
    })
  }

  pickStatus()
  setInterval(pickStatus, 1000*60*15);
});


Redshift.on("guildMemberAdd", async (member) => {
  var role = member.guild.roles.cache.find(
      (r) => r.id === "1002973868564164628"
  );

  member.roles.add(role);
});



app.get("/", (req, res) => {
  return res.json("Made with ❤️ by Rocket Community");
});


app.get("/:urlId", async (req, res) => {
  const find = await prisma.shorts.findUnique({
    where: {
      short: req.params.urlId
    }
  }) as short

  if (!find) {
    return res.json("Short url is not found")
  }
  

  return res.redirect(find.origin);
})


app.post("/create-short", async (req, res) => {
  try {
    await prisma.shorts.create({
      data: {
        origin: req.body.origin,
        short: req.body.short
      }
    });

    return res.json("short created")
  } catch (error) {
    console.log(error)
    return  res.json(error)
  }
});


app.listen(80, async () => {
  console.log("Server listening");
  Redshift.login(process.env.TOKEN);
})