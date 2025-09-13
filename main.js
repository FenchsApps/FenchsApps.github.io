const { useState, useEffect } = React;

function App() {
    const [reposByLanguage, setReposByLanguage] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const username = 'FenchsApps';

    useEffect(() => {
        async function getRepos() {
            const url = `https://api.github.com/users/${username}/repos`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const repos = await response.json();

                const groupedRepos = repos.reduce((acc, repo) => {
                    if (repo.language) {
                        if (!acc[repo.language]) {
                            acc[repo.language] = [];
                        }
                        acc[repo.language].push(repo);
                    }
                    return acc;
                }, {});

                setReposByLanguage(groupedRepos);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }

        getRepos();
    }, [username]);

    return (
        <div className="container">
            <h1 className="welcome">Welcome!</h1>
            {loading && <p>Loading repositories...</p>}
            {error && <p>Error loading repositories: {error}</p>}
            {!loading && !error && (
                <div id="repos-container">
                    {Object.keys(reposByLanguage).map(language => (
                        <LanguageSection key={language} language={language} repos={reposByLanguage[language]} />
                    ))}
                </div>
            )}
        </div>
    );
}

function LanguageSection({ language, repos }) {
    return (
        <div className="language-section">
            <h2 className="language-title">{language}</h2>
            <div className="repos-grid">
                {repos.map(repo => (
                    <RepoCard key={repo.id} repo={repo} />
                ))}
            </div>
        </div>
    );
}

function RepoCard({ repo }) {
    return (
        <div className="repo-card">
            <h3>{repo.name}</h3>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                View on GitHub
            </a>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

