import Head from 'next/head'
import { useCallback, useState } from 'react'
import useAspidaSWR from '@aspida/swr'
import { apiClient } from '~/utils/apiClient'
import Layout from '~/components/Layout'
import { NextPage } from 'next'
import Link from 'next/link'
import Dialog from '@mui/material/Dialog'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input
} from '@mui/material'

const MarkdownPage: NextPage = () => {
  const { data: markdowns, error, mutate } = useAspidaSWR(apiClient.markdowns)
  const [title, setTitle] = useState('')
  const [visible, setVisible] = useState(false)

  const openModal = () => setVisible(true)
  const closeModal = () => setVisible(false)
  const createMarkdownWithTitle = useCallback(async () => {
    if (!title) return

    await apiClient.markdowns.post({
      body: { title, content: '# test' }
    })
    mutate()
    closeModal()
  }, [title])

  if (error) return <div>failed to load</div>

  return (
    <>
      <Head>
        <title>Markdown</title>
      </Head>

      <Layout>
        <h1>Create a Markdown file</h1>
        <Button onClick={openModal}>Open dialog</Button>
        <Dialog maxWidth="lg" open={visible} onClose={closeModal}>
          <DialogTitle>Create a Markdown file</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Input
                autoFocus={true}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </DialogContentText>
            <DialogActions>
              <Button onClick={createMarkdownWithTitle}>Create</Button>
              <Button onClick={closeModal}>Cancel</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
        {markdowns?.map((markdown) => (
          <Link key={markdown.id} href={`/markdown/${markdown.id}`}>
            <h1>{markdown.title}</h1>
          </Link>
        ))}
      </Layout>
    </>
  )
}
export default MarkdownPage
