// DE
export function rollDice(sides: number) {
  if (!sides) sides = 6;
  return `Vous avez obtenu un ${
    Math.floor(Math.random() * sides) + 1
  } (sur ${sides})`;
}
