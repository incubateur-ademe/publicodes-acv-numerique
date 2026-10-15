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
  }: {
    durée?: number;
    qualité?: "audio" | "SD" | "HD" | "ultra HD";
    emplacements?: number;
    réseau?: "fixe" | "mobile";
  }) => {
    const situation = {
      "visio . durée": durée,
      "visio . qualité": `'${qualité}'`,
      "visio . emplacements": emplacements,
      "visio . réseau": `'${réseau}'`,
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
    expect(result.nodeValue).toBeCloseTo(91.74, 0);
  });

  test("Participer à une visio de 1 heure en HD avec 2 appareils via une connexion mobile", () => {
    setVisioSituation({
      durée: 60,
      qualité: "HD",
      emplacements: 2,
      réseau: "mobile",
    });
    const result = engine.evaluate("visio");
    expect(result.nodeValue).toBeCloseTo(147.26, 0);
  });
});
