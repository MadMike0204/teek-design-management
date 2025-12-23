/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { computed, reactive, ref } from "vue";
import { ElDialog } from "element-plus";
import { useNamespace } from "@/composables";
import { useErrorLogStore } from "@/pinia";
const ns = useNamespace("error-log");
const errorStore = useErrorLogStore();
const dialogErrorStackVisible = ref(false);
let clickCurrentRow = reactive({
    id: "",
    error: undefined,
    info: "",
    url: "",
    hasRead: false,
});
const errorLogs = computed(() => errorStore.errorLogs);
const getViewTime = (timestamp) => {
    if (!timestamp)
        return;
    const date = new Date(timestamp);
    const Y = date.getFullYear();
    const M = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    const D = date.getDate();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
};
/**
 * 删除全部错误日志
 */
const clearAll = () => {
    errorStore.clearErrorLog();
};
/**
 * 查看一条错误日志
 */
const handleClick = (row) => {
    clickCurrentRow = row;
    dialogErrorStackVisible.value = true;
    errorStore.readOneErrorLog(row.id);
};
/**
 * 删除一条错误日志
 */
const handleDelete = (row) => {
    errorStore.deleteOneErrorLog(row);
};
/**
 * 添加一条错误日志
 */
const addErrorLog = () => {
    const letters = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
    ];
    const letter = letters[Math.floor(Math.random() * letters.length)];
    const errorMessage = letter + " is not undefined";
    throw new Error(errorMessage);
};
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: ([__VLS_ctx.ns.b(), __VLS_ctx.ns.join('card-minimal')]) },
});
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.elAlert | typeof ___VLS_components.ElAlert} */
elAlert;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    title: "注意：错误日志不会在浏览器持久化存储，刷新页面即会丢失，如果需要，请在生产环境接入后端持久化存储",
    type: "warning",
    closable: (false),
}));
const __VLS_2 = __VLS_1({
    title: "注意：错误日志不会在浏览器持久化存储，刷新页面即会丢失，如果需要，请在生产环境接入后端持久化存储",
    type: "warning",
    closable: (false),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ style: {} },
});
let __VLS_5;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    ...{ 'onClick': {} },
    type: "success",
}));
const __VLS_7 = __VLS_6({
    ...{ 'onClick': {} },
    type: "success",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
let __VLS_10;
const __VLS_11 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.errorStore.readAllErrorLogs(true);
            // @ts-ignore
            [ns, ns, errorStore,];
        } });
const { default: __VLS_12 } = __VLS_8.slots;
// @ts-ignore
[];
var __VLS_8;
var __VLS_9;
let __VLS_13;
/** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
elButton;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_15 = __VLS_14({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
let __VLS_18;
const __VLS_19 = ({ click: {} },
    { onClick: (__VLS_ctx.addErrorLog) });
const { default: __VLS_20 } = __VLS_16.slots;
// @ts-ignore
[addErrorLog,];
var __VLS_16;
var __VLS_17;
let __VLS_21;
/** @ts-ignore @type {typeof ___VLS_components.elPopconfirm | typeof ___VLS_components.ElPopconfirm} */
elPopconfirm;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    ...{ 'onConfirm': {} },
    placement: "right",
    title: "您确定删除全部日志吗？",
}));
const __VLS_23 = __VLS_22({
    ...{ 'onConfirm': {} },
    placement: "right",
    title: "您确定删除全部日志吗？",
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
let __VLS_26;
const __VLS_27 = ({ confirm: {} },
    { onConfirm: (__VLS_ctx.clearAll) });
const { default: __VLS_28 } = __VLS_24.slots;
{
    const { reference: __VLS_29 } = __VLS_24.slots;
    let __VLS_30;
    /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
        type: "danger",
        disabled: (__VLS_ctx.errorLogs.length === 0),
    }));
    const __VLS_32 = __VLS_31({
        type: "danger",
        disabled: (__VLS_ctx.errorLogs.length === 0),
    }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    const { default: __VLS_35 } = __VLS_33.slots;
    // @ts-ignore
    [clearAll, errorLogs,];
    var __VLS_33;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_24;
var __VLS_25;
let __VLS_36;
/** @ts-ignore @type {typeof ___VLS_components.elTable | typeof ___VLS_components.ElTable} */
elTable;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    data: (__VLS_ctx.errorLogs),
    border: true,
}));
const __VLS_38 = __VLS_37({
    data: (__VLS_ctx.errorLogs),
    border: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
const { default: __VLS_41 } = __VLS_39.slots;
let __VLS_42;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
    type: "index",
    label: "#",
    width: "50",
}));
const __VLS_44 = __VLS_43({
    type: "index",
    label: "#",
    width: "50",
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
let __VLS_47;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47({
    prop: "error.name",
    label: "名字",
    width: "220px",
}));
const __VLS_49 = __VLS_48({
    prop: "error.name",
    label: "名字",
    width: "220px",
}, ...__VLS_functionalComponentArgsRest(__VLS_48));
let __VLS_52;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
    prop: "error.message",
    label: "信息",
    width: "280px",
}));
const __VLS_54 = __VLS_53({
    prop: "error.message",
    label: "信息",
    width: "280px",
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
let __VLS_57;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
    prop: "url",
    label: "URL",
    width: "380px",
}));
const __VLS_59 = __VLS_58({
    prop: "url",
    label: "URL",
    width: "380px",
}, ...__VLS_functionalComponentArgsRest(__VLS_58));
let __VLS_62;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({
    prop: "info",
    label: "位置",
}));
const __VLS_64 = __VLS_63({
    prop: "info",
    label: "位置",
}, ...__VLS_functionalComponentArgsRest(__VLS_63));
const { default: __VLS_67 } = __VLS_65.slots;
{
    const { default: __VLS_68 } = __VLS_65.slots;
    const [{ row }] = __VLS_getSlotParameters(__VLS_68);
    if (row.vm && row.vm.$vnode) {
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        (row.vm.$vnode.tag);
        (row.info);
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        (row.info);
    }
    // @ts-ignore
    [errorLogs,];
}
// @ts-ignore
[];
var __VLS_65;
let __VLS_69;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_70 = __VLS_asFunctionalComponent(__VLS_69, new __VLS_69({
    prop: "time",
    label: "时间",
    width: "180px",
}));
const __VLS_71 = __VLS_70({
    prop: "time",
    label: "时间",
    width: "180px",
}, ...__VLS_functionalComponentArgsRest(__VLS_70));
const { default: __VLS_74 } = __VLS_72.slots;
{
    const { default: __VLS_75 } = __VLS_72.slots;
    const [{ row }] = __VLS_getSlotParameters(__VLS_75);
    (__VLS_ctx.getViewTime(row.time));
    // @ts-ignore
    [getViewTime,];
}
// @ts-ignore
[];
var __VLS_72;
let __VLS_76;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({
    prop: "hasRead",
    label: "状态",
    width: "180px",
}));
const __VLS_78 = __VLS_77({
    prop: "hasRead",
    label: "状态",
    width: "180px",
}, ...__VLS_functionalComponentArgsRest(__VLS_77));
const { default: __VLS_81 } = __VLS_79.slots;
{
    const { default: __VLS_82 } = __VLS_79.slots;
    const [{ row }] = __VLS_getSlotParameters(__VLS_82);
    let __VLS_83;
    /** @ts-ignore @type {typeof ___VLS_components.elTag | typeof ___VLS_components.ElTag} */
    elTag;
    // @ts-ignore
    const __VLS_84 = __VLS_asFunctionalComponent(__VLS_83, new __VLS_83({
        type: (row.hasRead ? 'success' : 'danger'),
    }));
    const __VLS_85 = __VLS_84({
        type: (row.hasRead ? 'success' : 'danger'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_84));
    const { default: __VLS_88 } = __VLS_86.slots;
    (row.hasRead ? "已读" : "未读");
    // @ts-ignore
    [];
    var __VLS_86;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_79;
let __VLS_89;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_90 = __VLS_asFunctionalComponent(__VLS_89, new __VLS_89({
    label: "操作",
    width: "190px",
}));
const __VLS_91 = __VLS_90({
    label: "操作",
    width: "190px",
}, ...__VLS_functionalComponentArgsRest(__VLS_90));
const { default: __VLS_94 } = __VLS_92.slots;
{
    const { default: __VLS_95 } = __VLS_92.slots;
    const [{ row }] = __VLS_getSlotParameters(__VLS_95);
    let __VLS_96;
    /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
    elButton;
    // @ts-ignore
    const __VLS_97 = __VLS_asFunctionalComponent(__VLS_96, new __VLS_96({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_98 = __VLS_97({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_97));
    let __VLS_101;
    const __VLS_102 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.handleClick(row);
                // @ts-ignore
                [handleClick,];
            } });
    const { default: __VLS_103 } = __VLS_99.slots;
    // @ts-ignore
    [];
    var __VLS_99;
    var __VLS_100;
    let __VLS_104;
    /** @ts-ignore @type {typeof ___VLS_components.elPopconfirm | typeof ___VLS_components.ElPopconfirm} */
    elPopconfirm;
    // @ts-ignore
    const __VLS_105 = __VLS_asFunctionalComponent(__VLS_104, new __VLS_104({
        ...{ 'onConfirm': {} },
        title: "您确定删除这个错误日志吗？",
    }));
    const __VLS_106 = __VLS_105({
        ...{ 'onConfirm': {} },
        title: "您确定删除这个错误日志吗？",
    }, ...__VLS_functionalComponentArgsRest(__VLS_105));
    let __VLS_109;
    const __VLS_110 = ({ confirm: {} },
        { onConfirm: (...[$event]) => {
                __VLS_ctx.handleDelete(row);
                // @ts-ignore
                [handleDelete,];
            } });
    const { default: __VLS_111 } = __VLS_107.slots;
    {
        const { reference: __VLS_112 } = __VLS_107.slots;
        let __VLS_113;
        /** @ts-ignore @type {typeof ___VLS_components.elButton | typeof ___VLS_components.ElButton} */
        elButton;
        // @ts-ignore
        const __VLS_114 = __VLS_asFunctionalComponent(__VLS_113, new __VLS_113({
            type: "danger",
        }));
        const __VLS_115 = __VLS_114({
            type: "danger",
        }, ...__VLS_functionalComponentArgsRest(__VLS_114));
        const { default: __VLS_118 } = __VLS_116.slots;
        // @ts-ignore
        [];
        var __VLS_116;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_107;
    var __VLS_108;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_92;
// @ts-ignore
[];
var __VLS_39;
let __VLS_119;
/** @ts-ignore @type {typeof ___VLS_components.ElDialog} */
ElDialog;
// @ts-ignore
const __VLS_120 = __VLS_asFunctionalComponent(__VLS_119, new __VLS_119({
    modelValue: (__VLS_ctx.dialogErrorStackVisible),
    title: "错误信息",
    width: "70%",
    top: "10vh",
}));
const __VLS_121 = __VLS_120({
    modelValue: (__VLS_ctx.dialogErrorStackVisible),
    title: "错误信息",
    width: "70%",
    top: "10vh",
}, ...__VLS_functionalComponentArgsRest(__VLS_120));
const { default: __VLS_124 } = __VLS_122.slots;
let __VLS_125;
/** @ts-ignore @type {typeof ___VLS_components.elTable | typeof ___VLS_components.ElTable} */
elTable;
// @ts-ignore
const __VLS_126 = __VLS_asFunctionalComponent(__VLS_125, new __VLS_125({
    data: ([__VLS_ctx.clickCurrentRow]),
    border: true,
}));
const __VLS_127 = __VLS_126({
    data: ([__VLS_ctx.clickCurrentRow]),
    border: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_126));
const { default: __VLS_130 } = __VLS_128.slots;
let __VLS_131;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_132 = __VLS_asFunctionalComponent(__VLS_131, new __VLS_131({
    label: "name",
    width: "160px",
}));
const __VLS_133 = __VLS_132({
    label: "name",
    width: "160px",
}, ...__VLS_functionalComponentArgsRest(__VLS_132));
const { default: __VLS_136 } = __VLS_134.slots;
{
    const { default: __VLS_137 } = __VLS_134.slots;
    const [{ row }] = __VLS_getSlotParameters(__VLS_137);
    (row.error.name);
    // @ts-ignore
    [dialogErrorStackVisible, clickCurrentRow,];
}
// @ts-ignore
[];
var __VLS_134;
let __VLS_138;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_139 = __VLS_asFunctionalComponent(__VLS_138, new __VLS_138({
    label: "message",
    width: "160px",
}));
const __VLS_140 = __VLS_139({
    label: "message",
    width: "160px",
}, ...__VLS_functionalComponentArgsRest(__VLS_139));
const { default: __VLS_143 } = __VLS_141.slots;
{
    const { default: __VLS_144 } = __VLS_141.slots;
    const [{ row }] = __VLS_getSlotParameters(__VLS_144);
    (row.error.message);
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_141;
let __VLS_145;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_146 = __VLS_asFunctionalComponent(__VLS_145, new __VLS_145({
    label: "cause",
    width: "160px",
}));
const __VLS_147 = __VLS_146({
    label: "cause",
    width: "160px",
}, ...__VLS_functionalComponentArgsRest(__VLS_146));
const { default: __VLS_150 } = __VLS_148.slots;
{
    const { default: __VLS_151 } = __VLS_148.slots;
    const [{ row }] = __VLS_getSlotParameters(__VLS_151);
    (row.error.cause);
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_148;
let __VLS_152;
/** @ts-ignore @type {typeof ___VLS_components.elTableColumn | typeof ___VLS_components.ElTableColumn} */
elTableColumn;
// @ts-ignore
const __VLS_153 = __VLS_asFunctionalComponent(__VLS_152, new __VLS_152({
    label: "stack",
}));
const __VLS_154 = __VLS_153({
    label: "stack",
}, ...__VLS_functionalComponentArgsRest(__VLS_153));
const { default: __VLS_157 } = __VLS_155.slots;
{
    const { default: __VLS_158 } = __VLS_155.slots;
    const [{ row }] = __VLS_getSlotParameters(__VLS_158);
    (row.error.stack);
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_155;
// @ts-ignore
[];
var __VLS_128;
// @ts-ignore
[];
var __VLS_122;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
