const displayPages = async () => {
    const visitedPages = await getPages();
    const pageList = document.getElementById('page-list');
    
    //@ts-ignore
    visitedPages.forEach(page => {
        const pageItem = document.createElement('li');
        pageList.appendChild(pageItem);
        
        const pageLink = document.createElement('a');
        pageLink.title = page.title;
        pageLink.href = page.url;
        pageLink.onclick = (ev) => {
            ev.preventDefault();
            //@ts-ignore
            chrome.tabs.create({ url: ev.srcElement.href, active: false });
        };
        
        const pageDelete = document.createElement('button');
        pageDelete.onclick = async () => {
            await deletePage(page.url);
            await displayPages();
        }

        pageItem.appendChild(pageLink);
        pageItem.appendChild(pageDelete);
    });
}


    const getPages = () => {
        const promise = toPromise((resolve, reject) => {
            chrome.storage.local
            chrome.storage.local.get([PAGES_KEY], (result) => {
                if (chrome.runtime.lastError)
                    reject(chrome.runtime.lastError);

                const researches = result.pages ?? [];
                resolve(researches);
            });
        });

        return promise;
    }


    const savePage = async (title, url, date, time) => {
        const pages = await getPages();
        // @ts-ignore
        const updatedPages = [...pages, { title, url, date, time }];

        const promise = toPromise((resolve, reject) => {
            
            chrome.storage.local.set({ [PAGES_KEY]: updatedPages }, () => {          
                if (chrome.runtime.lastError)
                    reject(chrome.runtime.lastError);
                resolve(updatedPages);
            });
        });

        return promise;
    }


    const deletePage = async (url) => {
        const pages = await getPages();
        //@ts-ignore
        const updatedPages = pages.filter(page => page.url !== url);

        const promise = toPromise((resolve, reject) => {
            chrome.storage.local.set({ [PAGES_KEY]: updatedPages }, () => {
                if (chrome.runtime.lastError)
                    reject(chrome.runtime.lastError);
                resolve(updatedPages);
            });
        });

        return promise;
    }


    const clearPages = () => {
        const promise = toPromise((resolve, reject) => {
            chrome.storage.local.remove([PAGES_KEY], () => {
                if (chrome.runtime.lastError)
                    reject(chrome.runtime.lastError);

                resolve();
            });
        });

        return promise;
    }




/** @private */
const PAGES_KEY = 'pages';

const toPromise = (callback) => {
    const promise = new Promise((resolve, reject) => {
        try {
            callback(resolve, reject);
        }
        catch (err) {
            reject(err);
        }
    });
    return promise;
}


    const getActiveTab = async () => {
        const query = { active: true, currentWindow: true };
        const getTabTitlePromise = new Promise((resolve, reject) => {
            chrome.tabs.query(query, (tabs) => {
                resolve(tabs[0]);
            });
        });
        return getTabTitlePromise;
    }

/** Shared logic */

    const getGreeting = () => {
        const phrases = getWelcomePhrases();
        const phrase = phrases[Math.floor(Math.random() * phrases.length)];
        return phrase;
    }


    const getWelcomePhrases = () => {
        return [
            'Welcome!',
            'Ahoy, matey!',
            'Howdy-doody!',
            'Why, hello there!',
            'Greetings!',
            'Hello, sunshine!'
        ];
    }

export { displayPages, savePage, clearPages, getActiveTab, getGreeting, getWelcomePhrases, deletePage, getPages };
