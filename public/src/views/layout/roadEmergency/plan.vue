<template>
    <div class="plan-wrapper">
        <el-row>
            <el-col :span="20" :offset="2">
                <div class="road-table-n-header table-header">杭州市近期预计封锁路段</div>
                <el-table :data="getRoadEmergency.plan.roadN" height="250" text-align="center">
                    <el-table-column prop="name" label="路段名称" min-width="18%"></el-table-column>
                    <el-table-column prop="startTime" label="起始时间" min-width="18%"></el-table-column>
                    <el-table-column prop="time" label="持续时间" min-width="18%"></el-table-column>
                    <el-table-column prop="reason" label="原因" min-width="32%"></el-table-column>
                    <el-table-column prop="status" label="事件态势" min-width="14%"></el-table-column>
                </el-table>
                <div class="road-table-y-header table-header">杭州市已封锁路段</div>
                <el-table height="250" :data="getRoadEmergency.plan.roadY">
                    <el-table-column prop="name" label="路段名称" min-width="18%"></el-table-column>
                    <el-table-column prop="startTime" label="起始时间" min-width="18%"></el-table-column>
                    <el-table-column prop="endTime" label="结束时间" min-width="18%"></el-table-column>
                    <el-table-column prop="reason" label="原因" min-width="32%"></el-table-column>
                    <el-table-column prop="influence" label="交通影响" min-width="14%"></el-table-column>
                </el-table>
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
        },
        computed:{
            getRoadEmergency () {
                return this.$store.getters['getRoadEmergency'];
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .plan-wrapper{
        min-height 100%;
        width 100%;
        .table-header{
            text-align center;
            height 40px;
            font-weight bold;
            line-height 40px;
            font-size 15px;
            color #606266;
        }
    }
</style>