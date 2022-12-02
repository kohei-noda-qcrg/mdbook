import Head from 'next/head'
import { useCallback, useState } from 'react'
import useAspidaSWR from '@aspida/swr'
import { apiClient } from '~/utils/apiClient'
import type { Markdown } from '$prisma/client'
import Layout from '~/components/Layout'
import type { NextPage } from 'next'
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Input
} from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'

const MarkdownPage: NextPage = () => {
  const { data: markdowns, error, mutate } = useAspidaSWR(apiClient.markdowns)
  const [title, setTitle] = useState('')
  const [visible, setVisible] = useState(false)

  const openModal = () => setVisible(true)
  const closeModal = () => setVisible(false)

  const toggleComplete = useCallback(async (markdown: Markdown) => {
    await apiClient.markdowns._markdownId(markdown.id).patch({
      body: {
        title: markdown.title,
        body: markdown.body,
        completeRead: !markdown.completeRead
      }
    })
    mutate()
  }, [])

  const createMarkdownWithTitle = useCallback(async () => {
    if (!title) return
    await apiClient.markdowns.post({
      body: { title, body: '# test' }
    })
    mutate()
    closeModal()
  }, [title])

  if (!markdowns) return <div>loading...</div>
  if (error) return <div>failed to load</div>
  return (
    <Layout>
      <Head>
        <title>Markdown</title>
      </Head>
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

      {markdowns.map((markdown) => (
        <Grid container spacing={2} key={markdown.id}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <h2>{markdown.title}</h2>
              <Checkbox
                value={markdown.completeRead}
                onClick={() => {
                  toggleComplete(markdown)
                }}
              />
              <Button variant="contained" color="primary">
                <Link href={`/markdown/${markdown.id}`}> Edit </Link>
              </Button>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Layout>
  )
}

export default MarkdownPage
