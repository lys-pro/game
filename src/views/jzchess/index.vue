<!--
 * @Author: 李延送
 * @Date: 2022-06-22 16:34:33
 * @LastEditTime: 2022-06-23 17:41:24
 * @Description: Do not edit
-->
<template>
    <div class="content"
         v-on:keyup.enter="moveBox">
        <div class="title">
            井子棋
        </div>
        <div class="main">
            <canvas id="mycanvas"
                    class="mycanvas"
                    width="800"
                    height="800"
                    ref="mycanvas">
            </canvas>
            <!-- <div class="chessP">
                <div class="chessZ">
                    <div id="chess1"
                         @click="clickChess"></div>
                </div>
                <div class="chessZ">
                    <div id="chess2"
                         @click="clickChess"></div>
                </div>
                <div class="chessZ">
                    <div id="chess3"
                         @click="clickChess"></div>
                </div>
                <div class="chessZ">
                    <div id="chess4"
                         @click="clickChess"></div>
                </div>
                <div class="chessZ">
                    <div id="chess5"
                         @click="clickChess"></div>
                </div>
                <div class="chessZ">
                    <div id="chess6"
                         @click="clickChess"></div>
                </div>
                <div class="chessZ">
                    <div id="chess7"
                         @click="clickChess"></div>
                </div>
                <div class="chessZ">
                    <div id="chess8"
                         @click="clickChess"></div>
                </div>
                <div class="chessZ">
                    <div id="chess9"
                         @click="clickChess"></div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script lang="ts">
/** @type {HTMLCanvasElement} */
import { Component, Vue } from "vue-property-decorator";
@Component({
    name: "jzchess"
})
export default class extends Vue {
    private mycanvas: any = {};
    private ctx: any = {};
    private chess = 0;
    private step = 0;
    private record_chess: any[] = []; // 记录棋子
    private chess_type: any = [
        { name: "X", color: "rgb(40, 240, 247)" },
        { name: "O", color: "rgb(59, 243, 173)" }
    ];
    private onOff = false;

    private init() {
        // 实例化canvas
        this.mycanvas = this.$refs.mycanvas;
        // this.mycanvas = document.getElementById("mycanvas");
        this.ctx = this.mycanvas.getContext("2d");
        this.step = 700 / 3;
        this.drawChess();
        this.mycanvas.onclick = this.clickInit;
    }

    private clickInit(e: any) {
        // console.log(e);s
        if (this.onOff) return;
        let x = Math.floor((e.offsetX - 50) / this.step);
        let y = Math.floor((e.offsetY - 50) / this.step);
        if (!this.record_chess.includes(`${x}-${y}`)) {
            this.setText({ x, y });
            this.record_chess.push(x + "-" + y);

            if (this.record_chess.length >= 5) {
                if (this.judgeWins(x, y)) return;
            }
            this.chess ^= 1;
        }
    }

    // 胜利条件
    private winChess(x: any, y: any) {
        let wins: any[] = [[], [], [], []];
        for (var i = -2; i <= 2; i++) {
            // 横向
            if (x + i >= 0 && x + i < 3) wins[0].push(`${x + i}-${y}`);
            // 竖向
            if (y + i >= 0 && y + i < 3) wins[1].push(`${x}-${y + i}`);
            // 左上右下
            if (x + i >= 0 && x + i < 3 && y + i >= 0 && y + i < 3)
                wins[2].push(`${x + i}-${y + i}`);
            // 左下右上
            if (x + i >= 0 && x + i < 3 && y - i >= 0 && y - i < 3)
                wins[3].push(`${x + i}-${y - i}`);
        }
        return wins.filter(item => item.length >= 3);
    }

    // 判断输赢
    private judgeWins(x: any, y: any) {
        let chessArr = this.record_chess.filter((v, i) => i % 2 == this.chess);
        let wins: any[] = this.winChess(x, y);

        let state = wins.some(v => v.every((d: any) => chessArr.includes(d)));

        if (state) {
            setTimeout(() => {
                alert(this.chess_type[this.chess].name + "获胜");

                this.init();
            }, 100);
            this.onOff = true;
        }
        return state;
    }

    private setText(d: any) {
        let x = this.step / 2 + d.x * this.step + 50;
        let y = this.step / 2 + d.y * this.step + 80;
        this.ctx.beginPath();
        this.ctx.font = "100px Georgia";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = this.chess_type[this.chess].color;
        this.ctx.fillText(this.chess_type[this.chess].name, x, y);
        this.ctx.fillStyle = "rgb(40, 240, 247";
        this.ctx.stroke();
    }

    // 画棋盘
    private drawChess() {
        for (var i = 0; i < 4; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(50 + i * this.step, 50);
            this.ctx.lineTo(50 + i * this.step, 750);
            this.ctx.strokeStyle = "#fff";

            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(50, 50 + i * this.step);
            this.ctx.lineTo(750, 50 + i * this.step);
            this.ctx.strokeStyle = "#fff";
            this.ctx.stroke();
        }
    }

    private setBox(d: any, c: string) {
        let x = 50 + d.x * this.step + 5;
        let y = 50 + d.y * this.step + 5;
        let w = this.step - 10;
        this.ctx.beginPath();
        this.ctx.font = "50px Georgia";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "rgb(255, 255, 255,.6)";
        this.ctx.fillText("X", x, y);
        this.ctx.fillStyle = c;
        this.ctx.fillRect(x, y, w, w);

        this.ctx.stroke();
    }
    private clickChess(e: any) {
        e.target.style.display = "flex";
        e.target.style.background = this.chess
            ? "rgb(59, 243, 173)"
            : "rgb(40, 240, 247)";
        e.target.style.color = "#fff";
        e.target.innerHTML = this.chess ? "X" : "O";
        this.chess ^= 1;
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
        text-shadow: 0 1px 7px rgb(124, 123, 123);
    }
    .mycanvas {
        background: rgb(153, 152, 150);
        border-radius: 5px;
        box-shadow: 0 5px 10px #333;
    }

    .chessP {
        width: 40%;
        height: 0;
        // border: 1px solid rgb(40, 240, 247);
        margin: 0 auto;
        padding-bottom: 40%;
        display: flex;
        // justify-content: space-around;
        flex-wrap: wrap;
        .chessZ {
            width: calc(95% / 3);
            // height: calc(95% / 3);
            padding-bottom: calc(95% / 3);
            margin-right: calc(5% / 3);
            margin-bottom: calc(5% / 3);
            background-color: pink;
            box-shadow: 0 5px 10px #333;
            border-radius: 5px;
            cursor: pointer;
            transition: 1s;
            position: relative;
            div {
                position: absolute;
                width: 100%;
                height: 100%;
                display: none;
                justify-content: center;
                align-items: center;
            }
            &:hover {
                background-color: #ddd;
                transform: rotateY(360deg);
                div {
                    display: flex;
                }
            }
        }
    }
}
</style>