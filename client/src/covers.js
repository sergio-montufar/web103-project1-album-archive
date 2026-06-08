// Maps each album slug to its cover-art image. The images live in
// ./cover_arts and are imported so Vite bundles + fingerprints them.
import luvIsRageTwo from "./cover_arts/luv_is_rage_two.png";
import thriller from "./cover_arts/thriller.png";
import discovery from "./cover_arts/discovery.jpg";
import randomAccessMemories from "./cover_arts/random_access_memories.jpg";
import eternalAtake from "./cover_arts/eternal.jpeg";
import hurryUpTomorrow from "./cover_arts/hurry_up_tomorrow.jpg";
import dieLit from "./cover_arts/die_lit.jpg";
import theJuiceVol2 from "./cover_arts/the_juice_vol2.jpg";
import debiTirarMasFotos from "./cover_arts/debi_tirar.png";
import rodeo from "./cover_arts/rodeo.jpg";
import aLoveLetterToYou4 from "./cover_arts/allty4.png";
import theCollegeDropout from "./cover_arts/college_dropout.jpg";

export const covers = {
  "luv-is-rage-two": luvIsRageTwo,
  thriller: thriller,
  discovery: discovery,
  "random-access-memories": randomAccessMemories,
  "eternal-atake": eternalAtake,
  "hurry-up-tomorrow": hurryUpTomorrow,
  "die-lit": dieLit,
  "the-juice-vol-2": theJuiceVol2,
  "debi-tirar-mas-fotos": debiTirarMasFotos,
  rodeo: rodeo,
  "a-love-letter-to-you-4": aLoveLetterToYou4,
  "the-college-dropout": theCollegeDropout,
};
