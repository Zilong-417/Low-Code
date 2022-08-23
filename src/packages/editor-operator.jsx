import { defineComponent, inject, watch, reactive, provide } from "vue";
import { ElForm, ElFormItem, ElButton, ElInputNumber, ElColorPicker, ElSelect, ElOption, ElInput, ElUpload, ElImage } from 'element-plus'
import deepcopy from "deepcopy"
import './editor.scss'
import { events } from "./events";

export default defineComponent({
    props: {
        block: { type: Object }, // 用户最后选中的元素
        data: { type: Object }, // 当前所有的数据
        updateContainer: { type: Function },//更改容器的数据
        updateBlock: { type: Function },//更改组件的数据

    },
    setup(props, ctx) {
        const config = inject('config')// 组件的配置信息
        const state = reactive({
            editData: {}
        })

        let AUDIO = ''
        //保存视频
        const updateFace = (e) => {
            const file = e.target.files[0] || e.dataTransfer.files[0]

            // //转换成base64码
            // let reader = new FileReader()
            // reader.readAsDataURL(file)
            // reader.onload = () => {
            //   AUDIO = reader.result
            //   console.log(props.data,"block")
            //   state.editData.props.filePath = AUDIO
            //   // console.log(AUDIO,'地址')
            // }
            let URL = window.URL || window.webkitURL
            AUDIO = URL.createObjectURL(file)
            state.editData.props.filePath = AUDIO
            console.log(state.editData.props, '地址')
        }

        //重置
        const reset = () => {
            if (!props.block) { // 说明要绑定的是容器的宽度和高度
                state.editData = deepcopy(props.data.container)
            } else {
                state.editData = deepcopy(props.block)
                //console.log(props.block)
            }
        }
        //应用按钮点击事件
        const apply = () => {
            if (!props.block) { // 更改组件容器的大小
                props.updateContainer({ ...props.data, container: state.editData })
            } else { // 更改组件的配置
                props.updateBlock(state.editData, props.block),
                    events.emit("blocksize", { ...state.editData })
            }
            console.log(state.editData)

        }
        // 上传成功，获取返回的图片地址
        const handleAvatarSuccess = (res, file) => {
            state.editData.props['picture'] = URL.createObjectURL(file.raw)
        }
        // 上传前，限制的上传图片大小
        const beforeAvatarUpload = (file) => {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
        watch(() => props.block, reset, { immediate: true })
        return () => {
            let content = []
            if (!props.block) {
                content.push(<>
                    <ElFormItem label="容器宽度">
                        <ElInputNumber controls-position="right" style="width:400px" v-model={state.editData.width}></ElInputNumber>
                    </ElFormItem>
                    <ElFormItem label="容器高度">
                        <ElInputNumber controls-position="right" style="width:400px" v-model={state.editData.height}></ElInputNumber>
                    </ElFormItem>
                </>)
            } else {
                let component = config.componentMap[props.block.key];
                if (component && component.props) {
                    content.push(Object.entries(component.props).map(([propName, propConfig]) => {
                        return <ElFormItem label={propConfig.label}>
                            {{
                                input: () => <ElInput style="width:400px" v-model={state.editData.props[propName]}></ElInput>,
                                color: () => <ElColorPicker v-model={state.editData.props[propName]}></ElColorPicker>,
                                select: () => <ElSelect style="width:400px" v-model={state.editData.props[propName]}>
                                    {propConfig.options.map(opt => {
                                        return <ElOption label={opt.label} value={opt.value}></ElOption>
                                    })}
                                </ElSelect>,
                                link: () =>
                                    <div id="prepend">
                                        <div>Https://</div>
                                        <ElInput v-model={state.editData.props[propName]} style="width:180px"></ElInput>
                                    </div>,
                                picture: () =>
                                    <ElUpload
                                        //此处的接口为网上开放接口，已在vue.config.js文件中配置跨域代理
                                        action="/dev-api/admin/product/fileUpload"
                                        show-file-list={false}
                                        on-success={handleAvatarSuccess}
                                        before-upload={beforeAvatarUpload}
                                        v-model={state.editData.props[propName]}
                                        limit={1}
                                    >
                                        <div class="uploader-box">
                                            <ElImage v-show={state.editData.props['picture']} src={state.editData.props['picture']} class="avatar"></ElImage>
                                            <ElButton type="success" >{!state.editData.props['picture'] ? '点击上传' : '点击替换'}</ElButton>
                                        </div>

                                    </ElUpload>,
                                file: () =>
                                    <div>
                                        <input class="file" type="file" accept="video/*" onchange={updateFace} ></input>
                                        {/* <video class="video" src={AUDIO} controls></video> */}
                                        {/* <button onClick={console.log(AUDIO,'onclick')}>删除视频</button> */}
                                    </div>

                            }[propConfig.type]()}
                        </ElFormItem >

                    }))
                }
                if (component && component.model) {
                    //                                                 default   标签名
                    content.push(Object.entries(component.model).map(([modelName, label]) => {
                        return <ElFormItem label={label}>
                            <ElInput v-model={state.editData.model[modelName]}></ElInput>
                        </ElFormItem>
                    }))
                }
            }


            return <ElForm labelPosition="top" style="padding:30px" >
                {content}
                <ElFormItem>
                    <ElButton type="primary" onClick={() => apply()} >应用</ElButton>
                    <ElButton onClick={reset} >重置</ElButton>
                </ElFormItem>
            </ElForm>
        }
    }
})