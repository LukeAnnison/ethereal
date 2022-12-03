import React, { useState, useEffect, useCallback, useContext } from "react";
import { format } from "date-fns";

import PageHeader from "./PageHeader";
import Earnings from "./Earnings";
import YourData from "./YourData";
import History from "./History";
import Onboarding from "./Onboarding";
import { PageContext, ToggleContext } from "../contexts/pageContext";
import { getPages } from "../utils/page";

const Page = () => {
  const [pageContent, setPageContent] = useState("");
  const { page, setPage } = useContext(PageContext);
  const { toggle } = useContext(ToggleContext);

  useEffect(() => {
    const fetchData = async () => {
      const pages = await getPages();
      if (pages) {
        setPageContent(pages);
      }
    };
    fetchData();
  }, []);

  const renderSection = useCallback(() => {
    switch (page) {
      case "earnings" || "home":
        return (
          <Earnings setPageContent={setPageContent} pageContent={pageContent} />
        );
      case "my data":
        return <YourData pageContent={pageContent} />;
      case "history":
        return <History />;
      case "settings":
        return <Onboarding />;

    }
  }, [page, pageContent]);

  if (page === "stakingOff") {
    return (
      <div className="staking-section">
        <p className="staking-paused">Staking is paused</p>
      </div>
    );
  } else {
    return (
      <div className="page">
        <PageHeader selectedTab={page} setSelectedTab={setPage} />
        <div className="page-content">
          {renderSection()}

    {page == 'history' && (
          <div className="holding-page">
            <p className="holding-page-text">Coming soon</p>
          </div>
        )}
        </div>
      </div>
    );
  }
};

export default Page;
