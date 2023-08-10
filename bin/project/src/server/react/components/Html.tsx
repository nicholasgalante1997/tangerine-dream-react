import React from 'react'
import { Helmet } from 'react-helmet'
import { ReactTreeNode, SEOTagsObject } from '../../../types'

interface StaticHtmlProps {
  children: ReactTreeNode | Array<ReactTreeNode>
  seo?: SEOTagsObject
  lang?: string
  css?: string[]
}

function StaticHtml({ children, seo, lang = 'en', css = [] }: StaticHtmlProps) {
  const cssMapper = (cssFileRef: string) => <link rel="stylesheet" href={cssFileRef} />
  return (
    <html lang={lang}>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {seo?.description && <meta name="description" content={seo.description} />}
        {seo?.title && <title>{seo.title}</title>}
        <link rel="stylesheet" href="/index.css" />
        {css.map(cssMapper)}
      </Helmet>
      <body>
        <div data-tangerineIdentifier="mount" id="tangerine-dream-frame">
          {children}
        </div>
      </body>
    </html>
  )
}

export { StaticHtml, type StaticHtmlProps }
