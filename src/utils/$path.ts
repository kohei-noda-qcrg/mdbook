export const pagesPath = {
  "markdown": {
    "edit": {
      _id: (id: string | number) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/markdown/edit/[id]' as const, query: { id }, hash: url?.hash })
      })
    },
    "view": {
      _id: (id: string | number) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/markdown/view/[id]' as const, query: { id }, hash: url?.hash })
      })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/markdown' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  favicon_png: '/favicon.png',
  vercel_svg: '/vercel.svg'
} as const

export type StaticPath = typeof staticPath
