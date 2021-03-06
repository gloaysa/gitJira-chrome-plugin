import React, { PropsWithChildren } from 'react';

interface Props {
	moduleName: string;
	expanded?: boolean;
}
const JiraModuleComponent: React.FunctionComponent<PropsWithChildren<Props>> = ({moduleName, children, expanded}) => {
	return (
		<div className={`module toggle-wrap ${expanded ? 'expanded' : 'collapsed'}`} style={styles}>
			<div className='mod-header'>
				<button className="aui-button toggle-title" aria-label="Description" aria-controls="descriptionmodule"
								aria-expanded="true">
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
						<g fill="none" fillRule="evenodd">
							<path
								d="M3.29175 4.793c-.389.392-.389 1.027 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955c.388-.392.388-1.027 0-1.419-.389-.392-1.018-.392-1.406 0l-2.298 2.317-2.307-2.327c-.194-.195-.449-.293-.703-.293-.255 0-.51.098-.703.293z"
								fill="#344563"></path>
						</g>
					</svg>
				</button>
				<h4 className="toggle-title">{moduleName}</h4>
			</div>
			<div className='mod-content'>
				{children}
			</div>
		</div>

	)
}

const styles = {
	marginTop: '25px'
}

export default JiraModuleComponent;
