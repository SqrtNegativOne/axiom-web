import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'

export function render(url) {
    const helmetContext = {}
    const html = renderToString(
        <StrictMode>
            <HelmetProvider context={helmetContext}>
                <StaticRouter location={url}>
                    <App />
                </StaticRouter>
            </HelmetProvider>
        </StrictMode>
    )
    const helmet = helmetContext.helmet
    return {
        body: html,
        head: helmet ? helmet.script.toString() : '',
    }
}
