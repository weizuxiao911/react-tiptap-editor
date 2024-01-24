import { Node, mergeAttributes, textblockTypeInputRule } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { ActionView } from '../components/action'

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        action: {
            setAction: (attributes: { [key: string]: any }) => ReturnType
        }
    }
}

export interface ActionOptions {
    nodeView?: ((props?: any) => React.JSX.Element) | null
}

export const backtickInputRegex = /^```action[\s\n]$/
export const tildeInputRegex = /^~~~action[\s\n]$/

export const Action = Node.create<ActionOptions>({
    name: 'action',

    group: 'block',
    content: 'text*',
    // atom: true, 
    defining: true,

    parseHTML() {
        return [
            {
                tag: 'action',
                preserveWhitespace: 'full',
            },
        ]
    },

    renderHTML({ node, HTMLAttributes }) {
        return [
            'action',
            mergeAttributes(HTMLAttributes),
            [
                'code',
                {
                    class: node.attrs.language ? node.attrs.language : null,
                },
                0,
            ],
        ]
    },

    addOptions() {
        return {
            nodeView: null
        }
    },

    addAttributes() {
        return {
            title: {
                default: '',
            },
        }
    },

    addNodeView() {
        return ReactNodeViewRenderer(this.options?.nodeView ?? ActionView)
    },

    addCommands() {
        return {
            setAction: attributes => ({ commands }) => {
                return commands.setNode(this.name, attributes)
            },
        }
    },

    addInputRules() {
        return [
            textblockTypeInputRule({
                find: backtickInputRegex,
                type: this.type,
                getAttributes: match => ({
                    language: match[1],
                }),
            }),
            textblockTypeInputRule({
                find: tildeInputRegex,
                type: this.type,
                getAttributes: match => ({
                    language: match[1],
                }),
            }),
        ]
    },

})