import { createApp } from "vue";
import lvButton from "lightvue/button";
import lvRangeSlider from "lightvue/range-slider";
import lvCard from "lightvue/card";
import lvBadge from "lightvue/badge";

import "./style.css";
import App from "./App.vue";

createApp(App)
  .component("LvButton", lvButton)
  .component("LvRangeSlider", lvRangeSlider)
  .component("LvCard", lvCard)
  .component("LvBadge", lvBadge)
  .mount("#app");
