import useAspidaSWR from '@aspida/swr'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '~/components/Layout'
import { apiClient } from '~/utils/apiClient'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import '@uiw/react-markdown-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import rehypeSanitize from 'rehype-sanitize'
import { Button } from '@mui/material'

const MarkdownEditor = dynamic(() => import('@uiw/react-markdown-editor'), {
  ssr: false
})

const MarkdownPage: NextPage = () => {
  const router = useRouter()
  const id = router.query.id as string
  const {
    data: markdown,
    error,
    mutate
  } = useAspidaSWR(apiClient.markdowns._markdownId(Number(id)))
  useEffect(() => {
    console.log(id, markdown)
    if (markdown) {
      setId(markdown.id)
      setTitle(markdown.title)
      setContent(markdown.content)
    }
  }, [markdown])
  const [iid, setId] = useState(0)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('loading...')
  const handleChange = (content: string) => {
    setContent(content)
  }

  const handleSave = async () => {
    const d = await apiClient.markdowns._markdownId(Number(id)).put({
      body: { id: iid, title, content }
    })
    console.log('statuscheck', d)
    if (d.status === 200) {
      console.log('success', d)
    } else {
      console.log('failed', d)
    }
    mutate()
  }

  return (
    <>
      <Head>
        <title>Markdown</title>
      </Head>

      <Layout>
        {error && <div>failed to load</div>}
        <MarkdownEditor
          visible={true}
          value={content}
          style={{ height: '80vh', width: '90vw' }}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onChange={(value, _) => handleChange(value)}
          previewProps={{ rehypePlugins: [[rehypeSanitize]] }}
        />
        <Button onClick={handleSave}>Save</Button>
      </Layout>
    </>
  )
}

export default MarkdownPage
