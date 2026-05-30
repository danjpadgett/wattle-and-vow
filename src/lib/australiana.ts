// Australiana content — fun, low-stakes trivia and challenges.
// Three item kinds:
//   - "mcq"      : multiple choice (single correct answer)
//   - "reveal"   : open-ended question; tap to reveal the answer
//   - "challenge": no answer — a silly prompt to do something IRL ("do an
//     impression of a kookaburra"). User marks if they had a go.

export type AustralianaItem =
  | {
      kind: "mcq";
      id: string;
      prompt: string;
      choices: string[];
      correctIndex: number;
      explanation?: string;
    }
  | {
      kind: "reveal";
      id: string;
      prompt: string;
      answer: string;
      note?: string;
    }
  | {
      kind: "challenge";
      id: string;
      prompt: string;
      note?: string;
    };

export type AustralianaCategory = {
  slug: string;
  title: string;
  emoji: string;
  blurb: string;
  items: AustralianaItem[];
};

export const AUSTRALIANA_CATEGORIES: AustralianaCategory[] = [
  {
    slug: "food-and-drink",
    title: "Food & Drink",
    emoji: "🍺",
    blurb: "Schooners, snags and Vegemite. The serious business of Aussie tucker.",
    items: [
      {
        kind: "reveal",
        id: "fd-beer-sizes",
        prompt: "Name the common beer glass sizes used in each state.",
        answer:
          "NSW/ACT: schooner (425ml), middy (285ml). VIC: pot (285ml). QLD: schooner (425ml), pot (285ml). SA: schooner (285ml — yes, smaller!), pint (425ml — yes, smaller!). WA: middy (285ml), pot (285ml). TAS: ten (285ml), pint (570ml). NT: handle (285ml). All states: pint = 570ml.",
        note: "South Australia's glass names are different sizes to everywhere else — a famous trap."
      },
      {
        kind: "mcq",
        id: "fd-schooner-nsw",
        prompt: "In NSW, how many millilitres is a schooner?",
        choices: ["285ml", "375ml", "425ml", "570ml"],
        correctIndex: 2,
        explanation: "A NSW schooner is 425ml. A middy is the smaller 285ml glass."
      },
      {
        kind: "mcq",
        id: "fd-pint",
        prompt: "How many millilitres is a standard Australian pint?",
        choices: ["425ml", "500ml", "570ml", "600ml"],
        correctIndex: 2,
        explanation: "An Aussie pint is 570ml (the imperial pint), except in SA where 'pint' means 425ml."
      },
      {
        kind: "mcq",
        id: "fd-vegemite",
        prompt: "What's the correct way to apply Vegemite to toast?",
        choices: [
          "A thick spoonful, like peanut butter",
          "Butter first, then a thin scrape of Vegemite",
          "Vegemite mixed into the butter on the bench",
          "On its own, no butter, lashings of it"
        ],
        correctIndex: 1,
        explanation: "Butter (or marg) first, then a thin, even scrape. Anything thicker is for tourists."
      },
      {
        kind: "reveal",
        id: "fd-sausage-sizzle",
        prompt: "What goes on a proper Bunnings sausage sizzle?",
        answer:
          "A single slice of white bread (not a hot dog roll), a snag, fried onions on top (Bunnings ruled onions go UNDER the snag in 2018 for safety, but everyone still puts them on top), and a squeeze of tomato sauce. Optional: mustard, BBQ sauce. Never ketchup."
      },
      {
        kind: "mcq",
        id: "fd-lamington",
        prompt: "What is a lamington?",
        choices: [
          "A meat pie with mushy peas",
          "A sponge cube coated in chocolate and coconut",
          "A type of pavlova",
          "A custard tart"
        ],
        correctIndex: 1,
        explanation: "A lamington is a square of sponge cake dipped in chocolate icing and rolled in desiccated coconut. Often filled with cream or jam."
      },
      {
        kind: "challenge",
        id: "fd-order-round",
        prompt: "Order a round of beers using only state-correct glass names for two friends — one in Adelaide, one in Hobart.",
        note: "Bonus points if no one looks confused."
      },
      {
        kind: "mcq",
        id: "fd-bbq-count",
        prompt: "How many BBQs should the average Aussie own?",
        choices: ["None — too dangerous", "One, that's plenty", "Two: a gas one and a Weber", "Four or more (and a portable for the beach)"],
        correctIndex: 3,
        explanation: "Four or more. There's the big gas BBQ on the deck, the Weber kettle for low-and-slow, the portable for the beach/footy/camping, and the rusty backup one out the back. Aussies do not negotiate on BBQ count."
      },
      {
        kind: "mcq",
        id: "fd-tim-tam-slam",
        prompt: "What is a 'Tim Tam Slam'?",
        choices: [
          "Throwing a Tim Tam at someone who annoys you",
          "Biting both ends off a Tim Tam and using it as a straw to suck up hot tea or coffee",
          "A Tim Tam-eating contest at the cricket",
          "Stacking Tim Tams as high as you can"
        ],
        correctIndex: 1,
        explanation: "Bite diagonal corners off, dunk one end in hot tea/coffee/Milo, suck through the biscuit until it collapses in your mouth. Eat fast."
      },
      {
        kind: "mcq",
        id: "fd-flat-white",
        prompt: "Which coffee did Australia (and NZ) invent?",
        choices: ["Cappuccino", "Macchiato", "Flat white", "Long black"],
        correctIndex: 2,
        explanation: "The flat white. Australia and NZ both claim it; either way, it's now on cafe menus from Brooklyn to London."
      },
      {
        kind: "mcq",
        id: "fd-pavlova",
        prompt: "What two ingredients are essential to a pavlova?",
        choices: [
          "Flour and sugar",
          "Egg whites and sugar (for the meringue base)",
          "Cream and gelatin",
          "Butter and condensed milk"
        ],
        correctIndex: 1,
        explanation: "A pav is a meringue base of whipped egg whites and sugar, topped with whipped cream and fresh fruit (always passionfruit and strawberries, usually kiwi too). Also: NZ will fight you over who invented it."
      },
      {
        kind: "reveal",
        id: "fd-milo-method",
        prompt: "What's the correct way to make a glass of Milo?",
        answer:
          "Cold milk in the glass. Add HEAPS of Milo (way more than the tin says). DO NOT stir it all in — the holy grail is a dry, crunchy Milo raft floating on top that you eat with a spoon while drinking. Hot Milo is fine too but only in winter."
      },
      {
        kind: "mcq",
        id: "fd-fairy-bread",
        prompt: "What is fairy bread?",
        choices: [
          "Bread shaped like a fairy",
          "White bread, butter, and 100s & 1000s (rainbow sprinkles), cut into triangles",
          "A type of damper made over a campfire",
          "Sugar-glazed brioche"
        ],
        correctIndex: 1,
        explanation: "White bread, lots of butter, smothered in 100s & 1000s, cut into triangles. Legally mandatory at every kid's birthday party."
      },
      {
        kind: "challenge",
        id: "fd-bbq-debate",
        prompt: "Argue for one minute about whether onions go ON TOP or UNDER the snag on a Bunnings sausage sizzle."
      }
    ]
  },
  {
    slug: "sport",
    title: "Sport",
    emoji: "🏉",
    blurb: "AFL, NRL, cricket, lawn bowls. The national religions.",
    items: [
      {
        kind: "mcq",
        id: "sp-afl-goal",
        prompt: "In AFL, how many points is a goal worth?",
        choices: ["1", "3", "6", "7"],
        correctIndex: 2,
        explanation: "A goal (through the two big middle posts, untouched) is 6 points. A behind (through the smaller outer posts, or touched) is 1 point."
      },
      {
        kind: "mcq",
        id: "sp-afl-start",
        prompt: "How does an AFL game start?",
        choices: [
          "A coin toss followed by a kickoff",
          "The umpire bounces the ball in the centre circle",
          "A ruck tap from the goal square",
          "Each captain kicks from the 50m arc"
        ],
        correctIndex: 1,
        explanation: "The umpire bounces the ball in the centre circle and the two ruckmen leap to tap it to a teammate. If the ground is too wet, the umpire throws it up instead."
      },
      {
        kind: "mcq",
        id: "sp-afl-behind",
        prompt: "How many points is a behind worth in AFL?",
        choices: ["0", "1", "2", "3"],
        correctIndex: 1,
        explanation: "A behind is 1 point. Scores are written as goals.behinds.total — e.g. 12.8.80."
      },
      {
        kind: "reveal",
        id: "sp-lawn-bowls",
        prompt: "What are the basic rules of lawn bowls?",
        answer:
          "Two teams take turns rolling biased bowls down a flat green toward a small white ball (the 'jack'). The bias makes the bowls curve. After all bowls are rolled, the team with the bowl(s) closest to the jack scores — one point for each of their bowls that is closer than the nearest opposition bowl. First to 21 (or 25, depending on format) wins. Wear white. No running."
      },
      {
        kind: "mcq",
        id: "sp-nrl-try",
        prompt: "In NRL (rugby league), how many points is a try worth?",
        choices: ["3", "4", "5", "6"],
        correctIndex: 1,
        explanation: "A try is 4 points. The conversion kick after is 2 points. A penalty goal is 2, a field goal is 1."
      },
      {
        kind: "mcq",
        id: "sp-cricket-overs",
        prompt: "How many balls are in a standard cricket over?",
        choices: ["4", "6", "8", "10"],
        correctIndex: 1,
        explanation: "Six balls per over (since the 1979–80 season — before that, Australia used eight-ball overs)."
      },
      {
        kind: "challenge",
        id: "sp-commentary",
        prompt: "Commentate the next 30 seconds of whatever you're watching as if it were the AFL Grand Final. Bonus marks for 'a bit of biff'."
      },
      {
        kind: "mcq",
        id: "sp-melbourne-cup",
        prompt: "On which day is the Melbourne Cup run?",
        choices: [
          "The first Tuesday in November",
          "The last Saturday in October",
          "Boxing Day",
          "The Queen's Birthday public holiday"
        ],
        correctIndex: 0,
        explanation: "First Tuesday in November — 'the race that stops a nation'. A public holiday in Melbourne."
      },
      {
        kind: "mcq",
        id: "sp-boxing-day-test",
        prompt: "Where is the Boxing Day Test traditionally played?",
        choices: ["The SCG (Sydney)", "The Gabba (Brisbane)", "The MCG (Melbourne)", "Adelaide Oval"],
        correctIndex: 2,
        explanation: "The MCG. Boxing Day cricket at the 'G is a national institution."
      },
      {
        kind: "mcq",
        id: "sp-state-of-origin",
        prompt: "State of Origin is contested between which two states?",
        choices: [
          "NSW and Victoria",
          "Queensland and NSW",
          "Victoria and South Australia",
          "Queensland and Western Australia"
        ],
        correctIndex: 1,
        explanation: "Queensland (Maroons) v NSW (Blues) — rugby league's biggest annual rivalry. Best of three matches."
      },
      {
        kind: "reveal",
        id: "sp-cricket-out",
        prompt: "Name five ways a batter can be out in cricket.",
        answer:
          "Bowled, caught, leg before wicket (LBW), run out, stumped, hit wicket, obstructing the field, handled the ball, hit the ball twice, timed out. There are 10 official ways in total."
      },
      {
        kind: "mcq",
        id: "sp-afl-teams",
        prompt: "How many teams are in the AFL men's competition (2024)?",
        choices: ["14", "16", "18", "20"],
        correctIndex: 2,
        explanation: "18 teams: 10 in Victoria and 8 from other states/territories (or thereabouts — purists will argue about Gold Coast)."
      },
      {
        kind: "mcq",
        id: "sp-bradman-avg",
        prompt: "Donald Bradman's Test batting average is famously:",
        choices: ["49.94", "99.94", "100.00", "104.00"],
        correctIndex: 1,
        explanation: "99.94 — he needed just four runs in his final innings to finish on 100 but was bowled for a duck. The most untouchable record in sport."
      },
      {
        kind: "challenge",
        id: "sp-aussie-aussie",
        prompt: "Lead the room in a full 'Aussie Aussie Aussie, Oi Oi Oi!' call-and-response."
      }
    ]
  },
  {
    slug: "nature",
    title: "Bush & Backyard",
    emoji: "🌳",
    blurb: "Trees, birds, snakes and the weather that wants to kill you.",
    items: [
      {
        kind: "mcq",
        id: "na-pollen-tree",
        prompt: "What tree lines many Australian streets and drops yellow pollen everywhere each spring (a notorious hay-fever trigger)?",
        choices: ["Jacaranda", "Plane tree", "Liquidambar", "Bottlebrush"],
        correctIndex: 1,
        explanation: "The London plane tree (Platanus × acerifolia) — planted everywhere in Sydney and Melbourne. Its tiny pollen and fine hairs from the seed balls drive hay-fever sufferers mad each spring."
      },
      {
        kind: "mcq",
        id: "na-jacaranda",
        prompt: "Which tree turns Australian streets purple every November?",
        choices: ["Wattle", "Jacaranda", "Frangipani", "Flame tree"],
        correctIndex: 1,
        explanation: "Jacarandas bloom in November — famously a sign that uni exams are about to start."
      },
      {
        kind: "challenge",
        id: "na-kookaburra",
        prompt: "Do an impression of a kookaburra.",
        note: "Start with a low chuckle, build to full cackling laughter, finish with a triumphant whoop. Bonus points for waking the neighbours."
      },
      {
        kind: "challenge",
        id: "na-magpie",
        prompt: "Do a magpie warble.",
        note: "It's that bubbling, gurgling carol. Now do it while ducking — it's swooping season."
      },
      {
        kind: "mcq",
        id: "na-deadliest",
        prompt: "Which of these has killed the most Australians in the last 100 years?",
        choices: ["Sharks", "Snakes", "Horses", "Crocodiles"],
        correctIndex: 2,
        explanation: "Horses (and cows). Mundane animals like horses and cows cause far more deaths than the famous nasties — mostly from being thrown or trampled."
      },
      {
        kind: "reveal",
        id: "na-snake-bite",
        prompt: "What's the first-aid for a suspected snake bite in Australia?",
        answer:
          "Don't wash the wound. Apply a pressure-immobilisation bandage firmly over the bite and along the whole limb, splint it, keep the person completely still, and call 000. Do NOT cut, suck, or apply a tourniquet. The hospital uses venom from the bite site to identify the snake."
      },
      {
        kind: "mcq",
        id: "na-national-flower",
        prompt: "What's Australia's national flower?",
        choices: ["Waratah", "Kangaroo paw", "Golden wattle", "Sturt's desert pea"],
        correctIndex: 2,
        explanation: "The golden wattle (Acacia pycnantha). Its colours — green and gold — are the national colours."
      },
      {
        kind: "mcq",
        id: "na-magpie-season",
        prompt: "When is magpie swooping season?",
        choices: [
          "All year round",
          "Spring (roughly September to November)",
          "Summer (December to February)",
          "Winter (June to August)"
        ],
        correctIndex: 1,
        explanation: "Spring. Male magpies defend nests during breeding season. Wear sunnies on the back of your head, zip-tie spikes on your helmet, and avoid eye contact."
      },
      {
        kind: "mcq",
        id: "na-cassowary",
        prompt: "Which Aussie bird is sometimes called 'the world's most dangerous bird'?",
        choices: ["Emu", "Cassowary", "Magpie", "Wedge-tailed eagle"],
        correctIndex: 1,
        explanation: "The cassowary — a 2-metre flightless bird in the Far North Queensland rainforest with a dagger-like inner claw. Don't feed them, don't run, back away slowly."
      },
      {
        kind: "mcq",
        id: "na-platypus",
        prompt: "Which of these is true about the platypus?",
        choices: [
          "Lays eggs AND males have venomous spurs",
          "Is a small kangaroo found only in Tasmania",
          "Is extinct in the wild",
          "Is closely related to the otter"
        ],
        correctIndex: 0,
        explanation: "The platypus is a monotreme (egg-laying mammal). Males have a venomous spur on their hind leg. When first sent to Europe, scientists thought it was a hoax."
      },
      {
        kind: "mcq",
        id: "na-blue-tongue",
        prompt: "If you see a blue-tongue lizard in your garden, you should:",
        choices: [
          "Catch it — they're a pest",
          "Leave it alone — they eat snails and slugs and are harmless",
          "Call the council immediately",
          "Move it to the bush — they don't belong in suburbs"
        ],
        correctIndex: 1,
        explanation: "Leave it be. Blue-tongues are gentle, native, and brilliant at eating snails and slugs. Keep dogs and cats away from them."
      },
      {
        kind: "reveal",
        id: "na-bin-chicken",
        prompt: "What is a 'bin chicken'?",
        answer:
          "The Australian White Ibis. Native to inland wetlands, but droughts pushed huge populations into cities where they thrive on bin scraps. Universally beloved as the unofficial mascot of urban Australia."
      },
      {
        kind: "mcq",
        id: "na-jacaranda-month",
        prompt: "What does a jacaranda blooming in Sydney/Brisbane mean for university students?",
        choices: [
          "Holidays have started",
          "Exams are about to start (or it's too late to study)",
          "Orientation week begins",
          "Graduation day"
        ],
        correctIndex: 1,
        explanation: "Folklore: when the jacarandas bloom (November), it's too late to start studying for exams. A purple carpet of guilt."
      },
      {
        kind: "challenge",
        id: "na-spot-southern-cross",
        prompt: "Next clear night, go outside and find the Southern Cross. Bonus: also point out the two Pointers."
      }
    ]
  },
  {
    slug: "school-and-kids",
    title: "School & Kids",
    emoji: "🎒",
    blurb: "Tuckshops, sunsmart rules, and surviving the playground.",
    items: [
      {
        kind: "reveal",
        id: "sk-four-actions",
        prompt: "What are the 4 things a kid needs to do before they can play at (most Aussie primary) schools?",
        answer:
          "1. Put on a wide-brim/legionnaire/bucket hat (no hat, no play). 2. Sunscreen on. 3. Eat their fruit / recess snack. 4. Drink some water from their drink bottle. Variants exist school-to-school, but the 'no hat, no play' SunSmart rule is universal.",
        note: "Some schools also enforce a shaded play area for hatless kids."
      },
      {
        kind: "mcq",
        id: "sk-no-hat",
        prompt: "What is the SunSmart rule shouted at every Aussie primary school?",
        choices: [
          "No shoes, no play",
          "No hat, no play",
          "No lunch, no play",
          "No friends, no play"
        ],
        correctIndex: 1,
        explanation: "'No hat, no play.' If you forgot your hat, you sat in the shade like a sad little vampire."
      },
      {
        kind: "reveal",
        id: "sk-tuckshop",
        prompt: "Name three things every primary-school canteen / tuckshop has sold.",
        answer:
          "Some combination of: meat pies, sausage rolls, party pies, finger buns, frozen Sunnyboys / Zooper Doopers / Quelch sticks, chocolate milk, dim sims, hot chips, mini pizzas, cheese and bacon rolls, jelly cups."
      },
      {
        kind: "mcq",
        id: "sk-recorder",
        prompt: "Which instrument is every Australian child legally required to learn in Year 3?",
        choices: ["Triangle", "Recorder", "Ukulele", "Harmonica"],
        correctIndex: 1,
        explanation: "The recorder. Hot Cross Buns has never been the same since.",
      },
      {
        kind: "challenge",
        id: "sk-cocky",
        prompt: "Recite the first verse of 'Kookaburra sits in the old gum tree' from memory."
      },
      {
        kind: "mcq",
        id: "sk-zooper-dooper",
        prompt: "What is a Zooper Dooper?",
        choices: [
          "A type of scooter popular in the 90s",
          "A long plastic tube of flavoured ice you freeze and snap in half",
          "A breakfast cereal",
          "A schoolyard chant"
        ],
        correctIndex: 1,
        explanation: "A Zooper Dooper (or 'icy pole' / 'Sunnyboy' depending on era and brand). Frozen sugar water in a plastic tube. Cut the top with scissors, share with a mate by snapping it in half."
      },
      {
        kind: "mcq",
        id: "sk-naplan",
        prompt: "What is NAPLAN?",
        choices: [
          "A government napping program",
          "A standardised national literacy and numeracy test for Years 3, 5, 7 and 9",
          "The school holidays calendar",
          "A type of school excursion"
        ],
        correctIndex: 1,
        explanation: "National Assessment Program – Literacy and Numeracy. Causes stress to students, parents, teachers, and politicians in equal measure."
      },
      {
        kind: "mcq",
        id: "sk-prep-name",
        prompt: "What is the first year of primary school called in most Aussie states (it varies)?",
        choices: [
          "Kindergarten / Prep / Reception / Foundation / Pre-primary — all of these depending on state",
          "First grade everywhere",
          "Year 0 nationally",
          "Preschool"
        ],
        correctIndex: 0,
        explanation: "It's a mess: NSW/ACT = Kindergarten, VIC/QLD = Prep, SA = Reception, WA = Pre-primary, TAS = Prep, NT = Transition. The country cannot agree."
      },
      {
        kind: "reveal",
        id: "sk-canteen-order",
        prompt: "How did the lunch order system work in a typical 90s/00s Aussie primary school?",
        answer:
          "Write your order on a brown paper bag with your name and class. Put coins (or a note) inside the bag, fold it over. Drop it in the class lunch-order box in the morning. Two appointed lunch monitors carried the whole box to the canteen, then back at lunchtime with the orders. Heroes."
      },
      {
        kind: "mcq",
        id: "sk-cracker-night",
        prompt: "What's a 'mufti day' at an Aussie school?",
        choices: [
          "A religious assembly",
          "A day where students wear casual clothes instead of uniform (usually for a gold-coin donation)",
          "The day before the holidays",
          "A swimming carnival"
        ],
        correctIndex: 1,
        explanation: "Mufti day = out-of-uniform day, usually for a gold-coin charity donation. The most exciting day of the term."
      },
      {
        kind: "challenge",
        id: "sk-handball",
        prompt: "Explain the rules of schoolyard four-square handball — including kings, queens, jacks, and dunce."
      }
    ]
  },
  {
    slug: "slang",
    title: "Slang & Sayings",
    emoji: "🗣️",
    blurb: "Strewth, fair dinkum, she'll be right. Decode the lingo.",
    items: [
      {
        kind: "mcq",
        id: "sl-arvo",
        prompt: "What does 'arvo' mean?",
        choices: ["Avocado", "Afternoon", "Arvon (a kind of car)", "A type of beer"],
        correctIndex: 1,
        explanation: "'Arvo' = afternoon. 'See ya this arvo.'"
      },
      {
        kind: "mcq",
        id: "sl-servo",
        prompt: "If your mate says 'pull in at the servo', where are you going?",
        choices: ["The pub", "The petrol station", "The supermarket", "The hardware store"],
        correctIndex: 1,
        explanation: "The servo = service station = petrol station."
      },
      {
        kind: "mcq",
        id: "sl-shellbe-right",
        prompt: "What does 'she'll be right' mean?",
        choices: [
          "A woman is on her way",
          "It'll work out / no worries",
          "Turn right at the next street",
          "She is correct in the argument"
        ],
        correctIndex: 1,
        explanation: "'She'll be right' is the national philosophy: it'll be fine, don't stress."
      },
      {
        kind: "reveal",
        id: "sl-bottle-o",
        prompt: "Translate: 'Chuck a sickie and we'll grab some tinnies from the bottle-o on the way to the servo.'",
        answer:
          "'Take a fake sick day from work and we'll grab some cans of beer from the bottle shop on the way to the petrol station.'"
      },
      {
        kind: "mcq",
        id: "sl-thongs",
        prompt: "In Australia, 'thongs' are:",
        choices: ["Underwear", "Flip-flops / sandals", "A type of car tyre", "Hair ties"],
        correctIndex: 1,
        explanation: "Thongs = flip-flops. The footwear. Calling them anything else marks you as a tourist."
      },
      {
        kind: "challenge",
        id: "sl-yeahnah",
        prompt: "Use 'yeah, nah' and 'nah, yeah' correctly in two different sentences.",
        note: "Hint: 'yeah, nah' politely declines. 'Nah, yeah' politely agrees."      },
      {
        kind: "mcq",
        id: "sl-bickie",
        prompt: "What does it mean if something 'cost a few bickies'?",
        choices: [
          "It was very cheap",
          "It cost a lot of money",
          "It came with a biscuit",
          "It was paid for in instalments"
        ],
        correctIndex: 1,
        explanation: "'Bickies' = big bucks. 'That ute cost a few bickies, mate.'"
      },
      {
        kind: "mcq",
        id: "sl-bogan",
        prompt: "Which of these is most associated with the term 'bogan'?",
        choices: [
          "A flannel shirt, a mullet, and a VB tinnie",
          "A three-piece suit and a briefcase",
          "A surfboard and zinc cream",
          "A wide-brim hat and Akubra boots"
        ],
        correctIndex: 0,
        explanation: "Flanno, mullet, ute, tinnie. The term used to be insulting; now half the country wears it as a badge of honour."
      },
      {
        kind: "mcq",
        id: "sl-dunny",
        prompt: "Where do you go when you 'duck out to the dunny'?",
        choices: ["The shed", "The toilet", "The car", "The pub"],
        correctIndex: 1,
        explanation: "The dunny = the toilet. Bonus term: a 'dunny budgie' is a blowfly."
      },
      {
        kind: "mcq",
        id: "sl-strewth",
        prompt: "'Strewth!' is an exclamation of:",
        choices: ["Greeting", "Surprise or mild shock", "Agreement", "Goodbye"],
        correctIndex: 1,
        explanation: "'Strewth!' = surprise/shock. Originally a contraction of 'God's truth'. See also: 'crikey', 'streuth', 'flamin' heck'."
      },
      {
        kind: "mcq",
        id: "sl-stubby-holder",
        prompt: "What's a 'stubby holder' for?",
        choices: [
          "Holding pencil stubs",
          "Keeping a can or stubby of beer cold in your hand",
          "A car phone holder",
          "Storing fishing tackle"
        ],
        correctIndex: 1,
        explanation: "A neoprene sleeve that keeps your beer cold and stops your hand getting cold. Every Aussie household has at least 30, all from past events."
      },
      {
        kind: "reveal",
        id: "sl-mate-meaning",
        prompt: "How can the single word 'mate' have multiple meanings depending on tone?",
        answer:
          "'Mate!' (rising, warm) = friendly greeting. 'Mate.' (flat, slow) = a warning, you've crossed a line. 'Maaate' (drawn out) = disbelief or disappointment. 'Mate?' (questioning) = are you serious? Same word, completely different conversations."
      },
      {
        kind: "mcq",
        id: "sl-cark-it",
        prompt: "If your old fridge 'carked it', what happened?",
        choices: ["It got dirty", "It broke down / died", "It moved house", "It needs defrosting"],
        correctIndex: 1,
        explanation: "'Cark it' = die / break down completely. 'My laptop carked it halfway through the meeting.'"      }
    ]
  },
  {
    slug: "places-and-icons",
    title: "Places & Icons",
    emoji: "🦘",
    blurb: "Big Things, big rocks, big landmarks.",
    items: [
      {
        kind: "mcq",
        id: "pi-uluru",
        prompt: "What is the Aboriginal name for Ayers Rock?",
        choices: ["Kata Tjuta", "Uluru", "Kakadu", "Arnhem"],
        correctIndex: 1,
        explanation: "Uluru. It's a sacred site for the Anangu people and climbing it has been banned since 2019."
      },
      {
        kind: "mcq",
        id: "pi-big-banana",
        prompt: "Where is the Big Banana?",
        choices: ["Coffs Harbour, NSW", "Cairns, QLD", "Mildura, VIC", "Bunbury, WA"],
        correctIndex: 0,
        explanation: "Coffs Harbour on the NSW north coast. One of the original 'Big Things'."
      },
      {
        kind: "reveal",
        id: "pi-big-things",
        prompt: "Name five of Australia's famous 'Big Things'.",
        answer:
          "There are over 150. Classics include: Big Banana (Coffs Harbour), Big Pineapple (Woombye, QLD), Big Merino (Goulburn), Big Prawn (Ballina), Big Lobster (Kingston SE), Big Pie (Yatala), Big Mango (Bowen), Big Koala (Dadswells Bridge), Big Galah (Kimba), Big Boxing Crocodile (Humpty Doo)."
      },
      {
        kind: "mcq",
        id: "pi-harbour-bridge",
        prompt: "What's the nickname for the Sydney Harbour Bridge?",
        choices: ["The Iron Lady", "The Coathanger", "The Big Arch", "The Bridge of Sighs"],
        correctIndex: 1,
        explanation: "'The Coathanger', thanks to its distinctive single-arch shape."
      },
      {
        kind: "mcq",
        id: "pi-opera-house",
        prompt: "Who designed the Sydney Opera House?",
        choices: [
          "Frank Lloyd Wright",
          "Jørn Utzon",
          "Harry Seidler",
          "Glenn Murcutt"
        ],
        correctIndex: 1,
        explanation: "Danish architect Jørn Utzon. He won a 1957 design competition. The building opened in 1973."
      },
      {
        kind: "mcq",
        id: "pi-twelve-apostles",
        prompt: "Where are the Twelve Apostles?",
        choices: [
          "Off the Great Ocean Road, Victoria",
          "In the Whitsundays, Queensland",
          "Off the coast of Perth, WA",
          "In Kakadu, NT"
        ],
        correctIndex: 0,
        explanation: "Limestone sea stacks along Victoria's Great Ocean Road. There were never actually twelve — and erosion has knocked a few over."
      },
      {
        kind: "mcq",
        id: "pi-mcg-capacity",
        prompt: "Roughly how many people can the Melbourne Cricket Ground (MCG) hold?",
        choices: ["50,000", "75,000", "100,000", "150,000"],
        correctIndex: 2,
        explanation: "The 'G holds about 100,000. The largest sporting stadium in the southern hemisphere."
      },
      {
        kind: "mcq",
        id: "pi-hills-hoist",
        prompt: "What is a Hills Hoist?",
        choices: [
          "A type of country pub",
          "A rotary clothesline (the backyard kind kids spin on)",
          "A brand of ute",
          "A mountain in the Adelaide Hills"
        ],
        correctIndex: 1,
        explanation: "Lance Hill's rotary clothesline (1945) — every backyard had one, and every kid was told off for spinning on it."
      },
      {
        kind: "mcq",
        id: "pi-tasmania-shape",
        prompt: "Tasmania is famously shaped like:",
        choices: ["A boot", "A heart / apple", "A triangle", "A whale"],
        correctIndex: 1,
        explanation: "A roughly heart/apple shape — hence its nickname 'the Apple Isle'."
      },
      {
        kind: "reveal",
        id: "pi-state-capitals",
        prompt: "Name the capital city of each Australian state and territory (8 in total).",
        answer:
          "NSW: Sydney. VIC: Melbourne. QLD: Brisbane. WA: Perth. SA: Adelaide. TAS: Hobart. NT: Darwin. ACT: Canberra (also the national capital)."
      },
      {
        kind: "mcq",
        id: "pi-nullarbor",
        prompt: "What is the Nullarbor?",
        choices: [
          "A famous Sydney beach",
          "A vast, treeless plain crossing southern Australia",
          "A type of bushranger hat",
          "A NT national park"
        ],
        correctIndex: 1,
        explanation: "'Nullarbor' is Latin for 'no trees'. A 200,000+ km² limestone plain across SA and WA. The Eyre Highway across it has the longest straight stretch of road in Australia (146.6 km)."
      }
    ]
  },
  {
    slug: "movies-and-tv",
    title: "Movies & TV",
    emoji: "🎬",
    blurb: "The Castle, Crocodile Dundee, Kath & Kim. Quote-along trivia.",
    items: [
      {
        kind: "mcq",
        id: "mv-mabo",
        prompt: "BONUS QUESTION — In The Castle, when Darryl Kerrigan's lawyer is asked which section of the Constitution his case is based on, what is his answer?",
        choices: [
          "Section 51(xxxi) — the acquisition of property on just terms",
          "The Mabo decision — Aboriginal native title rights from a 1992 High Court ruling",
          "It's the vibe of the thing",
          "The Magna Carta"
        ],
        correctIndex: 2,
        explanation: "'It's the vibe of the thing, Your Honour. It's the Constitution. It's Mabo. It's justice. It's law. It's the vibe.' Dennis Denuto's masterclass in legal argument. (Mabo IS actually the 1992 High Court ruling that recognised native title and overturned terra nullius — but in The Castle, it's just part of the vibe.)"
      },
      {
        kind: "mcq",
        id: "mv-pool-room",
        prompt: "In The Castle, when you receive a really nice gift, what is the correct next step?",
        choices: [
          "Send a thank-you card",
          "Put it in the pool room",
          "Display it on the mantelpiece",
          "Re-gift it next Christmas"
        ],
        correctIndex: 1,
        explanation: "'That's going straight to the pool room.' The Kerrigans don't have a pool, but they do have a pool room — where every prized possession lives. From the hand-made jousting sticks to the chair Steve made."
      },
      {
        kind: "mcq",
        id: "mv-chicken-coops",
        prompt: "According to Darryl Kerrigan, how many chicken coops is too many?",
        choices: ["Two", "Five", "Seven", "There's no such thing — no limit"],
        correctIndex: 3,
        explanation: "There is no upper limit on chicken coops in the Kerrigan worldview. Darryl will always make room for one more — preferably hand-built by Steve."
      },
      {
        kind: "mcq",
        id: "mv-bonnie-doon",
        prompt: "In The Castle, what is the most exclusive holiday destination in Australia?",
        choices: ["Noosa", "Port Douglas", "Bonnie Doon", "Byron Bay"],
        correctIndex: 2,
        explanation: "'How's the serenity?' The Kerrigan family holiday house at Bonnie Doon (a real spot near Lake Eildon, VIC) — complete with powerlines, a tinnie, and the sound of a distant two-stroke."
      },
      {
        kind: "mcq",
        id: "mv-steve",
        prompt: "In The Castle, who is Steve?",
        choices: [
          "The family lawyer",
          "Darryl's son — an 'ideas man'",
          "The next-door neighbour with the greyhounds",
          "Darryl's brother who drives the tow truck"
        ],
        correctIndex: 1,
        explanation: "Steve Kerrigan — Darryl's middle son. An ideas man, always reading the Trading Post, always proudly presenting his latest find or invention. 'Dad, look what I made.'"
      },
      {
        kind: "reveal",
        id: "mv-tell-em-dreamin",
        prompt: "Complete the Darryl Kerrigan quote when someone makes him a lowball offer: 'Tell him he's ____.'",
        answer: "'Tell him he's dreamin'.' Possibly the most-quoted line in Australian cinema history."
      },
      {
        kind: "mcq",
        id: "mv-jousting-sticks",
        prompt: "What does Steve build in The Castle that ends up in the pool room?",
        choices: [
          "A billycart",
          "Jousting sticks",
          "A bird-cage",
          "A model boat"
        ],
        correctIndex: 1,
        explanation: "Steve hand-makes a set of jousting sticks (from the Trading Post). 'They're beautiful, mate.' Straight to the pool room."
      },
      {
        kind: "mcq",
        id: "mv-dundee-knife",
        prompt: "In Crocodile Dundee, what's Mick Dundee's famous line when confronted with a switchblade in New York?",
        choices: [
          "'You call that a knife?'",
          "'That's not a knife. THAT'S a knife.'",
          "'Crikey, that's sharp.'",
          "'I've seen bigger forks.'"
        ],
        correctIndex: 1,
        explanation: "'That's not a knife. THAT'S a knife.' — then pulls out an enormous Bowie knife. The mugger leaves."
      },
      {
        kind: "mcq",
        id: "mv-kath-kim",
        prompt: "In Kath & Kim, what does Kim famously demand to be told she is?",
        choices: [
          "'Effluent'",
          "'A foxy lady'",
          "'Hornbag-of-the-year'",
          "'Cosmopolitan'"
        ],
        correctIndex: 0,
        explanation: "'I want to be effluent, Mum, effluent!' (She means affluent.) Kath: 'You ARE effluent, Kim.'"
      },
      {
        kind: "mcq",
        id: "mv-muriel",
        prompt: "Whose music is Muriel Heslop obsessed with in Muriel's Wedding?",
        choices: ["Kylie Minogue", "ABBA", "INXS", "The Bee Gees"],
        correctIndex: 1,
        explanation: "ABBA. 'You're terrible, Muriel.' The film's soundtrack is wall-to-wall ABBA."
      },
      {
        kind: "challenge",
        id: "mv-darryl-impression",
        prompt: "Do your best Darryl Kerrigan impression. Pick one: 'How's the serenity?', 'Tell him he's dreamin'.', or 'That's going straight to the pool room.'"
      },
      {
        kind: "challenge",
        id: "mv-quote-off",
        prompt: "Quote-off: name three lines from The Castle in 30 seconds."
      }
    ]
  }
];

export function getAustralianaCategory(slug: string): AustralianaCategory | undefined {
  return AUSTRALIANA_CATEGORIES.find((c) => c.slug === slug);
}

export function allAustralianaItems(): AustralianaItem[] {
  return AUSTRALIANA_CATEGORIES.flatMap((c) => c.items);
}

export function shuffleAustralianaItems(n = 10): AustralianaItem[] {
  const all = allAustralianaItems();
  const a = [...all];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, Math.min(n, a.length));
}
