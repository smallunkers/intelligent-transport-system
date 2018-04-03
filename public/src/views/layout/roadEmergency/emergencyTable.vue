<template>
    <div class="emergency-table-wrapper">
        <el-table :data="emergencyTableData" empty-text="暂时没有数据呦~">
            <el-table-colmun></el-table-colmun>
            <el-table-colmun></el-table-colmun>
            <el-table-colmun></el-table-colmun>
            <el-table-colmun></el-table-colmun>
        </el-table>
    </div>
</template>

<script>
    import {Table} from 'element-ui';
    export  default {
        data () {
            return {
                emergencyTableData:[]
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .emergency-table-wrapper{
        width 100%;
    }
</style>