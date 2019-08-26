import componentsToDisable from "./componentsToDisable";

describe("componentsToDisable selectors", () => {
  describe("get", () => {
    it("returns componentsToDisable", () => {
      const data = ["restricted", "universe", "multiverse"];
      const state = {
        general: {
          componentsToDisable: {
            loading: false,
            loaded: true,
            data
          }
        }
      };
      expect(componentsToDisable.get(state)).toStrictEqual(data);
    });
  });

  describe("loading", () => {
    it("returns componentsToDisable loading state", () => {
      const data = ["restricted", "universe", "multiverse"];
      const state = {
        general: {
          componentsToDisable: {
            loading: true,
            loaded: false,
            data
          }
        }
      };
      expect(componentsToDisable.loading(state)).toStrictEqual(true);
    });
  });

  describe("loaded", () => {
    it("returns componentsToDisable loaded state", () => {
      const data = ["restricted", "universe", "multiverse"];
      const state = {
        general: {
          componentsToDisable: {
            loading: false,
            loaded: true,
            data
          }
        }
      };
      expect(componentsToDisable.loaded(state)).toStrictEqual(true);
    });
  });
});
