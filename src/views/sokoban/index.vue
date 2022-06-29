<!--
 * @Author: 李延送
 * @Date: 2022-06-15 17:36:53
 * @LastEditTime: 2022-06-23 16:02:09
 * @Description: 推箱子
-->
<template>
    <div class="content"
         v-on:keyup.enter="moveBox">
        <div class="title">
            推 箱 子
        </div>
        <img id="wallimg"
             src="../../assets/img/wall.png">
        <img id="boximg"
             src="../../assets/img/box.png">
        <img id="leadimg"
             src="../../assets/img/lead.png">
        <img id="targetimg"
             src="../../assets/img/target.png">
        <div class="main">
            <canvas id="mycanvas"
                    class="mycanvas"
                    width="800"
                    height="800"
                    ref="mycanvas">

            </canvas>
        </div>
    </div>
</template>

<script lang="ts">
/** @type {HTMLCanvasElement} */
import { Component, Vue } from "vue-property-decorator";
import { level } from "./level";
@Component({
    name: "sokoban"
})
export default class extends Vue {
    private mycanvas: any = {};
    private ctx: any = {};
    private step = 0;
    private level_coor: any = []; // 关卡坐标
    private box_type: any = {};
    private key: any = ["wall", "box", "lead", "target"];
    private num = 0; // 关卡
    // 初始化
    private init() {
        // 实例化canvas
        this.mycanvas = this.$refs.mycanvas;
        // this.mycanvas = document.getElementById("mycanvas");
        this.ctx = this.mycanvas.getContext("2d");

        this.step = 800 / level[this.num].length;
        this.box_type = {
            // 障碍物类型
            wall: {
                name: "墙",
                color: "rgb(255, 167, 4)",
                data: [],
                img: "wallimg"
            }, // 1
            box: {
                name: "箱子",
                color: "rgb(192, 125, 18,.8)",
                data: [],
                img: "boximg"
            }, // 2
            lead: {
                name: "主角",
                color: "rgb(231, 84, 58)",
                data: [],
                img: "leadimg"
            }, // 3
            target: {
                name: "目标",
                color: "rgb(53, 218, 130)",
                data: [],
                img: "targetimg"
            } // 4
        };
        this.ctx.clearRect(0, 0, 800, 800);

        this.drawLine();
        // 生成关卡
        this.drawLevel();
        // console.log(this.mycanvas);
        // this.mycanvas.onclick = this.moveBox;
        document.onkeyup = this.moveBox;
    }

    private drawLine() {
        // console.log(level[this.num]);
        for (var i = 0; i <= level[this.num].length; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0 + i * this.step, 0);
            this.ctx.lineTo(0 + i * this.step, 800);
            this.ctx.strokeStyle = "#f5f6f8";

            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(0, 0 + i * this.step);
            this.ctx.lineTo(800, 0 + i * this.step);
            this.ctx.strokeStyle = "#f5f6f8";
            this.ctx.stroke();
        }
        // for (var v = 0; v < level[this.num].length; v++) {
        //     for (var j = 0; j < level[this.num].length; j++) {
        //         this.ctx.font = "16px Georgia";
        //         this.ctx.textAlign = "center";
        //         this.ctx.fillStyle = "rgb(255, 255, 255,.6)";

        //         this.ctx.fillText(
        //             v * level[this.num].length + j + 1,
        //             this.step / 2 + j * this.step,
        //             this.step / 2 + v * this.step
        //         );
        //     }
        // }
    }

    // 生成关卡
    private drawLevel() {
        // 初始化建筑位置
        for (var i = 0; i < level[this.num].length; i++) {
            for (var j = 0; j < level[this.num].length; j++) {
                let data = level[this.num][i][j];
                if (data == 1) {
                    // 墙
                    // this.box_type.wall.data.push(i * level[0].length + j + 1);
                    this.box_type.wall.data.push({ x: j, y: i });
                } else if (data == 2) {
                    // 箱子
                    // this.box_type.box.data.push(i * level[0].length + j + 1);
                    this.box_type.box.data.push({ x: j, y: i });
                } else if (data == 3) {
                    // 主角
                    // this.box_type.lead.data.push(i * level[0].length + j + 1);
                    this.box_type.lead.data.push({ x: j, y: i });
                } else if (data == 4) {
                    // 目标点
                    // this.box_type.target.data.push(i * level[0].length + j + 1);
                    this.box_type.target.data.push({ x: j, y: i });
                }
            }
        }
        this.drawBox();
        // this.box_type.wall.data.forEach((item: any) =>
        //     this.setBox(item, this.box_type.wall.color)
        // );
        // this.box_type.box.data.forEach((item: any) =>
        //     this.setBox(item, this.box_type.box.color)
        // );
        // this.box_type.lead.data.forEach((item: any) =>
        //     this.setBox(item, this.box_type.lead.color)
        // );
        // this.box_type.target.data.forEach((item: any) =>
        //     this.setCir(item, this.box_type.target.color)
        // );
        // console.log(this.box_type);
    }

    private drawBox() {
        this.key.forEach((v: any) => {
            if (v == "target") {
                this.box_type[v].data.forEach((item: any) => {
                    this.setCir(
                        item,
                        this.box_type[v].color,
                        this.box_type[v].img
                    );
                });
            } else {
                this.box_type[v].data.forEach((item: any) => {
                    this.setBox(
                        item,
                        this.box_type[v].color,
                        this.box_type[v].img
                    );
                });
            }
        });
    }

    // 生成物品
    private setBox(d: any, c: string, im: any) {
        let x = d.x * this.step + 5;
        let y = d.y * this.step + 5;
        let w = this.step - 10;
        let img = document.getElementById(im);
        this.ctx.drawImage(img, x, y, w, w);

        // console.log(img);
        // this.ctx.beginPath();
        // this.ctx.lineJoin = "round";
        // this.ctx.lineWidth = 20;
        // this.ctx.fillStyle = c;
        // this.ctx.fillRect(x, y, w, w);
        // this.ctx.stroke();
    }

    private setCir(d: any, c: string, im: any) {
        let x = d.x * this.step + 25;
        let y = d.y * this.step + 25;
        let r = this.step - 40;
        // let img = document.getElementById(im);
        // this.ctx.drawImage(img, x, y, r, r);
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.fillStyle = c;
        this.ctx.fill();
        this.ctx.closePath();
    }

    // 移动
    private moveBox(e: any) {
        let keyCode = e.keyCode;
        let data = this.moveNum(this.box_type.lead.data[0], keyCode);
        if (
            // 判断是否撞墙
            this.box_type.wall.data.some((item: any) => {
                return item.x == data.x && item.y == data.y;
            })
        )
            return;

        // 判断是否推箱子
        let bnext = null;
        let bstate = false;
        this.box_type.box.data.forEach((v: any, i: any) => {
            if (v.x == data.x && v.y == data.y) {
                // 判断箱子是否撞墙
                let d = this.moveNum(v, keyCode);
                bstate =
                    this.box_type.wall.data.some((item: any) => {
                        return item.x == d.x && item.y == d.y;
                    }) ||
                    this.box_type.box.data.some((item: any) => {
                        return item.x == d.x && item.y == d.y;
                    });
                bnext = i;
            }
        });
        if (bstate) return;
        this.move("box", keyCode, bnext);
        this.move("lead", keyCode, 0);

        // 重绘地图
        this.ctx.clearRect(0, 0, 800, 800);
        // this.drawLine();
        this.drawBox();

        if (this.judgeWins()) {
            setTimeout(() => {
                alert("恭喜完成！！！");
                this.num++;
                if (this.num == level.length) {
                    this.num = 0;
                    alert("后续关卡开发中....");
                }
                this.init();
            }, 100);
        }
    }

    private moveNum(d: any, key: any) {
        let data = { ...d };
        switch (key) {
            // 上 38
            case 38:
            case 87:
                data.y -= 1;
                break;
            // 下 40
            case 40:
            case 83:
                data.y += 1;
                break;
            // 左 37
            case 37:
            case 65:
                data.x -= 1;
                break;
            // 右 39
            case 39:
            case 68:
                data.x += 1;
                break;
        }
        return { ...data };
    }

    private move(who: any, key: any, id: any) {
        let data = { ...this.box_type[who].data[id] };
        data = this.moveNum(data, key);

        this.box_type[who].data[id] = { ...data };
    }

    // 判断成功
    private judgeWins() {
        return this.box_type.target.data.every((item: any) =>
            this.box_type.box.data.some(
                (v: any) => v.x == item.x && v.y == item.y
            )
        );
    }

    mounted() {
        this.init();
    }
}
</script>

<style scoped lang="scss">
.content {
    .title {
        margin-bottom: 20px;
        font-size: 25px;
        color: #000;
        font-weight: bold;
        // text-shadow: 0 1px 7px rgb(124, 123, 123);
        text-shadow: 0 1px 7px rgb(255, 167, 4);
    }
    .mycanvas {
        background-color: #555555;
        border-radius: 5px;
    }
}
</style>
