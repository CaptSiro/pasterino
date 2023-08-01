import Platform from "./Platform";
import TestEnvPlatform from "./test-env/TestEnvPlatform";
import TwitchPlatform from "./twitch.tv/TwitchPlatform";



export default function getPlatform(): Platform {
    if (document.title.includes("Test-env")) {
        return new TestEnvPlatform();
    }

    return new TwitchPlatform();
}