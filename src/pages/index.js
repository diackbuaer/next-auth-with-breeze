import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'



export default function Home({articles}) {
    const { user } = useAuth({ middleware: 'guest' })

    return (
        <>
            <Head>
                <title>Laravel</title>
            </Head>
            <div className="relative bg-gray-50 px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="absolute inset-0">
        <div className="h-1/3 bg-white sm:h-2/3" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa libero labore natus atque, ducimus sed.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {articles.map((post) => (
            <div key={post.id} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
              <div className="flex-shrink-0">
                {/* <img className="h-48 w-full object-cover" src={post.imageUrl} alt="" /> */}
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  {/* <p className="text-sm font-medium text-indigo-600">
                    <a href={post.attributes.links.related} className="hover:underline">
                      {post.category.name}
                    </a>
                  </p> */}
                  <a href={post.href} className="mt-2 block">
                    <p className="text-xl font-semibold text-gray-900">
                        <Link href={`articles/${post.attributes.slug}`}>
                        {post.attributes.title}
                        </Link>

                        </p>
                    <p className="mt-3 text-base text-gray-500">{post.attributes.body}</p>
                  </a>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <a>
                      <span className="sr-only">{post.relationships.author.name}</span>
                      {/* <img className="h-10 w-10 rounded-full" src={post.author.imageUrl} alt="" /> */}
                    </a>
                  </div>
                  {/* <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      <a href={post.author.href} className="hover:underline">
                        {post.author.name}
                      </a>
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime={post.datetime}>{post.date}</time>
                      <span aria-hidden="true">&middot;</span>
                      <span>{post.readingTime} read</span>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
            {/* {articles.map((article) => (
                <div className='' key={article.id}>
                    <h1>{article.attributes.title}</h1>
                </div>
            ))} */}
        </>
    )
}

export async function getStaticProps(){
    const response = await axios.get("/api/articles")
    const articles = response.data.data
    return {
        props: {
            articles
        }
    }
}
