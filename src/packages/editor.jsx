import { computed, defineComponent, inject, ref } from "vue";
import './editor.scss'
import editorBlock from "./editor-block";
import deepcopy from "deepcopy";
import { useMenuDragger } from "./useMenuDragger";
import { useFocus } from "./useFocus";
import { useBlockDragger } from "./useBlockDragger";
import { useCommand } from "./useCommand";
import { $dialog } from "../components/Dialog";
import { ElButton, ElCard, ElTabs, ElTabPane, ElIcon, ElTooltip } from 'element-plus';
import EditorOperator from "./editor-operator";
import EditorEvent from "./editor-event";

export default defineComponent({
    //接收App.vue v-model双向绑定值
    props: {
        modelValue: { type: Object },
        formData: { type: Object },
    },
    components: {
        editorBlock,
        ElButton,
        ElCard,
        EditorOperator
    },
    //要触发的事件
    emits: ['update:modelValue'],

    setup(props, ctx) {
        console.log(props)
        // 预览的时候 内容不能在操作了 ，可以点击 输入内容 方便看效果
        const previewRef = ref(false);
        const data = computed({
            get() {
                return props.modelValue
            },
            set(newValue) {
                ctx.emit('update:modelValue', deepcopy(newValue))
            }
        });
        //内容区大小
        const containerStyles = computed(() => ({
            width: data.value.container.width + 'px',
            height: data.value.container.height + 'px'
        }))
        const config = inject('config')

        const containerRef = ref(null);
        // 1.实现菜单的拖拽功能
        const { dragstart, dragend } = useMenuDragger(containerRef, data);

        // 2.实现获取焦点 选中后可能直接就进行拖拽了
        let {
            blockMousedown,
            focusData,
            containerMousedown,
            lastSelectBlock, clearBlockFocus
        } = useFocus(data, previewRef, (e) => {
            // 获取焦点后进行拖拽
            mousedown(e)
        });
        // 2.实现组件拖拽
        let { mousedown, markLine } = useBlockDragger(focusData, lastSelectBlock, data);

        const { commands } = useCommand(data, focusData); // 引入
        const buttons = [

            { label: '撤销', handler: () => commands.undo() },
            { label: '还原', handler: () => commands.redo() },
            {
                label: '导出', handler: () => {
                    $dialog({
                        title: '导出json使用',
                        content: JSON.stringify(data.value),
                    })
                }
            },
            { label: '删除选中', handler: () => commands.delete() },
            { label: '清空画布', handler: () => commands.deleteAll() },
            {

                label: '预览', handler: () => {
                    previewRef.value = !previewRef.value;
                    clearBlockFocus();
                }

            },
            {
                label: '保存', handler: () => commands.save(JSON.stringify(data.value))
            },
        ]
        //主题色
        const allColorStyle = [
            {
                label: '机器',
                value: ['#061D75', '#E2E4E7', '#878584']
            },
            {
                label: '反常',
                value: ['#4C5C40', '#727989', '#D8AE4B']
            },
            {
                label: '孤独',
                value: ['#1D3851', '#4A6683', '#D7941D']
            },
            {
                label: '母亲',
                value: ['#AB9281', '#717588', '#C1962E']
            },
            {
                label: '特立独行',
                value: ['#154599', '#918081', '#E5CAB9']
            },
            {
                label: '存活',
                value: ['#925235', '#BCBAB0', '#D8AE4B']
            },
            {
                label: '作者',
                value: ['#58666B', '#5E7B8E', '#B74325']
            },
            {
                label: '可燃',
                value: ['#7B7066', '#617995', '#B15B17']
            },
            {
                label: '无题',
                value: ['#A69D9C', '#5D6E7F', '#D8AE48']
            },
            {
                label: '反重力',
                value: ['#4B5365', '#7C6866', '#CD8921']
            },
            {
                label: '素衣化缁',
                value: ['#111', '#636363', '#858586']
            },
            {
                label: '白蔷薇',
                value: ['#151E17', '#CAE0E5', '#656E59']
            },
            {
                label: '绿水青山',
                value: ['#2E3A35', '#948947', '#244140']
            },
            {
                label: '日暮',
                value: ['#3A454B', '#FF5100', '#AC6D46']
            },
            {
                label: '彤云密布',
                value: ['#FEEDE3', '#EDCBB8', '#025E7D']
            },
            {
                label: '仙鹤',
                value: ['#FEFCFC', '#C77C83', '#252D27']
            },
        ]
        //修改主题色
        const changecolorstyle = function () {
            let select = document.getElementById("sel");
            let val = select.selectedOptions[0]._value;
            console.dir(select.selectedOptions[0]._value);
            const root = document.querySelector(":root");
            // let darkColor = getComputedStyle(root).getPropertyValue("--darkColor");
            // let midColor = getComputedStyle(root).getPropertyValue("--midColor");
            // let lightColor = getComputedStyle(root).getPropertyValue("--lightColor");
            root.style.setProperty("--darkColor", val[0]);
            root.style.setProperty("--lightColor", val[1]);
            root.style.setProperty("--midColor", val[2]);
        }
        return () =>
            <div class="editor">
                <div class="editor-left">
                    {config.componentList.map(component => (
                        <div class="editor-left-item"
                            draggable
                            onDragstart={e => dragstart(e, component)}
                            onDragend={dragend} >
                            <span>{component.lable}</span>
                            <div >{component.preview()}</div>
                        </div>
                    ))}
                </div>
                <ElTooltip
                    class="box-item"
                    effect="dark"
                    content="ctrl+y 还原/  ctrl+z 撤销/  shift+左键 多选"
                    placement="left"
                >
                    <ElIcon size={30} class="editor-icon"><InfoFilled /></ElIcon>
                </ElTooltip>
                <div class="editor-top">
                    {buttons.map((btn, index) => {
                        const label =
                            typeof btn.label == 'function' ? btn.label() : btn.label
                        return (
                            <el-button plain class="editor-top-button" onClick={btn.handler}>
                                <span>{label}</span>
                            </el-button >)
                    })}
                    <div class="changeColor-select">
                        <span>主题色：</span>
                        <select id="sel" onChange={changecolorstyle}>
                            {allColorStyle.map((item, index) => {
                                return (
                                    <option key={index} value={item.value}>
                                        {item.label}
                                    </option>
                                );
                            })}

                        </select>
                    </div>
                </div>
                <div class="editor-right">
                    <div class="editor-right-title">
                        {/**根据最后是否有选中组件，选择呈现内容 ElTabPane内不能使用v-show/if */}
                        <ElTabs type="border-card" stretch={true} v-show={lastSelectBlock.value == undefined}>
                            <ElTabPane label="画布属性" class="editor-right-title-box">
                                <EditorOperator
                                    block={lastSelectBlock.value}
                                    data={data.value}
                                    updateContainer={commands.updateContainer}
                                    updateBlock={commands.updateBlock}
                                    style="padding:0px;"
                                ></EditorOperator>
                            </ElTabPane>
                        </ElTabs>
                        <ElTabs type="border-card" stretch={true} v-show={lastSelectBlock.value != undefined}>
                            <ElTabPane label="属性" class="editor-right-title-box">
                                <EditorOperator
                                    block={lastSelectBlock.value}
                                    data={data.value}
                                    updateContainer={commands.updateContainer}
                                    updateBlock={commands.updateBlock}
                                    style="padding:0px;"
                                ></EditorOperator>
                            </ElTabPane>
                            <ElTabPane label="事件" class="editor-right-title-box">
                                <EditorEvent
                                    block={lastSelectBlock.value}
                                    data={data.value}
                                    updateBlock={commands.updateBlock}
                                    style="padding:0px;"
                                ></EditorEvent>
                            </ElTabPane>
                        </ElTabs>

                    </div>
                </div>
                <div class="editor-container">
                    <div class="editor-container-canvas">
                        <div class="editor-container-canvas_content"
                            style={containerStyles.value}
                            ref={containerRef}
                            onMousedown={containerMousedown}>
                            {
                                (data.value.blocks.map((block, index) => (
                                    <editorBlock
                                        class={
                                            [block.focus ? 'editor-block-focus' : '',
                                            previewRef.value ? 'editor-block-preview' : '']}
                                        block={block}
                                        onMousedown={(e) => blockMousedown(e, block, index)}
                                        formData={props.formData}
                                    ></editorBlock>
                                )))
                            }
                            {/*辅助线 */}
                            {markLine.x !== null && <div class="line-x" style={{ left: markLine.x + 'px' }}></div>}
                            {markLine.y !== null && <div class="line-y" style={{ top: markLine.y + 'px' }}></div>}

                        </div>
                    </div>
                </div>
                <div class={previewRef.value ? 'bg' : 'editor-block-preview-bg'}>
                    <div class="canvas-container">
                        {buttons.map((btn, index) => {
                            return <el-button class="close" type="danger" round onClick={btn.handler} >关闭</el-button>
                        })}
                        <div class="canvas"
                            style={containerStyles.value}
                            onMousedown={containerMousedown}>
                            {
                                (data.value.blocks.map((block, index) => (
                                    <editorBlock
                                        class={
                                            [block.focus ? 'editor-block-focus' : '', previewRef.value ? 'editor-block-preview' : '']}
                                        onMousedown={(e) => blockMousedown(e, block, index)}
                                        block={block}
                                        formData={props.formData}
                                    ></editorBlock>
                                )))
                            }
                        </div>
                    </div>
                </div>

            </div >

    }
})