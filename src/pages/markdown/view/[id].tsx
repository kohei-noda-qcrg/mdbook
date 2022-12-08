import { apiClient } from '~/utils/apiClient'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '~/components/Layout'
import useAspidaSWR from '@aspida/swr'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

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
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]}>
          {content}
        </ReactMarkdown>
      </Layout>
    </>
  )
}

export default MarkdownView
