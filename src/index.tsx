import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App";
import { AnnouncementPopup, Application } from "./instancePoolExample";
import { BmpParser } from "./bmpParser";

// 1. react example

if (false) {
    const reactDom = ReactDOM.createRoot(document.getElementById("root")!);
    reactDom.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

// 2. instance pool example

if (false) {
    const app = new Application(document.body);

    const popup = new AnnouncementPopup(app);
    const popup2 = app.createPopupWindow(AnnouncementPopup);

    popup.dispose();
    app.disposePopupWindow(popup2);
}

// 3. bmp header parser example

if (false) (async() => {
    const bmp = await fetch("res/sample_640x426.bmp").then((response) => response.arrayBuffer());
    const bmpHeader = BmpParser.parseHeader(bmp);
    
    const bmpHeaderValues = Object.entries(bmpHeader).map(([key, value]) => `${key}: ${value}`);
    for (const line of bmpHeaderValues) {
        document.write(line + "<br>");
    }
})();
