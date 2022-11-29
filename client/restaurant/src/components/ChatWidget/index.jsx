import React, { Component } from "react";
import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";

class KommunicateChat extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    (function (d, m) {
      /*---------------- Kommunicate settings start ----------------*/
      var defaultSettings = {
        defaultBotIds: ["restaurantbot-g9aud"], // Replace <BOT_ID> with your bot ID which you can find in bot section of dashboard
        defaultAssignee: "restaurantbot-g9aud", // Replace <BOT_ID> with your bot ID which you can find in bot section of dashboard
        skipRouting: true,
      };
      var kommunicateSettings = {
        appId: "3db7dec46f82481ff334b2537cf9d3bb1", // Replace <APP_ID> with your APP_ID which you can find in install section of dashboard
        automaticChatOpenOnNavigation: false,
        onInit: function () {
          Kommunicate.updateSettings(defaultSettings);
        },
      };
      /*----------------- Kommunicate settings end ------------------*/
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }
  render() {
    return <div></div>;
  }
}
export { KommunicateChat };
