export type ReactTreeNode = React.ReactElement | React.ReactNode | React.JSX.Element

export type SEOTagsObject = {
  title: string
  description: string
  keywords?: string
  icon?: string
}

export interface TangerineDreamPageBase<P = Record<string, unknown>> {
  Component: React.FC<P> | ((props: P) => ReactTreeNode | Array<ReactTreeNode>)
  jsOutFile: string
  mode: 'server' | 'static' | 'client'
  css?: string[]
  props?: P
  outDir?: string
}

export interface TangerineDreamStaticPage extends TangerineDreamPageBase {
  mode: 'static'
  htmlOutFile: string
  seo: SEOTagsObject
}

export interface TangerineDreamSSRPage extends TangerineDreamPageBase {
  mode: 'server'
  bootstrapScripts?: string[]
  bootstrapScriptContent?: string
  seo: SEOTagsObject
}

export interface TangerineDreamCSRPage extends TangerineDreamPageBase {
  mode: 'client'
  htmlOutFile: string
  seo: SEOTagsObject
}
