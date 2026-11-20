import Engine from "publicodes";
import { describe, expect, test } from "vitest";
import rules from "../publicodes-build/index.js";

describe("Participation à une visioconférence", () => {
  const engine = new Engine(rules);

  const setVisioSituation = ({
    durée = 60,
    qualité = "HD",
    emplacements = 2,
    réseau = "fixe",
    appareil = "moyenne",
  }: {
    durée?: number;
    qualité?: string;
    emplacements?: number;
    réseau?: string;
    appareil?: string;
  }) => {
    const situation = {
      "visio . durée": durée,
      "visio . qualité": `'${qualité}'`,
      "visio . emplacements": emplacements,
      "visio . réseau": `'${réseau}'`,
      "visio . appareil": `'${appareil}'`,
    };
    engine.setSituation(situation, { keepPreviousSituation: false });
  };

  test("Participer à une visio de 1 heure en HD avec 2 appareils via une connexion fixe", () => {
    setVisioSituation({
      durée: 60,
      qualité: "HD",
      emplacements: 2,
      réseau: "fixe",
    });
    const result = engine.evaluate("visio");
    expect(result.nodeValue).toBeCloseTo(86.67, 0);
  });

  test("Participer à une visio de 1 heure en HD avec 2 appareils via une connexion mobile", () => {
    setVisioSituation({
      durée: 60,
      qualité: "HD",
      emplacements: 2,
      réseau: "mobile",
    });
    const result = engine.evaluate("visio");
    expect(result.nodeValue).toBeCloseTo(144.62, 0);
  });

  test.each([
    {
      réseau: "fixe",
      appareil: "ordinateur et écran",
      durée: 40,
      qualité: "HD",
      emplacements: 3,
      attendu: 158.4988068481331,
    },
    {
      réseau: "fixe",
      appareil: "ordinateur portable",
      durée: 50,
      qualité: "ultra HD",
      emplacements: 4,
      attendu: 160.46450096297818,
    },
    {
      réseau: "fixe",
      appareil: "tablette",
      durée: 60,
      qualité: "SD",
      emplacements: 5,
      attendu: 400.6386696930977,
    },
    {
      réseau: "fixe",
      appareil: "smartphone",
      durée: 70,
      qualité: "HD",
      emplacements: 6,
      attendu: 161.79192741256918,
    },
    {
      réseau: "fixe",
      appareil: "TV",
      durée: 80,
      qualité: "ultra HD",
      emplacements: 7,
      attendu: 815.8718319578203,
    },
    {
      réseau: "fixe",
      appareil: "moyenne",
      durée: 90,
      qualité: "SD",
      emplacements: 8,
      attendu: 486.8304056754501,
    },
    {
      réseau: "mobile",
      appareil: "ordinateur et écran",
      durée: 100,
      qualité: "HD",
      emplacements: 9,
      attendu: 1623.3852860003021,
    },
    {
      réseau: "mobile",
      appareil: "ordinateur portable",
      durée: 110,
      qualité: "ultra HD",
      emplacements: 10,
      attendu: 2130.094680030952,
    },
    {
      réseau: "mobile",
      appareil: "tablette",
      durée: 120,
      qualité: "SD",
      emplacements: 11,
      attendu: 1906.035780599567,
    },
    {
      réseau: "mobile",
      appareil: "smartphone",
      durée: 130,
      qualité: "HD",
      emplacements: 12,
      attendu: 1354.324784716717,
    },
    {
      réseau: "mobile",
      appareil: "TV",
      durée: 140,
      qualité: "ultra HD",
      emplacements: 13,
      attendu: 4715.694965696482,
    },
    {
      réseau: "mobile",
      appareil: "moyenne",
      durée: 150,
      qualité: "SD",
      emplacements: 14,
      attendu: 1647.7809796555691,
    },
  ])(
    "Participer à une visio de $durée minutes en $qualité avec $emplacements appareils via une connexion $réseau sur $appareil",
    ({ réseau, appareil, durée, qualité, emplacements, attendu }) => {
      setVisioSituation({
        durée,
        qualité,
        emplacements,
        réseau,
        appareil,
      });
      const result = engine.evaluate("visio");
      expect(result.nodeValue).toBeCloseTo(attendu, 5);
    },
  );
});
