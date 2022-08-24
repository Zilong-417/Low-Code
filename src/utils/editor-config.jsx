//列表区可以显示所有的物料
//key对应的组件映射关系
import { ElButton, ElInput, ElLink, ElIcon } from 'element-plus'
//默认图片
const imgdata = require('@/assets/bg.jpg')
function createEditorConfig() {
    const componentList = []
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
// 自定义事件
const events = {
    redirect(url) {
        if (url) {
            window.open('https://' + url, '_blank');
        }
    },

    alert(msg) {
        if (msg) {
            alert(msg)
        }
    },
}

const eventList = [
    {
        key: 'redirect',
        label: 'url事件',
        title: 'url地址',
        hint: '请输入完整url地址',
        event: events.redirect,
    },
    {
        key: 'alert',
        label: 'alert 事件',
        title: '弹窗内容',
        hint: '请输入内容',
        event: events.alert
    },
]
export let registerConfig = createEditorConfig();
const createInputProp = (label) => ({ type: 'input', label })//工厂方法，复用
const createInputNumProp = (label) => ({ type: 'inputNum', label })
const createColorProp = (label) => ({ type: 'color', label })
const createSelectProp = (label, options) => ({ type: 'select', label, options })
const createAddressProp = (label) => ({ type: 'link', label })
const createPictureProp = (label) => ({ type: 'picture', label })
const createFileProp = (label) => ({ type: "file", accept: "video/*", label })
registerConfig.register({
    lable: '文本',
    preview: () => '预览文本',
    render({ props, events }) {
        if (
            (events.redirect != undefined && events.alert != undefined) ||
            (events.redirect != undefined && events.alert == undefined) ||
            (events.redirect == undefined && events.alert != undefined)) {
            return <span
                style={{ color: props.color, fontSize: props.size + 'px' }}
                onClick={() => this.handleClick(events.alert, events.redirect)}
            >{props.text || '文本'}</span>
        } else {
            return <span
                style={{ color: props.color, fontSize: props.size + 'px' }}
            >{props.text || '文本'}</span>
        }
    },
    key: 'text',
    props: {
        text: createInputProp('文本内容'),
        color: createColorProp('字体颜色'),
        size: createInputNumProp('字体大小/px'),

    },
    events: {
        ...eventList
    },
    handleClick(alert, redirect) {
        // 循环触发绑定的事件
        Object.keys(events).forEach(event => {
            if (event == 'alert') events['alert'](alert)
            if (event == 'redirect') events['redirect'](redirect)
        })
    }

})

registerConfig.register({
    lable: '按钮',
    preview: () => <ElButton>预览按钮</ElButton>,
    resize: {
        width: true,
        height: true
    },
    render({ props, events, size }) {
        if (
            (events.redirect != undefined && events.alert != undefined) ||
            (events.redirect != undefined && events.alert == undefined) ||
            (events.redirect == undefined && events.alert != undefined)) {
            return <ElButton
                style={{ height: size.height + 'px', width: size.width + 'px', fontSize: props.fontsize + 'px' }}
                type={props.type}
                onClick={() => this.handleClick(events.alert, events.redirect)}
                size={props.size}>{props.text || '按钮'}</ElButton>
        } else {
            return <ElButton style={{ height: size.height + 'px', width: size.width + 'px', fontSize: props.fontsize + 'px' }} type={props.type} size={props.size}>{props.text || '按钮'}</ElButton>
        }
    },
    key: 'button',
    props: {
        text: createInputProp('按钮内容'),
        fontsize: createInputNumProp('字体大小/px'),
        type: createSelectProp('按钮类型', [
            { label: '基础', value: 'primary' },
            { label: '成功', value: 'success' },
            { label: '警告', value: 'warning' },
            { label: '危险', value: 'danger' },
            { label: '文本', value: 'text' },
        ]),
        size: createSelectProp('按钮尺寸', [
            { label: '默认', value: 'default' },
            { label: '大', value: 'large' },
            { label: '小', value: 'small' }
        ])
    },
    events: {
        ...eventList
    },
    handleClick(alert, redirect) {
        // 循环触发绑定的事件
        Object.keys(events).forEach(event => {
            if (event == 'alert') events['alert'](alert)
            if (event == 'redirect') events['redirect'](redirect)
        })
    }
})

registerConfig.register({
    lable: '输入框',
    resize: {
        width: true, // 更改输入框的横向大小
    },
    preview: () => <ElInput placeholder="预览输入框" ></ElInput>,
    render: ({ model, props, size }) => <ElInput placeholder={props.text == null ? '请输入内容' : props.text}  {...model.default} style={{ width: size.width + 'px' }}></ElInput>,
    key: 'input',
    model: {
        default: '绑定字段'
    },
    props: {
        text: createInputProp('提示信息'),
    },
    events: {
        ...eventList
    },
    handleClick(alert, redirect) {
        // 循环触发绑定的事件
        Object.keys(events).forEach(event => {
            if (event == 'alert') events['alert'](alert)
            if (event == 'redirect') events['redirect'](redirect)
        })
    }
})

registerConfig.register({
    lable: '链接',
    preview: () => <ElLink>预览链接</ElLink>,
    render: ({ props }) => <ElLink type={props.type} underline={props.underline} disabled={props.disabled} href={'https:' + props.link} target="_blank" style={{ fontSize: props.fontSize + 'px' }}>{props.text || '链接'}</ElLink>,
    key: 'link',
    props: {
        text: createInputProp('链接名字'),
        link: createAddressProp('链接地址'),
        fontSize: createInputNumProp('字体大小/px'),
        type: createSelectProp('链接类型', [
            { label: '默认', value: 'default' },
            { label: '基础', value: 'primary' },
            { label: '成功', value: 'success' },
            { label: '警告', value: 'warning' },
            { label: '危险', value: 'danger' },
            { label: '文本', value: 'info' },
        ]),
        underline: createSelectProp('是否下划线', [
            { label: '是', value: true },
            { label: '否', value: false },
        ]),
        disabled: createSelectProp('是否禁用', [
            { label: '是', value: true },
            { label: '否', value: false },
        ]),
    },
    events: {
        ...eventList
    },
    handleClick(alert, redirect) {
        // 循环触发绑定的事件
        Object.keys(events).forEach(event => {
            if (event == 'alert') events['alert'](alert)
            if (event == 'redirect') events['redirect'](redirect)
        })
    }
})
registerConfig.register({
    lable: '图片',
    resize: {
        width: true,
        height: true
    },
    preview: () => <ElIcon size={30}> <PictureFilled /></ElIcon>,
    render({ props, events, size }) {
        if (
            (events.redirect != undefined && events.alert != undefined) ||
            (events.redirect != undefined && events.alert == undefined) ||
            (events.redirect == undefined && events.alert != undefined)) {
            return <img
                src={props.picture ? props.picture : imgdata}
                class="avatar"
                onClick={() => this.handleClick(events.alert, events.redirect)}
                style={{ width: (size.width == undefined ? props.width : size.width + 'px'), height: (size.height == undefined ? props.height : size.height + 'px') }}
            />
        } else {
            return <img
                src={props.picture ? props.picture : imgdata}
                class="avatar"
                style={{ width: (size.width == undefined ? props.width : size.width + 'px'), height: (size.height == undefined ? props.height : size.height + 'px') }}
            />
        }
    },
    key: 'picture',
    props: {
        height: createSelectProp("图片高度", [
            { label: "50px", value: "50px" },
            { label: "100px", value: "100px" },
            { label: "150px", value: "150px" },
            { label: "200px", value: "200px" },
            { label: "250px", value: "250px" },
        ]),
        width: createSelectProp("图片宽度", [
            { label: "50px", value: "50px" },
            { label: "100px", value: "100px" },
            { label: "150px", value: "150px" },
            { label: "200px", value: "200px" },
            { label: "250px", value: "250px" },
        ]),
        picture: createPictureProp('图片导入')
    },
    events: {
        ...eventList
    },
    handleClick(alert, redirect) {
        // 循环触发绑定的事件
        Object.keys(events).forEach(event => {
            if (event == 'alert') events['alert'](alert)
            if (event == 'redirect') events['redirect'](redirect)
        })
    }
})
registerConfig.register({
    lable: "音频播放器",
    resize: {
        width: true,
        height: true,
    },
    // preview: () => <video controls src="" height="100" width="200"></video>,
    preview: () => <ElIcon size={30}><VideoCameraFilled /></ElIcon>,
    render: ({ props, size }) => (
        //console.log(size.width, "@!@!"),
        //console.log(props),
        <video video
            controls
            src={props.filePath}
            style={{ width: (size.width == undefined ? props.width : size.width + 'px'), height: (size.height == undefined ? props.height : size.height + 'px') }}
        >
            {props.filePath || "视频渲染"}
        </video >
    ),
    key: "video",
    props: {
        height: createSelectProp("视频高度", [
            { label: "50px", value: "50px" },
            { label: "100px", value: "100px" },
            { label: "150px", value: "150px" },
            { label: "200px", value: "200px" },
            { label: "250px", value: "250px" },
        ]),
        width: createSelectProp("视频宽度", [
            { label: "50px", value: "50px" },
            { label: "100px", value: "100px" },
            { label: "150px", value: "150px" },
            { label: "200px", value: "200px" },
            { label: "250px", value: "250px" },
        ]),
        filePath: createFileProp("视频导入")
    },
    events: {
        ...eventList
    },
    handleClick(alert, redirect) {
        // 循环触发绑定的事件
        Object.keys(events).forEach(event => {
            if (event == 'alert') events['alert'](alert)
            if (event == 'redirect') events['redirect'](redirect)
        })
    }
})