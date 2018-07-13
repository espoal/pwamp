
import {Component} from 'modules/Component'

export class HtmlPage extends Component {
  // language=HTML

  html = ({head, body, foot = ''}) => `
    <!DOCTYPE html>
    <html>
    ${head}
    ${body}  
    ${foot}    
    </html>
`

  // language=CSS

  style = () => ``

  static routeMatch = ({url}) => false
}
