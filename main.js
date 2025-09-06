async function getRepos() {
    const username = 'FenchsApps';
    const url = `https://api.github.com/users/${username}/repos`;
    const reposContainer = document.getElementById('repos-container');

    try {
        const response = await fetch(url);
        const repos = await response.json();

        const reposByLanguage = repos.reduce((acc, repo) => {
            if (repo.language) {
                if (!acc[repo.language]) {
                    acc[repo.language] = [];
                }
                acc[repo.language].push(repo);
            }
            return acc;
        }, {});

        for (const language in reposByLanguage) {
            const languageSection = document.createElement('div');
            languageSection.classList.add('language-section');

            const languageTitle = document.createElement('h2');
            languageTitle.classList.add('language-title');
            languageTitle.textContent = language;
            languageSection.appendChild(languageTitle);

            const reposGrid = document.createElement('div');
            reposGrid.classList.add('repos-grid');

            reposByLanguage[language].forEach(repo => {
                const repoCard = document.createElement('div');
                repoCard.classList.add('repo-card');

                const repoTitle = document.createElement('h3');
                repoTitle.textContent = repo.name;
                repoCard.appendChild(repoTitle);

                const repoLink = document.createElement('a');
                repoLink.href = repo.html_url;
                repoLink.textContent = 'View on GitHub';
                repoLink.target = '_blank';
                repoCard.appendChild(repoLink);

                reposGrid.appendChild(repoCard);
            });

            languageSection.appendChild(reposGrid);
            reposContainer.appendChild(languageSection);
        }
    } catch (error) {
        console.error('Error fetching repos:', error);
        reposContainer.innerHTML = '<p>Error loading repositories. Please try again later.</p>';
    }
}

getRepos();
