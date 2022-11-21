import Head from 'next/head'
import { useCallback, useState } from 'react'
import useAspidaSWR from '@aspida/swr'
import styles from '~/styles/Home.module.css'
import { apiClient } from '~/utils/apiClient'
import type { Markdown } from '$prisma/client'
import type { FormEvent, ChangeEvent } from 'react'
import Layout from '~/components/Layout'
import type { NextPage } from 'next'

const MarkdownPage: NextPage = () => {
    const { data: md, error, mutate } = useAspidaSWR(apiClient.markdown)
    const [markdown, setMarkdown] = useState('')
    const inputMarkdown = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setMarkdown(e.target.value),
        []
    )

    const createMarkdown = useCallback(
        async (e: FormEvent) => {
            e.preventDefault()
            if (!markdown) return
            
            await apiClient.markdown.post({ body: { title: "test", content : markdown } })
            setMarkdown('')
            mutate()
        },
        [markdown]
    )
    return (
        <>
            <Head>
                <title>Markdown</title>
            </Head>

            <Layout>
                <h1>Create a Markdown file</h1>
                <input type="text" onSubmit={createMarkdown} onChange={inputMarkdown} />
                <button onClick={createMarkdown}>Submit</button>
            </Layout>
            <p> {md}</p>
            </>


    )
}
export default MarkdownPage