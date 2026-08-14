import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ExampleInvitation from './pages/ExampleInvitation'
import { THEMES } from './themes'

function App() {
  return (
    <BrowserRouter basename="/simple-wedding">
      <Routes>
        <Route path="/" element={<Home />} />
        {THEMES.map((t) => (
          <Route
            key={t.slug}
            path={`/example/${t.slug}`}
            element={<ExampleInvitation themeSlug={t.slug} />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App