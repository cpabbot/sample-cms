// import Image from 'next/image'
import BlogList from '@/components/BlogList'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <BlogList />
    </main>
  )
}

export async function getStaticProps() {
  const configData = await import(`../data/config.json`)

  return {
    props: {
      title: configData.title,
      description: configData.description,
    },
  }
}
