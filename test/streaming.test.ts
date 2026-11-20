import Engine from "publicodes";
import { describe, expect, test } from "vitest";
import rules from "../publicodes-build/index.js";

describe("Visionnage d'une vidéo en streaming", () => {
  const engine = new Engine(rules);

  const setStreamingSituation = ({
    durée = 60,
    qualité = "HD",
    réseau = "fixe",
    appareil = "moyenne",
  }: {
    durée?: number;
    qualité?: string;
    réseau?: string;
    appareil?: string;
  }) => {
    const situation = {
      "streaming . durée": durée,
      "streaming . qualité": `'${qualité}'`,
      "streaming . réseau": `'${réseau}'`,
      "streaming . appareil": `'${appareil}'`,
    };
    engine.setSituation(situation, { keepPreviousSituation: false });
  };

  test("Regarder 1 heure de streaming en HD via une connexion fixe", () => {
    setStreamingSituation({
      durée: 60,
      qualité: "HD",
      réseau: "fixe",
    });
    const result = engine.evaluate("streaming");
    expect(result.nodeValue).toBeCloseTo(63.32, 0);
  });

  test("Regarder 1 heure de streaming en HD via une connexion mobile", () => {
    setStreamingSituation({
      durée: 60,
      qualité: "HD",
      réseau: "mobile",
    });
    const result = engine.evaluate("streaming");
    expect(result.nodeValue).toBeCloseTo(92.29, 0);
  });

  test.each([
    {
      réseau: "fixe",
      appareil: "ordinateur et écran",
      durée: 45,
      qualité: "HD",
      attendu: 59.34977706431467,
    },
    {
      réseau: "fixe",
      appareil: "ordinateur portable",
      durée: 60,
      qualité: "ultra HD",
      attendu: 48.0229829505798,
    },
    {
      réseau: "fixe",
      appareil: "tablette",
      durée: 75,
      qualité: "SD",
      attendu: 100.01420825038238,
    },
    {
      réseau: "fixe",
      appareil: "smartphone",
      durée: 90,
      qualité: "HD",
      attendu: 34.49514772379437,
    },
    {
      réseau: "fixe",
      appareil: "TV",
      durée: 105,
      qualité: "ultra HD",
      attendu: 152.77232565004246,
    },
    {
      réseau: "fixe",
      appareil: "videoprojecteur",
      durée: 120,
      qualité: "SD",
      attendu: 122.65350893881578,
    },
    {
      réseau: "fixe",
      appareil: "smart TV",
      durée: 135,
      qualité: "HD",
      attendu: 152.39288680810614,
    },
    {
      réseau: "fixe",
      appareil: "moyenne",
      durée: 150,
      qualité: "ultra HD",
      attendu: 170.31040562446424,
    },
    {
      réseau: "mobile",
      appareil: "ordinateur et écran",
      durée: 165,
      qualité: "SD",
      attendu: 227.91886338657594,
    },
    {
      réseau: "mobile",
      appareil: "ordinateur portable",
      durée: 180,
      qualité: "HD",
      attendu: 216.57846279685873,
    },
    {
      réseau: "mobile",
      appareil: "tablette",
      durée: 195,
      qualité: "ultra HD",
      attendu: 505.7947331921074,
    },
    {
      réseau: "mobile",
      appareil: "smartphone",
      durée: 210,
      qualité: "SD",
      attendu: 93.60160512314837,
    },
    {
      réseau: "mobile",
      appareil: "TV",
      durée: 225,
      qualité: "HD",
      attendu: 418.0061616814901,
    },
    {
      réseau: "mobile",
      appareil: "videoprojecteur",
      durée: 240,
      qualité: "ultra HD",
      attendu: 547.7781461743862,
    },
    {
      réseau: "mobile",
      appareil: "smart TV",
      durée: 255,
      qualité: "SD",
      attendu: 303.77607068870134,
    },
    {
      réseau: "mobile",
      appareil: "moyenne",
      durée: 270,
      qualité: "HD",
      attendu: 415.32300104171463,
    },
  ])(
    "Regarder $durée minutes de streaming en $qualité via une connexion $réseau sur $appareil",
    ({ réseau, appareil, durée, qualité, attendu }) => {
      setStreamingSituation({
        durée,
        qualité,
        réseau,
        appareil,
      });
      const result = engine.evaluate("streaming");
      expect(result.nodeValue).toBeCloseTo(attendu, 5);
    },
  );
});
