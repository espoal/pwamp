export class Component {
  render () { return this.html() }

  html = () => { }

  style = () => { }

  data = () => { return {} }

  scripts = () => { }

  tags = () => { }
}

export class StaticComponent {
    static render = () => {
      return {
        html: StaticComponent.html(),
        css: StaticComponent.style(),
        tags: StaticComponent.tags()
      }
    }

    static html = () => 'hello world'

    static style = () => 'style'

    static tags = () => { return {} }
}
