// src/components/Footer.jsx
import React from 'react';
import styles from './Footer.module.scss';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerNewsletter}>
                <div className={styles.newsletterChip}>
                    <div>Newsletter</div>
                </div>

                <div className={styles.subscription}>
                    <div className={styles.subscriptionTitle}>
                        <h2>Abonnez-vous à notre newsletter</h2>
                        <p>Recevez les dernières actualités, offres exclusives et inspirations directement dans votre boîte mail</p>
                    </div>
                    <div className={styles.subscriptionInput}>
                        <input type="text" placeholder={"Adresse email"}/>
                        <button>S'abonner</button>
                    </div>
                </div>
            </div>

            <div style={{ width: "100%", height: 1, backgroundColor: "#F6F6F6" }} />

            <div className={styles.footerSection}>
                <div>&copy; 2025 EcoConnect. Tous droits réservés.</div>
                <div><img src="/assets/images/logo.svg" alt=""/></div>
                <ul>
                    <li><a href="#" aria-label="Facebook">Facebook</a></li>
                    <li><a href="#" aria-label="Instagram">Instagram</a></li>
                    <li><a href="#" aria-label="LinkedIn">LinkedIn</a></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
