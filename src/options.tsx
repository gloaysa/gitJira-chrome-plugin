import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Options = () => {
	const [token, setToken] = useState<string>('');
	const [projectId, setProjectId] = useState<string>('');
	const [baseUrl, setBaseUrl] = useState<string>('');

	const [status, setStatus] = useState<string>('');

	const [secretShow, setSecretShow] = useState<boolean>(false);

	useEffect(() => {
		chrome.storage.sync.get(
			['token', 'projectId', 'baseUrl'],
			(key: { token: string, projectId: string , baseUrl: string}) => {
				if (!token) {
					setToken(key.token || '');
					setProjectId(key.projectId || '');
					setBaseUrl(key.baseUrl || '')
				}
			}
		);
	});

	const saveOptions = () => {
		// Saves options to chrome.storage.sync.
		chrome.storage.sync.set({ token, projectId, baseUrl }, () => {
			let timeoutId;
			const message = {setting: 'saved'};

			chrome.runtime.sendMessage(message, () => {
				setStatus('Options saved.');
				timeoutId = setTimeout(() => {
					setStatus(undefined);
				}, 1000);
			});
			return () => clearTimeout(timeoutId);
		});
	};

	const displayNotification = () => {
		if (status) {
			return <div className="notification is-primary">{status}</div>;
		}
		return (
			<div className="field is-centered">
				<button className="button is-info is-medium is-fullwidth" onClick={saveOptions} disabled={!token}>
					Save options
				</button>

				<p className="help">Secret y contraseña quedarán guardadas en tu navegador, yo no almaceno ningún dato</p>
			</div>
		);
	};

	return (
		<>
			<div className="container">
				<section className="articles">
					<div className="columns is-mobile">
						<div className="column is-12-mobile is-8-desktop is-offset-2-desktop">
							{/* START ARTICLE */}
							<div className="card article">
								<div className="card-content">
									<div className="columns is-mobile is-centered is-vcentered">
										<div className="column is-narrow">
											<img src="../images/icon-50.png" alt="GitLab - Jira Integration Configuration Icon" />
										</div>
										<div className="column is-narrow">
											<span className="title">GitLab - Jira Integration Configuration</span>
										</div>
									</div>

									<div className="field is-centered">

										<p>
											Para usarlo, ve a la página de iniciar sesión del servicio que te pide OTP y simplemente clica en el
											botón de la extensión, colocará la contraseña e iniciará sesión automáticamente.
											<br />
											Si has elegido que se guarde en el portapapeles, podrás usar la extensión en cualquier página, sin
											necesidad de que exista un formulario.
										</p>

										<hr />


										<label className="label">Token</label>
										<div className="control has-icons-right">
											<input
												className="input"
												type={secretShow ? 'text' : 'password'}
												id="secret"
												placeholder="SECRET"
												onChange={(event) => setToken(event.target.value)}
												value={token}
											/>
											<span
												className="icon is-small is-right"
												onClick={() => setSecretShow(!secretShow)}
												style={{ cursor: 'pointer', pointerEvents: 'all' }}
											>
												<i className={`fas ${secretShow ? 'fa-eye' : 'fa-eye-slash'}`} />
											</span>
										</div>
									</div>

									<br />

									<label className="label">Gitlab Base Url</label>
									<div className="control has-icons-right">
										<input
											className="input"
											type="text"
											id="secret"
											placeholder="git.example.com (without https://)"
											onChange={(event) => setBaseUrl(event.target.value)}
											value={baseUrl}
										/>
									</div>

									<br />

									<label className="label">Gitlab Project Id</label>
									<div className="control has-icons-right">
										<input
											className="input"
											type="text"
											id="secret"
											placeholder="1466"
											onChange={(event) => setProjectId(event.target.value)}
											value={projectId}
										/>
									</div>

									<br />

									{displayNotification()}

									<br />

									<div className="columns is-mobile is-centered">
										<div className="column is-half">
											<div className="image is-centered">
												<img src="https://media.giphy.com/media/3KC2jD2QcBOSc/giphy.gif" alt="party" />
											</div>
										</div>
									</div>
								</div>
							</div>
							{/* END ARTICLE --> */}
						</div>
						{/* END COLUMN --> */}
					</div>
				</section>
				{/* END ARTICLE FEED */}
			</div>

			<footer className="footer">
				<div className="content has-text-centered">
					<p>
						<strong>GitLab - Jira Integration</strong> - made with <span className="has-text-danger">&hearts;</span> by{' '}
						<a href="https://loaysa.com">Guillermo Loaysa</a>
					</p>
					<div className="tags has-addons level-item">
						<span className="tag is-rounded is-info">last update</span>
						<span className="tag is-rounded">May, 2021</span>
					</div>
				</div>
			</footer>
		</>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<Options />
	</React.StrictMode>,
	document.getElementById('root')
);
