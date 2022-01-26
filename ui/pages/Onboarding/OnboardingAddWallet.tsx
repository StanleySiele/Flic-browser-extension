import React, { ReactElement } from "react"
import {
  HIDE_ADD_SEED,
  HIDE_CREATE_PHRASE,
} from "@tallyho/tally-background/features/features"
import { useHistory } from "react-router-dom"
import { generateNewKeyring } from "@tallyho/tally-background/redux-slices/keyrings"
import { useBackgroundDispatch, useAreKeyringsUnlocked } from "../../hooks"
import SharedBackButton from "../../components/Shared/SharedBackButton"
import SharedButton from "../../components/Shared/SharedButton"

export default function OnboardingStartTheHunt(): ReactElement {
  const dispatch = useBackgroundDispatch()
  const history = useHistory()

  useAreKeyringsUnlocked(!HIDE_CREATE_PHRASE && true)

  return (
    <section className="start_wrap">
      <div className="top">
        <SharedBackButton />
        <div className="wordmark" />
      </div>
      <h1 className="serif_header">Add Wallet</h1>
      <div className="subtitle subtitle_hunt">
        Let&apos;s get you set up With a Flic wallet.
      </div>
      <ul>
        <li className="label_small">Use an existing wallet</li>
        <li className="option standard_width">
          <div className="icon preview_icon" />
          <SharedButton
            type="tertiary"
            size="medium"
            linkTo="/onboarding/viewOnlyWallet"
          >
            Preview an address
          </SharedButton>
        </li>
        {HIDE_ADD_SEED ? (
          <></>
        ) : (
          <li className="option standard_width">
            <div className="icon metamask_icon" />
            <SharedButton
              type="tertiary"
              size="medium"
              linkTo="/onboarding/importMetamask"
            >
              Mnemonic Log in
            </SharedButton>
          </li>
        )}
        {HIDE_CREATE_PHRASE ? (
          <></>
        ) : (
          <>
            <li className="label_small">Start Fresh</li>
            <li className="option standard_width">
              <div className="icon tally_icon" />
              <SharedButton
                type="secondary"
                size="medium"
                onClick={async () => {
                  await dispatch(generateNewKeyring())
                  history.push("/onboarding/saveSeed")
                }}
              >
                Create new wallet
              </SharedButton>
            </li>
          </>
        )}
      </ul>
      <style jsx>
        {`
          section {
            padding-top: 25px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: var(--hunter-green);
          }
          .top {
            display: flex;
            width: 100%;
          }
          .wordmark {
            background: url("./images/wordmark@2x.png");
            background-size: cover;
            width: 52px;
            height: 25px;
            position: absolute;
            left: 0px;
            right: 0px;
            margin: 0 auto;
          }
          h1 {
            margin-top: 26px;
          }
          .subtitle {
            color: var(--green-60);
            margin-bottom: 32px;
          }
          .subtitle_hunt {
            width: 307px;
            text-align: center;
            line-height: 24px;
          }
          .label_small {
            margin-bottom: 16px;
            display: block;
            color: var(--green-40);
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
            display: flex;
            align-items: center;
          }
          .option {
            display: flex;
            height: 64px;
            border-radius: 16px;
            background-color: var(--green-95);
            align-items: center;
            padding: 16px;
            box-sizing: border-box;
            margin-bottom: 24px;
            justify-content: space-between;
          }
          .icon {
            width: 36px;
            height: 36px;
            background-color: var(--gold-20);
            border-radius: 50%;
          }
          .tally_icon {
            background: url("./images/tally_circle_icon@2x.png");
            background-size: cover;
          }
          .metamask_icon {
            background: url("./images/metamask_icon@2x.png");
            background-size: cover;
          }
          .preview_icon {
            background: url("./images/preview_icon@2x.png");
            background-size: cover;
          }
        `}
      </style>
    </section>
  )
}
