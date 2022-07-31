import { computed, defineComponent, inject, ref } from "vue";
import './editor.scss'
import editorBlock from "./editor-block";
import deepcopy from "deepcopy";
import { useMenuDragger } from "./useMenuDragger";
import { useFocus } from "./useFocus";
import { useBlockDragger } from "./useBlockDragger";

export default defineComponent({
    props: {
        modelValue: { type: Object }
    },
    components: {
        editorBlock
    },
    //要触发的事件
    emits: ['update:modelValue'],
    setup(props, ctx) {
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
        let { blockMousedown, focusData, containerMousedown, lastSelectBlock } = useFocus(data, (e) => {
            mousedown(e)
        })
        //实现组件拖拽
        let { mousedown, markLine } = useBlockDragger(focusData, lastSelectBlock, data)
        return () => <div class="editor">
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
            <div class="editor-top">菜单栏</div>
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
                                    class={block.focus ? 'editor-block-focus' : ''}
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
        </div>
    }
})