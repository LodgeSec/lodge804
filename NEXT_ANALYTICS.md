# Vercel Analytics (Next) — example usage

You installed `@vercel/analytics`. Below are minimal examples showing how to add the Analytics component in a Next.js app.

1) Pages Router (Next < 13) — `pages/_app.js`

```js
// pages/_app.js
import React from 'react'
import { Analytics } from '@vercel/analytics/react'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

export default MyApp
```

2) App Router (Next 13+) — `app/layout.js`

```js
// app/layout.js
import './globals.css'
import { Analytics } from '@vercel/analytics/react'

export const metadata = {
  title: 'My Site',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

Notes
- I added the package to this project so you can reuse it if you migrate to Next. The current repo is a static/Express site, so the Next-specific component won't run here unless you create a Next app.
- If you want, I can scaffold a minimal Next app inside `newlodgesite/next-example` and wire the Analytics component there.

How to test locally (in a Next app)
- Run `npm run dev` from the Next app directory (Next must be installed and a Next app present).
- Visit the site and verify network requests in the browser devtools to `vercel-insights` endpoints (Vercel processes analytics on the server side as well).
