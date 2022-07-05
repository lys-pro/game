<!--
 * @Author: 李延送
 * @Date: 2022-06-29 15:44:41
 * @LastEditTime: 2022-07-01 16:18:39
 * @Description: Do not edit
-->
<template>
    <div class="content">
        <div class="title">
            石 头 棋
        </div>
        <div class="main">
            <canvas class="mycanvas"
                    ref="mycanvas"
                    width="800"
                    height="800"></canvas>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
    name: "stonechess"
})
export default class extends Vue {
    private myCanv: any = {};
    private ctx: any = {};
    private step = 0;
    private level: any = [
        // 棋自布局 1 子棋 2 母棋
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 2, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1]
    ];
    private fiveChess: any = {
        while: { name: "白棋", color: "#fff", data: [] },
        black: { name: "黑棋", color: "#333", data: [] }
    };
    private chees = 0; // 当前执棋

    // 初始化
    init() {
        this.myCanv = this.$refs.mycanvas;
        this.ctx = this.myCanv.getContext("2d");
        this.step = 700 / 4;

        this.drawBoard();
    }

    // 生成棋盘
    private drawBoard() {
        for (var i = 0; i < 5; i++) {
            this.drawLine(
                { x: 50 + i * this.step, y: 50 },
                { x: 50 + i * this.step, y: 750 }
            );
            this.drawLine(
                { x: 50, y: 50 + i * this.step },
                { x: 750, y: 50 + i * this.step }
            );
        }

        this.drawLine({ x: 50, y: 50 }, { x: 750, y: 750 });
        this.drawLine({ x: 50, y: 750 }, { x: 750, y: 50 });
        this.drawLine({ x: 50, y: 400 }, { x: 400, y: 50 });
        this.drawLine({ x: 50, y: 400 }, { x: 400, y: 750 });
        this.drawLine({ x: 400, y: 50 }, { x: 750, y: 400 });
        this.drawLine({ x: 400, y: 750 }, { x: 750, y: 400 });

        this.drawChess(2, 2, "#333", 10);
        this.drawChess(1, 1, "#333", 10);
        this.drawChess(3, 1, "#333", 10);
        this.drawChess(1, 3, "#333", 10);
        this.drawChess(3, 3, "#333", 10);
    }

    // 画线
    private drawLine(m: any, l: any) {
        this.ctx.beginPath();
        this.ctx.moveTo(m.x, m.y);
        this.ctx.lineTo(l.x, l.y);
        this.ctx.stroke();
    }

    // 生成棋子
    private drawChess(x: any, y: any, c: any, r: any) {
        let w = 50 + x * this.step;
        let h = 50 + y * this.step;

        this.ctx.beginPath();
        this.ctx.arc(w, h, r, 0, 2 * Math.PI);
        this.ctx.fillStyle = c;
        this.ctx.fill();
        this.ctx.stroke();
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
