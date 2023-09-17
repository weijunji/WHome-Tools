<script setup lang="ts">
import { onMounted, ref, computed, reactive, UnwrapNestedRefs } from "vue";
import type { CSSProperties } from 'vue';
import type { TableColumnCtx } from 'element-plus'

const props = defineProps<{ data: string, width: number }>();

let width = ref(props.width);
let dataStr = ref(props.data);

let data: number[] = reactive([]);
let dataBin: number[][] = reactive([]);
let tableData: UnwrapNestedRefs<{[key: string]: string}[]> = reactive([{name: "title"}, {name: "bin"}, {name: "hex"}]);

const updateHex = (idx: number) => {
  let val = 0;
  const start = idx * 4;

  for (let i = 0; i < 4; i++) {
    const key = "val" + (start + i);
    val += (tableData[1][key] == "0" ? 0 : 1) << i;
  }
  tableData[2]["val" + (start + 3)] = "0x" + val.toString(16).toUpperCase();
}

onMounted(() => {
  data[0] = parseInt(dataStr.value);

  // header
  for (let i: number = 0; i < width.value; i++) {
    const key: string = "val" + i;
    tableData[0][key] = i.toString();
    tableData[2][key] = "0xF";
  }

  let binStr = (data[0] >>> 0).toString(2);
  if (binStr.length > width.value) {
    console.error("Length of BinStr too big");
  }
  for (let i = 0; i < binStr.length; i++) {
    const key: string = "val" + i;
    tableData[1][key] = binStr[binStr.length - i - 1];
  }
  for (let i = binStr.length; i < width.value; i++) {
    const key: string = "val" + i;
    tableData[1][key] = "0";
  }

  for (let i = 0; i < width.value / 4; i++) {
    updateHex(i);
  }
});

const getStyle = computed(
  (): CSSProperties => {
    let s = `${width.value * 45}px`;
    return {
      width: s,
    };
  }
);

interface SpanMethodProps {
  row: any
  column: TableColumnCtx<any>
  rowIndex: number
  columnIndex: number
}

const arraySpanMethod = ({row, column, rowIndex, columnIndex}: SpanMethodProps) => {
  if (rowIndex  === 2) {
    if (columnIndex % 4 === 0) {
      return [1, 4]
    } else {
      return [0, 0]
    }
  }
};

const dbclick = (row: any, column: any, cell: any, event: any) => {
  if (row.name == "bin") {
    const key = "val" + column.label;
    tableData[1][key] = tableData[1][key] == "0" ? "1" : "0";
    updateHex(Math.floor(column.label / 4));
  }
};
</script>

<template>
  <el-card class="box-card" shadow="hover">
    <p class="bv-card-title">{{ dataStr }}</p>
    <el-table
      v-for="i in data.length"
      :key="i"
      :data="tableData"
      size="small"
      border
      table-layout="auto"
      :style="getStyle"
      :show-header="false"
      :span-method="arraySpanMethod"
      @cell-dblclick="dbclick"
    >
      <el-table-column v-for="o in width" :key="o" :prop="'val' + (32 - o)" :label="(32 - o).toString()" width="45" align="center"/>
    </el-table>
  </el-card>
</template>

<style>
.bv-card-title {
  margin: 0 0 10px 5px;
  text-align: left;
}
</style>
