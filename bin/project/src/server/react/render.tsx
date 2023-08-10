/** *********************************************
 * ************** Node Dependencies *************
 * **********************************************/
import { createWriteStream, existsSync, mkdirSync, rmSync } from 'fs'
import path from 'path'

/** *********************************************
 * ************** React Dependencies ************
 * **********************************************/
import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'

/** *********************************************
 * ************** Local Dependencies ************
 * **********************************************/
import { TangerineDreamStaticPage } from '../../types'
import { StaticHtml } from './components/Html'
import { StaticRenderDefaults } from './defaults'

/**
 * @summary Converts a TangerineDreamStaticPage configuration into a static html file.
 * @param config 
 * @returns {Promise<void>}
 */
async function writeStaticPageToHtml(config: TangerineDreamStaticPage): Promise<boolean> {
  let hasThrownError = false
  let error: Error | null = null

  try {
    const { Component, htmlOutFile, jsOutFile, seo, css, props, outDir = StaticRenderDefaults.outDir } = config
    const ReactTree = (
      <StaticHtml css={css} seo={seo}>
        <Component {...(props ?? {})} />
      </StaticHtml>
    )
    const buildPath = path.resolve(process.cwd(), outDir);
    if (!existsSync(buildPath)) {
      mkdirSync(buildPath, { recursive: true });
    }
    const outFile = path.resolve(buildPath, htmlOutFile)
    const outFileWriteStream = createWriteStream(outFile, { encoding: 'utf-8' });
    const { pipe, abort } = renderToPipeableStream(
      ReactTree,
      {
        bootstrapScripts: [`/${jsOutFile}.bundle.js`],
        onError(error, errorInfo) {
            console.warn(`Static Generation of page ${htmlOutFile} has failed.`)
            console.error(error);
            console.error(errorInfo);
            outFileWriteStream.close();
            if (existsSync(outFile)) {
              rmSync(outFile, { force: true, recursive: true, maxRetries: 3, retryDelay: 500 })
            }
            throw new Error(`RenderToPipeableStreamFailed::${Component?.displayName ?? Component.name}`)
        },
        onShellReady() {
            pipe(outFileWriteStream);
        },
      }
    )
  } catch (e) {
    hasThrownError = true;
    error = e as Error;
  } finally {
    if (hasThrownError) {
      console.error(error);
      return false;
    }
    return true;
  }
}

export {
  writeStaticPageToHtml
}