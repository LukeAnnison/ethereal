const PageHeader = ( {selectedTab, setSelectedTab} ) => {

	const handleTabClick = (event) => {
		setSelectedTab(event.target.innerText.toLowerCase());
	};

	return (
		<header className="page-header">
				<p onClick={handleTabClick} className={`page-header-title${selectedTab == 'earnings' ? '-selected' : ''}`}>EARNINGS</p>
				<p onClick={handleTabClick}className={`page-header-title${selectedTab == 'my data' ? '-selected' : ''} `}>MY DATA</p>
				<p onClick={handleTabClick} className={`page-header-title${selectedTab == 'history' ? '-selected' : ''} `}>HISTORY</p>

		</header>
	);
}

export default PageHeader;
