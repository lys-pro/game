<!--
 * @Author: 李延送
 * @Date: 2022-06-15 17:36:53
 * @LastEditTime: 2022-06-29 17:58:10
 * @Description: 五 子 棋
-->
<template>
    <div class="content">
        <div class="card"
             v-for="(item,i) in data"
             :key="i"
             :class="item.bg"
             @click="routePage(item.id)">
            {{item.name}}
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
    name: "home"
})
export default class extends Vue {
    private data: any[] = [
        {
            name: "五 子 棋",
            id: 1,
            bg: "bg1"
        },
        {
            name: "推 箱 子",
            id: 2,
            bg: "bg2"
        },
        {
            name: "石 头 棋",
            id: 3,
            bg: "bg3"
        },
        {
            name: "井 子 棋",
            id: 4,
            bg: "bg4"
        },
        {
            name: "贪 吃 蛇",
            id: 5,
            bg: "bg5"
        }
    ];
    private routePage(num: number) {
        switch (num) {
            case 1:
                this.$router.push({ name: "gobang" });
                break;
            case 2:
                this.$router.push({ name: "sokoban" });
                break;
            case 3:
                this.$router.push({ name: "stonechess" });
                break;
            case 4:
                this.$router.push({ name: "jzchess" });
                break;
        }
    }
}
</script>

<style scoped lang="scss">
.content {
    width: 800px;
    margin: 50px auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .card {
        width: 30%;
        height: 200px;
        border: 1px solid #f5f6f8;
        border-radius: 10px;
        cursor: pointer;
        box-shadow: 0 5px 10px #333;
        text-align: center;
        line-height: 200px;
        font-size: 25px;
        font-weight: bold;
        color: #fff;
        text-shadow: 0 5px 10px #333;
        transition: 0.5s;
        margin-bottom: 20px;
        &:hover {
            background: rgba(65, 215, 235, 0.5);
            transform: scale(1.1);
        }
    }
    .bg1 {
        background: rgb(235, 150, 65);
    }
    .bg2 {
        background: rgb(176, 235, 65);
    }
    .bg3 {
        background: rgb(65, 181, 235);
    }
    .bg4 {
        background: rgb(65, 235, 184);
    }
}
</style>
