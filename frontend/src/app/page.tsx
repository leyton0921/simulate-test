import styles from "./page.module.css";
import Link from "next/link";
export default function HomeView():JSX.Element{
  return (
    <main className={styles.main}>
    <div>
   <h1>pagina de inicio</h1>
   <Link href="/login">Go to Login</Link>
   <Link href="/register">Go to register</Link>
   
 </div>
 </main>
  )
}