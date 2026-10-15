import Engine from "publicodes";
import { describe, expect, test } from "vitest";
import rules from "../publicodes-build/index.js";

describe("Envoi d'un fichier", () => {
  const engine = new Engine(rules);

  const setFichierSituation = ({
    taille = 1,
    réseau = "fixe",
  }: {
    taille?: number;
    réseau?: "fixe" | "mobile";
  }) => {
    const situation = {
      "fichier . taille": taille,
      "fichier . réseau": `'${réseau}'`,
    };
    engine.setSituation(situation, { keepPreviousSituation: false });
  };

  test("Envoyer un fichier de 1 Go via une connexion fixe", () => {
    setFichierSituation({
      taille: 1,
      réseau: "fixe",
    });
    const result = engine.evaluate("fichier");
    expect(result.nodeValue).toBeCloseTo(2.19, 0);
  });

  test("Envoyer un fichier de 1 Go via une connexion mobile", () => {
    setFichierSituation({
      taille: 1,
      réseau: "mobile",
    });
    const result = engine.evaluate("fichier");
    expect(result.nodeValue).toBeCloseTo(11.38, 0);
  });
});
