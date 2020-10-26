import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXL}>{postData.title}</h1>
        {postData.id}
        <div className={utilStyles.lightText}>
          <p>{postData.date}</p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
} 


// getstaticpaths and getstaticprops should never be fetched - instead write server-side code within
// this is because these functions are only ever called on the serverside and are not included in the JS bundle used in the browser

export async function getStaticPaths(){
  const paths = getAllPostIds()
  return{
    paths, 
    fallback: false // returns a 404 if pages are not found
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}