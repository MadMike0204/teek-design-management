/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { useSlots, computed, toRaw } from "vue";
import { addUnit, isObject, isString } from "@/common/utils";
import { useNamespace } from "@/composables";
import SvgIcon from "./components/svg-icon.vue";
import FontIcon from "./components/font-icon.vue";
import IconifyOffline from "./components/iconify-offline.vue";
import IconifyOnline from "./components/iconify-online.vue";
defineOptions({ name: "Icon" });
const __VLS_props = defineProps();
const { icon = "", iconType, color, hover = false, hoverColor, pointer = false, ...props } = __VLS_props;
const ns = useNamespace("icon");
const slot = useSlots();
const getStyle = () => {
    return {
        ...props.style,
        ...(pointer ? { cursor: "pointer" } : undefined),
        "--icon-color": color,
        "--icon-size": props.size && addUnit(props.size),
        "--icon-color-hover": hoverColor,
    };
};
/**
 * 当 props.icon 为字符串时，支持传入修饰符来代替 props.iconType
 *
 * 1、icon 为 img- 或 IMG- 开头，则默认为 img
 * 2、icon 为 if- 或 IF- 开头，则默认为 iconfont
 * 3、icon 为 uni- 或 UNI- 开头，则默认为 unicode
 * 4、icon 为 sym- 或 SYM- 开头，则默认为 symbol
 * 5、icon 为 svg- 或 SVG- 开头，则默认为 svg
 */
const finalIcon = computed(() => {
    if (!isString(icon))
        return toRaw(icon);
    return icon.replace(/^(svg-|if-|uni-|sym-|img-)/i, "");
});
// 获取 iconfont 类型
const fontIconType = computed(() => {
    if (iconType && ["unicode", "iconfont", "symbol"].includes(iconType)) {
        return iconType;
    }
    if (!isString(icon))
        return "";
    const caseIconName = icon.toLowerCase();
    if (caseIconName.startsWith("if-") || caseIconName.startsWith("icon-"))
        return "iconfont";
    if (caseIconName.startsWith("uni-") ||
        /^&#x[\da-f]+/i.test(icon) ||
        (icon.length === 1 && icon.charCodeAt(0) >= 0xe000 && icon.charCodeAt(0) <= 0xf8ff)) {
        return "unicode";
    }
    if (caseIconName.startsWith("sym-"))
        return "symbol";
    return "";
});
// 是否为 SVG 图标
const isSvgIcon = computed(() => isString(icon) && (iconType === "svg" || icon.startsWith("svg-") || isString(icon)));
// 是否为 SVG Html
const isSvgIconHtml = computed(() => isString(icon) && icon?.includes("<svg"));
// 是否为 iconfont 图标
const isFontIcon = computed(() => isString(icon) && fontIconType.value);
// 是否为组件
const isComponent = computed(() => !isString(icon) &&
    (iconType === "component" ||
        (isObject(icon) && ("setup" in icon || "render" in icon)) ||
        typeof icon === "function"));
// 是否为 Iconify 离线图标
const isIconifyOffline = computed(() => !isString(icon) && (iconType === "iconifyOffline" || "body" in icon));
// 是否为 Iconify 在线图标
const isIconifyOnline = computed(() => isString(icon) && (iconType === "iconifyOnline" || icon.includes(":")));
// 是否为图片
const isImage = computed(() => isString(icon) &&
    (iconType === "img" ||
        icon.toLowerCase().startsWith("img-") ||
        [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp"].some(ext => icon.endsWith(ext))));
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
if (!__VLS_ctx.isFontIcon && !__VLS_ctx.isImage && !__VLS_ctx.isSvgIconHtml) {
    __VLS_asFunctionalElement(__VLS_intrinsics.i, __VLS_intrinsics.i)({
        ...{ class: ([__VLS_ctx.ns.b(), __VLS_ctx.ns.is('hover', hover)]) },
        ...{ style: (__VLS_ctx.getStyle()) },
    });
    if (__VLS_ctx.slot.default) {
        var __VLS_0 = {};
    }
    else if (__VLS_ctx.isComponent) {
        const __VLS_2 = (__VLS_ctx.finalIcon);
        // @ts-ignore
        const __VLS_3 = __VLS_asFunctionalComponent(__VLS_2, new __VLS_2({
            size: __VLS_ctx.size,
        }));
        const __VLS_4 = __VLS_3({
            size: __VLS_ctx.size,
        }, ...__VLS_functionalComponentArgsRest(__VLS_3));
    }
    else if (__VLS_ctx.isIconifyOffline) {
        const __VLS_7 = IconifyOffline;
        // @ts-ignore
        const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
            icon: (__VLS_ctx.finalIcon),
        }));
        const __VLS_9 = __VLS_8({
            icon: (__VLS_ctx.finalIcon),
        }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    }
    else if (__VLS_ctx.isIconifyOnline) {
        const __VLS_12 = IconifyOnline;
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
            icon: (__VLS_ctx.finalIcon),
        }));
        const __VLS_14 = __VLS_13({
            icon: (__VLS_ctx.finalIcon),
        }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    }
    else if (__VLS_ctx.isSvgIcon) {
        const __VLS_17 = SvgIcon;
        // @ts-ignore
        const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
            icon: (__VLS_ctx.finalIcon),
        }));
        const __VLS_19 = __VLS_18({
            icon: (__VLS_ctx.finalIcon),
        }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    }
}
else if (__VLS_ctx.isSvgIconHtml) {
    __VLS_asFunctionalElement(__VLS_intrinsics.i)({
        ...{ class: ([__VLS_ctx.ns.b(), __VLS_ctx.ns.is('hover', hover)]) },
        ...{ style: (__VLS_ctx.getStyle()) },
    });
    __VLS_asFunctionalDirective(___VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (icon) }, null, null);
}
else if (__VLS_ctx.isFontIcon) {
    const __VLS_22 = FontIcon;
    // @ts-ignore
    const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
        icon: (__VLS_ctx.finalIcon),
        iconType: (__VLS_ctx.fontIconType),
        ...{ class: ([__VLS_ctx.ns.b(), __VLS_ctx.ns.is('hover', hover)]) },
        ...{ style: (__VLS_ctx.getStyle()) },
    }));
    const __VLS_24 = __VLS_23({
        icon: (__VLS_ctx.finalIcon),
        iconType: (__VLS_ctx.fontIconType),
        ...{ class: ([__VLS_ctx.ns.b(), __VLS_ctx.ns.is('hover', hover)]) },
        ...{ style: (__VLS_ctx.getStyle()) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_23));
    var __VLS_27 = {};
    var __VLS_25;
}
else if (__VLS_ctx.isImage) {
    __VLS_asFunctionalElement(__VLS_intrinsics.img)({
        src: (__VLS_ctx.finalIcon),
        alt: (__VLS_ctx.imgAlt),
        ...{ class: ([__VLS_ctx.ns.b(), __VLS_ctx.ns.is('hover', hover)]) },
        ...{ style: (__VLS_ctx.getStyle()) },
    });
}
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[isFontIcon, isFontIcon, isImage, isImage, isSvgIconHtml, isSvgIconHtml, ns, ns, ns, ns, ns, ns, ns, ns, getStyle, getStyle, getStyle, getStyle, slot, isComponent, finalIcon, finalIcon, finalIcon, finalIcon, finalIcon, finalIcon, size, isIconifyOffline, isIconifyOnline, isSvgIcon, fontIconType, imgAlt,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
});
const __VLS_export = {};
export default {};
