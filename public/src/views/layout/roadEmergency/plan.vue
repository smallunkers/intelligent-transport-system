<template>
    <div class="plan-wrapper">
        <el-row>
            <el-col :span="20" :offset="2">
                <div></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {Col, Row ,Table, TableColumn} from 'element-ui';
    export default {
        data () {
            return{

            }
        },
        components: {
            Col, Row, Table, TableColumn
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .plan-wrapper{
        min-height 100%;
        width 100%;
    }
</style>