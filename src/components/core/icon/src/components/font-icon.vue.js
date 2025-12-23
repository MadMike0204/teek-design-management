/// <reference types="C:/Users/28997/OneDrive/Desktop/qmdzy/teek-design-management/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
defineOptions({ name: "FontIcon" });
const __VLS_props = defineProps();
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
if (__VLS_ctx.iconType === 'unicode') {
    __VLS_asFunctionalElement(__VLS_intrinsics.i)({
        ...{ class: "iconfont icon-teek" },
    });
    __VLS_asFunctionalDirective(___VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.icon) }, null, null);
    /** @type {__VLS_StyleScopedClasses['iconfont']} */ ;
    /** @type {__VLS_StyleScopedClasses['icon-teek']} */ ;
}
else if (__VLS_ctx.iconType === 'symbol') {
    __VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "svg-icon" },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['svg-icon']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.use, __VLS_intrinsics.use)({
        'xlink:href': (`#${__VLS_ctx.icon}`),
    });
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.i)({
        ...{ class: (`iconfont icon-teek ${__VLS_ctx.icon}`) },
    });
}
// @ts-ignore
[iconType, iconType, icon, icon, icon,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
