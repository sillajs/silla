# silla.js
A super simple, extremely small, and pretty useful tool for building dom elements in JavaScript

## Getting Started
### Install
    npm i silla

### Usage
    import $ from 'silla';
    $('h1', 'Hola, Mundo');

### Todo List Example
    const items = ['Start using silla', 'Focus on my project'];
    $('section', () => {
      $('header', () => {
        $('h1', 'Todo List');
        const input = $('input type="text" placeholder="Add a new item"');
        $('button.add', 'Add').onclick = () => {
          $('li.todo-item', input.value, ul);
        };
      });
      const ul = $('ul.todo-items', () => {
        items.forEach(item => $('li.todo-item', item));
      });
    });

## Syntax
$(`ELEMENT_STRING`, `CONTENT`, `ATTACH_NODE`, `REFERENCE_NODE`);

Returns the created  [DOM Element](https://www.w3schools.com/jsref/dom_obj_all.asp)

#### ELEMENT_STRING
Text-representatin of the element being created, in the following order:
1) Tag. Defaults to `div`.
1) Classes. Prefixed with a `.`, as in `.first.second.third`
1) Id. Prefixed with a #, as in `#first-name`
1) Attributes. Each is separated by a space, and functions the same as when createad in an HTML tag.

##### Examples:
* `$('div')` or `$('')` or `$()`
    * `<div></div>`

* `$('div.block')` or `$('.block')`
    * `<div class="block"></div>`

* `$('h1.title')`
    * `<h1 class="title"></h1>`

* `$('input type="checkbox" checked')`
    * `<input type="checkbox" checked>`

* `$('i.icon.close#close-icon aria-hidden="true" title="Close Icon"')`
    * `<i id="close-icon" aria-hidden="true" title="Close Icon" class="icon close"></i>`

#### CONTENT (optional)
Either a function or string. (non-element value will be converted to a string)
##### Content as text:
* `$('span', 'Hello, World')` ⇒ `<span>Hello, World</div>`
* `$('button', 'Click Me')` ⇒ `<button>Click Me</button>`
* `$('button', 42)` ⇒ `<button>42</button>`

##### Content as a function:
Passes the dom element as an arg. This is usually unnecessary, since elements are automatically appended to the containing element. However, in cases of delayed execution (timeout, event callback, etc.) it can often be useful.

        $('ul.items', ul => {  // ul unused in this example
            $('li', 'Item 1');
            $('li', () => {
                $('span', 'Item');
                $('span', '2');
            });
        });

*Output:*

    <ul class="items">
        <li>Item 1</li>
        <li>
            <span>Item</span>
            <span>2</span>
        </li>
    </ul>

**Note**:
If content arg is not specified, `ATTACH_NODE` and `REFERENCE_NDOE` can be used as 2nd and 3rd arguments, r espectively, as in this example:

    $('input', document.body);

#### ATTACH_NODE (optional)
Determines which parent node to attach to. If not specified, attaches to the node in our current context. The context node is either the node for which we're currently executing its content function, or it is `document.body`.

    $('section', () => {
       $('h1', 'This element is a child of section');
       $('.popup', '...and this is a child of body', document.body);
    });

Be careful with code that has delayed execution, since its context is lost. For this reason, it's often useful to use the node argument to attach it explicitly.

    $('section', section => {
       $('button', 'Click Me').onclick = () => {
          $('h1', 'This element gets appended to document.body');
          $('h1', 'Wherease this will get appended in section', section);
       };
    });

#### REFERENCE_NODE (optional)
Rather than appending to the `ATTACH_NODE` you can insert before this reference node.

    $('section', section => {
       const button = $('button', 'Insert Above')
       button.onclick = () => {
          $('div', `Item ${section.children.length}`, section, button);
       };
    });
