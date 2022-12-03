import {useState} from 'react'

import  OnboardingScreen  from './OnboardingScreen/index'

// @ts-ignore
import styles from './Onboarding.module.scss'

const Onboarding = ({ setOnBoarding }) => {

  const [step, setStep] = useState(0)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const onboardingSteps = [
    {
      icon: '../../public/coins.svg',
      title: 'What Is Data Staking?',
      text: 'When you browse the web, you create data about what you’re doing, the websites you go to, the content you interact with, and more. Traditionally, this data isn’t yours. Somehow, you don’t own it, you can’t choose who can - and cannot - look at it. But as we all know, this data is used by corporations to make billions of dollars.',
      secondParagraph: 'In that world, your data is valuable. Just not to you.',
      progress: ''
    },
    {
      title: 'Is My Data Secure?',
      icon: '../../public/document.svg', 
      text: 'When you browse the web, you create data about what you’re doing, the websites you go to, the content you interact with, and more. Traditionally, this data isn’t yours. Somehow, you don’t own it, you can’t choose who can - and cannot - look at it. But as we all know, this data is used by corporations to make billions of dollars. ',
      progress: ''
    },
    {
      title: 'How Much Can I Earn?',
      icon: '../../public/chart.svg',
      text: 'When you browse the web, you create data about what you’re doing, the websites you go to, the content you interact with, and more. Traditionally, this data isn’t yours. Somehow, you don’t own it, you can’t choose who can - and cannot - look at it. But as we all know, this data is used by corporations to make billions of dollars. ',
      progress: ''
    },
    {
      title: 'Connect Your Metmask Wallet',
      icon: '../../public/metamask-ethereal.svg',
      text: 'To connect to the blockchain, you need to connect your Metamask wallet. This allows us to send compensation in the form of tokens. If you don’t have a Metmask wallet, you can set one up here: ',

      link: 'Get Metamask →',
      progress: ''
    }
  ]


  const handleNext = () => {
    if (step < onboardingSteps.length - 1) {
      setStep(step + 1)
    } else {
      console.log('done')
      setOnBoarding(false)
      chrome.storage.local.set({ onboarding: 'onboarding-done'})
      console.log('onboarding being set to false')
    }
  }
 
  const handleSkip = () => {
    setIsModalVisible(true)
  }

  const handleDone = () => {
    setIsModalVisible(false)
  }

  return (
    <div className={styles.onBoarding}>
      <p className={styles.onBoarding__title}>Staking</p>
      <OnboardingScreen
        steps={onboardingSteps}
        step={step}
        onSkip={handleSkip}
        onDone={handleDone}
        onNext={handleNext}
      />
      <div
      >
      </div>
    </div>
  )
}

export default Onboarding;
