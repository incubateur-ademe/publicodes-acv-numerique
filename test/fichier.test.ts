import Engine from "publicodes";
import { describe, expect, test } from "vitest";
import rules from "../publicodes-build/index.js";

describe("Envoi d'un fichier", () => {
  const engine = new Engine(rules);

  const setFichierSituation = ({
    taille = 1,
    réseau = "fixe",
    appareil = "ordinateur et écran",
  }: {
    taille?: number;
    réseau?: string;
    appareil?: string;
  }) => {
    const situation = {
      "fichier . taille": taille,
      "fichier . réseau": `'${réseau}'`,
      "fichier . appareil": `'${appareil}'`,
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
    expect(result.nodeValue).toBeCloseTo(12.49, 0);
  });

  test.each([
    {
      réseau: "fixe",
      appareil: "ordinateur et écran",
      taille: 1,
      attendu: 1.761941231364613,
    },
    {
      réseau: "fixe",
      appareil: "ordinateur portable",
      taille: 1.5,
      attendu: 2.2438396530163214,
    },
    {
      réseau: "fixe",
      appareil: "tablette",
      taille: 2,
      attendu: 3.57783855166125,
    },
    {
      réseau: "fixe",
      appareil: "smartphone",
      taille: 2.5,
      attendu: 3.3652925055123326,
    },
    {
      réseau: "fixe",
      appareil: "moyenne",
      taille: 3,
      attendu: 4.555434821952925,
    },
    {
      réseau: "mobile",
      appareil: "ordinateur et écran",
      taille: 3.5,
      attendu: 43.718538478658154,
    },
    {
      réseau: "mobile",
      appareil: "ordinateur portable",
      taille: 4,
      attendu: 47.061700746295905,
    },
    {
      réseau: "mobile",
      appareil: "tablette",
      taille: 4.5,
      attendu: 56.540643654643375,
    },
    {
      réseau: "mobile",
      appareil: "smartphone",
      taille: 5,
      attendu: 56.78472457187966,
    },
    {
      réseau: "mobile",
      appareil: "moyenne",
      taille: 5.5,
      attendu: 65.04861610575826,
    },
  ])(
    "Envoyer un fichier de $taille Go via une connexion $réseau sur $appareil",
    ({ réseau, appareil, taille, attendu }) => {
      setFichierSituation({
        taille,
        réseau,
        appareil,
      });
      const result = engine.evaluate("fichier");
      expect(result.nodeValue).toBeCloseTo(attendu, 5);
    },
  );
});
