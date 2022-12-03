import styles from './OnboardingScreen.module.scss'


const OnboardingScreen = ({
  steps,
  step,
  onNext,
}: {
  steps: Array<Step>,
  step: number,
  onSkip: () => void,
  onDone: () => void,
  onNext: () => void,

}) => {
  const { title, text, icon , secondParagraph, link} = steps[step];
  return (
    <div className={styles.onBoardingScreen}>
      <div className={styles.onBoardingScreen__header}>
        <div className={styles.onBoardingScreen__header__imageContainer}>
          <img className={styles.image} src={icon} />
        </div>
        <div className={styles.onBoardingScreen__headerText}>
          <div className={styles.onBoardingScreen__headerText__title}>{title}</div>
          <div className={styles.onBoardingScreen__headerText__textBlock} >
            <div className={styles.onBoardingScreen__headerText__textBlock__description}>{text}

        {link && (
          <div >
            <a className={styles.onBoardingScreen__headerText__textBlock__link} href={"www.metamask.com"}>{link}</a>
            </div>
        )}
            </div>
      </div>
    {secondParagraph && (
          <div className={styles.onBoardingScreen__headerText__secondParagraph}>{secondParagraph}</div>
    )}
        </div>
      </div>
      <div className={styles.onBoardingScreen__footer}>
        <img  className={styles.onBoardingScreen__footer__walkthroughBars}src={`../../../public/walkthrough-bars${step}.svg`} onClick={onNext} />
        <button className={styles.onBoardingScreen__footer__footerButton} title="Next" onClick={onNext}>Next</button>
      </div>
    </div>
  );
}

export default OnboardingScreen;
