import Engine from "publicodes";
import { describe, expect, test } from "vitest";
import rules from "../publicodes-build/index.js";

describe("Visionnage d'une vidéo en streaming", () => {
  const engine = new Engine(rules);

  const setStreamingSituation = ({
    durée = 60,
    qualité = "HD",
    réseau = "fixe",
  }: {
    durée?: number;
    qualité?: "SD" | "HD" | "ultra HD";
    réseau?: "fixe" | "mobile";
  }) => {
    const situation = {
      "streaming . durée": durée,
      "streaming . qualité": `'${qualité}'`,
      "streaming . réseau": `'${réseau}'`,
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
    expect(result.nodeValue).toBeCloseTo(66.49, 0);
  });

  test("Regarder 1 heure de streaming en HD via une connexion mobile", () => {
    setStreamingSituation({
      durée: 60,
      qualité: "HD",
      réseau: "mobile",
    });
    const result = engine.evaluate("streaming");
    expect(result.nodeValue).toBeCloseTo(94.25, 0);
  });
});
