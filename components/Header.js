import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
	return (
		<div class="ui stick segment" style={{ marginTop: '10px' }}>
			<div class="ui stick secondary pointing menu">
				<Link route="/">
					<a class="active item">Home</a>
				</Link>

				<Menu.Menu position="right">
					<Link route="/">
						<a className="item">Campaigns</a>
					</Link>
					<Link route="/campaigns/new">
						<a className="item">
							<i class="plus icon"></i>
						</a>
					</Link>
				</Menu.Menu>
			</div>
		</div>
	);
};
