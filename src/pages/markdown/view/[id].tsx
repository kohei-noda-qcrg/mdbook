import useAspidaSWR from '@aspida/swr'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '~/components/Layout'
import { apiClient } from '~/utils/apiClient'
import { useEffect, useState } from 'react'
import '@uiw/react-markdown-preview/markdown.css'
import dynamic from 'next/dynamic'

const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false
})
const MarkdownView: NextPage = () => {
  const router = useRouter()

  const id = router.query.id as string
  const { data: markdown, error } = useAspidaSWR(
    apiClient.markdowns._markdownId(Number(id))
  )
  useEffect(() => {
    console.log(id, markdown)
    if (markdown) {
      setContent(markdown.body)
    }
  }, [markdown])

  const [content, setContent] = useState('loading...')

  return (
    <>
      <Head>
        <title>Markdown</title>
      </Head>

      <Layout>
        {error && <div>failed to load</div>}
        <MarkdownPreview
          source={content}
          rehypeRewrite={(node, index, parent) => {
            if (parent &&  parent.type !== 'root' && /^h(1|2|3|4|5|6)/.test(parent.tagName)) {
              parent.children = parent.children.slice(1)
            }
          }}
          warpperElement={{ 'data-color-mode': 'light' }}
        />
      </Layout>
    </>
  )
}

export default MarkdownView
