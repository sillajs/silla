let parent;
const helper = document.createElement('i');

/**
 * Create and attach a dom element.
 *
 * Warning:
 *   Does not protect against potential XXS attacks that could
 *   be caused if injecting variables into the element string
 *
 * @returns Element the dom element
 */
module.exports = function $(elementStr, content, attach, ref) {
  // Matches (TAG.CLASS.LIST)(#ID)( ATTRS)
  const m = ((elementStr || '').match(/^([^\s#]*)(?:#(\S+))?(.*)$/) || []);
  const m1 = (m[1] || '').split('.');

  // Utilize innerHTML's built-in parser for parsing attributes,
  // since specific-use cases can be complicated.
  helper.innerHTML = `<${m1[0] || 'div'} ${m[3]}>`;
  const dom = helper.children[0].cloneNode();

  // Add id and classes
  if (m[2]) dom.id = m[2];
  for (let i = 1; i < m1.length; i++) {
    dom.classList.add(m1[i]);
  }

  if (content instanceof Element) {
    // This means there is no content, so we reassign the arguments
    // accordingly. This is hacky, but an alternative of shifting
    // the arguments requires a larger payload when prepocessing, and is
    // less performant.
    ref = attach;
    attach = content;
  } else if (typeof content === 'function') {
      const previous = parent;
      parent = dom;
      content(dom);
      parent = previous;
  } else if (content !== undefined && content !== null) {
    dom.innerText = content;
  }

  // Attach to provided node, parent, or body
  const container = attach || parent || document.body;
  ref ? container.insertBefore(dom, ref) : container.append(dom);

  return dom;
};
