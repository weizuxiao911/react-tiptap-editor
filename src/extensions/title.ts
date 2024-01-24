import {Node} from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { TitleView } from '../components/title'

export const Title = Node.create({
    name: 'title',

    group: 'block',
    content: 'inline*',

    defining: true,
    // isolating: true, // 无法回车

    parseHTML() {
        return [{
            tag: 'title'
        }]
    },

    renderHTML() {
        return ['title', 0]
    },

    addNodeView() {
        return ReactNodeViewRenderer(TitleView)
    }

})