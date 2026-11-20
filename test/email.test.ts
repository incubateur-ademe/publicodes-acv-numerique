import Engine from "publicodes";
import { describe, expect, test } from "vitest";
import rules from "../publicodes-build/index.js";

describe("Envoi d'un mail", () => {
  const engine = new Engine(rules);

  const setEmailSituation = ({
    taille = 1,
    destinataires = 1,
    réseau = "fixe",
    appareil = "moyenne",
  }: {
    taille?: number;
    destinataires?: number;
    réseau?: string;
    appareil?: string;
  }) => {
    const situation = {
      "email . taille": taille,
      "email . destinataires": destinataires,
      "email . réseau": `'${réseau}'`,
      "email . appareil": `'${appareil}'`,
    };
    engine.setSituation(situation, { keepPreviousSituation: false });
  };

  test("Rédiger, envoyer et lire 1 mail de 1Mo (pièce jointe) à 5 destinataires via une connexion fixe", () => {
    setEmailSituation({
      taille: 1,
      destinataires: 5,
      réseau: "fixe",
    });
    const result = engine.evaluate("email");
    expect(result.nodeValue).toBeCloseTo(2.42, 0);
  });

  test("Rédiger, envoyer et lire 1 mail de 1Mo (pièce jointe) à 5 destinataires via une connexion mobile", () => {
    setEmailSituation({
      taille: 1,
      destinataires: 5,
      réseau: "mobile",
    });
    const result = engine.evaluate("email");

    expect(result.nodeValue).toBeCloseTo(2.48, 0);
  });

  test.each([
    {
      réseau: "fixe",
      appareil: "ordinateur et écran",
      taille: 0.75,
      destinataires: 2,
      attendu: 4.057882897920692,
    },
    {
      réseau: "fixe",
      appareil: "ordinateur portable",
      taille: 1,
      destinataires: 4,
      attendu: 1.6396671276955772,
    },
    {
      réseau: "fixe",
      appareil: "tablette",
      taille: 1.25,
      destinataires: 6,
      attendu: 5.146319583962922,
    },
    {
      réseau: "fixe",
      appareil: "smartphone",
      taille: 1.5,
      destinataires: 8,
      attendu: 1.2498120614721722,
    },
    {
      réseau: "fixe",
      appareil: "moyenne",
      taille: 1.75,
      destinataires: 10,
      attendu: 2.9892356784840546,
    },
    {
      réseau: "mobile",
      appareil: "ordinateur et écran",
      taille: 2,
      destinataires: 12,
      attendu: 6.446529608776001,
    },
    {
      réseau: "mobile",
      appareil: "ordinateur portable",
      taille: 2.25,
      destinataires: 14,
      attendu: 2.8079605156859784,
    },
    {
      réseau: "mobile",
      appareil: "tablette",
      taille: 2.5,
      destinataires: 16,
      attendu: 7.830165499860943,
    },
    {
      réseau: "mobile",
      appareil: "smartphone",
      taille: 2.75,
      destinataires: 18,
      attendu: 2.3506505168119105,
    },
    {
      réseau: "mobile",
      appareil: "moyenne",
      taille: 3,
      destinataires: 20,
      attendu: 4.799354971376803,
    },
  ])(
    "Rédiger, envoyer et lire un mail de $taille Mo à $destinataires destinataires via une connexion $réseau sur $appareil",
    ({ réseau, appareil, taille, destinataires, attendu }) => {
      setEmailSituation({
        taille,
        destinataires,
        réseau,
        appareil,
      });
      const result = engine.evaluate("email");
      expect(result.nodeValue).toBeCloseTo(attendu, 5);
    },
  );
});
