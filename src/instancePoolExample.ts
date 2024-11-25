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
    private _someUiElement: HTMLElement;

    public constructor(app: Application) {
        this._someUiElement = document.createElement("div");
        app.popupRoot.appendChild(this._someUiElement);
    }

    public dispose(): void {
        this._someUiElement.remove();
    }
}

export class AnnouncementPopup extends PopupWindow {
    public constructor(app: Application) {
        super(app);
    }
}
