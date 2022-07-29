import { computed } from 'vue'
export function useFocus(data, callback) {
    const focusData = computed(() => {
        let focus = []
        let unfocus = []
        data.value.blocks.forEach(block => (block.focus ? focus : unfocus).push(block))
        return { focus, unfocus }
    })
    const clearBlockFocus = () => {
        data.value.blocks.forEach(block => block.focus = false)
    }
    const blockMousedown = (e, block) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.shiftKey) {
            block.focus = !block.focus
        } else {
            if (!block.focus) {
                clearBlockFocus()
                block.focus = true
            } else {
                block.focus = false
            }
        }
        callback(e)
    }
    //实现拖拽多个元素
    const containerMousedown = () => {
        clearBlockFocus()
    }
    return {
        blockMousedown, focusData, containerMousedown
    }
}