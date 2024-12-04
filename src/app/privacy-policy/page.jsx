// app/privacy-policy/page.jsx

import React from 'react';
import Head from 'next/head';
import styles from './PrivacyPolicy.module.css';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Bot and Mini App Privacy Policy</title>
        <meta name="description" content="Privacy Policy for Telegram Bots and Mini Apps" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>Bot and Mini App Standard Privacy Policy</h1>

        <section>
          <h2 className={styles.sectionTitle}>1. Terms and Definitions</h2>
          <ol className={styles.orderedList}>
            <li className={styles.listItem}><strong>Telegram</strong> – Telegram Messenger Inc (also “we”).</li>
            <li className={styles.listItem}><strong>Platform</strong> – The Telegram Bot Platform.</li>
            <li className={styles.listItem}><strong>Developer</strong> – The person or legal entity who operates and maintains Third-Party Service, as further defined in 3.1.</li>
            <li className={styles.listItem}><strong>Third-Party Service</strong> – The bot or mini app of Developer, made available to users on Platform.</li>
            <li className={styles.listItem}><strong>User</strong> – The person accessing Third-Party Service via their account on Platform (also “you”).</li>
            <li className={styles.listItem}><strong>Policy</strong> – This document, governing the relationship between Third-Party Service and User.</li>
          </ol>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>2. General Provisions</h2>
          <ol className={styles.orderedList}>
            <li className={styles.listItem}>Policy is a standard document which applies to all third-party bots and mini apps on Platform by default, unless or until their respective developer has published a separate privacy policy.</li>
            <li className={styles.listItem}>Policy governs solely the relationship between Developer and User. It cannot and does not regulate the relationship between Telegram and its users, nor does it supersede the Telegram Privacy Policy.</li>
            <li className={styles.listItem}>Developer follows all privacy guidelines set forth by platforms that distribute Telegram apps, including Apple's App Review Guidelines and Google's Developer Policies.</li>
            <li className={styles.listItem}>Policy regulates the collection, storage, distribution, usage and protection of information of Users who access Third-Party Service.</li>
            <li className={styles.listItem}>Your continued access to and use of Third-Party Service shall constitute your acceptance of Policy, the Telegram Bot Terms and the Telegram Mini App Terms.</li>
            <li className={styles.listItem}>Note that this default Policy is meant to aid Developer in providing a functional privacy policy to their Users, with the understanding that the Policy is written to be generally applicable to a wide range of services. Accordingly, if Developer opts to use the Policy, it is solely their responsibility to ensure that the Policy fits the Developer’s use case and complies with all local laws.</li>
            <li className={styles.listItem}>If you do not accept all the aforementioned terms, you should immediately cease your use of Third-Party Service.</li>
          </ol>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>3. Disclaimers</h2>
          <ol className={styles.orderedList}>
            <li className={styles.listItem}>Third-Party Service is an independent third-party application that is neither maintained, endorsed, nor affiliated with Telegram. Developer is the person or entity defined as such, for example within the Terms of Service of Third-Party Service, its interfaces or in its response to the /developer_info command.</li>
            <li className={styles.listItem}>You understand and agree that, without limiting section 8, this Policy may be amended at any time, and it is your responsibility to review and agree to all changes.</li>
            <li className={styles.listItem}>You acknowledge that you have read, understood and agreed to the Telegram Bot Terms and the Telegram Mini App Terms, as well as any other terms made available to you by Developer.</li>
            <li className={styles.listItem}>You acknowledge and warrant that you possess all the necessary rights and permissions to use Third-Party Service in compliance with applicable local laws and legal obligations, including without limitation age restrictions and third-party store terms.</li>
            <li className={styles.listItem}>Developer operates under the understanding that all information you provide is submitted in good-faith, and is not obligated to check or verify your statements for errors or inaccuracies. It is your responsibility to ensure that all information you provide is accurate and up-to-date.</li>
            <li className={styles.listItem}>You may decide to make some information available in the public domain, either directly on Platform, elsewhere on the internet, or via Third-Party Service. The information you choose to make public may be accessed by other users of Third-Party Service via Platform or on the internet, in which case it will not be covered or protected by Policy.</li>
          </ol>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>4. Collection of Personal Data</h2>
          <ol className={styles.orderedList}>
            <li className={styles.listItem}>The ways in which Platform natively allows Third-Party Service to access certain limited information from and about User are described in the Telegram Privacy Policy and Mini App Terms.</li>
            <li className={styles.listItem}>Without limiting section 4.1., Third-Party Service has the ability to receive additional data from you if you send it messages, upload files to it, or choose to share personal information such as your contact or phone number.</li>
            <li className={styles.listItem}>If Third-Party Service is a mini app, it may also receive additional data as detailed in sections 4.1. and 4.2. of the Mini App Terms. In this case, Third-Party Service may also acquire additional information as a result of your interactions with it.</li>
            <li className={styles.listItem}>Third-Party Service may collect anonymous data that is not linked to you in any way, such as anonymized diagnostics or usage statistics.</li>
          </ol>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>5. Processing of Personal Data</h2>
          <ol className={styles.orderedList}>
            <li className={styles.listItem}>Third-Party Service only requests, collects, processes and stores data that is necessary for its designated features to function properly. Third-Party Service processes your personal data on the legal ground that such processing is necessary to further its legitimate interests, including (i) providing services to its users; (ii) detecting and addressing security issues in respect of its provision of services; unless those interests are overridden by your interest or fundamental rights and freedoms that require protections of personal data.</li>
            <li className={styles.listItem}>Developer does not monetize or otherwise utilize user data for applications outside the scope of Third-Party Service, unless otherwise clearly stated by Developer and explicitly agreed to by User.</li>
            <li className={styles.listItem}>Without limiting section 6.2., private user information will not be transferred or made accessible to any third party, except as stipulated by Policy and agreed to by User.</li>
            <li className={styles.listItem}>In any event, Developer will only collect or otherwise aggregate user data in compliance with applicable laws, third-party store terms, and for no other purposes than those clearly stated in Policy and necessary to furnish and enhance the functionality of Third-Party Service.</li>
          </ol>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>6. Data Protection</h2>
          <ol className={styles.orderedList}>
            <li className={styles.listItem}>Developer employs robust security measures to protect the integrity and confidentiality of all data it processes. User information is handled, transferred and stored in compliance with applicable laws, including all necessary precautions to prevent unauthorized access, modification, deletion, or distribution.</li>
            <li className={styles.listItem}>Developer will never share user data with third parties, including with Developer’s own additional services or bots (if any, as the case may be) unless explicitly authorized by User or required by law, such as in response to a lawful court order.</li>
          </ol>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>7. Rights and Obligations</h2>
          <ol className={styles.orderedList}>
            <li className={styles.listItem}>
              <strong>Telegram may:</strong>
              <ul className={styles.unorderedList}>
                <li className={styles.listItem}>delete data sent from User to Third-Party Service from its servers in response to abuse of Platform by either User or Developer. This deletion may include sent messages, mini app cloud storage, the entire chat with Third-Party Service, or Third-Party Service itself as the case may be;</li>
              </ul>
            </li>
            <li className={styles.listItem}>
              <strong>Developer may:</strong>
              <ul className={styles.unorderedList}>
                <li className={styles.listItem}>seek verification of the identity of the User submitting data requests if they suspect unauthorized access to or misuse of personal information;</li>
                <li className={styles.listItem}>impose reasonable limits on the number of data requests User can submit within a given timeframe, in order to prevent abuse of the request system. In any event, these limits cannot undermine User’s rights under applicable law;</li>
              </ul>
            </li>
            <li className={styles.listItem}>
              <strong>Developer shall:</strong>
              <ul className={styles.unorderedList}>
                <li className={styles.listItem}>comply with the stipulations set forth in Policy, or those outlined in any additional or substitute Policy they choose to enact, provided that neither can supersede the Telegram Terms of Service, and, by extension, the Telegram Bot Developer Terms;</li>
                <li className={styles.listItem}>provide an easily accessible avenue for User to consult Policy, and for them to exercise all rights Policy entitles them to under applicable law;</li>
                <li className={styles.listItem}>promptly process and respond to lawful requests from users within the timeframes allowed by applicable law, and, in any event, no later than 30 days from the date the request was submitted.</li>
              </ul>
            </li>
            <li className={styles.listItem}>
              <strong>User may:</strong>
              <ul className={styles.unorderedList}>
                <li className={styles.listItem}>submit a request to Developer for a copy of all personal data Third-Party Service collected and stored in connection with them;</li>
                <li className={styles.listItem}>submit a request to Developer for the timely deletion of all personal data Third-Party Service collected and stored in connection with them, with the exception of essential data that Developer may preserve if and as permitted by applicable law. Examples of essential data vary by jurisdiction and may include but are not limited to data required for performing legal obligations, defense of legal claims, public interest or transactional history for the purpose of fulfilling tax obligations;</li>
                <li className={styles.listItem}>amend, restrict, or object to the processing of their data, or exercise the option to revoke any previously given consent at any time and for any reason, including withdrawing from Policy entirely and discontinuing their use of Third-Party Service;</li>
                <li className={styles.listItem}>lodge a complaint with national data protection authorities having jurisdiction if they believe their rights are not being upheld by Developer.</li>
              </ul>
            </li>
            <li className={styles.listItem}>
              <strong>User shall:</strong>
              <ul className={styles.unorderedList}>
                <li className={styles.listItem}>provide accurate and up-to-date information when submitting data requests to Developer, and cooperate with any reasonable measures necessary for Developer to fulfill these requests;</li>
                <li className={styles.listItem}>adhere to the terms set forth in Policy and any additional policy enacted by Developer or Telegram.</li>
              </ul>
            </li>
          </ol>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>8. Changes to this Privacy Policy</h2>
          <p>
            While we do not anticipate frequent changes, we will review and may update this Privacy Policy from time to time.
            Any changes to this Privacy Policy will become effective when we post the revised Privacy Policy on this page{' '}
            <a href="https://telegram.org/privacy-tpa" target="_blank" rel="noopener noreferrer" className={styles.link}>
              https://telegram.org/privacy-tpa
            </a>
            . Please check our website frequently to see any updates or changes to this Privacy Policy, a summary of which we will set out below.
          </p>
        </section>
      </div>
    </>
  );
}