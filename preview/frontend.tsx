import { createRoot } from 'react-dom/client'
import App from '../src/index'

const container = document.getElementById('root')!
const root = createRoot(container)
root.render(
  <App
    lang="en"
    onSelect={avatar => console.log(`Selected avatar: ${avatar}`)}
  />,
)
