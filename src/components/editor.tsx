import { useEditor } from '@tiptap/react'
import { Document } from '../extensions/document'
import { Heading } from '@tiptap/extension-heading'
import { Paragraph } from '../extensions/paragraph'
import { Text } from '../extensions/text'
import { Blockquote } from '@tiptap/extension-blockquote'
// import { CodeBlock } from '@tiptap/extension-code-block'
import { BulletList } from '@tiptap/extension-bullet-list'
import { OrderedList } from '@tiptap/extension-ordered-list'
import { ListItem } from '@tiptap/extension-list-item'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
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

import History from '@tiptap/extension-history'
import Gapcursor from '@tiptap/extension-gapcursor'
import { HorizontalRule } from '@tiptap/extension-horizontal-rule'
import { Selection } from '../extensions/selection'
import { BubbleMenu } from '../extensions/bubble-menu'

// import StarterKit from '@tiptap/starter-kit'

import Headers from './header'
import Bubble from './bubble'
import Popover from './popover'


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
            Blockquote,
            BulletList,
            OrderedList,
            ListItem,
            Image,
            CodeBlockLowlight.configure({
                lowlight
            }),
            HardBreak,
            HorizontalRule,
            TextStyle,
            TextAlign.configure({
                types: ['heading', 'paragraph', 'image'],
            }),
            Code,
            Bold,
            Italic,
            Strike,
            Underline,
            Subscript,
            Superscript,
            Link.configure({
                openOnClick: false,
            }),
            Color.configure({
                types: ['textStyle'],
            }),
            Highlight,
            Selection,
            BubbleMenu.configure({
                menu: Bubble,
                pops: Popover
            }),

        ],

    })
}

export default Editor