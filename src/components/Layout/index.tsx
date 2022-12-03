import {useState} from 'react'

import  Onboarding  from '../Onboarding'
import styles from './Layout.module.scss'


const Layout = ({ children }) => {
  const [onBoarding, setOnBoarding] = useState('')

  chrome.storage.local.get(['onboarding'], function (result) {

      console.log('onboarding is false', result)
    if (result.onboarding === 'onboarding-done') {
      setOnBoarding('onboarding-done')
    } else {
      setOnBoarding('onboarding')
      
    }
  })

    // onBoarding ? (
    //   <div className={styles.layout}>
    //     <div className={styles.layout__header}/>
    //     <div className={styles.layout__content}>
    //   <Onboarding setOnBoarding={setOnBoarding} />
    //   </div>
    //   </div>
    // ) : (
    //   <div>{children}</div>
    // )
     switch (onBoarding) {
      case 'onboarding':
        return (
          <div className={styles.layout}>
            <div className={styles.layout__header}/>
            <div className={styles.layout__content}>
              <Onboarding setOnBoarding={setOnBoarding} />
            </div>
          </div>
           
        )
       case '':
       return (
         <div>{children}</div>

       )
        case 'onboarding-done':
         return (

         <div>{children}</div>
        )
     }
}

export default Layout;
