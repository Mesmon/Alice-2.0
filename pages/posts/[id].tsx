import Layout from "../../components/layout"
import { getAllPostIds, getPostData } from "../../lib/posts"
import Head from "next/head"
import Date from "../../components/date"
import { GetStaticProps, GetStaticPaths } from "next"
import { IPost } from "../../@types"

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postData = await getPostData(params!.id as string)
    return {
        props: {
            postData,
        },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false,
    }
}

export default function Post({ postData }: { postData: IPost }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className='text-4xl'>{postData.title}</h1>
                <div className='font-light'>
                    <Date dateString={postData.date} />
                </div>
                <div
                    dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                />
            </article>
        </Layout>
    )
}
