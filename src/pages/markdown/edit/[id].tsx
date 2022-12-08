import '@uiw/react-markdown-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import { apiClient } from '~/utils/apiClient'
import { Box, Button } from '@mui/material'
import { isDarkModeState } from '~/recoil/atoms/isDarkMode'
import { isDesktop } from 'react-device-detect'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Layout from '~/components/Layout'
import Link from 'next/link'
import useAspidaSWR from '@aspida/swr'
import remarkGfm from 'remark-gfm'

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
    if (markdown) {
      setTitle(markdown.title)
      setContent(markdown.body)
    }
  }, [markdown])

  const handleSave = async () => {
    const d = await apiClient.markdowns._markdownId(Number(id)).patch({
      body: { title, body: content }
    })
    if (d.status === 204) {
      mutate()
    }
  }

  const isDarkMode = useRecoilValue(isDarkModeState)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState(markdown?.body || '')
  const handleChange = (content: string) => {
    setContent(content)
  }

  return (
    <>
      <Head>
        <title>Markdown</title>
      </Head>

      <Layout>
        {error && <div>failed to load</div>}
        <h1>{markdown?.title}</h1>
        <div data-color-mode={isDarkMode ? 'dark' : 'light'}>
          <MarkdownEditor
            visible={true}
            value={content}
            style={{ height: '70vh', width: '90vw' }}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onChange={(value, _) => handleChange(value)}
            previewProps={{
              remarkPlugins: [[remarkGfm]]
            }}
          />
        </div>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '1em',
            width: isDesktop ? '30vw' : '80vw'
          }}
        >
          <Button onClick={handleSave} variant="outlined">
            Save
          </Button>
          <Button onClick={handleSave} variant="outlined" color="inherit">
            <Link href="/markdown">Cancel Edit</Link>
          </Button>
        </Box>
      </Layout>
    </>
  )
}

export default MarkdownPage
