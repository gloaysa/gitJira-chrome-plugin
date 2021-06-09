import React, { useEffect, useState } from 'react';
import { StorageKeys } from '@models/storage-keys.interface';

interface OptionsComponentProps extends StorageKeys {
	handleSave: (params: StorageKeys, callback?: () => void) => void;
}

const OptionsComponent: React.FunctionComponent<OptionsComponentProps> = ({token, projectIds, baseUrl, handleSave}) => {
	const [newToken, setToken] = useState<string>(token);
	const [newProjectIds, setProjectId] = useState<string>(projectIds);
	const [newBaseUrl, setBaseUrl] = useState<string>(baseUrl);

	const [status, setStatus] = useState<string>('');

	const [secretShow, setSecretShow] = useState<boolean>(false);

	const saveOptions = () => {
		handleSave({ token: newToken, projectIds: newProjectIds, baseUrl: newBaseUrl }, () => {
			let timeoutId;

			setStatus('Options saved.');
			timeoutId = setTimeout(() => {
				setStatus(undefined);
			}, 1000);

			return () => clearTimeout(timeoutId);
		});
	};

	const displayNotification = () => {
		if (status) {
			return <div className="notification is-primary">{status}</div>;
		}
		return (
			<div className="field is-centered">
				<button className="button is-info is-medium is-fullwidth" onClick={saveOptions} disabled={!newToken || !newProjectIds || !newBaseUrl}>
					Save options
				</button>

				<p className="help">All this data is stored in your browser.</p>
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
											<img src="assets/images/icon-50.png" alt="GitLab - Jira Integration Configuration Icon" />
										</div>
										<div className="column is-narrow">
											<span className="title">GitLab - Jira Integration Configuration</span>
										</div>
									</div>

									<div className="field is-centered">

										<p>
											This plugin allows you to ...
										</p>

										<hr />

										<img src="assets/images/gitlab-token.png" alt="GitLab - Jira Integration Configuration Icon" />

										<p>
											To get your token, login to GitLab / Preferences / Access Tokens and create a new token with "read_api" access.
											You can name it whatever you want it. Then, paste your token below.
										</p>

										<br/>

										<label className="label">Token</label>
										<div className="control has-icons-right">
											<input
												className="input"
												type={secretShow ? 'text' : 'password'}
												id="secret"
												placeholder="SECRET"
												onChange={(event) => setToken(event.target.value)}
												value={newToken}
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
											value={newBaseUrl}
										/>
									</div>

									<br />

									<img src="assets/images/gitlab-projectid.png" alt="GitLab - Jira Integration Configuration Icon" />

									<p>The project ID can be found at the Details repository page in Gitlab, under the name.</p>

									<label className="label">Gitlab Project Id</label>
									<div className="control has-icons-right">
										<input
											className="input"
											type="text"
											id="secret"
											placeholder="1466"
											onChange={(event) => setProjectId(event.target.value)}
											value={newProjectIds}
										/>
										<p className="help">You can add multiple projects separating them by a coma: <code>1919, 1920</code></p>
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
						<span className="tag is-rounded">Jun, 2021</span>
					</div>
				</div>
			</footer>
		</>
	);
};

export default OptionsComponent;
