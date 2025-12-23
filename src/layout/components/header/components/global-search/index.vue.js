/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { ref, onMounted, nextTick, useTemplateRef } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useEventListener } from "@vueuse/core";
import { ArrowUp, ArrowDown, Back, Close } from "@element-plus/icons-vue";
import { isArray, mittBus } from "@/common/utils";
import { OpenSearchDialogKey } from "@/common/config";
import { useKeyDown, useMenu, useNamespace } from "@/composables";
import { formatTitle } from "@/router/helper";
import { useSettingStore, useUserStore } from "@/pinia";
import "./index.scss";
defineOptions({ name: "GlobalSearch" });
const router = useRouter();
const ns = useNamespace("global-search");
const userStore = useUserStore();
const settingStore = useSettingStore();
const { menuList } = useMenu();
const showSearchDialog = ref(false);
const isKeyboardNavigating = ref(false);
const searchVal = ref("");
const historyHIndex = ref(0);
const highlightedIndex = ref(0);
const historyMaxLength = 10;
const searchResult = ref([]);
const { searchHistory } = storeToRefs(userStore);
const { shortcutKey } = storeToRefs(settingStore);
const searchInputInstance = useTemplateRef(__VLS_placeholder);
const searchResultScrollbarInstance = useTemplateRef(__VLS_placeholder);
const { start } = useKeyDown({
    watcher: computed(() => shortcutKey.value.search),
    // 快捷键 ALT + Q 退出登录
    callback: event => {
        const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
        const isCommandKey = isMac ? event.metaKey : event.ctrlKey;
        if (isCommandKey && event.key.toLowerCase() === "k") {
            event.preventDefault();
            showSearchDialog.value = true;
            focusInput();
        }
    },
});
start();
/**
 * 打开对话框
 */
const openSearchDialog = () => {
    showSearchDialog.value = true;
    focusInput();
};
/**
 * 关闭对话框
 */
const closeSearchDialog = () => {
    searchVal.value = "";
    searchResult.value = [];
    highlightedIndex.value = 0;
    historyHIndex.value = 0;
};
/**
 * 键盘快捷键处理
 */
const handleKeydown = (event) => {
    // 当搜索对话框打开时，处理方向键和回车键
    if (showSearchDialog.value) {
        if (event.key === "ArrowUp") {
            event.preventDefault();
            highlightPrevious();
        }
        else if (event.key === "ArrowDown") {
            event.preventDefault();
            highlightNext();
        }
        else if (event.key === "Enter") {
            event.preventDefault();
            selectHighlighted();
        }
        else if (event.key === "Escape") {
            event.preventDefault();
            showSearchDialog.value = false;
        }
    }
};
useEventListener("keydown", handleKeydown);
/**
 * 激活文本框
 */
const focusInput = () => {
    setTimeout(() => {
        searchInputInstance.value?.focus();
    }, 100);
};
const handleSearch = (val) => {
    if (val)
        searchResult.value = flattenAndFilterMenuItems(menuList.value, val);
    else
        searchResult.value = [];
};
/**
 * 筛选菜单项
 */
const flattenAndFilterMenuItems = (items, val) => {
    const lowerVal = val.toLowerCase();
    const result = [];
    const flattenAndMatch = (item) => {
        if (item.meta?.hideInMenu)
            return;
        const lowerItemTitle = formatTitle(item).toLowerCase();
        if (item.children && item.children.length > 0) {
            item.children.forEach(flattenAndMatch);
            return;
        }
        if (lowerItemTitle.includes(lowerVal) && item.path) {
            result.push({ ...item, children: undefined });
        }
    };
    items.forEach(flattenAndMatch);
    return result;
};
/**
 * 高亮控制并实现滚动条跟随
 */
const highlightPrevious = () => {
    isKeyboardNavigating.value = true;
    if (searchVal.value) {
        highlightedIndex.value = (highlightedIndex.value - 1 + searchResult.value.length) % searchResult.value.length;
        scrollToHighlightedItem();
    }
    else {
        historyHIndex.value = (historyHIndex.value - 1 + searchHistory.value.length) % searchHistory.value.length;
        scrollToHighlightedHistoryItem();
    }
    // 延迟重置键盘导航状态，防止立即被 hover 覆盖
    setTimeout(() => {
        isKeyboardNavigating.value = false;
    }, 100);
};
const highlightNext = () => {
    isKeyboardNavigating.value = true;
    if (searchVal.value) {
        highlightedIndex.value = (highlightedIndex.value + 1) % searchResult.value.length;
        scrollToHighlightedItem();
    }
    else {
        historyHIndex.value = (historyHIndex.value + 1) % searchHistory.value.length;
        scrollToHighlightedHistoryItem();
    }
    setTimeout(() => {
        isKeyboardNavigating.value = false;
    }, 100);
};
const scrollToHighlightedItem = async () => {
    await nextTick();
    if (!searchResultScrollbarInstance.value || !searchResult.value.length)
        return;
    const scrollWrapper = searchResultScrollbarInstance.value.wrapRef;
    if (!scrollWrapper)
        return;
    const highlightedElements = scrollWrapper.querySelectorAll(`.${ns.e("search-item")}`);
    if (!highlightedElements[highlightedIndex.value])
        return;
    const highlightedElement = highlightedElements[highlightedIndex.value];
    const itemHeight = highlightedElement.offsetHeight;
    const scrollTop = scrollWrapper.scrollTop;
    const containerHeight = scrollWrapper.clientHeight;
    const itemTop = highlightedElement.offsetTop;
    const itemBottom = itemTop + itemHeight;
    if (itemTop < scrollTop)
        searchResultScrollbarInstance.value.setScrollTop(itemTop);
    else if (itemBottom > scrollTop + containerHeight) {
        searchResultScrollbarInstance.value.setScrollTop(itemBottom - containerHeight);
    }
};
const scrollToHighlightedHistoryItem = async () => {
    await nextTick();
    if (!searchResultScrollbarInstance.value || !searchHistory.value.length)
        return;
    const scrollWrapper = searchResultScrollbarInstance.value.wrapRef;
    if (!scrollWrapper)
        return;
    const historyItems = scrollWrapper.querySelectorAll(`.${ns.e("history-item")}`);
    if (!historyItems[historyHIndex.value])
        return;
    const highlightedElement = historyItems[historyHIndex.value];
    const itemHeight = highlightedElement.offsetHeight;
    const scrollTop = scrollWrapper.scrollTop;
    const containerHeight = scrollWrapper.clientHeight;
    const itemTop = highlightedElement.offsetTop;
    const itemBottom = itemTop + itemHeight;
    if (itemTop < scrollTop) {
        searchResultScrollbarInstance.value.setScrollTop(itemTop);
    }
    else if (itemBottom > scrollTop + containerHeight) {
        searchResultScrollbarInstance.value.setScrollTop(itemBottom - containerHeight);
    }
};
const selectHighlighted = () => {
    if (searchVal.value && searchResult.value.length) {
        handleGoPage(searchResult.value[highlightedIndex.value]);
    }
    else if (!searchVal.value && searchHistory.value.length) {
        handleGoPage(searchHistory.value[historyHIndex.value]);
    }
};
const isHighlighted = (index) => {
    return highlightedIndex.value === index;
};
const handleSearchBlur = () => {
    highlightedIndex.value = 0;
};
/**
 * 修改 hover 高亮逻辑，只有在非键盘导航时才生效
 */
const highlightOnHover = (index) => {
    if (!isKeyboardNavigating.value && searchVal.value) {
        highlightedIndex.value = index;
    }
};
const highlightOnHoverHistory = (index) => {
    if (!isKeyboardNavigating.value && !searchVal.value) {
        historyHIndex.value = index;
    }
};
const handleGoPage = (item) => {
    showSearchDialog.value = false;
    addHistory(item);
    if (item.name)
        router.push({ name: item.name });
    else
        router.push(item.meta._fullPath);
    searchVal.value = "";
    searchResult.value = [];
};
// 历史记录管理
const updateHistory = () => {
    if (isArray(searchHistory.value))
        userStore.setSearchHistory(searchHistory.value);
};
const addHistory = (item) => {
    const hasItemIndex = searchHistory.value.findIndex(historyItem => historyItem.path === item.path);
    if (hasItemIndex !== -1) {
        searchHistory.value.splice(hasItemIndex, 1);
    }
    else if (searchHistory.value.length >= historyMaxLength) {
        searchHistory.value.pop();
    }
    const cleanedItem = { ...item };
    delete cleanedItem.children;
    delete cleanedItem.meta.auths;
    searchHistory.value.unshift(cleanedItem);
    updateHistory();
};
const deleteHistory = (index) => {
    searchHistory.value.splice(index, 1);
    updateHistory();
};
onMounted(() => {
    mittBus.on(OpenSearchDialogKey, openSearchDialog);
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.b()) },
});
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.elDialog | typeof ___VLS_components.ElDialog} */
elDialog;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onClose': {} },
    modelValue: (__VLS_ctx.showSearchDialog),
    width: "600",
    showClose: (false),
    lockScroll: (false),
    modalClass: "search-modal",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClose': {} },
    modelValue: (__VLS_ctx.showSearchDialog),
    width: "600",
    showClose: (false),
    lockScroll: (false),
    modalClass: "search-modal",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ close: {} },
    { onClose: (__VLS_ctx.closeSearchDialog) });
const { default: __VLS_7 } = __VLS_3.slots;
let __VLS_8;
/** @ts-ignore @type {typeof ___VLS_components.elInput | typeof ___VLS_components.ElInput} */
elInput;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ 'onInput': {} },
    ...{ 'onBlur': {} },
    ref: "searchInputInstance",
    modelValue: (__VLS_ctx.searchVal),
    placeholder: (__VLS_ctx.$t('_search.placeholder')),
}));
const __VLS_10 = __VLS_9({
    ...{ 'onInput': {} },
    ...{ 'onBlur': {} },
    ref: "searchInputInstance",
    modelValue: (__VLS_ctx.searchVal),
    placeholder: (__VLS_ctx.$t('_search.placeholder')),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_13;
const __VLS_14 = ({ input: {} },
    { onInput: (__VLS_ctx.handleSearch) });
const __VLS_15 = ({ blur: {} },
    { onBlur: (__VLS_ctx.handleSearchBlur) });
var __VLS_16 = {};
const { default: __VLS_18 } = __VLS_11.slots;
{
    const { prefix: __VLS_19 } = __VLS_11.slots;
    let __VLS_20;
    /** @ts-ignore @type {typeof ___VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        icon: "core-search",
        size: (17),
    }));
    const __VLS_22 = __VLS_21({
        icon: "core-search",
        size: (17),
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    // @ts-ignore
    [ns, showSearchDialog, closeSearchDialog, searchVal, $t, handleSearch, handleSearchBlur,];
}
{
    const { suffix: __VLS_25 } = __VLS_11.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "search-keydown" },
    });
    /** @type {__VLS_StyleScopedClasses['search-keydown']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_11;
var __VLS_12;
let __VLS_26;
/** @ts-ignore @type {typeof ___VLS_components.elScrollbar | typeof ___VLS_components.ElScrollbar} */
elScrollbar;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
    ref: "searchResultScrollbarInstance",
    ...{ class: (__VLS_ctx.ns.e('search-scrollbar')) },
    maxHeight: (380),
}));
const __VLS_28 = __VLS_27({
    ref: "searchResultScrollbarInstance",
    ...{ class: (__VLS_ctx.ns.e('search-scrollbar')) },
    maxHeight: (380),
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
var __VLS_31 = {};
const { default: __VLS_33 } = __VLS_29.slots;
__VLS_asFunctionalElement(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
    ...{ class: (__VLS_ctx.ns.e('search-list')) },
});
__VLS_asFunctionalDirective(___VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.searchResult.length) }, null, null);
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.searchResult))) {
    __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({
        ...{ class: (__VLS_ctx.ns.e('search-item')) },
        key: (index),
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.handleGoPage(item);
                // @ts-ignore
                [ns, ns, ns, searchResult, searchResult, handleGoPage,];
            } },
        ...{ onMouseenter: (...[$event]) => {
                __VLS_ctx.highlightOnHover(index);
                // @ts-ignore
                [highlightOnHover,];
            } },
        ...{ class: (__VLS_ctx.ns.is('highlighted', __VLS_ctx.isHighlighted(index))) },
    });
    (__VLS_ctx.formatTitle(item));
    let __VLS_34;
    /** @ts-ignore @type {typeof ___VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
        ...{ class: "selected-icon" },
    }));
    const __VLS_36 = __VLS_35({
        ...{ class: "selected-icon" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_35));
    __VLS_asFunctionalDirective(___VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.isHighlighted(index)) }, null, null);
    /** @type {__VLS_StyleScopedClasses['selected-icon']} */ ;
    const { default: __VLS_39 } = __VLS_37.slots;
    let __VLS_40;
    /** @ts-ignore @type {typeof ___VLS_components.Back} */
    Back;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({}));
    const __VLS_42 = __VLS_41({}, ...__VLS_functionalComponentArgsRest(__VLS_41));
    // @ts-ignore
    [ns, isHighlighted, isHighlighted, formatTitle,];
    var __VLS_37;
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: (__VLS_ctx.ns.e('search-history')) },
});
__VLS_asFunctionalDirective(___VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.searchVal && __VLS_ctx.searchResult.length === 0 && __VLS_ctx.searchHistory.length > 0) }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "title" },
});
/** @type {__VLS_StyleScopedClasses['title']} */ ;
(__VLS_ctx.$t("_search.historyTitle"));
__VLS_asFunctionalElement(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
    ...{ class: (__VLS_ctx.ns.e('history-list')) },
});
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.searchHistory))) {
    __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.handleGoPage(item);
                // @ts-ignore
                [ns, ns, searchVal, $t, searchResult, handleGoPage, searchHistory, searchHistory,];
            } },
        ...{ onMouseenter: (...[$event]) => {
                __VLS_ctx.highlightOnHoverHistory(index);
                // @ts-ignore
                [highlightOnHoverHistory,];
            } },
        ...{ class: ([__VLS_ctx.ns.e('history-item'), __VLS_ctx.ns.is('highlighted', __VLS_ctx.historyHIndex === index)]) },
        key: (index),
    });
    (__VLS_ctx.formatTitle(item));
    let __VLS_45;
    /** @ts-ignore @type {typeof ___VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
        ...{ 'onClick': {} },
        ...{ class: "selected-icon" },
    }));
    const __VLS_47 = __VLS_46({
        ...{ 'onClick': {} },
        ...{ class: "selected-icon" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_46));
    let __VLS_50;
    const __VLS_51 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.deleteHistory(index);
                // @ts-ignore
                [ns, ns, formatTitle, historyHIndex, deleteHistory,];
            } });
    /** @type {__VLS_StyleScopedClasses['selected-icon']} */ ;
    const { default: __VLS_52 } = __VLS_48.slots;
    let __VLS_53;
    /** @ts-ignore @type {typeof ___VLS_components.Close} */
    Close;
    // @ts-ignore
    const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({}));
    const __VLS_55 = __VLS_54({}, ...__VLS_functionalComponentArgsRest(__VLS_54));
    // @ts-ignore
    [];
    var __VLS_48;
    var __VLS_49;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_29;
{
    const { footer: __VLS_58 } = __VLS_3.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "dialog-footer" },
    });
    /** @type {__VLS_StyleScopedClasses['dialog-footer']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    let __VLS_59;
    /** @ts-ignore @type {typeof ___VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_60 = __VLS_asFunctionalComponent(__VLS_59, new __VLS_59({}));
    const __VLS_61 = __VLS_60({}, ...__VLS_functionalComponentArgsRest(__VLS_60));
    const { default: __VLS_64 } = __VLS_62.slots;
    let __VLS_65;
    /** @ts-ignore @type {typeof ___VLS_components.Back} */
    Back;
    // @ts-ignore
    const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({}));
    const __VLS_67 = __VLS_66({}, ...__VLS_functionalComponentArgsRest(__VLS_66));
    // @ts-ignore
    [];
    var __VLS_62;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_ctx.$t("_search.selectKeydown"));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    let __VLS_70;
    /** @ts-ignore @type {typeof ___VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({}));
    const __VLS_72 = __VLS_71({}, ...__VLS_functionalComponentArgsRest(__VLS_71));
    const { default: __VLS_75 } = __VLS_73.slots;
    let __VLS_76;
    /** @ts-ignore @type {typeof ___VLS_components.ArrowUp} */
    ArrowUp;
    // @ts-ignore
    const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({}));
    const __VLS_78 = __VLS_77({}, ...__VLS_functionalComponentArgsRest(__VLS_77));
    // @ts-ignore
    [$t,];
    var __VLS_73;
    let __VLS_81;
    /** @ts-ignore @type {typeof ___VLS_components.Icon} */
    Icon;
    // @ts-ignore
    const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({}));
    const __VLS_83 = __VLS_82({}, ...__VLS_functionalComponentArgsRest(__VLS_82));
    const { default: __VLS_86 } = __VLS_84.slots;
    let __VLS_87;
    /** @ts-ignore @type {typeof ___VLS_components.ArrowDown} */
    ArrowDown;
    // @ts-ignore
    const __VLS_88 = __VLS_asFunctionalComponent(__VLS_87, new __VLS_87({}));
    const __VLS_89 = __VLS_88({}, ...__VLS_functionalComponentArgsRest(__VLS_88));
    // @ts-ignore
    [];
    var __VLS_84;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_ctx.$t("_search.switchKeydown"));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.i, __VLS_intrinsics.i)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_ctx.$t("_search.closeKeyDown"));
    // @ts-ignore
    [$t, $t,];
}
// @ts-ignore
[];
var __VLS_3;
var __VLS_4;
// @ts-ignore
var __VLS_17 = __VLS_16, __VLS_32 = __VLS_31;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
