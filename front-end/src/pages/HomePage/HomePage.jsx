import Lenis from "lenis";
import React from "react";
import styles from "./HomePage.module.scss";
import { Link } from "react-router-dom";
import {GrDownload, GrGift, GrMoney, GrPowerCycle} from "react-icons/gr";
import { LuLeaf } from "react-icons/lu";

function HomePage() {
  return (
      <main>
          <section className={styles.main}>
              <img
                  src="/assets/images/logo.svg"
                  alt="EcoConnect Logo"
                  className={styles.logo}
              />
              <h1>
                  Vos appareils méritent <br/>
                  une seconde vie.
              </h1>
              <h2>
                  Donnez une nouvelle vie à votre matériel pour un numérique
                  <br/>
                  solidaire et durable.
              </h2>
              <div className={styles.buttons}>
                  <Link to="/dashboard" className={styles.give}>
                      Proposez un don
                  </Link>
              </div>
          </section>

          <section className={styles.reconditionSection}>
              <div className={styles.sectionTitle}>
                  <h2>Reconditionner, c'est donner une <span>seconde vie</span> aux appareils</h2>
              </div>

              <div className={styles.cardsContainer}>
                  <div className={styles.card}>
                      <div className={styles.icon}>
                          <LuLeaf color={"#F6F6F6"}/>
                      </div>
                      <h3 className={styles.cardTitle}>Un geste utile et responsable</h3>
                      <p className={styles.cardDescription}>
                          Ne laissez pas votre ancien ordinateur prendre la poussière ! En le donnant pour
                          reconditionnement,
                          vous réduisez les déchets électroniques et favorisez l’économie circulaire. Chaque appareil
                          récupéré
                          peut être réparé et remis en circulation, offrant une alternative abordable et durable.
                      </p>
                  </div>

                  <div className={styles.card}>
                      <div className={styles.icon}>
                          <GrMoney color={"#F6F6F6"}/>
                      </div>
                      <h3 className={styles.cardTitle}>Économique et écologique</h3>
                      <p className={styles.cardDescription}>
                          Pourquoi payer plus cher quand on peut allier qualité et économies ? Un appareil reconditionné
                          offre
                          les mêmes performances qu’un neuf, à moindre coût. En optant pour le reconditionné, vous
                          réduisez
                          l’empreinte carbone tout en réalisant des économies.
                      </p>
                  </div>
              </div>
          </section>

          <section className={styles.howItWorksSection}>
              <div className={styles.sectionTitle}>
                  <h2>Comment ça fonctionne ?</h2>
              </div>
              <div className={styles.stepsContainer}>
                  <div className={styles.step}>
                      <div className={styles.stepTitle}>
                          <div className={styles.icon}>
                              <GrDownload />
                          </div>
                          <h3>Déposez votre appareil</h3>
                      </div>
                      <p>Apportez votre ordinateur inutilisé dans un point de collecte.</p>
                  </div>
                  <div className={styles.step}>
                  <div className={styles.stepTitle}>
                          <div className={styles.icon}>
                              <GrPowerCycle/>
                          </div>
                          <h3>Reconditionnement</h3>
                      </div>
                      <p>Nos experts testent, réparent et optimisent votre appareil.</p>
                  </div>
                  <div className={styles.step}>
                      <div className={styles.stepTitle}>
                          <div className={styles.icon}>
                              <GrGift />
                          </div>
                          <h3>Nouvelle vie</h3>
                      </div>
                      <p>Votre ordinateur est offert à une personne dans le besoin.</p>
                  </div>
              </div>
          </section>

          <section className={styles.testimonials}>
              <div className={styles.sectionTitle}>
                  <h2>Ils ont choisi le reconditionné</h2>
              </div>
              <div className={styles.testimonialContainer}>
                  <div className={styles.testimonial}>
                      <p>"Grâce à EcoConnect, j'ai pu récupérer un ordinateur fiable pour mes études à moindre coût
                          !"</p>
                      <h4>- Sophie, étudiante</h4>
                  </div>
                  <div className={styles.testimonial}>
                      <p>"J'ai donné mon ancien PC au lieu de le jeter, et il a servi à une association. Super
                          initiative !"</p>
                      <h4>- Marc, donateur</h4>
                  </div>
              </div>
          </section>

          <section className={styles.ctaSection}>
              <h2>Passez à l'action dès aujourd'hui !</h2>
              <div className={styles.buttons}>
                  <Link to="/dashboard/depot" className={styles.give}>Je donne un appareil</Link>
                  <Link to="/dashboard/find-location" className={styles.receive}>Je fais une demande</Link>
              </div>
          </section>
      </main>
  );
}

export default HomePage;
