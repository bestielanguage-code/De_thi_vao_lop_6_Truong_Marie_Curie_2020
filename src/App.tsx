import React, { useState, useEffect, useRef } from "react";
import {
  ShoppingBag,
  Refrigerator,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Home,
  Coins,
  RotateCcw,
  Maximize2,
  BookOpen,
  Lock,
  Unlock,
} from "lucide-react";

// Reading text constant
const READING_PASSAGE = `How Nam has improved his English.
In the first year of lower secondary school, I had some difficulties in learning English. My English pronunciation was really bad and my English grammar was worse.
I did not know how to improve them. I didn't want my father and mother to know about this. One afternoon after the lesson, my teacher of English told me to wait for her outside the classroom. She took me to the school library and showed me tapes of pronunciation drills kept in a glass bookcase. She also told me how to use an English-English dictionary to improve my English grammar. "Now I think you know what you should do" she said. I made much progress and only one year later, I won the first prize in the English Speaking Contest held for secondary school students in my hometown.`;

const QUESTIONS_DATA = [
  // 1-5: Stress
  {
    id: 1,
    q: "Choose the word whose main-stressed syllable is different: comprise, depend, design, novel",
    options: ["comprise", "depend", "design", "novel"],
    correct: 3,
  },
  {
    id: 2,
    q: "Choose the word whose main-stressed syllable is different: tropical, collection, tendency, charity",
    options: ["tropical", "collection", "tendency", "charity"],
    correct: 1,
  },
  {
    id: 3,
    q: "Choose the word whose main-stressed syllable is different: friendliness, occasion, pagoda, deposit",
    options: ["friendliness", "occasion", "pagoda", "deposit"],
    correct: 0,
  },
  {
    id: 4,
    q: "Choose the word whose main-stressed syllable is different: importing, specific, impolite, important",
    options: ["importing", "specific", "impolite", "important"],
    correct: 2,
  },
  {
    id: 5,
    q: "Choose the word whose main-stressed syllable is different: federation, unpolluted, disappearing, profitable",
    options: ["federation", "unpolluted", "disappearing", "profitable"],
    correct: 3,
  },

  // 6-10: Pronunciation with Underlining
  {
    id: 6,
    q: "Choose the word whose underlined part is different in pronunciation:",
    options: [
      "t<u>o</u>urist",
      "delici<u>o</u>us",
      "anxi<u>o</u>us",
      "fam<u>o</u>us",
    ],
    correct: 0,
  },
  {
    id: 7,
    q: "Choose the word whose underlined part is different in pronunciation:",
    options: [
      "<u>u</u>niversity",
      "<u>u</u>nit",
      "disc<u>u</u>ss",
      "comp<u>u</u>ter",
    ],
    correct: 2,
  },
  {
    id: 8,
    q: "Choose the word whose underlined part is different in pronunciation:",
    options: ["f<u>a</u>t", "festiv<u>a</u>l", "gr<u>a</u>nd", "m<u>a</u>n"],
    correct: 1,
  },
  {
    id: 9,
    q: "Choose the word whose underlined part is different in pronunciation:",
    options: [
      "r<u>u</u>b",
      "s<u>u</u>rrounding",
      "pl<u>u</u>mber",
      "h<u>u</u>sk",
    ],
    correct: 1,
  },
  {
    id: 10,
    q: "Choose the word whose underlined part is different in pronunciation:",
    options: [
      "help<u>ed</u>",
      "work<u>ed</u>",
      "ask<u>ed</u>",
      "clean<u>ed</u>",
    ],
    correct: 3,
  },

  // 11-21: Sentence Reordering (Adjusted to match PDF numbering flow)
  {
    id: 11,
    q: "Reorder: between/is/it/ the/ stadium/ the/ supermarket/and",
    options: [
      "it is the between stadium and the supermarket.",
      "it is between the stadium and the supermarket.",
      "is it between the stadium and the supermarket",
      "it is the stadium between and the supermarket.",
    ],
    correct: 1,
  },
  {
    id: 12,
    q: "Reorder: at/cinema/is/ the/ end/ of/ street/the",
    options: [
      "the cinema is of the end at the street.",
      "the cinema is at the end of the street.",
      "at the cinema is the end of the street.",
      "the end of the street is at the cinema.",
    ],
    correct: 1,
  },
  {
    id: 13,
    q: "Reorder: folk tales/ I/ because/love/ each of them/ me/gives/ in life./ a lesson",
    options: [
      "because I love folk tales each of them gives me a lesson in life.",
      "I love each of them because folk tales gives me a lesson in life.",
      "I love folk tales because each of them gives me a lesson in life.",
      "I love a lesson each of them gives me because folk tales in life.",
    ],
    correct: 2,
  },
  {
    id: 14,
    q: "Reorder: How long / to / it / take/ you / get / to school /?/ does /",
    options: [
      "How long does it to take you get to school?",
      "How long does you take to get to it school?",
      "How long it does take you to get to school?",
      "How long does it take you to get to school?",
    ],
    correct: 3,
  },
  {
    id: 15,
    q: "Reorder: Marie Curie / in / born / Poland / 1867/ was / in/.",
    options: [
      "Marie Curie born in Poland was in 1867.",
      "Marie Curie was born in Poland in 1867.",
      "Marie Curie born was in Poland in 1867.",
      "Marie Curie was inborn Poland in 1867.",
    ],
    correct: 1,
  },
  {
    id: 16,
    q: "Reorder: We ought / use/ cloth bags/ instead / reusing / of / plastic bags. / to /",
    options: [
      "We ought use to cloth bags instead reusing of plastic bags.",
      "We ought to use cloth bags instead of reusing plastic bags.",
      "We ought to reusing cloth bags instead of use plastic bags.",
      "We ought to cloth bags instead use of reusing plastic bags.",
    ],
    correct: 1,
  },
  {
    id: 17,
    q: "Reorder: He / interested / buying /new/house/ isn't / a / in /.",
    options: [
      "He isn't interested in buying a new house.",
      "He isn't buying in a new interested house.",
      "Isn't he interested in buying a new house.",
      "He isn't interested buying in a new house.",
    ],
    correct: 0,
  },
  {
    id: 18,
    q: "Reorder: I / playing badminton / Nam / when / my friends / came / with / was / .",
    options: [
      "I came with Nam when my friends was playing badminton.",
      "I playing badminton with Nam when my friends was came.",
      "I was playing badminton when Nam with my friends came.",
      "I was playing badminton with Nam when my friends came.",
    ],
    correct: 3,
  },
  {
    id: 19,
    q: "Reorder: We / having / wonderful/ time / a / moment / the / at / SaPa. / are/ in",
    options: [
      "We are having a time wonderful at the moment in Sapa.",
      "We are having time a wonderful in the moment at Sapa.",
      "We are having a wonderful time in the moment at Sapa.",
      "We are having a wonderful time at the moment in Sapa.",
    ],
    correct: 3,
  },
  {
    id: 20,
    q: "Reorder: Could / give / me / information / ? / you / some",
    options: [
      "Could you give me some information?",
      "Could me give you some information?",
      "You could give me some information?",
      "Could you give some information me?",
    ],
    correct: 0,
  },
  {
    id: 21,
    q: "Reorder: I / bored / doing / with / same thing / the / day after day / am /",
    options: [
      "I bored with doing the same thing are day after day.",
      "I am bored doing with the same thing day after day.",
      "I am bored with doing the same thing day after day.",
      "I am bored with the same thing day after day doing.",
    ],
    correct: 2,
  },

  // 22-55: Grammar & Vocab

  {
    id: 22,
    q: "She _______ doing aerobics now.",
    options: ["are", "does", "is", "has"],
    correct: 2,
  },
  {
    id: 23,
    q: 'Lan: "_______ are you doing, Mai?" – Mai: "I\'m reading books."',
    options: ["What", "Who", "Where", "When"],
    correct: 0,
  },
  {
    id: 24,
    q: "We _______ in our present house for 5 years.",
    options: ["live", "have lived", "are living", "lived"],
    correct: 1,
  },
  {
    id: 25,
    q: "She went to market without _______ anything.",
    options: ["buy", "to buy", "bought", "buying"],
    correct: 3,
  },
  {
    id: 26,
    q: "Since we have to be there by 8.30, we _______ take a taxi.",
    options: ["had better", "may", "ought", "are able to"],
    correct: 0,
  },
  {
    id: 27,
    q: "I've never seen such an interesting _______.",
    options: ["performing", "performer", "performance", "performed"],
    correct: 2,
  },
  {
    id: 28,
    q: "The new shopping mall is quite _______ the present shopping area.",
    options: ["different from", "the same", "to", "similar"],
    correct: 0,
  },
  {
    id: 29,
    q: "Are you proud _______ your country and its tradition?",
    options: ["about", "on", "of", "for"],
    correct: 2,
  },
  {
    id: 30,
    q: "Do you collect stamps or other things? - Yes, I am a stamp _______.",
    options: ["collecting", "collector", "collect", "collection"],
    correct: 1,
  },
  {
    id: 31,
    q: "Your mother is beautiful. She has _______.",
    options: [
      "long straight black hair",
      "straight long black hair",
      "black long straight hair",
      "hair long straight black",
    ],
    correct: 0,
  },
  {
    id: 32,
    q: "The singers were at the microphone at the time of the broadcast.",
    options: [
      "It was a successful broadcast",
      "It was an education broadcast",
      "It was a charity broadcast",
      "It was a live broadcast",
    ],
    correct: 3,
  },
  {
    id: 33,
    q: "_______ Sir? - Fruit salad, please.",
    options: [
      "What would you like for dessert",
      "What dessert you would like",
      "How would you like for dessert",
      "How dessert would like",
    ],
    correct: 0,
  },
  {
    id: 34,
    q: "Wait a minute. I want to _______ a picture of you and the baby.",
    options: ["take", "give", "make", "do"],
    correct: 0,
  },
  {
    id: 35,
    q: "Airmail is much _______ than surface mail.",
    options: [
      "expensive",
      "very expensive",
      "more expensive",
      "most expensive",
    ],
    correct: 2,
  },
  {
    id: 36,
    q: "No one can make me _______ my mind.",
    options: ["change", "changing", "to change", "changed"],
    correct: 0,
  },
  {
    id: 37,
    q: "What are you cooking in that saucepan? It _______ good.",
    options: ["makes", "feels", "smells", "tastes"],
    correct: 2,
  },
  {
    id: 38,
    q: "This is my book and _______.",
    options: [
      "that are yours",
      "those are your",
      "that are your",
      "those are yours",
    ],
    correct: 3,
  },
  {
    id: 39,
    q: "Lan's got dark hair, but _______ is fair.",
    options: [
      "his brother's hair",
      "his brother hairs",
      "his brother hair",
      "his brother hair's",
    ],
    correct: 0,
  },
  {
    id: 40,
    q: "What's your birthday, Ann? - It's _______.",
    options: [
      "on the thirty-one of July",
      "on the thirty-first of July",
      "on July the thirty-one",
      "in July the thirty-first",
    ],
    correct: 1,
  },
  {
    id: 41,
    q: "Tommy is a better swimmer than Tony.",
    options: [
      "No one can swim as well as Tommy and Tony.",
      "Tommy is the best swimmer of all, apart from Tony.",
      "Tony can't swim so well as Tommy.",
      "Tony can't be better than Tommy.",
    ],
    correct: 2,
  },
  {
    id: 42,
    q: "Christine finds it easy to make friends.",
    options: [
      "It is easy to make friends to Christine",
      "Christine has no difficulty making friends.",
      "Christine has a lot of friends.",
      "Christine is fond of making friends.",
    ],
    correct: 1,
  },
  {
    id: 43,
    q: "She started learning English 3 years ago.",
    options: [
      "She started learning English 3 years.",
      "She has learnt English for 3 years.",
      "She started learning English since 3 years.",
      "She learnt English since 3 years.",
    ],
    correct: 1,
  },
  {
    id: 44,
    q: "Walking a mile a day is good exercise.",
    options: [
      "It is good exercise for walking a mile a day.",
      "It is good exercise walking a mile a day.",
      "It is good exercise to walk a mile a day.",
      "It is good exercise to walking a mile a day.",
    ],
    correct: 2,
  },
  {
    id: 45,
    q: "Helen is my aunt's daughter so she is my _______.",
    options: ["sister", "cousin", "niece", "friend"],
    correct: 1,
  },
  {
    id: 46,
    q: "His _______ always makes us laugh.",
    options: ["quiet character", "sense of humor", "smiles", "humorous"],
    correct: 1,
  },
  {
    id: 47,
    q: "The window _______ last night has been repaired.",
    options: ["break", "breaked", "broken", "breaking"],
    correct: 2,
  },
  {
    id: 48,
    q: "This is a contest in which you have to arrange flowers so it's a _______ contest.",
    options: [
      "flower-arranging",
      "flowers-arranging",
      "arranging-flower",
      "flower-arrange",
    ],
    correct: 0,
  },
  {
    id: 49,
    q: "Children who don't have parents often live in a(n) _______.",
    options: ["hotel", "house", "orphanage", "hostel"],
    correct: 2,
  },
  {
    id: 50,
    q: "It took him ages to _______ living in the new town.",
    options: ["get use to", "be used to", "will used to", "will use to"],
    correct: 1,
  },
  {
    id: 51,
    q: "_______ is a large piece of furniture where you can hang your clothes.",
    options: ["Wardrobe", "Refrigerator", "Desk", "Counter"],
    correct: 0,
  },
  {
    id: 52,
    q: "I would rather you _______ me the story.",
    options: ["tell", "told", "to tell", "telling"],
    correct: 1,
  },
  {
    id: 53,
    q: "'War and Peace' _______ the longest book I have ever read.",
    options: ["are", "was", "were", "is"],
    correct: 3,
  },
  {
    id: 54,
    q: "As she was running, suddenly she stumbled _______ a rock and fell _______.",
    options: ["at/off", "in/out", "over/down", "of/down"],
    correct: 2,
  },
  {
    id: 55,
    q: "That's a _______ building.",
    options: ["five-floor", "five-floors", "five-floor's", "five-floors'"],
    correct: 0,
  },

  // 56-60: Reading
  {
    id: 56,
    q: "Reading: What difficulties did Nam have in learning English in the first year?",
    options: [
      "The pronunciation",
      "The grammar",
      "Both pronunciation and grammar",
      "The way of improving his pronunciation",
    ],
    correct: 2,
    isReading: true,
  },
  {
    id: 57,
    q: "Reading: Who wanted to meet him one afternoon after the lesson?",
    options: ["His teacher", "One of his friends", "His father", "His mother"],
    correct: 0,
    isReading: true,
  },
  {
    id: 58,
    q: "Reading: Where did Nam and his teacher go after that?",
    options: [
      "to the town library",
      "to the school library",
      "to the teachers' room",
      "to his house",
    ],
    correct: 1,
    isReading: true,
  },
  {
    id: 59,
    q: "Reading: What did the teacher show him then?",
    options: [
      "A glass bookcase",
      "An English-English dictionary",
      "An English Grammar book",
      "Cassettes of pronunciation drills",
    ],
    correct: 3,
    isReading: true,
  },
  {
    id: 60,
    q: "Reading: What did he win in the English Speaking Contest one year later?",
    options: [
      "The first prize",
      "The second prize",
      "The third prize",
      "The fourth prize",
    ],
    correct: 0,
    isReading: true,
  },
];

const SHOP_ITEMS = [
  {
    id: "milk",
    name: "Dâu Tây Milk",
    price: 20,
    emoji: "🍓🥛",
    color: "bg-pink-100",
  },
  {
    id: "cake",
    name: "Bánh Kem",
    price: 30,
    emoji: "🍰",
    color: "bg-yellow-50",
  },
  {
    id: "soda",
    name: "Soda Xanh",
    price: 15,
    emoji: "🥤",
    color: "bg-blue-100",
  },
  {
    id: "egg",
    name: "Trứng Vàng",
    price: 10,
    emoji: "🥚",
    color: "bg-orange-50",
  },
  {
    id: "melon",
    name: "Dưa Lưới",
    price: 40,
    emoji: "🍈",
    color: "bg-green-100",
  },
  {
    id: "sushi",
    name: "Sushi Cá Hồi",
    price: 50,
    emoji: "🍣",
    color: "bg-red-50",
  },
  {
    id: "pizza",
    name: "Pizza Phô Mai",
    price: 35,
    emoji: "🍕",
    color: "bg-yellow-100",
  },
  {
    id: "grapes",
    name: "Nho Mẫu Đơn",
    price: 45,
    emoji: "🍇",
    color: "bg-purple-100",
  },
  { id: "ramen", name: "Mì Cay", price: 25, emoji: "🍜", color: "bg-red-100" },
  {
    id: "line",
    name: "Kệ tủ lạnh",
    price: 50,
    emoji: "•",
    color: "bg-red-100",
  },
];

const App = () => {
  const [view, setView] = useState("start");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [wallet, setWallet] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [draggingItem, setDraggingItem] = useState(null);
  const [resizingItem, setResizingItem] = useState(null);
  const [isFridgeOpen, setIsFridgeOpen] = useState(false);

  const fridgeRef = useRef(null);

  const handleAnswer = (choiceIndex) => {
    if (answers[currentIndex] !== undefined) return;
    const isCorrect = choiceIndex === QUESTIONS_DATA[currentIndex].correct;
    if (isCorrect) setWallet((prev) => prev + 10);
    setAnswers((prev) => ({ ...prev, [currentIndex]: choiceIndex }));
  };

  const nextQuestion = () => {
    if (currentIndex < QUESTIONS_DATA.length - 1)
      setCurrentIndex((prev) => prev + 1);
    else setView("result");
  };

  const prevQuestion = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const buyItem = (item) => {
    if (wallet >= item.price) {
      setWallet((prev) => prev - item.price);
      setInventory((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: item.id,
          emoji: item.emoji,
          color: item.color,
          name: item.name,
          x: 100 + Math.random() * 200,
          y: 100 + Math.random() * 300,
          w: 60,
          h: 60,
        },
      ]);
    }
  };

  const handleMouseDown = (e, item, action) => {
    e.stopPropagation();
    if (action === "drag") {
      setDraggingItem({
        id: item.id,
        offsetX: e.clientX - item.x,
        offsetY: e.clientY - item.y,
      });
    } else if (action === "resize") {
      setResizingItem({
        id: item.id,
        initialW: item.w,
        initialH: item.h,
        startX: e.clientX,
        startY: e.clientY,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (draggingItem) {
      setInventory((prev) =>
        prev.map((item) =>
          item.id === draggingItem.id
            ? {
                ...item,
                x: e.clientX - draggingItem.offsetX,
                y: e.clientY - draggingItem.offsetY,
              }
            : item
        )
      );
    }
    if (resizingItem) {
      const deltaX = e.clientX - resizingItem.startX;
      const deltaY = e.clientY - resizingItem.startY;
      setInventory((prev) =>
        prev.map((item) =>
          item.id === resizingItem.id
            ? {
                ...item,
                w: Math.max(40, resizingItem.initialW + deltaX),
                h: Math.max(40, resizingItem.initialH + deltaY),
              }
            : item
        )
      );
    }
  };

  const handleMouseUp = () => {
    setDraggingItem(null);
    setResizingItem(null);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggingItem, resizingItem]);

  const score = Object.entries(answers).filter(
    ([idx, choice]) => choice === QUESTIONS_DATA[idx].correct
  ).length;

  // --- UI Components ---

  const StartView = () => (
    <div className="flex flex-col items-center justify-center min-h-[600px] bg-gradient-to-br from-pink-50 to-indigo-50 p-8 rounded-[40px] border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
      <div className="bg-white p-2 rounded-full border-4 border-black mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <Refrigerator size={64} className="text-pink-400" />
      </div>
      <h1 className="text-6xl font-black text-black mb-2 text-center tracking-tighter uppercase italic">
        Marie Curie
        <br />
        <span className="text-indigo-500">Dream Fridge</span>
      </h1>
      <p className="text-xl text-gray-600 mb-10 text-center font-bold">
        Thử thách 60 câu Tiếng Anh • Tích xu • Xây tủ lạnh 4K
      </p>
      <button
        onClick={() => setView("quiz")}
        className="group relative px-16 py-6 bg-yellow-300 border-4 border-black font-black text-3xl hover:bg-yellow-400 transition-all active:translate-y-2 active:shadow-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl"
      >
        PLAY NOW
      </button>
    </div>
  );

  const QuizView = () => {
    const q = QUESTIONS_DATA[currentIndex];
    const userChoice = answers[currentIndex];
    const isAnswered = userChoice !== undefined;

    return (
      <div className="flex flex-col h-full bg-white border-4 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="bg-pink-400 p-4 border-b-4 border-black flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white border-2 border-black px-4 py-1 rounded-full font-black uppercase text-sm tracking-widest">
              Question {currentIndex + 1}/60
            </div>
          </div>
          <div className="flex items-center gap-2 bg-yellow-300 border-2 border-black px-4 py-1 rounded-full font-black text-lg">
            <Coins size={20} />
            {wallet}$
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto bg-[#fafafa]">
          {q.isReading && (
            <div className="mb-6 p-6 bg-white border-4 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-2 mb-3 text-indigo-600 font-black uppercase text-sm">
                <BookOpen size={18} /> Reading Passage
              </div>
              <div className="text-gray-700 leading-relaxed font-medium text-lg whitespace-pre-wrap italic">
                {READING_PASSAGE}
              </div>
            </div>
          )}

          <div className="bg-blue-100 border-4 border-black p-8 rounded-2xl mb-8 relative">
            <div className="absolute -top-4 -left-4 bg-white border-2 border-black px-3 py-1 font-black text-xs uppercase rounded">
              Task
            </div>
            <h2 className="text-2xl font-black text-gray-800 leading-tight">
              {q.q}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {q.options.map((opt, idx) => {
              let style =
                "group relative border-4 border-black p-5 rounded-2xl text-left font-black text-xl transition-all ";
              if (isAnswered) {
                if (idx === q.correct) style += "bg-green-300 translate-x-2 ";
                else if (idx === userChoice) style += "bg-red-300 ";
                else style += "bg-gray-100 opacity-40 ";
              } else {
                style +=
                  "bg-white hover:bg-indigo-100 cursor-pointer hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1";
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleAnswer(idx)}
                  className={style}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-4">
                      <span className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center bg-white text-sm">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span dangerouslySetInnerHTML={{ __html: opt }} />{" "}
                      {/* ĐÃ SỬA: Render mã HTML */}
                    </span>
                    {isAnswered && idx === q.correct && (
                      <CheckCircle2 size={28} className="text-black" />
                    )}
                    {isAnswered && idx === userChoice && idx !== q.correct && (
                      <XCircle size={28} className="text-black" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 border-t-4 border-black bg-gray-50 flex justify-between">
          <button
            onClick={prevQuestion}
            className="flex items-center gap-2 px-6 py-2 bg-white border-2 border-black rounded-xl font-black hover:bg-gray-100"
          >
            <ChevronLeft /> BACK
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setView("fridge")}
              className="px-6 py-2 bg-indigo-400 text-white border-2 border-black rounded-xl font-black hover:bg-indigo-500 flex items-center gap-2"
            >
              <Refrigerator size={20} /> MY FRIDGE
            </button>
            <button
              onClick={nextQuestion}
              className="flex items-center gap-2 px-6 py-2 bg-yellow-300 border-2 border-black rounded-xl font-black hover:bg-yellow-400"
            >
              NEXT <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const FridgeView = () => (
    <div className="flex flex-col h-full bg-[#f0f2f5] border-4 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="bg-indigo-500 p-4 border-b-4 border-black flex justify-between items-center text-white">
        <h2 className="text-2xl font-black flex items-center gap-2 italic uppercase tracking-tighter">
          <Refrigerator /> 4K Webtoon Fridge
        </h2>
        <div className="flex gap-2 text-black">
          <button
            onClick={() => setView("quiz")}
            className="bg-white border-2 border-black px-4 py-1 rounded-full font-black text-sm uppercase"
          >
            Học tiếp
          </button>
          <button
            onClick={() => setView("shop")}
            className="bg-yellow-300 border-2 border-black px-4 py-1 rounded-full font-black text-sm uppercase flex items-center gap-2"
          >
            <ShoppingBag size={16} /> Shop
          </button>
        </div>
      </div>

      <div className="flex-1 relative bg-[#e0e7ff] p-4 flex items-center justify-center overflow-hidden">
        {/* The Fridge Container */}
        <div className="relative w-full max-w-[500px] h-full bg-white border-8 border-black rounded-[40px] shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)] flex overflow-hidden">
          {/* Internal Shelves */}
          <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
            <div className="h-[2px] bg-indigo-100 w-full mt-24"></div>
            <div className="h-[2px] bg-indigo-100 w-full mb-24"></div>
            <div className="h-[2px] bg-indigo-100 w-full mb-48"></div>
          </div>

          {/* Fridge Door - Left */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-1/2 bg-white border-r-4 border-black z-40 transition-transform duration-700 origin-left flex items-center justify-end p-4
              ${
                isFridgeOpen
                  ? "-rotate-y-110 translate-x-[-100%]"
                  : "rotate-y-0"
              }`}
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="w-1 h-32 bg-gray-200 rounded-full border-2 border-black"></div>
          </div>

          {/* Fridge Door - Right */}
          <div
            className={`absolute right-0 top-0 bottom-0 w-1/2 bg-white border-l-4 border-black z-40 transition-transform duration-700 origin-right flex items-center justify-start p-4
              ${
                isFridgeOpen ? "rotate-y-110 translate-x-[100%]" : "rotate-y-0"
              }`}
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="w-1 h-32 bg-gray-200 rounded-full border-2 border-black"></div>
          </div>

          {/* Inside Content */}
          <div className="flex-1 relative bg-[#f8faff] p-8">
            {inventory.map((item) => (
              <div
                key={item.id}
                onMouseDown={(e) => handleMouseDown(e, item, "drag")}
                className={`absolute flex items-center justify-center cursor-move select-none border-4 border-black rounded-2xl ${item.color} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group`}
                style={{
                  left: item.x,
                  top: item.y,
                  width: item.w,
                  height: item.h,
                  fontSize: `${Math.min(item.w, item.h) * 0.6}px`,
                }}
              >
                {item.emoji}
                <div className="absolute -top-4 -right-4 hidden group-hover:flex gap-1">
                  <button
                    onMouseDown={(e) => handleMouseDown(e, item, "resize")}
                    className="bg-white border-2 border-black p-1 rounded-md cursor-nwse-resize hover:bg-yellow-100"
                  >
                    <Maximize2 size={14} />
                  </button>
                </div>
              </div>
            ))}

            {!isFridgeOpen && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/5 pointer-events-none">
                <button
                  onClick={() => setIsFridgeOpen(true)}
                  className="pointer-events-auto bg-white border-4 border-black px-8 py-4 rounded-2xl font-black text-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300 transition-all"
                >
                  MỞ TỦ LẠNH <Unlock className="inline ml-2" />
                </button>
              </div>
            )}

            {isFridgeOpen && inventory.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center opacity-20 pointer-events-none">
                <ShoppingBag size={80} className="mb-4" />
                <p className="font-black text-2xl uppercase italic">
                  Empty Fridge
                </p>
              </div>
            )}
          </div>
        </div>

        {isFridgeOpen && (
          <button
            onClick={() => setIsFridgeOpen(false)}
            className="absolute bottom-8 right-8 bg-white border-4 border-black p-4 rounded-2xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-red-100"
          >
            ĐÓNG TỦ <Lock size={24} />
          </button>
        )}
      </div>
      <div className="p-4 bg-white border-t-4 border-black text-center font-bold text-gray-500 italic">
        "Dream it, Build it, Eat it!" • Drag to move • Resize with icons
      </div>
    </div>
  );

  const ShopView = () => (
    <div className="flex flex-col h-full bg-white border-4 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="bg-yellow-400 p-6 border-b-4 border-black flex justify-between items-center">
        <h2 className="text-3xl font-black italic flex items-center gap-3">
          <ShoppingBag size={32} /> WEBTOON MARKET
        </h2>
        <div className="flex items-center gap-4">
          <div className="bg-white border-2 border-black px-6 py-2 rounded-full font-black text-xl flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Coins className="text-yellow-500" /> {wallet}$
          </div>
          <button
            onClick={() => setView("fridge")}
            className="bg-white border-2 border-black p-2 rounded-xl hover:bg-red-100"
          >
            <XCircle size={24} />
          </button>
        </div>
      </div>
      <div className="flex-1 p-8 overflow-y-auto bg-[#fffef5]">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {SHOP_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-white border-4 border-black p-6 rounded-3xl flex flex-col items-center hover:scale-105 transition-transform shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <div
                className={`w-24 h-24 rounded-full ${item.color} border-4 border-black flex items-center justify-center text-5xl mb-4`}
              >
                {item.emoji}
              </div>
              <h3 className="font-black text-xl mb-1 uppercase tracking-tighter">
                {item.name}
              </h3>
              <p className="text-indigo-600 font-black text-lg mb-4">
                {item.price}$
              </p>
              <button
                onClick={() => buyItem(item)}
                disabled={wallet < item.price}
                className={`w-full py-3 border-4 border-black rounded-2xl font-black text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 transition-all
                  ${
                    wallet >= item.price
                      ? "bg-green-300 hover:bg-green-400"
                      : "bg-gray-200 opacity-50 cursor-not-allowed"
                  }`}
              >
                {wallet >= item.price ? "BUY" : "LOCKED"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ResultView = () => (
    <div className="flex flex-col items-center justify-center min-h-[600px] bg-[#fffdf0] p-12 border-8 border-black rounded-[40px] shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] text-center">
      <div className="relative mb-10">
        <div className="w-40 h-40 bg-yellow-300 border-4 border-black rounded-full flex items-center justify-center text-7xl animate-bounce">
          🏆
        </div>
        <div className="absolute -bottom-4 -right-4 bg-pink-400 border-4 border-black px-4 py-2 font-black text-2xl rotate-12">
          WOW!
        </div>
      </div>
      <h2 className="text-5xl font-black mb-4 italic uppercase tracking-tighter">
        Mission Accomplished!
      </h2>
      <div className="text-8xl font-black text-indigo-500 mb-8 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
        {score}/60
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => {
            setCurrentIndex(0);
            setView("quiz");
          }}
          className="flex items-center gap-2 px-10 py-4 bg-blue-300 border-4 border-black rounded-2xl font-black text-xl hover:bg-blue-400 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
        >
          <RotateCcw /> XEM LẠI ĐÁP ÁN
        </button>
        <button
          onClick={() => setView("fridge")}
          className="flex items-center gap-2 px-10 py-4 bg-pink-300 border-4 border-black rounded-2xl font-black text-xl hover:bg-pink-400 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
        >
          <Refrigerator /> VÀO TỦ LẠNH
        </button>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-10 py-4 bg-white border-4 border-black rounded-2xl font-black text-xl hover:bg-gray-100 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
        >
          <Home /> TRANG CHỦ
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fffdf0] p-4 font-mono select-none overflow-x-hidden">
      <div className="max-w-4xl mx-auto h-[850px]">
        {view === "start" && <StartView />}
        {view === "quiz" && <QuizView />}
        {view === "fridge" && <FridgeView />}
        {view === "shop" && <ShopView />}
        {view === "result" && <ResultView />}
      </div>
    </div>
  );
};

export default App;
