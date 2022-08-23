import { defineComponent, inject, watch, reactive } from "vue";
import { ElForm, ElFormItem, ElButton, ElInput, ElCollapse, ElCollapseItem } from 'element-plus'
import deepcopy from "deepcopy"
import './editor.scss'

export default defineComponent({
    props: {
        block: { type: Object }, // 用户最后选中的元素
        data: { type: Object }, // 当前所有的数据
        updateContainer: { type: Function },//更改容器的数据
        updateBlock: { type: Function },//更改组件的数据
    },
    setup(props, ctx) {
        console.log(props)
        const config = inject('config')// 组件的配置信息
        const state = reactive({
            editData: {}
        })
        //重置
        const reset = () => {
            if (props.block) {
                state.editData = deepcopy(props.block)
            }
        }
        //应用按钮点击事件
        const apply = () => {
            if (props.block) {
                props.updateBlock(state.editData, props.block)
            }
            console.log(state.editData)

        }
        watch(() => props.block, reset, { immediate: true })
        return () => {
            let content = []
            if (props.block) {
                let component = config.componentMap[props.block.key];
                if (component && component.events) {
                    content.push(Object.entries(component.events).map(([propName, propConfig]) => {
                        return <div class="collapsebox">
                            <ElCollapse >
                                <ElCollapseItem title={propConfig.label}>
                                    <div >
                                        {/* <div class="dialog-font">触发条件：</div>
                                        <ElRadioGroup style="float:left" v-model={state.editData.events['mousetype']}>
                                            <ElRadio label="single" size="large">鼠标单击</ElRadio>
                                            <ElRadio label="double" size="large">鼠标双击</ElRadio>
                                        </ElRadioGroup> */}
                                        <div class="dialog-font" >{propConfig.title}</div>
                                        <ElInput type="textarea"
                                            placeholder={propConfig.hint}
                                            v-model={state.editData.events[propConfig.key]}
                                            disabled={component.lable == '输入框' || component.lable == '链接' || component.lable == '音频播放器' ? true : false}
                                        >
                                        </ElInput>
                                        <ElFormItem style="padding-top:10px" >
                                            <ElButton type="primary"
                                                disabled={component.lable == '输入框' || component.lable == '链接' || component.lable == '音频播放器' ? true : false}
                                                onClick={() => apply()} >添加</ElButton>
                                            <ElButton
                                                disabled={component.lable == '输入框' || component.lable == '链接' || component.lable == '音频播放器' ? true : false}
                                                onClick={reset}>重置</ElButton>
                                        </ElFormItem>
                                    </div>
                                </ElCollapseItem>
                            </ElCollapse>
                        </div>

                    }))
                }
            }


            return <ElForm labelPosition="top" style="padding:30px" >
                {content}
            </ElForm>
        }
    }
})