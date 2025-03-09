/* eslint-disable no-unused-vars */
// src/pages/MessagingPage.jsx
import React from "react";
import styles from "./MessagingPage.module.scss";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";


function MessagingPage() {
  return (
    <>
        <div className={styles.messagingFrame}>
            <div className={styles.messagingList}>
                <div className={styles.messagingListSearchSection}>
                    <input className={styles.messagingListInput} type="text" placeholder="Search" />
                    <div className={styles.searchButton}><HiMiniMagnifyingGlass /></div>
                </div>
                <div className={styles.conversationContainer}>
                    <div>Photo</div>
                    <div>
                        <div>Name</div>
                        <div>Message preview</div>
                    </div>
                    <div>
                        <div>Date</div>
                    </div>
                    
                </div>
            </div>
            <div className={styles.messagingConversation}>
                <div className={styles.conversationHeader}>
                    <div className={styles.adresseeInfo}>
                        <div>Adresee Profil</div>
                        <div>Adresee name</div>
                    </div>
                    <div className={styles.conversationFilter}>
                        <div>Search</div>
                        <div>menu</div>
                    </div>
                </div>
                <div className={styles.conversationMessages}>
                    <div className={styles.singleMessageDisplay}>
                        <div className={styles.singleMessageFirstDisplay}>Profil</div>
                        <div className={styles.singleMessageSecondDisplay}>
                            <div className={styles.adreseeMessageInfos}>
                                <div>Adressee name</div>
                                <div>Date à heure</div>
                            </div>
                            <div className={styles.message}>Message</div>
                        </div>
                    </div>
                    <div className={styles.senderSingleMessageDisplay}>
                        <div className={styles.senderSingleMessageFirstDisplay}>Profil</div>
                        <div className={styles.senderSingleMessageSecondDisplay}>
                            <div className={styles.senderSingleMessageThirdDisplay}>
                                <div className={styles.senderMessageInfos}>
                                    <div>Date à heure</div>
                                    <div>Moi</div>
                                </div>
                            <div className={styles.senderMessage}>Message</div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className={styles.messageBox}>
  <div className={styles.searchWrapper}>
    <label htmlFor="search">
      <HiMiniMagnifyingGlass/>
      <span className={styles.tooltip}>Search</span>
    </label>
  </div>
  <input required="" placeholder="Envoyer votre message ici" type="text" id="messageInput" />
  <button id="uploadImageButton">
    <input type="file" id="file" name="file" />
  </button>
  <button id="sendButton">
    Send
  </button>
</div>
            </div>
        </div>
    </>
  )
}

export default MessagingPage;