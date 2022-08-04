import { computed, ref } from 'vue'
export function useFocus(data, previewRef, callback) {

    const selectIndex = ref(-1)//表示没有任何一个被选中

    //最后选择的哪一个
    const lastSelectBlock = computed(() => data.value.blocks[selectIndex.value])

    const focusData = computed(() => {
        let focus = []
        let unfocused = []
        data.value.blocks.forEach(block => (block.focus ? focus : unfocused).push(block))
        return { focus, unfocused }
    })
    const clearBlockFocus = () => {
        data.value.blocks.forEach(block => block.focus = false)
    }
    const blockMousedown = (e, block, index) => {
        if (previewRef.value) return;
        e.preventDefault()
        e.stopPropagation()
        //block上我们规划一个属性focus获取焦点后就将focus变成true
        if (e.shiftKey) {
            if (focusData.value.focus.length <= 1) {
                block.focus = true//当前只有一个节点被选中时 摁住shift键也不会focus状态
            } else {
                block.focus = !block.focus
            }
        } else {
            if (!block.focus) {
                clearBlockFocus()
                block.focus = true//要清空其他的focus属性
            } //当自己已经被选中了，再次点击时还是选中状态
        }
        selectIndex.value = index
        callback(e)
    }
    //实现拖拽多个元素
    const containerMousedown = () => {
        if (previewRef.value) return;
        clearBlockFocus()
        selectIndex.value = -1
    }
    return {
        blockMousedown, focusData, containerMousedown, lastSelectBlock, clearBlockFocus
    }
}