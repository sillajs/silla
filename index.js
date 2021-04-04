const context = [];
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
module.exports = function $() {
  // User "arguments" instead of ...args to reduce payload when
  // converting to browser backwards-compatible code.
  const args = Array.from(arguments);
  if (context.length === 0) context.push(document.body);

  // Matches (TAG.CLASS.LIST)(#ID)( ATTRS)
  const m = ((args.shift() || '').match(/^([^\s#]*)(?:#(\S+))?(.*)$/) || []);
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

  // Add content
  if (typeof args[0] === 'string') {
    dom.innerText = args.shift();
  } else if (typeof args[0] === 'function') {
    context.unshift(dom);
    args.shift()(dom);
    context.shift();
  }

  // Attach to either provided argument or current context
  (args[0] || context[0])[args[1] ? 'insertBefore' : 'appendChild'](dom, args[1]);

  return dom;
};
