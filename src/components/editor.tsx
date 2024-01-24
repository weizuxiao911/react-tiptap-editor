import { useEditor } from '@tiptap/react'

// import StarterKit from '@tiptap/starter-kit'
// import { CodeBlock } from '@tiptap/extension-code-block'
import { Document } from '../extensions/document'
import { Heading } from '@tiptap/extension-heading'
import { Paragraph } from '../extensions/paragraph'
import { Text } from '../extensions/text'
import { Blockquote } from '@tiptap/extension-blockquote'
import { BulletList } from '@tiptap/extension-bullet-list'
import { OrderedList } from '@tiptap/extension-ordered-list'
import { ListItem } from '@tiptap/extension-list-item'
// import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { CodeBlcok } from '../extensions/code-block'
import { lowlight } from 'lowlight'
import { Image } from '@tiptap/extension-image'
import { HardBreak } from '@tiptap/extension-hard-break'

import TextStyle from '@tiptap/extension-text-style'
import { Code } from '@tiptap/extension-code'
import { Bold } from '@tiptap/extension-bold'
import { Italic } from '@tiptap/extension-italic'
import { Strike } from '@tiptap/extension-strike'
import Underline from '@tiptap/extension-underline'
import { Link } from '@tiptap/extension-link'
import Color from '@tiptap/extension-color'
import { Subscript } from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'

import History from '@tiptap/extension-history'
import Gapcursor from '@tiptap/extension-gapcursor'
import { HorizontalRule } from '@tiptap/extension-horizontal-rule'
import { Selection } from '../extensions/selection'
import { BubbleFloatingMenu } from '../extensions/bubble-floating-menu'
import { Tooltip } from '../extensions/tooltip'

import BubblMenu from './bubble-menu'
import FloatingMenu from './floating-menu'
import Tips from './tips'
import { Action } from '../extensions/action'
import { Title } from '../extensions/title'


const Editor = () => {

    return useEditor({
        autofocus: true,
        content: '',
        extensions: [
            History,
            Gapcursor,
            Document,
            Paragraph,
            Text,
            Heading,
            Title,
            Blockquote,
            BulletList,
            OrderedList,
            ListItem,
            Image,
            HardBreak,
            HorizontalRule,
            TextStyle,
            Code,
            Bold,
            Italic,
            Strike,
            Underline,
            Subscript,
            Superscript,
            CodeBlcok.configure({
                lowlight
            }),
            Link.configure({
                openOnClick: false,
            }),
            Color.configure({
                types: ['textStyle'],
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph', 'image'],
            }),
            Highlight,
            // Placeholder.configure({
            //     placeholder: ({ node }) => {
            //         if (node.type.name === 'title') {
            //             return 'What’s the title?'
            //         }

            //         return 'Can you add some further context?'
            //     },
            // }),
            Selection,
            BubbleFloatingMenu.configure({
                bubble: BubblMenu,
                floating: FloatingMenu,
            }),
            Tooltip.configure({
                component: Tips
            }),

            Action,

        ],

    })
}

export default Editor