// HUG
export function hug(from: string, to: string) {
  if (!to) to = "tous les viewers de la chaine";
  if (to.match(/^\@.*/gim)) to = to.substring(1);
  return `${from} envoie un gros câlin à ${to} ! 🤗🤗🤗`;
}
