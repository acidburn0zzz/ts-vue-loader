import test from 'ava';
import loader from './index.js'

let vueComponent = `
__decorate([
    prop(String),
    Demo(),
    __metadata("design:type", String)
], DemoComponent.prototype, "name", void 0);
DemoComponent = __decorate([
    Component({
        template: "\n    <div>\n      <h1>Hello {{ name }} how are you </h1>\n      <p @click=\"greet\">This componentes use {{ lang }} !</p>\n    </div>"
    })
], DemoComponent);
export default DemoComponent;
`

let fakeLoaderContext = {
  cacheable () { },
  resourcePath: 'fake'
}

test('vue-ts-loader', t => {
  let content = loader.bind(fakeLoaderContext)(vueComponent)
  t.regex(content, /api\.reload\(\'[0-9a-z]+\', DemoComponent\.options\)/g)
});