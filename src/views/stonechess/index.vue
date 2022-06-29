<!--
 * @Author: 李延送
 * @Date: 2022-06-29 15:44:41
 * @LastEditTime: 2022-06-29 15:55:54
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
export default class extends Vue {}
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
