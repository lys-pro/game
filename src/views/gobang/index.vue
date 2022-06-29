<!--
 * @Author: 李延送
 * @Date: 2022-06-15 18:00:25
 * @LastEditTime: 2022-06-17 17:44:57
 * @Description:  五 子 棋
-->
<template>
    <div class="content">
        <div class="title">
            五 子 棋
        </div>

        <div class="main">
            <canvas @click="playChess"
                    class="mycanvas"
                    ref="mycanvas"
                    width="800"
                    height="800"></canvas>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
    name: "gobang"
})
export default class extends Vue {
    /** @type {HTMLCanvasElement} */

    private chess = 0; // 当前棋子
    private chess_type: any[] = [
        // 棋子
        { name: "黑棋", color: "#333" },
        { name: "白棋", color: "#fff" }
    ];
    private myCanv: any = {}; // canvas实例
    private ctx: any = {};
    private step = 0; // 棋盘间隔
    private lineNum = 15; // 棋盘规模
    private record_chess: any[] = []; // 记录棋子
    private onOff = true;

    // 初始化
    init() {
        this.myCanv = this.$refs.mycanvas;
        this.ctx = this.myCanv.getContext("2d");
        this.step = 750 / this.lineNum;
        this.record_chess = [];
        this.onOff = true;
        this.chess = 0;
        this.ctx.clearRect(0, 0, 800, 800);
        this.drawQp();
    }

    // 画棋盘
    private drawQp() {
        for (var i = 0; i < this.lineNum; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(50 + i * this.step, 50);
            this.ctx.lineTo(50 + i * this.step, 750);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(50, 50 + i * this.step);
            this.ctx.lineTo(750, 50 + i * this.step);
            this.ctx.stroke();
        }

        // 中心点
        this.drawSpot(400, 400, "black", 5);
        this.drawSpot(200, 200, "black", 5);
        this.drawSpot(200, 600, "black", 5);
        this.drawSpot(600, 200, "black", 5);
        this.drawSpot(600, 600, "black", 5);
    }

    // 画点
    private drawSpot(x: number, y: number, c: string, r: number) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.fillStyle = c;
        this.ctx.fill();
        this.ctx.stroke();
    }

    // 下棋
    private playChess(e: any) {
        if (this.onOff) {
            let x: any = Math.round(e.offsetX / 50);
            let y: any = Math.round(e.offsetY / 50);
            // 判断棋子界限
            if (x > 0 && y > 0 && x < 16 && y < 16) {
                // 判断棋子是否存在
                if (!this.record_chess.includes(`${x}-${y}`)) {
                    this.drawSpot(
                        x * this.step,
                        y * this.step,
                        this.chess_type[this.chess].color,
                        20
                    );
                    this.record_chess.push(x + "-" + y);
                    // this.winChess(x, y);
                    if (this.record_chess.length > 8) {
                        if (this.judgeWins(x, y)) return;
                    }
                    this.chess ^= 1; // 反转棋子
                }
            }
        }
    }

    // 胜利条件
    private winChess(x: any, y: any) {
        let wins: any[] = [[], [], [], []];
        for (var i = -4; i <= 4; i++) {
            // 横向
            if (x + i > 0 && x + i < 16) wins[0].push(`${x + i}-${y}`);
            // 竖向
            if (y + i > 0 && y + i < 16) wins[1].push(`${x}-${y + i}`);
            // 左上右下
            if (x + i > 0 && x + i < 16 && y + i > 0 && y + i < 16)
                wins[2].push(`${x + i}-${y + i}`);
            // 左下右上
            if (x + i > 0 && x + i < 16 && y - i > 0 && y - i < 16)
                wins[3].push(`${x + i}-${y - i}`);
        }
        return wins.filter(item => item.length >= 5);
    }

    // 判断输赢
    private judgeWins(x: any, y: any) {
        let chessArr = this.record_chess.filter((v, i) => i % 2 == this.chess);
        let wins: any[] = [];

        this.winChess(x, y).forEach(item => {
            for (var i = 0; i < item.length - 4; i++) {
                wins.push(item.slice(i, i + 5));
            }
        });
        let state = wins.some(v => v.every((d: any) => chessArr.includes(d)));

        if (state) {
            setTimeout(() => {
                alert(this.chess_type[this.chess].name + "获胜");
                this.onOff = false;

                this.init();
            }, 100);
        }
        return state;
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
        background: rgb(238, 164, 90);
        border-radius: 5px;
        box-shadow: 0 5px 10px #333;
    }
}
</style>
