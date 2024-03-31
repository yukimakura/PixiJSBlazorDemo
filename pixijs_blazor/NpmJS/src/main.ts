import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport';

var viewport: Viewport;
var dotnetLister: any;

// ステージを作る
export function CreateApp(elem: HTMLDivElement) {
    console.log("call")
    // キャンバスサイズと背景色を指定してステージを作成
    const app = new PIXI.Application({
        width: 800,
        height: 600,
        backgroundColor: 0xcccccc // 背景色(= #cccccc)
    })
    elem.appendChild(app.view);
    return app
}


export function PixiApp(elem: HTMLDivElement, dotnet: any) {

    if (elem != null) {
        dotnetLister = dotnet;
        var app = CreateApp(elem as HTMLDivElement);
        // create viewport
        viewport = new Viewport({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            worldWidth: 1000,
            worldHeight: 1000,
            noTicker: true,
            passiveWheel: false,
            ticker: app.ticker,
            interaction: app.renderer.plugins.interaction
        })

        // add the viewport to the stage
        app.stage.addChild(viewport)

        // activate plugins
        viewport.drag().pinch().wheel().clampZoom();


    } else {
        console.error("elemがnullです")
    }
}


export function AddBox(id: number, typeName: string, x: number, y: number, width: number, height: number) {

    const sprite = viewport.addChild(new ManagedSprite(id, typeName, PIXI.Texture.WHITE))
    sprite.tint = 0xff0000
    sprite.width = width;
    sprite.height = height;
    sprite.position.set(x, y)

    sprite.interactive = true;
    sprite.on("click", onClick).on("touchstart", onClick);

}

class ManagedSprite extends PIXI.Sprite {
    public Id: number;
    public TypeName: string;

    constructor(id: number, typeName: string, texture: PIXI.Texture) {
        super(texture);
        this.Id = id;
        this.TypeName = typeName;
    }
}

async function onClick(e: any) {
    console.log("onClick e:", e);
    if (e.currentTarget instanceof ManagedSprite) {

        const sprite = e.currentTarget as ManagedSprite;
        sprite.tint = 0xff00ff

        await dotnetLister.invokeMethodAsync('OnObjectClick', JSON.stringify({ id: sprite.Id, typename: sprite.TypeName }));
    }
}