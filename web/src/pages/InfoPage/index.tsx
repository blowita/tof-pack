import React from "react";

import { Container } from "./styles";

const InfoPage: React.FC = () => {
  return (
    <Container>
      <main>
        <h1>Information Page</h1>
        <section>
          <details>
            <summary>About ToF Pack</summary>
            <p>
              ToF Pack is an open-source fan-made website for{" "}
              <a href="https://www.toweroffantasy-global.com/home.html">
                Tower of Fantasy
              </a>{" "}
              that aims to help players plan their account&apos;s progression.
            </p>
          </details>
        </section>
        <section>
          <details>
            <summary>Disclaimer about Tower of Fantasy</summary>
            <p>
              Tower of Fantasy, game content and materials are trademarks and
              copyrights of PROXIMA BETA PTE. LTD.
            </p>
          </details>
        </section>
        <br />
        <section>
          <details>
            <summary>Privacy Policy</summary>
            <p>Last updated: November 9th, 2022</p>
            <p>
              ToF Pack runs locally on the user&apos;s browser and no user data
              is sent over the internet. ToF Pack doesn&apos;t collect user data
              and doesn&apos;t share any data with third parties. All site data
              is stored locally in the browser&apos;s localStorage and can be
              erased at the user&apos;s discretion by clearing the data stored
              locally.
            </p>
          </details>
        </section>
        <section>
          <details>
            <summary>Cookies Policy</summary>
            <p>Last updated: November 9th, 2022</p>
            <p>
              ToF Pack doesn&apos;t use cookies. All site data is stored locally
              in the browser&apos;s <em>localStorage</em> and is identified by
              keys starting with <em>@ToFPack</em>. The data has no expiration
              date and is only required in order to achieve persistence between
              sessions. It can be cleared individually or completely wiped at
              the user&apos;s discretion through the mechanisms provided by the
              browser to clear the localStorage. No data is recorded until the
              user performs the first interaction with input elements of the
              site. The data is never sent over the internet and only exists in
              the user&apos;s browser. The stored data is comprised of site
              preferences and game data filled by the user when interacting with
              input elements in this site.
            </p>
          </details>
        </section>
        <br />
        <section>
          <details>
            <summary>Frequently Asked Questions</summary>
            <p>Last updated: November 9th, 2022</p>
            <p>
              Q: Will ToF Pack be updated with every new banner of Tower of
              Fantasy?
            </p>
            <p>A: Yes, it will.</p>
            <br />
            <p>
              Q: Will ToF Pack provide online storage and data synchronization
              between devices?
            </p>
            <p>A: No, it won&apos;t.</p>
          </details>
        </section>
        <br />
        <section>
          <details>
            <summary>Roadmap</summary>
            <p>Last updated: November 9th, 2022</p>
            <p>Latest release: 1.0.0 - November 9th, 2022</p>
            <p>Coming later:</p>
            <ul>
              <li>Search weapons and resources by name (or regex)</li>
              <li>Filter weapons (by element, role and other options)</li>
              <li>Sort weapons (by level, A-Z and other options)</li>
            </ul>
          </details>
        </section>
        <section>
          <details>
            <summary>Version History</summary>
            <p>1.0.0 - November 9th, 2022</p>
            <ul>
              <li>Released ToF Pack&apos;s Weapon and Resource pages</li>
              <li>Data matching Tower of Fantasy&apos;s version 2.0</li>
            </ul>
            <br />
          </details>
        </section>
        <section>
          <details>
            <summary>Feedback and how to contribute</summary>
            <p>
              ToF Pack is an open-source project,{" "}
              <a href="https://github.com/blowita/tof-pack">hosted on Github</a>{" "}
              and accepting contributions from anyone willing to help.
            </p>
            <p>
              Suggestions and issues may be{" "}
              <a href="https://github.com/blowita/tof-pack/issues">
                submitted at the issues page
              </a>{" "}
              and we&apos;ll add them to the roadmap.
            </p>
          </details>
        </section>
      </main>
    </Container>
  );
};

export default InfoPage;
