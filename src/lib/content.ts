// Static content for the four citizenship-test chapters: a SparkNotes-style
// reading and a question pool per chapter. Content is grounded in the
// publicly available "Australian Citizenship: Our Common Bond" testable
// section. Expand the question pools over time as you study.

export type Question = {
  id: string;
  prompt: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
};

export type Chapter = {
  slug: "people" | "democracy" | "government" | "values";
  title: string;
  blurb: string;
  // SparkNotes-style reading as an array of sections.
  reading: { heading: string; body: string[] }[];
  questions: Question[];
};

export const CHAPTERS: Chapter[] = [
  {
    slug: "people",
    title: "Australia and its people",
    blurb:
      "The land, the First Peoples, the journey to nationhood, and the symbols that represent modern Australia.",
    reading: [
      {
        heading: "The First Australians",
        body: [
          "Aboriginal and Torres Strait Islander peoples are the First Australians. Their cultures are the oldest continuous living cultures in the world, stretching back at least 65,000 years.",
          "Aboriginal peoples are the original inhabitants of mainland Australia and Tasmania. Torres Strait Islander peoples come from the islands between the tip of Cape York and Papua New Guinea.",
          "Their connection to the land, languages, art, music and Dreaming stories are an important part of Australia's identity."
        ]
      },
      {
        heading: "European settlement and the colonies",
        body: [
          "Captain James Cook claimed the east coast of Australia for Great Britain in 1770.",
          "The First Fleet arrived at Sydney Cove on 26 January 1788, led by Captain Arthur Phillip, who became the first Governor of New South Wales. This date is now commemorated as Australia Day.",
          "Over the next century, six separate British colonies were established: New South Wales, Tasmania, Western Australia, South Australia, Victoria and Queensland."
        ]
      },
      {
        heading: "Federation and modern Australia",
        body: [
          "On 1 January 1901, the six colonies united to form the Commonwealth of Australia. This is called Federation.",
          "Edmund Barton became Australia's first Prime Minister.",
          "Australia is a federation of six states (NSW, VIC, QLD, WA, SA, TAS) and two mainland territories (the Australian Capital Territory and the Northern Territory).",
          "The national capital is Canberra, chosen as a compromise location between Sydney and Melbourne."
        ]
      },
      {
        heading: "Flags, symbols and a national identity",
        body: [
          "The Australian National Flag has three elements: the Union Jack (Australia's British heritage), the Commonwealth Star with seven points (one for each state and one for the territories), and the Southern Cross constellation.",
          "The Australian Aboriginal Flag was designed by Harold Thomas in 1971. Black represents the Aboriginal people, red the earth, and yellow the sun.",
          "The Torres Strait Islander Flag was designed by Bernard Namok in 1992. Green represents the land, blue the sea, black the people, and the white dhari (headdress) and star symbolise the islands.",
          "National colours: green and gold. National flower: golden wattle. National gemstone: opal. National anthem: Advance Australia Fair.",
          "Australia Day is celebrated on 26 January. Anzac Day on 25 April commemorates Australians who have served and died in wars and conflicts."
        ]
      },
      {
        heading: "A multicultural nation",
        body: [
          "Australians come from a wide range of cultural and religious backgrounds. Since 1945, more than 7.5 million people have migrated to Australia.",
          "English is the national language, but many other languages are spoken at home. Multiculturalism is supported as a core part of Australian society."
        ]
      }
    ],
    questions: [
      {
        id: "p-01",
        prompt: "Who are the First Australians?",
        choices: [
          "British settlers who arrived in 1788",
          "Aboriginal and Torres Strait Islander peoples",
          "Dutch explorers in the 17th century",
          "Members of the First Fleet"
        ],
        correctIndex: 1,
        explanation:
          "Aboriginal and Torres Strait Islander peoples are the First Australians and have the oldest continuous living cultures in the world."
      },
      {
        id: "p-02",
        prompt: "When did the First Fleet arrive in Australia?",
        choices: ["26 January 1788", "1 January 1901", "25 April 1915", "26 January 1770"],
        correctIndex: 0,
        explanation:
          "The First Fleet, led by Captain Arthur Phillip, arrived at Sydney Cove on 26 January 1788 — now commemorated as Australia Day."
      },
      {
        id: "p-03",
        prompt: "What event is celebrated on 1 January 1901?",
        choices: [
          "The arrival of the First Fleet",
          "The end of World War I",
          "The Federation of the Australian colonies",
          "The signing of the Australian Constitution by the King"
        ],
        correctIndex: 2,
        explanation:
          "On 1 January 1901, the six British colonies united to form the Commonwealth of Australia. This is known as Federation."
      },
      {
        id: "p-04",
        prompt: "What is the capital city of Australia?",
        choices: ["Sydney", "Melbourne", "Brisbane", "Canberra"],
        correctIndex: 3,
        explanation:
          "Canberra is the national capital. It was chosen as a compromise between Sydney and Melbourne."
      },
      {
        id: "p-05",
        prompt: "How many states are there in Australia?",
        choices: ["Five", "Six", "Seven", "Eight"],
        correctIndex: 1,
        explanation:
          "There are six states: New South Wales, Victoria, Queensland, Western Australia, South Australia and Tasmania."
      },
      {
        id: "p-06",
        prompt: "Which two mainland territories make up part of Australia?",
        choices: [
          "Australian Capital Territory and Northern Territory",
          "Northern Territory and Norfolk Island",
          "Australian Capital Territory and Christmas Island",
          "Jervis Bay Territory and Northern Territory"
        ],
        correctIndex: 0,
        explanation:
          "The Australian Capital Territory (ACT) and the Northern Territory (NT) are the two mainland territories."
      },
      {
        id: "p-07",
        prompt: "What does the Commonwealth Star on the Australian flag represent?",
        choices: [
          "The seven colonies that signed the Constitution",
          "The six states and the territories",
          "The seven founding fathers of Federation",
          "Seven branches of the armed forces"
        ],
        correctIndex: 1,
        explanation:
          "The seven-pointed Commonwealth Star has one point for each of the six states and one for the territories."
      },
      {
        id: "p-08",
        prompt: "Who designed the Australian Aboriginal Flag?",
        choices: ["Bernard Namok", "Harold Thomas", "Arthur Phillip", "Edmund Barton"],
        correctIndex: 1,
        explanation:
          "The Australian Aboriginal Flag was designed by Harold Thomas in 1971."
      },
      {
        id: "p-09",
        prompt: "What do the colours of the Aboriginal Flag represent?",
        choices: [
          "Black — the people, red — the earth, yellow — the sun",
          "Black — night, red — fire, yellow — sand",
          "Black — sorrow, red — blood, yellow — gold",
          "Black — heritage, red — courage, yellow — peace"
        ],
        correctIndex: 0,
        explanation:
          "Black represents the Aboriginal people, red represents the earth and the spiritual relationship with the land, and yellow represents the sun."
      },
      {
        id: "p-10",
        prompt: "What is Australia's national flower?",
        choices: ["Waratah", "Kangaroo paw", "Golden wattle", "Eucalyptus blossom"],
        correctIndex: 2,
        explanation: "The golden wattle is Australia's national floral emblem."
      },
      {
        id: "p-11",
        prompt: "What is the name of Australia's national anthem?",
        choices: [
          "God Save the King",
          "Waltzing Matilda",
          "Advance Australia Fair",
          "I Am Australian"
        ],
        correctIndex: 2,
        explanation: "Australia's national anthem is Advance Australia Fair."
      },
      {
        id: "p-12",
        prompt: "When is Anzac Day commemorated?",
        choices: ["26 January", "25 April", "1 January", "11 November"],
        correctIndex: 1,
        explanation:
          "Anzac Day is 25 April. It commemorates all Australians who have served and died in wars and peacekeeping operations."
      },
      {
        id: "p-13",
        prompt: "What are Australia's national colours?",
        choices: ["Red and white", "Blue and white", "Green and gold", "Black and gold"],
        correctIndex: 2,
        explanation: "Green and gold are Australia's national colours."
      },
      {
        id: "p-14",
        prompt: "Who was Australia's first Prime Minister?",
        choices: ["Robert Menzies", "Edmund Barton", "Arthur Phillip", "Henry Parkes"],
        correctIndex: 1,
        explanation: "Edmund Barton became Australia's first Prime Minister after Federation in 1901."
      },
      {
        id: "p-15",
        prompt: "What is Australia's national language?",
        choices: ["English", "There is no official language", "Mandarin", "French"],
        correctIndex: 0,
        explanation:
          "English is Australia's national language and learning it is an important part of integrating into Australian society."
      }
    ]
  },
  {
    slug: "democracy",
    title: "Australia's democratic beliefs, rights and liberties",
    blurb:
      "How a parliamentary democracy works, the freedoms it protects, and the responsibilities that come with citizenship.",
    reading: [
      {
        heading: "Parliamentary democracy",
        body: [
          "Australia is a parliamentary democracy. The Australian people are the source of authority in our government — they elect representatives to make laws and decisions on their behalf.",
          "Power changes hands peacefully through free and fair elections."
        ]
      },
      {
        heading: "Rule of law",
        body: [
          "In Australia everyone is equal under the law, regardless of their background, wealth, gender, race or religion.",
          "Even members of parliament, judges, the police and the head of state are subject to the law.",
          "Laws apply to everyone equally and must be obeyed."
        ]
      },
      {
        heading: "Fundamental freedoms",
        body: [
          "Freedom of speech and expression: people can speak freely about politics, religion and any other subject within the law.",
          "Freedom of association: people can join any lawful group or organisation, including political parties and trade unions, or choose not to.",
          "Freedom of religion: people can follow any religion, change religion, or follow no religion at all. Government and religion are separate.",
          "Freedom of movement: people can move freely within Australia and travel overseas."
        ]
      },
      {
        heading: "Equality and a fair go",
        body: [
          "Australians believe in equality of opportunity — what is often called a 'fair go'. Your success should depend on your own efforts and hard work, not your background.",
          "Men and women are equal. Discrimination on the basis of sex, age, race, religion or disability is unlawful."
        ]
      },
      {
        heading: "Responsibilities of citizens",
        body: [
          "Australian citizens must obey the laws of Australia, vote in federal and state or territory elections and in referendums, defend Australia should the need arise, and serve on a jury if called to do so.",
          "Citizens should also respect other people, their differences and opinions, and tolerantly accept the right of others to hold different views."
        ]
      }
    ],
    questions: [
      {
        id: "d-01",
        prompt: "What kind of government does Australia have?",
        choices: [
          "Absolute monarchy",
          "Parliamentary democracy",
          "Dictatorship",
          "Direct democracy"
        ],
        correctIndex: 1,
        explanation:
          "Australia is a parliamentary democracy: the people elect representatives to a parliament, which makes laws on their behalf."
      },
      {
        id: "d-02",
        prompt: "In Australia, who is the source of authority for the government?",
        choices: ["The Prime Minister", "The King", "The Australian people", "The High Court"],
        correctIndex: 2,
        explanation:
          "The Australian people are the source of authority. They elect representatives through free and fair elections."
      },
      {
        id: "d-03",
        prompt: "What does the 'rule of law' mean in Australia?",
        choices: [
          "Only judges have to obey the law",
          "Members of parliament are above the law",
          "Everyone is equal under the law and must obey it",
          "The Prime Minister decides what the law means"
        ],
        correctIndex: 2,
        explanation:
          "The rule of law means everyone — including the head of state, ministers and judges — is equal under the law and must obey it."
      },
      {
        id: "d-04",
        prompt: "Which of these is a fundamental freedom in Australia?",
        choices: [
          "Freedom to break the law if you disagree with it",
          "Freedom of speech",
          "Freedom from paying tax",
          "Freedom to vote only when you feel like it"
        ],
        correctIndex: 1,
        explanation:
          "Freedom of speech is a fundamental freedom in Australia. So are freedom of association, religion and movement."
      },
      {
        id: "d-05",
        prompt: "Which of the following is a responsibility of every Australian citizen?",
        choices: [
          "Joining the armed forces",
          "Voting in federal and state or territory elections",
          "Owning property",
          "Belonging to a political party"
        ],
        correctIndex: 1,
        explanation:
          "Voting in federal and state or territory elections and in referendums is a responsibility of every Australian citizen aged 18 or over."
      },
      {
        id: "d-06",
        prompt: "Which of the following is also a responsibility of Australian citizens?",
        choices: [
          "Serving on a jury if called to do so",
          "Reporting all neighbours to police",
          "Joining a religion",
          "Speaking only English at home"
        ],
        correctIndex: 0,
        explanation:
          "Citizens must serve on a jury if called, obey the law, vote, and defend Australia if needed."
      },
      {
        id: "d-07",
        prompt: "Freedom of religion in Australia means:",
        choices: [
          "You must belong to a Christian church",
          "You can follow any religion, change your religion, or follow none",
          "Only religions registered with the government are allowed",
          "Religion may not be discussed in public"
        ],
        correctIndex: 1,
        explanation:
          "Freedom of religion means people can follow any religion they choose, change religions, or have no religion at all. Government and religion are separate."
      },
      {
        id: "d-08",
        prompt: "What does the phrase 'a fair go' refer to?",
        choices: [
          "Compulsory equal incomes for all workers",
          "Equality of opportunity, regardless of background",
          "A free trial period for new citizens",
          "The right to a second chance in any court case"
        ],
        correctIndex: 1,
        explanation:
          "'A fair go' is the belief that everyone should have an equal opportunity to succeed, regardless of their background."
      },
      {
        id: "d-09",
        prompt: "Which of the following statements is true about men and women in Australia?",
        choices: [
          "Men have greater legal rights than women",
          "Women may not own property",
          "Men and women have equal rights",
          "Only men may vote in federal elections"
        ],
        correctIndex: 2,
        explanation:
          "Men and women in Australia have equal rights under the law. Discrimination on the basis of sex is unlawful."
      },
      {
        id: "d-10",
        prompt: "How does power change hands in an Australian government?",
        choices: [
          "Through inheritance",
          "Through peaceful free and fair elections",
          "Through appointment by the King",
          "Through a vote of the High Court"
        ],
        correctIndex: 1,
        explanation:
          "In Australia, power changes hands peacefully through free and fair elections."
      },
      {
        id: "d-11",
        prompt: "Which is NOT a responsibility of Australian citizens?",
        choices: [
          "Obeying Australian laws",
          "Voting in elections",
          "Belonging to a political party",
          "Defending Australia should the need arise"
        ],
        correctIndex: 2,
        explanation:
          "Joining a political party is a right but not a responsibility. Obeying laws, voting and defending Australia are responsibilities."
      },
      {
        id: "d-12",
        prompt: "If you disagree with a law in Australia, what should you do?",
        choices: [
          "Refuse to obey it",
          "Work peacefully within the democratic system to change it",
          "Encourage others to ignore it",
          "Apply to a foreign court for an exemption"
        ],
        correctIndex: 1,
        explanation:
          "You must still obey laws you disagree with, but you can campaign peacefully to change them through the democratic process."
      },
      {
        id: "d-13",
        prompt: "Why is freedom of association important in Australia?",
        choices: [
          "It forces people to join unions",
          "It allows people to join — or not join — any lawful group they choose",
          "It guarantees a paid membership in political parties",
          "It allows secret societies to operate without laws"
        ],
        correctIndex: 1,
        explanation:
          "Freedom of association allows people to join, or refuse to join, any lawful group such as a political party, trade union or club."
      },
      {
        id: "d-14",
        prompt: "Which of the following is protected under freedom of speech in Australia?",
        choices: [
          "Speech that incites violence",
          "Speech that defames others",
          "Peaceful public criticism of the government",
          "Speech that breaks defamation laws"
        ],
        correctIndex: 2,
        explanation:
          "Australians may peacefully criticise the government and speak about politics, religion and other matters, within the law."
      }
    ]
  },
  {
    slug: "government",
    title: "Government and the law in Australia",
    blurb:
      "How parliament, the executive and the courts share power, and how the Constitution shapes the system.",
    reading: [
      {
        heading: "A constitutional monarchy",
        body: [
          "Australia is a constitutional monarchy. The King is Australia's head of state. The King is represented in Australia by the Governor-General at the federal level and by State Governors in each state.",
          "The Constitution of Australia is the set of rules by which Australia is governed. It came into effect on 1 January 1901 and can only be changed by a referendum."
        ]
      },
      {
        heading: "Three levels of government",
        body: [
          "Federal (Commonwealth) government: responsible for matters that affect the whole country, such as taxation, defence, immigration, and foreign affairs.",
          "State and territory governments: responsible for matters such as schools, hospitals, police, public transport and roads within their state or territory.",
          "Local government (councils): responsible for local matters such as rubbish collection, local roads, parks and libraries."
        ]
      },
      {
        heading: "Federal Parliament",
        body: [
          "The Federal Parliament is made up of the King (represented by the Governor-General), the Senate, and the House of Representatives.",
          "The House of Representatives is the lower house. Members are elected from electorates of roughly equal population.",
          "The Senate is the upper house. There are 12 senators from each state and 2 from each mainland territory.",
          "Parliament's job is to make and change federal laws, debate national issues, and represent the people."
        ]
      },
      {
        heading: "Forming a government",
        body: [
          "After a federal election, the political party (or coalition) with the support of the majority in the House of Representatives forms government.",
          "The leader of that party becomes the Prime Minister and is appointed by the Governor-General.",
          "The Prime Minister chooses ministers from members of parliament. Senior ministers form the Cabinet, which makes major government decisions."
        ]
      },
      {
        heading: "Separation of powers",
        body: [
          "Australia separates its powers into three groups: the legislative power (Parliament makes the laws), the executive power (government ministers and public servants put laws into action), and the judicial power (independent courts and judges interpret the laws).",
          "This separation prevents any one person or group from holding all the power."
        ]
      },
      {
        heading: "The courts and the police",
        body: [
          "Judges and magistrates are independent of the parliament and the government.",
          "The High Court of Australia is the highest court. It can decide whether laws are valid under the Constitution.",
          "Police enforce the law and are independent of the government. It is a serious crime to bribe or attempt to bribe a police officer."
        ]
      }
    ],
    questions: [
      {
        id: "g-01",
        prompt: "Who is Australia's head of state?",
        choices: ["The Prime Minister", "The Governor-General", "The King", "The Chief Justice"],
        correctIndex: 2,
        explanation:
          "The King is Australia's head of state. He is represented at the federal level by the Governor-General."
      },
      {
        id: "g-02",
        prompt: "Who represents the King at the federal level in Australia?",
        choices: [
          "The Prime Minister",
          "The Chief Justice of the High Court",
          "The Governor-General",
          "The Speaker of the House"
        ],
        correctIndex: 2,
        explanation:
          "The Governor-General is the King's representative in Australia at the federal level. State Governors represent the King in each state."
      },
      {
        id: "g-03",
        prompt: "What is the Australian Constitution?",
        choices: [
          "A list of suggested rules for parliament",
          "A document written by the Prime Minister each year",
          "The set of rules by which Australia is governed",
          "An agreement between Australia and the United Kingdom"
        ],
        correctIndex: 2,
        explanation:
          "The Australian Constitution is the set of rules by which Australia is governed. It can only be changed by a referendum."
      },
      {
        id: "g-04",
        prompt: "How can the Australian Constitution be changed?",
        choices: [
          "By a decision of the Prime Minister",
          "By a vote of the Cabinet",
          "By a referendum of the Australian people",
          "By a ruling of the High Court"
        ],
        correctIndex: 2,
        explanation:
          "The Constitution can only be changed by a referendum. A double majority is required: a majority of voters nationally AND a majority of voters in a majority of states."
      },
      {
        id: "g-05",
        prompt: "How many levels of government are there in Australia?",
        choices: ["One", "Two", "Three", "Four"],
        correctIndex: 2,
        explanation:
          "Australia has three levels of government: federal, state or territory, and local."
      },
      {
        id: "g-06",
        prompt: "Which level of government is responsible for immigration and defence?",
        choices: ["Local", "State or territory", "Federal", "Council"],
        correctIndex: 2,
        explanation:
          "The federal (Commonwealth) government is responsible for matters that affect the whole country, including immigration and defence."
      },
      {
        id: "g-07",
        prompt: "Which level of government is responsible for rubbish collection and local parks?",
        choices: ["Federal", "State", "Local", "Territory"],
        correctIndex: 2,
        explanation:
          "Local government (councils) handles local matters such as rubbish collection, local roads, parks and libraries."
      },
      {
        id: "g-08",
        prompt: "What are the two houses of Federal Parliament?",
        choices: [
          "The Senate and the House of Representatives",
          "The Cabinet and the Senate",
          "The High Court and the House of Representatives",
          "The Lords and the Commons"
        ],
        correctIndex: 0,
        explanation:
          "Federal Parliament is made up of two houses: the Senate (upper house) and the House of Representatives (lower house)."
      },
      {
        id: "g-09",
        prompt: "Who becomes the Prime Minister of Australia?",
        choices: [
          "The leader of the party with the most senators",
          "The person appointed by the King",
          "The leader of the party or coalition with majority support in the House of Representatives",
          "The person elected directly by the public"
        ],
        correctIndex: 2,
        explanation:
          "The Prime Minister is the leader of the political party (or coalition) with majority support in the House of Representatives, and is appointed by the Governor-General."
      },
      {
        id: "g-10",
        prompt: "What is the role of the Cabinet?",
        choices: [
          "To interpret laws",
          "To enforce laws",
          "To make major government decisions",
          "To elect the Prime Minister"
        ],
        correctIndex: 2,
        explanation:
          "The Cabinet, made up of senior ministers chosen by the Prime Minister, makes major government decisions."
      },
      {
        id: "g-11",
        prompt: "Which body has the role of interpreting the laws of Australia?",
        choices: ["The Parliament", "The Cabinet", "The independent courts", "The police"],
        correctIndex: 2,
        explanation:
          "The judicial power — independent courts and judges — interprets the laws. This is separate from the legislative and executive powers."
      },
      {
        id: "g-12",
        prompt: "What is the highest court in Australia?",
        choices: [
          "The Federal Court",
          "The Supreme Court",
          "The High Court of Australia",
          "The Magistrates Court"
        ],
        correctIndex: 2,
        explanation:
          "The High Court of Australia is the highest court. It can rule on whether laws are valid under the Constitution."
      },
      {
        id: "g-13",
        prompt: "Police in Australia are:",
        choices: [
          "Controlled directly by the Prime Minister",
          "Independent of the government",
          "Branches of the army",
          "Run by local councils"
        ],
        correctIndex: 1,
        explanation:
          "Police in Australia are independent of the government. They enforce the law impartially."
      },
      {
        id: "g-14",
        prompt: "What is it called when the three powers of government — legislative, executive and judicial — are kept separate?",
        choices: [
          "Federation",
          "Separation of powers",
          "Constitutional monarchy",
          "Cabinet government"
        ],
        correctIndex: 1,
        explanation:
          "The separation of powers divides authority between Parliament (legislative), the government (executive) and the courts (judicial) so no one body has all the power."
      },
      {
        id: "g-15",
        prompt: "What is a referendum in Australia?",
        choices: [
          "A national election for the Prime Minister",
          "A vote of Parliament to remove a Governor-General",
          "A vote of the Australian people to change the Constitution",
          "A meeting of state premiers"
        ],
        correctIndex: 2,
        explanation:
          "A referendum is a vote of the Australian people on a proposed change to the Constitution. It needs a double majority to pass."
      }
    ]
  },
  {
    slug: "values",
    title: "Australian values",
    blurb:
      "The shared values — freedom, respect and equality — that Australians commit to and live by.",
    reading: [
      {
        heading: "Why values matter",
        body: [
          "Australian values are based on freedom, respect and equality. Becoming an Australian citizen means accepting and committing to these shared values.",
          "These values are what unites Australians from many different cultural backgrounds into one community."
        ]
      },
      {
        heading: "Freedom",
        body: [
          "Respect for the freedom and dignity of the individual.",
          "Freedom of speech and expression.",
          "Freedom of religion, including the freedom not to follow a religion, and the secular nature of Australian government.",
          "Freedom of association."
        ]
      },
      {
        heading: "Respect",
        body: [
          "Support for parliamentary democracy and the rule of law.",
          "Mutual respect, tolerance and compassion for those in need.",
          "Peaceful means of dispute resolution — violence is never an acceptable way to resolve disagreements.",
          "Respect for differences in others, including their religion, culture and views."
        ]
      },
      {
        heading: "Equality",
        body: [
          "Equality of men and women.",
          "Equality of opportunity for all people, regardless of their race, religion or ethnic background — the idea of the 'fair go'.",
          "English as the national language, as an important unifying element of Australian society."
        ]
      },
      {
        heading: "Unacceptable behaviour",
        body: [
          "Forced or underage marriage, family violence (including violence against women and children), female genital mutilation, and slavery are not accepted in Australia and are against the law.",
          "Discrimination on the grounds of race, religion, sex or other personal characteristics is also unacceptable."
        ]
      }
    ],
    questions: [
      {
        id: "v-01",
        prompt: "Australian values are based on:",
        choices: [
          "Wealth, power and tradition",
          "Freedom, respect and equality",
          "Loyalty to a single political party",
          "Membership of a particular religion"
        ],
        correctIndex: 1,
        explanation:
          "Australian values are based on freedom, respect and equality. Citizens commit to these shared values."
      },
      {
        id: "v-02",
        prompt: "Which of these is an Australian value?",
        choices: [
          "Equality of men and women",
          "Loyalty to one religion",
          "Obedience to a single ruler",
          "The right to use violence to settle arguments"
        ],
        correctIndex: 0,
        explanation:
          "Equality of men and women is a fundamental Australian value."
      },
      {
        id: "v-03",
        prompt: "What does freedom of religion in Australia include?",
        choices: [
          "The right to choose any religion or no religion at all",
          "The right to belong only to a Christian church",
          "The right to force others to follow your religion",
          "The right to break the law in the name of religion"
        ],
        correctIndex: 0,
        explanation:
          "Freedom of religion includes the freedom to follow any religion, change religion, or follow no religion at all. Australian government is secular."
      },
      {
        id: "v-04",
        prompt: "Which of the following is NOT acceptable in Australia?",
        choices: [
          "Family violence and forced marriage",
          "Peaceful protest",
          "Following any religion",
          "Belonging to a trade union"
        ],
        correctIndex: 0,
        explanation:
          "Family violence, forced or underage marriage and female genital mutilation are unacceptable and against the law in Australia."
      },
      {
        id: "v-05",
        prompt: "Which of the following is an Australian value about equality?",
        choices: [
          "Everyone must earn the same income",
          "Equality of opportunity and a 'fair go' for all",
          "Equality only for people born in Australia",
          "Equality only for citizens of working age"
        ],
        correctIndex: 1,
        explanation:
          "Australians believe in equality of opportunity — that everyone should have a 'fair go' to succeed, regardless of their background."
      },
      {
        id: "v-06",
        prompt: "What is the role of English as a value in Australia?",
        choices: [
          "It is the only language allowed in Australia",
          "It is the national language and an important unifying element",
          "It must be the only language spoken at home",
          "It is required by law for religious worship"
        ],
        correctIndex: 1,
        explanation:
          "English is the national language and is recognised as an important unifying element of Australian society."
      },
      {
        id: "v-07",
        prompt: "Australians believe disputes should be resolved by:",
        choices: ["Violence", "Peaceful means", "Bribery", "Force of the strongest"],
        correctIndex: 1,
        explanation:
          "Australians believe disputes should be settled by peaceful means, never by violence."
      },
      {
        id: "v-08",
        prompt: "Which of these is an Australian value?",
        choices: [
          "Mutual respect, tolerance and compassion for those in need",
          "Strict obedience to one cultural tradition",
          "Loyalty to a single political party",
          "Distrust of people from other backgrounds"
        ],
        correctIndex: 0,
        explanation:
          "Mutual respect, tolerance and compassion for those in need are core Australian values."
      },
      {
        id: "v-09",
        prompt: "Which Australian value relates to the way the country is governed?",
        choices: [
          "Support for parliamentary democracy and the rule of law",
          "Support for one-party rule",
          "Support for rule by the wealthiest citizens",
          "Support for a religious court system"
        ],
        correctIndex: 0,
        explanation:
          "Support for parliamentary democracy and the rule of law is a core Australian value."
      },
      {
        id: "v-10",
        prompt: "Australia's government is best described as:",
        choices: ["Religious", "Secular", "Military", "Hereditary"],
        correctIndex: 1,
        explanation:
          "Australia has a secular government — government and religion are separate. People are free to follow any religion or none."
      },
      {
        id: "v-11",
        prompt: "Which of these reflects the Australian value of respect?",
        choices: [
          "Treating others fairly regardless of background, religion or culture",
          "Only respecting people who share your views",
          "Respecting only people from your own country",
          "Respecting only people of the same religion"
        ],
        correctIndex: 0,
        explanation:
          "Respect in Australia means treating others fairly and with dignity, regardless of their background, religion or culture."
      },
      {
        id: "v-12",
        prompt: "By becoming an Australian citizen, you commit to:",
        choices: [
          "Australian values and obeying Australian laws",
          "Renouncing all your previous traditions",
          "Joining a political party",
          "Following a single religion"
        ],
        correctIndex: 0,
        explanation:
          "Becoming an Australian citizen is a commitment to Australia, its values, and obedience to its laws."
      }
    ]
  }
];

export function getChapter(slug: string): Chapter | undefined {
  return CHAPTERS.find((c) => c.slug === slug);
}

export function allQuestions(): { question: Question; chapterSlug: Chapter["slug"] }[] {
  return CHAPTERS.flatMap((c) =>
    c.questions.map((q) => ({ question: q, chapterSlug: c.slug }))
  );
}
