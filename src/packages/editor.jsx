import { computed, defineComponent, inject, ref } from "vue";
import './editor.scss'
import editorBlock from "./editor-block";
import deepcopy from "deepcopy";
import { useMenuDragger } from "./useMenuDragger";
import { useFocus } from "./useFocus";
import { useBlockDragger } from "./useBlockDragger";
import { useCommand } from "./useCommand";
import { $dialog } from "../components/Dialog";
import { ElButton } from 'element-plus';

export default defineComponent({
    props: {
        modelValue: { type: Object }
    },
    components: {
        editorBlock,
        ElButton
    },
    //要触发的事件
    emits: ['update:modelValue'],
    setup(props, ctx) {
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
        const containerStyles = computed(() => ({
            width: data.value.container.width + 'px',
            height: data.value.container.height + 'px'
        }))
        const config = inject('config')

        const containerRef = ref(null)

        //1.实现菜单的拖拽
        const { dragstart, dragend } = useMenuDragger(containerRef, data)

        //2.实现获取焦点，选中后可能直接就进行拖拽
        let { blockMousedown, focusData, containerMousedown, lastSelectBlock, clearBlockFocus } =
            useFocus(data, previewRef, (e) => {
                mousedown(e)
            })
        //实现组件拖拽
        let { mousedown, markLine } = useBlockDragger(focusData, lastSelectBlock, data)

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

        ]
        return () =>
            <div class="editor">
                <div class="editor-left">
                    {config.componentList.map(component => (
                        <div class="editor-left-item"
                            draggable
                            onDragstart={e => dragstart(e, component)}
                            onDragend={dragend} >
                            <span>{component.lable}</span>
                            <div>{component.preview()}</div>
                        </div>
                    ))}
                </div>
                <div class="editor-top">
                    {buttons.map((btn, index) => {
                        const icon = typeof btn.icon == 'function' ? btn.icon() : btn.icon
                        const label = typeof btn.label == 'function' ? btn.label() : btn.label
                        return <div class="editor-top-button" onClick={btn.handler}>
                            <i class={icon}></i>
                            <span>{label}</span>
                        </div>
                    })}
                </div>
                <div class="editor-right">属性控制栏目</div>
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
                                            [block.focus ? 'editor-block-focus' : '', previewRef.value ? 'editor-block-preview' : '']}
                                        onMousedown={(e) => blockMousedown(e, block, index)}
                                        block={block}
                                    ></editorBlock>
                                )))
                            }
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
                                    ></editorBlock>
                                )))
                            }
                        </div>
                    </div>
                </div>
            </div>

    }
})