import { EN_STORY } from "./en-story"
import { EN_PRODUCT } from "./en-product"
import { EN_CLOSE } from "./en-close"

export const C = { ...EN_STORY, ...EN_PRODUCT, ...EN_CLOSE } as const
