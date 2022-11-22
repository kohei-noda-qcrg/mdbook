import Head from 'next/head'
import { useCallback, useState } from 'react'
import useAspidaSWR from '@aspida/swr'
import { apiClient } from '~/utils/apiClient'
import type { FormEvent, ChangeEvent } from 'react'
import Layout from '~/components/Layout'
import { NextPage } from 'next'
import { Modal, Button, Text, Input } from '@nextui-org/react'

const MarkdownPage: NextPage = () => {
  const { data: markdowns, error, mutate } = useAspidaSWR(apiClient.markdowns)
  const [markdown, setMarkdown] = useState('')
  const [title, setTitle] = useState('')
  const [visible, setVisible] = useState(false)
  const inputMarkdown = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setMarkdown(e.target.value),
    []
  )
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

  const createMarkdown = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      if (!markdown) return

      await apiClient.markdowns.post({
        body: { title: 'test', content: markdown }
      })
      setMarkdown('')
      mutate()
      closeModal()
    },
    [markdown]
  )

  if (error) return <div>failed to load</div>

  return (
    <>
      <Head>
        <title>Markdown</title>
      </Head>

      <Layout>
        <h1>Create a Markdown file</h1>
        {/* Open dialog if button is clicked */}
        <Button onClick={openModal}>Open dialog</Button>
        <Modal closeButton blur open={visible} onClose={closeModal}>
          <Modal.Header>
            <Text size={18}>Create a Markdown file</Text>
          </Modal.Header>
          <Modal.Body>
            <Input
              clearable
              bordered
              fullWidth
              color="success"
              placeholder="Title"
              size="lg"
              onChange={(e) => setTitle(e.target.value)}
            />
            <Button onClick={createMarkdownWithTitle}>Create</Button>
          </Modal.Body>
          <Modal.Footer>
            <Button auto onClick={closeModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <input type="text" onSubmit={createMarkdown} onChange={inputMarkdown} />
        <button onClick={createMarkdown}>Submit</button>
        {markdowns?.map((markdown) => (
          <div key={markdown.id}>
            <h1>{markdown.title}</h1>
          </div>
        ))}
      </Layout>
    </>
  )
}
export default MarkdownPage
