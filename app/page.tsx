"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  House,
  Lightbulb,
  Volume2,
  VolumeX,
} from "lucide-react";

type Screen = "opening" | "guidelines" | "game" | "finished";
type FeedbackTone = "correct" | "wrong" | "complete";

type Round = {
  word: string;
  definition: string;
};

const ROUNDS: Round[] = [
  {
    word: "BAYBAY",
    definition:
      "Ito ay pagbasa o pagsulat ng mga titik sa wastong pagkakasunod-sunod upang mabuo o matukoy ang isang salita.",
  },
  {
    word: "KULAY",
    definition:
      "Ito ay maaaring malamig o mainit na siyang nagbibigay emosyon at mood sa tekstong biswal.",
  },
  {
    word: "KASARIAN",
    definition:
      "Ito ang pinakakaraniwang estereotipo na nakabase sa inaasahang papel ng babae, lalaki, o miyembyo ng LGBTQIA+ sa lipunan.",
  },
  {
    word: "ANYO",
    definition:
      "Ito ay tumutukoy sa porma o hugis ng mga elemento sa tekstong biswal.",
  },
  {
    word: "DIASPORA",
    definition:
      "Ito ang estereotipo na tumutukoy sa mga taong lumikas o nanirahan sa labas ng sariling bansa.",
  },
  {
    word: "LINYA",
    definition:
      "Ito ang nagtatakda sa mata ng mambabasa ng direksyon at galaw patungo sa isang mahalagang mensahe.",
  },
];

const CORRECT_MESSAGES = [
  "NAKS NICE ONE!",
  "ABA G NA G!",
  "WOW, NAKINIG YARN?",
  "TUMPAK GANERN!",
  "OMSIM, MAGALING!",
];

const WRONG_MESSAGES = [
  "AYOWN MALIIIII!",
  "MALI NGANI!",
  "HULA PA MORE!",
  "NGEK!",
  "WALA NGANI NYAN!",
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function Baybayi({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`baybayi ${compact ? "baybayi--compact" : ""}`}
      data-testid="illustration-baybayi"
      aria-label="Si Baybayi, ang tagapagturo ng laro"
      role="img"
    >
      <svg viewBox="0 0 250 250" aria-hidden="true">
        <path
          className="baybayi-paper"
          d="M49 39c19-25 71-35 112-22 44 14 72 49 69 97-3 46-27 89-75 107-42 16-95 3-119-32C9 153 21 77 49 39Z"
        />
        <path
          className="baybayi-hair"
          d="M51 102c-17-25-3-64 31-79 33-14 80-8 102 14 28 28 22 71 11 92l-34-11-96 16-14-32Z"
        />
        <path
          className="baybayi-long-hair"
          d="M52 98C35 72 47 38 79 23c36-17 83-7 105 19 18 21 18 52 8 77 5 25 4 54-8 76-7 13-17 24-31 32l-14-15c-7 11-18 18-32 22l-10-18c-17-9-27-23-31-42-4-20-2-39 5-56Z"
        />
        <path
          className="baybayi-face"
          d="M61 93c0-34 24-58 59-58 38 0 62 25 62 63 0 40-23 70-61 70-36 0-60-32-60-75Z"
        />
        <path
          className="baybayi-ear"
          d="M61 94c-16-7-25 4-22 19 2 11 12 19 25 16M181 94c16-7 25 4 22 19-2 11-12 19-25 16"
        />
        <path
          className="baybayi-brow"
          d="M84 88c7-6 15-6 22-1M139 87c8-5 17-4 23 2"
        />
        <circle className="baybayi-eye-white" cx="97" cy="105" r="10" />
        <circle className="baybayi-eye-white" cx="151" cy="105" r="10" />
        <circle className="baybayi-eye" cx="99" cy="106" r="5" />
        <circle className="baybayi-eye" cx="153" cy="106" r="5" />
        <circle className="baybayi-eye-glint" cx="101" cy="103" r="2" />
        <circle className="baybayi-eye-glint" cx="155" cy="103" r="2" />
        <circle className="baybayi-cheek" cx="78" cy="129" r="8" />
        <circle className="baybayi-cheek" cx="171" cy="129" r="8" />
        <path
          className="baybayi-nose"
          d="M124 105c-3 9-7 17 1 19 4 1 7 0 9-2"
        />
        <path className="baybayi-smile" d="M104 136c12 12 29 12 42-1" />
        <path className="baybayi-neck" d="M105 162v24M145 162v24" />
        <path
          className="baybayi-body"
          d="M76 229c5-35 22-49 49-49 29 0 47 14 52 49"
        />
        <path className="baybayi-sash" d="m81 193 92 31" />
        <path className="baybayi-mark" d="m106 199 5 13 10-8 10 10 4-15" />
        <path className="baybayi-arm-left" d="M80 194c-17 1-29 11-36 25" />
        <path className="baybayi-arm-right" d="M172 194c17 1 27 8 35 21" />
        <circle className="baybayi-hand" cx="43" cy="221" r="6" />
        <circle className="baybayi-hand" cx="210" cy="218" r="6" />
        <path
          className="baybayi-bow"
          d="m48 50-17-10 4 19Z M48 50l16-10-3 19Z"
        />
        <path
          className="baybayi-flower"
          d="m46 58 5-9 7 8 10-1-5 9 4 9-10-2-7 7-2-10-9-5 9-4Z"
        />
      </svg>
    </div>
  );
}

function Sparkles() {
  return (
    <div className="scribbles" aria-hidden="true">
      <span className="scribble scribble--one" />
      <span className="scribble scribble--two" />
      <span className="scribble scribble--three" />
      <span className="scribble scribble--four" />
      <span className="scribble scribble--five" />
      <span className="scribble scribble--six" />
    </div>
  );
}

function SoundToggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className="sound-toggle"
      onClick={onToggle}
      aria-label={enabled ? "Patayin ang tunog" : "Buksan ang tunog"}
      data-testid="button-sound-toggle"
    >
      {enabled ? (
        <Volume2 size={19} strokeWidth={2.5} />
      ) : (
        <VolumeX size={19} strokeWidth={2.5} />
      )}
    </button>
  );
}

function HomeButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="home-button"
      onClick={onClick}
      aria-label="Bumalik sa simula"
      data-testid="button-home"
    >
      <House size={18} strokeWidth={2.6} />
    </button>
  );
}

function NextButton({
  label,
  onClick,
  testId,
}: {
  label: string;
  onClick: () => void;
  testId: string;
}) {
  return (
    <button
      type="button"
      className="next-button"
      onClick={onClick}
      data-testid={testId}
    >
      <span>{label}</span>
      <ArrowRight size={22} strokeWidth={3} />
    </button>
  );
}

function IntroScreen({
  onStart,
  onFinish,
}: {
  onStart: () => void;
  onFinish: () => void;
}) {
  return (
    <main className="screen opening-screen" data-testid="screen-opening">
      <Sparkles />
      <div className="opening-layout">
        <div className="brand-lockup" data-testid="text-game-title">
          <span className="grade-badge" data-testid="text-subject-badge">
            Filipino 10
          </span>
          <h1>
            Baybayin
            <br />
            <em>
              ang
              <br />
              Kaalaman
            </em>
          </h1>
          <div className="title-rule">
            <span />
          </div>
          <p className="brand-note text-left">
            Isang larong pangkat
            <br />
            para sa mga salitang atin.
          </p>
        </div>
        <div className="character-stage">
          {/* <div className="sun-disc" aria-hidden="true" /> */}
          <div className="baybayi" data-testid="illustration-baybayi">
            <Image
              src="/images/maria.jpg"
              alt="Si Baybayi, ang tagapagturo ng laro"
              width={310}
              height={310}
              priority
            />
          </div>
          <div
            className="speech-bubble text-justify"
            data-testid="text-welcome"
          >
            <span className="speech-tail text-black" />
            Magandang buhay! Ako si Baybayi at hilig ko ang bumaybay ng mga
            salita! Halina’t samahan niyo ako!
          </div>
        </div>
        <div className="opening-action">
          <button
            type="button"
            className="primary-button"
            onClick={onStart}
            data-testid="button-start-game"
          >
            <span>Geym!</span>
            <ArrowRight size={24} strokeWidth={3} />
          </button>
          {/* <button
            type="button"
            className="next-button"
            onClick={onFinish}
            data-testid="button-goto-finished"
          >
            <span>Tapusin</span>
            <ArrowRight size={22} strokeWidth={3} />
          </button> */}
          {/* <p className="tiny-note">Dalawang pangkat. Isang masayang hamon.</p> */}
        </div>
      </div>
    </main>
  );
}

function GuidelinesScreen({
  onBack,
  onStart,
}: {
  onBack: () => void;
  onStart: () => void;
}) {
  return (
    <main className="screen guidelines-screen" data-testid="screen-guidelines">
      <Sparkles />
      <div className="screen-topbar">
        <HomeButton onClick={onBack} />
        <div className="game-brand" data-testid="text-mini-brand">
          BAYBAYIN ANG KAALAMAN
        </div>
      </div>
      <div className="guidelines-layout">
        {/* <div className="guideline-character">
          <Baybayi compact />
        </div> */}
        <section className="guideline-card" data-testid="card-guidelines">
          {/* <div className="card-eyebrow">Bago tayo magsimula</div> */}
          <h2 className="text-[#f4c743]">MUNTING PAALALA</h2>
          <p className="card-intro">
            Makinig, makiramdam, at magsaya sa bawat titik.
          </p>
          <ol className="rules-list">
            <li data-testid="text-rule-1" className="font-thin">
              <span className="rule-number">01</span>
              <span className="rule-text">
                Bawat pangkat ay may limang pagkakataon upang magbigay ng titik
                na tingin niyong bumubuo sa salitang hinahanap.
              </span>
            </li>
            <li data-testid="text-rule-2">
              <span className="rule-number">02</span>
              <span className="rule-text">
                Maaaring humingi ng hint ang bawat pangkat subalit kabawasan ito
                sa limang pagkakataon.
              </span>
            </li>
            <li data-testid="text-rule-3">
              <span className="rule-number">03</span>
              <span className="rule-text">
                Kung sino ang grupong makabuo ng salita ang siyang makatatanggap
                ng puntos.
              </span>
            </li>
          </ol>
          <NextButton
            label="Taralets!"
            onClick={onStart}
            testId="button-begin-rounds"
          />
        </section>
      </div>
      <div className="page-mark">
        01 <span>/</span> 08
      </div>
    </main>
  );
}

function Hearts({ count, team }: { count: number; team: number }) {
  return (
    <div
      className="hearts"
      data-testid={`status-hearts-team-${team}`}
      aria-label={`${count} sa 5 puso ng Pangkat ${team}`}
    >
      {[0, 1, 2, 3, 4].map((heart) => (
        <Heart
          key={heart}
          size={19}
          strokeWidth={2.2}
          className={`heart ${heart < count ? "heart--full" : "heart--empty"}`}
          data-testid={`icon-heart-team-${team}-${heart + 1}`}
          fill={heart < count ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

function TeamPanel({
  team,
  hearts,
  active,
}: {
  team: number;
  hearts: number;
  active: boolean;
}) {
  return (
    <section
      className={`team-panel ${active ? "team-panel--active" : ""}`}
      data-testid={`panel-team-${team}`}
    >
      <div className="team-head">
        <span className="team-dot" />
        <h3>PANGKAT {team}</h3>
      </div>
      <div className="team-bottom">
        <Hearts count={hearts} team={team} />
      </div>
    </section>
  );
}

function WordSlots({
  word,
  revealed,
  lastCorrect,
  outOfHearts,
}: {
  word: string;
  revealed: Set<string>;
  lastCorrect: string | null;
  outOfHearts?: boolean;
}) {
  return (
    <div
      className="word-slots"
      data-testid="display-letter-slots"
      aria-label="Mga puwang ng salita"
    >
      {word.split("").map((letter, index) => {
        const wasRevealed =
          revealed.has(`${letter}-${index}`) || revealed.has(letter);
        const shown = wasRevealed || outOfHearts;
        return (
          <div
            className={`letter-slot ${shown ? "letter-slot--revealed" : ""} ${
              shown && lastCorrect === letter ? "letter-slot--pop" : ""
            } ${outOfHearts && !wasRevealed ? "letter-slot--lost" : ""}`}
            key={`${letter}-${index}`}
            data-testid={`slot-letter-${index + 1}`}
          >
            {shown ? letter : ""}
          </div>
        );
      })}
    </div>
  );
}

function GameScreen({
  round,
  onHome,
  onNext,
  playFeedback,
}: {
  round: number;
  onHome: () => void;
  onNext: () => void;
  playFeedback: (tone: FeedbackTone) => void;
}) {
  const current = ROUNDS[round];
  const [turn, setTurn] = useState<1 | 2>(1);
  const [hearts, setHearts] = useState<[number, number]>([5, 5]);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState("ARAT LET’S TRY!");
  const [feedbackKind, setFeedbackKind] = useState<
    "welcome" | "correct" | "wrong" | "complete"
  >("welcome");
  const [complete, setComplete] = useState(false);
  const [lastCorrect, setLastCorrect] = useState<string | null>(null);
  const [outOfHearts, setOutOfHearts] = useState(false);
  const [hintUsed, setHintUsed] = useState<[boolean, boolean]>([false, false]); //track the hint count

  useEffect(() => {
    setTurn(1);
    setHearts([5, 5]);
    setRevealed(new Set());
    setGuessed(new Set());
    setMessage(round === 0 ? "ARAT LET'S TRY!" : "YOOHOO, DITO ANG TINGIN!");
    setFeedbackKind(round === 0 ? "welcome" : "welcome");
    setComplete(false);
    setOutOfHearts(false);
    setHintUsed([false, false]);
    setLastCorrect(null);
  }, [round]);

  const finishRound = () => {
    setComplete(true);
    setMessage("");
    setFeedbackKind("complete");
    playFeedback("complete");
  };

  const revealLetter = (letter: string) => {
    if (complete || guessed.has(letter)) return;
    const nextGuessed = new Set(guessed);
    nextGuessed.add(letter);
    setGuessed(nextGuessed);
    if (current.word.includes(letter)) {
      const nextRevealed = new Set(revealed);
      current.word.split("").forEach((character, index) => {
        if (character === letter) nextRevealed.add(`${character}-${index}`);
      });
      setRevealed(nextRevealed);
      setLastCorrect(letter);
      setMessage(
        CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]
      );
      setFeedbackKind("correct");
      playFeedback("correct");
      if (
        current.word
          .split("")
          .every((character, index) =>
            nextRevealed.has(`${character}-${index}`)
          )
      ) {
        finishRound();
      }
    } else {
      const nextHearts: [number, number] = [...hearts] as [number, number];
      nextHearts[turn - 1] = Math.max(0, nextHearts[turn - 1] - 1);
      setHearts(nextHearts);
      setMessage(
        WRONG_MESSAGES[Math.floor(Math.random() * WRONG_MESSAGES.length)]
      );
      setFeedbackKind("wrong");
      playFeedback("wrong");
      if (nextHearts[0] === 0 && nextHearts[1] === 0) {
        setOutOfHearts(true);
      } else {
        setTurn(turn === 1 ? 2 : 1);
      }
    }
  };

  const useHint = () => {
    if (complete || outOfHearts || hintUsed[turn - 1]) return;

    const missing = current.word
      .split("")
      .find((letter, index) => !revealed.has(`${letter}-${index}`));
    if (!missing) return;

    const nextHintUsed: [boolean, boolean] = [...hintUsed] as [
      boolean,
      boolean
    ];
    nextHintUsed[turn - 1] = true;
    setHintUsed(nextHintUsed);

    const nextRevealed = new Set(revealed);
    current.word.split("").forEach((character, index) => {
      if (character === missing) nextRevealed.add(`${character}-${index}`);
    });
    const nextGuessed = new Set(guessed);
    nextGuessed.add(missing);
    setRevealed(nextRevealed);
    setGuessed(nextGuessed);
    const nextHearts: [number, number] = [...hearts] as [number, number];
    nextHearts[turn - 1] = Math.max(0, nextHearts[turn - 1] - 1);
    setHearts(nextHearts);
    setMessage("");
    setFeedbackKind("wrong");
    playFeedback("wrong");
    if (
      current.word
        .split("")
        .every((character, index) => nextRevealed.has(`${character}-${index}`))
    ) {
      finishRound();
    } else if (nextHearts[0] === 0 && nextHearts[1] === 0) {
      setOutOfHearts(true);
    } else {
      setTurn(turn === 1 ? 2 : 1);
    }
  };

  const shownCount = current.word
    .split("")
    .filter((letter, index) => revealed.has(`${letter}-${index}`)).length;

  return (
    <main className="screen game-screen" data-testid="screen-game">
      <Sparkles />
      <div className="screen-topbar game-topbar">
        <HomeButton onClick={onHome} />
        <div className="game-brand">BAYBAYIN ANG KAALAMAN</div>
      </div>
      <div className="game-wrap">
        <div className="team-row">
          <TeamPanel
            team={1}
            hearts={hearts[0]}
            active={turn === 1 && !complete}
          />
          <div className="versus" aria-hidden="true">
            VS
          </div>
          <TeamPanel
            team={2}
            hearts={hearts[1]}
            active={turn === 2 && !complete}
          />
        </div>
        <section
          className={`game-board ${complete ? "game-board--complete" : ""}`}
          data-testid="card-game-board"
        >
          <div className="board-heading">
            <h2
              className={`game-statement game-statement--${feedbackKind}`}
              data-testid="text-turn-indicator"
            >
              {complete
                ? round === 0
                  ? "READY NA YARN?"
                  : "OKIE NEXT!"
                : message}
            </h2>
            <div className="progress-meter" data-testid="status-round-progress">
              <span className="progress-label">
                {shownCount} / {current.word.length} titik
              </span>
              <div className="progress-track">
                <span
                  style={{
                    width: `${(shownCount / current.word.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="definition-wrap">
            <span className="definition-label">KAHULUGAN</span>
            <p data-testid="text-definition">{current.definition}</p>
          </div>
          <WordSlots
            word={current.word}
            revealed={revealed}
            lastCorrect={lastCorrect}
            outOfHearts={outOfHearts}
          />
          {!complete && !outOfHearts ? (
            <>
              <div className="alphabet" data-testid="keyboard-alphabet">
                {ALPHABET.map((letter) => (
                  <button
                    type="button"
                    key={letter}
                    className={`letter-button ${
                      guessed.has(letter)
                        ? current.word.includes(letter)
                          ? "letter-button--right"
                          : "letter-button--wrong"
                        : ""
                    }`}
                    disabled={guessed.has(letter)}
                    onClick={() => revealLetter(letter)}
                    data-testid={`button-letter-${letter}`}
                    aria-label={`Piliin ang titik ${letter}`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="hint-button"
                onClick={useHint}
                data-testid="button-hint"
              >
                <Lightbulb size={18} strokeWidth={2.5} />
                <span>HINT</span>
              </button>
            </>
          ) : (
            <div className="complete-area" data-testid="status-round-complete">
              <div className="complete-star">
                {outOfHearts ? (
                  <div className="ex">✕</div>
                ) : (
                  <div className="star">★</div>
                )}
              </div>
              {/* <div className="ex">✕</div>
              <div className="star">★</div> */}
              <div>
                <strong>Ang salita ay {current.word}!</strong>
                <span>
                  {outOfHearts
                    ? "Ubos na ang inyong buhay"
                    : "Mahusay ang inyong pagbaybay!"}
                </span>
              </div>
              <button
                type="button"
                className="next-round-button"
                onClick={onNext}
                data-testid="button-next-round"
              >
                <ArrowRight size={25} strokeWidth={3.5} aria-hidden="true" />
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function FinishedScreen({ onHome }: { onHome: () => void }) {
  return (
    <main className="screen finished-screen" data-testid="screen-finished">
      <Sparkles />
      <div className="finish-content">
        <div className="finish-character">
          {/* <Baybayi /> */}{" "}
          <Image
            src="/images/maria.jpg"
            alt="Si Baybayi, ang tagapagturo ng laro"
            width={310}
            height={310}
            priority
          />
        </div>
        <div className="finish-copy" data-testid="text-finished-message">
          Mahusay na pagbaybay mga bata! Babye!
        </div>
        <button
          onClick={onHome}
          className="finish-home-button"
          data-testid="button-finish-home"
        >
          <House size={18} strokeWidth={2.6} />
        </button>
        {/* <HomeButton onClick={onHome} /> */}
      </div>
    </main>
  );
}

function App() {
  const [screen, setScreen] = useState<Screen>("opening");
  const [round, setRound] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);
  const audioStartedRef = useRef(false);
  const musicTimerRef = useRef<number | null>(null);
  const musicStepRef = useRef(0);

  const startAudio = () => {
    if (!soundEnabled || audioStartedRef.current) return;
    const AudioContextClass =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const gain = context.createGain();
    gain.gain.value = 0.026;
    gain.connect(context.destination);
    audioContextRef.current = context;
    ambientGainRef.current = gain;
    audioStartedRef.current = true;

    const melody = [262, 330, 392, 523, 392, 330, 294, 349];
    const playMusicNote = () => {
      const note = context.createOscillator();
      const noteGain = context.createGain();
      note.type = "triangle";
      note.frequency.value = melody[musicStepRef.current % melody.length];
      noteGain.gain.setValueAtTime(0.0001, context.currentTime);
      noteGain.gain.exponentialRampToValueAtTime(
        0.16,
        context.currentTime + 0.035
      );
      noteGain.gain.exponentialRampToValueAtTime(
        0.0001,
        context.currentTime + 0.34
      );
      note.connect(noteGain);
      noteGain.connect(gain);
      note.start();
      note.stop(context.currentTime + 0.38);
      musicStepRef.current += 1;
    };
    playMusicNote();
    musicTimerRef.current = window.setInterval(playMusicNote, 420);
  };

  const playFeedback = (tone: FeedbackTone) => {
    startAudio();
    if (!soundEnabled || !audioContextRef.current) return;
    const context = audioContextRef.current;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const frequency =
      tone === "correct" ? 523 : tone === "complete" ? 659 : 180;
    oscillator.frequency.value = frequency;
    oscillator.type = tone === "wrong" ? "triangle" : "sine";
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      tone === "wrong" ? 0.08 : 0.11,
      context.currentTime + 0.02
    );
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      context.currentTime + (tone === "complete" ? 0.45 : 0.18)
    );
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + (tone === "complete" ? 0.5 : 0.2));
  };

  useEffect(
    () => () => {
      if (musicTimerRef.current !== null) {
        window.clearInterval(musicTimerRef.current);
      }
      const context = audioContextRef.current;
      if (context && context.state !== "closed") {
        void context.close();
      }
    },
    []
  );

  const wake = () => startAudio();
  const goHome = () => {
    wake();
    setScreen("opening");
    setRound(0);
  };
  const startGuidelines = () => {
    wake();
    setScreen("guidelines");
  };
  const startGame = () => {
    wake();
    setRound(0);
    setScreen("game");
  };
  const goToFinished = () => {
    wake();
    setScreen("finished");
  };
  const nextRound = () => {
    wake();
    if (round === ROUNDS.length - 1) {
      setScreen("finished");
    } else {
      setRound((current) => current + 1);
    }
  };
  const toggleSound = () => {
    if (soundEnabled) {
      setSoundEnabled(false);
      if (ambientGainRef.current && audioContextRef.current)
        ambientGainRef.current.gain.setTargetAtTime(
          0,
          audioContextRef.current.currentTime,
          0.04
        );
    } else {
      setSoundEnabled(true);
      window.setTimeout(startAudio, 0);
      if (ambientGainRef.current && audioContextRef.current)
        ambientGainRef.current.gain.setTargetAtTime(
          0.018,
          audioContextRef.current.currentTime,
          0.04
        );
    }
  };

  return (
    <div className="app-shell">
      {(screen === "guidelines" || screen === "game") && (
        <div className="global-sound">
          <SoundToggle enabled={soundEnabled} onToggle={toggleSound} />
        </div>
      )}
      {screen === "opening" && (
        <IntroScreen onStart={startGuidelines} onFinish={goToFinished} />
      )}
      {screen === "guidelines" && (
        <GuidelinesScreen onBack={goHome} onStart={startGame} />
      )}
      {screen === "game" && (
        <GameScreen
          round={round}
          onHome={goHome}
          onNext={nextRound}
          playFeedback={playFeedback}
        />
      )}
      {screen === "finished" && <FinishedScreen onHome={goHome} />}
    </div>
  );
}

export default App;
