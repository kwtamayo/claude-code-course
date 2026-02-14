import { visit } from 'unist-util-visit'

/**
 * Remark plugin that converts ::validate[task-id] directives
 * into custom elements that react-markdown can render as React components.
 *
 * Usage in markdown:
 *   ::validate[verify-homebrew]
 *
 * This becomes an element with hName "validate" and hProperties { taskId: "verify-homebrew" },
 * which react-markdown maps to whatever component you pass in the `components` prop.
 */
export function remarkValidateDirective() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === 'leafDirective' && node.name === 'validate') {
        // The text inside the brackets becomes the children
        // e.g. ::validate[verify-homebrew] → children text is "verify-homebrew"
        const taskId = node.children?.[0]?.value || ''

        const data = node.data || (node.data = {})
        data.hName = 'validate'
        data.hProperties = { taskId }
      }
    })
  }
}
