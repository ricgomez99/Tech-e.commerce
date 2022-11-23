import Image from "next/image"
import Link from "next/link"
import githubLogo from '../public/Img/githubLogo.png'
import styles from '../styles/footer.module.css'


export default function Footer(){
  return (
    <div>
      <footer className={styles.footer}>
        <p>Copyright 2022</p>

        <Link href='/about' >About</Link> 

        <Link href='https://github.com/ricgomez99/Tech-e.commerce'> 
        <Image src={githubLogo} alt="img" width={48} height={48}></Image>
        </Link>
        
      </footer>
    </div>
  )
}
{/* <Link href='https://github.com/ricgomez99/Tech-e.commerce' /> */}