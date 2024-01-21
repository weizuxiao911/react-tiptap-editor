import { Node } from '@tiptap/core'

/** document */
export const Document = Node.create({
    name: 'document',
    content: 'block+',
    topNode: true,
})