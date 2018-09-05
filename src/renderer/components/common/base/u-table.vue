<template>
    <table class="u-table" :class="{ auto }">
        <thead>
            <tr>
                <th v-for="(column,index) in columns" :style="column.style" :key="index">
                    <span type="7">{{column.label}}</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row,index) in list" :key="index" @click="rowItemClick(row)" class="ai-table-content ai-table-row">
                <slot :row="row" />
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'u-table',
    props: {
        list: Array,
        auto: Boolean
    },
    data() {
        return {
            columns: []
        }
    },
    components: {},
    computed: {},
    watch: {},
    methods: {
        rowItemClick(row) {
            this.$emit('row-click', row)
        }
    }
}
</script>

<style lang="scss">
.u-table {
    font-size: 12px;

    &.auto {
        width: 100%;
    } // 自适应
    th,
    td {
        padding: 15px 0; // 上下空出间隙
        &:first-child {
            // 表格左空出间隙
            padding-left: 32px;
        }
        &:last-child {
            // 表格右空出间隙
            padding-right: 32px;
        }
    }
    thead {
        // 表头
        tr {
            height: 50px;
        }
    }
    tbody {
        border: 1px solid #d5e4ed;
        border-radius: 4px;
        background-color: #ffffff;

        tr {
            cursor: pointer;
            border-bottom: 1px solid #d5e4ed;
            &:hover {
                background-color: #eff4fa;
            }
            &:last-child {
                border-bottom: none;
            }
        }
    }
}
</style>
