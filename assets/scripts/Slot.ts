import { _decorator, Component, Node, Vec3, systemEvent, SystemEvent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Slot')
export class Slot extends Component {

    @property(Node)
    Slot: Node = null!;

    @property(Node)
    Reel: Node = null!;

    @property
    positionTop = -591.104

    @property
    positionBottom = 569.519

    @property
    speed = 10

    @property
    spinner = 0

    protected onLoad(): void {
        systemEvent.on(SystemEvent.EventType.MOUSE_DOWN, (event) =>{
            this.isClick = true;
        })
    }

    start() {
        this.positionCurrent = this.Reel.position.y;
        this.isClick = false;
    }


    update(deltaTime: number) {
        console.log("spinner: ",this.spinner)
        console.log("speed: ",this.speed)
        console.log("click: ",this.isClick)
        if(this.isClick) {
            if (this.positionCurrent <= this.positionBottom) {
                const newPositionY = (this.positionCurrent += Number(this.speed));
                this.Reel.position = new Vec3(0, newPositionY, 0);
            } else {
                this.positionCurrent = this.positionTop;
            }
            this.startSpin();
        }
    }

    startSpin() {
        this.spinner += 1;
        if (this.spinner <= 10) {
            console.log('HI')
            if (this.speed < 35) {
                this.speed += 1;
            } else {
                this.speed = 35;
            }
        }

        if (this.spinner >= 500) {
            console.log('HI2')
            if (this.speed > 0) {
                this.speed -= 0.5;
            } else {
                this.speed = 0;
                this.isClick = false;
                this.spinner = 0;
            }
        }
    }
}
