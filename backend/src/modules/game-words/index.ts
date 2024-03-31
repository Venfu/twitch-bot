// SYNDROME DE LA PAGE BLANCHE :)
import fs from "fs";
import { vChat } from "../../core/chat";
import { vCmd } from "../../core/commands";

const timer: number = 60;
const allLetters: { [key: string]: number } = {
  A: 9,
  E: 12,
  I: 9,
  O: 8,
  U: 4,
  Y: 2,
  Z: 1,
  R: 6,
  T: 6,
  P: 2,
  Q: 1,
  S: 4,
  D: 4,
  F: 2,
  G: 3,
  H: 2,
  J: 1,
  K: 1,
  L: 4,
  M: 2,
  W: 2,
  X: 1,
  C: 2,
  V: 2,
  B: 2,
  N: 6,
};

let allLettersPond: string[] = [];
let words: string[] = [];

let _vWords = {
  active: false,
  letters: new Array<string>(),
  users: new Array<any>(),
  founds: new Array<string>(),
  init(): Promise<void> {
    return new Promise((res, rej) => {
      vChat.subscribeMessageHandler(onMessageHandler);

      for (let letter in allLetters) {
        for (let i = 0; i < allLetters[letter]; i++) {
          allLettersPond.push(letter);
        }
      }

      fs.readFile(__dirname + "/../../assets/words.txt", (err, data) => {
        words = data.toString().split("\r\n");
        res();
      });

      vCmd.cmds.push({
        name: "words",
        permission: "moderator",
        regex: /^\!words start( [0-9]{1,2})?$/gim,
        do: (msg: string) => {
          if (!_vWords.active) _vWords.start(parseInt(msg.substring(13)));
        },
      });
    });
  },
  start(n: number) {
    if (n > 26) {
      vChat.sendMessage(
        "Nombre de lettre trop important. Il doit être compris entre 1 et 26"
      );
      return;
    }

    _vWords.active = true;

    rdmLetters(n);

    vChat.sendMessage(
      `Formez des mots avec les lettres : ${_vWords.letters.join(", ")}`
    );

    setTimeout(() => {
      let msgEnd = "";
      for (let user in _vWords.users) {
        msgEnd += `${user} (${_vWords.users[user].length}) `;
      }
      console.log(_vWords.users);
      if (!msgEnd) {
        msgEnd =
          "FIN ! Pas de gagnants :( Vous ferez mieux la prochaine fois !";
      } else {
        msgEnd = "FIN ! Les scores sont : " + msgEnd;
      }

      vChat.sendMessage(msgEnd);

      _vWords.reset();
    }, timer * 1000);
  },
  reset() {
    _vWords.active = false;
    _vWords.letters = new Array<string>();
    _vWords.users = new Array<any>();
    _vWords.founds = new Array<string>();
  },
};

function onMessageHandler(
  target: string,
  context: any,
  msg: string,
  self: any
): void {
  if (!_vWords.active) return;
  msg = toNormalForm(msg);
  if (msgIsValid(msg)) {
    _vWords.founds.push(msg);
    if (_vWords.users[context["display-name"]]) {
      _vWords.users[context["display-name"]].push(msg);
    } else {
      _vWords.users[context["display-name"]] = [msg];
    }
    console.log(_vWords.users);
  }
}

function toNormalForm(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
}

function msgIsValid(msg: string): boolean {
  let isValid = true;
  msg.split("").forEach((letter: string) => {
    if (!_vWords.letters.includes(letter)) isValid = false;
  });

  if (!isValid) return isValid;

  isValid = !_vWords.founds.includes(msg) && words.includes(msg);
  return isValid;
}

function rdmLetters(n: number) {
  for (let i = 0; i < (n || 7); i++) {
    const letter =
      allLettersPond[
        Math.floor((Math.random() * 1000) % allLettersPond.length)
      ];
    if (_vWords.letters.includes(letter)) {
      i--;
    } else {
      _vWords.letters.push(letter);
    }
  }
}

export let vWords = _vWords;
