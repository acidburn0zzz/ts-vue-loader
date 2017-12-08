import { Vue, Component } from 'vue-property-decorator'
import Count1 from './Count1'
import Count2 from './Count2'

@Component({
  components: {Count1, Count2},
  template: `<div>
    <p>This demo is stupid, but it shows how components are reloaded</p>
    <Count1></Count1>
    <Count2></Count2>
  </div>`
})
export default class App extends Vue {
}
