import Image from 'next/image'
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <h3>ADRESSE</h3>
        <ul>
          <li>Det Utrolige Teater</li>
          <li>Havnegade 901</li>
          <li>9000 Aalborg</li>
          <li>EAN 5798003279845</li>
          <li>CVR 1001 0012</li>
        </ul>
        <a href="#">Find vej på kort</a>
      </div>
      <div>
        <h3>BILLET</h3>
        <ul>
          <li>
            <a href="#">Se åbningstider</a>
          </li>
          <li>
            Billettelefon: <a href="tel:+4596318080">+45 96 31 80 80</a>
          </li>
          <li>
            <a href="mailto:billet@dut.dk">billet@dut.dk</a>
          </li>
        </ul>
        <h3>ADMINISTARTION</h3>
        <ul>
          <li>
            Telefon: <a href="tel:+4596318090">+45 96 31 80 90</a>
          </li>
          <li>
            <a href="#">adm@dut.dk</a>
          </li>
        </ul>
      </div>
      <div>
        <h3>PRAKTISK INFO</h3>
        <ul>
          <li>
            <a href="#">Kontakt</a>
          </li>
          <li>
            <a href="#">Kom trygt i teatret</a>
          </li>
          <li>
            <a href="#">Presseside</a>
          </li>
          <li>
            <a href="#">Skoleforestillinger</a>
          </li>
          <li>
            <a href="#">Teatercaféen</a>
          </li>
          <li>
            <a href="#">Handelsbetingelser</a>
          </li>
        </ul>
      </div>
      <div className={styles.socials}>
        <Image
          src="/icons/facebook.png"
          width={35}
          height={35}
          alt="Link til DUTs Facebook"
        />
        <Image
          src="/icons/instagram.png"
          width={35}
          height={35}
          alt="Link til DUTs Instagram"
        />
        <Image
          src="/icons/linked.png"
          width={35}
          height={35}
          alt="Link til DUTs LinkedIn"
        />
      </div>
    </footer>
  )
}
