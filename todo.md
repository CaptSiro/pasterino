# Question

After some digging in 7tv source code for my answer I have stumbled on dead end right before getting answered. Could anyone from the dev team explain to me or give me implementation details on
```typescript
// located in src/types/twitch.d.ts:526
Twitch.ChatSlate.apply(operation);
```
for specific use-case in
```typescript
// located in src/site/twitch.tv/modules/chat-input/ChatInput.vue:268
slate.apply({ type: "insert_text", path: cursorLocation.path, offset: wordStart, text: replacement });
```
I cant get any further because when I try to bring up
```typescript
Twitch.ChatSlate.apply
```
usages to find implementation for this function I only get where it is called not defined.
(I'm not very familiar how Vue or React works, since I only worked in vanilla JS or TS)

# Answer

It's a function from twitch. See https://github.com/SevenTV/Extension/blob/97f75e38204cdcc747e60e380eb68056df041d8e/src/common/ReactHooks.ts#L64-L100
and https://github.com/SevenTV/Extension/blob/97f75e38204cdcc747e60e380eb68056df041d8e/src/site/twitch.tv/modules/chat-input/ChatInputModule.vue#L31-L46
and https://github.com/SevenTV/Extension/blob/97f75e38204cdcc747e60e380eb68056df041d8e/src/site/twitch.tv/modules/chat-input/ChatInput.vue#L172-L174
on how to find it. It can be simplified to

```javascript
const findReact = dom => {
    for (const key in dom) {
        if (key.startsWith("__reactInternalInstance$")) {
            return Reflect.get(dom, key); // or dom[key]
        }
    }
};
const walk = (root, predicate) => {
    let node = root;
    for (let step = 0; node && step < 42; step++) {
        if (node.stateNode && !(node.stateNode instanceof Element)) {
            if (predicate(node.stateNode)) {
                return node;
            }
        }
        node = node.child;
    }
};
walk(findReact(document.querySelector('.chat-input__textarea')), x => 'providers' in x).stateNode.componentRef.state.slateEditor
```


