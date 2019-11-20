import React, { Fragment } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import * as _ from 'lodash'

//redux
import { connect, useSelector } from 'react-redux'

const style = {
	fontWeight: 'bold'
}

const SideBarBlock = () => {
	const clickedBlock = useSelector(state => state.mainPage.present.userState.clickedBlock)
	const isEmpty = _.isEmpty(clickedBlock) || !clickedBlock
	const key = isEmpty ? 0 : clickedBlock.id
	return <Paper elevation={0} square={true} key={key} style={{ height: '100%', paddingTop: 16 }}>
		<Typography variant="title" gutterBottom align="center">
			{isEmpty ? "Block Details" : clickedBlock.name}
		</Typography>
		{!isEmpty &&
			<List>
				<ListItem>
					<ListItemText
						style={style}
						primary={
							<Fragment>
								<Typography variant="body1">{clickedBlock.description}</Typography>
								<Typography variant="subheading" gutterBottom align="center">
									<b>Required Links</b>
								</Typography>
								{_.map(clickedBlock.requiredLinks, link =>
									<Typography key={link}>{link}</Typography>)
								}
							</Fragment>
						}
					/>
				</ListItem>
			</List>}
	</Paper>
}
export default SideBarBlock
