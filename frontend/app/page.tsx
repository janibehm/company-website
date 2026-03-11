import PageBuilderPage from '@/app/components/PageBuilder'
import {getPageQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import {GetPageQueryResult} from '@/sanity.types'

export default async function Page() {
  const {data: page} = await sanityFetch({
    query: getPageQuery,
    params: {slug: 'home'},
  })

  return (
    <>
      {page?._id ? (
        <PageBuilderPage page={page as GetPageQueryResult} />
      ) : (
        <div className="container py-20 text-center">
          <h2 className="text-2xl">No home page found</h2>
          <p className="mt-2 text-gray-600">
            Create a page with slug &ldquo;home&rdquo; in Sanity Studio to get started.
          </p>
        </div>
      )}
    </>
  )
}
