// bottom navigation
import React , { useContext }from 'react';
import { PageContext } from "../contexts/pageContext";

const Footer = () => {
	const { page, setPage } = useContext(PageContext);
	
	return (
		<footer className="footer">
			<div onClick={() => setPage('earnings')}className="footer-button">

				<img className="footer-icon" id="logo" width="20px" height="20px" src={`../public/home-${page === 'earnings' ? 'selected' : 'default'}.svg`} alt="Home"></img>
			<p className={page === 'earnings' ? 'footer-text-selected' : 'footer-text'}>Home</p>
			</div>


			<div onClick={() => setPage('my data')}className="footer-button">

				<img className="footer-icon" id="logo" width="20px" height="20px" src={`../public/my-data-${page === 'my data' ? 'selected' : 'default'}.svg`} alt="My Data"></img>
			<p className={page === 'my data' ? 'footer-text-selected' : 'footer-text'}>My Data</p>

			</div>


			<div onClick={() => setPage('rewards')}className="footer-button">
				<img className="footer-icon" id="logo" width="20px" height="20px" src={`../public/rewards-${page === 'rewards' ? 'selected' : 'default'}.svg`} alt="Rewards"></img>
			<p className={page === 'rewards' ? 'footer-text-selected' : 'footer-text'}>Rewards</p>
			</div>
			

			<div onClick={() => setPage('settings')}className="footer-button">

				<img className="footer-icon" id="logo" width="20px" height="20px" src={`../public/settings-${page === 'settings' ? 'selected' : 'default'}.svg`} alt="Settings"></img>
			<p className={page === 'settings' ? 'footer-text-selected' : 'footer-text'}>Settings</p>
			</div>
		</footer>
	);
}

export default Footer;
