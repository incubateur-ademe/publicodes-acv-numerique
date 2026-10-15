import Engine from "publicodes";
import { describe, expect, test } from "vitest";
import rules from "../publicodes-build/index.js";

describe("Envoi d'un mail", () => {
  const engine = new Engine(rules);

  const setEmailSituation = ({
    taille = 1,
    destinataires = 1,
    réseau = "fixe",
  }: {
    taille?: number;
    destinataires?: number;
    réseau?: "fixe" | "mobile";
  }) => {
    const situation = {
      "email . taille": taille,
      "email . destinataires": destinataires,
      "email . réseau": `'${réseau}'`,
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
    expect(result.nodeValue).toBeCloseTo(2.98, 0);
  });

  test("Rédiger, envoyer et lire 1 mail de 1Mo (pièce jointe) à 5 destinataires via une connexion mobile", () => {
    setEmailSituation({
      taille: 1,
      destinataires: 5,
      réseau: "mobile",
    });
    const result = engine.evaluate("email");

    expect(result.nodeValue).toBeCloseTo(3.07, 0);
  });
});
