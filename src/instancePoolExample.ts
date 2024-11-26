export type PopupWindowConstructor = new (app: Application) => PopupWindow;

export class Application {
    public readonly popupRoot: HTMLElement;
    private readonly _popupWindows: PopupWindow[];

    public constructor(rootElement: HTMLElement) {
        this.popupRoot = rootElement;
        this._popupWindows = [];
    }

    public createPopupWindow(ctor: PopupWindowConstructor): PopupWindow {
        const popup = new ctor(this);
        this._popupWindows.push(popup);
        return popup;
    }

    public disposePopupWindow(popup: PopupWindow): void {
        const index = this._popupWindows.indexOf(popup);
        if (index !== -1) {
            this._popupWindows.splice(index, 1);
            popup.dispose();
        }
    }
}

export class PopupWindow {
    protected _uiElement: HTMLElement;

    public constructor(app: Application) {
        const uiElement = this._uiElement = document.createElement("div");
        app.popupRoot.appendChild(uiElement);

        uiElement.style.position = "absolute";
        uiElement.style.left = "50%";
        uiElement.style.top = "50%";
        uiElement.style.transform = "translate(-50%, -50%)";

        uiElement.style.width = "300px";
        uiElement.style.height = "200px";
        uiElement.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        uiElement.style.color = "white";
        
        const popupTitleDiv = document.createElement("div");
        uiElement.appendChild(popupTitleDiv);
        popupTitleDiv.textContent = "Popup Window";
        popupTitleDiv.style.textAlign = "center";
        popupTitleDiv.style.padding = "10px";
        popupTitleDiv.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    }

    public dispose(): void {
        this._uiElement.remove();
    }
}

export class AnnouncementPopup extends PopupWindow {
    private _popupContentDiv: HTMLElement;

    public constructor(app: Application) {
        super(app);

        const popupContentDiv = this._popupContentDiv = document.createElement("div");
        this._uiElement.appendChild(popupContentDiv);
        popupContentDiv.style.padding = "10px";
    }

    public get content(): string {
        return this._popupContentDiv.textContent ?? "";
    }

    public set content(value: string) {
        this._popupContentDiv.textContent = value;
    }
}
