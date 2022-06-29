<!--
 * @Author: 李延送
 * @Date: 2022-06-29 15:44:41
 * @LastEditTime: 2022-06-29 15:49:15
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
</style>
