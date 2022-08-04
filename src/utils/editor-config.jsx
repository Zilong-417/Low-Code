//列表区可以显示所有的物料
//key对应的组件映射关系

import { ElButton, ElInput, ElLink } from 'element-plus'
function createEditorConfig() {
    const componentList = [];
    const componentMap = {}
    return {
        componentList,
        componentMap,
        register: (component) => {
            componentList.push(component);
            componentMap[component.key] = component
        }
    }
}
export let registerConfig = createEditorConfig();
const createInputProp = (label) => ({ type: 'input', label });//工厂方法，复用
const createColorProp = (label) => ({ type: 'color', label });
const createSelectProp = (label, options) => ({ type: 'select', label, options })
const createAddressProp = (label) => ({ type: 'link', label });

registerConfig.register({
    lable: '文本',
    preview: () => '预览文本',
    render: ({ props }) => <span style={{ color: props.color, fontSize: props.size }}>{props.text || '文本'}</span>,
    key: 'text',
    props: {
        text: createInputProp('文本内容'),
        color: createColorProp('字体颜色'),
        size: createSelectProp('字体大小', [
            { label: '14px', value: '14px' },
            { label: '20px', value: '20px' },
            { label: '24px', value: '24px' },
        ])

    }
})

registerConfig.register({
    lable: '按钮',
    preview: () => <ElButton>预览按钮</ElButton>,
    render: ({ props, size }) => <ElButton type={props.type} size={props.size}>{props.text || '按钮'}</ElButton>,
    key: 'button',
    props: {
        text: createInputProp('按钮内容'),
        type: createSelectProp('按钮类型', [
            { label: '基础', value: 'primary' },
            { label: '成功', value: 'success' },
            { label: '警告', value: 'warning' },
            { label: '危险', value: 'danger' },
            { label: '文本', value: 'text' },
        ]),
        size: createSelectProp('按钮尺寸', [
            { label: '默认', value: '' },
            { label: '中等', value: 'medium' },
            { label: '小', value: 'small' },
            { label: '极小', value: 'mini' },
        ])
    }
})

registerConfig.register({
    lable: '输入框',
    preview: () => <ElInput placeholder="预览输入框" ></ElInput>,
    render: ({ model, props }) => <ElInput placeholder={props.text == null ? '请输入内容' : props.text}  {...model.default}></ElInput>,
    key: 'input',
    model: {
        default: '绑定字段'
    },
    props: {
        text: createInputProp('提示信息'),
    }
})

registerConfig.register({
    lable: '链接',
    preview: () => <ElLink>预览链接</ElLink>,
    render: ({ props, size }) => <ElLink type={props.type} size={props.size} href={'https:' + props.link} target="_blank">{props.text || '链接'}</ElLink>,
    key: 'link',
    props: {
        text: createInputProp('链接名字'),
        link: createAddressProp('链接地址'),
        type: createSelectProp('链接类型', [
            { label: '默认', value: 'default' },
            { label: '基础', value: 'primary' },
            { label: '成功', value: 'success' },
            { label: '警告', value: 'warning' },
            { label: '危险', value: 'danger' },
            { label: '文本', value: 'info' },
        ]),
        size: createSelectProp('链接尺寸', [
            { label: '默认', value: '' },
            { label: '中等', value: 'medium' },
            { label: '小', value: 'small' },
            { label: '极小', value: 'mini' },
        ])
    }
})