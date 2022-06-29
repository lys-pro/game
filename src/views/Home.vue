<!--
 * @Author: 李延送
 * @Date: 2022-06-15 17:35:20
 * @LastEditTime: 2022-06-21 09:24:17
 * @Description: Do not edit
-->
<template>
    <div class="home">
        <vue-ueditor-wrap v-model="data"
                          :config="myConfig"></vue-ueditor-wrap>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueUeditorWrap from "vue-ueditor-wrap"; // @ is an alias to /src

export default Vue.extend({
    name: "Home",
    components: {
        VueUeditorWrap
    },
    data() {
        return {
            data: "",
            myConfig: {
                // 设置编辑器不自动被内容撑高
                autoHeightEnabled: false,
                // 初始容器高度
                initialFrameHeight: 320,
                // 初始容器宽度
                initialFrameWidth: "1000",
                // 可以放后台存放路径
                serverUrl: "",
                // UEditor 是文件的存放路径，
                UEDITOR_HOME_URL: "/UEditor/"
            }
        };
    }
});
</script>
