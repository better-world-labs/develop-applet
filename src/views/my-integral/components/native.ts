/*
 * @Author: Sandy
 * @Date: 2023-04-25 14:43:40
 * @Description: 
 */

const isShop = ref(false)
const isRealization = ref(false)
export const useNative = () => {
    const activateShop = (_flag = true) => {
        isShop.value = _flag
    }
    const activateRealization = (_flag = true) => {
        isRealization.value = _flag
    }
    return {
        isShop,
        isRealization,
        activateShop,
        activateRealization
    }
}