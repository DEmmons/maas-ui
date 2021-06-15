import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import UbuntuImages from "./UbuntuImages";

import { BootResourceSourceType } from "app/store/bootresource/types";
import { rootState as rootStateFactory } from "testing/factories";

const mockStore = configureStore();

describe("UbuntuImages", () => {
  it("shows the default source images by default", () => {
    const state = rootStateFactory();
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <UbuntuImages />
      </Provider>
    );
    expect(wrapper.find("DefaultSource").exists()).toBe(true);

    wrapper.find("input[id='custom-source']").simulate("change", {
      target: { name: "source-type", value: BootResourceSourceType.CUSTOM },
    });
    expect(wrapper.find("DefaultSource").exists()).toBe(false);
  });

  it("shows the custom source form if custom is selected", () => {
    const state = rootStateFactory();
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <UbuntuImages />
      </Provider>
    );
    expect(wrapper.find("CustomSourceConnect").exists()).toBe(false);

    wrapper.find("input[id='custom-source']").simulate("change", {
      target: { name: "source-type", value: BootResourceSourceType.CUSTOM },
    });
    expect(wrapper.find("CustomSourceConnect").exists()).toBe(true);
  });
});