import { mergeAttributes, Node } from '@tiptap/core'

export interface ParagraphOptions {
    HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        paragraph: {
            /**
             * Toggle a paragraph
             */
            setParagraph: () => ReturnType,
        }
    }
}

/** paragraph */
export const Paragraph = Node.create<ParagraphOptions>({
    name: 'paragraph',

    addOptions() {
        return {
            HTMLAttributes: {
                class: ''
            },
        }
    },

    group: 'block',

    content: 'inline*',

    parseHTML() {
        return [
            { tag: 'div' },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
    },

    addCommands() {
        return {
            setParagraph: () => ({ commands }) => {
                return commands.setNode(this.name)
            },
        }
    },

    addKeyboardShortcuts() {
        return {
            'Mod-Alt-0': () => this.editor.commands.setParagraph(),
        }
    },
})
