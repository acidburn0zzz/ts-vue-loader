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
let notVueComponent = `
    var Greeter = (function () {
        function Greeter(greeting) {
            this.greeting = greeting;
        }
        Greeter.prototype.greet = function () {
            return "<h1>" + this.greeting + "</h1>";
        };
        return Greeter;
    }());
    ;
    var greeter = new Greeter("Hello, world!");
    export default greeter.greet();
`

let fakeLoaderContext = {
  cacheable () { },
  minimize: false,
  resourcePath: 'fake'
}

test('loader detects Vue Component', t => {
  let content = loader.bind(fakeLoaderContext)(vueComponent)
  t.regex(content, /api\.reload\(\'[0-9a-z]+\', DemoComponent\.options\)/g)
})

test('loader does nothing', t => {
  let content = loader.bind(fakeLoaderContext)(notVueComponent)
  t.notRegex(content, /api\.reload\(\'[0-9a-z]+\', DemoComponent\.options\)/g)
})