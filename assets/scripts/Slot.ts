import { _decorator, Component, Node, Vec3, systemEvent, SystemEvent } from 'cc';
const { ccclass, property } = _decorator;
import _ from "lodash/fp"

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
    speed = 20

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
                const newPositionY = (this.positionCurrent += Number(this.speed) * Math.random());
                this.Reel.position = new Vec3(0, newPositionY, 0);
            } else {
                this.positionCurrent = this.positionTop;
            }
            this.startSpin();
        }
    }

    startSpin() {
        this.spinner += 1;
        if (this.spinner < 10) {
            console.log('HI')
            if (this.speed < 35) {
            console.log('HI2')
                this.speed += 1;
            } else {
            console.log('HI3')
                this.speed = 35;
            }
        }

        if (this.spinner >= 500) {
            console.log('HI2')
            if (this.speed > 0) {
                this.speed -= 0.5;
            } else {
                this.checkSlot(this.Reel.position.y)
                this.speed = 0;
                this.isClick = false;
                this.spinner = 0;
            }
        }
    }

    checkSlot(position: number){
        const Slot = [
            {
                face:"Diamond",
                position: -581
            },
            {
                face:"Drowd",
                position: -417
            },
            {
                face:"WaterMalon",
                position: -249
            },
            {
                face:"Bar",
                position: -88
            },
            {
                face:"Seven",
                position: 77
            },
            {
                face:"Cherry",
                position: 245
            },
            {
                face:"Lemon  ",
                position: 414
            },
            {
                face:"Diamond2",
                position: 569
            },
        ]

        const nearbyValue = 100
        const nearbyObject =[];
        for (let i = 0; i < Slot.length; i++){
            const currentPosition = Slot[i].position;
            const diff = Math.abs(currentPosition - position)

            if (diff <= nearbyValue){
                nearbyObject.push(Slot[i])
            }
        }

        console.log("nearbyObject:",nearbyObject)
        console.log("nearbyObject:",nearbyObject[0].position)
        if(nearbyObject.length <= 1){
            console.log("new Position")
            this.Reel.position = new Vec3(0, nearbyObject[0].position, 0);
        }else{
            console.log("nearbyObject 2")
        }
    }
}
