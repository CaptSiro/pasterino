import Store from "./Store";
import { CopyPasta } from "../../@types";
import Impulse from "../Impulse";



export default class TestStore implements Store {
    private readonly impulse: Impulse<CopyPasta[]>;



    constructor() {
        this.impulse = new Impulse<CopyPasta[]>({
            pulseOnDuplicate: true
        });
    }



    getAll(): CopyPasta[] {
        return [{
            id: 1,
            tags: ["bubbleman", "accept", "win", "angry"],
            content: "I don’t accept that Bubbleman has won against me. Even if he will win against me, because he never faced me at my best. While I always faced him at his best. That’s not competition. I do not accept that I’ve lost to him, only fools would see it that way"
        }, {
            id: 2,
            tags: ["azer", "isnt", "so", "great", "rafis", "cookiezi"],
            content: "Azer isn't so great? Are you kidding me? When was the last time you saw a player with such aim ability and movement with a tablet? Alex puts the game in another level, and we will be blessed if we ever see a player with his skill and passion for the game again. Cookiezi breaks records. Rafis breaks records. Azer breaks the rules. You can keep your statistics. I prefer the magic."
        }, {
            id: 69,
            tags: ["hitting", "expect", "change", "perception"],
            content: "Okay u are just hitting things i would not expect you to hit idk if today is godmode or if i should change my perception of you"
        }, {
            id: 3,
            tags: ["btmc", "edward", "ling"],
            content: "Edward \"BTMC\" Ling is well known within the rhythm game \"osu!\" as one of it's largest content creators both on YouTube and Twitch. After joining the game in 2013, what started as a casual game to pass the time eventually turned into a competitive grind to become one of the best. BTMC is no stranger to eSports. After reaching the top 100 in 2018, he set his sights towards the osu! World Cup; the largest official tournament within the game."
        }, {
            id: 4,
            tags: ["funorange", "2nd", "place", "rrtyui"],
            content: "Lets be honest here. We all know that FunOrange really got 2nd place. He only missed 1, and thats because of the damn star pattern towards the end; pretty much throws everyone off. Also, he only got 7 100's. If he didnt miss that first one from the star pattern, he would have gotten right up there with rrtyui. He did better than WubWoofWolf, he did better than hvick225, he did better than all of them. But rrtyui would still be at the top. And to be honest, I think FunOrange should be at the top"
        }, {
            id: 5,
            tags: ["brain", "power", "oooooo", "aaaa"],
            content: "O-oooooooooo AAAAE-A-A-I-A-U- JO-oooooooooooo AAE-O-A-A-U-U-A- E-eee-ee-eee AAAAE-A-E-I-E-A-JO-ooo-oo-oo-oo EEEEO-A-AAA-AAA"
        }, {
            id: 6,
            tags: ["vaxei", "hvick", "fastest", "aim", "qayz"],
            content: "I think Vaxei does have the fastest aim in osu!, based on his Airman, Gangsta, and other shit plays, probably beyond hvick, Elysion and other, not sure about rafis with his Immortal flame DT plays though. But Vaxei is NOT EVEN CLOSED as the best consistent high bpm osu player losing to such legends as Adamqs, ceptin and Gayz."
        }, {
            id: 7,
            tags: ["carried", "?", "never", "fieryrage"],
            content: "Carried? Never. fieryrage never gets carried. I would personally like to thank fieryrageosu, for carrying me. Without you this team would've been nothing. On this Thanksgiving Day I will give thanks to fieryrage in the OWC tournament. Thank you."
        }];
    }

    items(): Impulse<CopyPasta[]> {
        this.impulse.pulse(this.getAll());
        return this.impulse;
    }

    add(cp: CopyPasta) {
        const items = this.impulse.value() ?? [];
        items.push(cp);
        this.impulse.pulse(items);
    }

    save(cp: CopyPasta[]): void {}
}