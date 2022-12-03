import Data from "./Data";

const YourData = ( {pageContent, balance} ) => {
	return (
		<div>
			<Data balance={balance} pageContent={pageContent}/>
		</div>
	);
};

export default YourData;

