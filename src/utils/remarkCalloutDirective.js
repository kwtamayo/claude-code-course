import { visit } from 'unist-util-visit'

/**
 * Remark plugin that converts :::warning / :::info container directives
 * into custom elements that react-markdown can render as <Callout> components.
 *
 * Usage in markdown:
 *   :::warning
 *   Your warning text here
 *   :::
 *
 *   :::info
 *   A helpful note
 *   :::
 */
export function remarkCalloutDirective() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === 'containerDirective' &&
        (node.name === 'warning' || node.name === 'info')
      ) {
        const data = node.data || (node.data = {})
        data.hName = 'callout'
        data.hProperties = { type: node.name }
      }
    })
  }
}
